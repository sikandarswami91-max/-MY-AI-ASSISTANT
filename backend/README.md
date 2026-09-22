# NOVA AI Assistant - Backend API

Production-grade Express + TypeScript + MongoDB backend architecture for the NOVA AI Virtual Assistant platform.

## Architecture

```text
backend/
├── src/
│   ├── config/          # Database connection and environment config
│   ├── controllers/     # Express route handlers
│   ├── middleware/      # Auth, error handling, Zod validation, file uploads
│   ├── models/          # Mongoose MongoDB data schemas
│   ├── routes/          # RESTful endpoint definitions
│   ├── services/        # Business logic & modular AI service pipelines
│   ├── types/           # TypeScript interfaces & custom express declarations
│   ├── utils/           # JWT, responses, async wrappers, logger
│   ├── app.ts           # Express application configuration
│   └── server.ts        # Server entry point
├── .env.example         # Environment template
├── package.json
└── tsconfig.json
```

## Features

- **Authentication & Security:** JWT authentication, bcrypt password hashing, HTTP header hardening via Helmet, CORS configuration, centralized error handling, and request rate limiting.
- **Data Models:** User, Chat, Message, ChatHistory, Note, Task, Reminder, UploadedFile, UserSettings, AICharacter.
- **AI Service Pipeline:** Modular service adapters for Text generation, Voice/STT/TTS, Vision, OCR, PDF processing, Web Search, Weather, Calculator, Developer Mode, Study Mode, and AI Memory.
- **Health Check:** `GET /api/health` providing database status, server uptime, and timestamp.

## Getting Started

1. **Install Dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment:**
   ```bash
   cp .env.example .env
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

4. **Build & Production:**
   ```bash
   npm run build
   npm start
   ```
