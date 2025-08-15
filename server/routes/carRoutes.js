const express = require('express');
const router = express.Router();
const {createCar, getAllCars, updateCar, deleteCar, getMyCars, getPendingCars, getRejectedCars, getApprovedCars, getCarById} = require("../controller/carController")

const upload = require('../middleware/multer');
const protect = require('../middleware/authmiddleware');

// Car Owner
router.post('/createCar',protect(["carOwner"]),upload.array('image',10) ,createCar);
router.get("/getbyId/:id", getCarById);
router.get("/my-cars", protect(["carOwner"]), getMyCars);
//  CarOwner: Update car 
router.put("/update/:id", protect(["carOwner"]), upload.array("image", 10), updateCar);

//  CarOwner or Admin: Delete car
router.delete("/delete/:id", protect(["carOwner", "admin"]), deleteCar);

// Fetch Pending Cars
router.get('/getPendingCars', protect(["admin"]),getPendingCars);
//To Fetch a Aprroval Car
router.get('/approvedCars', protect(["admin"]), getApprovedCars);
// To fetch rejected Cars
router.get('/rejectedCars', protect(["admin"]), getRejectedCars);
//  Public: Get all approved cars
router.get('/getAllCars', getAllCars);


module.exports = router;