const Comment = require('../models/Comment');
const Medicine = require('../models/Medicine');
const Customer = require('../models/Customers');

const addComment = async (req, res) => {
  const { medicineId, customerId, comment, rating } = req.body;

  try {
    // Validate medicineId and customerId
    const medicine = await Medicine.findById(medicineId);
    const customer = await Customer.findById(customerId);

    if (!medicine) {
      return res.status(400).json({ message: 'Invalid medicineId' });
    }

    if (!customer) {
      return res.status(400).json({ message: 'Invalid customerId' });
    }

    // Create and save the comment
    const newComment = new Comment({
      medicineId,
      customerId,
      comment,
      rating
    });

    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};

// New GET function to retrieve comments
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('medicineId').populate('customerId');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};

module.exports = {
  addComment,
  getComments
};