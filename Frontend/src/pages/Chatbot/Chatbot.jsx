import React, { useState, useEffect } from "react";
import "./Chatbot.css";
import Icon from "../../assets/msgbutto.png";
import Avatar from "../../assets/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Chatbot = () => {
  const [showChat, setShowChat] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [ticketId, setTicketId] = useState("");
  const [initialMessageSent, setInitialMessageSent] = useState(false);

  useEffect(() => {
    const savedChat = JSON.parse(localStorage.getItem("hubly_chat")) || [];
    const savedTicket = localStorage.getItem("hubly_ticketId");
    const savedInitial = localStorage.getItem("hubly_initialMessageSent");

    if (savedChat.length) {
      setChat(savedChat);
      setFormSubmitted(true);
    }
    if (savedTicket) setTicketId(savedTicket);
    if (savedInitial === "true") setInitialMessageSent(true);
  }, []);

  const handleInitialMessageSend = () => {
    if (!message.trim()) return;

    const userMsg = {
      sender: "user",
      text: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    const updatedChat = [userMsg];
    setChat(updatedChat);
    setInitialMessageSent(true);
    setMessage("");

    localStorage.setItem("hubly_chat", JSON.stringify(updatedChat));
    localStorage.setItem("hubly_initialMessageSent", "true");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    const newTicketId = `#ticket#${today}`;
    setTicketId(newTicketId);
    setFormSubmitted(true);

    const initialMessage = chat.length ? chat[0] : null;

    localStorage.setItem("hubly_chat", JSON.stringify(chat));
    localStorage.setItem("hubly_ticketId", newTicketId);

    try {
      await axios.post("http://localhost:5000/api/chat/initiate", {
        ...formData,
        ticketId: newTicketId,
        initialMessage: initialMessage?.text || "",
        timestamp: initialMessage?.timestamp || "",
      });
    } catch (error) {
      console.error("Error initiating chat:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = {
      sender: "user",
      text: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    const updatedChat = [...chat, userMsg];
    setChat(updatedChat);
    setMessage("");
    localStorage.setItem("hubly_chat", JSON.stringify(updatedChat));

    try {
      const res = await axios.post("http://localhost:5000/api/chat/save", {
        name: formData.name,
        message,
        ticketId,
        timestamp: userMsg.timestamp,
        sender: "user",
      });

      if (res.data?.savedMessage) {
        const botMsg = {
          sender: "bot",
          text: res.data.savedMessage.message,
          timestamp: res.data.savedMessage.timestamp,
        };
        const chatWithBot = [...updatedChat, botMsg];
        setChat(chatWithBot);
        localStorage.setItem("hubly_chat", JSON.stringify(chatWithBot));
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleResetChat = () => {
    setChat([]);
    setTicketId("");
    setFormData({ name: "", phone: "", email: "" });
    setMessage("");
    setInitialMessageSent(false);
    setFormSubmitted(false);
    localStorage.removeItem("hubly_chat");
    localStorage.removeItem("hubly_ticketId");
    localStorage.removeItem("hubly_initialMessageSent");
  };

  return (
    <div className="chatbot-container">
      {showChat && (
        <div className="chatbox">
          <div className="chatbox-header">
            <img src={Avatar} alt="Avatar" className="chatbox-avatar" />
            <span className="chatbox-title">Hubly</span>
            <span className="chatbox-close" onClick={() => setShowChat(false)}>×</span>
          </div>

          <div className="chatbox-body">
            {!initialMessageSent ? (
              <div className="chatbox-initial">
                <input
                  type="text"
                  placeholder="Write a message"
                  className="chatbox-input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleInitialMessageSend()}
                />
                <button className="chatbox-send" onClick={handleInitialMessageSend}>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            ) : !formSubmitted ? (
              <form className="chatbox-form" onSubmit={handleFormSubmit}>
                <h4>Introduce Yourself</h4>
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label>Your Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <label>Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <button type="submit">Thank You!</button>
              </form>
            ) : (
              <div className="chatbox-messages">
                {chat.map((msg, idx) => (
                  <div key={idx} className={`message ${msg.sender}`}>
                    <div className="text">{msg.text}</div>
                    <div className="timestamp">{msg.timestamp}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {formSubmitted && (
            <div className="chatbox-footer">
              <input
                type="text"
                placeholder="Write a message"
                className="chatbox-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button className="chatbox-send" onClick={handleSend}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
              <button className="chatbox-reset" onClick={handleResetChat}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          )}
        </div>
      )}

      <div className="chat-icon" onClick={() => setShowChat(!showChat)}>
        <img src={Icon} alt="Chat Icon" />
      </div>
    </div>
  );
};

export default Chatbot;
