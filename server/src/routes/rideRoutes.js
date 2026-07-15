const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validateMiddleware');
const { protect } = require('../middleware/authMiddleware');
const { getRideOptions, bookRide } = require('../controllers/rideController');

const router = express.Router();

router.get('/', getRideOptions);

router.post(
  '/',
  protect,
  [
    body('pickup').trim().notEmpty().withMessage('Pickup location is required'),
    body('destination').trim().notEmpty().withMessage('Dropoff location is required'),
    body('rideType')
      .isIn(['Smart X', 'Smart XL', 'Smart VIP'])
      .withMessage('Invalid ride type'),
  ],
  validate,
  bookRide
);

module.exports = router;
