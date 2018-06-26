'use strict';

import DAL from '../DAL.js';
import Error from '../../../util/Error.js';

/**
 * Adds a wishlist item to the database.
 * 
 * @param {WishlistItem} wishlistItem The WishlistItem to add to the database.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function createWishlistItem(wishlistItem, callback) {
    console.log('Entering wishlistItemDAO.createWishlistItem()');

    var dal = new DAL();
    var db = dal.getConnectionPool();

    console.log("Attempting to insert the following wishlistItem into the database: ");
    wishlistItem.print();

    var wishlistId = wishlistItem.getWishlistId();
    var name = wishlistItem.getName();
    var price = wishlistItem.getPrice();
    var itemUrl = wishlistItem.getItemUrl();
    var imageUrl = wishlistItem.getImageUrl();
    var isPurchased = wishlistItem.getIsPurchased();

    db.getConnection(function (connectionError, connection) {
        if (!connectionError) {
            var query = 'INSERT INTO wishlist_item (wishlist_id, name, price, item_url, image_url, is_purchased) VALUES (?, ?, ?, ?, ?, ?);';
            var values = [wishlistId, name, price, itemUrl, imageUrl, isPurchased];

            connection.query(query, values, function processQueryResults(queryError, queryResult) {
                if (!queryError) {
                    console.log("The query returned the following result: ");
                    console.log(queryResult);
                    callback(null, queryResult);
                } else {
                    console.log("An error occurred executing the query: " + queryError + queryError.sql);
                    var error = new Error(503, "Unable to execute database query.");
                    callback(error);
                }
                console.log("Closing database connection.");
                connection.release();
            });
        } else {
            console.log("There was a problem connecting to the database: " + connectionError);
            var error = new Error(503, "Unable to connect to the database.");
            callback(error);
        }
    });
}

/**
 * Retrieves a wishlist item from the database.
 * 
 * @param {number} id The wishlist item id.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function getWishlistItem(id, callback) {
    console.log('Entering wishlistItemDAO.getWishlistItem()');

    var dal = new DAL();
    var db = dal.getConnectionPool();

    var wishlistItemId = id;
    console.log('Searching for the following wishlist item id: ' + wishlistItemId);

    db.getConnection(function (connectionError, connection) {
        if (!connectionError) {
            var query = 'SELECT * FROM wishlist_item WHERE id = ?;';
            var values = [wishlistItemId];

            connection.query(query, values, function processQueryResults(queryError, queryResult) {
                if (!queryError) {
                    console.log("The query returned the following result: " + queryResult);
                    callback(null, queryResult);
                } else {
                    console.log("An error occurred executing the query: " + queryError);
                    var error = new Error(503, "Unable to execute database query.");
                    callback(error);
                }
                console.log("Closing database connection.");
                connection.release();
            });
        } else {
            console.log("There was a problem connecting to the database: " + connectionError);
            var error = new Error(503, "Unable to connect to the database.");
            callback(error);
        }
    });
}