const Order = require('../models/order');
module.exports = {
    // Get Orders 
    getOrder : (req, res, next) => {
        Order.find()
        .select('book quantity _id')
        .populate('book')
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
     },

     // Create Orders
     createOrder: (req, res, next) => {
        Book.findById(req.body.bookID)
        .then(book => {
            if(!book)
            {
                return res.status(404).json({
                    message: "Book not found"
                });
            }
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
        
    },

    // Delete Order
    deleteOrder: (req, res, next) => {
        Order.remove({_id: req.params.orderId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Order deleted",
                request: {
                    type: 'POST',
                    url: 'http://localhost:8080/orders',
                    body: { bookID: "ID", quantity: "Number"}
                }
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
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8080/orders'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    }
}