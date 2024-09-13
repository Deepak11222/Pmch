const mongoose = require('mongoose');

const LabTestBookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  tests: [{ 
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'LabTest', required: true },
    quantity: { type: Number, default: 1 }
  }],
  status: { type: String, default: 'Pending' },
  bookedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LabTestBooking', LabTestBookingSchema);
