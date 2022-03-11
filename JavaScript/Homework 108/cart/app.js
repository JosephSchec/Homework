var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',
  resave: false,
  
  saveUninitialized: false
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

global.items = [{
  id: 1,
  name: 'Hot Dog',
  description: 'A delicious hot dog',
  price: 2.99,
  img: 'https://m.media-amazon.com/images/I/71GBQJBNEKL._SX679_.jpg'
}, {
  id: 2,
  name: 'Fries',
  description: 'A delicious stack of fries',
  price: 1.99,
  img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDy_uLK7m23zFDvxdb570mRRJZtzxrYlZ1WA&usqp=CAU'
}];

module.exports = app;