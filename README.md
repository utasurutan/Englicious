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

### 2. Dedicated Practice Studios
- ✍️ **Writing Lab & Essay Evaluator (`WritingLab.tsx`):**
  - Prompt bank for IELTS Writing Task 1, IELTS Task 2, and TOEFL Academic Discussion.
  - Real-time word counter, character counter, and time tracking.
  - Automated rubric diagnostic: Lexical Resource (Academic Word List), Coherence & Cohesion (discourse transitions), and Grammatical Range with estimated Band Score (Band 5.5 to 8.5).
  - Band 9.0 sample model answers with 1-click clipboard copy.
- 🗣️ **AI Roleplay Speaking Partner (`SpeakingRoleplay.tsx`):**
  - Interactive turn-based dialogue with native audio playback across scenarios:
    - *Ordering at a London Coffee Shop* (A2–B1)
    - *Tech Job Interview with Talent Partner* (B2)
    - *IELTS Speaking Part 3: University Academic Debate* (C1)
  - Speech Recognition via Web Speech API and text fallback with native phrasing tips.
- 🗂️ **Vocab Mastery & Spaced Repetition (`VocabSRSDeck.tsx`):**
  - Leitner Box SRS (Box 1: New, Box 2: Learning, Box 3: Review, Box 4: Mastered).
  - Thematic Decks: *Academic Word List (AWL)*, *Oxford 3000 Core*, *Business & Corporate*, *Phrasal Verbs & Idioms*.
  - 3D card flip with IPA phonetics, audio pronunciation, collocations, and recall rating buttons (`Again`, `Hard`, `Good`, `Easy`).
- 🎧 **Listening Lab & Dictation Studio (`ListeningLab.tsx`):**
  - Audio waveform visualizer, speed controls (0.75x, 1.0x, 1.25x), and live dictation transcription scoring.
- 📖 **Academic Reading Studio (`ReadingLab.tsx`):**
  - Distraction-free typography with font-size controls, theme contrast modes (Clean, Warm Sepia, Soft Dark), interactive vocabulary drawer, and sentence highlighter.

### 3. Gamification, Quizzes & Interactive Exercises
- ⚡ **60-Second Speed Drill Mini-Game (`SpeedChallenge.tsx`):**
  - Rapid-fire blitz with vocabulary synonyms, prepositions, word forms, and inversion structures.
  - Combo multiplier system ($1\times \rightarrow 2\times \rightarrow 3\times \rightarrow 4\times$) and high score ranking.
- 🏆 **Weekly League Leaderboard (`LeaderboardModal.tsx`):**
  - Tiered leagues: Bronze, Silver, Gold, Ruby, Diamond League with promotion/relegation zones.
- 📅 **Habit Tracker & Activity Heatmap (`ActivityHeatmap.tsx`):**
  - GitHub-style 12-week contribution matrix tracking daily study minutes and active streaks.
- 🎓 **Verified Certificate of Competency (`CertificateModal.tsx`):**
  - Formal digital certificate with learner name, CEFR level, verification code, and print/PDF support.
- 🧩 **Interactive Quiz Types (`src/components/activities/`):**
  - **Category Sort & Drag (`CategorizeDragDrop.tsx`):** Sort formal vs informal registers, phrasal verb particles, or verb tenses.
  - **Drag & Drop Sentence Builder (`DragDropActivity.tsx`):** Reorder words, conditional clauses, and negative inversions.
  - **Word & Meaning Matching (`MatchingActivity.tsx`):** Interactive pair connection with instant validation.
  - **Fill in the Blank (`FillBlankActivity.tsx`):** Grammatical context slots with audio and explanations.
  - **Flashcards 3D (`FlashcardActivity.tsx`):** Phonetics, accent notes, and example sentences.
  - **Listen & Arrange (`ListenArrangeActivity.tsx`):** Speech transcription sequencing.
  - **Comprehension Reading (`ReadingActivity.tsx`):** Interactive clickable vocabulary and text highlighter.

### 4. Standardized Exam Preparation Simulator (`ExamPrep.tsx`)
- Comprehensive modules for **IELTS**, **TOEFL iBT**, and **TOEIC**.
- Countdown timer, question navigator drawer, *Mark for Review* flags, and diagnostic report with scaled scores and strong/weak area diagnostics.

### 5. Zero External Asset Sound System (`src/utils/sound.ts`)
- Pure browser **Web Audio API** synthesizer generating harmonic success chimes, gentle error bumps, XP dings, and triumphant completion fanfares.

---

## 🚀 Getting Started

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
