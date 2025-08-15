
const express = require('express');
const router = express.Router();


const protect = require('../middleware/authmiddleware');
const { approveCar, rejectCar } = require('../controller/adminCarController');

router.patch("/approve/:id", protect(["admin"]), approveCar);
// To reject a Car
router.patch("/reject/:id", protect(["admin"]), rejectCar); 

module.exports = router;