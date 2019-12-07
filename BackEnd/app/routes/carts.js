var express = require('express');
var router = express.Router();
var Cart = require('./../models/cart');

var Book = require('./../models/book');
var Order = require('./../models/order');

router.get('/add/:bookId', function (req, res, next) {
    var bookId = req.params.bookId;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Book.findById(bookId, function (err, book) {
        if (err) {
            //return res.redirect('/');
            return res.status(500).json({
                error: err
            });
        }
        cart.add(book, book.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        //  res.redirect('/');
        res.status(200).json({
            message: 'Add to cart successfully '
        });
    });
});

router.get('/reduce/:bookId', function (req, res, next) {
    var bookId = req.params.bookId;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(bookId);
    req.session.cart = cart;
    //  res.redirect('/shopping-cart');
    res.status(200).json({
        message: ' successfully'
    });
});

router.get('/remove/:bookId', function (req, res, next) {
    var bookId = req.params.bookId;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(bookId);
    req.session.cart = cart;
    // res.redirect('/shopping-cart');
    res.status(200).json({
        message: ' successfully'
    });
});

router.get('/shopping-cart', function (req, res, next) {
    if (!req.session.cart) {
        //return res.render('shop/shopping-cart', { books: null });
        return res.status(400).json({
            message: 'Cart Null'
        });
    }
    var cart = new Cart(req.session.cart);
    //   res.render('shop/shopping-cart', { books: cart.generateArray(), totalPrice: cart.totalPrice });
    res.status(200).json({
        List_book: cart.generateArray(), 
        totalPrice: cart.totalPrice
    });
});

// router.get('/checkout', isLoggedIn, function (req, res, next) {
//     if (!req.session.cart) {
//         return res.redirect('/shopping-cart');
//     }
//     var cart = new Cart(req.session.cart);
//     var errMsg = req.flash('error')[0];
//     res.render('shop/checkout', { total: cart.totalPrice, errMsg: errMsg, noError: !errMsg });
// });

router.post('/checkout', function (req, res, next) {
    if (!req.session.cart) {
      //  return res.redirect('/shopping-cart');
      res.status(400).json({
          message:'cart null'
      });
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    const totalPrice = cart.totalPrice ;
    // var stripe = require("stripe")(
    //     "sk_test_fwmVPdJfpkmwlQRedXec5IxR"
    // );

    // stripe.charges.create({
    //     amount: cart.totalPrice * 100,
    //     currency: "usd",
    //     source: req.body.stripeToken, // obtained with Stripe.js
    //     description: "Test Charge"
    // }, function (err, charge) {
    //     if (err) {
    //         req.flash('error', err.message);
    //         return res.redirect('/checkout');
    //     }
        var order = new Order({
            email: req.body.email,
            cart: cart,
            phone: req.body.phone,
            address: req.body.address,
            name: req.body.name,
        });
        order.save(function (err, result) {
            // req.flash('success', 'Successfully bought product!');
            // req.session.cart = null;
            // res.redirect('/');
            if(err)
            {
                res.status(500).json({
                    error:err
                });
            }else{
                res.status(200).json({
                  //  Order: result,
                    totalPrice: totalPrice,
                    message: 'Successfully bought book!'
                });
            }
        });
    });
//});



module.exports = router;