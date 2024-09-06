const mongoose = require('mongoose');

const OrderHistorySchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', // Reference to the Customer model
        required: true
    },
    labTests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LabTest', // Reference to the LabTest model
        required: true
    }],
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'completed'
    },
    // Add any additional fields needed
});

const OrderHistory = mongoose.model('OrderHistory', OrderHistorySchema);

module.exports = OrderHistory;