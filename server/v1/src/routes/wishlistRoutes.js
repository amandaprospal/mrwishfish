'use strict';

var express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
var wishlistController = require('../controllers/wishlistController.js');
var wishlistItemController = require('../controllers/wishlistItemController.js');
var authenticate = require('../middleware/authentication.js');

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://53lunastation.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: 'U0xU6AmmiEkxSRhj1qVG2UgvsJmvYOBt',
    issuer: `https://53lunastation.auth0.com/`,
    algorithms: ['RS256']
  });

var wishListRouter = new express.Router();
var wishlistItemRouter = new express.Router({
    mergeParams: true
});

// Create a wishlist
wishListRouter.post('/', checkJwt, wishlistController.createWishlist);

// Retrieve a wishlist
wishListRouter.get('/:wishlistId', checkJwt, wishlistController.getWishlist);

// Retrieve all wishlists for a specific user
wishListRouter.get('/:userId/wishlists', checkJwt, wishlistController.getWishlists);


// Set up wishlist item router
wishListRouter.use('/:wishlistId/items', wishlistItemRouter);

// Create a wishlist item
wishlistItemRouter.post('/', checkJwt, wishlistItemController.createWishlistItem);

// Retrieve a wishlist item
wishlistItemRouter.get('/:itemId', checkJwt, wishlistItemController.getWishlistItem);

// Retrieve all wishlist items for a specific wishlist
wishlistItemRouter.get('/', checkJwt, wishlistItemController.getWishlistItems);
module.exports = wishListRouter;