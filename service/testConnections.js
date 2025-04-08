const mongoose = require('mongoose');
const dbConfig = require('./dbConfig.json');

mongoose.connect(dbConfig.connectionString, {
})
  .then(() => {
    console.log('Connected to MongoDB!');
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
