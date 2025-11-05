# Tycoon

A lightweight Java + TypeScript full-stack clicker/tycoon simulation. The Spring Boot backend maintains game state and exposes a simple REST API, while the Vite + React frontend renders a modern interface for growing your empire.

## Features
- Incremental cash generation with each button press.
- Tiered upgrades that boost cash-per-click and become progressively more expensive.
- Responsive glassmorphism-inspired UI built with Tailwind CSS.
- REST endpoints for retrieving state, registering clicks, and purchasing upgrades.

## Getting started

### Backend
1. Install Java 17+ and Maven.
2. From the `backend` directory run:
   ```bash
   mvn spring-boot:run
   ```
3. The API will be available at `http://localhost:8080/api/game`.

### Frontend
1. Install Node.js 18+ and npm.
2. From the `frontend` directory install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:5173`.

The Vite dev server proxies API requests to the Spring Boot backend (`/api`).

## Available API routes
- `GET /api/game` – current cash, cash-per-click, and upgrade information.
- `POST /api/game/click` – apply a manual click and receive the updated state.
- `POST /api/game/upgrades/{id}/purchase` – spend cash to level up the specified upgrade.

## Testing
Unit tests cover the backend service logic:
```bash
cd backend
mvn test
```
