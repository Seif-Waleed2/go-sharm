require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Place = require('../models/Place');

const places = [
  {
    name: 'Palm Beach',
    description: 'A stunning turquoise-water beach lined with palm trees and relaxing loungers.',
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    price: 400,
    rating: 5,
    location: 'Sharm El Sheikh',
  },
  {
    name: 'Gold Beach',
    description: 'Golden sands and calm bays, perfect for a relaxing day by the Red Sea.',
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206',
    price: 400,
    rating: 5,
    location: 'Sharm El Sheikh',
  },
  {
    name: 'Alfanar',
    description: 'A scenic coastal spot with dramatic cliffs and clear diving waters.',
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    price: 300,
    rating: 5,
    location: 'Sharm El Sheikh',
  },
  {
    name: 'Farsha Cafe',
    description: 'A mountain lounge with panoramic sea views, cushions, and shisha.',
    category: 'Mountain Lounge',
    image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439',
    price: 20,
    rating: 4.7,
    location: 'Elhadaba, Old Market',
  },
  {
    name: 'Soho Square',
    description: 'Shopping and nightlife complex with restaurants, bars, and entertainment.',
    category: 'Shopping',
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6',
    price: 0,
    rating: 4.5,
    location: 'Naama Bay',
  },
  {
    name: 'Old Market',
    description: 'Historic bazaar area with local shops, cafes, and traditional architecture.',
    category: 'Bazar',
    image: 'https://images.unsplash.com/photo-1596386461350-326ccb383e9f',
    price: 0,
    rating: 4.6,
    location: 'Sharm El Sheikh',
  },
  {
    name: 'Dahab Center Mall',
    description: 'A popular commercial complex with shopping, dining, and family-friendly offerings.',
    category: 'Shopping',
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6',
    price: 0,
    rating: 4.5,
    location: 'Hadaba District',
  },
  {
    name: 'Mahony Restaurant',
    description: 'A cozy restaurant serving fresh seafood and Egyptian favorites.',
    category: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    price: 25,
    rating: 4.4,
    location: 'Naama Bay',
  },
  {
    name: 'Sea Beach Aqua Park',
    description: 'Waterslides and pools for a fun family day out by the sea.',
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c',
    price: 30,
    rating: 4.3,
    location: 'Sharm El Sheikh',
  },
  {
    name: 'Ras Mohammed Safari',
    description: 'Guided desert safari with dune bashing, Bedouin dinner, and stargazing.',
    category: 'Safari Excursion',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35',
    price: 45,
    rating: 4.8,
    location: 'Ras Mohammed National Park',
  },
  {
    name: 'Tiran Island Diving',
    description: 'World-class dive site with coral reefs and diverse marine life.',
    category: 'Diving Centers',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    price: 60,
    rating: 4.9,
    location: 'Tiran Island',
  },
  {
    name: 'Sunset Yacht Cruise',
    description: 'Evening yacht excursion along the coast with dinner and music.',
    category: 'Yacht Excursions',
    image: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8',
    price: 55,
    rating: 4.6,
    location: 'Naama Bay Marina',
  },
];

const seed = async () => {
  await connectDB();
  await Place.deleteMany({});
  await Place.insertMany(places);
  console.log(`Seeded ${places.length} places.`);
  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
