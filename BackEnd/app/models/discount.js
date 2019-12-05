const mongoose = require('mongoose');

// schema review
const discountSchema = mongoose.Schema({
    name: {
        type: String ,required: true
    },
    value: {
        type: Number, required: true
    }
});

module.exports = mongoose.model('Discount', discountSchema);