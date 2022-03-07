var express = require('express');
var router = express.Router();
var session = require('express-session');
/* GET home page. */
router.get('/', function (req, res, next) {
  let count = req.signedCookies['count'] ? Number(req.signedCookies['count']) : 0;
  res.cookie('count', count += 1, { maxAge: 10000, signed: true });
  res.render('layout', { title: 'Count Page', count: count, partials: { content: 'index' } });
});



router.get('/name', (req, res, next) => {
  res.render('layout', { title: 'Name Page', partials: { content: 'name' } })
})

router.use(session({
  secret: 'secret',
  cookie: {
    maxAge: 5000
  },
  resave: false,
  saveUninitialized: false
}));

router.post('/gotName', (req, res, next) => {
  req.session.name = req.body.name
  res.render('layout', { title: 'Got Name Page', name: req.session.name, partials: { content: 'gotName' } })
});

module.exports = router;
