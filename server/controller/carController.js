const Car = require("../models/carModel");
const uploadToCloudinary = require("../middleware/cloudinary");
const cloudinary = require("cloudinary").v2;

// Create Car
const createCar = async (req, res) => {
  try {
    const {
      car_name,
      brand,
      registrationNumber,
      color,
      type,
      seats,
      fuelType,
      transmission,
      mileage,
      rentalPricePerDay,
      location,
    } = req.body;

    // Validation for required fields
    if (
      !car_name || !brand || !registrationNumber || !color || !type ||
      !seats || !fuelType || !transmission || !mileage || !rentalPricePerDay || !location
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validation for Image
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    // Upload the image to Cloudinary
    const uploadResults = await Promise.all(
      req.files.map(file => uploadToCloudinary(file.buffer))
    );

    // Save only the first image
    const image = {
      public_id: uploadResults[0].public_id,
      url: uploadResults[0].url,
    };

    const newCar = new Car({
      ownerId: req.user?.id || null,
      car_name,
      brand,
      registrationNumber,
      color,
      type,
      seats,
      fuelType,
      transmission,
      mileage,
      rentalPricePerDay,
      location,
      image,
      status: "pending", // Default status
      availability: "available" // Default availability
    });

    await newCar.save();

    res.status(201).json({
      message: "Car created successfully",
      car: newCar,
    });
  } catch (error) {
    console.log("Error creating car:", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};



const getAllCars = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    if (req.query.brand) filter.brand = req.query.brand;
    if (req.query.status) filter.status = req.query.status;

    // Role-based filtering: only show approved cars to public users
    if (!req.user || req.user.role === "user") {
      filter.status = "approved";
    }
    // Admins get all cars regardless of status, so no additional filter

    const total = await Car.countDocuments(filter);

    const cars = await Car.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("ownerId", "name email"); // optional: populate owner info

    res.status(200).json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      cars,
    });
  } catch (error) {
    console.error("Error fetching cars:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};




// For CarOwner
const getMyCars = async (req, res) => {
  try {
    const cars = await Car.find({ ownerId: req.user.id });
    res.status(200).json({ success: true, cars });
  } catch (error) {
    console.error("Error fetching owner's cars:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Car by ID
const getCarById = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findById(id)
      .select("car_name brand registrationNumber color type seats fuelType transmission mileage rentalPricePerDay location image ownerId")
      .populate("ownerId", "name email");

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ car });
  } catch (error) {
    console.error("Error fetching car:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Update Car
const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    let car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // If new image is uploaded, replace with old one
    if (req.files && req.files.length > 0) {
      if (car.image && car.image.public_id) {
        await cloudinary.uploader.destroy(car.image.public_id);
      }

      const uploadResults = await Promise.all(
        req.files.map(file => uploadToCloudinary(file.buffer))
      );

      car.image = {
        public_id: uploadResults[0].public_id,
        url: uploadResults[0].url,
      };
    }

    // Update Other Fields
    const fields = [
      "car_name", "brand", "registrationNumber", "color", "type",
      "seats", "fuelType", "transmission", "mileage", "rentalPricePerDay", "location", "availability"
    ];

    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        car[field] = req.body[field];
      }
    });

    await car.save();

    res.status(200).json({ message: "Car updated successfully", car });
  } catch (error) {
    console.error("Error updating car:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    await Car.findByIdAndDelete(id);
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error.message);
    res.status(500).json({ error: error.message });
  }
};



// Admin: Get Pending Cars
const getPendingCars = async (req, res) => {
  try {
    const pendingCars = await Car.find({ status: "pending" })
      .populate("ownerId", "name email");

    res.status(200).json({ cars: pendingCars });
  } catch (error) {
    console.error("Error fetching pending cars:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Admin: Get Approved Cars
const getApprovedCars = async (req, res) => {
  try {
    const approvedCars = await Car.find({ status: "approved" })
      .populate("ownerId", "name email");

    res.status(200).json({ cars: approvedCars });
  } catch (error) {
    console.error("Error fetching approved cars:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Admin: Get Rejected Cars
const getRejectedCars = async (req, res) => {
  try {
    const rejectedCars = await Car.find({ status: "rejected" })
      .populate("ownerId", "name email");

    res.status(200).json({ cars: rejectedCars });
  } catch (error) {
    console.error("Error fetching rejected cars:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCar,
  getAllCars,
  updateCar,
  deleteCar,
  getCarById,
  getMyCars,
  getPendingCars,
  getApprovedCars,
  getRejectedCars
};
