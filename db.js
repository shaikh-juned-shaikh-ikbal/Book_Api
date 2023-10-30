const mongoose = require('mongoose');
const db = mongoose.connection;
const dotenv = require("dotenv").config()

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});



db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to the database');
});


module.exports = mongoose.connection;
