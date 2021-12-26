const mongoose = require("mongoose");

const users = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isDel: { type: Boolean, default: false },
  key: { type: Number },
  confirmed: { type: Boolean, default: false },
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

module.exports = mongoose.model("Users", users);
