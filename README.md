# React Portfolio & Express Node.js Backend (Assignment 3)

This project extends the React Portfolio Website by integrating a Node.js/Express backend service. Static project data and contact form submissions are now handled via a live RESTful API, providing dynamic data fetching, loading/error states, server-side data validation, CORS support, and JSON persistence.

---

## Architecture Overview

```text
Portfolio Application
├── Frontend (React + Vite) [Port 5173]
│   ├── src/pages/Projects.jsx (fetches GET /api/projects via useEffect)
│   ├── src/pages/ProjectDetails.jsx (fetches GET /api/projects/:id via useEffect)
│   └── src/components/ContactForm.jsx (posts POST /api/contact)
│
└── Backend (Node.js + Express) [Port 5000 in /server]
    ├── index.js (REST API, validation, CORS, centralized error handling)
    ├── data/projects.json (JSON storage for projects)
    └── data/contactSubmissions.json (JSON file persistence for contact form)
```

---

## Setup & Run Instructions

To run the application locally, you must start both the Express backend server and the React frontend development server in separate terminal windows.

### 1. Start Backend Express Server
```bash
cd server
npm install
npm start
# Server will start on http://localhost:5000
```
*Alternatively, run `npm run dev` inside `/server` to start with auto-reload.*

### 2. Start Frontend React Application
Open a new terminal window at the project root directory:
```bash
npm install
npm run dev
# Frontend will start on http://localhost:5173
```

---

## Environment Configuration

Both backend and frontend use environment variables for configurable settings. Sample `.env.example` files are provided in both directories.

### Backend Environment Variables (`/server/.env.example`)
```env
# Server Port
PORT=5000

# Allowed Frontend Origin for CORS
ALLOWED_ORIGIN=http://localhost:5173
```

### Frontend Environment Variables (`/.env.example`)
```env
# Frontend API Base URL
VITE_API_URL=http://localhost:5000
```

*Note: Environment variable files (`.env`) are excluded from Git commits via `.gitignore`.*

---

## Data Storage Strategy

Contact form submissions are stored server-side using a **JSON File Persistence Model** backed up by `server/data/contactSubmissions.json`. Every valid submission submitted via the contact form or REST API is saved with a unique timestamp ID and appended to the JSON storage file.

---

## REST API Endpoints (B1 – B7)

> **Open Verification Endpoint Notice**: The `GET /api/contact` endpoint is intentionally open (unauthenticated) for evaluation and verification purposes to allow inspectability of form submissions.

| Method | Endpoint | Description | Expected Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API Health Check | `200 OK` |
| `GET` | `/api/projects` | List all projects | `200 OK` |
| `GET` | `/api/projects/:id` | Get single project by ID | `200 OK` / `404 Not Found` |
| `POST` | `/api/contact` | Submit contact form data | `201 Created` / `400 Bad Request` |
| `GET` | `/api/contact` | List stored contact submissions | `200 OK` |
| `GET` | `/api/*` | Undefined routes (Catch-all 404) | `404 Not Found` |

---

### API Request & Response Examples

#### 1. Health Check (`GET /`)
- **Request**: `GET http://localhost:5000/`
- **Response** (`200 OK`):
```json
{
  "status": "ok"
}
```

#### 2. Get All Projects (`GET /api/projects`)
- **Request**: `GET http://localhost:5000/api/projects`
- **Response** (`200 OK`):
```json
[
  {
    "id": "truthlens",
    "title": "TruthLens",
    "description": "An AI-powered fake review detection system...",
    "techStack": ["Python", "Flask", "HTML", "CSS", "OCR", "Scikit-learn"],
    "image": "",
    "link": "https://github.com/tanmayeepullangari/TruthLens",
    "details": "TruthLens combines Machine Learning, OCR, and Natural Language Processing..."
  }
]
```

#### 3. Get Single Project - Success (`GET /api/projects/truthlens`)
- **Request**: `GET http://localhost:5000/api/projects/truthlens`
- **Response** (`200 OK`):
```json
{
  "id": "truthlens",
  "title": "TruthLens",
  "description": "An AI-powered fake review detection system...",
  "techStack": ["Python", "Flask", "HTML", "CSS", "OCR", "Scikit-learn"],
  "image": "",
  "link": "https://github.com/tanmayeepullangari/TruthLens",
  "details": "TruthLens combines Machine Learning..."
}
```

