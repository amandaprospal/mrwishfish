var userDAO = require('../db/mysql/dao/userDAO.js');

var User = function (data) {
    this.data = data;
}

User.prototype.data = {};

User.prototype.get = function (name) {
    return this.data[name];
}

User.prototype.set = function (name, value) {
    this.data[name] = value;
}

User.prototype.changeName = function (username) {
    this.data.username = username;
}

User.prototype.save = function (callback) {
    var self = this;
    
}

User.findById = function (id, callback) {
    userDAO.findById(id, callback);
}

User.getAllUsers = function (req, res, callback) {
    userDAO.getUsers(req, res, callback);
}

module.exports = User;
//module.exports.getUsers = getUsers;