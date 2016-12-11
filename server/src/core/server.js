var config = require('../../config/config.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 8080;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/users', require('../routes/users.js'));

app.listen(config.server.port);
console.log('Server started successfully on port ' + port);