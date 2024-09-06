require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require('mongoose');  // Ensure this is included
const multer = require('multer');
// const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const genericNamesRoute = require('./routes/genericnameRoutes');
const { protectCustomer } = require('./middleware/auth');


connectDB();

app.use(express.json());
app.use('/api/generic-names', genericNamesRoute);

app.use(express.json({ limit: '100mb' }));

const path = require('path');
const cors = require("cors");

app.use(cors());
app.use("/public/images", express.static(path.join(__dirname, "public/images")));


// Import your user model at the top
// const Order = require('./models/order');
const Purchase = require('./models/Purchase'); 
const User = require("./models/User");
const cartRoutes = require('./routes/cart'); // Import the cart routes
const deliveryBoysRouter = require('./routes/deliveryBoy');
const salesRoutes = require('./routes/salesRoutes');
const router = require("./routes/auth");
const commentRoutes = require('./routes/commentRoutes'); // Adjust the path as necessary
var genericnameRoute = require('./routes/genericnameRoutes')
var medicinedataRoute = require('./routes/medicinedataRoutes')
var medicineRoute = require('./routes/medicineRoutes')
const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customerRoutes');
const addressRoutes = require('./routes/addressRoutes');
const labTestRoutes = require('./routes/labTestRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');

app.use('/',genericnameRoute);
app.use('/', deliveryBoysRouter);
app.use('/', salesRoutes);
app.use('/', commentRoutes)
app.use('/',medicineRoute);
app.use('/',medicinedataRoute);
app.use('/', orderRoutes);
app.use('/', customerRoutes);
app.use('/', addressRoutes);
app.use('/', labTestRoutes);
app.use('/', cartRoutes);
app.use('/', purchaseRoutes);

app.get('/orders/history', protectCustomer, async (req, res) => {
  try {
    const customerId = req.customer._id;

    // Fetch orders for the customer and populate necessary fields
    const orders = await Order.find({ userId: customerId })
      .populate('storeId', 'name') // Assuming you want to populate store details
      .populate('deliveryBoy', 'firstName lastName') // Assuming you want to populate delivery boy details
      .sort({ purchaseDate: -1 }); // Sort by most recent orders

    if (!orders) {
      return res.status(404).json({ message: "No orders found for this customer." });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ error: "Failed to fetch order history" });
  }
});


// Endpoint to fetch all purchases for a specific customer
// Endpoint to fetch all purchases (publicly accessible)
// app.get('/purchases', async (req, res) => {
//     try {
//         const purchases = await Purchase.find().populate('labTests.testId'); // Adjust if necessary
//         res.status(200).json({ purchases });
//     } catch (error) {
//         console.error('Error fetching purchases:', error.message);
//         res.status(500).json({ error: 'Failed to fetch purchases' });
//     }
// });



