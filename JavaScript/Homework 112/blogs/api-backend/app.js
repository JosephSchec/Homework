const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io');
global.socketIo = io(server, {
  cors: {
    origin: 'http://localhost:3000',
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const session = require('express-session');
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

const Mongo = require("mongodb");
const MongoClient = Mongo.MongoClient;
const uri =
  'mongodb://localhost:27017';
const client = new MongoClient(uri);


app.use(async (req, res, next) => {
  await client.connect();
  const database = client.db('blogs');
  global.posts = database.collection('posts');
  global.users = database.collection('users');
  next();
});

app.use(require('cors')({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use('/authentication', require('./routes/authentication'));
app.use('/posts', require('./routes/posts'));

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

server.listen(8080);