'use strict';

import * as userDAO from '../db/mysql/dao/userDAO.js';
import Error from '../util/Error.js';

/**
 * Represents a User.
 */
export default class User {
    /**
     * Creates a User.
     * 
     * @param {string} firstName The user's first name.
     * @param {string} lastName The user's last name.
     * @param {string} emailAddress The user's email address.
     */
    constructor(firstName, lastName, emailAddress) {
        this.id = null;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.createdDate = null;
        this.updatedDate = null;
    }

    /**
     * Sets the user's id.
     * 
     * @param {number} id The user's id.
     */
    setId(id) {
        this.id = id;
    }

    /**
     * Gets the user's first name.
     * 
     * @return {string} The user's first name.
     */
    getFirstName() {
        return this.firstName;
    }

    /**
     * Sets the user's first name.
     * 
     * @param {string} firstName The user's first name.
     */
    setFirstName(firstName) {
        this.firstName = firstName;
    }

    /**
     * Gets the user's last name.
     * 
     * @return {string} The user's last name.
     */
    getLastName() {
        return this.lastName;
    }

    /**
     * Sets the user's last name.
     * 
     * @param {string} lastName The user's last name.
     */
    setLastName(lastName) {
        this.lastName = lastName;
    }

    /**
     * Gets the user's email address.
     * @return {string} The user's email address.
     */
    getEmailAddress() {
        return this.emailAddress;
    }

    /**
     * Sets the user's email address.
     * 
     * @param {string} emailAddress The user's email address.
     */
    setEmailAddress(emailAddress) {
        this.emailAddress = emailAddress;
    }

    /**
     * Sets the user's creation date.
     * 
     * @param {Date} createdDate The timestamp of when the user was created.
     */
    setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    /**
     * Sets the user's updated date.
     * 
     * @param {Date} updatedDate The timestamp of when the user was last updated.
     */
    setUpdatedDate(updatedDate) {
        this.updatedDate = updatedDate;
    }

    toString() {
        return 'ID: ' + this.id + ', First name: ' + this.firstName + ', Last name: ' + this.lastName + ', Email address: ' + this.emailAddress + ', Created Date: ' + this.createdDate + ', Updated Date: ' + this.updatedDate;
    }

    print() {
        console.log(this.toString());
    }

    getUser (callback) {
        userDAO.getUser(callback);
    }

    /**
     * Creates a new user within the system.
     * 
     * @param {User} user The user to create.
     * @param {function} callback The function to callback to after this function finishes executing.
     */
    createUser(user, callback) {
        console.log('Entering User.createUser()');
        userDAO.createUser(user, callback);
    }
}

/**
 * Retrieves a user by the user's id.
 * 
 * @param {string} userId The user's id.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function getUser(userId, callback) {
    console.log('Entering User.getUser()');
    userDAO.getUser(userId, function(error, data) {
        if (!error) {
            var userData = data;            

            if (data.length === 0) {
                error = new Error(500, 'No matching users were found.');
                callback(error);
            } else if (data.length === 1) {
                //transform user data into a User object
                userData = userData[0];

                var id = userData.id;
                var first_name = userData.first_name;
                var last_name = userData.last_name;
                var email_address = userData.email_address;
                var created_date = userData.date_created;
                var updated_date = userData.date_updated;

                var user = new User(first_name, last_name, email_address);
                user.setId(id);
                user.setCreatedDate(created_date);
                user.setUpdatedDate(updated_date);

                callback(null, user);
            } else {
                error = new Error(500, 'The database did not return the expected number of results.');
                callback(error);
            }
        } else {
            error = new Error(500, 'Unable to get the requested user.');
            callback(error);
        }
    });
}