// Add the /purchase route
app.post("/purchase", async (req, res) => {
  try {
    const { customerId, labTests } = req.body;

    // Log the request body to see if the required fields are present
    console.log("Request Body:", req.body);

    if (!customerId || !labTests || labTests.length === 0) {
      console.error("Bad Request: Missing customerId or labTests");
      return res.status(400).json({ message: "Customer ID and lab tests are required" });
    }

    // Create a new cart for the customer
    const cart = new Cart({
      customer: customerId,
      tests: labTests,
    });

    await cart.save(); // Save the cart to the database

    res.status(200).json({ message: "Purchase successful", cart });
  } catch (error) {
    console.error("Error in /purchase route:", error); // Log the detailed error
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add this route to your server file
// async function getPurchasesForCustomer(customerId) {
//   console.log("Customer ID received:", customerId); // Debug log
//   if (!mongoose.Types.ObjectId.isValid(customerId)) {
//     throw new Error('Invalid customerId');
//   }
//   try {
//     const purchases = await Purchase.find({ customerId });
//     return purchases;
//   } catch (error) {
//     throw new Error('Error fetching purchases: ' + error.message);
//   }
// }

// app.get('/purchases/:id', async (req, res) => {
//   try {
//     const purchaseId = req.params.id;
//     const purchase = await Purchase.findById(purchaseId); // Fetching purchase by ID
//     if (!purchase) {
//       return res.status(404).json({ success: false, error: 'Purchase not found' });
//     }
//     res.json({ success: true, data: purchase });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// app.get('purchases/all', async (req, res) => {
//   try {
//       const purchases = await Purchase.find().populate('labTests');
//       res.json({ purchases });
//   } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch all purchases' });
//   }
// });



// app.get('/purchases/:customerId', async (req, res) => {
//   try {
//     const { customerId } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(customerId)) {
//       return res.status(400).json({ error: 'Invalid customerId' });
//     }
//     console.log("Fetching purchases for Customer ID:", customerId);
//     const purchases = await getPurchasesForCustomer(customerId);
//     res.json({ purchases });
//   } catch (error) {
//     console.error("Error fetching purchases:", error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// Route to remove an item from the cart
app.post('/cartremove', async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Validate input
    if (!userId || !itemId) {
      return res.status(400).send('User ID and Item ID are required');
    }

    // Find the cart for the user
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    // Remove the item from the cart
    const itemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId.toString());
    
    if (itemIndex === -1) {
      return res.status(404).send('Item not found in cart');
    }

    cart.items.splice(itemIndex, 1); // Remove item from array
    await cart.save(); // Save changes to the database

    res.status(200).send('Item removed successfully');
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.put('/orders/assign/:orderId', async (req, res) => {
  res.json({ message: 'Route is working' });
});

app.get('/delivery-boys/:id/orders', async (req, res) => {
  try {
    const orders = await Order.find({ deliveryBoy: req.params.id, status: { $ne: 'delivered' } });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
});



  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/Images/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage: storage });


app.get("/api/users", async (req, res) => {
  try {
    // Fetch all user data from the database
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Create an API route for adding a user
app.post("/api/auth/adduser", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email is already in use" });
    }
    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error("Error adding a new user:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

const Store = require('./models/Store');
// const Customer = require('./models/Customers'); // Ensure this path is correct
const Medicine = require('./models/Medicine');
const MedicineData = require('./models/MedicineData');
const MedicineCategory = require('./models/MedicineCategory');

app.post('/api/auth/order', async (req, res) => {
  try {
    const {
      userId,
      storeId,
      items,
      billToName,
      shipToName,
      grandTotal,
      status,
      billingAddress,
      shippingAddress
    } = req.body;

    // Check if customer exists
    const customer = await Customer.findById(userId);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    // Create a new order
    const order = new Order({
      userId,
      storeId,
      items,
      billToName,
      shipToName,
      grandTotal,
      status,
      billingAddress,
      shippingAddress
    });

    await order.save();
    res.status(201).json({ success: true, message: 'Order placed successfully', data: order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Error creating order' });
  }
});

app.get('/api/auth/store', async (req, res) => {
  try {
      const stores = await Store.find();
      res.json(stores);
  } catch (error) {
      console.error('Error fetching stores:', error);
      res.status(500).json({ message: 'Failed to fetch stores' });
  }
});


// app.get('/api/auth/medicine', authenticate, async (req, res) => {
//   try {
//     const medicines = await Medicine.find();
//     res.send({ success: true, data: medicines });
//   } catch (error) {
//     res.status(500).send({ success: false, message: 'Server Error' });
//   }
// });



app.delete('api/auth/store/:id', async (req, res) => {
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
app.put('/api/auth/store/:id', async (req, res) => {
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

app.put('/api/auth/medicine-data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { medicineName, expiryDate, batchNumber, qty } = req.body;
    
    // Update the medicine in your database
    const updatedMedicine = await Medicine.findByIdAndUpdate(id, {
      medicineName,
      expiryDate,
      batchNumber,
      qty
    }, { new: true });

    if (!updatedMedicine) {
      return res.status(404).json({ success: false, error: 'Medicine not found' });
    }

    res.json({ success: true, data: updatedMedicine });
  } catch (err) {
    console.error('Error updating medicine:', err);
    res.status(500).json({ success: false, error: 'Failed to update medicine' });
  }
});


app.delete('/api/auth/medicine-data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Medicine.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting medicine:', err);
    res.status(500).json({ success: false, error: 'Failed to delete medicine' });
  }
});



router.get('/medicines/:storeId', async (req, res) => {
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
});

router.put('/medicine-status/:medicineId', async (req, res) => {
  try {
    const medicineId = req.params.medicineId;
    const { status } = req.body;

    const updatedMedicine = await Medicine.findByIdAndUpdate(medicineId, { status }, { new: true });

    res.json({ success: true, data: updatedMedicine });
  } catch (error) {
    console.error('Error updating medicine status:', error);
    res.status(500).json({ success: false, message: 'Failed to update medicine status' });
  }
});

// Example GET route to fetch MedicineData with populated medicineName
// Example backend route to fetch MedicineData with populated medicineName
app.get('/api/auth/medicine-data/:storeId', async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const medicinesData = await MedicineData.find({ storeId }).populate('medicineId', 'medicineName medicineType category');
    res.status(200).json({ success: true, data: medicinesData });
  } catch (error) {
    console.error('Error fetching medicine data:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch medicine data' });
  }
});

const GenericName = require('./models/GenericName'); // adjust the path as necessary

app.get('/api/auth/genericNames', async (req, res) => {
  try {
    const activeGenericNames = await GenericName.find({ status: 1 });
    res.json(activeGenericNames);
  } catch (error) {
    console.error('Error fetching active medicine types:', error);
    res.status(500).json({ message: 'Failed to fetch active medicine types' });
  }
});


// POST /api/auth/generic-names
router.post('/generic-names', async (req, res) => {
  const { genericName } = req.body;

  try {
    const status = determineStatusForGenericName(genericName); // Implement your business logic
    
    const newGenericName = new GenericName({
      genericName,
      status,
    });

    const savedGenericName = await newGenericName.save();
    res.status(201).json({ success: true, data: savedGenericName });
  } catch (error) {
    console.error('Error creating generic name:', error);
    res.status(500).json({ success: false, message: 'Failed to create generic name' });
  }
});

// Function to determine status based on business rules
function determineStatusForGenericName(genericName) {
  // Example logic: set status based on genericName properties or other factors
  if (genericName.toLowerCase().includes('common')) {
    return 1; // Active
  } else {
    return 0; // Inactive
  }
}

// GET /api/auth/generic-names
router.get('/generic-names', async (req, res) => {
  try {
    const genericNames = await GenericName.find();
    res.status(200).json({ success: true, data: genericNames });
  } catch (error) {
    console.error('Error fetching generic names:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch generic names' });
  }
});

// PUT /api/auth/generic-names/:id
router.put('/generic-names/:id', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const updatedGenericName = await GenericName.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedGenericName) {
      return res.status(404).json({ success: false, message: 'Generic name not found' });
    }

    res.json({ success: true, data: updatedGenericName });
  } catch (error) {
    console.error('Error updating generic name:', error);
    res.status(500).json({ success: false, message: 'Failed to update generic name' });
  }
});
// -------------------------------------------------------------------------------------Medicine Type--------------------------------------------------------------------------------
const MedicineType = require('./models/MedicineType');
const Manufacturer = require("./models/Manufacturer");
const Customer = require("./models/Customer");
const Order = require("./models/order");
const Cart = require("./models/Cart");

