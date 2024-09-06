const express = require('express');
const router = express.Router();
const deliveryBoyController = require('../controllers/deliveryBoyController');
const { protectDeliveryBoy } = require('../middleware/auth');
const DeliveryBoy = require('../models/DeliveryBoy'); // Required for the login route
const bcrypt = require('bcryptjs'); // Required for password comparison
const jwt = require('jsonwebtoken'); // Required for generating JWT tokens

// Authentication routes for delivery boys
router.post('/delivery-boys/login', deliveryBoyController.loginDeliveryBoy);
router.post('/delivery-boys/register', deliveryBoyController.registerDeliveryBoy);

// Route to fetch orders for the authenticated delivery boy
router.get('/delivery-boys/me/orders', protectDeliveryBoy, deliveryBoyController.getOrdersForDeliveryBoy);
  

router.get('/', deliveryBoyController.getAllDeliveryBoys);
router.get('/delivery-boys', deliveryBoyController.getDeliveryBoys);
router.post('/adddelivery', deliveryBoyController.addDeliveryBoy);
router.put('/:id', deliveryBoyController.updateDeliveryBoy);
router.delete('/:id', deliveryBoyController.deleteDeliveryBoy);

// Route to fetch orders for a delivery boy
router.get('/:deliveryBoyId/orders', deliveryBoyController.getOrdersForDeliveryBoy);
router.put('/orders/:orderId/deliver', deliveryBoyController.markOrderAsDelivered);


module.exports = router;