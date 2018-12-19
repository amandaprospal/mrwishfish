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

wishListRouter.use('/:wishlistId/items', wishlistItemRouter);

// Create a wishlist
wishListRouter.post('/', checkJwt, wishlistController.createWishlist);

// Retrieve a wishlist
wishListRouter.get('/:wishlistId', checkJwt, wishlistController.getWishlist);


// Create a wishlist item
wishlistItemRouter.post('/', authenticate, wishlistItemController.createWishlistItem);

// Retrieve a wishlist item
wishlistItemRouter.get('/:itemId', authenticate, wishlistItemController.getWishlistItem);

module.exports = wishListRouter;