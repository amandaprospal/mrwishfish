'use strict';

import * as wishlistItemDAO from '../db/mysql/dao/wishlistItemDAO.js';
import Error from '../util/Error.js';

/**
 * Represents a Wishlist Item.
 */
export default class WishlistItem {
    /**
     * Creates a Wishlist Item.
     * 
     * @param {number} wishlistId The id of the wishlist the wishlist item belongs to.
     * @param {string} name The name of the wishlist item.
     * @param {number} price The price of the wishlist item.
     * @param {string} itemUrl The URL to the website of the wishlist item.
     * @param {string} imageUrl The URL to the image of the wishlist item.
     * @param {boolean} isPurchased Whether the wishlist item has been purchased.
     */
    constructor(wishlistId, name, price, itemUrl, imageUrl, isPurchased) {
        this.id = null;
        this.wishlistId = wishlistId;
        this.name = name;
        this.price = price;
        this.itemUrl = itemUrl;
        this.imageUrl = imageUrl;
        this.isPurchased = isPurchased;
        this.createdDate = null;
        this.updatedDate = null;
    }
    /**
     * Sets the wishlist item's id.
     * 
     * @param {number} id The wishlist item's id.
     */
    setId(id) {
        this.id = id;
    }

    /**
     * Gets the id of the wishlist the wishlist item belongs to.
     * 
     * @return {number} The id of the wishlist the wishlist item belongs to.
     */
    getWishlistId() {
        return this.wishlistId;
    }

    /**
     * Sets the id of the wishlist the wishlist item belongs to.
     * 
     * @param {number} wishlistId The id of the wishlist the wishlist item belongs to.
     */
    setUserId(userId) {
        this.userId = userId;
    }

    /**
     * Gets the name of the wishlist item.
     * 
     * @return {string} The name of the wishlist item.
     */
    getName() {
        return this.name;
    }

    /**
     * Sets the name of the wishlist item.
     * 
     * @param {string} name The name of the wishlist item.
     */
    setName(name) {
        this.name = name;
    }

    /**
     * Gets the price of the wishlist item.
     * @return {number} The price of the wishlist item.
     */
    getPrice() {
        return this.price;
    }

    /**
     * Sets the price of the wishlist item.
     * 
     * @param {number} price The price of the wishlist item.
     */
    setPrice(price) {
        this.price = price;
    }

    /**
     * Gets the URL of the wishlist item.
     * 
     * @return {string} The URL of the wishlist item.
     */
    getItemUrl() {
        return this.itemUrl;
    }

    /**
     * Sets the URL of the wishlist item.
     * 
     * @param {string} itemUrl The URL of the wishlist item.
     */
    setItemUrl(itemUrl) {
        this.itemUrl = itemUrl;
    }

    /**
     * Gets the image URL of the wishlist item.
     * 
     * @return {string} The image URL of the wishlist item.
     */
    getImageUrl() {
        return this.imageUrl;
    }

    /**
     * Sets the image URL of the wishlist item.
     * 
     * @param {string} imageUrl The image URL of the wishlist item.
     */
    setImageUrl(imageUrl) {
        this.imageUrl = imageUrl;
    }

    /**
     * Gets the isPurchased flag of the wishlist item.
     * 
     * @return {boolean} The isPurchased flag of the wishlist item.
     */
    getIsPurchased() {
        return this.isPurchased;
    }

    /**
     * Sets the isPurchased flag of the wishlist item.
     * 
     * @param {boolean} isPurchased The isPurchased flag of the wishlist item.
     */
    setIsPurchased(isPurchased) {
        this.isPurchased = isPurchased;
    }

    /**
     * Sets the wishlist item's creation date.
     * 
     * @param {Date} createdDate The timestamp of when the wishlist item was created.
     */
    setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    /**
     * Sets the wishlist item's updated date.
     * 
     * @param {Date} updatedDate The timestamp of when the wishlist item was last updated.
     */
    setUpdatedDate(updatedDate) {
        this.updatedDate = updatedDate;
    }

