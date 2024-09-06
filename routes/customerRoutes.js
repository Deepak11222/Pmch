const express = require('express');
const {
  registerCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  loginCustomer
} = require('../controllers/customerController');
const OrderHistory = require('../models/OrderHistory'); // Assuming this is the path to your OrderHistory model
const { protectCustomer } = require("../middleware/auth"); // Middleware for customer authentication
const Purchase = require("../models/Purchase"); // Assuming 'Purchase' is your model for orders
const LabTest = require('../models/LabTest');
const Cart = require('../models/Cart');

const router = express.Router();

router.post('/customer/login', loginCustomer);
router.post('/customers', registerCustomer);
router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomerById);
router.put('/customers/:id', updateCustomer);
router.delete('/customers/:id', deleteCustomer);

module.exports = router;