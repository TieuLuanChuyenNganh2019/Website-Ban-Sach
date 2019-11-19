const mongoose = require('mongoose');

// schema book
const bookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number
});

module.exports = mongoose.model('Book', bookSchema);