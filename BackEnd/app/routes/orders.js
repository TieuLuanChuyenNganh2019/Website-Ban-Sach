// define dependence
const express = require('express');
const router = express.Router();

// http://localhost:8080/orders
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetch'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        orderId: req.body.orderId,
        quantity: req.body.quantity,
    };
    res.status(201).json({
        message: 'Orders was create',
        order: order
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