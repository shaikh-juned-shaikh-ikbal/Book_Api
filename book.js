const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  photo: String,
  isPublic: Boolean,
});

module.exports = mongoose.model('Book', bookSchema);
