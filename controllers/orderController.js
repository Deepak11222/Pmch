const Order = require('../models/order');
const DeliveryBoy = require('../models/DeliveryBoy');
const Customer = require('../models/Customer'); // Make sure the path is correct

// Helper function to generate a new order ID
const generateOrderId = async () => {
  const latestOrder = await Order.findOne().sort({ _id: -1 }).exec();
  const newOrderIdNumber = latestOrder ? parseInt(latestOrder.orderId.split('-')[0], 10) + 1 : 1;
  return `${newOrderIdNumber.toString().padStart(9, '0')}-1`;
};

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, ...orderData } = req.body;

    // Check if customer exists
    const customer = await Customer.findById(userId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const orderId = await generateOrderId();
    const order = new Order({ ...orderData, orderId, userId });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('userId', 'firstName lastName email phone');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'firstName lastName email phone');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an order's status
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign a delivery boy to an order
exports.assignDeliveryBoy = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const deliveryBoy = await DeliveryBoy.findById(req.body.deliveryBoyId);
    if (!deliveryBoy) {
      return res.status(404).json({ message: 'Delivery boy not found' });
    }

    order.deliveryBoy = deliveryBoy._id;
    order.status = 'assigned'; // Optionally update the order status

    // Update the delivery boy's status to 'unavailable'
    deliveryBoy.status = 'unavailable';
    await deliveryBoy.save();

    await order.save();

    res.json({ message: 'Delivery boy assigned successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// const Order = require('../models/Order'); // Adjust the path as needed

exports.getOrdersForDeliveryBoy = async (req, res) => {
  const { deliveryBoyId } = req.params;

  try {
    const orders = await Order.find({ deliveryBoyId });
    res.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// /// Controller to fetch orders by delivery boy ID
// exports.getOrdersByDeliveryBoyId = async (req, res) => {
//   const { deliveryBoyId } = req.params;
//   try {
//       const orders = await Order.find({ deliveryBoy: deliveryBoyId });
//       res.json({ success: true, orders });
//   } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//   }
// };