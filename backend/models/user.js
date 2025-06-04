const mongoose = require("mongoose");
//import bcrypt from "bcryptjs";
//import crypto from 'crypto';

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    otpverified: {
        type: Boolean,
        default: false
      },
    otp: {
        type: String,
        default: null,
      },
    otpExpires: {
        type: Date,
        default: null,
      },
    address: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    favourites: [
        {
            type: mongoose.Types.ObjectId,
            ref: "books",
        },
    ],
    cart: [
        {
            type: mongoose.Types.ObjectId,
            ref: "books",
        },
    ],
    orders: [
        {
            type: mongoose.Types.ObjectId,
            ref: "order",
        },
    ],
},
  { timestamps: true }
);
  
//const User = mongoose.model("User", userSchema);
module.exports = mongoose.model("user", user);