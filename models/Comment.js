const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  medicineId: { type: Schema.Types.ObjectId, ref: 'Medicine', required: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;