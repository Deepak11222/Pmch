const mongoose = require('mongoose');

const AddstoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
});


const Addstore = mongoose.model('Addstore', AddstoreSchema);

module.exports = Addstore;
