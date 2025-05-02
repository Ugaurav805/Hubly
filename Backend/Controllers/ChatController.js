const Chat = require("../Models/ChatModel");

// Generate unique ticket ID
const generateTicketId = async () => {
  const todayDate = new Date().toISOString().split("T")[0].replace(/-/g, "");
  const latestTicket = await Chat.findOne({ ticketId: new RegExp(`^Ticket#${todayDate}`) })
    .sort({ ticketId: -1 });

  let counter = 1;
  if (latestTicket) {
    const match = latestTicket.ticketId.match(/\d+$/);
    counter = match ? parseInt(match[0]) + 1 : 1;
  }
  return `Ticket#${todayDate}${counter}`;
};

// Initiate Chat
const initiateChat = async (req, res) => {
  const { name, phone, email, initialMessage, timestamp } = req.body;

  try {
    const newTicketId = await generateTicketId();

    const newChat = new Chat({
      name,
      phone,
      email,
      ticketId: newTicketId,
      message: initialMessage || "New ticket created",
      timestamp: timestamp || new Date().toLocaleTimeString(),
      sender: "user",
      status: "unresolved",
    });

    await newChat.save();
    res.status(201).json({ message: "Chat initiated successfully", ticket: newChat });
  } catch (error) {
    res.status(500).json({ error: "Failed to initiate chat" });
  }
};

// Save chat message
const saveChatMessage = async (req, res) => {
  const { name, ticketId, message, timestamp, sender, phone, email } = req.body;

  try {
    const userMsg = new Chat({
      name,
      phone,
      email,
      ticketId,
      message,
      timestamp,
      sender,
      status: "unresolved",
    });

    await userMsg.save();

    const botReply = new Chat({
      name,
      phone,
      email,
      ticketId,
      message: "Thank you for your message! We'll get back to you shortly.",
      timestamp: new Date().toLocaleTimeString(),
      sender: "bot",
      status: "unresolved",
    });

    await botReply.save();
    res.status(201).json({ savedMessage: botReply });
  } catch (error) {
    res.status(500).json({ error: "Failed to save chat message" });
  }
};

// Get all chats
const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update ticket status
const updateTicketStatus = async (req, res) => {
  const { ticketId } = req.params;
  const { status } = req.body;

  try {
    const updatedTicket = await Chat.findOneAndUpdate(
      { ticketId },
      { $set: { status } },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ message: `Status updated to ${status}`, updatedTicket });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

module.exports = {
  initiateChat,
  saveChatMessage,
  getAllChats,
  updateTicketStatus,
};