'use strict';

import * as accountDAO from '../db/mysql/dao/accountDAO.js';
import Error from '../util/Error.js';

/**
 * Represents an Account.
 */
export default class Account {
    /**
     * Creates an Account.
     * 
     * @param {string} username The username.
     * @param {string} emailAddress The email address.
     */
    constructor(username, emailAddress) {
        this.id = null;
        this.username = username;
        this.emailAddress = emailAddress;
        this.createdDate = null;
        this.updatedDate = null;
    }

    /**
     * Sets the account's id.
     * 
     * @param {number} id The account's id.
     */
    setId(id) {
        this.id = id;
    }

    /**
     * Gets the account's username.
     * 
     * @return {string} The username.
     */
    getUsername() {
        return this.username;
    }

    /**
     * Sets the account's username.
     * 
     * @param {string} username The username.
     */
    setUsername(username) {
        this.username = username;
    }

    /**
     * Gets the account's email address.
     * @return {string} The email address.
     */
    getEmailAddress() {
        return this.emailAddress;
    }

    /**
     * Sets the account's email address.
     * 
     * @param {string} emailAddress The email address.
     */
    setEmailAddress(emailAddress) {
        this.emailAddress = emailAddress;
    }

    /**
     * Sets the account's creation date.
     * 
     * @param {Date} createdDate The timestamp of when the account was created.
     */
    setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    /**
     * Sets the account's updated date.
     * 
     * @param {Date} updatedDate The timestamp of when the account was last updated.
     */
    setUpdatedDate(updatedDate) {
        this.updatedDate = updatedDate;
    }

    toString() {
        return 'ID: ' + this.id + ', Username: ' + this.username + ', Email address: ' + this.emailAddress + ', Created Date: ' + this.createdDate + ', Updated Date: ' + this.updatedDate;
    }

    print() {
        console.log(this.toString());
    }

    getAccount (callback) {
        accountDAO.getAccount(callback);
    }

    /**
     * Creates a new account within the system.
     * 
     * @param {Account} account The account to create.
     * @param {string} hash The account's hashed password.
     * @param {function} callback The function to callback to after this function finishes executing.
     */
    createAccount(account, hash, callback) {
        console.log('Entering Account.creatAccount()');
        accountDAO.createAccount(account, hash, callback);
    }
}

/**
 * Retrieves an account by the account's id.
 * 
 * @param {string} accountId The account's id.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function getAccount(accountId, callback) {
    console.log('Entering Account.getAccount()');
    accountDAO.getAccount(accountId, function(error, data) {
        if (!error) {
            var accountData = data;            

            if (data.length === 0) {
                error = new Error(500, 'No matching accounts were found.');
                callback(error);
            } else if (data.length === 1) {
                //transform account data into an Account object
                accountData = accountData[0];

                var id = accountData.id;
                var username = accountData.username;
                var email_address = accountData.email_address;
                var created_date = accountData.date_created;
                var updated_date = accountData.date_updated;

                var account = new Account(username, email_address);
                account.setId(id);
                account.setCreatedDate(created_date);
                account.setUpdatedDate(updated_date);

                callback(null, account);
            } else {
                error = new Error(500, 'The database did not return the expected number of results.');
                callback(error);
            }
        } else {
            error = new Error(500, 'Unable to get the requested account.');
            callback(error);
        }
    });
}

/**
 * Retrieves an account's password.
 *
 * @param {string} username The account's username.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function getAccountPassword(username, callback) {
    console.log('Entering Account.getAccountPassword()');
    accountDAO.getAccountPassword(username, function(error, data) {
        if (!error) {
            var accountData = data;            

            if (data.length === 0) {
                error = new Error(500, 'An account with that username does not exist.');
                callback(error);
            } else if (data.length === 1) {
                accountData = accountData[0];
                var userId = accountData.id;
                var password = accountData.password;
                callback(null, userId, password);
            } else if (data.length > 1) {
                error = new Error(500, 'The database returned more than one account for the requested username.');
                callback(error);
            }
        } else {
            error = new Error(500, 'There was a problem retrieving the account from the database.');
            callback(error);
        }
    });
}