// GET all active medicine types
app.get('/api/auth/manufacturers', async (req, res) => {
  try {
    const activeManufacturer = await Manufacturer.find({ status: 1 });
    res.json(activeManufacturer);
  } catch (error) {
    console.error('Error fetching active manufacturer:', error);
    res.status(500).json({ message: 'Failed to fetch active manufacturer' });
  }
});

// GET all active medicine types
app.get('/api/auth/medicineTypes', async (req, res) => {
  try {
    const activeMedicineTypes = await MedicineType.find({ status: 1 });
    res.json(activeMedicineTypes);
  } catch (error) {
    console.error('Error fetching active medicine types:', error);
    res.status(500).json({ message: 'Failed to fetch active medicine types' });
  }
});


// Fetch active medicine categories
app.get('/api/auth/medicineCategories', async (req, res) => {
  try {
    const activeMedicineCategories = await MedicineCategory.find({ status: 1 });
    res.json(activeMedicineCategories);
  } catch (error) {
    console.error('Error fetching active medicine categories:', error);
    res.status(500).json({ message: 'Failed to fetch active medicine categories' });
  }
});

app.get('/api/auth/manufacturer', async (req, res) => {
  try {
    const manufacturer = await Manufacturer.find();
    res.status(200).json({ success: true, data: manufacturer });
  } catch (error) {
    console.error('Error fetching medicine types:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch medicine types' });
  }
});

// PUT /api/auth/medicine-types/:id
// Update status of a medicine type by ID
app.put('/api/auth/manufacturer/:id', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const updatedManufacturer = await Manufacturer.findByIdAndUpdate(
      id,
      { status },
      { new: true }  // To return the updated document
    );

    if (!updatedManufacturer) {
      return res.status(404).json({ success: false, message: 'Manuacturer not found' });
    }

    res.json({ success: true, data: updatedManufacturer });
  } catch (error) {
    console.error('Error updating manufacturer status:', error);
    res.status(500).json({ success: false, message: 'Failed to update medicine type status' });
  }
});

app.post('/api/auth/manufacturer', async (req, res) => {
  const { manufacturer } = req.body;

  try {
    // Example: Setting status based on conditions
    const status = determineStatusForManuacturer(manufacturer); // Implement your business logic
    
    const newManufacturer = new Manufacturer({
      manufacturer,
      status,
    });

    const savedManufacturer = await newManufacturer.save();
    res.status(201).json({ success: true, data: savedManufacturer });
  } catch (error) {
    console.error('Error creating medicine type:', error);
    res.status(500).json({ success: false, message: 'Failed to create medicine type' });
  }
});

// Function to determine status based on business rules
function determineStatusForManuacturer(manufacturer) {
  // Example logic: set status based on medicineType properties or other factors
  if (manufacturer.includes('common')) {
    return 1; // Active
  } else {
    return 0; // Inactive
  }
}


