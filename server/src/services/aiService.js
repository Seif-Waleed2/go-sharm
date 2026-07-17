const Place = require('../models/Place');

/**
 * Maps a user-facing interest label to the Place.category enum values
 * it should pull recommendations from.
 */
const INTEREST_CATEGORY_MAP = {
  'Great Food': ['Restaurant'],
  'Sea View': ['Beach'],
  Nightlife: ['Entertainment'],
  'Desert Safari': ['Safari Excursion'],
  'Arabian Nights': ['Entertainment'],
  'Water Sports': ['Yacht Excursions'],
  'Hidden Gems': ['Bazar'],
  'Historical Sites': ['Bazar'],
  Snorkeling: ['Diving Centers'],
  'Scuba Diving': ['Diving Centers'],
  'Must-See': ['Beach', 'Bazar'],
  Tours: ['Safari Excursion', 'Yacht Excursions'],
  // Aliases matching the interest labels sent by the client's PlannerPage UI.
  Beaches: ['Beach'],
  Diving: ['Diving Centers'],
  Restaurants: ['Restaurant'],
  Safari: ['Safari Excursion'],
  Shopping: ['Shopping', 'Bazar'],
};

const daysBetween = (start, end) => {
  const ms = new Date(end).setHours(0, 0, 0, 0) - new Date(start).setHours(0, 0, 0, 0);
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)) + 1);
};

/**
 * Generates a simple day-by-day itinerary by rotating through places
 * that match the user's selected interests. Falls back to top-rated
 * places if there aren't enough interest-matched results.
 */
const generateItinerary = async ({ startDate, endDate, interests = [] }) => {
  const totalDays = daysBetween(startDate, endDate);

  const categories = [
    ...new Set(interests.flatMap((interest) => INTEREST_CATEGORY_MAP[interest] || [])),
  ];

  let candidatePlaces = [];
  if (categories.length > 0) {
    candidatePlaces = await Place.find({ category: { $in: categories } }).limit(50);
  }

  if (candidatePlaces.length < totalDays * 2) {
    const fallback = await Place.find().sort({ rating: -1 }).limit(50);
    const existingIds = new Set(candidatePlaces.map((p) => p.id));
    fallback.forEach((p) => {
      if (!existingIds.has(p.id)) candidatePlaces.push(p);
    });
  }

  const itinerary = [];
  let cursor = 0;
  for (let day = 1; day <= totalDays; day += 1) {
    const activitiesForDay = [];
    const activityCount = Math.min(3, candidatePlaces.length || 0);
    for (let i = 0; i < activityCount; i += 1) {
      const place = candidatePlaces[cursor % candidatePlaces.length];
      if (place) {
        activitiesForDay.push({
          name: place.name,
          category: place.category,
          description: place.description,
        });
      }
      cursor += 1;
    }
    itinerary.push({
      day,
      title: `Day ${day}`,
      activities: activitiesForDay,
    });
  }

  return itinerary;
};

module.exports = { generateItinerary };
