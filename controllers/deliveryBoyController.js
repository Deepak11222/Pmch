const DeliveryBoy = require('../models/DeliveryBoy');
const Order = require('../models/order');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

// Register a new delivery boy
const registerDeliveryBoy = async (req, res, next) => {
    const { name, email, phone, password, aadharNumber } = req.body;

    try {
        // Check if delivery boy already exists
        let deliveryBoy = await DeliveryBoy.findOne({ email });
        if (deliveryBoy) {
            return next(new ErrorResponse('Delivery boy already exists', 400));
        }

        // Create a new delivery boy
        const hashedPassword = await bcrypt.hash(password, 10);

        deliveryBoy = new DeliveryBoy({
            name,
            email,
            phone,
            password: hashedPassword,
            aadharNumber,
            status: 'available' // Default status
        });

        await deliveryBoy.save();

        // Create JWT token
        const token = jwt.sign({ id: deliveryBoy._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ success: true, token, deliveryBoy });
    } catch (error) {
        next(error);
    }
};

// Login delivery boy
const loginDeliveryBoy = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Find the delivery boy by email
        const deliveryBoy = await DeliveryBoy.findOne({ email });
        if (!deliveryBoy) {
            return next(new ErrorResponse('Invalid email or password', 400));
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, deliveryBoy.password);
        if (!isMatch) {
            return next(new ErrorResponse('Invalid email or password', 400));
        }

        // Create JWT token
        const token = jwt.sign({ id: deliveryBoy._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Fetch orders for the logged-in delivery boy
        const orders = await Order.find({ deliveryBoy: deliveryBoy._id });

        res.json({ success: true, token, orders, deliveryBoy });
    } catch (error) {
        next(error);
    }
};



// Get all delivery boys
const getAllDeliveryBoys = async (req, res) => {
  try {
    const deliveryBoys = await DeliveryBoy.find();
    res.json(deliveryBoys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get orders by delivery boy ID
const getOrdersByDeliveryBoy = async (req, res) => {
  try {
    const { deliveryBoyId } = req.params;
    const orders = await Order.find({ deliveryBoy: deliveryBoyId });

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all delivery boys
const getDeliveryBoys = async (req, res) => {
  try {
    const deliveryBoys = await DeliveryBoy.find({});
    res.status(200).json(deliveryBoys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrdersForDeliveryBoy = async (req, res) => {
    const { deliveryBoyId } = req.params;
  
  try {
    // Ensure the deliveryBoyId is correctly used
    console.log('Fetching orders for deliveryBoyId:', deliveryBoyId);

    // Fetch orders based on deliveryBoyId
    const orders = await Order.find({ deliveryBoyId: deliveryBoyId });
    res.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
  };

// Mark an order as delivered
const markOrderAsDelivered = async (req, res) => {
    const { orderId } = req.params;
    const { deliveryBoyId } = req.body;

    try {
        // Find the order and check if it's assigned to the correct delivery boy
        const order = await Order.findOne({ _id: orderId, deliveryBoy: deliveryBoyId });
        if (!order) {
            return res.status(404).json({ message: 'Order not found or not assigned to this delivery boy' });
        }

        // Mark the order as delivered
        order.status = 'delivered';
        await order.save();

        // Update the delivery boy's status to available
        await DeliveryBoy.findByIdAndUpdate(deliveryBoyId, { status: 'available' });

        res.json({ success: true, message: 'Order marked as delivered and delivery boy status updated to available' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status and delivery boy status' });
    }
};


// Get a single delivery boy by ID
const getDeliveryBoyById = async (req, res) => {
  try {
    const deliveryBoy = await DeliveryBoy.findById(req.params.id);
    if (!deliveryBoy) return res.status(404).json({ message: 'Delivery boy not found' });
    res.json(deliveryBoy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const addDeliveryBoy = async (req, res) => {
    const { name, phone, email, password, aadhaarNumber } = req.body;
  
    try {
      const deliveryBoyExists = await DeliveryBoy.findOne({ email });
  
      if (deliveryBoyExists) {
        return res.status(400).json({ message: 'Delivery boy already exists' });
      }
  
      const deliveryBoy = new DeliveryBoy({
        name,
        phone,
        email,
        password,
        aadhaarNumber,
      });
  
      const newDeliveryBoy = await deliveryBoy.save();
      res.status(201).json(newDeliveryBoy);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };  

// Update a delivery boy
const updateDeliveryBoy = async (req, res) => {
  try {
    const deliveryBoy = await DeliveryBoy.findById(req.params.id);
    if (!deliveryBoy) return res.status(404).json({ message: 'Delivery boy not found' });

    if (req.body.name != null) deliveryBoy.name = req.body.name;
    if (req.body.phone != null) deliveryBoy.phone = req.body.phone;
    if (req.body.status != null) deliveryBoy.status = req.body.status;

    const updatedDeliveryBoy = await deliveryBoy.save();
    res.json(updatedDeliveryBoy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a delivery boy
const deleteDeliveryBoy = async (req, res) => {
  try {
    const deliveryBoy = await DeliveryBoy.findById(req.params.id);
    if (!deliveryBoy) return res.status(404).json({ message: 'Delivery boy not found' });

    await deliveryBoy.remove();
    res.json({ message: 'Delivery boy deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Export all functions
module.exports = {
    registerDeliveryBoy,
    loginDeliveryBoy,

    getOrdersByDeliveryBoy,
    getOrdersForDeliveryBoy,
  markOrderAsDelivered,
  getDeliveryBoys,
  getAllDeliveryBoys,
  getDeliveryBoyById,
  addDeliveryBoy,
  updateDeliveryBoy,
  deleteDeliveryBoy,
};