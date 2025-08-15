// routes/userRoutes.js
const express = require("express");
const router = express.Router();


const {getProfile, updateProfile, getAllUsers, updateUserStatus} = require("../controller/userController");
const protect = require("../middleware/authmiddleware");


//Profile
router.get("/profile", protect(),getProfile );
router.put("/updateProfile", protect(), updateProfile);

router.get("/getusers", protect(["admin"]), getAllUsers);
router.patch("/status/:userId", protect(['admin']), updateUserStatus);

module.exports = router;
