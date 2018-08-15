function authenticate (req, res, next) {
    console.log('SESSION: ');
    console.log(req.session);
    if (req.session == null  || req.session.userId == null) {
        res.status(401).json({
            message: 'User is NOT logged in.'
        });
        return;
    } else {
        console.log('User is logged in.');
        next();
    }
}

module.exports = authenticate;