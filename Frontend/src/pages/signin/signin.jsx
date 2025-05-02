import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../Utils/toastUtils.jsx";
import rightside from "../../assets/rightside.png";
import Hubly from "../../assets/Hubly.png";
import "./signin.css";

function Signin() {
  const [signinInfo, setSigninInfo] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSigninInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Part of Signin.jsx

  const handleSignin = async (e) => {
    e.preventDefault();
    const { email, password } = signinInfo;

    if (!email || !password) {
      return handleError("Email and password are required");
    }

    setLoading(true);
    try {
      const url = "https://hubly-ktvo.onrender.com/api/auth/signin"; // Adjust to backend URL

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      const { success, message, token, user } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token); // Store token
        localStorage.setItem("signedInUser", JSON.stringify(user)); // Store user info

        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.error("Signin error:", err);
      handleError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-logo-container">
        <img src={Hubly} alt="Hubly Logo" className="signin-cnnct-logo" />
      </div>

      <div className="signin-content">
        <div className="signin-left">
          <div className="signin-form-container">
            <h1 className="SigninH1">Sign in to your Plexify</h1>
            <form onSubmit={handleSignin}>
              <div className="input-group">
                <input
                  className="signin-input"
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="Username or email..."
                  value={signinInfo.email}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  className="signin-input"
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="Password..."
                  value={signinInfo.password}
                  required
                />
              </div>

              <button
                className="signin-button"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Log in"}
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <div>
          <span className="signinspan">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </span>
        </div>

        <div className="signin-right">
          <img
            src={rightside}
            alt="Signin Illustration"
            className="signin-image"
          />
        </div>

        <div className="recaptcha-text">
          This site is protected by reCAPTCHA and the
          <Link to="https://policies.google.com/privacy">
            {" "}
            Google Privacy Policy
          </Link>{" "}
          and
          <Link to="https://policies.google.com/terms">
            {" "}
            Terms of Service
          </Link>{" "}
          apply.
        </div>
      </div>
    </div>
  );
}

export default Signin;
