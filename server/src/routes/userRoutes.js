var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');

router.get('/', userController.getUsers);
//router.get('/users/:id', usersController.getUser);
//router.post('/users', usersController.saveUser);

module.exports = router;