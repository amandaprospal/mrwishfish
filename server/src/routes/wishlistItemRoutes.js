'use strict';

var express = require('express');
var router = new express.Router();
var wishlistItemController = require('../controllers/wishlistItemController.js');

// Create a wishlist item
router.post('/', wishlistItemController.createWishlistItem);

// Retrieve a wishlist item
router.get('/:id', wishlistItemController.getWishlistItem);

module.exports = router;