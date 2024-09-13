const mongoose = require('mongoose');
const MedicineData = require('../models/MedicineData');
const csv = require('csvtojson');
const Medicine = require('../models/Medicine');
const MedicineType = require('../models/MedicineType');
const Manufacturer = require("../models/Manufacturer");
const MedicineCategory = require('../models/MedicineCategory');
const Cart = require('../models/Cart');


const fetchMedicineData = async (req, res) => {
    try {
        // Fetch only the required fields: medicineName, salesPrice, and expiryDate
        const medicineData = await MedicineData.find({}, { medicineName: 1, salesPrice: 1, expiryDate: 1 });

        res.status(200).json({
            success: true,
            data: medicineData
        });
    } catch (error) {
        console.error('Error fetching medicine data:', error.message);
        res.status(500).json({
            success: false,
            msg: 'Failed to fetch medicine data',
            error: error.message
        });
    }
};

const importgenricname = async (req, res) => {
    try {
        const medicineDataArray = [];
        const response = await csv().fromFile(req.file.path);

        for (let x = 0; x < response.length; x++) {
            const storeId = response[x].storeId;
            const medicineId = response[x].medicineId;

            // Validate and convert to ObjectId
            if (mongoose.Types.ObjectId.isValid(storeId) && mongoose.Types.ObjectId.isValid(medicineId)) {
                medicineDataArray.push({
                    storeId: mongoose.Types.ObjectId(storeId),
                    medicineId: mongoose.Types.ObjectId(medicineId),
                    medicineType: response[x].medicineType,
                    supplierName: response[x].supplierName,
                    batchNumber: response[x].batchNumber,
                    paymentMode: response[x].paymentMode,
                    paymentStatus: response[x].paymentStatus,
                    expiryDate: response[x].expiryDate,
                    packing: response[x].packing,
                    unit: response[x].unit,
                    qty: response[x].qty,
                    perboxStrips: response[x].perboxStrips,
                    mrpPrice: response[x].mrpPrice,
                    supplierDiscount: response[x].supplierDiscount,
                    supplierPrice: response[x].supplierPrice,
                    discount: response[x].discount,
                    netSP: response[x].netSP,
                    gst: response[x].gst,
                    salesPrice: response[x].salesPrice,
                    createdDate: response[x].createdDate,
                    createdBy: response[x].createdBy,
                });
            } else {
                throw new Error(`Invalid storeId or medicineId at row ${x + 1}`);
            }
        }

        await MedicineData.insertMany(medicineDataArray);

        res.send({ status: 200, success: true, msg: 'CSV imported' });
    } catch (error) {
        console.error(error.message);
        res.status(400).send({ status: 400, success: false, msg: error.message });
    }
};

