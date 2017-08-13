'use strict';

var bodyParser = require('body-parser');
var config = require('./config/config.js');
var express = require('express');

var SERVER_PORT = config.server.port;

var app = express();

// Set up body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Set up routes
app.use('/user', require('./src/routes/userRoutes.js'));
app.use('/wishlist', require('./src/routes/wishlistRoutes.js'));

// Start the server
app.listen(SERVER_PORT);
console.log('Wishlist server started successfully on port ' + SERVER_PORT);

module.exports = app;