const Car = require("../models/carModel");
const uploadToCloudinary = require("../middleware/cloudinary");
const cloudinary = require("cloudinary").v2;
// const cloudinary = require("cloudinary").v2;

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

    // For validation
  if (!car_name || !brand || !registrationNumber || !color || !type ||
      !seats || !fuelType || !transmission || !mileage || !rentalPricePerDay || !location
    ){
      return res.status(400).json({message: "All fields are required"})
    }

    // Validation for Image
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    // Upload the image to Cloudinary
    const uploadResults = await Promise.all(
      req.files.map(file => uploadToCloudinary(file.buffer))
    );

    
    
     // Save only the first image (or you can support multiple images if needed)
    const image = {
      public_id:uploadResults[0]. public_id,
      url:uploadResults[0].url,
    }

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
     isApproved: false //Default approval false
    });

    await newCar.save();

    res.status(201).json({
      message: "Car created Successfully",
      car:newCar,
    });
  } catch (error) {
    console.log("Error creating car:",error.message)
    res.status(500).json({
      error: error.message,
    });
  }
};
  

// GET All Cars with Pagination
const getAllCars = async (req, res) => {
  try {
    // Query Params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // Optionally, support filtering (e.g., by type or brand)
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    if (req.query.brand) filter.brand = req.query.brand;

      // Role-based filtering
if (!req.user || req.user.role === "user") {
  filter.isApproved = true;
}

    const total = await Car.countDocuments(filter);

    const cars = await Car.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // latest first

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

// For CarOwner(Approve or rejected,pendings)
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
const updateCar = async (req,res) => {
  try {
    const {id} = req.params;

    let car = await Car.findById(id);
    
    if(!car){
      return res.status(404).json({message: "Car not found"});
    }

    // If new image is uploaded,replace with old one
     if(req.files && req.files.length > 0){
        //  Delete the old image from Cloudinary
         if(car.image && car.image.public_id){
          await cloudinary.uploader.destroy(car.image.public_id)
         }

        // Upload new Image
        const uploadResults = await Promise.all(
          req.files.map(file => uploadToCloudinary(file.buffer))
        );

        car.image = {
          public_id: uploadResults[0].public_id,
          url: uploadResults[0].url,
        };
     }


    //  Update Other Fields
     const fields = [
        "car_name", "brand", "registrationNumber", "color", "type",
      "seats", "fuelType", "transmission", "mileage", "rentalPricePerDay", "location"
    ];

    fields.forEach(field => {
       if(req.body[field] !== undefined){
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

const deleteCar = async (req,res) => {
  try {
    const {id} = req.params;
    // 1. Find the car
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // // Delete image from Cloudinary
    //     if (car.image && car.image.public_id) {
    //   await cloudinary.uploader.destroy(car.image.public_id);
    // }
     
    await Car.findByIdAndDelete(id);
     res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
     console.error("Error deleting car:", error.message);
    res.status(500).json({ error: error.message });
  }
}



//ApproveCar For Admin
const approveCar = async (req,res) => {
   try {
    const {id}  = req.params;

    const car = await Car.findById(id);
     if(!car){
      return res.status(404).json({ message: "Car not found" });
     }
      car.isApproved = true;
      // car.rejectionReason = null;

    await car.save();

        res.status(200).json({ message: "Car approved successfully", car });
   } catch (error) {
      console.error("Error approving car:", error.message);
    res.status(500).json({ error: error.message });
   }
}


//reject Car by Admin
const rejectCar = async (req,res) => {
   try {
    const {id} = req.params;
    const { reason } = req.body;

    if(!reason){
      return res.status(400).json({
        message:{
          message: "Rejection reason is required"
        }
      })
    }

    const car = await Car.findById(id);
    if(!car) {
      return res.status(404).json({message: "Car not Found"})
    }

    car.isApproved  = false;
    car.rejectionReason = reason;

    await car.save();
      res.status(200).json({ message: "Car rejected successfully", car });
   } catch (error) {
    res.status(500).json({ error: error.message });
   }
}
// For Admin to We Pending Cars for Admin
const getPendingCars = async (req, res) => {
  try {
 const pendingCars = await Car.find({ isApproved: false, rejectionReason: null })
      .populate("ownerId", "name email");
 res.status(200).json({ cars: pendingCars });

  } catch (error) {
    console.error("Error fetching pending cars:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Admin: Get all approved cars
const getApprovedCars = async (req, res) => {
  try {
      const approvedCars = await Car.find({ isApproved: true })
      .populate("ownerId", "name email");
     
    res.status(200).json({ cars: approvedCars });
  } catch (error) {
    console.error("Error fetching approved cars:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Admin: Get all rejected cars
const getRejectedCars = async (req, res) => {
  try {
    const rejectedCars = await Car.find({
      isApproved: false,
      rejectionReason: { $ne: null },
    }).populate("ownerId", "name email");
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
  approveCar,
  getPendingCars,
  rejectCar,
  getApprovedCars,
  getRejectedCars
}