'use strict';

var express = require('express');
var wishlistController = require('../controllers/wishlistController.js');
var wishlistItemController = require('../controllers/wishlistItemController.js');
var authenticate = require('../middleware/authentication.js');

var wishListRouter = new express.Router();
var wishlistItemRouter = new express.Router({
    mergeParams: true
});

wishListRouter.use('/:wishlistId/items', wishlistItemRouter);

// Create a wishlist
wishListRouter.post('/', authenticate, wishlistController.createWishlist);

// Retrieve a wishlist
wishListRouter.get('/:wishlistId', authenticate, wishlistController.getWishlist);


// Create a wishlist item
wishlistItemRouter.post('/', authenticate, wishlistItemController.createWishlistItem);

// Retrieve a wishlist item
wishlistItemRouter.get('/:itemId', authenticate, wishlistItemController.getWishlistItem);

module.exports = wishListRouter;