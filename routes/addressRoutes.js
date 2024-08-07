const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

// Routes for addresses
router.post('/addresses', addressController.createAddress);
router.get('/customer/:customerId', addressController.getAddressesByCustomer);
router.put('/:addressId', addressController.updateAddress);
router.delete('/:addressId', addressController.deleteAddress);

module.exports = router;