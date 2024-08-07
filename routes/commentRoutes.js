const express = require('express');
const router = express.Router();
const { addComment, getComments } = require('../controllers/commentController');

// POST endpoint to add a comment
router.post('/comment', addComment);

// GET endpoint to fetch all comments
router.get('/comments', getComments);

module.exports = router;
