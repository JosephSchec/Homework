
const bcrypt = require('bcrypt');
const mongo = require('./mongo')();

module.exports = async (req, res, next) => {
    const io = req.app.get('socketio');
    const posts = await mongo;
    const query = { username: req.body.username }
    const results = await posts.findOne(query);
    
    if (!results) {
        return next(new Error('Invalid user name or password'));
    }
    bcrypt.compare(req.body.password, results.password, (err, result) => {

        if (err) {
            return next(err);
        }
        if (!result) {
            return next(new Error('Invalid user name or password'));
        }
    
            req.session.user = req.body.username;
            io.emit('user',req.session.user)
            res.redirect('/posts')
        
    });
};