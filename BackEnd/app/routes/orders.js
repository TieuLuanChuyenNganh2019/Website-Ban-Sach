// define dependence
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/orders');
const Book = require('../models/book');
// http://localhost:8080/orders
router.get('/', (req, res, next) => {
   Order.find()
   .select('book quantity _id')
   .exec()
   .then(docs => {
       res.status(200).json({
           count: docs.length,
           orders: docs.map(doc => {
               return {
                   _id: doc.id,
                   book: doc.book,
                   quantity: doc.quantity,
                   request: {
                    type: 'GET',
                    url: 'http://localhost:8080/orders/'+ doc._id
                }
               }
           })
           
       });
   })
   .catch(err => {
       res.status(500).json({
           error: err
       });
   });
});

router.post('/', (req, res, next) => {
    Book.findById(req.body.bookID)
    .then(book => {
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            book: req.body.bookID
        });
        return order.save();
    })
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Order Created',
            createOrder: {
                _id: result._id,
                book: result.book,
                quantity: result.quantity
            },
            request: {
                type: 'GET',
                url: 'http://localhost:8080/orders/'+ result._id
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Orders details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Orders deleted',
        orderId: req.params.orderId
    });
});
module.exports = router;