const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const ErrorResponse = require("../utils/errorResponse");
const Store = require("../models/Store");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// @desc    Login user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.loginStoreAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const store = await Store.findOne({ email }).select("+password");

    if (!store) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = await store.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendTokn(store, 200, res);
  } catch (err) {
    next(err);
  }
};


// exports.loginStoreAdmin = async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return next(new ErrorResponse("Please provide an email and password", 400));
//   }

//   try {
//     const store = await Store.findOne({ email }).select("+password");

//     if (!store) {
//       return next(new ErrorResponse("Invalid credentials", 401));
//     }
//     console.log(store.password)
//     const isMatch = await bcrypt.compare(password, store.password);

//     if (!isMatch) {
//       return next(new ErrorResponse("Invalid credentials", 401));
//     }

//     const token = jwt.sign({ id: store._id }, process.env.STORE_SECRET, {
//       expiresIn: process.env.STORE_EXPIRE,
//     });

//     res.status(200).json({ success: true, token });
//   } catch (err) {
//     next(err);
//   }
// };

// @desc    Register user
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.store = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const store = await Store.create({
      name,
      email,
      password,
    });

    sendTokn(store, 200, res);
  } catch (err) {
    next(err);
  }
};


// @desc    Forgot Password Initialization
exports.forgotPassword = async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
};



// @desc    Reset User Password
exports.resetPassword = async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token });
};

const sendTokn = (store, statusCode, res) => {
  const token = store.generateStoreAdminToken();
  res.status(statusCode).json({ sucess: true, token });
};