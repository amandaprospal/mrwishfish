'use strict';

import DAL from '../DAL.js';
import Error from '../../../util/Error.js';

/**
 * Adds an account to the database.
 * 
 * @param {Account} account The Account to add to the database.
 * @param {string} hash, The account's hashed password.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function createAccount(account, hash, callback) {
    console.log('Entering accountDAO.createAccount()');

    var dal = new DAL();
    var db = dal.getConnectionPool();

    console.log("Attempting to insert the following account into the database: ");
    account.print();

    var username = account.getUsername();
    var password = hash;
    var emailAddress = account.getEmailAddress();

    db.getConnection(function (connectionError, connection) {
        if (!connectionError) {
            var query = 'INSERT INTO account (username, password, email_address) VALUES (?, ?, ?);';
            var values = [username, password, emailAddress];

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
 * Retrieves an account from the database.
 * 
 * @param {string} id The account's id.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function getAccount(id, callback) {
    console.log('Entering accountDAO.getAccount()');

    var dal = new DAL();
    var db = dal.getConnectionPool();

    var accountId = id;
    console.log('Searching for the following account id: ' + accountId);

    db.getConnection(function (connectionError, connection) {
        if (!connectionError) {
            var query = 'SELECT id, username, email_address, date_created, date_updated FROM account WHERE id = ?;';
            var values = [accountId];

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

    var dal = new DAL();
    var db = dal.getConnectionPool();

    console.log('Searching for the following username: ' + username);

    db.getConnection(function (connectionError, connection) {
        if (!connectionError) {
            var query = 'SELECT id, password FROM account WHERE username = ?;';
            var values = [username];

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