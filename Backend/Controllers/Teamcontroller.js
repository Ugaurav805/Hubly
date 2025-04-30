const Team = require("../Models/TeamModel.js");

// Add a new team member
exports.addTeamMember = async (req, res) => {
  const { name, email, role, phone } = req.body;
  try {
    const newTeamMember = new Team({ name, email, role, phone });
    await newTeamMember.save();
    res.status(201).json(newTeamMember);
  } catch (error) {
    console.error("Error saving member:", error);
    res.status(500).json({ message: "Error saving member", error });
  }
};

// Get all team members
exports.getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.find();
    res.status(200).json(teamMembers);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ message: "Error fetching members", error });
  }
};

// Delete a team member by ID
exports.deleteTeamMember = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMember = await Team.findByIdAndDelete(id);
    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json({ message: "Member deleted" });
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({ message: "Error deleting member", error });
  }
};
