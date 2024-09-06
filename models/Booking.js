// Example: Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'LabTest', required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
    date: { type: Date, required: true },
    report: { type: mongoose.Schema.Types.ObjectId, ref: 'Report' },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    bookingDate: Date,
    comments: String,
    rating: Number // Rating for the doctor
  
});

module.exports = mongoose.model('Booking', BookingSchema);