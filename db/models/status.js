const mongoose = require("mongoose");

const status = new mongoose.Schema({
    //approved - pending - rejected
  status: { type: String, required: true, unique: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Status", status);
