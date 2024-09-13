// routes/specialties.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const {
  createSpecialty,
  getAllSpecialties,
  getSpecialtyById,
  updateSpecialty,
  deleteSpecialty
} = require('../controllers/specialtiesController');

// Route to create a new specialty
router.post('/', upload.single('image'), createSpecialty);

// Route to get all specialties
// router.get('/specialties', getAllSpecialties);

// Route to get a specialty by ID
router.get('/:id', getSpecialtyById);

// Route to update a specialty
router.put('/:id', upload.single('image'), updateSpecialty);

// Route to delete a specialty
router.delete('/:id', deleteSpecialty);

module.exports = router;