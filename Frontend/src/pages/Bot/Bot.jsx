import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import "./Bot.css";
import Avatar from "../../assets/avatar.png";

const Bot = () => {
  const [headerColor, setHeaderColor] = useState("#324C5B");
  const [backgroundColor, setBackgroundColor] = useState("#EEEEEE");
  const [customMessage, setCustomMessage] = useState("How can I help you?");
  const [editMode, setEditMode] = useState(false);
  const [welcomeHoverMessage, setWelcomeHoverMessage] = useState(
    "Want to chat about Hubly? I'm a chatbot here to help you find your way."
  );
  const [missedChatTimer, setMissedChatTimer] = useState({
    hours: 0,
    minutes: 10,
    seconds: 0,
  });
  const [customMessages, setCustomMessages] = useState([
    "How can I help you?",
    "Ask me anything!",
  ]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("chatbotSettings"));
    if (savedSettings) {
      setHeaderColor(savedSettings.headerColor);
      setBackgroundColor(savedSettings.backgroundColor);
      setCustomMessage(savedSettings.customMessage);
      setWelcomeHoverMessage(savedSettings.welcomeHoverMessage);
      setMissedChatTimer(savedSettings.missedChatTimer);
    }
  }, []);

  const handleEditMessage = (newMessage, index) => {
    const updatedMessages = [...customMessages];
    updatedMessages[index] = newMessage;
    setCustomMessages(updatedMessages);
  };

  const handleSaveSettings = () => {
    const settings = {
      headerColor,
      backgroundColor,
      customMessage,
      welcomeHoverMessage,
      missedChatTimer,
    };
    localStorage.setItem("chatbotSettings", JSON.stringify(settings));
    alert("Settings saved successfully!");
  };

  const handleSaveTimer = () => {
    console.log("Saved Timer:", missedChatTimer);
    alert(`Missed chat timer saved: ${missedChatTimer.hours}h ${missedChatTimer.minutes}m ${missedChatTimer.seconds}s`);
  };

  const sendMessageToBackend = async (message) => {
    try {
      const response = await fetch("http://localhost:5000/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.reply; // whatever reply your backend sends
    } catch (error) {
      if (error.message.includes("NetworkError")) {
        alert("Network error: Please check your internet connection and ensure the backend server is running on localhost:5000.");
      } else if (error.message.includes("HTTP error")) {
        alert(`Error: Unable to reach the API endpoint. Please check if the API endpoint /api /chat/send is correctly set up. Status: ${error.message}`);
      } else {
        console.error("Error sending message:", error);
        alert("Sorry, something went wrong. Please try again later.");
      }
      return "Sorry, something went wrong.";
    }
  };

  const handleSubmit = async () => {
    const message = customMessage; // or any message you want to send
    const reply = await sendMessageToBackend(message);
    console.log("Reply from backend:", reply);
    setCustomMessage(reply); // Update the custom message with the reply
  };

  return (
    <div className="bot-layout">
      <Sidebar />
      <div className="bot-content">
        <div className="Settingprofile-header">
          <h1>Chat Bot</h1>
        </div>
        <div className="bot-container">
          <div className="bot-preview">
            <div className="Botchatbot" style={{ backgroundColor }}>
              <div
                className="Botchatbot-header"
                style={{ backgroundColor: headerColor }}
              >
                <img src={Avatar} alt="Avatar" className="chatbox-avatar" />
                <span className="chatbox-title">Hubly</span>
              </div>
              <div className="Botchatbot-messages">
                <div className="bot-message">{customMessage}</div>
                <div className="Botuser-message">Ask me anything!</div>
              </div>
              <div className="Botchatbot-form">
                <p>Introduction Form</p>
                <input type="text" placeholder="Your name" />
                <input type="text" placeholder="+1 (000) 000-0000" />
                <input type="email" placeholder="example@gmail.com" />
                <button className="Botsubmit-button" onClick={handleSubmit}>
                  Thank You!
                </button>
              </div>
            </div>
            <div className="Bothover-message">
              <p>💬 {welcomeHoverMessage}</p>
            </div>
          </div>

          <div className="bot-settings">
            {/* Header Color */}
            <div className="Botsettings-section">
              <h3>Header Color</h3>
              <div className="color-options">
                <div
                  className="color-circle"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "0.8px solid rgba(0, 0, 0, 0.18)",
                  }}
                  onClick={() => setHeaderColor("#FFFFFF")}
                ></div>
                <div
                  className="color-circle"
                  style={{ backgroundColor: "#000000" }}
                  onClick={() => setHeaderColor("#000000")}
                ></div>
                <div
                  className="color-circle"
                  style={{
                    backgroundColor: "#33475B",
                    border: "1px solid rgba(0, 0, 0, 0.18)",
                  }}
                  onClick={() => setHeaderColor("#33475B")}
                ></div>
              </div>

              <div className="color-picker-display">
                <div
                  className="color-box"
                  style={{ backgroundColor: headerColor }}
                ></div>
                <div className="color-code">{headerColor}</div>
              </div>
            </div>

            {/* Background Color */}
            <div className="Botsettings-section">
              <h3>Custom Background Color</h3>
              <div className="color-options">
                <div
                  className="color-circle"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(0, 0, 0, 0.2)",
                  }}
                  onClick={() => setBackgroundColor("#FFFFFF")}
                ></div>
                <div
                  className="color-circle"
                  style={{ backgroundColor: "#000000" }}
                  onClick={() => setBackgroundColor("#000000")}
                ></div>
                <div
                  className="color-circle"
                  style={{
                    backgroundColor: "#EEEEEE",
                    border: "1px solid rgba(0, 0, 0, 0.2)",
                  }}
                  onClick={() => setBackgroundColor("#EEEEEE")}
                ></div>
              </div>

              <div className="color-picker-display">
                <div
                  className="color-box"
                  style={{ backgroundColor: backgroundColor }}
                ></div>
                <div className="color-code">{backgroundColor}</div>
              </div>
            </div>

            {/* Custom Message */}
            <div className="Botsettings-section">
              <h3>Customize Message</h3>
              <div className="message-list">
                {customMessages.map((message, index) => (
                  <div key={index} className="message-item">
 {editIndex === index ? (
                      <input
                        type="text"
                        value={message}
                        onChange={(e) =>
                          handleEditMessage(e.target.value, index)
                        }
                        onBlur={() => setEditIndex(null)}
                        autoFocus
                      />
                    ) : (
                      <>
                        <span>{message}</span>
                        <svg
                          onClick={() => setEditIndex(index)}
                          className="edit-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          height="20"
                          viewBox="0 0 24 24"
                          width="20"
                          fill="#000000"
                        >
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Welcome Hover Message */}
            <div className="Botsettings-section">
              <h3>Welcome Message</h3>
              <div className="welcome-message-container">
                {editMode ? (
                  <textarea
                    className="welcome-textarea"
                    value={welcomeHoverMessage}
                    onChange={(e) => {
                      if (e.target.value.length <= 50) {
                        setWelcomeHoverMessage(e.target.value);
                      }
                    }}
                    onBlur={() => setEditMode(false)}
                    autoFocus
                  />
                ) : (
                  <div className="welcome-message-display">
                    <span>{welcomeHoverMessage}</span>
                    <img
                      src="https://img.icons8.com/material-rounded/24/000000/edit.png"
                      alt="Edit"
                      onClick={() => setEditMode(true)}
                      className="edit-icon"
                    />
                  </div>
                )}
                <div className="character-count">
                  {welcomeHoverMessage.length}/50
                </div>
              </div>
            </div>

            {/* Missed Chat Timer */}
            <div className="Botsettings-section">
              <h3>Missed Chat Timer</h3>
              <div className="time-picker">
                <div className="time-column">
                  <select
                    value={missedChatTimer.hours}
                    onChange={(e) =>
                      setMissedChatTimer({
                        ...missedChatTimer,
                        hours: parseInt(e.target.value) || 0,
                      })
                    }
                  >
                    {[...Array(13).keys()].map((h) => (
                      <option key={h} value={h}>
                        {h.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>

                <span className="colon">:</span>

                <div className="time-column">
                  <select
                    value={missedChatTimer.minutes}
                    onChange={(e) =>
                      setMissedChatTimer({
                        ...missedChatTimer,
                        minutes: parseInt(e.target.value) || 0,
                      })
                    }
                  >
                    {[...Array(60).keys()].map((m) => (
                      <option key={m} value={m}>
                        {m.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>

                <span className="colon">:</span>

                <div className="time-column">
                  <select
                    value={missedChatTimer.seconds}
                    onChange={(e) =>
                      setMissedChatTimer({
                        ...missedChatTimer,
                        seconds: parseInt(e.target.value) || 0,
                      })
                    }
                  >
                    {[...Array(60).keys()].map((s) => (
                      <option key={s} value={s}>
                        {s.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="save-button" onClick={handleSaveTimer}>
                Save
              </button>
            </div>

            <button className="Botsave-button" onClick={handleSaveSettings}>
              Save
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Bot;