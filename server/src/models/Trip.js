const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pickup: {
      type: String,
      required: [true, 'Pickup location is required'],
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
    },
    rideType: {
      type: String,
      enum: ['Smart X', 'Smart XL', 'Smart VIP'],
      required: true,
    },
    passengers: {
      type: Number,
      default: 1,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    distanceKm: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'confirmed',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trip', tripSchema);
