# Go Sharm

A MERN-stack tourism web app for Sharm El Sheikh — explore attractions, generate an AI-assisted
vacation itinerary, book rides, and manage your trips.

## Tech Stack

- **Frontend:** React 19 (Vite), Tailwind CSS, React Router, Axios, react-hot-toast, lucide-react
- **Backend:** Node.js, Express.js (MVC architecture)
- **Database:** MongoDB with Mongoose
- **Auth:** JWT + bcrypt

## Project Structure

```
go-sharm/
├── client/          # React + Vite frontend
└── server/          # Express + MongoDB backend (MVC)
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
cp .env.example .env    # VITE_API_URL should point at the backend
npm install
npm run dev              # starts the app on http://localhost:5173
```

## REST API Overview

| Method | Endpoint              | Auth | Description                         |
| ------ | ---------------------- | ---- | ------------------------------------ |
| POST   | `/api/auth/register`   | –    | Create an account, returns a JWT     |
| POST   | `/api/auth/login`      | –    | Log in, returns a JWT                |
| GET    | `/api/auth/profile`    | ✅   | Get the current user's profile       |
| PUT    | `/api/auth/profile`    | ✅   | Update name/avatar                   |
| GET    | `/api/places`          | –    | List places (`?search=`, `?category=`) |
| GET    | `/api/places/:id`      | –    | Get a single place                   |
| GET    | `/api/rides`           | –    | Get ride type options + estimated price |
| POST   | `/api/rides`           | ✅   | Book a ride                          |
| GET    | `/api/trips`           | ✅   | Get the user's trip history          |
| GET    | `/api/trips/:id`       | ✅   | Get a single trip                    |
| POST   | `/api/trips`           | ✅   | Manually create/rebook a trip        |
| POST   | `/api/ai/generate`     | ✅   | Generate & save a vacation itinerary |
| GET    | `/api/ai/plans`        | ✅   | List the user's saved AI plans       |

## Notes

- Only one user role exists (Tourist) — no admin/provider dashboards.
- The AI planner uses a lightweight rule-based itinerary generator (see
  `server/src/services/aiService.js`) that matches selected interests to seeded places.
- Dark mode is available via the moon/sun toggle in the navbar.
