const mongoose = require('mongoose');

// Define the Address schema to be reused for billing and shipping addresses
const AddressSchema = new mongoose.Schema({
  address1: {
    type: String,
    required: [true, "Address line 1 is required"],
  },
  address2: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
  },
  postalCode: {
    type: String,
    required: [true, "Postal code is required"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
}, { _id: false });

// Define the Item schema for medicines in the order
const ItemSchema = new mongoose.Schema({
  medicineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true
  },
  medicineName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  billToName: {
    type: String,
    required: true
  },
  shipToName: {
    type: String,
    required: true
  },
  grandTotal: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processed', 'shipped', 'delivered'],
    default: 'pending'
  },
  billingAddress: AddressSchema,
  shippingAddress: AddressSchema,
  items: [ItemSchema], // Array of ordered items
}, { timestamps: true }); // Enable timestamps

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;