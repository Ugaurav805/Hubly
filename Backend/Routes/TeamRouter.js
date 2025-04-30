const express = require("express");
const TeamController = require("../Controllers/Teamcontroller.js");

const router = express.Router();

// POST route to add a new team member
router.post("/", TeamController.addTeamMember);

// GET route to fetch all team members
router.get("/", TeamController.getAllTeamMembers);

// DELETE route to remove a team member by ID
router.delete("/:id", TeamController.deleteTeamMember);

module.exports = router;
