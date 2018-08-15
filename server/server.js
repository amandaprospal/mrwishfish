'use strict';

const bodyParser = require('body-parser');
const config = require('./config/config.js');
const express = require('express');
const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);

const SERVER_PORT = config.server.port;
const SESSION_SECRET = config.sessions.secret;

let app = express();

// Set up body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Set up session storage for authorization
app.use(expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore()
}));

// Set up routes
app.use('/api/v1/accounts', require('./v1/src/routes/accountRoutes.js'));
app.use('/api/v1/login', require('./v1/src/routes/loginRoutes.js'));
app.use('/api/v1/users', require('./v1/src/routes/userRoutes.js'));
app.use('/api/v1/wishlists', require('./v1/src/routes/wishlistRoutes.js'));

// Start the server
app.listen(SERVER_PORT);
console.log('Wishlist server started successfully on port ' + SERVER_PORT);

module.exports = app;