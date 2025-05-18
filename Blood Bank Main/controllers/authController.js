const userModel = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// =================== REGISTER ===================
const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Basic validation
    if (!email || !password || !role) {
      return res.status(400).send({
        success: false,
        message: "Please provide email, password, and role",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new userModel({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error: error.message,
    });
  }
};

// =================== LOGIN ===================
const loginController = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).send({
        success: false,
        message: "Please provide email, password, and role",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (user.role !== role) {
      return res.status(400).send({
        success: false,
        message: "Role doesn't match",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error: error.message,
    });
  }
};

// =================== CURRENT USER ===================
const currentUserController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Current User Error:", error);
    return res.status(500).send({
      success: false,
      message: "Error in getting current user",
      error: error.message,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  currentUserController,
};
