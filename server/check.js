require('dotenv').config();
const mongoose = require('mongoose');
const Letter = require('./models/Letter');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const letters = await Letter.find();
    console.log('Database contents:', letters);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
