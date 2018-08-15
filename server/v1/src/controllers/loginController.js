'use strict';

var bcrypt = require('bcrypt');
import {getAccountPassword} from '../models/Account';

/** @namespace */
var loginController = {};

/**
 * 
 * 
 * @param {Object} req The Express request object.
 * @param {string} req.body.username The user's username.
 * @param {string} req.body.password The user's password.
 * @param {Object} res The Express response object.
 * 
 * @return 20X if user was authenticated successfully.
 *         500 if an error occurred.
 */
loginController.loginUser = function (req, res) {
    console.log('Entered loginController.loginUser()');

    var username = req.body.username;
    console.log('Username: ' + username);
    if (username === undefined) {
        res.status(500).json({
            message: 'username is a required parameter.'
        });
        return;
    }

    var password = req.body.password;
    console.log('Password: ' + password);
    if (password === undefined) {
        res.status(500).json({
            message: 'password is a required parameter.'
        });
        return;
    }

    getAccountPassword(username, function processGetAccountPasswordResults(error, userId, hash) {
        if (error) {
            res.status(error.statusCode).json({
                error
            });
        } else {
            bcrypt.compare(password, hash, function(err, isMatched) {
                if (isMatched == true) {
                    console.log('The passwords matched. Setting req.session.userId to: ' + userId);
                    req.session.userId = userId;
                    res.status(200).json({
                        message: 'Authentication successful.'
                    });
                    return;
                } else {
                    console.log('Invalid password.');
                    res.status(401).json({
                        message: 'Invalid password.'
                    });
                    return;
                }
            });
        }
    });
    
    return;
};

module.exports = loginController;