const Order = require('../models/order');
const Cart = require('../models/cart1')
module.exports = {
    // Get Orders 
    getOrder : (req, res, next) => {
        Order.find()
        .exec()
        .then(docs => {
            if (docs.length >= 0) {
                res.status(200).json(docs);
            } else {
                res.status(404).json({
                    message: "No Entries Found"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
     },

   

    // Delete Order
    deleteOrder: (req, res, next) => {
        Order.remove({_id: req.params.orderId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Order deleted"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    },

    // Get order by orderID
    getOrderID: (req, res, next) => {
        Order.findById(req.params.orderId)
        .populate('book')
        .exec()
        .then(order => {
            if(!order)
            {
                return res.status(404).json({
                    message: "Order not found"
                });
            }
            res.status(200).json(order);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    },

    // Checkout and Create Order
    createOrder:  (req, res, next) => {

        const cart = new Cart();
        // const totalPrice = cart.totalPrice ;
        // const totalQty = cart.totalQty ; 

        cart.books.push(req.body.books);
        cart.totalPrice = req.body.totalPrice;
        cart.totalQty = req.body.totalQty;

        const order = new Order({
                email: req.body.email,
                cart: cart,
                phone: req.body.phone,
                address: req.body.address,
                name: req.body.name,
            });
            order.save(function (err, result) {
                if(err)
                {
                    res.status(500).json({
                        error:err
                    });
                }else{
                    // req.session.cart = null;
                    res.status(200).json({
                        // totalPrice: totalPrice,
                        // totalQty: totalQty,
                        message: 'Successfully bought book!'
                    });
                }
            });
        }

}