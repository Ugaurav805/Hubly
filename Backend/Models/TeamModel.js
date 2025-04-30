const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Member"],
    default: "Member",
  },
  phone: {
    type: String,
    required: true,
  },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
