# 🎯 SkillGap AI — Skill Navigator

> An AI-powered skill gap analyzer built for the **Innovex Hackathon**. Enter your current skills and target role — get a personalized roadmap, missing skills list, and portfolio project ideas powered by **Google Gemini AI**.

---

## ✨ Features

- 🤖 **AI Skill Analysis** — Gemini 1.5 Flash analyzes your profile and generates a real skill gap report
- 📊 **Match Score** — See how well your current skills match your target role
- 🗺️ **Learning Roadmap** — Ordered, step-by-step learning plan from foundational to advanced
- 💡 **Project Suggestions** — Concrete portfolio project ideas tailored to your target role
- 🔐 **Authentication** — Email/password and Google sign-in via Firebase Auth
- 👤 **User Profiles** — Save your LinkedIn URL, target role, and full name
- 📱 **Responsive Design** — Liquid glass UI built with Tailwind CSS + Framer Motion
- 🏠 **Smart Home Route** — Dashboard for logged-in users, landing page for guests

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + Framer Motion |
| UI Components | Radix UI + shadcn/ui |
| Auth & Database | Firebase Auth + Firestore |
| AI | Google Gemini 1.5 Flash (`@google/generative-ai`) |
| Routing | React Router v6 |
| Deployment | Vercel |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/inxane-rudrakxh/skill-navigator
cd skill-navigator
npm install
```

### 2. Set Up Firebase

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Email/Password** and **Google** sign-in (Authentication → Sign-in method)
3. Create a **Firestore** database
4. Add Firestore security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /profiles/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

### 3. Get a Gemini API Key

Get a free key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

### 4. Configure Environment

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

VITE_GEMINI_API_KEY=your-gemini-api-key
```

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── HeroSection.tsx  # Landing page hero (auth-aware CTA)
│   ├── Dashboard.tsx    # Results display
│   ├── SkillForm.tsx    # Skill input form
│   └── Navbar.tsx       # Navigation bar
├── contexts/
│   └── AuthContext.tsx  # Firebase auth state + profile
├── integrations/
│   ├── firebase/        # Firebase client (auth + firestore)
│   └── gemini/          # Gemini AI service
├── pages/
│   ├── Home.tsx         # Landing page (guests only)
│   ├── Analyzer.tsx     # Skill analyzer (calls Gemini)
│   ├── Results.tsx      # AI results display
│   ├── DashboardPage.tsx# User dashboard (logged-in only)
│   ├── Login.tsx        # Sign in
│   ├── Register.tsx     # Sign up
│   ├── Profile.tsx      # Edit profile
│   └── Settings.tsx     # Account settings
└── App.tsx              # Routes + auth-aware home route
```

---

## ☁️ Deploy to Vercel

```bash
git push origin main
```

Then import the repo on [vercel.com](https://vercel.com) and add all `VITE_*` environment variables in **Project Settings → Environment Variables**.

After deployment, add your Vercel domain to **Firebase Console → Authentication → Authorized domains**.

---

## 👨‍💻 Built by

[@inxane-rudrakxh](https://github.com/inxane-rudrakxh) — Innovex Hackathon 2026
