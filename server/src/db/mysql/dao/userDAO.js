var util = require('util');

function getUsers(req, res, callback) {
    var db = req.app.get('db');
    
    db.getConnection(function(err, connection) {
        if (!err) {
            console.log('Connected to the database!');
                connection.query('SELECT * FROM user;', function(err, rows) {
                    if (!err) {
                        console.log('Database returned rows: ' + rows);
                        callback(null, rows);
                    } else {
                        console.log('Database error: ' + err);
                        callback(err);
                    }
                console.log('Closing database connection.');
                connection.release();
            });
        } else {
            console.log('There was a problem connecting to the database: ' + err);
            callback(err);
        }
    });
}

module.exports.getUsers = getUsers;