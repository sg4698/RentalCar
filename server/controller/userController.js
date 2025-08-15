const User = require("../models/userModel");

const getProfile = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "UnAuthorized Access" });
    }

    // Refetch user from DB to ensure latest and controlled fields only
    const user = await User.findById(userId).select(
      "name email phoneNumber country"
    );

    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phoneNumber, country, email } = req.body;


        // 🔐 Check if email being updated
    if (email && email !== req.user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "This email is already in use. Try a different one." });
      }
    }


    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        email: email || req.user.email,
        name: name || req.user.name,
        phoneNumber: phoneNumber || req.user.phoneNumber,
        country: country || req.user.country,
      },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users (For Admin) with pagination, search, and role filter
const getAllUsers = async (req, res) => {
  try {

  
    const { page = 1, limit = 6, role, search,status } = req.query;

    const query = {
      role: { $ne: "admin" }, // ✅ Always exclude admin users
    };

    // Optional role filter (only if not "admin")
    if (role && role !== "admin") {
      query.role = role;
    }

        // Optional isActive filter
  if (status && ["active", "inactivate"].includes(status)) {
  query.status = status;
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
       .select("name email role status deactivationReason") 
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



const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, reason } = req.body;
    const adminId = req.user._id;

    if (!["active", "inactivate"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = status;

    if (status === "inactivate") {
      user.deactivationReason = reason || "No reason provided";
    } else {
      user.deactivationReason = "";
    }

    await user.save();

    res.status(200).json({
      message: `User ${status === "active" ? "activated" : "inactivate"} successfully`,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
module.exports = { getProfile, updateProfile,getAllUsers,updateUserStatus };
