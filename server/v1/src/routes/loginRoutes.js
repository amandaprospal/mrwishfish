'use strict';

var express = require('express');
var router = new express.Router();
var loginController = require('../controllers/loginController.js');

// log the user in
router.post('/', loginController.loginUser);

module.exports = router;