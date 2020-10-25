// define dependence
const express = require('express');
const order = require('../models/order');
const router = express.Router();
const orderController = require('./../controllers/orders');

// authentication
const checkauth = require('./../middleware/auth');
router.use((req, res, next) => {
    next();
});

router.get('/', orderController.getOrder);
router.get('/:orderId', orderController.getOrderID);
router.delete('/:orderId', orderController.deleteOrder);
router.post('/', orderController.createOrder);
module.exports = router;