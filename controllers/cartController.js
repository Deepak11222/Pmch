const Cart = require('../models/Cart');
const Medicine = require('../models/Medicine');
const Purchase = require('../models/Purchase');

const addToCart = async (req, res) => {
  const { medicineId, quantity } = req.body;
  const customerId = req.customer._id;

  try {
    let cart = await Cart.findOne({ customerId });
    if (!cart) {
      cart = new Cart({ customerId, items: [] });
    }

    const existingItem = cart.items.find(item => item.medicineId.equals(medicineId));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ medicineId, quantity });
    }

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ success: false, message: 'Failed to add to cart' });
  }
};

const removeFromCart = async (req, res) => {
  const { medicineId } = req.body;
  const customerId = req.customer._id;

  try {
    let cart = await Cart.findOne({ customerId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => !item.medicineId.equals(medicineId));
    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ success: false, message: 'Failed to remove from cart' });
  }
};

const viewCart = async (req, res) => {
  const customerId = req.customer._id;

  try {
    const cart = await Cart.findOne({ customerId }).populate('items.medicineId');
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error('Error viewing cart:', error);
    res.status(500).json({ success: false, message: 'Failed to view cart' });
  }
};

const makePurchase = async (req, res) => {
  const customerId = req.customer._id;

  try {
    const cart = await Cart.findOne({ customerId }).populate('items.medicineId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Calculate total amount
    const totalAmount = cart.items.reduce((total, item) => {
      return total + (item.medicineId.saleprice * item.quantity);
    }, 0);

    // Create a purchase
    const purchase = new Purchase({
      customerId,
      medicines: cart.items.map(item => ({
        medicineId: item.medicineId._id,
        quantity: item.quantity,
        price: item.medicineId.saleprice
      })),
      totalAmount
    });

    await purchase.save();

    // Clear the cart
    await Cart.deleteOne({ customerId });

    res.status(200).json({ success: true, purchase });
  } catch (error) {
    console.error('Error making purchase:', error);
    res.status(500).json({ success: false, message: 'Failed to make purchase' });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  viewCart,
  makePurchase
};