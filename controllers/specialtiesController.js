// controllers/specialtiesController.js
const Specialties = require('../models/Specialties');
const ErrorResponse = require('../utils/errorResponse');

// Create a new specialty
exports.createSpecialty = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.path : '';

    const newSpecialty = new Specialties({
      title,
      description,
      image
    });

    const savedSpecialty = await newSpecialty.save();
    res.status(201).json({ success: true, specialty: savedSpecialty });
  } catch (error) {
    console.error('Error creating specialty:', error);
    next(new ErrorResponse('Failed to create specialty', 500));
  }
};

// Get all specialties
exports.getAllSpecialties = async (req, res, next) => {
  try {
    const specialties = await Specialties.find();
    res.status(200).json({ success: true, specialties });
  } catch (error) {
    console.error('Error fetching specialties:', error);
    next(new ErrorResponse('Failed to fetch specialties', 500));
  }
};

// Get a single specialty by ID
exports.getSpecialtyById = async (req, res, next) => {
  try {
    const specialty = await Specialties.findById(req.params.id);
    if (!specialty) {
      return next(new ErrorResponse('Specialty not found', 404));
    }
    res.status(200).json({ success: true, specialty });
  } catch (error) {
    console.error('Error fetching specialty:', error);
    next(new ErrorResponse('Failed to fetch specialty', 500));
  }
};

// Update a specialty
exports.updateSpecialty = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.path : '';

    const specialty = await Specialties.findByIdAndUpdate(
      req.params.id,
      { title, description, image },
      { new: true, runValidators: true }
    );

    if (!specialty) {
      return next(new ErrorResponse('Specialty not found', 404));
    }

    res.status(200).json({ success: true, specialty });
  } catch (error) {
    console.error('Error updating specialty:', error);
    next(new ErrorResponse('Failed to update specialty', 500));
  }
};

// Delete a specialty
exports.deleteSpecialty = async (req, res, next) => {
  try {
    const specialty = await Specialties.findByIdAndDelete(req.params.id);
    if (!specialty) {
      return next(new ErrorResponse('Specialty not found', 404));
    }
    res.status(200).json({ success: true, message: 'Specialty deleted successfully' });
  } catch (error) {
    console.error('Error deleting specialty:', error);
    next(new ErrorResponse('Failed to delete specialty', 500));
  }
};