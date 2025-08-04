const express = require('express');
const { register, login, logout, getCurrentUser, getAllUsers, updateUserStatus } = require('../controller/authController');
const protect = require('../middleware/authmiddleware');
const router = express.Router();


router.post("/register",register);
router.post("/login",login);
// New: restore session on refresh
router.get("/me", protect(), getCurrentUser);
router.post("/logout",logout);
router.get("/users", protect(["admin"]), getAllUsers);
router.patch("/status/:userId", protect(['admin']), updateUserStatus);
module.exports = router;