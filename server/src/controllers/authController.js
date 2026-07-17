const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const generateToken = require('../utils/generateToken');
const ApiError = require('../utils/ApiError');

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  phone: user.phone,
  dateOfBirth: user.dateOfBirth,
  address: user.address,
  createdAt: user.createdAt,
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'An account with this email already exists');
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    token,
    user: sanitizeUser(user),
  });
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: 'Logged in successfully',
    token,
    user: sanitizeUser(user),
  });
});

// @desc    Get current authenticated user's profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: sanitizeUser(req.user),
  });
});

// @desc    Update current authenticated user's profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const { name, avatar, phone, dateOfBirth, address } = req.body;

  if (name) req.user.name = name;
  if (avatar !== undefined) req.user.avatar = avatar;
  if (phone !== undefined) req.user.phone = phone;
  if (dateOfBirth !== undefined) req.user.dateOfBirth = dateOfBirth || undefined;
  if (address !== undefined) req.user.address = address;

  const updated = await req.user.save();

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    user: sanitizeUser(updated),
  });
});

module.exports = { register, login, getProfile, updateProfile };
