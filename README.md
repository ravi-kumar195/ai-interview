AI Interview
A small full-stack app that helps you get ready for a job interview. Paste a job description, upload your resume, and get a personal prep plan: the questions you're likely to be asked, how to answer them, where your skills fall short, and a day-by-day plan to get ready. It can also write a version of your resume tailored to the job.
What it does
Sign up and log in, so your plans are saved to your account.
Generate an interview plan from a job description and your resume (PDF). You can add a short note about yourself for extra context.
Each plan includes:
a match score (0-100%) for the role
technical questions
behavioral questions
for every question, why the interviewer asks it and how to answer it
skill gaps, marked low, medium or high
a day-by-day preparation roadmap
Past plans show up on the home page, so you can open them again anytime.
Download a tailored resume as a PDF for the job you're aiming at.
How it works
You upload your resume and paste the job description.
The backend reads the text out of your PDF.
That text, the job description and your note go to Google Gemini, which sends back a structured report.
The report is saved in MongoDB under your account and shown on the interview page.
For the resume download, Gemini writes the resume as HTML and Puppeteer turns it into an A4 PDF.
Part
Tools
Tech stack
Frontend
React 19, Vite, React Router, Axios, Sass
Backend
Node.js, Express 5, MongoDB with Mongoose
Auth
JWT stored in a cookie, bcryptjs for passwords
Files and PDFs
Multer (uploads), pdf-parse (reading resumes), Puppeteer (making PDFs)
AI
Google Gemini via @google/genai
