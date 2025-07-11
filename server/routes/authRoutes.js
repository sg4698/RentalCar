const express = require('express');
const { register, login, logout, authme, getCurrentUser } = require('../controller/authController');
const protect = require('../middleware/authmiddleware');
const router = express.Router();


router.post("/register",register);
router.post("/login",login);
// New: restore session on refresh
router.get("/me", protect(), getCurrentUser);
router.post("/logout",logout);
module.exports = router;