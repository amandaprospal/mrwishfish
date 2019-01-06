'use strict';

import DAL from '../DataAccessLayer.js';
import Error from '../../../util/Error.js';

/**
 * Adds a user to the database.
 * 
 * @param {User} user The User to add to the database.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function createUser(user, callback) {
    console.log('Entering userDAO.createUser()');
    console.log("Attempting to insert the following user into the database: ");
    user.print();

    var emailAddress = user.getEmailAddress();
    var firstName = user.getFirstName();
    var lastName = user.getLastName();

    var query = 'INSERT INTO user (email_address, first_name, last_name) VALUES (?, ?, ?);';
    var values = [emailAddress, firstName, lastName];

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
 * Retrieves a user from the database by matching on the user id.
 * 
 * @param {string} id The user's id.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function getUserById(id, callback) {
    console.log('Entering userDAO.getUserById()');

    var userId = id;
    console.log('Searching for the following user id: ' + userId);

    var query = 'SELECT * FROM user WHERE id = ?;';
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

/**
 * Retrieves a user from the database by matching on the user's email address.
 * 
 * @param {string} emailAddress The user's email address.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function getUserByEmailAddress(emailAddress, callback) {
    console.log('Entering userDAO.getUserByEmailAddress()');

    var userEmailAddress = emailAddress;
    console.log('Searching for the following user email address: ' + userEmailAddress);

    var query = 'SELECT * FROM user WHERE email_address = ?;';
    var values = [userEmailAddress];

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