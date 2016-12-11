var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users.js');

router.get('/', usersController.getUsers);
//router.get('/users/:id', usersController.getUser);
//router.post('/users', usersController.saveUser);

module.exports = router;