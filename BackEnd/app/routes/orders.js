// define dependence
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const orderController = require('./../controllers/orders');


const Book = require('../models/book');
// http://localhost:8080/orders
router.get('/', orderController.getOrder);

router.post('/', orderController.createOrder);

router.get('/:orderId', orderController.getOrderID);

router.delete('/:orderId', orderController.deleteOrder);
module.exports = router;