const Doctor = require('../models/Doctor');
const Specialties = require('../models/Specialties');
const ErrorResponse = require('../utils/errorResponse');

// Create a new doctor
exports.createDoctor = async (req, res) => {
  try {
    const { name, mobileNumber, qualification, experience, age, department, designation, description, address, fee, rating, type } = req.body;

    console.log('Received Data:', {
      name,
      mobileNumber,
      qualification,
      experience,
      age,
      department,
      designation,
      description,
      address,
      fee,
      rating,
      type
    }); // Log received data

    const newDoctor = new Doctor({
      name,
      mobileNumber,
      qualification,
      experience,
      age,
      department,
      designation,
      description,
      address,
      fee,
      rating,
      type,
      image: req.file ? req.file.path : null,
    });

    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

  

// Get all doctors
exports.getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find().populate('type'); // Populate the specialty reference
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    next(new ErrorResponse('Failed to fetch doctors', 500));
  }
};

// Get a single doctor by ID
exports.getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('type'); // Populate the specialty reference
    if (!doctor) {
      return next(new ErrorResponse('Doctor not found', 404));
    }
    res.status(200).json({ success: true, doctor });
  } catch (error) {
    console.error('Error fetching doctor:', error);
    next(new ErrorResponse('Failed to fetch doctor', 500));
  }
};

// Update a doctor
exports.updateDoctor = async (req, res, next) => {
  try {
    const {
      name,
      mobileNumber,
      qualification,
      department,
      designation,
      description,
      address,
      fee,
      rating,
      type
    } = req.body;
    const image = req.file ? req.file.path : '';

    // Validate specialty
    const specialtyExists = await Specialties.findById(type);
    if (!specialtyExists) {
      return next(new ErrorResponse('Specialty not found', 404));
    }

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      {
        name,
        mobileNumber,
        qualification,
        department,
        designation,
        description,
        address,
        fee,
        rating,
        type,
        image
      },
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return next(new ErrorResponse('Doctor not found', 404));
    }

    res.status(200).json({ success: true, doctor });
  } catch (error) {
    console.error('Error updating doctor:', error);
    next(new ErrorResponse('Failed to update doctor', 500));
  }
};

// Delete a doctor
exports.deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return next(new ErrorResponse('Doctor not found', 404));
    }
    res.status(200).json({ success: true, message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    next(new ErrorResponse('Failed to delete doctor', 500));
  }
};