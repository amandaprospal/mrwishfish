'use strict';

import Wishlist, {getWishlist} from '../models/Wishlist.js';

/** @namespace */
var wishlistController = {};

/**
 * Creates a wishlist.
 * 
 * @param {Object} req The Express request object.
 * @param {string} req.body.userId The id of the user who owns the wishlist.
 * @param {string} req.body.name The name of the wishlist.
 * @param {string} [req.body.isPrivate=0] Whether the wishlist is private.
 * @param {Object} res The Express response object.
 * 
 * @return 201 if wishlist was created successfully.
 *         500 if an error occurred.
 */
wishlistController.createWishlist = function (req, res) {
    console.log('Entered wishlistController.createWishlist()');

    var userId = req.body.userId;
    console.log('User ID: ' + userId);
    if (userId === undefined) {
        res.status(500).json({
            message: 'userId is a required parameter.'
        });
        return;
    }

    var name = req.body.name;
    console.log('Name: ' + name);
    if (name === undefined) {
        res.status(500).json({
            message: 'name is a required parameter.'
        });
        return;
    }

    var isPrivate = req.body.isPrivate;
    console.log('Is Private: ' + isPrivate);
    if (isPrivate === undefined) {
        res.status(500).json({
            message: 'isPrivate is a required parameter.'
        });
        return;
    }

    var wishlist = new Wishlist(userId, name, isPrivate);
    wishlist.print();
    wishlist.createWishlist(wishlist, function processCreateWishlistResults(error, results){
        if (error) {
            res.status(error.statusCode).json({
                error
            });
        } else {
            getWishlist(results.insertId, function processGetWishlistResults(error, wishlist) {
                if (error) {
                    res.status(error.statusCode).json({
                        error
                    });
                } else {
                    res.status(201).json({
                        wishlist
                    });
                }
            });
        }
    });
    
    return;
};

/**
 * Retrieves a specific wishlist by its id.
 * 
 * @param {Object} req The Express request object.
 * @param {string} req.params.wishlistId The wishlist id.
 * @param {Object} res The Express response object.
 * 
 * @return 200 if wishlist was retrieved successfully.
 *         500 if an error occurred.
 */
wishlistController.getWishlist = function (req, res) {
    console.log('Entered wishlistController.getWishlist()');

    var wishlistId = req.params.wishlistId;

    console.log('Received the following wishlist id: ' + wishlistId);

    getWishlist(wishlistId, function processGetWishlistResults(error, wishlist) {
        if (error) {
            res.status(error.statusCode).json({
                error
            });
        } else {
            res.status(200).json({
                wishlist
            });
        }
    });
};

module.exports = wishlistController;