// // PUT update medicine type status
// app.put('/api/auth/medicineTypes/:id', async (req, res) => {
//   const { status } = req.body;
//   const { id } = req.params;

//   try {
//     const updatedMedicineType = await MedicineType.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }  // To return the updated document
//     );

//     if (!updatedMedicineType) {
//       return res.status(404).json({ success: false, message: 'Medicine type not found' });
//     }

//     res.json({ success: true, data: updatedMedicineType });
//   } catch (error) {
//     console.error('Error updating medicine type status:', error);
//     res.status(500).json({ success: false, message: 'Failed to update medicine type status' });
//   }
// });


app.post('/api/auth/medicine-types', async (req, res) => {
  const { medicineType } = req.body;

  try {
    // Example: Setting status based on conditions
    const status = determineStatusForMedicineType(medicineType); // Implement your business logic
    
    const newMedicineType = new MedicineType({
      medicineType,
      status,
    });

    const savedMedicineType = await newMedicineType.save();
    res.status(201).json({ success: true, data: savedMedicineType });
  } catch (error) {
    console.error('Error creating medicine type:', error);
    res.status(500).json({ success: false, message: 'Failed to create medicine type' });
  }
});

// Function to determine status based on business rules
function determineStatusForMedicineType(medicineType) {
  // Example logic: set status based on medicineType properties or other factors
  if (medicineType.includes('common')) {
    return 1; // Active
  } else {
    return 0; // Inactive
  }
}

// Route to fetch all MedicineTypes
app.get('/api/auth/medicine-types', async (req, res) => {
  try {
    const medicineTypes = await MedicineType.find();
    res.status(200).json({ success: true, data: medicineTypes });
  } catch (error) {
    console.error('Error fetching medicine types:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch medicine types' });
  }
});

// PUT /api/auth/medicine-types/:id
// Update status of a medicine type by ID
app.put('/api/auth/medicine-types/:id', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const updatedMedicineType = await MedicineType.findByIdAndUpdate(
      id,
      { status },
      { new: true }  // To return the updated document
    );

    if (!updatedMedicineType) {
      return res.status(404).json({ success: false, message: 'Medicine type not found' });
    }

    res.json({ success: true, data: updatedMedicineType });
  } catch (error) {
    console.error('Error updating medicine type status:', error);
    res.status(500).json({ success: false, message: 'Failed to update medicine type status' });
  }
});

// -------------------------------------------------------------------------MedicineCategory--------------------------------------------------------------------------------------------
// POST add new medicine category
// POST /api/auth/medicine-categories
router.post('/medicine-categories', async (req, res) => {
  const { category } = req.body;

  try {
    const status = determineStatusForCategory(category); // Implement your business logic
    
    const newCategory = new MedicineCategory({
      category,
      status,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json({ success: true, data: savedCategory });
  } catch (error) {
    console.error('Error creating medicine category:', error);
    res.status(500).json({ success: false, message: 'Failed to create medicine category' });
  }
});

// Function to determine status based on business rules
function determineStatusForCategory(category) {
  // Example logic: set status based on category properties or other factors
  if (category.toLowerCase().includes('common')) {
    return 1; // Active
  } else {
    return 0; // Inactive
  }
}

// GET /api/auth/medicine-categories
router.get('/medicine-categories', async (req, res) => {
  try {
    const categories = await MedicineCategory.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching medicine categories:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch medicine categories' });
  }
});

// PUT /api/auth/medicine-categories/:id
router.put('/medicine-categories/:id', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const updatedCategory = await MedicineCategory.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: 'Medicine category not found' });
    }

    res.json({ success: true, data: updatedCategory });
  } catch (error) {
    console.error('Error updating medicine category:', error);
    res.status(500).json({ success: false, message: 'Failed to update medicine category' });
  }
});


// router.get('/medicine-data/:storeId', async (req, res) => {
//   try {
//     const storeId = req.params.storeId;
//     const medicineData = await MedicineData.find({ storeId }).populate('medicineId');
//     res.json({ success: true, data: medicineData });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });


// router.get('/medicine-data/:storeId', async (req, res) => {
//   try {
//     const storeId = req.params.storeId;
//     const medicineData = await MedicineData.find({ storeId }).populate('medicineId');
//     res.json({ success: true, data: medicineData });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });
app.get('/api/store/:id', async (req, res) => {
  try {
    const storeId = req.params.id;
    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { name } = store;
    res.json({ success: true, data: { name } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



// app.get("/", (req, res, next) => {
//   res.send("Api running");
// });

// Connecting Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

// Error Handler Middleware
app.use(errorHandler);

app.use('/api/auth', router);

app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});