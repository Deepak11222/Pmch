const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const sanitizeHtml = require('sanitize-html');

// Import your user model or database schema at the top of the file
const User = require("../models/User");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.use(express.json({ limit: '10mb' }));


// Controllers
const {
  dashboard,
  login,
  register,
  forgotPassword,
  resetPassword,
  loginStoreAdmin,
  store,
} = require("../controllers/auth");

router.route("/register").post(register);
router.route("/store").post(store);

router.route("/login").post(login);
router.route("/login").post(loginStoreAdmin);

router.route("/forgotpassword").post(forgotPassword);

router.route("/passwordreset/:resetToken").put(resetPassword);


// Update user information
router.put("/update/:id", async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

const handleSave = async (user) => {
  try {
    const response = await axios.post(`/api/auth/update/${user._id}`, {
      username: user.username,
      email: user.email,
    });
    if (response.data.success) {
      // Update the user's data in the state
      setUsers((prevUsers) =>
        prevUsers.map((prevUser) =>
          prevUser._id === user._id ? { ...prevUser, ...user } : prevUser
        )
      );
      setEditingUser(null); // Close the edit form
    }
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};

// Delete a user by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

const StoreAdmin = require("../models/Store");

// Store Admin Registration
router.post('/store/register', async (req, res) => {
  const { name, email, password, location, phoneNumber } = req.body;
  try {
    let store = await Store.findOne({ email });
    if (store) {
      return res.status(400).json({ message: 'Store already exists' });
    }

    store = new Store({ name, email, password, location, phoneNumber });
    await store.save();

    const token = store.generateStoreAdminToken();
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



const Store = require("../models/Store");
// Login a store admin
router.post('/store/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const store = await Store.findOne({ email }).select('+password');
    if (!store) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await store.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = store.generateStoreAdminToken();
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// router.post('/store', async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Check if store already exists
//     let store = await StoreAdmin.findOne({ email });
//     if (store) {
//       return res.status(400).json({ message: 'Store already exists' });
//     }

//     store = new StoreAdmin({
//       name,
     
//       // phonenumber,
//       email,
//       password,
//     });

//     // Hash the password before saving the store
//     const salt = await bcrypt.genSalt(10);
//     store.password = await bcrypt.hash(password, salt);

//     await store.save();

//     res.status(201).json({ message: 'Store created successfully' });
//   } catch (error) {
//     console.error('Error adding store:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// Delete a store
router.delete('/store/:id', async (req, res) => {
  try {
      const { id } = req.params;
      await Store.findByIdAndDelete(id);
      res.json({ success: true, message: 'Store deleted successfully' });
  } catch (error) {
      console.error('Error deleting store:', error);
      res.status(500).json({ message: 'Failed to delete store' });
  }
});

// Update a store
router.put('/store/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { name, location, phoneNumber, email, password } = req.body;
      const updatedStore = await Store.findByIdAndUpdate(id, { name, location, phoneNumber, email, password }, { new: true });
      res.json({ success: true, message: 'Store updated successfully', data: updatedStore });
  } catch (error) {
      console.error('Error updating store:', error);
      res.status(500).json({ message: 'Failed to update store' });
  }
});

// router.post('/medicine', async (req, res) => {
  //   const { medicineName, expiryDate, batchNumber, availabilityQty, storeId } = req.body;
  
//   try {
  //     // Check if medicine already exists for the given store
  //     let existingMedicine = await Medicine.findOne({ medicineName, batchNumber, storeId });
  //     if (existingMedicine) {
    //       return res.status(400).json({ message: 'Medicine already exists for this store' });
//     }

//     const newMedicine = new Medicine({
//   medicineName,
//   expiryDate,
//   batchNumber,
//   availabilityQty,
//   store: storeId // Assign the storeId to the store field
// });

// await newMedicine.save();

//     res.status(201).json({ success: true, message: 'Medicine added successfully', data: newMedicine });
//   } catch (error) {
//     console.error('Error adding medicine:', error.message);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

const Medicine = require('../models/Medicine');
const Order = require('../models/order');
const Customer = require('../models/Customers');
const MedicineData = require('../models/MedicineData');
const MedicineType = require('../models/MedicineType');

// Create a new order
// router.post('/orders', async (req, res) => {
//   try {
//     const {
//       userId,
//       storeId,
//       items,
//       billToName,
//       shipToName,
//       grandTotal,
//       status,
//       billingAddress,
//       shippingAddress
//     } = req.body;

//     // Check if customer exists
//     const customer = await Customer.findById(userId);
//     if (!customer) {
//       return res.status(404).json({ success: false, message: 'Customer not found' });
//     }

//     // Create a new order
//     const order = new Order({
//       userId,
//       storeId,
//       items,
//       billToName,
//       shipToName,
//       grandTotal,
//       status,
//       billingAddress,
//       shippingAddress
//     });

//     await order.save();
//     res.status(201).json({ success: true, message: 'Order placed successfully', data: order });
//   } catch (error) {
//     console.error('Error creating order:', error);
//     res.status(500).json({ success: false, message: 'Error creating order' });
//   }
// });

// Add or update medicine data
// Add or update medicine data
// Add or update medicine data
router.post('/medicines', async (req, res) => {  try {
      const { storeId, medicineName,medicineType, issueUnit, purchaseUnit, conversion, drugForm, supplierName, batchNumber, manufacturer, paymentMode, paymentStatus, expiryDate, packing_1, packing_2, unit, qty, perboxStrips, mrpPrice, supplierDiscount, supplierPrice, discount, netSP, gst, salesPrice, actStatus, delStatus, createdBy } = req.body;

       // Fetch the medicineType value from the MedicineType collection
       const medicineTypeDoc = await MedicineType.findById(medicineType);
       if (!medicineTypeDoc) {
           return res.status(404).json({ success: false, message: 'MedicineType not found' });
       }

       const medicineTypeValue = medicineTypeDoc.name; // Assuming 'name' is the field you want to store

      // Create the packing format (e.g., 1X10)
      const packingFormat = `${packing_1}x${packing_2}`;
      let medicine = await Medicine.findOne({ medicineName });

      if (medicine) {
          // Create new entry in MedicineData
          const medicineData = new MedicineData({
              storeId,
              medicineId: medicine._id,
              medicineType: medicineTypeValue,
              supplierName,
              batchNumber,
              paymentMode,
              paymentStatus,
              expiryDate,
              packing: packingFormat,
              packing_1,
              packing_2,
              unit,
              qty,
              perboxStrips,
              mrpPrice,
              supplierDiscount,
              supplierPrice,
              discount,
              netSP,
              gst,
              salesPrice,
              actStatus,
              delStatus,
              createdBy,
          });

          await medicineData.save();

          res.status(200).json({ success: true, message: 'New entry added to MedicineData successfully' });
      } else {
          // Create new medicine and new entry in MedicineData
          medicine = new Medicine({
              storeId,
              medicineName,
              issueUnit,
              purchaseUnit,
              conversion,
              drugForm,
              manufacturer,
              expiryDate,
              potency: req.body.potency,
              manufacturer: req.body.manufacturer,
              genericName: req.body.genericName,
              unit,
              mrpPrice,
              supplierPrice,
              patientDiscount: discount,
              gst,
              paymentMode,
              paymentStatus,
              category: req.body.category,
              packing: packingFormat,
              packing_1,
              packing_2,
              availabilityQty: qty,
          });

          await medicine.save();

          const medicineData = new MedicineData({
              storeId,
              medicineId: medicine._id,
              supplierName,
              batchNumber,
              paymentMode,
              paymentStatus,
              expiryDate,
              packing: packingFormat,
              packing_1,
              packing_2,
              unit,
              qty,
              perboxStrips,
              mrpPrice,
              supplierDiscount,
              supplierPrice,
              discount,
              netSP,
              gst,
              salesPrice,
              actStatus,
              delStatus,
              createdBy,
          });

          await medicineData.save();

          res.status(200).json({ success: true, message: 'New medicine and entry added to MedicineData successfully' });
      }
  } catch (error) {
      console.error('Error adding or updating medicine data:', error);
      res.status(500).json({ success: false, message: 'Failed to add or update medicine data' });
  }
});










// router.get('/medicine', async (req, res) => {
//   try {
//     const medicines = await Medicine.find({ store: req.store._id });
//     res.status(200).json(medicines);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// router.get('/medicine', async (req, res) => {
//   try {
//     // Extract the store ID from the request query or token
//     const storeId = req.query.storeId; // Example: if storeId is included in the request query
//     // const storeId = req.user.id; // Example: if storeId is extracted from the authenticated user's token

//     // Fetch medicines for the specific store
//     const medicines = await Medicine.find({ storeId });

//     res.status(200).json({ success: true, data: medicines });
//   } catch (error) {
//     console.error('Error fetching medicines:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });


// router.get('/medicine', async (req, res) => {
//   try {
//     const medicines = await Medicine.find();
//     res.json(medicines);
//   } catch (error) {
//     console.error('Error fetching medicines:', error);
//     res.status(500).json({ message: 'Failed to fetch medicines' });
//   }
// });


// Delete a medicine
router.delete('/medicine/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Medicine.findByIdAndDelete(id);
    res.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    console.error('Error deleting medicine:', error);
    res.status(500).json({ message: 'Failed to delete medicine' });
  }
});








module.exports = router;