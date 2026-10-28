# AI Interview

A small full-stack app that helps you get ready for a job interview. Paste a job description, upload your resume, and get a personal prep plan: the questions you're likely to be asked, how to answer them, where your skills fall short, and a day-by-day plan to get ready. It can also write a version of your resume tailored to the job.

**Live demo:** https://ai-interview-three-lime.vercel.app

## What it does

- **Sign up and log in**, so your plans are saved to your account.
- **Generate an interview plan** from a job description and your resume (PDF). You can add a short note about yourself for extra context.
- **Each plan includes:**
  - a match score (0-100%) for the role
  - technical questions
  - behavioral questions
  - for every question, why the interviewer asks it and how to answer it
  - skill gaps, marked low, medium or high
  - a day-by-day preparation roadmap
- **Past plans** show up on the home page, so you can open them again anytime.
- **Download a tailored resume** as a PDF for the job you're aiming at.

## How it works

1. You upload your resume and paste the job description.
2. The backend reads the text out of your PDF.
3. That text, the job description and your note go to Google Gemini, which sends back a structured report.
4. The report is saved in MongoDB under your account and shown on the interview page.
5. For the resume download, Gemini writes the resume as HTML and Puppeteer turns it into an A4 PDF.

## Tech stack

| Part | Tools |
| --- | --- |
| Frontend | React 19, Vite, React Router, Axios, Sass |
| Backend | Node.js, Express 5, MongoDB with Mongoose |
| Auth | JWT stored in a cookie, bcryptjs for passwords |
| Files and PDFs | Multer (uploads), pdf-parse (reading resumes), Puppeteer (making PDFs) |
| AI | Google Gemini via `@google/genai` |

## Getting started

### What you need

- Node.js 22.12 or newer
- A MongoDB database (local or MongoDB Atlas)
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

### 1. Clone the repo

```bash
git clone https://github.com/ravi-kumar195/ai-interview.git
cd ai-interview
```

### 2. Set up the backend

```bash
cd BACKEND
npm install
```

Create a file called `.env` inside the `BACKEND` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_secret
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

Start it:

```bash
npm run dev
```

The API runs on http://localhost:3000. If you don't want auto-restart, `npm start` works too.

> Puppeteer downloads its own copy of Chrome during install, so the first `npm install` can take a minute.

### 3. Set up the frontend

Open a second terminal:

```bash
cd FRONTEND
npm install
```

Create a file called `.env` inside the `FRONTEND` folder:

```env
VITE_API_URL=http://localhost:3000
```

Start it:

```bash
npm run dev
```

Open http://localhost:5173, create an account, and you're in.

## API

Every route starts with `/api`. Routes that need login check the token cookie that is set when you register or log in.

| Method | Route | Login needed | What it does |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | No | Create an account (`username`, `email`, `password`) |
| POST | `/api/auth/login` | No | Log in with `email` and `password` |
| GET | `/api/auth/logout` | No | Log out and invalidate the token |
| GET | `/api/auth/get-me` | Yes | Get the logged-in user |
| POST | `/api/interview` | Yes | Generate a report (form-data: `resume` PDF, `jobDescription`, `selfDescription`) |
| GET | `/api/interview` | Yes | List your past reports |
| GET | `/api/interview/report/:interviewId` | Yes | Get one full report |
| POST | `/api/interview/resume/pdf/:interviewId` | Yes | Get a tailored resume PDF for that report |

## Project structure

```
ai-interview/
├── BACKEND/
│   ├── server.js               # starts the server
│   ├── services/
│   │   └── ai.service.js       # talks to Gemini, builds the resume PDF
│   └── src/
│       ├── app.js              # Express app, CORS and routes
│       ├── config/             # database connection
│       ├── controllers/        # auth and interview logic
│       ├── middlewares/        # login check, file upload
│       ├── models/             # user, blacklisted tokens, interview reports
│       └── routes/             # /api/auth and /api/interview
└── FRONTEND/
    └── src/
        ├── app.routes.jsx      # page routes
        ├── features/
        │   ├── auth/           # login, register, protected pages
        │   └── interview/      # create-a-plan page and report page
        └── styles/             # shared styles
```

## Good to know

- **Resume:** it has to be a PDF, up to 3 MB.
- **Job description:** the form accepts up to 5,000 characters.
- **CORS:** the backend only accepts requests from `http://localhost:5173` and the deployed frontend. If you run the frontend somewhere else, add that address in `BACKEND/src/app.js`.
- **AI model:** it's set in `BACKEND/services/ai.service.js` if you want to swap it.
- **Take the answers as a starting point.** They're written by an AI, so double-check anything before relying on it in a real interview.

## Author

Built by [ravi-kumar195](https://github.com/ravi-kumar195).
