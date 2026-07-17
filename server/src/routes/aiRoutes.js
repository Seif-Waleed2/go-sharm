const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validateMiddleware');
const { protect } = require('../middleware/authMiddleware');
const { generatePlan, getPlans } = require('../controllers/aiController');

const router = express.Router();

router.use(protect);

router.post(
  '/generate',
  [
    body('startDate').isISO8601().withMessage('A valid start date is required'),
    body('endDate').isISO8601().withMessage('A valid end date is required'),
    body('tripType')
      .isIn(['Solo', 'Partner Trip', 'Family Trip', 'Friends Trip'])
      .withMessage('Invalid trip type'),
    body('interests').isArray({ min: 1 }).withMessage('Select at least one interest'),
  ],
  validate,
  generatePlan
);

router.get('/plans', getPlans);

module.exports = router;
