![Dockerized](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)
![License](https://img.shields.io/badge/License-MIT-green)
![Made with Node.js](https://img.shields.io/badge/Backend-Node.js-informational?logo=node.js)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue?logo=react)
![Database](https://img.shields.io/badge/SQLite-lightgrey?logo=sqlite)
![Production](https://img.shields.io/badge/Production-Ready-brightgreen?style=flat-square&logo=vercel)
# Courier Tracking System

A full-stack **Courier Tracking System** built with **Node.js (Express)** for backend and **React (TypeScript + Vite)** for frontend. Authenticated users can add, view, and track packages, with real-time status updates and a modern dashboard. Now fully Dockerized for production or local deployment.


## ✨ Features

- 🔐 JWT-based User Auth (Register/Login)
- 📦 Add, Delete, Update Courier Status
- 🔍 Track Courier by Tracking ID
- 📨 View Sent and Received Couriers
- 📊 Admin Panel (All Couriers + Activity)
- 🧑‍💼 Profile View & Edit
- 🐳 Docker + Docker Compose Support
- 💅 Tailwind CSS-powered Responsive UI


## 🧱 Tech Stack

| Layer     | Tech                                |
|----------:|--------------------------------------|
| Frontend  | React + Vite + TypeScript + Tailwind |
| Backend   | Node.js + Express.js                 |
| Database  | SQLite (via better-sqlite3)          |
| Auth      | JWT                                  |
| Deployment| Docker + Docker Compose              |

## 🐳 Docker Setup (Recommended)

## 1️⃣ Build & Run with Docker Compose
```
docker compose up --build
```

This will:

- Build both frontend and backend images

- Run them in isolated containers

- Backend available at http://localhost:4300

- Frontend available at http://localhost:5173

## 2️⃣ File Structure for Docker
```
.
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   └── .env
└── frontend/
    ├── Dockerfile
    └── .env
```

## 3️⃣ Environment Variables
Backend .env
```
PORT=4300
JWT_SECRET=secrethere
```
Frontend .env
```
VITE_API_BASE_URL=http://localhost:4300
```


## 🚀 Local Development Setup (Non-Docker)
🛠️ Backend
```
cd backend
npm install
npm start
```
Runs on http://localhost:4300

🌐 Frontend
```
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173

## 🔐 API Overview
👤 User Routes
```
Method	     Endpoint	        Description
POST	/api/v1/user/register	Register a new user
POST	/api/v1/user/login	    User login
GET	    /api/v1/user/info	    Get profile
PUT	    /api/v1/user/edit	    Edit profile
```

📦 Courier Routes
```
Method	     Endpoint	             Description
POST	/api/v1/courier/create	     Add a new courier
GET	    /api/v1/courier/all	         View all couriers (admin)
GET	    /api/v1/courier/sent	     Couriers sent by user
GET	    /api/v1/courier/received	 Couriers received by user
GET	    /api/v1/courier/recent	     Recent courier activity
GET	    /api/v1/courier/:id	         Get courier by tracking ID
PUT	    /api/v1/courier/:id/status	 Update courier status
DELETE	/api/v1/courier/:id	         Delete courier
```

🔐 All /courier/* and GET /user/info routes require JWT in Authorization header.

## 🧠 JWT Auth Flow

- On login, backend returns a signed JWT token.

- Frontend stores it in localStorage under key token.

- Protected requests must include this in headers:

Authorization: <token>

Middleware (isauthenticated) validates token.

## Folder Structure
```
backend/
├── app.js
├── courier.db
├── controllers/
│ ├── Courier.controller.js
│ └── User.controller.js
├── database/
│ └── db.js
├── middlewares/
│ └── isauthenticated.js
├── routes/
│ ├── Courier.routes.js
│ └── User.routes.js
├── utils/
│ ├── ApiError.js
│ ├── ApiResponse.js
│ └── ValidateBody.js
├── package.json
└── package-lock.json
```
```
frontend/
├── src/
│ ├── Components/
│ │ ├── AddCourier.tsx
│ │ ├── TrackCourier.tsx
│ │ ├── Dashboard.tsx
│ │ └── ...other components
│ ├── App.tsx
│ ├── main.tsx
│ ├── index.css
│ └── vite-env.d.ts
├── public/
│ └── vite.svg
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 📝 License

- This project is licensed under the MIT License.

