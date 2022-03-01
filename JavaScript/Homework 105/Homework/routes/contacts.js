var express = require('express');
var debug = require('debug')('contacts:route');
var router = express.Router();





/* GET home page. */
router.get('/', function (req, res, next) {
  connection.query('SELECT * FROM contacts', function (error, results, fields) {
    if (error) throw error;


    debug(`get returning ${JSON.stringify(results)}`);
    res.render('layout', {
      title: 'Express',
      contacts: results,
      noContacts: results.length === 0,
      css: ['contacts.css'],
      partials: { content: 'contacts' }
    });
  });
});
/******************************************* HOMEWORK  **************************************************/



router.get('/contactsJson', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  //const results = [];
  const fs = require('fs/promises');
  try {
    const data = await fs.readFile('./public/contacts.json');
    JSON.parse(data.toString()).forEach(contact => {

      connection.query('INSERT INTO contacts (name , address, phone) VALUES(?,?,?)', [contact.name, contact.address, contact.phone], function (error, results, fields) {
        if (error) throw error;
      });
      res.redirect('/contacts')
      /**** PART 1 of question 1
     results.push(contact)*/

    });
  } catch (err) {
    console.log(err)
  }
  /**** PART 1 of question 1

res.render('layout', {
title: JSON.stringify(results),
});
*/
})
router.post('/contactsJson',  (req, res, next) => {
  

    connection.query('INSERT INTO contacts (name , address, phone) VALUES(?,?,?)', [req.query.name, req.query.address, req.query.phone], function (error, results, fields) {
      if (error) throw error;
    });
    res.redirect('/contacts')
});
/********************************END HOMEWORK *****************************/
router.get('/addContact', (req, res, next) => {
  res.render('layout', {
    title: 'Add Contact',
    partials: { content: 'contact' }
  });
});


router.post('/addContact', (req, res, next) => {
  connection.query('INSERT INTO contacts (name , address, phone) VALUES(?,?,?)', [req.body.name, req.body.address, req.body.phone], function (error, results, fields) {
    if (error) throw error;

    res.redirect('/contacts')
  })
});

router.get('/editContact/:id', (req, res, next) => {
  connection.query('SELECT * FROM contacts WHERE id = ?',
    [req.params.id],
    (error, results, fields) => {
      if (error) throw error;

      if (!results.length) {
        return next(new Error('No contact found with id ' + req.params.id));
      }

      res.render('layout', {
        title: 'Edit Contact',
        css: ['contact.css'],
        contact: results[0],
        partials: { content: 'contact' }
      });
    });
});


router.post('/editContact/:id', (req, res, next) => {
  connection.query('UPDATE contacts SET name = ?, address = ?,  phone = ? WHERE id = ?',
    [req.body.name, req.body.address, req.body.phone, req.params.id],
    (error, results, fields) => {
      if (error) throw error;

      res.redirect('/contacts');
    });
});

router.get('/deleteContact/:id', (req, res, next) => {
  connection.query('DELETE FROM contacts WHERE id = ?',
    [req.params.id],
    (error, results, fields) => {
      console.log(results);
      if (error) return next(error);

      if (!results.affectedRows) {
        return next(new Error('No contact found with id ' + req.params.id));
      }

      res.redirect('/contacts');
    });
});


module.exports = router;
