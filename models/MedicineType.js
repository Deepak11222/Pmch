const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MedicineTypeSchema = new Schema({
  medicineType: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 1
  }
});

module.exports = MedicineType = mongoose.model('medicineType', MedicineTypeSchema);