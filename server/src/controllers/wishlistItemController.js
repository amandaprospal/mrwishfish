'use strict';

import WishlistItem, {getWishlistItem} from '../models/WishlistItem.js';

var wishlistItemController = {};

/**
 * Creates a wishlist item.
 * 
 * @param {Object} req The Express request object.
 * @param {Number} req.params.wishlistId The id of the wishlist this wishlist item belongs to.
 * @param {String} req.body.name The name of the wishlist item.
 * @param {Number} req.body.price The price of the wishlist item.
 * @param {String} req.body.itemUrl The URL to the website of the wishlist item.
 * @param {String} req.body.imageUrl The URL to the image of the wishlist item.
 * @param {Boolean} req.body.isPurchase Whether the wishlist item has been purchased.
 * @param {Object} res The Express response object.
 * 
 * @return 200 if wishlist item was created successfully.
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

    var wishlistItem = new WishlistItem(wishlistId, name, price);
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

/**
 * Retrieves a specific wishlist item by its id.
 * 
 * @param {Object} req The Express request object.
 * @param {String} req.params.wishlistId The wishlist id.
 * @param {String} req.params.itemId The wishlist item id.
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

    getWishlistItem(wishlistItemId, function processGetWishlistItemResults(err, wishlistItem) {
        if (err) {
            res.status(500).json({
                message: err
            });
        } else {
            res.status(200).json({
                message: 'Successfully retrieved a matching wishlist item.',
                wishlistItem: wishlistItem
            });
        }
    });
};

module.exports = wishlistItemController;