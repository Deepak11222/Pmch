const Customer = require('../models/Customer');
const Order = require('../models/order');
const ErrorResponse = require('../utils/errorResponse');

// Helper function to generate and send JWT token
// Helper function to generate and send JWT token
// Helper function to generate and send JWT token
const generateCustomerToken = (customer, statusCode, res) => {
  const token = customer.createCustomerJwtToken(); // Correct function name
  res.status(statusCode).json({ success: true, token, customerId: customer._id }); // Include customerId in the response
};

// Login customer
const loginCustomer = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  try {
    // Check for customer
    const customer = await Customer.findOne({ email }).select('+password');

    if (!customer) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await customer.matchPassword(password); // Correct function name

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Generate and send token
    generateCustomerToken(customer, 200, res);
  } catch (error) {
    next(error);
  }
};
// Get orders for the authenticated customer
const getOrdersForCustomer = async (req, res, next) => {
  try {
    const orders = await Order.find({ customer: req.customer._id });
    res.json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

// Register a new customer
const registerCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    generateCustomerToken(customer, 201, res);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a specific customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a customer
const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!customer) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a customer
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  loginCustomer,
  getOrdersForCustomer,
  registerCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
