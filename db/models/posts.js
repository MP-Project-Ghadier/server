const mongoose = require("mongoose");

const posts = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  type: { type: String, required: true },
  img: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  isDel: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
});

module.exports = mongoose.model("Post", posts);
