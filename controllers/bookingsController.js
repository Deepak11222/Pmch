const LabTest = require('../models/LabTest');
const ErrorResponse = require('../utils/errorResponse');
const Customer = require('../models/Customer');
const Doctor = require('../models/Doctor');
const Booking = require('../models/Booking');

exports.bookDoctor = async (req, res) => {
  try {
      const { doctorId, customerId, bookingDate, comments } = req.body;

      const newBooking = {
          doctorId,
          customerId,
          date: bookingDate,
          comments
      };

      const booking = await Booking.create(newBooking);
      res.status(201).json({
          message: 'Doctor booked successfully',
          booking
      });
  } catch (error) {
      res.status(500).json({ message: 'Error booking doctor', error });
  }
};


exports.getBookingsByCustomer = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const bookings = await Booking.find({ customerId }).populate('doctorId');
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Book a lab test for the logged-in customer
exports.bookLabTest = async (req, res, next) => {
  const { testId } = req.body;
  const customerId = req.customer._id;

  try {
    // Find the lab test
    const labTest = await LabTest.findById(testId);
    if (!labTest) {
      return next(new ErrorResponse('Lab test not found', 404));
    }

    // Add the test to the customer's bookings
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return next(new ErrorResponse('Customer not found', 404));
    }

    customer.testBookings.push(testId);
    await customer.save();

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};