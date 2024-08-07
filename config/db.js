const mongoose = require("mongoose");
// const GenericName = require('../models/GenericName');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error in mongoose connection",error)
  }
};



module.exports = connectDB;
