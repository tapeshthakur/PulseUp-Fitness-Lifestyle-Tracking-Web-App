# PulseUp: Fitness & Lifestyle Tracking Web App

PulseUp is a premium-style fitness and lifestyle tracking web application with gamification, JWT authentication, animated analytics, onboarding, badges, streaks, and leaderboard rankings.

## Stack

- Frontend: React + Vite + Tailwind CSS + Framer Motion + Recharts + Lucide React
- Backend: Flask + Flask-JWT-Extended + Flask-SQLAlchemy + SQLite

## Project Structure

- `frontend/` React client
- `backend/` Flask API and SQLite models

## Backend Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

The Flask API runs at `http://127.0.0.1:5000`.

Demo account:

- Email: `demo@pulseup.app`
- Password: `demo123`

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The React app runs at `http://127.0.0.1:5173` and targets the backend at `http://127.0.0.1:5000/api` by default.

Optional environment override:

```bash
VITE_API_BASE_URL=http://127.0.0.1:5000/api
```

## Included Features

- Premium landing page with gradient hero and feature cards
- Animated login and signup with validation feedback and password toggle
- Dashboard with steps, calories, workout time, progress rings, weekly graph, and motivational insights
- Activity page with guided logging form, timeline history, filters, empty state, and confirmation modal
- Gamification with points, badges, streaks, onboarding, and leaderboard
- Responsive navigation and persistent light/dark theme toggle
- Toast notifications and loading skeletons
