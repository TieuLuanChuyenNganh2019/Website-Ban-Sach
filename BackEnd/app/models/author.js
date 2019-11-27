const mongoose = require('mongoose');

// schema book
const authorSchema = mongoose.Schema({  
  name: { type: String, required: true}
});

module.exports = mongoose.model('Author', authorSchema);