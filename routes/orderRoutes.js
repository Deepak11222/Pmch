const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const Order = require('../models/order');
const DeliveryBoy = require('../models/DeliveryBoy');
const { protectCustomer } = require('../middleware/auth'); // Ensure this is correctly imported

// Route to create a new order
router.post('/orders', orderController.createOrder);

// Route to get all orders
router.get('/orders', orderController.getOrders);

// Get order history for a customer
router.get('/orders/history', protectCustomer, async (req, res) => {
  try {
      const customerId = req.customer._id; // Use req.customer
      const orders = await Order.find({ customer: customerId }).populate('labTests');
      res.status(200).json({ orders });
  } catch (error) {
      console.error("Error fetching order history:", error);
      res.status(500).json({ error: "Failed to fetch order history" });
  }
});


// Route to get a specific order by ID
router.get('/orders/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('userId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Route to update an order's status
router.put('/orders/:id', orderController.updateOrder);

// Route to delete an order
router.delete('/orders/:id', orderController.deleteOrder);

// Route to assign a delivery boy to an order
router.put('/orders/assign/:orderId', orderController.assignDeliveryBoy);
// Endpoint to assign an order
// router.put('/orders/assign/:orderId', async (req, res) => {
//   try {
//     const { deliveryBoyId } = req.body;
//     const { orderId } = req.params;

//     // Find and update the order
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ success: false, message: 'Order not found' });
//     }
//     order.deliveryBoyId = deliveryBoyId;
//     await order.save();

//     // Find and update the delivery boy's status
//     const deliveryBoy = await DeliveryBoy.findById(deliveryBoyId);
//     if (!deliveryBoy) {
//       return res.status(404).json({ success: false, message: 'Delivery boy not found' });
//     }
//     deliveryBoy.status = 'unavailable';
//     await deliveryBoy.save();

//     res.json({ success: true, message: 'Order assigned and delivery boy status updated' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error', error: error.message });
//   }
// });



module.exports = router;