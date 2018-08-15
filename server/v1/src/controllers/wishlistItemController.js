'use strict';

import WishlistItem, {getWishlistItem} from '../models/WishlistItem.js';

/** @namespace */
var wishlistItemController = {};

/**
 * Creates a wishlist item.
 * 
 * @param {Object} req The Express request object.
 * @param {number} req.params.wishlistId The id of the wishlist this wishlist item belongs to.
 * @param {string} req.body.name The name of the wishlist item.
 * @param {number} [req.body.price=null] The price of the wishlist item.
 * @param {string} req.body.itemUrl The URL to the website of the wishlist item.
 * @param {string} [req.body.imageUrl=null] The URL to the image of the wishlist item.
 * @param {boolean} [req.body.isPurchased=0] Whether the wishlist item has been purchased.
 * @param {Object} res The Express response object.
 * 
 * @return 201 if wishlist item was created successfully.
 *         500 if an error occurred.
 */
wishlistItemController.createWishlistItem = function (req, res) {
    console.log('Entered wishlistItemController.createWishlistItem()');

    var wishlistId = req.params.wishlistId;
    console.log('Wishlist ID: ' + wishlistId);
    if (wishlistId === undefined) {
        res.status(500).json({
            message: 'wishlistId is a required parameter.'
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
    } else if (name.length > 128) {
        res.status(500).json({
            message: 'name must be less than or equal to 128 characters.'
        });
        return;
    }

    var price = req.body.price;
    console.log('Price: ' + price);
    if (price === undefined) {
        res.status(500).json({
            message: 'price is a required parameter.'
        });
        return;
    }

    var itemUrl = req.body.itemUrl;
    var imageUrl = req.body.imageUrl;
    var isPurchased = req.body.isPurchased;

    var wishlistItem = new WishlistItem(wishlistId, name, price, itemUrl, imageUrl, isPurchased);
    wishlistItem.print();
    wishlistItem.createWishlistItem(wishlistItem, function processCreateWishlistItemResults(error, results){
        if (error) {
            res.status(error.statusCode).json({
                error
            });
        } else {
            getWishlistItem(results.insertId, function processGetWishlistItemResults(error, wishlistItem) {
                if (error) {
                    res.status(error.statusCode).json({
                        error
                    });
                } else {
                    res.status(201).json({
                        wishlistItem
                    });
                }
            });
        }
    });
    
    return;
};

/**
 * Retrieves a specific wishlist item by its id.
 * 
 * @param {Object} req The Express request object.
 * @param {string} req.params.wishlistId The wishlist id.
 * @param {string} req.params.itemId The wishlist item id.
 * @param {Object} res The Express response object.
 * 
 * @return 200 if wishlist item was retrieved successfully.
 *         500 if an error occurred.
 */
wishlistItemController.getWishlistItem = function (req, res) {
    console.log('Entered wishlistItemController.getWishlistItem()');

    var wishlistId = req.params.wishlistId;
    var wishlistItemId = req.params.itemId;

    console.log('Received the following wishlist id: ' + wishlistId);
    console.log('Received the following wishlist item id: ' + wishlistItemId);

    getWishlistItem(wishlistItemId, function processGetWishlistItemResults(error, wishlistItem) {
        if (error) {
            res.status(error.statusCode).json({
                error
            });
        } else {
            res.status(200).json({
                wishlistItem
            });
        }
    });
};

module.exports = wishlistItemController;