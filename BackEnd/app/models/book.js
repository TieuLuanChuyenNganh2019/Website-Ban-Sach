const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// schema book
const bookSchema = new Schema({
  title: { 
    type: String,
     required: true
    },
  description: {
    type: String
  },
  publishDate: {
    type: Date , 
    required: true
  },
  pageCount: {
    type: Number,
     required: true
    },
  price: { 
    type: Number, 
    required: true
  },
  availableQuantity: {
    type:Number, 
    required: true
  },
  imageUrl: {
    type: String
  },
  imageId: {
    type: String
    },
  publisher: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  discount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discount'
  }
});


module.exports = mongoose.model('Book', bookSchema);
