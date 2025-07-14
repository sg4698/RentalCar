const express = require('express');
const router = express.Router();
const {createCar, getAllCars, updateCar, deleteCar, getMyCars, approveCar, getPendingCars, rejectCar, getRejectedCars, getApprovedCars, getCarById} = require("../controller/carController")

const upload = require('../middleware/multer');
const protect = require('../middleware/authmiddleware');

router.post('/createCar',protect(["carOwner"]),upload.array('image',10) ,createCar);
router.get("/getbyId/:id", getCarById);
router.get("/my-cars", protect(["carOwner"]), getMyCars);
//  CarOwner: Update car 
router.put("/update/:id", protect(["carOwner"]), upload.array("image", 10), updateCar);
router.patch("/:id/reject", protect(["admin"]), rejectCar); 
//  CarOwner or Admin: Delete car
router.delete("/delete/:id", protect(["carOwner", "admin"]), deleteCar);
// Admin-only: Approve car
router.patch("/:id/approve", protect(["admin"]), approveCar);
router.get('/getPendingCars', protect(["admin"]),getPendingCars);
router.get('/approvedCars', protect(["admin"]), getApprovedCars);
router.get('/rejectedCars', protect(["admin"]), getRejectedCars);
//  Public: Get all approved cars
router.get('/getAllCars', getAllCars);


module.exports = router;