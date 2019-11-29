const mongoose = require('mongoose');

// schema review
const reviewSchema = mongoose.Schema({
    books: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    review: {
        type: Number ,required: true
    },
    date: {
        type: Date, required: true
    },
    comment: {
        type: String
    }
});

module.exports = mongoose.model('Review', reviewSchema);