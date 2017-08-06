'use strict';

var DAL = require('../DAL.js');

/**
 * Adds a user to the database.
 * 
 * @param {User} user The User to add to the database.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
function createUser(user, callback) {
    console.log('Entering userDAO.createUser()');
    var dal = new DAL();
    var db = dal.getConnectionPool();

    console.log("Attempting to insert the following user into the database: ");
    user.print();

    var firstName = user.getFirstName();
    var lastName = user.getLastName();
    var emailAddress = user.getEmailAddress();

    db.getConnection(function (connectionError, connection) {
        if (!connectionError) {
            var query = 'INSERT INTO user (first_name, last_name, email_address) VALUES (?, ?, ?);';
            var values = [firstName, lastName, emailAddress];

            connection.query(query, values, function processQueryResults(queryError, queryResult) {
                if (!queryError) {
                    console.log("The query returned the following result: " + queryResult);
                    callback(null, queryResult);
                } else {
                    console.log("An error occurred executing the query: " + queryError + queryError.sql);
                    callback(queryError);
                }
                console.log("Closing database connection.");
                connection.release();
            });
        } else {
            console.log("There was a problem connecting to the database: " + connectionError);
            callback(connectionError);
        }
    });
}

module.exports.createUser = createUser;