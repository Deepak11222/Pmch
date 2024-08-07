// models/Cardiology.js
const mongoose = require('mongoose');

const CardiologySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image1: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    }
});

const Cardiology = mongoose.model('Cardiology', CardiologySchema);

module.exports = Cardiology;