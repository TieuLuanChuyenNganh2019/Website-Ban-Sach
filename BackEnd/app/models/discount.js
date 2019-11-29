const mongoose = require('mongoose');

// schema review
const discountSchema = mongoose.Schema({
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    name: {
        type: String ,required: true
    },
    value: {
        type: Number, required: true
    }
});

module.exports = mongoose.model('Discount', discountSchema);