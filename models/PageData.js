const mongoose = require('mongoose');

const PageDataSchema = new mongoose.Schema({
  heading: String,
  title: String,
  content: String,
  selectedPage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PageSubCategory',
    required: true
  },
  image1: String,
  image2: String
});

const PageData = mongoose.model('PageData', PageDataSchema);

module.exports = PageData;
