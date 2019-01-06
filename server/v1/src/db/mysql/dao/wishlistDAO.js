'use strict';

import DAL from '../DataAccessLayer.js';
import Error from '../../../util/Error.js';

/**
 * Adds a wishlist to the database.
 * 
 * @param {Wishlist} wishlist The Wishlist to add to the database.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function createWishlist(wishlist, callback) {
    console.log('Entering wishlistDAO.createWishlist()');
    console.log("Attempting to insert the following wishlist into the database: ");
    wishlist.print();

    var userId = wishlist.getUserId();
    var name = wishlist.getName();
    var isPrivate = wishlist.getIsPrivate();

    var query = 'INSERT INTO wishlist (user_id, name, is_private) VALUES (?, ?, ?);';
    var values = [userId, name, isPrivate];

    DAL.query(query, values, function processQueryResults(queryError, queryResult) {
        if (!queryError) {
            console.log("The query returned the following result: " + queryResult);
            callback(null, queryResult);
        } else {
            console.log("An error occurred executing the query: " + queryError + queryError.sql);
            var error = new Error(503, "Unable to execute database query.");
            callback(error);
        }
    });
}

/**
 * Retrieves a wishlist from the database.
 * 
 * @param {number} id The wishlist id.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function getWishlist(id, callback) {
    console.log('Entering wishlistDAO.getWishlist()');

    var wishlistId = id;
    console.log('Searching for the following wishlist id: ' + wishlistId);

    var query = 'SELECT * FROM wishlist WHERE id = ?;';
    var values = [wishlistId];

    DAL.query(query, values, function processQueryResults(queryError, queryResult) {
        if (!queryError) {
            console.log("The query returned the following result: " + queryResult);
            callback(null, queryResult);
        } else {
            console.log("An error occurred executing the query: " + queryError);
            var error = new Error(503, "Unable to execute database query.");
            callback(error);
        }
    });
}

/**
 * Retrieves all wishlists for a specific user from the database.
 * 
 * @param {number} id The user id.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function getWishlists(id, callback) {
    console.log('Entering wishlistDAO.getWishlists()');

    var userId = id;
    console.log('Searching for the following user id: ' + userId);

    var query = 'SELECT * FROM wishlist WHERE user_id = ?;';
    var values = [userId];

    DAL.query(query, values, function processQueryResults(queryError, queryResult) {
        if (!queryError) {
            console.log("The query returned the following result: " + queryResult);
            callback(null, queryResult);
        } else {
            console.log("An error occurred executing the query: " + queryError);
            var error = new Error(503, "Unable to execute database query.");
            callback(error);
        }
    });
}