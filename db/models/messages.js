const mongoose = require("mongoose");

const messages = new mongoose.Schema({
  desc: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("Messages", messages);
