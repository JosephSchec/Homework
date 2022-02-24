var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const contacts = [
  { name: 'Joe', address: '1 Main street', phone: 128634546 },
  { name: 'John', address: '10 First street', phone: 12365456 },
  { name: 'Jeff', address: '13 Second street', phone: 12763456 }
]
router.get('/contacts', function (req, res, next) {
  res.render('index',
    {
      title: 'contacts',
      contacts: contacts
    });
});

router.get('/api/contacts', function (req, res, next) {
  res.render('index', { json: JSON.stringify(contacts) })
});

router.post('/api/contacts', function (req, res, next) {
  contacts.push({ name: req.query.name, address: req.query.address, phone: req.query.phone });
  res.render('index',{json:JSON.stringify(contacts)})
});

module.exports = router;
