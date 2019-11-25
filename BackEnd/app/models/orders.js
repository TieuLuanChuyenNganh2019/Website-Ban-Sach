const mongoose = require('mongoose');

// schema book
const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true},
  quantity: {type: Number , default: 1}
});

module.exports = mongoose.model('Order', orderSchema);