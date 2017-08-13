'use strict';

var express = require('express');
var router = new express.Router();
var wishlistController = require('../controllers/wishlistController.js');

// Create a wishlist
router.post('/', wishlistController.createWishlist);

module.exports = router;