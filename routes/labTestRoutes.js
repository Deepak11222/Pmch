const express = require('express');
const { protectCustomer } = require('../middleware/auth');
// const { bookLabTest } = require('../controllers/LabTestController');

const router = express.Router();
const LabTestController = require('../controllers/LabTestController');

// Fetch a list of all purchases (no authentication needed)
router.get('/purchases', LabTestController.getPurchases);
router.get('/purchases/:customerId', LabTestController.getPurchasesByCustomer);
// Route to get purchases for the logged-in customer
router.get('/purchased', protectCustomer, LabTestController.getPurchasesForLoggedInCustomer);


// Route to book tests from the cart
router.post('/labtests/book-from-cart', protectCustomer, LabTestController.bookFromCart);
router.post('/cart/add', protectCustomer, LabTestController.addToCart);
// Remove a lab test from the cart
router.post('/cart/remove', protectCustomer, LabTestController.removeFromCart);

router.post('/lab-tests/add', LabTestController.addLabTest);
router.post('/labtests/book', protectCustomer, LabTestController.bookLabTest);

// Fetch all lab tests
router.get('/lab-tests', LabTestController.getLabTests);

// Fetch details of a specific lab test
router.get('/:id', LabTestController.getLabTestById);

// Book a lab test
router.post('/:id/book', LabTestController.bookLabTest);

// Fetch test history for a user
router.get('/history', LabTestController.getTestHistory);

module.exports = router;
