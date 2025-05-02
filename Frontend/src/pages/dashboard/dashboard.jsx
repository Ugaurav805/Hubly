import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";
import avatar from "../../assets/Profiles/profile 4.jpg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("All Tickets");
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get("https://hubly-ktvo.onrender.com/api/chat/all");
        setTickets(res.data);
      } catch (error) {
        toast.error("Failed to fetch tickets");
        console.error(error);
      }
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    if (activeTab === "Resolved" && ticket.status !== "resolved") return false;
    if (activeTab === "Unresolved" && ticket.status !== "unresolved") return false;
    if (searchQuery && !ticket.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const singleTicket = filteredTickets.length > 0 ? filteredTickets[0] : null;

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <h2 className="dashboard-title">Dashboard</h2>

        <div className="search-wrapper">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search for ticket"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="ticket-tabs">
          {["All Tickets", "Resolved", "Unresolved"].map((tab) => (
            <div
              key={tab}
              className={`tab-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="ticket-list">
          {singleTicket ? (
            <div className="ticket-card">
              <div className="ticket-header">
                <div className="ticket-id">
                  <span className={`dot ${singleTicket.status}`} /> Ticket #
                  {singleTicket.ticketId.replace("#ticket#", "")}
                </div>
                <div className="posted-time">
                  Posted at {singleTicket.timestamp || "N/A"}
                </div>
              </div>
              <div className="ticket-message">
                {singleTicket.message.length > 100
                  ? `${singleTicket.message.slice(0, 100)}...`
                  : singleTicket.message}
              </div>
              <div className="ticket-footer">
                <div className="user-info">
                  <img
                    src={avatar}
                    alt={singleTicket.name}
                    className="avatar"
                  />
                  <div>
                    <div>{singleTicket.name}</div>
                    <div className="contact">{singleTicket.phone}</div>
                    <div className="contact">{singleTicket.email}</div>
                  </div>
                </div>
                <button
                  className="open-ticket"
                  onClick={() =>
                    navigate(`/contact?ticketId=${singleTicket.ticketId}`)
                  }
                >
                  Open Ticket
                </button>
              </div>
            </div>
          ) : (
            <div className="no-tickets">No tickets found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
