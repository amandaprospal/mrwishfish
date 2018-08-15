'use strict';

import User, {getUser} from '../models/User';

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
userController.getUser = function (req, res) {
    console.log('Entered userController.getUser()');

    var userId = req.params.id;

    console.log('Received the following user id: ' + userId);

    getUser(userId, function processGetUserResults(error, user) {
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

module.exports = userController;