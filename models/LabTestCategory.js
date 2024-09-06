// Example: LabTestCategory.js
const mongoose = require('mongoose');

const LabTestCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LabTest' }]
});

module.exports = mongoose.model('LabTestCategory', LabTestCategorySchema);