const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ManufacturerSchema = new Schema({
  manufacturer: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 0
  }
});

module.exports = Manufacturer = mongoose.model('manufacturer', ManufacturerSchema);