// routes/cart.js
const express = require('express');
const router = express.Router();
// const Cart = require('../models/Cart'); // Assuming the Cart model is already defined
const auth = require('../middleware/auth'); // Middleware to verify the customer's token

// // Remove a lab test from the cart
// router.post('/cart/remove', async (req, res) => {
//     try {
//         const { testId } = req.body;
//         const customerId = req.user.id; // Assuming you have the customer ID from the auth middleware

//         // Find the cart for the logged-in customer
//         const cart = await Cart.findOne({ customerId });

//         if (!cart) {
//             return res.status(404).json({ error: 'Cart not found' });
//         }

//         // Remove the test from the cart's items array
//         cart.items = cart.items.filter(item => item.testId.toString() !== testId);

//         // Save the updated cart
//         await cart.save();

//         res.status(200).json({ message: 'Test removed from cart successfully!', cart });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to remove test from cart' });
//     }
// });

module.exports = router;
