const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  car_name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  brand: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    index: true
  },
  color: {
    type: String,
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['car', '2 wheeler'],
    required: true,
    index: true
  },
  seats: {
    type: Number,
    required: true
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'],
    required: true,
    index: true
  },
  transmission: {
    type: String,
    enum: ['Manual', 'Auto'],
    required: true
  },
  mileage: {
    type: Number,
    required: true
  },
  rentalPricePerDay: {
    type: Number,
    required: true
  },
  availability: {
    type: Boolean,
    default: true,
    index: true
  },
  location: {
    type: String,
    required: true,
    index: true
  },
  image: {
    public_id: { type: String },
    url: { type: String }
  },
  isApproved: {
    type: Boolean,
    default: false,
    index: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true
  },
  rejectionReason: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Compound Index for search optimization
carSchema.index({
  brand: 1,
  model: 1,
  car_name: 1,
  color: 1,
  isApproved: 1
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
