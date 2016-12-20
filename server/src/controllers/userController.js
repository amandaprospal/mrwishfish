var User = require('../models/User.js');

module.exports = {
    getUsers: function(req, res, next) {
        console.log('Inside userController.getUsers');
        User.getAllUsers(req, res, function (err, rows) {
            if (!err) {
                res.status(200).json({
                    message: rows
                });
            }
        });
    }
}