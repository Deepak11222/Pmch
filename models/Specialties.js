// models/Doctor.js
const mongoose = require('mongoose');

const SpecialtiesSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
      image: {
        type: String,
      },
});

const Specialties = mongoose.model('Specialties', SpecialtiesSchema);

module.exports = Specialties;