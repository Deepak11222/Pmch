const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  medicines: [
    {
      medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  tests: [
    {
      testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LabTest'
      },
      quantity: {
        type: Number
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cart', CartSchema);