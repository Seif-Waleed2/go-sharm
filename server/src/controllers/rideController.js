const Trip = require('../models/Trip');
const asyncHandler = require('../utils/asyncHandler');

// Base fare + per-km rate used for the simple estimated-price calculation.
const RIDE_PRICING = {
  'Smart X': { base: 3, perKm: 0.9 },
  'Smart XL': { base: 4, perKm: 1.1 },
  'Smart VIP': { base: 6, perKm: 1.5 },
};

/**
 * Very lightweight distance estimate since we don't integrate a real
 * mapping/geocoding provider. Produces a deterministic but varied
 * distance (in km) from the two location strings.
 */
const estimateDistanceKm = (pickup, destination) => {
  const seed = `${pickup}-${destination}`.length;
  return Math.max(2, (seed % 20) + 3.5);
};

const calculatePrice = (rideType, distanceKm) => {
  const pricing = RIDE_PRICING[rideType] || RIDE_PRICING['Smart X'];
  const raw = pricing.base + pricing.perKm * distanceKm;
  return Math.round(raw * 100) / 100;
};

// @desc    Get available ride types with estimated pricing for a route
// @route   GET /api/rides
// @access  Public
const getRideOptions = asyncHandler(async (req, res) => {
  const { pickup = '', destination = '' } = req.query;
  const distanceKm = estimateDistanceKm(pickup, destination);

  const options = Object.keys(RIDE_PRICING).map((rideType) => ({
    rideType,
    price: calculatePrice(rideType, distanceKm),
    distanceKm,
  }));

  res.status(200).json({ success: true, distanceKm, options });
});

// @desc    Book a ride (creates a trip record)
// @route   POST /api/rides
// @access  Private
const bookRide = asyncHandler(async (req, res) => {
  const { pickup, destination, rideType, passengers = 1 } = req.body;

  const distanceKm = estimateDistanceKm(pickup, destination);
  const price = calculatePrice(rideType, distanceKm);

  const trip = await Trip.create({
    user: req.user._id,
    pickup,
    destination,
    rideType,
    passengers,
    price,
    distanceKm,
    status: 'confirmed',
  });

  res.status(201).json({
    success: true,
    message: 'Ride booked successfully',
    trip,
  });
});

module.exports = { getRideOptions, bookRide };
