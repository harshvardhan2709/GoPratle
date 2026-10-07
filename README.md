# GoPratle Requirement Posting Wizard

A full-stack web application built for the GoPratle Full-Stack Developer Intern technical assignment. This project implements a multi-step requirement posting flow (Planner, Performer, and Crew) with a Next.js frontend and a Node.js/Express backend connected to MongoDB.

## Features

- **Multi-Step Wizard**: A 4-step seamless flow allowing users to input event basics, category-specific details, budget, and review before submission.
- **Dynamic Forms**: The form intelligently renders different fields based on the chosen category (Planner, Performer, or Crew).
- **Client-Side Validation**: Ensures all required fields are filled out and dates are logical (e.g., End Date must be after Start Date) before allowing the user to proceed.
- **Server-Side Validation**: A robust Express backend that strictly validates incoming payloads and returns human-readable error messages.
- **Modern UI**: Clean, light-themed SaaS design using plain CSS in Next.js without bulky component libraries. 

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Vanilla CSS (`app/globals.css`)
- **State Management**: React `useState` (centralized in `page.js` to persist data between steps)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM/ODM**: Mongoose
- **Other**: CORS, Morgan (logging), dotenv

## Architecture & Data Flow

1. **Frontend**: The user fills out a 4-step wizard. State is managed centrally in `RequirementWizard` (`page.js`) and passed down to individual step components (`Step1Basics`, `Step2Category`, `Step3Additional`, `Step4Review`).
2. **API Request**: Upon clicking "Submit", the frontend transforms the state into a flat JSON object and sends a `POST` request to `/api/requirements`.
3. **Backend Controller**: The `createRequirement` controller in Express extracts the flat payload, validates it based on the `category`, and nests the category-specific details (`plannerDetails`, `performerDetails`, `crewDetails`) into a structured document.
4. **Database**: The document is saved to the `requirements` collection in MongoDB.
5. **Response**: The backend returns a 201 Created response, and the frontend resets the form to show a Success screen.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Local instance or Atlas URI)

### 1. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/gopratle_assignment
```

Start the backend server:
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev --webpack
```
*(Note: `--webpack` flag is used to bypass Turbopack/LightningCSS compatibility issues on Windows).*

Open `http://localhost:3000` in your browser.

## API Endpoints

### `POST /api/requirements`
Creates a new requirement. 
- Expects a flat JSON body containing `eventName`, `eventType`, `category`, `startDate`, `endDate`, `location`, and category-specific fields (e.g. `planningExperience`).
- Returns `201 Created` with the inserted document.

### `GET /api/requirements`
Fetches a list of all submitted requirements (used for testing/verification).
- Returns `200 OK` with an array of requirements sorted by newest first.

### `GET /api/requirements/:id`
Fetches a specific requirement by its ID.

## Assumptions & Limitations

- **Category Fields**: Because the assignment prompt did not strictly define the exact business fields needed for a Planner, Performer, or Crew, I have designed a reasonable set of practical fields for each category (e.g., `planningExperience`, `performerType`, `crewRole`).
- **Authentication**: No authentication or user sessions are implemented, as it was not required by the assignment constraints.
- **Flat API Payload**: The backend expects a flat payload and handles data nesting internally. This keeps the frontend payload simple and decoupled from the strict schema structure.

## Future Improvements

- Add robust authentication (e.g., NextAuth.js or JWT).
- Build an Admin Dashboard to view, filter, and manage submitted requirements.
- Add file uploads (e.g., for venue floor plans or performer portfolios) using AWS S3 or Cloudinary.
