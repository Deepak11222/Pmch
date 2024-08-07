const mongoose = require('mongoose');

const medicineDataSchema = new mongoose.Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        // required: true,
    },
    medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine',
        // required: true,
    },
    supplierName: {
        type: String,
        // required: true,
    },
    batchNumber: {
        type: String,
        // required: true,
    },
    paymentMode: {
        type: String,
        // required: true,
    },
    paymentStatus: {
        type: String,
        // required: true,
    },
    expiryDate: {
        type: String,
        // required: true,
    },
    packing: {
        type: String,
        // required: true,
    },
    packing_1: {
        type: String,
        // required: true,
    },
    packing_2: {
        type: String,
        // required: true,
    },
    unit: {
        type: String,
        // required: true,
    },
    qty: {
        type: String,
        // required: true,
    },
    perboxStrips: {
        type: Number,
        // required: true,
    },
    mrpPrice: {
        type: Number,
        // required: true,
    },
    supplierDiscount: {
        type: Number,
        // required: true,
    },
    supplierPrice: {
        type: Number,
        // required: true,
    },
    discount: {
        type: Number,
        // required: true,
    },
    netSP: {
        type: Number,
        // required: true,
    },
    gst: {
        type: Number,
        // required: true,
    },
    salesPrice: {
        type: Number,
        // required: true,
    },
    actStatus: {
        type: String,
        // required: true,
    },
    delStatus: {
        type: String,
        // required: true,
    },
    createdDate: {
        type: String,
        default: Date.now,
    },
    createdBy: {
        type: String,
        // required: true,
    },
});

const MedicineData = mongoose.model('MedicineData', medicineDataSchema);

module.exports = MedicineData;