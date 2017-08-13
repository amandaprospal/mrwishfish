'use strict';

var WishlistItem = require('../models/WishlistItem.js');

var wishlistItemController = {};

/**
 * Creates a wishlist item.
 * 
 * @param {Object} req The Express request object.
 * @param {Number} req.wishlist_id The id of the wishlist this wishlist item belongs to.
 * @param {String} req.name The name of the wishlist item.
 * @param {Number} req.price The price of the wishlist item.
 * @param {String} req.item_url The URL to the website of the wishlist item.
 * @param {String} req.image_url The URL to the image of the wishlist item.
 * @param {Boolean} req.is_purchased Whether the wishlist item has been purchased.
 * @param {Object} res The Express response object.
 * 
 * @return 200 if wishlist item was created successfully.
 *         500 if an error occurred.
 */
wishlistItemController.createWishlistItem = function (req, res) {
    console.log('Entered wishlistItemController.createWishlistItem()');

    var wishlist_id = req.body.wishlist_id;
    console.log('Wishlist ID: ' + wishlist_id);
    if (wishlist_id === undefined) {
        res.status(500).json({
            message: 'wishlist_id is a required parameter.'
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

    var wishlistItem = new WishlistItem(wishlist_id, name);
    wishlistItem.print();
    wishlistItem.createWishlistItem(wishlistItem, function processCreateWishlistItemResults(err){
        if (err) {
            res.status(500).json({
                message: 'A database error occurred.'
            });
        } else {
            res.status(200).json({
                message: 'The wishlist item was created successfully.'
            });
        }
    });
    
    return;
};

module.exports = wishlistItemController;