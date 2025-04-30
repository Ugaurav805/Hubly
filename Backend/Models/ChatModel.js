const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  ticketId: String,
  message: String,
  timestamp: String,
  sender: String,
  status: {
    type: String,
    enum: ["resolved", "unresolved"],
    default: "unresolved"
  }
}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);
