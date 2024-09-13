const LabTestBooking = require('../models/LabTestBooking');
const LabTest = require('../models/LabTest');
const Cart = require('../models/Cart');
const { protectCustomer } = require('../middleware/auth');
const Purchase = require('../models/Purchase');



// Remove a lab test from the cart
exports.removeLabtestFromCart = async (req, res) => {
  try {
    const { testId } = req.body; // Only expect testId

    if (!testId) {
      return res.status(400).send('Test ID is required');
    }

    const cart = await Cart.findOne({ customer: req.customer._id });

    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    const itemIndex = cart.tests.findIndex(item => item.toString() === testId.toString());

    if (itemIndex === -1) {
      return res.status(404).send('Test not found in cart');
    }

    cart.tests.splice(itemIndex, 1);
    await cart.save();

    res.status(200).send('Test removed successfully');
  } catch (error) {
    console.error('Error removing test from cart:', error);
    res.status(500).send('Internal Server Error');
  }
};







exports.addLabTest = async (req, res) => {
    const { name, description, category, price, availability, preparationInstructions } = req.body;
  
    try {
      const newLabTest = new LabTest({
        name,
        description,
        category,
        price,
        availability,
        preparationInstructions
      });
  
      const savedLabTest = await newLabTest.save();
      res.status(201).json(savedLabTest);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

exports.getLabTests = async (req, res) => {
  try {
    const labTests = await LabTest.find();
    res.json(labTests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPurchases = async (req, res) => {
  try {
    // Fetch all documents from the purchases collection
    const purchases = await Purchase.find(); // Ensure 'Purchases' is the correct model for your purchases collection

    res.status(200).json(purchases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to fetch purchases for a specific customer
// Controller function to fetch purchases for a specific customer
exports.getPurchasesByCustomer = async (req, res) => {
  try {
    const customerId = req.params.customerId; // Get customerId from URL parameters

    if (!customerId) {
      return res.status(400).json({ message: 'Customer ID is required' });
    }

    // Fetch purchases for the specific customer
    const purchases = await Purchase.find({ customerId: customerId });

    if (purchases.length === 0) {
      return res.status(404).json({ message: 'No purchases found for this customer' });
    }

    res.status(200).json(purchases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPurchasesForLoggedInCustomer = async (req, res) => {
  try {
    const customerId = req.customer._id; // Use logged-in customer’s ID

    // Fetch purchases for the specific customer
    const purchases = await Purchase.find({ customerId: customerId });

    if (purchases.length === 0) {
      return res.status(404).json({ message: 'No purchases found for this customer' });
    }

    res.status(200).json(purchases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLabTestById = async (req, res) => {
  try {
    const labTest = await LabTest.findById(req.params.id);
    if (!labTest) return res.status(404).json({ message: 'Test not found' });
    res.json(labTest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.bookLabTest = async (req, res) => {
  const { testIds } = req.body;

  if (!Array.isArray(testIds) || testIds.length === 0) {
    return res.status(400).json({ success: false, error: "At least one test ID is required" });
  }

  try {
    // Find tests to add to cart
    const tests = await LabTest.find({ '_id': { $in: testIds } });

    if (tests.length !== testIds.length) {
      return res.status(404).json({ success: false, error: "One or more lab tests not found" });
    }

    // Create or update the booking to include the selected tests in the cart
    const booking = await LabTestBooking.findOneAndUpdate(
      { customer: req.customer._id, status: 'Pending' },
      { $set: { cart: testIds, tests: [] } }, // Initialize `tests` as empty, store `testIds` in `cart`
      { new: true, upsert: true } // Create a new document if none exists
    );

    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update the cart" });
  }
};


exports.getTestHistory = async (req, res) => {
  try {
      const history = await LabTestBooking.find({ customer: req.customer._id }).populate('test');
      res.json(history);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
exports.getTestHistory = async (req, res) => {
  // Fetch the test history for the authenticated user
  // For simplicity, returning a static response
  res.json([
    { id: 1, name: 'Full Body Checkup', date: '2024-08-01', status: 'Completed' },
    { id: 2, name: 'Diabetes Panel', date: '2024-08-10', status: 'Pending' },
  ]);
};
exports.bookLabtestFromCart = async (req, res) => {
  try {
    // Find the customer's cart
    const cart = await Cart.findOne({ customerId: req.customer._id });

    if (!cart || cart.tests.length === 0) {
      return res.status(400).json({ success: false, error: "Cart is empty" });
    }

    // Create bookings for each test in the cart
    const bookings = await Promise.all(cart.tests.map(async (test) => {
      // Ensure `testId` is being used to find lab test
      const labTest = await LabTest.findById(test.testId);

      if (!labTest) {
        throw new Error(`Lab test with ID ${test.testId} not found`);
      }

      return LabTestBooking.create({
        customer: req.customer._id,
        tests: [{ testId: labTest._id, quantity: test.quantity }],
        status: 'Pending'
      });
    }));

    // Clear the cart after booking
    await Cart.findByIdAndDelete(cart._id);

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error('Error booking tests from cart:', error);
    res.status(500).json({ success: false, error: "Failed to book the tests" });
  }
};

// Add selected lab tests to the customer's cart
exports.addLabtestToCart = async (req, res) => {
  const { testIds } = req.body;

  if (!Array.isArray(testIds) || testIds.length === 0) {
    return res.status(400).json({ success: false, error: "At least one test ID is required" });
  }

  try {
    // Check if the customer already has a cart
    let cart = await Cart.findOne({ customerId: req.customer._id });

    if (cart) {
      // Add or update the tests in the existing cart
      testIds.forEach(async (testId) => {
        const existingTestIndex = cart.tests.findIndex(test => test.testId.toString() === testId.toString());

        if (existingTestIndex > -1) {
          // Test already in cart, increment quantity
          cart.tests[existingTestIndex].quantity = (cart.tests[existingTestIndex].quantity || 0) + 1;
        } else {
          // Add new test
          cart.tests.push({ testId, quantity: 1 });
        }
      });
    } else {
      // Create a new cart if the customer doesn't have one
      cart = new Cart({
        customerId: req.customer._id,
        tests: testIds.map(testId => ({ testId, quantity: 1 }))
      });
    }

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error('Failed to add tests to cart:', error); // Log error details for debugging
    res.status(500).json({ success: false, error: "Failed to add tests to cart" });
  }
};
/// Add selected lab tests to the customer's cart
// exports.addToCart = async (req, res) => {
//   const { testIds } = req.body;

//   if (!Array.isArray(testIds) || testIds.length === 0) {
//     return res.status(400).json({ success: false, error: "At least one test ID is required" });
//   }

//   try {
//     // Check if the customer already has a cart
//     let cart = await Cart.findOne({ customer: req.customer._id });

//     if (cart) {
//       // Add the new tests to the existing cart
//       cart.tests.push(...testIds);
//       cart.tests = [...new Set(cart.tests.map(testId => testId.toString()))]; // Ensure no duplicates
//     } else {
//       // Create a new cart if the customer doesn't have one
//       cart = new Cart({
//         customer: req.customer._id,
//         tests: testIds
//       });
//     }

//     await cart.save();
//     res.status(200).json({ success: true, cart });
//   } catch (error) {
//     res.status(500).json({ success: false, error: "Failed to add tests to cart" });
//   }
// };