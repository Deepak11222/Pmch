const express = require('express');
const router = express.Router();
const { makePurchase, fetchPurchases, getAllPurchases } = require('../controllers/purchaseController');
const { protectCustomer } = require('../middleware/auth');
const Purchase = require('../models/Purchase');
// const purchaseController = require('../controllers/purchaseController');

// const Purchase = require('../models/Purchase');
// const Purchase = require('./models/Purchase');

router.use(protectCustomer);

// Define the route for making a purchase, with customer protection
router.get('/purchases', async (req, res) => {
    try {
        const customerId = req.user._id; // Adjust this if you're extracting customer ID differently
        const purchases = await Purchase.find({ customerId }).populate('labTests.testId');
        res.status(200).json({ purchases });
    } catch (error) {
        console.error('Error fetching purchases:', error.message);
        res.status(500).json({ error: 'Failed to fetch purchases' });
    }
  });
router.post('/purchase', makePurchase);
router.get('/purchases/all', getAllPurchases);

// Fetch purchases by customer ID
router.get('/purchases/:customerId', fetchPurchases);

// router.get('/purchases/all', async (req, res) => {
//     try {
//         const purchases = await Purchase.find().populate('labTests'); // Adjust according to your schema
//         res.json({ purchases });
//     } catch (error) {
//         console.error('Error fetching all purchases:', error);
//         res.status(500).json({ error: 'Failed to fetch purchases' });
//     }
// });



router.get('/purchases/:customerId', fetchPurchases,  async (req, res) => {
    try {
      const { customerId } = req.params;
      const purchases = await Purchase.find({ customerId }).populate('labTests.testId');
      
      if (!purchases) {
        return res.status(404).json({ success: false, error: 'No purchases found for this customer' });
      }
  
      res.status(200).json({ success: true, data: purchases });
    } catch (error) {
      console.error('Error fetching purchases:', error.message);
      res.status(500).json({ success: false, error: 'Server error while fetching purchases' });
    }
  });
  
  
module.exports = router;