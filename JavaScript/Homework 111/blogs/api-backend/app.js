const express = require('express');
const app = express();
const session = require('express-session')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    res.locals.user = req.session?.user;
    next();
});
/** get post from mongo middleware */
const mongo = require("./mongo")();
let posts;
app.use(async (req, res, next) => {
    posts = await mongo;
    next()
});

app.use(require('cors')({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.post('/register', require('./register'));
app.post('/login', require('./login'));

let user;

app.route('/posts')
    .get(async (req, res, next) => {
        if (req.session.user) {
            user = req.session.user;
        }
        const thePosts = await posts.find().toArray();
        res.send(thePosts);
    })
    .post(async (req, res, next) => {
        if(user){

        const newPost = {
            title: req.body.title,
            body: req.body.body,
            author: user,
            date: new Date()
        };

        await posts.insertOne(newPost);

        res.status(201).send(newPost);
     }else{
         res.redirect('/login')
     }
     });


app.post('/posts/:id/addComment', async (req, res, next) => {
    const newComment = {
        body: req.body.body,
        author: req.session.user,
        date: new Date()
    }
    const Mongo = require("mongodb");

    const result = await posts.updateOne({ _id: Mongo.ObjectId(req.params.id) }, { $push: { comments: newComment } });
    if (!result.modifiedCount) {
        return res.status(404).send('Not found');
    }
    res.status(201).send(newComment);

});

app.post('/logout', (req, res, next) => {
    console.log('session exists =>', req.session?.user)
    req.session.destroy();
    console.log('logout =>', req.session, ' === undefined')
    res.status(201).send('logout successful')
    next()
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const e = new Error('Not Found');
    e.status = 404;
    next(e);
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});
app.listen(8080);