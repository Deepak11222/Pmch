const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Store = require("../models/Store");
const DeliveryBoy = require("../models/DeliveryBoy");
const Customer = require("../models/Customer");  // Added Customer model

// Middleware to protect general user routes
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse("No user found with this id", 404));
    }

    req.user = user;

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

// Middleware to protect store admin routes
exports.protectStoreAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.STORE_SECRET);
    const store = await Store.findById(decoded.id);

    if (!store) {
      return next(new ErrorResponse("No store found with this id", 404));
    }

    req.store = store;
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

// Middleware to protect delivery boy routes
exports.protectDeliveryBoy = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const deliveryBoy = await DeliveryBoy.findById(decoded.id);

    if (!deliveryBoy) {
      return next(new ErrorResponse("No delivery boy found with this id", 404));
    }

    req.deliveryBoy = deliveryBoy;

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

// Example Middleware (protectCustomer)
// exports.protectCustomer = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     return next(new ErrorResponse("Not authorized to access this route", 401));
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.CUSTOMER_SECRET);
//     req.customer = await Customer.findById(decoded.id);

//     if (!req.customer) {
//       return next(new ErrorResponse("No customer found with this ID", 404));
//     }

//     next();
//   } catch (err) {
//     return next(new ErrorResponse("Not authorized to access this route", 401));
//   }
// };

exports.protectCustomer = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.CUSTOMER_SECRET);
    const customer = await Customer.findById(decoded.id);

    if (!customer) {
      return next(new ErrorResponse("No customer found with this id", 404));
    }

    req.customer = customer;
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};
