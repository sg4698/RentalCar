
const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({

  car_name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },

  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  color: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['car','2 wheeler'],
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid','CNG'],
    required: true,
  },
  transmission: {
    type: String,
    enum: ['Manual','Auto'],
    required: true,
  },
  mileage: {
    type: Number, // in km per liter or equivalent
    required: true,
  },
  rentalPricePerDay: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    public_id: { type: String },
    url: { type: String },
  },
  isApproved: {
    type: Boolean,
    default: false, // Default to false (pending approval)
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rejectionReason: {
  type: String,
  default: null,
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Car = mongoose.model('Car', carSchema);

module.exports  = Car;