const fetchstoremedicine= async (req, res) => {
    try {
      const storeId = req.params.storeId;
      
      // Fetch all medicines for the given store
      const medicines = await Medicine.find({ storeId });
  
      // Iterate over each medicine and calculate total qty from MedicineData
      const populatedMedicines = await Promise.all(medicines.map(async (medicine) => {
        const medicineDataEntries = await MedicineData.find({ storeId, medicineId: medicine._id });
        const totalQty = medicineDataEntries.reduce((acc, entry) => acc + entry.qty, 0);
  
        return {
          _id: medicine._id,
          medicineName: medicine.medicineName,
          expiryDate: medicineDataEntries.length > 0 ? medicineDataEntries[0].expiryDate : null,
          batchNumber: medicineDataEntries.length > 0 ? medicineDataEntries[0].batchNumber : null,
          qty: totalQty,
          status: medicine.status,
        };
      }));
  
      res.json({ success: true, data: populatedMedicines });
    } catch (error) {
      console.error('Error fetching medicines:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch medicines' });
    }
  };

    const MedicinesData = async (req, res) => {
    try {
      const storeId = req.params.storeId;
      const medicinesData = await MedicineData.find({ storeId }).populate('medicineId', 'medicineName medicineType category');
      res.status(200).json({ success: true, data: medicinesData });
    } catch (error) {
      console.error('Error fetching medicine data:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch medicine data' });
    }
  };

  const getManufacturers= async (req, res) => {

    try {
      const activeManufacturer = await Manufacturer.find({ status: 1 });
      res.json(activeManufacturer);
    } catch (error) {
      console.error('Error fetching active manufacturer:', error);
      res.status(500).json({ message: 'Failed to fetch active manufacturer' });
    }
  };
  
  // GET all active medicine types
    const getmedicineTypes = async (req, res) => {
    try {
      const activeMedicineTypes = await MedicineType.find({ status: 1 });
      res.json(activeMedicineTypes);
    } catch (error) {
      console.error('Error fetching active medicine types:', error);
      res.status(500).json({ message: 'Failed to fetch active medicine types' });
    }
  };
  
  
  // Fetch active medicine categories
    const getmedicineCategories = async (req, res) => {
    try {
      const activeMedicineCategories = await MedicineCategory.find({ status: 1 });
      res.json(activeMedicineCategories);
    } catch (error) {
      console.error('Error fetching active medicine categories:', error);
      res.status(500).json({ message: 'Failed to fetch active medicine categories' });
    }
  };
  
    const getManufacturer = async (req, res) => {
    try {
      const manufacturer = await Manufacturer.find();
      res.status(200).json({ success: true, data: manufacturer });
    } catch (error) {
      console.error('Error fetching medicine types:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch medicine types' });
    }
  };

  // Add medicine to the cart
  const addMedicineToCart = async (req, res) => {
    const { medicineId, quantity } = req.body;
    const customer = req.customer; // Extract customer from the request
  
    try {
      // Validate input
      if (!medicineId || !quantity || quantity <= 0) {
        return res.status(400).json({ success: false, message: 'Invalid medicine ID or quantity' });
      }
  
      // Find the medicine
      const medicine = await Medicine.findById(medicineId);
      if (!medicine) {
        return res.status(404).json({ success: false, message: 'Medicine not found' });
      }
  
      // Find or create the cart for the customer
      let cart = await Cart.findOne({ customerId: customer._id });
      if (!cart) {
        // If no cart exists, create a new one
        cart = new Cart({ customerId: customer._id, medicines: [] });
      }
  
      // Ensure the medicines array is defined
      if (!Array.isArray(cart.medicines)) {
        cart.medicines = [];
      }
  
      // Find the index of the existing medicine in the cart
      const existingMedicineIndex = cart.medicines.findIndex(item => item.medicineId.toString() === medicineId.toString());
  
      if (existingMedicineIndex !== -1) {
        // Update quantity if the medicine already exists in the cart
        cart.medicines[existingMedicineIndex].quantity += quantity;
      } else {
        // Add new medicine to the cart
        cart.medicines.push({ medicineId, quantity });
      }
  
      // Save the cart
      await cart.save();
  
      res.status(200).json({
        success: true,
        message: 'Medicine added to cart',
        customerId: customer._id,
        cart
      });
    } catch (error) {
      console.error('Error adding medicine to cart:', error.message);
      res.status(500).json({ success: false, message: 'Error adding medicine to cart' });
    }
  };  
  
  

// Remove medicine from the cart
const removeMedicineFromCart = async (req, res) => {
    const { medicineId } = req.body;
    const customerId = req.customer._id;

    try {
        let cart = await Cart.findOne({ customerId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        cart.medicines = cart.medicines.filter(item => item.medicineId.toString() !== medicineId);
        await cart.save();
        res.status(200).json({ success: true, message: 'Medicine removed from cart', customerId, cart });
    } catch (error) {
        console.error('Error removing medicine from cart:', error.message);
        res.status(500).json({ success: false, message: 'Error removing medicine from cart' });
    }
};

// View medicines in the cart
const viewMedicinesInCart = async (req, res) => {
    const customerId = req.customer._id;

    try {
        const cart = await Cart.findOne({ customerId }).populate('medicines.medicineId');
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        res.status(200).json({ success: true, customerId, medicines: cart.medicines });
    } catch (error) {
        console.error('Error viewing medicines in cart:', error.message);
        res.status(500).json({ success: false, message: 'Error viewing medicines in cart' });
    }
};


  
  

module.exports = {
    importgenricname,
    addMedicineToCart,
    removeMedicineFromCart,
    viewMedicinesInCart,
    getmedicineCategories,
    getmedicineTypes,
    getManufacturer,
    getManufacturers,
    MedicinesData,
    fetchMedicineData,
    fetchstoremedicine
};
