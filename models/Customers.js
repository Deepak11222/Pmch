const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AddressSchema = new mongoose.Schema({
  address1: {
    type: String,
    required: [true, "Please provide your address"],
  },
  address2: String,
  city: {
    type: String,
    required: [true, "Please provide your city"],
  },
  state: {
    type: String,
    required: [true, "Please provide your state/province/region"],
  },
  postalCode: {
    type: String,
    required: [true, "Please provide your postal/ZIP code"],
  },
  country: {
    type: String,
    required: [true, "Please provide your country"],
  },
});

const CustomerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  phone: {
    type: String,
    required: [true, "Please provide your phone number"],
  },
  address1: {
    type: String,
    required: [true, "Please provide your address"],
  },
  address2: String,
  city: {
    type: String,
    required: [true, "Please provide your city"],
  },
  state: {
    type: String,
    required: [true, "Please provide your state/province/region"],
  },
  postalCode: {
    type: String,
    required: [true, "Please provide your postal/ZIP code"],
  },
  country: {
    type: String,
    required: [true, "Please provide your country"],
  },
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  securityQuestion: {
    type: String,
    required: [true, "Please provide a security question"],
  },
  securityAnswer: {
    type: String,
    required: [true, "Please provide a security answer"],
  },
  subscribeNewsletter: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,

  // Billing address
  billingAddress: AddressSchema,

  // Shipping address
  shippingAddress: AddressSchema,
}, { timestamps: true });

// Hash password before saving
CustomerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match user entered password to hashed password in the database
CustomerSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Return JWT token
CustomerSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generate and hash password reset token
CustomerSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

  return resetToken;
};

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;