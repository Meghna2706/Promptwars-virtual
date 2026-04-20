# VenueFlow – Smart Stadium Experience Platform

VenueFlow is a modern, responsive web application designed to enhance the physical event experience at large-scale stadiums. It provides real-time crowd navigation, dynamic seat booking, and a live venue map to optimize traffic flow and user experience.

![VenueFlow Banner](https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)

## Features

- **🎫 Smart Ticket & Seat Selection**: Interactive grid with dynamic status (available, booked, locked) and pricing.
- **🗺️ Live Venue Map**: Real-time interactive map (powered by Leaflet) showing gates, food stalls, and crowd density heatmaps.
- **📊 Real-Time Crowd Intelligence**: Live updates on queue times and parking availability using WebSockets (Socket.io).
- **🔔 Smart Alerts**: Context-aware floating notifications suggesting alternative routes and updates.
- **📈 Command Center Dashboard**: Admin view for monitoring stadium analytics and capacity.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Framer Motion, React-Leaflet
- **Backend**: Node.js, Express, Socket.io
- **Deployment**: Docker, ready for Google Cloud Run

## Project Structure

```
.
├── backend/               # Express + Socket.io Server
│   ├── data/              # Data simulator logic
│   ├── routes/            # REST API endpoints
│   ├── server.js          # Entry point
│   └── package.json
├── frontend/              # Vite + React UI
│   ├── src/
│   │   ├── components/    # Reusable UI components (GlassCard, SmartAlerts)
│   │   ├── context/       # Socket.io context provider
│   │   ├── pages/         # Application Views
│   │   ├── App.jsx        # Routing
│   │   └── main.jsx       # Entry point
│   ├── index.css          # Global Tailwind and custom utilities
│   └── package.json
├── Dockerfile             # Multi-stage build for production
└── docker-compose.yml     # Local orchestration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Running Locally (Development Mode)

1. **Start the Backend**:
   ```bash
   cd backend
   npm install
   npm run dev # or node server.js
   ```
   *The backend runs on `http://localhost:5000`.*

2. **Start the Frontend**:
   ```bash
   # Open a new terminal
   cd frontend
   npm install
   npm run dev
   ```
   *The frontend runs on `http://localhost:5173`.*

### Running with Docker (Production Mode)

You can run the entire application using Docker Compose. This will build the Vite frontend and serve it through the Express backend.

```bash
docker-compose up --build
```
*The app will be available at `http://localhost:8080`.*

## Deployment to Google Cloud Run

1. Build the Docker image:
   ```bash
   docker build -t gcr.io/[PROJECT_ID]/venueflow .
   ```

2. Push the image to Google Container Registry:
   ```bash
   docker push gcr.io/[PROJECT_ID]/venueflow
   ```

3. Deploy to Cloud Run:
   ```bash
   gcloud run deploy venueflow --image gcr.io/[PROJECT_ID]/venueflow --platform managed --allow-unauthenticated
   ```

## Design Notes

- **Aesthetic**: Employs a dark theme with vibrant purple/blue gradients and glassmorphism cards for a premium SaaS feel.
- **Animations**: Uses Framer Motion for smooth transitions, layout animations, and notification entry/exit.
- **Data Simulation**: Since real stadium data isn't available, the backend runs a simulator loop (`backend/data/simulator.js`) that realistically fluctuates crowd density, queue times, and parking capacity every 5 seconds.

## License

MIT License