const AIPlan = require('../models/AIPlan');
const asyncHandler = require('../utils/asyncHandler');
const { generateItinerary } = require('../services/aiService');

// @desc    Generate a new AI vacation plan and store it
// @route   POST /api/ai/generate
// @access  Private
const generatePlan = asyncHandler(async (req, res) => {
  const { startDate, endDate, tripType, interests = [], withPets = false } = req.body;

  const itinerary = await generateItinerary({ startDate, endDate, interests });

  const plan = await AIPlan.create({
    user: req.user._id,
    tripType,
    interests,
    startDate,
    endDate,
    withPets,
    itinerary,
  });

  res.status(201).json({
    success: true,
    message: 'Vacation plan generated successfully',
    plan,
  });
});

// @desc    Get all saved AI plans for the authenticated user
// @route   GET /api/ai/plans
// @access  Private
const getPlans = asyncHandler(async (req, res) => {
  const plans = await AIPlan.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: plans.length, plans });
});

module.exports = { generatePlan, getPlans };
