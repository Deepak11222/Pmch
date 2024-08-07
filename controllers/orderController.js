const Order = require('../models/order');
const Customer = require('../models/Customers');

// Create a new order

// Helper function to generate orderId
const generateOrderId = async () => {
  // const [pageTitle, setPageTitle] = useState('SuperAdmin Dashboard');
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
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a specific order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'firstName lastName email phone');
    if (!order) {
      return res.status(404).send();
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update an order's status
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!order) {
      return res.status(404).send();
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send();
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};