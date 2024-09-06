const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  labTests: [{
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LabTest',  // Reference to the LabTest model
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  }
});
module.exports = mongoose.model('Purchase', PurchaseSchema);  // Make sure to export the model correctly