    toString() {
        return 'ID: ' + this.id + ', Wishlist ID: ' + this.wishlistId + ', Name: ' + this.name + ', Price: ' + this.price + ', Item URL: ' + this.itemUrl + ', Image URL: ' + this.imageUrl + ', Is Purchased: ' + this.isPurchased + ', Created Date: ' + this.createdDate + ', Updated Date: ' + this.updatedDate;
    }

    print() {
        console.log(this.toString());
    }

    getWishlistItem (callback) {
        wishlistItemDAO.getWishlistItem(callback);
    }

    /**
     * Creates a new wishlist item within the system.
     * 
     * @param {WishlistItem} wishlistItem The wishlist item to create.
     * @param {function} callback The function to callback to after this function finishes executing.
     */
    createWishlistItem(wishlistItem, callback) {
        console.log('Entering WishlistItem.createWishlistItem()');
        wishlistItemDAO.createWishlistItem(wishlistItem, callback);
    }
}

/**
 * Retrieves a wishlist item by its id.
 * 
 * @param {number} wishlistItemId The wishlist item id.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function getWishlistItem(wishlistItemId, callback) {
    wishlistItemDAO.getWishlistItem(wishlistItemId, function(error, data) {
        if (!error) {
            var wishlistItemData = data;            

            if (data.length === 0) {
                error = new Error(500, 'No matching wishlist items were found.');
                callback(error);
            } else if (data.length === 1) {
                //transform wishlist item data into a WishlistItem object
                wishlistItemData = wishlistItemData[0];

                var id = wishlistItemData.id;
                var wishlist_id = wishlistItemData.wishlist_id;
                var name = wishlistItemData.name;
                var price = wishlistItemData.price;
                var item_url = wishlistItemData.item_url;
                var image_url = wishlistItemData.image_url;
                var is_purchased = wishlistItemData.is_purchased;
                var created_date = wishlistItemData.date_created;
                var updated_date = wishlistItemData.date_updated;

                var wishlistItem = new WishlistItem(wishlist_id, name, price, item_url, image_url, is_purchased);
                wishlistItem.setId(id);
                wishlistItem.setCreatedDate(created_date);
                wishlistItem.setUpdatedDate(updated_date);

                callback(null, wishlistItem);
            } else {
                error = new Error(500, 'The database did not return the expected number of results.');
                callback(error);
            }
        } else {
            error = new Error(500, 'Unable to get the requested wishlist item.');
            callback(error);
        }
    });
}

/**
 * Retrieves all items for a specific wishlist id.
 * 
 * @param {number} wishlistId The wishlist id.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
export function getWishlistItems(wishlistId, callback) {
    wishlistItemDAO.getWishlistItems(wishlistId, function(error, data) {
        if (!error) {
            var wishlistItemData = data;            
            var wishlistItems = [];

            if (data.length === 0) {
                callback(null, wishlistItems);
            } else {
                for(var i = 0; i < wishlistItemData.length; i++) {
                    //transform wishlist item data into a WishlistItem object
                    var id = wishlistItemData[i].id;
                    var wishlist_id = wishlistItemData[i].wishlist_id;
                    var name = wishlistItemData[i].name;
                    var price = wishlistItemData[i].price;
                    var item_url = wishlistItemData[i].item_url;
                    var image_url = wishlistItemData[i].image_url;
                    var is_purchased = wishlistItemData[i].is_purchased;
                    var created_date = wishlistItemData[i].date_created;
                    var updated_date = wishlistItemData[i].date_updated;

                    var wishlistItem = new WishlistItem(wishlist_id, name, price, item_url, image_url, is_purchased);
                    wishlistItem.setId(id);
                    wishlistItem.setCreatedDate(created_date);
                    wishlistItem.setUpdatedDate(updated_date);
                    wishlistItems.push(wishlistItem);
                }

                callback(null, wishlistItems);
            }
        } else {
            error = new Error(500, 'Unable to get the requested wishlist items.');
            callback(error);
        }
    });
}