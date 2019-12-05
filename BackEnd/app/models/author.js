const mongoose = require('mongoose');
const Book = require('./../models/book');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: {
        type: String,
        required: true    
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
});

authorSchema.pre('remove', function(next) {
    Book.find({ author: this.id }, (err, books) => {
      if (err) {
        next(err)
      } else if (books.length > 0) {
        next(new Error('This author has books still'))
      } else {
        next()
      }
    })
  })

module.exports = mongoose.model('Author',authorSchema);