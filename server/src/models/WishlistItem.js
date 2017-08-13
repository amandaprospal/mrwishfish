'use strict';

var wishlistItemDAO = require('../db/mysql/dao/wishlistItemDAO.js');

/**
 * Represents a Wishlist Item.
 */
class WishlistItem {
    /**
     * Creates a Wishlist Item.
     * 
     * @param {Number} wishlistId The id of the wishlist the wishlist item belongs to.
     * @param {String} name The name of the wishlist item.
     * @param {Number} price The price of the wishlist item.
     * @param {String} itemUrl The URL to the website of the wishlist item.
     * @param {String} imageUrl The URL to the image of the wishlist item.
     * @param {Boolean} isPurchased Whether the wishlist item has been purchased.
     */
    constructor(wishlistId, name, price, itemUrl, imageUrl, isPurchased) {
        this.wishlistId = wishlistId;
        this.name = name;
        this.price = price;
        this.itemUrl = itemUrl;
        this.imageUrl = imageUrl;
        this.isPurchased = isPurchased;
    }

    /**
     * Gets the id of the wishlist the wishlist item belongs to.
     * 
     * @return {Number} The id of the wishlist the wishlist item belongs to.
     */
    getWishlistId() {
        return this.wishlistId;
    }

    /**
     * Sets the id of the wishlist the wishlist item belongs to.
     * 
     * @param {Number} wishlistId The id of the wishlist the wishlist item belongs to.
     */
    setUserId(userId) {
        this.userId = userId;
    }

    /**
     * Gets the name of the wishlist item.
     * 
     * @return {String} The name of the wishlist item.
     */
    getName() {
        return this.name;
    }

    /**
     * Sets the name of the wishlist item.
     * 
     * @param {String} name The name of the wishlist item.
     */
    setName(name) {
        this.name = name;
    }

    /**
     * Gets the price of the wishlist item.
     * @return {Number} The price of the wishlist item.
     */
    getPrice() {
        return this.price;
    }

    /**
     * Sets the price of the wishlist item.
     * 
     * @param {Number} price The price of the wishlist item.
     */
    setPrice(price) {
        this.price = price;
    }

    /**
     * Gets the URL of the wishlist item.
     * 
     * @return {String} The URL of the wishlist item.
     */
    getItemUrl() {
        return this.itemUrl;
    }

    /**
     * Sets the URL of the wishlist item.
     * 
     * @param {String} itemUrl The URL of the wishlist item.
     */
    setItemUrl(itemUrl) {
        this.itemUrl = itemUrl;
    }

    /**
     * Gets the image URL of the wishlist item.
     * 
     * @return {String} The image URL of the wishlist item.
     */
    getImageUrl() {
        return this.imageUrl;
    }

    /**
     * Sets the image URL of the wishlist item.
     * 
     * @param {String} imageUrl The image URL of the wishlist item.
     */
    setImageUrl(imageUrl) {
        this.imageUrl = imageUrl;
    }

    /**
     * Gets the isPurchased flag of the wishlist item.
     * 
     * @return {Boolean} The isPurchased flag of the wishlist item.
     */
    getIsPurchased() {
        return this.isPurchased;
    }

    /**
     * Sets the isPurchased flag of the wishlist item.
     * 
     * @param {Boolean} isPurchased The isPurchased flag of the wishlist item.
     */
    setIsPurchased(isPurchased) {
        this.isPurchased = isPurchased;
    }

    toString() {
        return 'Wishlist ID: ' + this.wishlistId + ', Name: ' + this.name + ', Price: ' + this.price + ', Item URL: ' + this.itemUrl + ', Image URL: ' + this.imageUrl + ', Is Purchased: ' + this.isPurchased;
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
        wishlistItemDAO.createWishlistItem(wishlistItem, callback);
    }
}

/**
 * Retrieves a wishlist item by its id.
 * 
 * @param {Number} wishlistItemId The wishlist item id.
 * @param {function} callback The function to callback to after this function finishes executing.
 * 
 * @return void
 */
function getWishlistItem(wishlistItemId, callback) {
    wishlistItemDAO.getWishlistItem(wishlistItemId, function(err, data) {
        if (!err) {
            var wishlistItemData = data;            

            if (data.length === 0) {
                callback('No matching wishlist items were found.');
            } else if (data.length === 1) {
                //transform wishlist item data into a WishlistItem object
                var wishlist_id = wishlistItemData[0].wishlist_id;
                var name = wishlistItemData[0].name;
                var price = wishlistItemData[0].price;
                var item_url = wishlistItemData[0].item_url;
                var image_url = wishlistItemData[0].image_url;
                var is_purchased = wishlistItemData[0].is_purchased;

                var wishlistItem = new WishlistItem(wishlist_id, name, price, item_url, image_url, is_purchased);

                callback(null, wishlistItem);
            } else {
                callback('The database did not return the expected number of results.');
            }
        } else {
            callback(err);
        }
    });
}

module.exports = WishlistItem;
module.exports.getWishlistItem = getWishlistItem;