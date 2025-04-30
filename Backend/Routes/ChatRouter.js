const express = require("express");
const router = express.Router();
const {
  initiateChat,
  saveChatMessage,
  getAllChats,
  updateTicketStatus,
} = require("../Controllers/ChatController.js");

// POST /api/chat/initiate
router.post("/initiate", initiateChat);

// POST /api/chat/save
router.post("/save", saveChatMessage);

// GET /api/chat/all
router.get("/all", getAllChats);

// PUT /api/chat/status/:ticketId
router.put("/status/:ticketId", updateTicketStatus);

module.exports = router;
