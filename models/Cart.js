const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LabTest' }], // Array of selected lab tests
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cart', cartSchema);