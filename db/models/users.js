const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const users = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isDel: { type: Boolean, default: false },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  resetCode: { type: Number },
  avatar: {
    type: String,
    default:
      "https://i.pinimg.com/564x/9e/81/da/9e81da69381d9920b0f1a264ce5d0879.jpg",
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roles",
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rooms",
    },
  ],
});

users.methods.generateVerificationToken = function () {
  const user = this;
  const verificationToken = jwt.sign(
    { ID: user._id },
    process.env.USER_VERIFICATION_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return verificationToken;
};

module.exports = mongoose.model("Users", users);
