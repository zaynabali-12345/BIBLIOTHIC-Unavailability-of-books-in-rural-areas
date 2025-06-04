const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const { generateOTP, getExpiry } = require("../utils/otp");

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'optsender1234567@gmail.com', 
    pass: 'rdszhzshcxisqedk'  
  }
});

// Register with OTP
router.post("/register", async (req, res) => {
  const { username, email, password, address } = req.body;
  const otp = generateOTP();
  const otpExpires = new Date(getExpiry());

  try {
    let user = await User.findOne({ email });

    if (user && user.verified) {
      return res.status(400).json({ msg: "User already registered." });
    }

    // Hash the password only if it's a new user
    let hashedPassword = password;
    if (!user) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
      user = new User({ username, email, password: hashedPassword, address, otp, otpExpires });
    } else {
      user.otp = otp;
      user.otpExpires = otpExpires;
    }

    await user.save();

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your BookStore OTP Code",
      text: `Hello ${username},\n\nYour OTP code is: ${otp}\n\nIt will expire in 5 minutes.`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: "OTP sent to your email." });
  } catch (err) {
    res.status(500).json({ msg: "Error during registration", error: err.message });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "User not found" });
    if (user.otp !== otp || new Date() > user.otpExpires) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    user.otpverified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ msg: "User verified and registered successfully!" });
  } catch (err) {
    res.status(500).json({ msg: "Verification failed", error: err.message });
  }
});

// Token Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token required" });

  jwt.verify(token, "bookStore123", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

module.exports = {
  router,
  authenticateToken
};
