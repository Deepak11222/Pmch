// models/Doctor.js
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  shortdiscription: {
    type: String,
    // required: true
},
    blogtitle: {
        type: String,
        // required: true
    },
    content: {
        type: String,
        // required: true
    },
      image: {
        type: String,
      },
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
