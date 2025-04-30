const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import routers
const AuthRouter = require("./Routes/AuthRouter.js");
const EventRouter = require("./Routes/EventRouter.js");
const ChatRouter = require("./Routes/ChatRouter.js");
const TeamRouter = require("./Routes/TeamRouter.js");

// Load environment variables
dotenv.config();
require("./Models/db.js"); // MongoDB connection

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API routes with /api prefix
app.use("/api/auth", AuthRouter);
app.use("/api/events", EventRouter);
app.use("/api/chat", ChatRouter);
app.use("/api/team", TeamRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
