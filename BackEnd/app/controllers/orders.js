const Order = require('../models/order');
const Cart = require('../models/cart1');
const OrderDetail = require('../models/orderDetail');
const books = require('./books');
const book = require('../models/book');
module.exports = {
    // Get Orders 
    getOrder: (req, res, next) => {
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
        Order.remove({ _id: req.params.orderId })
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
                if (!order) {
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
    createOrder: (req, res, next) => {

        //  const cart = new Cart();
        // const totalPrice = cart.totalPrice ;
        // const totalQty = cart.totalQty ; 

        // cart.books.push(req.body.books);
        // cart.books = req.body.books;
        // cart.totalPrice = req.body.totalPrice;
        // cart.totalQty = req.body.totalQty;

        const order = new Order({
            email: req.body.email,
            totalPrice: req.body.totalPrice,
            phone: req.body.phone,
            address: req.body.address,
            name: req.body.name,
        });
        const books = req.body.books;
        let userId;
        let arrayBook = [];
        order.save(function (err, result) {
            if (err) {
                res.status(500).json({
                    error: err
                });
            } else {
                //   req.session.cart = null;
                res.status(200).json({
                    // totalPrice: totalPrice,
                    // totalQty: totalQty,
                    message: 'Successfully bought book!'
                });
            }
        });


        // Luu order._id vao bang orderDetail va san pham da dc order
        let orderId;
        if (order) {
            orderId = order._id;
        } else {
            return res.json({ msg: "Error when create order!" });
        }

        // Create OrderDetail
        const newOrderDetail = {
            orderId: orderId,
            books: books,
        };

       // const createdOrderDetail = 
        OrderDetail.create(newOrderDetail);

        // if(createdOrderDetail) {
        //     books.map(async (book) => {
        //         const id = parseInt(book._id)
        //     });
        // }

    }

}