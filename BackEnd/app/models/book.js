const mongoose = require('mongoose');

// schema author
const authorSchema = mongoose.Schema({
  name: {
    type: String, required: true
  },
  age: {
    type: Number,required: true
  }
});

// schema book
const bookSchema = mongoose.Schema({
  title: { type: String, required: true},
  publicationDate: {type: Date},
  price: { type: Number, required: true},
  bookImage: {type: String, required: true},
  authors: [authorSchema]
});



module.exports = mongoose.model('Book', bookSchema);