// models/LabTest.js

const mongoose = require('mongoose');

const LabTestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  preparationInstructions: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LabTest', LabTestSchema);
