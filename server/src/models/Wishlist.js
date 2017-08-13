'use strict';

var wishlistDAO = require('../db/mysql/dao/wishlistDAO.js');

/**
 * Represents a Wishlist.
 */
class Wishlist {
    /**
     * Creates a Wishlist.
     * 
     * @param {Number} userId The id of the user who owns the wishlist.
     * @param {String} name The name of the wishlist.
     * @param {Boolean} isPrivate Whether the wishlist is private.
     */
    constructor(userId, name, isPrivate) {
        this.userId = userId;
        this.name = name;
        this.isPrivate = isPrivate;
    }

    /**
     * Gets the id of the user who owns the wishlist.
     * 
     * @return {Number} The id of the user who owns the wishlist.
     */
    getUserId() {
        return this.userId;
    }

    /**
     * Sets the id of the user who owns the wishlist.
     * 
     * @param {Number} userId The id of the user who owns the wishlist
     */
    setUserId(userId) {
        this.userId = userId;
    }

    /**
     * Gets the name of the wishlist.
     * 
     * @return {String} The name of the wishlist.
     */
    getName() {
        return this.name;
    }

    /**
     * Sets the name of the wishlist.
     * 
     * @param {String} name The name of the wishlist.
     */
    setName(name) {
        this.name = name;
    }

    /**
     * Gets the isPrivate flag of the wishlist.
     * @return {Boolean} The isPrivate flag of the wishlist.
     */
    getIsPrivate() {
        return this.isPrivate;
    }

    /**
     * Sets the isPrivate flag of the wishlist.
     * 
     * @param {Boolean} isPrivate The isPrivate flag of the wishlist.
     */
    setIsPrivate(isPrivate) {
        this.isPrivate = isPrivate;
    }

    toString() {
        return 'Name: ' + this.name + ', User ID: ' + this.userId + ', Is Private: ' + this.isPrivate;
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
        wishlistDAO.createWishlist(wishlist, callback);
    }
}

/**
 * Retrieves a wishlist by its id.
 * 
 * @param {Number} wishlistId The wishlist id.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
function getWishlist(wishlistId, callback) {
    wishlistDAO.getWishlist(wishlistId, function(err, data) {
        if (!err) {
            var wishlistData = data;            

            if (data.length === 0) {
                callback('No matching wishlists were found.');
            } else if (data.length === 1) {
                //transform wishlist data into a Wishlist object
                var user_id = wishlistData[0].user_id;
                var name = wishlistData[0].name;
                var is_private = wishlistData[0].is_private;

                var wishlist = new Wishlist(user_id, name, is_private);

                callback(null, wishlist);
            } else {
                callback('The database did not return the expected number of results.');
            }
        } else {
            callback(err);
        }
    });
}

module.exports = Wishlist;
module.exports.getWishlist = getWishlist;