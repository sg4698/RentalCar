const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String,default : ""},
    country: { type: String, default: "" },
    role: {
      type: String,
      enum: ["user", "carOwner", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactivate"],
      default: "active",
    },
    deactivationReason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
