const mongoose = require('mongoose');

// Assuming the Specialties model is already defined elsewhere
const Specialties = require('./Specialties');

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  qualification: {
    type: String
  },
  department: {
    type: String
  },
  designation: {
    type: String
  },
  description: {
    type: String
  },
  address: {
    type: String
  },
  fee: {
    type: Number
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialties'
  },
  image: {
    type: String
  }
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;