import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../Utils/toastUtils.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css";
import rightside from "../../assets/rightside.png";
import Hubly from "../../assets/Hubly.png";

function SignUp() {
  const [signupInfo, setSignupInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupInfo((prevInfo) => ({
      ...prevInfo,
      [name]:
        name === "email"
          ? value.trim().toLowerCase()
          : type === "checkbox"
          ? checked
          : value.trim(),
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
      general: undefined,
    }));
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidName = (name) =>
    /^[a-zA-Z]+$/.test(name);

  const isValidPassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);

  const validateInputs = () => {
    const { firstName, lastName, email, password, confirmPassword, terms } = signupInfo;
    const newErrors = {};

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      newErrors.general = "Please fill in all fields.";
    }

    if (!isValidName(firstName)) newErrors.firstName = "Only alphabets allowed.";
    if (!isValidName(lastName)) newErrors.lastName = "Only alphabets allowed.";
    if (!isValidEmail(email)) newErrors.email = "Invalid email format.";
    if (!isValidPassword(password))
      newErrors.password = "Must include uppercase, number, and special character.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    if (!terms) newErrors.general = "Accept the terms and conditions.";

    return newErrors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const newErrors = validateInputs();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const url = "http://localhost:5000/api/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error, userId } = result;

      if (success) {
        handleSuccess(message);
        const { firstName, lastName, email } = signupInfo;
        localStorage.setItem(
          "signedInUser",
          JSON.stringify({ userId, firstName, lastName, email })
        );

        setSignupInfo({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        });

        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        handleError(error?.details?.[0]?.message || message || "Something went wrong");
      }
    } catch (err) {
      handleError(err.message || "Server error, please try again later.");
    }
  };

  return (
    <div className="sigup-container">
      <div className="signup-logo">
        <img src={Hubly} alt="Hubly Logo" className="signup-cnnct-logo" />
      </div>
      <div className="signup-container">
        <span className="signup-link">
          <h1 className="signup-h1">Create an account</h1>
          <Link to="/signin">Sign in instead</Link>
        </span>
        <form onSubmit={handleSignUp}>
          {errors.general && <p className="signup-error">{errors.general}</p>}

          {["firstName", "lastName", "email", "password", "confirmPassword"].map((id) => (
            <div className="signup-form-group" key={id}>
              <label htmlFor={id}>{id.replace(/([A-Z])/g, " $1")}</label>
              <input
                type={id.includes("password") ? "password" : id === "email" ? "email" : "text"}
                id={id}
                name={id}
                onChange={handleChange}
                value={signupInfo[id]}
              />
              {errors[id] && <p className="signup-error">{errors[id]}</p>}
            </div>
          ))}

          <div className="signup-form-group1">
            <label htmlFor="terms" className="checkbox-container">
              <input
                className="checkboxflex"
                type="checkbox"
                id="terms"
                name="terms"
                onChange={handleChange}
                checked={signupInfo.terms}
              />
              <span className="checkbox-label">
                By creating an account, I agree to the
                <Link to="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer"> Terms of Use </Link>
                and
                <Link to="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"> Privacy Policy</Link>
              </span>
            </label>
          </div>

          <button className="signup-button" type="submit">Create an account</button>
        </form>
        <ToastContainer />
      </div>
      <div className="signup-right">
        <img src={rightside} alt="Signup Illustration" className="signin-image" />
      </div>
      <div className="recaptcha-text">
        This site is protected by reCAPTCHA and the
        <Link to="https://policies.google.com/privacy"> Google Privacy Policy </Link> and
        <Link to="https://policies.google.com/terms"> Terms of Service</Link> apply.
      </div>
    </div>
  );
}

export default SignUp;
