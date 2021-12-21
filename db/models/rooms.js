const mongoose = require("mongoose");

const rooms = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  message: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Messages",
  }],
});

module.exports = mongoose.model("Rooms", rooms);