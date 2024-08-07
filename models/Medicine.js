const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        // required: true,
    },

    itemTypeKey:{
        type: String,
    },
    drugForm:{
        type: String,
    },
    issueUnit:{
        type:String,
    },
    purchaseUnit:{
        type:String,
    },
    conversion:{
        type:String,
    },
    uom:{
        type:String,
    },
    medicineType: {
        type: String,
        // ref: 'MedicineType',
        // required: true
    },
    medicineName: {
        type: String,
        // required: true,
    },
    hsnCode: {
        type: String,
        // required: true,
    },
    expiryDate: {
        type: String,
        // required: true,
    },
    batchNumber: {
        type: String,
        // required: true,
    },
    potency: {
        type: String,
        // required: true,
    },
    company: {
        type: String,
        // required: true,
    },
    genericname: {
        type: String,
        // required: true,
    },
    unit: {
        type: String,
        // required: true,
    },
    // medicineTypeCategory: {
    //     type: String,
    //     required: true,
    // },
    // supplier: {
    //     type: String,
    //     required: true,
    // },
    mrpPrice: {
        type: Number,
        // required: true,
    },
    saleprice: {
        type: Number,
        // required: true,
    },
    purchaseprice: {
        type: Number,
        // required: true,
    },
    supplierPrice: {
        type: Number,
        // required: true,
    },
    patientDiscount: {
        type: Number,
        // required: true,
    },
    gst: {
        type: Number,
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
    category: {
        type: String,
        // required: true,
    },
    manufacturer:{
        type: String,
    },
    code: {
        type: String,
        // required: true,
    },
    // packing_1: {
    //     type: String,
    //     required: true,
    // },
    // packing_2: {
    //     type: String,
    //     required: true,
    // },
    availabilityQty: {
        type: Number,
        // required: true,
    },
    status: {
        type: Number,
        enum: [0, 1],
        default: 1
      }
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
