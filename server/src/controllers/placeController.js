const Place = require('../models/Place');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

// @desc    Get all places (supports ?search= and ?category=)
// @route   GET /api/places
// @access  Public
const getPlaces = asyncHandler(async (req, res) => {
  const { search, category } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (search) filter.$text = { $search: search };

  const places = await Place.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: places.length,
    places,
  });
});

// @desc    Get a single place by id
// @route   GET /api/places/:id
// @access  Public
const getPlaceById = asyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id);
  if (!place) {
    throw new ApiError(404, 'Place not found');
  }
  res.status(200).json({ success: true, place });
});

module.exports = { getPlaces, getPlaceById };
