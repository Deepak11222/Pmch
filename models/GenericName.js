// models/GenericName.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GenericNameSchema = new Schema({
  genericName: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 1
  }
});

module.exports = mongoose.model('GenericName', GenericNameSchema);