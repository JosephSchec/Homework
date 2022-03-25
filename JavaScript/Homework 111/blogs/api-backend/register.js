const bcrypt = require('bcrypt');
const mongo = require('./mongo')();

module.exports = async (req, res, next) => {
    const posts = await mongo;
    const nameExist = await posts.findOne({ username: req.body.username });

    if (!req.body.username || !req.body.password) {
        return next(new Error('Username and password are required'));
    }
    if ( nameExist) {
        return next(new Error('Username already exists'))
    }

    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            return next(err);
        }
        const results = await posts.insertOne({ username: req.body.username, password: hash })
        console.log(results)
    });

    res.redirect('/')
};
