const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



// Register - for user & carOwner
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!["user", "carOwner"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Admin Login
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      return res.status(200).json({
        message: "Admin login successful",
        role: "admin",
        email,
        
      });
    }

    // For user or CarOwner
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User is not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      message: "Login successful",
      role: user.role,
      email: user.email,
      name : user.name
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  
  res.status(200).json({
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// Get all users (For Admin) with pagination, search, and role filter
// Get all users (For Admin) with pagination, search, and role filter (excluding admins)
const getAllUsers = async (req, res) => {
  try {
    // Only allow admin to access
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { page = 1, limit = 6, role, search } = req.query;

    const query = {
      role: { $ne: "admin" }, // ✅ Always exclude admin users
    };

    // Optional role filter (only if not "admin")
    if (role && role !== "admin") {
      query.role = role;
    }

    // Optional search filter (name or email)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const totalUsers = await User.countDocuments(query);

    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select("-password") // Do not return passwords
      .sort({ createdAt: -1 }); // Latest first

    res.status(200).json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: Number(page),
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { register, login, logout ,getCurrentUser,getAllUsers};



