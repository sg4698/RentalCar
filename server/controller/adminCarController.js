const Car = require("../models/carModel");

// Approve Car (Admin)
const approveCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    car.status = "approved";
    car.rejectionReason = null;

    await car.save();

    res.status(200).json({ message: "Car approved successfully", car });
  } catch (error) {
    console.error("Error approving car:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Reject Car (Admin)
const rejectCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({ message: "Rejection reason is required" });
    }

    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    car.status = "rejected";
    car.rejectionReason = reason;

    await car.save();

    res.status(200).json({ message: "Car rejected successfully", car });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { approveCar,rejectCar}