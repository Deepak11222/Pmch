const express = require('express');
const orderController = require('../controllers/orderController');
const Order = require('../models/order');
const router = express.Router();

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getOrders);

// Fetch a specific order and populate customer data
// Fetch a specific order and populate customer data
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
  router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;