'use strict';

var express = require('express');
var router = new express.Router();
var accountController = require('../controllers/accountController.js');
var authenticate = require('../middleware/authentication.js');

// Create a single account
router.post('/', accountController.createAccount);

// Retrieve a single account
router.get('/:id', authenticate, accountController.getAccount);

module.exports = router;