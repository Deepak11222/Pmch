const mongoose = require('mongoose');

const LabTestBookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LabTest' }],
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LabTest' }],  // To store selected tests in the cart
  bookedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' }, // or any other status you want to track
});

module.exports = mongoose.model('LabTestBooking', LabTestBookingSchema);