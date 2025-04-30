const Chat = require("../Models/ChatModel");

// Initiate chat
const initiateChat = async (req, res) => {
  const { name, phone, email, ticketId, initialMessage, timestamp } = req.body;

  try {
    const messagesToSave = [];

    if (initialMessage) {
      messagesToSave.push(
        new Chat({
          name,
          phone,
          email,
          ticketId,
          message: initialMessage,
          timestamp: timestamp || new Date().toLocaleTimeString(),
          sender: "user",
          status: "unresolved",
        })
      );
    }

    await Chat.insertMany(messagesToSave);

    res.status(201).json({
      message: "Chat initiated successfully",
      savedMessages: messagesToSave,
    });
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
    await Chat.updateMany({ ticketId }, { $set: { status } });
    res.status(200).json({ message: `Ticket status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ message: "Failed to update ticket status" });
  }
};

module.exports = {
  initiateChat,
  saveChatMessage,
  getAllChats,
  updateTicketStatus,
};
