'use strict';

var User = require('../models/User.js');

var userController = {};

/**
 * Creates a new user.
 * 
 * @param {Object} req The Express request object.
 * @param {String} req.body.firstName The user's first name.
 * @param {String} req.body.lastName The user's last name.
 * @param {String} req.body.emailAddress The user's email address.
 * @param {Object} res The Express response object.
 * 
 * @return 200 if user was created successfully.
 *         500 if an error occurred.
 */
userController.createUser = function (req, res) {
    console.log('Entered userController.createUser()');

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

    var emailAddress = req.body.emailAddress;
    console.log('Email Address: ' + emailAddress);
    if (emailAddress === undefined) {
        res.status(500).json({
            message: 'emailAddress is a required parameter.'
        });
        return;
    }

    var user = new User(firstName, lastName, emailAddress);
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