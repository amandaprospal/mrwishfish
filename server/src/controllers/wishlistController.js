'use strict';

var Wishlist = require('../models/Wishlist.js');

var wishlistController = {};

/**
 * Creates a wishlist.
 * 
 * @param {Object} req The Express request object.
 * @param {String} req.user_id The id of the user who owns the wishlist.
 * @param {String} req.name The name of the wishlist.
 * @param {String} req.isPrivate Whether the wishlist is private.
 * @param {Object} res The Express response object.
 * 
 * @return 200 if wishlist was created successfully.
 *         500 if an error occurred.
 */
wishlistController.createWishlist = function (req, res) {
    console.log('Entered wishlistController.createWishlist()');

    var user_id = req.body.user_id;
    console.log('User ID: ' + user_id);
    if (user_id === undefined) {
        res.status(500).json({
            message: 'user_id is a required parameter.'
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

    var is_private = req.body.is_private;
    console.log('Is Private: ' + is_private);
    if (is_private === undefined) {
        res.status(500).json({
            message: 'is_private is a required parameter.'
        });
        return;
    }

    var wishlist = new Wishlist(user_id, name, is_private);
    wishlist.print();
    wishlist.createWishlist(wishlist, function processCreateWishlistResults(err){
        if (err) {
            res.status(500).json({
                message: 'A database error occurred.'
            });
        } else {
            res.status(200).json({
                message: 'The wishlist was created successfully.'
            });
        }
    });
    
    return;
};

module.exports = wishlistController;