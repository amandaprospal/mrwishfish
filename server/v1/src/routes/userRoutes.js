'use strict';

var express = require('express');
var router = new express.Router();
var userController = require('../controllers/userController.js');
var authenticate = require('../middleware/authentication.js');

// Retrieve a single user
router.get('/:id', authenticate, userController.getUser);

module.exports = router;