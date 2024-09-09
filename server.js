require('dotenv').config({ path: './config.env' });
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const { protect, protectCustomer } = require('./middleware/auth');
const upload = require('./config/multer');

const path = require('path');
const cors = require("cors");

app.use(cors());

// Import Controllers
const {
  registerCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  loginCustomer
} = require('./controllers/customerController');

const {getOrders, createOrder} = require('./controllers/orderController');
const { addComment, getComments } = require('./controllers/commentController');
const { bookDoctor, getBookingsByCustomer } = require('./controllers/bookingsController');

const {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} = require('./controllers/doctorController');


const {
  addLabTest,
  getLabTestById,
  getLabTests,
  getPurchases,
  getPurchasesByCustomer,
  getPurchasesForLoggedInCustomer,
  getTestHistory,
  addToCart,
  removeFromCart,
  bookLabTest,
  bookFromCart
} = require('./controllers/LabTestController');

const { makePurchase, fetchPurchases, getAllPurchases } = require('./controllers/purchaseController');
const { getTotalSales, getTodaysSales } = require('./controllers/salesController');

// Import Specialties Routes
const specialtiesRoutes = require('./routes/specialties');

// Import Models
const User = require('./models/User');
const Customer = require('./models/Customer');
const Specialties = require('./models/Specialties');

// Connect to the database
connectDB();

// Middleware for parsing JSON
app.use(express.json());

// Customer routes
app.post('/customer/login', loginCustomer);
app.post('/customers', registerCustomer);
app.get('/customers', getCustomers);
app.get('/customers/:id', getCustomerById);
app.put('/customers/:id', updateCustomer);
app.delete('/customers/:id', deleteCustomer);

// Purchases routes
app.get('/purchases', getPurchases);
app.get('/purchases/:customerId', getPurchasesByCustomer);
app.get('/purchased', protectCustomer, getPurchasesForLoggedInCustomer);

// Lab Tests routes
app.post('/labtests/book-from-cart', protectCustomer, bookFromCart);
app.post('/cart/add', protectCustomer, addToCart);
app.post('/cart/remove', protectCustomer, removeFromCart);
app.post('/lab-tests/add', addLabTest);
app.post('/labtests/book', protectCustomer, bookLabTest);
app.get('/lab-tests', getLabTests);
app.get('/lab-tests/:id', getLabTestById);
app.post('/lab-tests/:id/book', protectCustomer, bookLabTest);
app.get('/history', getTestHistory);

// Purchase route
app.post('/purchase', protectCustomer, makePurchase); // Ensure customer is protected

// Specialties routes
app.use('/specialties', specialtiesRoutes);
app.get('/orders', getOrders);
app.post('/orders', createOrder);
app.get('/total-sales', getTotalSales);
app.get('/todays-sales', getTodaysSales);
// POST endpoint to add a comment
app.post('/comment', addComment);

// GET endpoint to fetch all comments
app.get('/comments', getComments);
app.post('/doctor', upload.single('image'), createDoctor);
app.get('/doctor', getAllDoctors);

// Route to get a doctor by ID
app.get('/doctor/:id', getDoctorById);

// Route to update a doctor
app.put('/doctor/:id', upload.single('image'), updateDoctor);

// Route to delete a doctor
app.delete('/doctor/:id', deleteDoctor);

app.post('/book-doctor', bookDoctor);
app.get('/customer/:customerId', getBookingsByCustomer);




// User registration route
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email is already in use' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = newUser.getSignedJwtToken();
    res.status(201).json({ success: true, data: newUser, token });
  } catch (error) {
    console.error('Error registering new user:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// User login route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = user.getSignedJwtToken();
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

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

// app.post('/specialties', upload.single('image'), async (req, res) => {
//   try {
//     const { title, description } = req.body;

//     // Check if image was uploaded
//     let imageUrl = '';
//     if (req.file) {
//       imageUrl = req.file.path; // Store the file path
//     }

//     // Create a new blog object
//     const newSpecialties = new Specialties({
//       title: title,
//       description: description,
//       image: req.file ? req.file.buffer.toString('base64') : null,
//     });

//     // Save the blog to the database
//     const savedSpecialties = await newSpecialties.save();

//     res.json({ success: true, message: 'Blog added successfully', specialties: savedSpecialties });
//   } catch (error) {
//     console.error('Error adding blog:', error);
//     res.status(500).json({ success: false, message: 'Failed to add blog' });
//   }
// });

// Example protected route
app.get('/api/private', protect, (req, res) => {
  res.json({ success: true, message: 'This route is protected' });
});

// Example route for customer authentication (requires customer token)
app.get('/api/customer', protectCustomer, (req, res) => {
  res.json({ success: true, message: 'This route is protected for customers' });
});

// Other routes
// app.get('/', (req, res) => {
//   res.send('API running');
// });

app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})


// Connecting Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));

// Error Handler Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

// Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});