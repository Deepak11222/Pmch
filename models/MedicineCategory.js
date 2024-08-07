const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MedicineCategorySchema = new Schema({
  category: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 1
  }
});

module.exports = mongoose.model('MedicineCategory', MedicineCategorySchema);