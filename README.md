# Englicious — Modern Interactive English Learning & Exam Prep Platform

An interactive English learning product for web, tablet, and mobile. Designed for learners from beginner to advanced (CEFR A1–C2) and test-takers preparing for **TOEFL**, **IELTS**, and **TOEIC**.

Built with **React 18**, **TypeScript**, **Tailwind CSS**, and browser-native **Web Audio API** and **Web Speech API**.

---

## ✨ Key Features & Architecture

### 1. Core Learning Flow
`Learn` → `Practice` → `Master` → `Track Progress`
- **Levels:** Beginner (A1–A2), Intermediate (B1–B2), Advanced (C1–C2)
- **Skills:** Vocabulary, Grammar, Listening, Reading, Speaking, Writing
- **Standardized Exam Prep:** TOEFL iBT, IELTS Academic & General, TOEIC Listening & Reading

### 2. Interactive Activities Engine (`src/components/activities/`)
- 🃏 **Flashcards:** 3D flip card, IPA phonetics, audio pronunciation, usage notes, and *Still Learning* vs *Known* tracking.
- 🧩 **Drag & Drop / Sentence Builder:** Scrambled token ordering (`[ yesterday ] [ school ] [ went ] [ I ] [ to ]` → `"I went to school yesterday"`), touch-friendly slotting and instant feedback.
- 🔗 **Matching Pairs:** Word-to-definition interactive connector with instant confirmation and streak feedback.
- ✏️ **Fill in the Blank:** Grammatical slotting with instant explanations and speech synthesis.
- 🎧 **Listening Player with Waveform:** Dynamic audio visualizer, speed controls (0.75x, 1.0x, 1.25x), replay controls, and speech synthesis playback.
- 🔀 **Listen & Arrange:** Audio clip playback with tokenized word sequence assembly.
- 📖 **Distraction-Free Reading:** Clickable interactive vocabulary words with popover definitions, IPA phonetics, audio pronunciation, and a sentence highlighter tool.
- 🎙️ **Speaking Practice:** Native reference audio, microphone recording simulation, and pronunciation fluency scoring.

### 3. Exam Preparation Simulator (`src/components/ExamPrep.tsx`)
- Dedicated sections for **IELTS**, **TOEFL**, and **TOEIC** with scoring guidelines, section breakdowns, and test strategies.
- **Realistic Mock Exam Environment:**
  - Countdown exam timer (with pause/resume)
  - Question Navigator Drawer (Answered, Unanswered, Marked for Review)
  - Flag for review toggle
  - Previous / Next controls
  - Split-screen reading passages and audio prompts
- **Post-Test Diagnostic Report:**
  - Scaled scores (e.g. IELTS Band 8.0, TOEFL 104/120, TOEIC 880/990)
  - Accuracy % and time breakdown
  - Identified **Strong Areas** & **Weak Areas**
  - Tailored recommended lessons

### 4. Personalized Dashboard & Progress (`src/components/Dashboard.tsx` & `ProgressDashboard.tsx`)
- Dynamic greeting based on user time of day (`Good evening, Sultan 👋`)
- Current CEFR level, Daily Goal, Total XP, and Streak
- **Continue Learning** hero card (e.g., *Intermediate Grammar: Simple Past Tense 72%*)
- **Your Weak Areas** smart insight card with instant 1-click drill launch
- **Recommended for You** flexible horizontal course list
- CEFR A1 → C2 milestone bar, 6-skill breakdown metrics, 7-day weekly activity chart, and unlocked achievement badges.

### 5. Onboarding & Placement Flow (`src/components/OnboardingModal.tsx`)
- 3-step personalization (Level, Goal, Skill Focus)
- Optional 3-question adaptive Placement Test
- Instant assessment result: *"Your estimated level is B1 — Intermediate"* and custom learning roadmap.

### 6. Zero External Asset Sound System (`src/utils/sound.ts`)
- Pure browser **Web Audio API** synthesizer generating harmonic success chimes, gentle error bumps, XP dings, and triumphant completion fanfares.
- Sound effect toggle in top navigation.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

