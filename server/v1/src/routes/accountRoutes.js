'use strict';

var express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
var router = new express.Router();
var accountController = require('../controllers/accountController.js');
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

// Create a single account
router.post('/', accountController.createAccount);

// Retrieve a single account
router.get('/:id', checkJwt, accountController.getAccount);

module.exports = router;