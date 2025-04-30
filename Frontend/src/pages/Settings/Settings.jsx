import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { FiInfo } from "react-icons/fi";
import "./settings.css";

const Setting = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("signedInUser"));
    if (storedUser) {
      setUserData({
        firstName: storedUser.firstName || "",
        lastName: storedUser.lastName || "",
        email: storedUser.email || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail(userData.email)) {
      setErrorMessage("Enter a valid email.");
      return;
    }

    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }
      if (newPassword.length < 6) {
        setErrorMessage("Password must be at least 6 characters.");
        return;
      }
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("You are not authenticated. Please sign in again.");
        return;
      }

      const response = await fetch("http://localhost:5000/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...userData,
          password: newPassword || undefined, 
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setErrorMessage(result.message || "Failed to update profile.");
        return;
      }

      // Save updated user data in localStorage
      localStorage.setItem("signedInUser", JSON.stringify(result.user));

      setSuccessMessage("Profile updated successfully! Redirecting to Signin...");

      // Clear session if email or password changed
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");

      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="Setting-layout">
      <Sidebar />
      <div className="Setting-content">
        <div className="Settingprofile-header">
          <h1>Settings</h1>
        </div>

        <div className="Settingprofile-container">
          {successMessage && <div className="Settingsuccess-message">{successMessage}</div>}
          {errorMessage && <div className="Settingerror-message">{errorMessage}</div>}

          <div className="Settingprofile-form-container">
            <div className="Settingedit-header">
              <h2 className="Settingedit-profile">Edit Profile</h2>
              <div className="Settingedit-underline">
                <div className="Settingblue-line"></div>
                <div className="Settinggray-line"></div>
              </div>
            </div>

            <form className="Settingprofile-form" onSubmit={handleUpdate}>
              <label>First name</label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
              />

              <label>Last name</label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
              />

              <label>Email</label>
              <div className="input-with-icon">
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
                <span className="tooltip-wrapper">
                  <FiInfo className="info-icon" />
                  <span className="tooltip-text">
                    Used for login and communication
                  </span>
                </span>
              </div>

              <label>New Password</label>
              <div className="input-with-icon">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <span className="tooltip-wrapper">
                  <FiInfo className="info-icon" />
                  <span className="tooltip-text">Minimum 6 characters</span>
                </span>
              </div>

              <label>Confirm New Password</label>
              <div className="input-with-icon">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className="tooltip-wrapper">
                  <FiInfo className="info-icon" />
                  <span className="tooltip-text">Re-enter your password</span>
                </span>
              </div>

              <button className="Settingsave-btn" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
