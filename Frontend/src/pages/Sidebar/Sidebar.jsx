import React from "react";
import "./Sidebar.css";
import Profile from "../../assets/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCommentDots,
  faChartBar,
  faRobot,
  faUsers,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: faHome, path: "/dashboard" },
  { name: "Contact Center", icon: faCommentDots, path: "/contact" },
  { name: "Analytics", icon: faChartBar, path: "/analytics" },
  { name: "Bot", icon: faRobot, path: "/bot" },
  { name: "Team", icon: faUsers, path: "/team" },
  { name: "Settings", icon: faGear, path: "/settings" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path
            fill="currentColor"
            d="M8.5 3a4 4 0 0 0-3.8 2.745a.5.5 0 1 1-.949-.313a5.002 5.002 0 0 1 9.654.595A3 3 0 0 1 13 12H4.5a.5.5 0 0 1 0-1H13a2 2 0 0 0 .001-4h-.026a.5.5 0 0 1-.5-.445A4 4 0 0 0 8.5 3M0 7.5A.5.5 0 0 1 .5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m2 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-2 4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"
          />
        </svg>
      </div>

      <div className="sidebar-menu">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={index}
              className={`sidebar-item ${isActive ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <FontAwesomeIcon icon={item.icon} className="icon" />
              {isActive && <span className="label">{item.name}</span>}
            </div>
          );
        })}
      </div>

      <div className="sidebar-profile">
        <div className="profile-container">
          <img src={Profile} alt="Profile" className="profile-pic" />
          <span className="online-dot"></span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;