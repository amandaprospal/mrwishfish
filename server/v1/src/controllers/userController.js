'use strict';

import User, {getUserById, getUserByEmailAddress} from '../models/User';

/** @namespace */
var userController = {};

/**
 * Retrieves a specific user by their user id.
 * 
 * @param {Object} req The Express request object.
 * @param {string} req.id The user's id.
 * @param {Object} res The Express response object.
 * 
 * @return 200 if user was retrieved successfully.
 *         500 if an error occurred.
 */
userController.getUserById = function (req, res) {
    console.log('Entered userController.getUserById()');

    var userId = req.params.id;

    console.log('Received the following user id: ' + userId);

    getUserById(userId, function processGetUserResults(error, user) {
        if (error) {
            res.status(error.statusCode).json({
                error
            });
        } else {
            res.status(200).json({
                user
            });
        }
    });
};

/**
 * Retrieves a specific user by their email address.
 * 
 * @param {Object} req The Express request object.
 * @param {string} req.id The user's email address.
 * @param {Object} res The Express response object.
 * 
 * @return 200 if user was retrieved successfully.
 *         500 if an error occurred.
 */
userController.getUserByEmailAddress = function (req, res) {
    console.log('Entered userController.getUserByEmailAddress()');

    var emailAddress = req.params.emailAddress;

    console.log('Received the following user email address: ' + emailAddress);

    getUserByEmailAddress(emailAddress, function processGetUserResults(error, user) {
        if (error) {
            if(error.description === 'No matching users were found.') {
                var newUser = new User(emailAddress, '', '');
                newUser.createUser(newUser, function processCreateUserResults(error, results) {
                    console.log("RESULTS: ");
                    console.log( results);
                    if (error) {
                        res.status(error.statusCode).json({
                            error
                        });
                    } else {
                        getUserById(results.insertId, function processGetUserResults(error, user) {
                            if (error) {
                                res.status(error.statusCode).json({
                                    error
                                });
                            } else {
                                res.status(201).json({
                                    user
                                });
                            }
                        });
                    }
                });
            }
            else {
                res.status(error.statusCode).json({
                    error
                });
            }
        } else {
            res.status(200).json({
                user
            });
        }
    });
};

module.exports = userController;