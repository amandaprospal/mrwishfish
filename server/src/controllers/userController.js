'use strict';

var User = require('../models/User.js');

var userController = {};

/**
 * Creates a new user.
 * 
 * @param {Object} req The Express request object.
 * @param {String} req.first_name The user's first name.
 * @param {String} req.last_name The user's last name.
 * @param {String} req.email_address The user's email address.
 * @param {Object} res The Express response object.
 * 
 * @return 200 if user was created successfully.
 *         500 if an error occurred.
 */
userController.createUser = function (req, res) {
    console.log('Entered userController.createUser()');

    var first_name = req.body.first_name;
    console.log('First name: ' + first_name);
    if (first_name === undefined) {
        res.status(500).json({
            message: 'first_name is a required parameter.'
        });
        return;
    }

    var last_name = req.body.last_name;
    console.log('Last name: ' + last_name);
    if (last_name === undefined) {
        res.status(500).json({
            message: 'last_name is a required parameter.'
        });
        return;
    }

    var email_address = req.body.email_address;
    console.log('Email Address: ' + email_address);
    if (email_address === undefined) {
        res.status(500).json({
            message: 'email_address is a required parameter.'
        });
        return;
    }

    var user = new User(first_name, last_name, email_address);
    user.print();
    user.createUser(user, function processCreateUserResults(err){
        if (err) {
            res.status(500).json({
                message: 'A database error occurred.'
            });
        } else {
            res.status(200).json({
                message: 'The user was created successfully.'
            });
        }
    });
    
    return;
};

/**
 * Retrieves a specific user by their user id.
 * 
 * @param {Object} req The Express request object.
 * @param {String} req.id The user's id.
 * @param {Object} res The Express response object.
 * 
 * @return 200 if user was retrieved successfully.
 *         500 if an error occurred.
 */
userController.getUser = function (req, res) {
    console.log('Entered userController.getUser()');

    var userId = req.params.id;

    console.log('Received the following user id: ' + userId);

    User.getUser(userId, function processGetUserResults(err, user) {
        if (err) {
            res.status(500).json({
                message: err
            });
        } else {
            res.status(200).json({
                message: 'Successfully retrieved a matching user.',
                user: user
            });
        }
    });
};

module.exports = userController;