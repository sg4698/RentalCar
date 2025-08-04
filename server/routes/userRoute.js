// routes/userRoutes.js
const express = require("express");
const router = express.Router();


const {getProfile, updateProfile} = require("../controller/userController");
const protect = require("../middleware/authmiddleware");

//Profile
router.get("/profile", protect(),getProfile );
router.put("/updateProfile", protect(), updateProfile);

module.exports = router;
