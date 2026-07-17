const express = require('express');
const { getPlaces, getPlaceById } = require('../controllers/placeController');

const router = express.Router();

router.get('/', getPlaces);
router.get('/:id', getPlaceById);

module.exports = router;
