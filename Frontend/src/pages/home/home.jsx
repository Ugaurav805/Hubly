import React from "react";
import "./home.css";
import { Link, useNavigate } from "react-router-dom";
import Hubly from "../../assets/Hubly.png";
import MainImage from "../../assets/MainImage.png";
import Brandimage from "../../assets/Brandlogo.png";
import CoreImage from "../../assets/Image2.png";
import Finalimage from "../../assets/final div.png";
import MainImage1 from "../../assets/MainImage1.png";
import MainImage2 from "../../assets/MainImage2.png";
import Chatbot from "../Chatbot/Chatbot.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCirclePlay } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="homenavbar">
      <div className="homelogo">
        <img src={Hubly} alt="Hubly logo" />
      </div>
      <div className="homebuttons">
        <button className="Login1Button" onClick={() => navigate("/signin")}>
          Login
        </button>
        <button className="Signup1Button" onClick={() => navigate("/signup")}>
          Signup
        </button>
      </div>
    </nav>
  );
};

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Navbar />
      <Chatbot />
      <div className="Homecontainer">
        <div className="Hometext-section">
          <h1>Grow Your Business Faster with Hubly CRM</h1>
          <p>
            Manage leads, automate workflows, and close deals effortlessly—all
            in one powerful platform.
          </p>
          <div className="Homebuttons">
            <button
              className="Homeget-started"
              onClick={() => navigate("/signin")}
            >
              Get started{" "}
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ color: "#f5f5f5" }}
              />
            </button>
            <button className="Homewatch-video">
              <span>
                <FontAwesomeIcon icon={faCirclePlay} />
              </span>{" "}
              Watch Video
            </button>
          </div>
        </div>
        <div className="HomeMainImage">
          <img src={MainImage} alt="HomeMainImage" className="HomeMainImageqwe" />
          <img src={MainImage1} alt="HomeMainImage1" className="HomeMainImageqwe1" />
          <img src={MainImage2} alt="HomeMainImage2" className="HomeMainImageqwe2" />
        </div>
      </div>
      <div className="HomeBrand section">
        <img src={Brandimage} alt="Brandimage" className="HomeBrandimage" />
      </div>
      <br />
      <div className="Homecore-image">
        <img src={CoreImage} alt="CoreImage" className="HomeCoreImage" />
      </div>
      <div className="Homepricing-section">
        <h1 className="Homepricing-title">We have plans for everyone!</h1>
        <p className="Homepricing-subtext">
          We started with a strong foundation, then simply built all of the
          sales and marketing tools ALL businesses need under one platform.
        </p>

        <div className="Homepricing-cards">
          <div className="Homepricing-card">
            <h2>STARTER</h2>
            <p>
              Best for local businesses needing to improve their online
              reputation.
            </p>
            <h3>
              $199 <span>/monthly</span>
            </h3>
            <h4>What’s included</h4>
            <ul>
              <li>✅ Unlimited Users</li>
              <li>✅ GMB Messaging</li>
              <li>✅ Reputation Management</li>
              <li>✅ GMB Call Tracking</li>
              <li>✅ 24/7 Award Winning Support</li>
            </ul>
            <button
              className="Homepricing-button"
              onClick={() => navigate("/signup")}
            >
              SIGN UP FOR STARTER
            </button>
          </div>

          <div className="Homepricing-card">
            <h2>GROW</h2>
            <p>
              Best for businesses that want to take full control of marketing
              automation and track leads.
            </p>
            <h3>
              $399 <span>/monthly</span>
            </h3>
            <h4>What’s included</h4>
            <ul>
              <li>✅ Pipeline Management</li>
              <li>✅ Marketing Automation Campaigns</li>
              <li>✅ Live Call Transfer</li>
              <li>✅ GMB Messaging</li>
              <li>✅ Embed-able Form Builder</li>
              <li>✅ Reputation Management</li>
              <li>✅ 24/7 Award Winning Support</li>
            </ul>
            <button
              className="Homepricing-button"
              onClick={() => navigate("/signup")}
            >
              SIGN UP FOR GROW
            </button>
          </div>
        </div>
      </div>
      <div className="Homefinalimage">
        <img src={Finalimage} alt="finalImage" className="HomefinalImage" />
        <img src={Hubly} alt="Hubly logo" className="Homelastlogo" />
      </div>
    </div>
  );
}

export default HomePage;