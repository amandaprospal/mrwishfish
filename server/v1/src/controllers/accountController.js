'use strict';

const bcrypt = require('bcrypt');
import Account, {getAccount} from '../models/Account';
import User, {getUser} from '../models/User';

/** @namespace */
var accountController = {};

const NUM_SALT_ROUNDS = 10;

/**
 * Creates a new account.
 * 
 * @param {Object} req The Express request object.
 * @param {string} req.body.username The username.
 * @param {string} req.body.password The password.
 * @param {string} req.body.emailAddress The email address.
 * @param {string} req.body.firstName The user's first name.
 * @param {string} req.body.lastName The user's last name.
 * @param {Object} res The Express response object.
 * 
 * @return 201 if account was created successfully.
 *         500 if an error occurred.
 */
accountController.createAccount = function (req, res) {
    console.log('Entered accountController.createAccount()');

    var username = req.body.username;
    console.log('Username: ' + username);
    if (username === undefined) {
        res.status(500).json({
            message: 'username is a required parameter.'
        });
        return;
    }

    var password = req.body.password;
    if (password === undefined) {
        res.status(500).json({
            message: 'password is a required parameter.'
        });
        return;
    }

    var emailAddress = req.body.emailAddress;
    console.log('Email Address: ' + emailAddress);
    if (emailAddress === undefined) {
        res.status(500).json({
            message: 'emailAddress is a required parameter.'
        });
        return;
    }

    var firstName = req.body.firstName;
    console.log('First name: ' + firstName);
    if (firstName === undefined) {
        res.status(500).json({
            message: 'firstName is a required parameter.'
        });
        return;
    }

    var lastName = req.body.lastName;
    console.log('Last name: ' + lastName);
    if (lastName === undefined) {
        res.status(500).json({
            message: 'lastName is a required parameter.'
        });
        return;
    }

    bcrypt.hash(password, NUM_SALT_ROUNDS, function(hashError, hash) {
        if(hashError) {
            console.log('There was a problem hashing the account password: ' + hashError);
            var error = new Error(500, 'Unable to create account.');
            res.status(error.statusCode).json({
                error
            });
        } else {
            var account = new Account(username, emailAddress);
            account.print();
            account.createAccount(account, hash, function processCreateAccountResults(error, results){
                if (error) {
                    res.status(error.statusCode).json({
                        error
                    });
                } else {
                    getAccount(results.insertId, function processGetAccountResults(error, account) {
                        if (error) {
                            res.status(error.statusCode).json({
                                error
                            });
                        } else {
                            var accountId = account.id;
                            var user = new User(accountId, firstName, lastName);
                            user.print();
                            user.createUser(user, function processCreateUserResults(error, results){
                                if (error) {
                                    res.status(error.statusCode).json({
                                        error
                                    });
                                } else {
                                    getUser(results.insertId, function processGetUserResults(error, user) {
                                        if (error) {
                                            res.status(error.statusCode).json({
                                                error
                                            });
                                        } else {
                                            res.status(201).json({
                                                account, user
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    
    return;
};

/**
 * Retrieves a specific account by the account's id.
 * 
 * @param {Object} req The Express request object.
 * @param {string} req.id The account's id.
 * @param {Object} res The Express response object.
 * 
 * @return 200 if account was retrieved successfully.
 *         500 if an error occurred.
 */
accountController.getAccount = function (req, res) {
    console.log('Entered accountController.getAccount()');

    var accountId = req.params.id;

    console.log('Received the following account id: ' + accountId);

    getAccount(accountId, function processGetAccountPasswordResults(error, account) {
        if (error) {
            res.status(error.statusCode).json({
                error
            });
        } else {
            res.status(200).json({
                account
            });
        }
    });
};

module.exports = accountController;