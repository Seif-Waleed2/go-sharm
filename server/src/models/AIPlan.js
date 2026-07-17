const mongoose = require('mongoose');

const itineraryItemSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    activities: [
      {
        name: String,
        category: String,
        description: String,
      },
    ],
  },
  { _id: false }
);

const aiPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tripType: {
      type: String,
      enum: ['Solo', 'Partner Trip', 'Family Trip', 'Friends Trip'],
      required: true,
    },
    interests: {
      type: [String],
      default: [],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    withPets: {
      type: Boolean,
      default: false,
    },
    itinerary: {
      type: [itineraryItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AIPlan', aiPlanSchema);
