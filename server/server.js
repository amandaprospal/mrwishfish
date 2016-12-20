var bodyParser = require('body-parser');
var config = require('./config/config.js');
var express = require('express');
var mysql = require('mysql');

var SERVER_PORT = config.server.port;

var app = express();

// Set up body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Set up database connection pool
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'wishlist'
});
app.set('db', pool);

// Set up routes
app.use('/users', require('./src/routes/userRoutes.js'));

// Start the server
app.listen(SERVER_PORT);
console.log('Wishlist server started successfully on port ' + SERVER_PORT);