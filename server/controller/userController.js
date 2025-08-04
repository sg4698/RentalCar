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

module.exports = { getProfile, updateProfile };
