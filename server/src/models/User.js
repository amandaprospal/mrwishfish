'use strict';

var userDAO = require('../db/mysql/dao/userDAO.js');

/**
 * Represents a User.
 */
class User {
    /**
     * Creates a User.
     * 
     * @param {String} firstName The user's first name.
     * @param {String} lastName The user's last name.
     * @param {String} emailAddress The user's email address.
     */
    constructor(firstName, lastName, emailAddress) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
    }

    /**
     * Gets the user's first name.
     * 
     * @return {String} The user's first name.
     */
    getFirstName() {
        return this.firstName;
    }

    /**
     * Sets the user's first name.
     * 
     * @param {String} firstName The user's first name.
     */
    setFirstName(firstName) {
        this.firstName = firstName;
    }

    /**
     * Gets the user's last name.
     * 
     * @return {String} The user's last name.
     */
    getLastName() {
        return this.lastName;
    }

    /**
     * Sets the user's last name.
     * 
     * @param {String} lastName The user's last name.
     */
    setLastName(lastName) {
        this.lastName = lastName;
    }

    /**
     * Gets the user's email address.
     * @return {String} The user's email address.
     */
    getEmailAddress() {
        return this.emailAddress;
    }

    /**
     * Sets the user's email address.
     * 
     * @param {String} emailAddress The user's email address.
     */
    setEmailAddress(emailAddress) {
        this.emailAddress = emailAddress;
    }

    toString() {
        return 'First name: ' + this.firstName + ', Last name: ' + this.lastName + ', Email address: ' + this.emailAddress;
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
        userDAO.createUser(user, callback);
    }
}

module.exports = User;