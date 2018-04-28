'use strict';

import DAL from '../DAL.js';
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

    var dal = new DAL();
    var db = dal.getConnectionPool();

    console.log("Attempting to insert the following wishlist into the database: ");
    wishlist.print();

    var userId = wishlist.getUserId();
    var name = wishlist.getName();
    var isPrivate = wishlist.getIsPrivate();

    db.getConnection(function (connectionError, connection) {
        if (!connectionError) {
            var query = 'INSERT INTO wishlist (user_id, name, is_private) VALUES (?, ?, ?);';
            var values = [userId, name, isPrivate];

            connection.query(query, values, function processQueryResults(queryError, queryResult) {
                if (!queryError) {
                    console.log("The query returned the following result: " + queryResult);
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
 * Retrieves a wishlist from the database.
 * 
 * @param {Number} id The wishlist id.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function getWishlist(id, callback) {
    console.log('Entering wishlistDAO.getWishlist()');

    var dal = new DAL();
    var db = dal.getConnectionPool();

    var wishlistId = id;
    console.log('Searching for the following wishlist id: ' + wishlistId);

    db.getConnection(function (connectionError, connection) {
        if (!connectionError) {
            var query = 'SELECT * FROM wishlist WHERE id = ?;';
            var values = [wishlistId];

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