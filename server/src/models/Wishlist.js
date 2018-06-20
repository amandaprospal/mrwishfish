'use strict';

import * as wishlistDAO from '../db/mysql/dao/wishlistDAO.js';
import Error from '../util/Error.js';

/**
 * Represents a Wishlist.
 */
export default class Wishlist {
    /**
     * Creates a Wishlist.
     * 
     * @param {number} userId The id of the user who owns the wishlist.
     * @param {string} name The name of the wishlist.
     * @param {boolean} isPrivate Whether the wishlist is private.
     */
    constructor(userId, name, isPrivate) {
        this.id = null;
        this.userId = userId;
        this.name = name;
        this.isPrivate = isPrivate;
        this.createdDate = null;
        this.updatedDate = null;
    }

    /**
     * Sets the wishlist's id.
     * 
     * @param {number} id The wishlist's id.
     */
    setId(id) {
        this.id = id;
    }

    /**
     * Gets the id of the user who owns the wishlist.
     * 
     * @return {number} The id of the user who owns the wishlist.
     */
    getUserId() {
        return this.userId;
    }

    /**
     * Sets the id of the user who owns the wishlist.
     * 
     * @param {number} userId The id of the user who owns the wishlist
     */
    setUserId(userId) {
        this.userId = userId;
    }

    /**
     * Gets the name of the wishlist.
     * 
     * @return {string} The name of the wishlist.
     */
    getName() {
        return this.name;
    }

    /**
     * Sets the name of the wishlist.
     * 
     * @param {string} name The name of the wishlist.
     */
    setName(name) {
        this.name = name;
    }

    /**
     * Gets the isPrivate flag of the wishlist.
     * @return {boolean} The isPrivate flag of the wishlist.
     */
    getIsPrivate() {
        return this.isPrivate;
    }

    /**
     * Sets the isPrivate flag of the wishlist.
     * 
     * @param {boolean} isPrivate The isPrivate flag of the wishlist.
     */
    setIsPrivate(isPrivate) {
        this.isPrivate = isPrivate;
    }

    /**
     * Sets the wishlist's creation date.
     * 
     * @param {Date} createdDate The timestamp of when the wishlist was created.
     */
    setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    /**
     * Sets the wishlist's updated date.
     * 
     * @param {Date} updatedDate The timestamp of when the wishlist was last updated.
     */
    setUpdatedDate(updatedDate) {
        this.updatedDate = updatedDate;
    }

    toString() {
        return 'ID: ' + this.id + ', Name: ' + this.name + ', User ID: ' + this.userId + ', Is Private: ' + this.isPrivate + ', Created Date: ' + this.createdDate + ', Updated Date: ' + this.updatedDate;
    }

    print() {
        console.log(this.toString());
    }

    getWishlist (callback) {
        wishlistDAO.getWishlist(callback);
    }

    /**
     * Creates a new wishlist within the system.
     * 
     * @param {Wishlist} wishlist The wishlist to create.
     * @param {function} callback The function to callback to after this function finishes executing.
     */
    createWishlist(wishlist, callback) {
        console.log('Entering Wishlist.createWishlist()');
        wishlistDAO.createWishlist(wishlist, callback);
    }
}

/**
 * Retrieves a wishlist by its id.
 * 
 * @param {number} wishlistId The wishlist id.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function getWishlist(wishlistId, callback) {
    wishlistDAO.getWishlist(wishlistId, function(error, data) {
        if (!error) {
            var wishlistData = data;            

            if (data.length === 0) {
                error = new Error(500, 'No matching wishlists were found.');
                callback(error);
            } else if (data.length === 1) {
                //transform wishlist data into a Wishlist object
                 wishlistData = wishlistData[0];

                var id = wishlistData.id;
                var user_id = wishlistData.user_id;
                var name = wishlistData.name;
                var is_private = wishlistData.is_private;
                var created_date = wishlistData.date_created;
                var updated_date = wishlistData.date_updated;

                var wishlist = new Wishlist(user_id, name, is_private);
                wishlist.setId(id);
                wishlist.setCreatedDate(created_date);
                wishlist.setUpdatedDate(updated_date);

                callback(null, wishlist);
            } else {
                error = new Error(500, 'The database did not return the expected number of results.');
                callback(error);
            }
        } else {
            error = new Error(500, 'Unable to get the requested wishlist.');
            callback(error);
        }
    });
}