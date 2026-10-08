# GoPratle Requirement Posting Wizard

This is a full-stack web application developed as an technical assignment. It implements a multi-step requirement posting flow for Planners, Performers, and Crew, using a Next.js frontend and a Node.js/Express backend with MongoDB.

## Features

- **Multi-Step Wizard**: A 4-step form to collect event basics, category-specific details, budget, and a review step before submission.
- **Dynamic Forms**: Renders different fields based on the selected category (Planner, Performer, or Crew).
- **Client & Server Validation**: Ensures required fields are present and date ranges are valid before form submission. The backend also validates payloads.
- **Custom UI**: Styled with plain CSS in Next.js without component libraries.

## Tech Stack

**Frontend**:
- Next.js 16 (App Router)
- React 19
- Vanilla CSS
- React `useState` for state management

**Backend**:
- Node.js & Express.js
- MongoDB & Mongoose

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Local instance or Atlas URI)

### Backend Setup
1. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://127.0.0.1:27017/gopratle_assignment
   ```
3. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
3. Start the frontend development server:
   ```bash
   npm run dev --webpack
   ```
   *(Note: `--webpack` flag bypasses Turbopack compatibility issues on Windows).*

Open `http://localhost:3000` in your browser.

## API Endpoints

- `POST /api/requirements`: Creates a new requirement. Expects a flat JSON payload. Returns `201 Created`.
- `GET /api/requirements`: Returns a list of all requirements.
- `GET /api/requirements/:id`: Returns a specific requirement by ID.

## Architecture

- **State Management**: Frontend state is managed centrally and passed down to step components.
- **Data Flow**: The frontend submits a flat JSON object to the API. The Express controller validates it and nests category-specific details before saving to MongoDB.

## Assumptions & Limitations

- **Category Fields**: As specific business fields weren't defined in the prompt, practical fields were assumed for each category (e.g., `planningExperience`, `performerType`).
- **Authentication**: Not implemented as it wasn't required by the assignment.
- **Payload Structure**: The API accepts a flat payload to simplify frontend logic, handling data nesting on the server.
