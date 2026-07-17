const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Place name is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Beach',
        'Restaurant',
        'Safari Excursion',
        'Bazar',
        'Yacht Excursions',
        'Diving Centers',
        'Bank',
        'Entertainment',
        'Shopping',
        'Mountain Lounge',
      ],
    },
    image: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    location: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

placeSchema.index({ name: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Place', placeSchema);
