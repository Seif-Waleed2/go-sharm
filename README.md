# Go Sharm

A MERN-stack tourism web app for Sharm El Sheikh — explore attractions, generate an AI-assisted
vacation itinerary, book rides, and manage your trips.

This version combines the **new client UI** (redesigned pages/components) with the **original
Express/MongoDB backend** (MVC architecture, JWT auth, AI itinerary service).

## Tech Stack

- **Frontend:** React 18 (Vite), Tailwind CSS, React Router, Axios, react-hot-toast, lucide-react
- **Backend:** Node.js, Express.js (MVC architecture)
- **Database:** MongoDB with Mongoose
- **Auth:** JWT + bcryptjs

## Project Structure

```
go-sharm/
├── client/          # React + Vite frontend (new UI)
└── server/          # Express + MongoDB backend (MVC, original)
    └── src/
        ├── config/       # DB connection
        ├── models/       # Mongoose schemas (User, Place, Trip, AIPlan)
        ├── controllers/  # Route handler logic
        ├── routes/       # Express routers + validation rules
        ├── middleware/   # auth, validation, error handling
        ├── services/     # AI itinerary generation logic
        ├── utils/        # asyncHandler, ApiError, generateToken
        └── seed/         # sample data seeder
```

## Getting Started

### 1. Backend

```bash
cd server
cp .env.example .env   # then fill in MONGO_URI and JWT_SECRET
npm install
npm run seed            # populates sample places
npm run dev              # starts the API on http://localhost:5000
```

### 2. Frontend

```bash
cd client
cp .env.example .env   # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev              # starts the app on http://localhost:5173
```

The client's CORS-allowed origin on the server defaults to `http://localhost:5173`
(`CLIENT_URL` in `server/.env`), so keep the ports as above unless you update both sides.

## What changed while merging

The new client was built expecting slightly different data than what the original server
returns. These integration fixes were made so both sides actually work together:

- **`client/src/pages/PlannerPage.jsx`** — the AI itinerary's `activities` are objects
  (`{ name, category, description }`), not plain strings. Rendering was updated to show
  the activity name + description instead of trying to render the object directly.
- **`client/src/pages/ExplorePage.jsx`** — the category filter chips (`Beaches`,
  `Restaurants`, `Safari`, `Diving`, etc.) are UI-friendly labels that don't match the
  `Place.category` enum stored in MongoDB (`Beach`, `Restaurant`, `Safari Excursion`,
  `Diving Centers`, ...). Added a label → enum mapping so filtering actually works.
- **`server/src/services/aiService.js`** — added aliases in `INTEREST_CATEGORY_MAP` for
  the interest labels the new Planner UI sends (`Beaches`, `Diving`, `Restaurants`,
  `Safari`, `Shopping`) so itinerary generation matches places by category correctly.
- **`server/src/models/User.js`** + **`server/src/controllers/authController.js`** — the
  new Account page collects `phone`, `dateOfBirth`, and `address`, which the original
  `User` model didn't have. Added the fields and wired them into `updateProfile` /
  `getProfile` so they actually save and load.

## API Overview

| Method | Route                | Auth | Description                        |
|--------|-----------------------|------|-------------------------------------|
| POST   | `/api/auth/register`  | No   | Create an account                   |
| POST   | `/api/auth/login`     | No   | Log in                              |
| GET    | `/api/auth/profile`   | Yes  | Get current user                    |
| PUT    | `/api/auth/profile`   | Yes  | Update current user                 |
| GET    | `/api/places`         | No   | List places (`?search=`, `?category=`) |
| GET    | `/api/places/:id`     | No   | Get a single place                  |
| GET    | `/api/rides`          | No   | Get ride pricing options            |
| POST   | `/api/rides`          | Yes  | Book a ride (creates a trip)        |
| GET    | `/api/trips`          | Yes  | Get the user's trip history         |
| POST   | `/api/trips`          | Yes  | Create a trip record directly       |
| POST   | `/api/ai/generate`    | Yes  | Generate & save an AI vacation plan |
| GET    | `/api/ai/plans`       | Yes  | Get the user's saved AI plans       |
