const Customer = require('../models/Customer');
const LabTest = require('../models/LabTest');
const Purchase = require('../models/Purchase');
const ErrorResponse = require('../utils/errorResponse');

// Fetch purchase history for a customer
exports.fetchPurchases = async (req, res) => {
    try {
      const { customerId } = req.params;
  
      const purchases = await Purchase.find({ customerId }).populate('labTests.testId');
  
      if (!purchases || purchases.length === 0) {
        return res.status(404).json({ success: false, error: 'No purchases found for this customer' });
      }
  
      res.status(200).json({ success: true, data: purchases });
    } catch (error) {
      console.error('Error fetching purchases:', error.message);
      res.status(500).json({ success: false, error: 'Server error while fetching purchases' });
    }
  };
  
  // Fetch all purchases (admin or general viewing)
// Fetch all purchases (for admin or privileged access)
exports.getAllPurchases = async (req, res, next) => {
    try {
      const purchases = await Purchase.find().populate('customerId', 'name email'); // Optionally populate customer details
  
      if (!purchases) {
        return next(new ErrorResponse('No purchases found', 404));
      }
  
      res.status(200).json({
        success: true,
        data: purchases,
      });
    } catch (error) {
      console.error('Error fetching all purchases:', error);
      return next(new ErrorResponse('Internal server error', 500));
    }
  };  
  

// Controller to handle the purchase
// Controller to handle the purchase
exports.makePurchase = async (req, res, next) => {
    try {
      const customer = req.customer; // Extract customer from the request added by middleware
      const { labTests } = req.body; // Get the lab tests from the request body
  
      // Validate the presence of lab tests
      if (!labTests || !Array.isArray(labTests) || labTests.length === 0) {
        return next(new ErrorResponse('Lab tests are required', 400));
      }
  
      // Validate lab tests and check availability
      const validLabTests = await LabTest.find({ '_id': { $in: labTests } });
  
      if (validLabTests.length !== labTests.length) {
        return next(new ErrorResponse('Some lab tests are not found or are unavailable', 404));
      }
  
      // Proceed with purchase logic
      const purchaseDetails = validLabTests.map(test => ({
        testId: test._id,
        name: test.name,
        price: test.price
      }));
  
      // Create a new purchase record
      const purchase = new Purchase({
        customerId: customer._id,
        labTests: purchaseDetails,
        totalAmount: purchaseDetails.reduce((acc, test) => acc + test.price, 0),
        purchaseDate: new Date(),
      });
  
      // Save the purchase record
      await purchase.save();
  
      // Respond with success message
      res.status(201).json({
        message: 'Purchase completed successfully',
        purchaseId: purchase._id,
        totalAmount: purchase.totalAmount,
      });
  
    } catch (error) {
      console.error('Error processing purchase:', error);
      return next(new ErrorResponse('Internal server error', 500));
    }
  };
  
  // Controller to fetch purchases for a customer
  exports.fetchPurchases = async (req, res, next) => {
    try {
      // Ensure the logged-in customer matches the requested customerId
      if (req.customer._id.toString() !== req.params.customerId) {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to access this customer\'s purchases',
        });
      }
  
      // Fetch purchases for the specific customer
      const purchases = await Purchase.find({ customerId: req.params.customerId })
        .populate('labTests.testId');
  
      // If no purchases are found, return a 404 response
      if (!purchases) {
        return res.status(404).json({
          success: false,
          error: 'No purchases found for this customer',
        });
      }
  
      // Return the list of purchases in the response
      res.status(200).json({
        success: true,
        data: purchases,
      });
  
    } catch (error) {
      console.error('Error fetching purchases:', error.message);
      return next(new ErrorResponse('Server error while fetching purchases', 500));
    }
  };

  exports.getPurchase = async (req, res) => {
    try {
      const purchases = await Purchase.find();
      res.json(purchases);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };