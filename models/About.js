// Model - About.js
const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    type: String // Assuming the image will be stored as a base64 string
  }
});

const About = mongoose.model('About', AboutSchema);

module.exports = About;