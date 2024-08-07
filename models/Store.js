const mongoose = require("mongoose"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const StoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email address"],
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
  location: {
    type: String,
    required: [true, "Please provide location"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please provide store phone number"],
  },
});

StoreSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

StoreSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

StoreSchema.methods.generateStoreAdminToken = function () {
  return jwt.sign({ store: this._id }, process.env.STORE_SECRET, {
    expiresIn: process.env.STORE_EXPIRE,
  });
};

const Store = mongoose.model("Store", StoreSchema);

module.exports = Store;