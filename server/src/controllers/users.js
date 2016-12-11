module.exports = {
    getUsers: function(req, res, next) {
        console.log('Inside usersController.getUsers');
        res.status(200).json({
            message: 'Hello, bunnies! You called the getUsers endpoint!'
        });
    }
}