#### 4. Get Single Project - 404 Not Found (`GET /api/projects/invalid-id`)
- **Request**: `GET http://localhost:5000/api/projects/invalid-id`
- **Response** (`404 Not Found`):
```json
{
  "error": "Project not found"
}
```

#### 5. Submit Contact Form - Success (`POST /api/contact`)
- **Request**: `POST http://localhost:5000/api/contact`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "name": "Tanmayee",
  "email": "tanmayee@example.com",
  "message": "Hello, I am interested in collaborating!"
}
```
- **Response** (`201 Created`):
```json
{
  "message": "Contact submission received successfully",
  "submission": {
    "id": "1787936382172",
    "name": "Tanmayee",
    "email": "tanmayee@example.com",
    "message": "Hello, I am interested in collaborating!",
    "createdAt": "2026-08-28T16:59:42.172Z"
  }
}
```

#### 6. Submit Contact Form - Validation Error (`POST /api/contact`)
- **Request**: `POST http://localhost:5000/api/contact`
- **Body**:
```json
{
  "name": "Tanmayee",
  "email": "invalidemailformat",
  "message": ""
}
```
- **Response** (`400 Bad Request`):
```json
{
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format. Email must contain '@' and a valid domain.",
    "message": "Message is required."
  }
}
```

#### 7. List Submissions (`GET /api/contact`)
- **Request**: `GET http://localhost:5000/api/contact`
- **Response** (`200 OK`):
```json
[
  {
    "id": "1787936382172",
    "name": "Tanmayee",
    "email": "tanmayee@example.com",
    "message": "Hello, I am interested in collaborating!",
    "createdAt": "2026-08-28T16:59:42.172Z"
  }
]
```

#### 8. Centralized 404 Catch-All Handler (`GET /api/undefined-route`)
- **Request**: `GET http://localhost:5000/api/doesnotexist`
- **Response** (`404 Not Found`):
```json
{
  "error": "Route not found"
}
```

---

## cURL Commands for Testing

```bash
# B1: Health Check
curl -X GET http://localhost:5000/

# B2: Get All Projects
curl -X GET http://localhost:5000/api/projects

# B3: Get Single Project (Valid)
curl -X GET http://localhost:5000/api/projects/truthlens

# B3: Get Single Project (404 Error Case)
curl -X GET http://localhost:5000/api/projects/nonexistent

# B4: Valid Contact Submission (201 Created)
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "email": "alice@example.com", "message": "Great work!"}'

# B4: Invalid Contact Submission - Missing Fields (400 Bad Request)
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice"}'

# B4: Invalid Contact Submission - Bad Email (400 Bad Request)
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "email": "invalidemail", "message": "Hi"}'

# B5: List Submissions (Verification Endpoint)
curl -X GET http://localhost:5000/api/contact

# B6: Undefined Route (404 Handler)
curl -X GET http://localhost:5000/api/undefined-route
```

---

## Postman Collection

An exported Postman Collection v2.1 is included in the project root:
- File: [`portfolio_api.postman_collection.json`](portfolio_api.postman_collection.json)

To import into Postman:
1. Open Postman -> Click **Import**.
2. Select `portfolio_api.postman_collection.json`.
3. Set collection environment variable `baseUrl` to `http://localhost:5000`.

---

## Video Demo Requirements Checklist

The screen recording demonstrates the following core flows:
1. **Projects Page Loading Data**: Projects section fetching live data from Express API with loading spinner.
2. **Deep Link Details Page**: Navigating directly to `/projects/truthlens` and loading individual project object.
3. **Contact Form Submission**: Submitting valid data to `POST /api/contact`, receiving confirmation, and verifying via `GET /api/contact`.
4. **Frontend Error State**: Stopping Express server (`Ctrl+C`), refreshing Projects page to display connection error banner with Retry button, then restarting backend to demonstrate recovery.

---

## Video Recording Link
https://drive.google.com/file/d/1qsQ6F1-IXXiFq6r19SCQ0gOEcHUd39LC/view