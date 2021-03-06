
const session = require('express-session')
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
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
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});



app.post('/register', require('./register'));
app.post('/login', require('./login'));

let userName = null;
app.set('socketio', io);
io.on('connection', client => {
    client.on('user', user => userName = user)
    client.emit('user', userName)

});

app.route('/posts')
    .get(async (req, res, next) => {
        if (req.session.user) {
            userName = req.session.user;
        }

        const thePosts = await posts.find({ username: { $exists: false } }).toArray();
        res.send(thePosts);
    })
    .post(async (req, res, next) => {
        if (userName) {

            const newPost = {
                title: req.body.title,
                body: req.body.body,
                author: userName,
                date: new Date()
            };

            await posts.insertOne(newPost);
            const io = req.app.get('socketio');

            io.emit('newPost', newPost);

            return res.status(201).send(newPost);
        } else {
            return res.redirect('/login')
        }

    });


app.post('/posts/:id/addComment', async (req, res, next) => {
    if (userName) {
        const newComment = {
            body: req.body.body,
            author: userName,
            date: new Date()
        }
        const Mongo = require("mongodb");

        const result = await posts.updateOne({ _id: Mongo.ObjectId(req.params.id) }, { $push: { comments: newComment } });
        if (!result.modifiedCount) {
            return res.status(404).send('Not found');
        } else {
            const io = req.app.get('socketio');
            io.emit('newComment', newComment);
            res.status(201).send(newComment);
        }
    } else {
        return next(new Error('No user found'));
    }

});

app.post('/logout', (req, res, next) => {
    console.log('session exists =>', req.session?.user)
    req.session.destroy();
    userName = null;
    const io = req.app.get('socketio');
    io.emit('user', null);
    console.log('logout =>', req.session, ' === undefined')
    res.status(201).send('logout successful')

});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const e = new Error('Not Found');
    e.status = 404;
    next(e);
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send(err.message);
});
httpServer.listen(8080);