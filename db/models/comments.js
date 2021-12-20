const mongoose = require("mongoose");

const comments = new mongoose.Schema({
  desc: { type: String, required: true },
  isDel: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

module.exports = mongoose.model("Comments", comments);
