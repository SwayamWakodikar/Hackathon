# Vplace: AI-Powered Career Suite

Vplace is a comprehensive AI-powered platform designed to empower job seekers through intelligent resume generation, ATS optimization, and interview preparation. Built using a modern, scalable tech stack, Vplace provides a seamless experience for creating professional career assets.

---

## 🛠 Tech Stack

### Frontend & Core
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI & Styling:** Tailwind CSS 4, Radix UI, Lucide React
- **Animations:** Motion, OGL

### Backend & AI
- **AI Engine:** OpenRouter API (`google/gemma-3-27b-it:free`)
- **Database:** Firebase Firestore
- **Authentication:** NextAuth.js (Google Provider)

---

## 📂 Folder Structure

```plaintext
Hackathon/
├── app/                      # Next.js App Router
│   ├── (auth)/               # Authentication layouts and pages
│   ├── api/                  # API Routes (Auth, Resume Generation)
│   ├── resume/               # Resume building and ATS modules
│   ├── trainer/              # AI Interview and Mock Test modules
│   └── layout.tsx            # Global layout configuration
├── components/               # Reusable React components
│   ├── ATS/                  # ATS tracking components
│   ├── Anime/                # Animation components
│   ├── Dashboard/            # User dashboard UI
│   ├── Pages/                # High-level page components
│   └── ui/                   # Shared UI primitives
├── lib/                      # Utility functions and configurations
│   ├── firebase.ts           # Firebase initialization
│   ├── resume-generator.ts   # AI resume generation logic
│   └── utils.ts              # Common helper utilities
├── public/                   # Static assets (SVGs, favicons)
└── package.json              # Project dependencies and scripts
```
## ✨ Key Features
AI Resume Generator
Transforms raw user inputs or existing resume content into professionally structured, markdown-formatted resumes using large language models.
ATS Optimization
Improves resume structure, keyword alignment, and formatting to increase compatibility with Applicant Tracking Systems.
AI Interview Simulator (Coming Soon)
An intelligent interview preparation module for practicing technical and behavioral interview rounds.
Secure Cloud Storage
All user data and generated resumes are securely stored in Firebase Firestore and linked to authenticated Google accounts.
## 🚀 Getting Started
1. Prerequisites
Ensure the following are installed:
Node.js
```
npm or yarn
```
3. Installation
Copy code
Bash
```
npm install
```
or
Copy code
Bash
```
yarn install
```
5. Run Development Server
Copy code
Bash
```
npm run dev
```
or
Copy code
Bash
```
yarn dev
```
Open http://localhost:3000 in your browser to view the application.


## 👥 Team Members
### Swayam Wakodikar – Frontend Developer
### Krish Patel – UI/UX Designer
### Aryan Vishwakarma – Backend Developer
### Vedant Harane – Database Administrator
📄 License
© 2026 Vplace. All rights reserved.
