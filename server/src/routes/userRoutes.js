'use strict';

var express = require('express');
var router = new express.Router();
var userController = require('../controllers/userController.js');

// Create a single user
router.post('/', userController.createUser);

module.exports = router;