const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
<<<<<<< HEAD
    userId: {
        type: String,
        ref: 'User'
    },
=======
    // userId: {
    //     type: String,
    //     ref: 'User'
    // },
    // orderId: {
    //     type: String
    // },
>>>>>>> 0f25d5fd32903e2f165a5fde3b9a58084bfe237b
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        required: true
    },
    deliverStatus: {
        type: Boolean,
        default: false,
<<<<<<< HEAD
    },
    note: {
        type: String
    },
=======
    },
    note: {
        type: String
    },
>>>>>>> 0f25d5fd32903e2f165a5fde3b9a58084bfe237b
    comment: {
        title: { type: String },
        content: { type: String, default: "" },
        isComment: { type: Number, default: 0 }
      },
    created: {
        type: Date,
        default: Date.now,
        required: true
    },
    totalPrice: {
        type: Number
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    infoPaid: {
        type: String,
    },
});

module.exports = mongoose.model('Order', schema);