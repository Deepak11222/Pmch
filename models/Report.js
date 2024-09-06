// Example: Report.js
const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    filePath: { type: String, required: true },
    generatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', ReportSchema);