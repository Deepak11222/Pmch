// controllers/medicineCartController.js
const Cart = require('../models/Cart');
const Medicine = require('../models/Medicine'); // Assuming you have a Medicine model

// // Function to add medicine to the cart
// exports.addMedicineToCart = async (req, res) => {
//     const { medicineId, quantity } = req.body;
//     const customerId = req.customer._id; // Extracted from authenticated customer

//     try {
//         // Validate medicine existence
//         const medicine = await Medicine.findById(medicineId);
//         if (!medicine) {
//             return res.status(404).json({ success: false, message: 'Medicine not found' });
//         }

//         // Find or create a cart for the customer
//         let cart = await Cart.findOne({ customerId });
//         if (!cart) {
//             cart = new Cart({ customerId });
//         }

//         // Check if medicine is already in the cart
//         const existingMedicineIndex = cart.medicines.findIndex(item => item.medicineId.toString() === medicineId);
        
//         if (existingMedicineIndex !== -1) {
//             // Update quantity if already exists
//             cart.medicines[existingMedicineIndex].quantity += quantity;
//         } else {
//             // Add new medicine
//             cart.medicines.push({ medicineId, quantity });
//         }

//         // Save the cart
//         await cart.save();
//         res.status(200).json({ success: true, message: 'Medicine added to cart', customerId, cart });
//     } catch (error) {
//         console.error('Error adding medicine to cart:', error);
//         res.status(500).json({ success: false, message: 'Error adding medicine to cart' });
//     }
// };

// // Function to remove medicine from the cart
// exports.removeMedicineFromCart = async (req, res) => {
//     const { medicineId } = req.body;
//     const customerId = req.customer._id; // Extracted from authenticated customer

//     try {
//         // Find the cart for the customer
//         let cart = await Cart.findOne({ customerId });
//         if (!cart) {
//             return res.status(404).json({ success: false, message: 'Cart not found' });
//         }

//         // Remove medicine from the cart
//         cart.medicines = cart.medicines.filter(item => item.medicineId.toString() !== medicineId);

//         // Save the updated cart
//         await cart.save();
//         res.status(200).json({ success: true, message: 'Medicine removed from cart', customerId, cart });
//     } catch (error) {
//         console.error('Error removing medicine from cart:', error);
//         res.status(500).json({ success: false, message: 'Error removing medicine from cart' });
//     }
// };

// // Function to view medicines in the cart
// exports.viewMedicinesInCart = async (req, res) => {
//     const customerId = req.customer._id; // Extracted from authenticated customer

//     try {
//         // Find the cart for the customer
//         const cart = await Cart.findOne({ customerId }).populate('medicines.medicineId');
//         if (!cart) {
//             return res.status(404).json({ success: false, message: 'Cart not found' });
//         }

//         // Send cart data including medicines
//         res.status(200).json({ success: true, customerId, medicines: cart.medicines });
//     } catch (error) {
//         console.error('Error viewing medicines in cart:', error);
//         res.status(500).json({ success: false, message: 'Error viewing medicines in cart' });
//     }
// };