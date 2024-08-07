const express = require('express');
const {
  registerCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customerController');
const router = express.Router();

router.post('/customers', registerCustomer);
router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomerById);
router.put('/customers/:id', updateCustomer);
router.delete('/customers/:id', deleteCustomer);

module.exports = router;