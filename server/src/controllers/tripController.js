const Trip = require('../models/Trip');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

// @desc    Create a trip record directly (rebooking, manual entry, etc.)
// @route   POST /api/trips
// @access  Private
const createTrip = asyncHandler(async (req, res) => {
  const { pickup, destination, rideType, price, distanceKm, passengers } = req.body;

  const trip = await Trip.create({
    user: req.user._id,
    pickup,
    destination,
    rideType,
    price,
    distanceKm,
    passengers,
  });

  res.status(201).json({ success: true, message: 'Trip saved', trip });
});

// @desc    Get the authenticated user's trip history
// @route   GET /api/trips
// @access  Private
const getTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.find({ user: req.user._id }).sort({ date: -1 });
  res.status(200).json({ success: true, count: trips.length, trips });
});

// @desc    Get a single trip's details
// @route   GET /api/trips/:id
// @access  Private
const getTripById = asyncHandler(async (req, res) => {
  const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id });
  if (!trip) {
    throw new ApiError(404, 'Trip not found');
  }
  res.status(200).json({ success: true, trip });
});

module.exports = { createTrip, getTrips, getTripById };
