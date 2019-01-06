'use strict';

import DAL from '../DataAccessLayer.js';
import Error from '../../../util/Error.js';

/**
 * Adds an account to the database.
 * 
 * @param {Account} account The Account to add to the database.
 * @param {string} hash The account's hashed password.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function createAccount(account, hash, callback) {
    console.log('Entering accountDAO.createAccount()');
    console.log("Attempting to insert the following account into the database: ");
    account.print();

    var username = account.getUsername();
    var password = hash;
    var emailAddress = account.getEmailAddress();

    var query = 'INSERT INTO account (username, password, email_address) VALUES (?, ?, ?);';
    var values = [username, password, emailAddress];

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
 * Retrieves an account from the database.
 * 
 * @param {string} id The account's id.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function getAccount(id, callback) {
    console.log('Entering accountDAO.getAccount()');

    var accountId = id;
    console.log('Searching for the following account id: ' + accountId);

    var query = 'SELECT id, username, email_address, date_created, date_updated FROM account WHERE id = ?;';
    var values = [accountId];

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
 * Retrieves the password for an account from the database.
 * 
 * @param {string} username The account's username.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function getAccountPassword(username, callback) {
    console.log('Entering accountDAO.getAccountCredentials()');
    console.log('Searching for the following username: ' + username);

    var query = 'SELECT id, password FROM account WHERE username = ?;';
    var values = [username];

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