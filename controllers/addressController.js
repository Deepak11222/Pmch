// controllers/addressController.js
const Address = require('../models/Address');

// Create new address
exports.createAddress = async (req, res) => {
  try {
    const { customerId, type, addressLine1, addressLine2, city, state, postalCode, country } = req.body;
    const newAddress = new Address({
      customerId,
      type,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country
    });
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get addresses by customer ID
exports.getAddressesByCustomer = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const addresses = await Address.find({ customerId });
    res.status(200).json(addresses);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update address by ID
exports.updateAddress = async (req, res) => {
  try {
    const addressId = req.params.addressId;
    const { addressLine1, addressLine2, city, state, postalCode, country } = req.body;
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      { addressLine1, addressLine2, city, state, postalCode, country },
      { new: true }
    );
    res.status(200).json(updatedAddress);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete address by ID
exports.deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.addressId;
    await Address.findByIdAndDelete(addressId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ error: 'Server error' });
  }
};