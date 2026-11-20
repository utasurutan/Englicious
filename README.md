# Englicious — Modern Interactive English Learning & Exam Prep Platform

[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-3D_Graphics-black?logo=three.js&logoColor=white)](https://threejs.org/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio_API-Synthesized_FX-orange)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![CEFR Standard](https://img.shields.io/badge/Curriculum-CEFR_A1--C2-success)](https://www.coe.int/en/web/common-european-framework-reference-languages)

**Englicious** is a web-based multimedia interactive learning platform (*Media Pembelajaran Interaktif / MPI*) engineered for high school, university students, and test-takers preparing for **TOEFL iBT**, **IELTS Academic**, and **TOEIC**.

Designed with a sleek desktop/tablet-first layout, rich 3D spatial models, browser-native audio synthesis, full CBT exam simulations, and official curriculum grading instruments.

---

## ✨ Key Features & Architecture

```
                                  ENGLICIOUS PLATFORM
   ┌───────────────────────────────────────┬───────────────────────────────────────┐
   │          CORE LEARNING FLOW           │           EXAM PREP CENTER            │
   │  CEFR A1–A2 · B1–B2 · C1–C2 Levels    │      IELTS · TOEFL iBT · TOEIC        │
   │  Sequential Prerequisite Mastery Path │  Full CBT Exam 1 & 2 (Official Specs) │
   │  Theory PDF Viewer & 20+ Drills/Stage │  Sectional Labs (Listen, Read, Write) │
   └───────────────────────────────────────┴───────────────────────────────────────┘
                                           │
   ┌───────────────────────────────────────┴───────────────────────────────────────┐
   │                  SPECIALIZED INTERACTIVE PRACTICE STUDIOS                     │
   │   3D Spatial Lab    ·   Writing Lab Band 9.0   ·   Speaking AI Partner        │
   │   Dictation Studio  ·   Leitner SRS Flashcards ·   Speed Challenge Blitz      │
   └───────────────────────────────────────────────────────────────────────────────┘
```

### 1. Sequential Learning Path & CEFR Mastery
* **Curriculum Standard:** Aligned with Kurikulum Merdeka & CEFR (Common European Framework of Reference for Languages) from Beginner (A1–A2), Intermediate (B1–B2), through Advanced (C1–C2).
* **Sequential Prerequisite Locking:** Stages must be mastered in order (`70% passing threshold`). Advanced stages remain locked until foundational stages are verified.
* **Theory Modules & PDF Viewer:** Each stage includes formal grammatical rule summaries, downloadable syllabus reference sheets, and 20+ graded practice questions per section.
* **Lembar Penilaian Guru (Grade Report):** Teacher-facing grade dashboard generating official report cards with competency indicators (Capaian Pembelajaran / CP & TP).

### 2. Standardized Exam Mockup Center (`ExamPrep.tsx`)
* **Dual Simulation Modes:**
  * 🏆 **Full Mockup Test (Bener-Bener Test CBT):**
    * Complete full-length exam simulations (25 minutes, 22 authentic questions combining Listening audio clips + Academic Reading passages).
    * Dual packages per test: **Set 1 (Official Standard)** and **Set 2 (Advanced High-Band Challenge)**.
    * Question Navigator drawer (1–22), *Mark for Review* flags, and strict exam countdown timer.
    * Formal **TRF Certificate (Test Report Form)** with scaled scores (Band 0–9.0, 0–120, 10–990) and printable report cards.
  * 🎯 **Latihan Per Seksi (Sectional Skill Labs):**
    * 🎧 **Khusus Listening Mockup:** Native speaker audio clips, telephone booking forms, facility tours, research tutorials, and lectures.
    * 📖 **Khusus Reading Mockup:** Academic scientific journals, historical archaeology texts, True/False/Not Given drills, and main idea matching.
    * ✍️ **Khusus Writing Mockup:** Timed essay simulator with live word counter, criterion diagnostic (TR, CC, LR, GRA), and Band 9.0 model benchmarks.
    * 🎙️ **Khusus Speaking Mockup:** 3-part oral interview with AI examiner voice, preparation countdown, response timer, and evaluation rubrics.
    * ⚡ **Khusus Grammar Sprint:** Fast-paced commercial grammar drill for TOEIC Part 5.
* **Pre-Exam Candidate Check-in:** Equipment verification modal featuring an interactive headset sound check before test access.

### 3. 3D Spatial Models & Interactive 3D Spelling Studio (`ObjectViewer3D.tsx`)
* Real-time 3D model visualization powered by **Three.js** with ambient lighting, orbital rotation controls, and material shading.
* Interactive 3D spelling challenge where students assemble object names letter-by-letter with audio pronunciation.

### 4. Dedicated Practice Studios
* ✍️ **Writing Lab & Essay Evaluator (`WritingLab.tsx`):**
  * Real-time word counter, character counter, time tracking, and automated rubric diagnostics for Lexical Resource (AWL) and Coherence.
* 🗣️ **AI Roleplay Speaking Partner (`SpeakingRoleplay.tsx`):**
  * Interactive turn-based dialogue with native voice synthesis across real-world situations (Coffee Shop, Job Interview, Academic Debate).
* 🗂️ **Vocab Mastery & Spaced Repetition (`VocabSRSDeck.tsx`):**
  * Leitner Box Spaced Repetition System with 3D card flipping, IPA phonetics, and recall ratings.
* 🎧 **Listening Lab & Dictation Studio (`ListeningLab.tsx`):**
  * Waveform playback visualizer, multi-speed playback (0.75x, 1.0x, 1.25x), and live transcription evaluation.
* ⚡ **Speed Challenge Mini-Game (`SpeedChallenge.tsx`):**
  * 60-second fast-paced blitz testing vocabulary, collocations, and inversion structures with combo multipliers.

### 5. Native Audio Synthesis (`src/utils/sound.ts` & `src/utils/speech.ts`)
* Zero external audio files: synthesized on-the-fly using browser **Web Audio API** (harmonic success chimes, dings, countdown alerts).
* Native **Web Speech API** integration for authentic British, American, and Australian pronunciation.

---

## 🛠️ Tech Stack & Directory Structure

```
Englicious/
├── src/
│   ├── components/
│   │   ├── activities/           # Interactive quiz components (Drag & drop, Matching, Fill-in-blank)
│   │   ├── ExamPrep.tsx          # Full CBT & Sectional Exam Simulation Center
│   │   ├── LearningPath.tsx      # Sequential CEFR curriculum progression map
│   │   ├── ObjectViewer3D.tsx    # Three.js 3D model viewer and spelling lab
│   │   ├── TheoryViewerModal.tsx # PDF & lesson theory reader
│   │   ├── GradeReportModal.tsx  # Teacher assessment & grade report card
│   │   ├── PreferencesModal.tsx  # Onboarding learner preferences
│   │   ├── WritingLab.tsx        # Essay editor & automated band scorer
│   │   ├── SpeakingRoleplay.tsx  # AI conversation partner
│   │   ├── VocabSRSDeck.tsx      # Leitner spaced repetition flashcards
│   │   └── SpeedChallenge.tsx    # 60s rapid vocabulary blitz
│   ├── data/
│   │   ├── examPrep.ts           # 66+ authentic exam questions, catalog, writing & speaking mocks
│   │   ├── lessons.ts            # CEFR stages, vocabulary bank, and exercise items
│   │   └── vocabulary.ts         # Academic Word List and thematic decks
│   ├── utils/
│   │   ├── sound.ts              # Web Audio API synthesizers
│   │   └── speech.ts             # Web Speech API speech synthesis service
│   ├── types.ts                  # Comprehensive TypeScript interface definitions
│   └── App.tsx                   # Main application layout and active view router
├── tailwind.config.js            # Custom design tokens, soft shadows, and color palette
└── vite.config.ts                # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: Version 18.x or later
* **npm**: Version 9.x or later

### Installation & Development
```bash
# Clone the repository
git clone https://github.com/utasurutan/Englicious.git
cd Englicious

# Install dependencies
npm install

# Start development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
# Type-check and bundle production assets
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License & Attribution
Designed and developed by **Sultan** as a comprehensive Web-Based Interactive Learning Media (*Media Pembelajaran Interaktif - MPI*). All standardized exam names (TOEFL, IELTS, TOEIC) are trademarks of their respective owners and used strictly for academic preparation purposes.
