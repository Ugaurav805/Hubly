const User = require('../Models/user.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// Part of AuthController.js

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, terms } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword || terms === undefined) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists, please signin", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      terms,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully", success: true });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "Authentication failed", success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: "Authentication failed", success: false });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Signin successful",
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signin Error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: "First name, last name, and email are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    if (password && password.length >= 6) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.confirmPassword = hashedPassword;
    }

    await user.save();

    return res.status(200).json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  signup,
  signin,
  updateProfile,
};
