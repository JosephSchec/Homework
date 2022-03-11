var express = require('express');
const Cart = require('../cart');
var router = express.Router();

let cart = null;

/* GET home page. */
router.route('/')
  .get((req, res, next) => {
    res.render('layout', {
      title: 'Express',
      items: global.items,
      partials: {
        content: 'index'
      }
    });
  })
  .post((req, res, next) => {
    cart = new Cart(req.session.cart);
    cart.updateItems(req.body.id, +req.body.quantity);
    req.session.cart = cart;
    res.redirect('/');
  });

router.route('/checkout')
  .get((req, res, next) => {
    const total = (Number(cart?.getItems()['1']) * 2.99) + (Number(cart?.getItems()['2']) * 1.99)
    res.render('layout', {
      title: 'Checkout',
      items: cart?.getItems(),
      hotDogTotal: Number(cart?.getItems()['1']) * 2.99 || 0,
      friesTotal: Number(cart?.getItems()['2']) * 1.99 || 0,
      total,

      partials: {
        content: 'checkout'
      }
    });

  })
  .post((req, res, next) => {
    cart.updateItems(req.body.id, +req.body.update);
    req.session.cart = cart;
    res.redirect('/checkout');
  });



module.exports = router;
