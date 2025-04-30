import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import "./Contact.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Contact = () => {
  const [tickets, setTickets] = useState([]);
  const [activeTicket, setActiveTicket] = useState(null);
  const [message, setMessage] = useState("");

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const selectedTicketId = queryParams.get("ticketId");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/chat/all");
        setTickets(res.data);

        if (selectedTicketId) {
          const foundTicket = res.data.find((t) => t.ticketId === selectedTicketId);
          if (foundTicket) setActiveTicket(foundTicket);
        } else {
          setActiveTicket(res.data[0] || null);
        }
      } catch (error) {
        console.error("Failed to fetch tickets", error);
      }
    };

    fetchTickets();
  }, [selectedTicketId]);

  const handleTicketSelect = (ticket) => {
    setActiveTicket(ticket);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newChat = {
      sender: "admin",
      message: message.trim(),
      timestamp: new Date().toLocaleString(),
    };

    const updatedTicket = {
      ...activeTicket,
      chats: [...(activeTicket.chats || []), newChat],
    };

    setActiveTicket(updatedTicket);
    setTickets((prev) =>
      prev.map((t) => (t.ticketId === updatedTicket.ticketId ? updatedTicket : t))
    );
    setMessage("");
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/chat/${activeTicket._id}/status`, {
        status: newStatus,
      });

      const updatedTicket = { ...activeTicket, status: newStatus };
      setActiveTicket(updatedTicket);
      setTickets((prev) =>
        prev.map((t) => (t.ticketId === updatedTicket.ticketId ? updatedTicket : t))
      );
    } catch (error) {
      console.error("Failed to update ticket status", error);
    }
  };

  return (
    <div className="contactcenter-layout">
      <Sidebar />
      <div className="contactcenter-content">
        <div className="contactcenter-header">
          <h2>Contact Center</h2>
        </div>

        <div className="contactcenter-main">
          <div className="contactcenter-chat-list">
            <h4>Chats</h4>
            {tickets.map((ticket) => (
              <div
                key={ticket.ticketId}
                className={`contactcenter-chat-item ${
                  activeTicket?.ticketId === ticket.ticketId ? "active" : ""
                }`}
                onClick={() => handleTicketSelect(ticket)}
              >
                <div className="contactcenter-chat-name">{ticket.name}</div>
                <div className="contactcenter-chat-preview">
                  {ticket.chats?.[ticket.chats.length - 1]?.message || ticket.message || "No message"}
                </div>
              </div>
            ))}
          </div>

          <div className="contactcenter-chat-window">
            <h4>
              {activeTicket ? `Ticket# ${activeTicket.ticketId}` : "No Ticket Selected"}
            </h4>
            <div className="contactcenter-chat-thread">
              {activeTicket?.chats?.map((chat, index) => (
                <div
                  key={index}
                  className={`contactcenter-chat-message ${
                    chat.sender === "user" ? "from-user" : "from-admin"
                  }`}
                >
                  <span className="contactcenter-username">{chat.sender}</span>: {chat.message}
                  <div className="contactcenter-timestamp">{chat.timestamp}</div>
                </div>
              ))}
            </div>
            <div className="contactcenter-chat-input">
              <input
                type="text"
                placeholder="Type your reply"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>

          <div className="contactcenter-chat-details">
            <h4>Details</h4>
            {activeTicket ? (
              <>
                <p><strong>Name:</strong> {activeTicket.name}</p>
                <p><strong>Phone:</strong> {activeTicket.phone}</p>
                <p><strong>Email:</strong> {activeTicket.email}</p>
                <hr />
                <h4>Teammates</h4>
                <select>
                  <option>Joe Doe</option>
                </select>
                <h4>Ticket Status</h4>
                <select
                  value={activeTicket.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                >
                  <option value="resolved">Resolved</option>
                  <option value="unresolved">Unresolved</option>
                </select>
              </>
            ) : (
              <p>Select a ticket to view details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
