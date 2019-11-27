const mongoose = require('mongoose');

// schema book
const bookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true},
  price: { type: Number, required: true},
  bookImage: {type: String, required: true}
 // provider: {type: String, required: true}
});




module.exports = mongoose.model('Book', bookSchema);