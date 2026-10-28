# AI Interview

A small full-stack app that helps you get ready for a job interview. Paste a job description, upload your resume, and get a personal prep plan: the questions you're likely to be asked, how to answer them, where your skills fall short, and a day-by-day plan to get ready. It can also write a version of your resume tailored to the job.

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
