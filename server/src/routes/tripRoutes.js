const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validateMiddleware');
const { protect } = require('../middleware/authMiddleware');
const { createTrip, getTrips, getTripById } = require('../controllers/tripController');

const router = express.Router();

router.use(protect);

router.get('/', getTrips);
router.get('/:id', getTripById);

router.post(
  '/',
  [
    body('pickup').trim().notEmpty().withMessage('Pickup location is required'),
    body('destination').trim().notEmpty().withMessage('Destination is required'),
    body('rideType')
      .isIn(['Smart X', 'Smart XL', 'Smart VIP'])
      .withMessage('Invalid ride type'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  ],
  validate,
  createTrip
);

module.exports = router;
