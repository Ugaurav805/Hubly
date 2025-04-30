import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";
import avatar from "../../assets/Profiles/profile 4.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  // Fetch tickets from backend
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/chat/all"); // Adjust API route if needed
        setTickets(res.data);
      } catch (error) {
        toast.error("Failed to fetch tickets");
        console.error(error);
      }
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    if (activeTab === "resolved") return ticket.status === "resolved";
    if (activeTab === "unresolved") return ticket.status === "unresolved";
    return true;
  });

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <h2 className="dashboard-title">Dashboard</h2>

        <div className="ticket-tabs">
          {["all", "resolved", "unresolved"].map((tab) => (
            <div
              key={tab}
              className={`tab-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </div>
          ))}
        </div>

        <div className="ticket-list">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <div key={ticket._id} className="ticket-card">
                <div className="ticket-header">
                  <div className="ticket-id">
                    <span className={`dot ${ticket.status}`} /> Ticket# {ticket.ticketId}
                  </div>
                  <div className="posted-time">Posted at {ticket.timestamp || "N/A"}</div>
                </div>
                <div className="ticket-message">
                  {ticket.message.length > 100
                    ? `${ticket.message.slice(0, 100)}...`
                    : ticket.message}
                </div>
                <div className="ticket-footer">
                  <div className="user-info">
                    <img src={avatar} alt={ticket.name} className="avatar" />
                    <div>
                      <div>{ticket.name}</div>
                      <div className="contact">{ticket.phone}</div>
                      <div className="contact">{ticket.email}</div>
                    </div>
                  </div>
                  <button
                    className="open-ticket"
                    onClick={() => navigate(`/contact?ticketId=${ticket.ticketId}`)}
                  >
                    Open Ticket
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-tickets">No tickets found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
