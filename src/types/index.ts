export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type UserLevel = 
  | 'Beginner'
  | 'Elementary'
  | 'Intermediate'
  | 'Upper Intermediate'
  | 'Advanced'
  | 'Not sure';

export type LearningGoal = 
  | 'Improve my English'
  | 'School'
  | 'TOEFL'
  | 'IELTS'
  | 'TOEIC'
  | 'Work'
  | 'Travel';

export type SkillCategory = 
  | 'Vocabulary'
  | 'Grammar'
  | 'Listening'
  | 'Reading'
  | 'Speaking'
  | 'Writing';

export type ExamType = 'IELTS' | 'TOEFL' | 'TOEIC';

export interface UserProfile {
  name: string;
  avatar: string;
  level: UserLevel;
  cefr: CEFRLevel;
  goal: LearningGoal;
  skillsFocus: SkillCategory[];
  xp: number;
  streak: number;
  dailyGoalMinutes: number;
  todayMinutes: number;
  completedLessonsCount: number;
  overallProgress: number; // 0 - 100
  accuracy: number; // 0 - 100
}

export type ActivityType = 
  | 'flashcard'
  | 'drag-drop'
  | 'categorize'
  | 'matching'
  | 'fill-blank'
  | 'multiple-choice'
  | 'listening'
  | 'listen-arrange'
  | 'reading'
  | 'speaking';

export interface FlashcardData {
  word: string;
  phonetic: string;
  accentNote: string;
  partOfSpeech: string;
  meaning: string;
  example: string;
  translationHint?: string;
  audioPrompt?: string;
}

export interface DragDropData {
  instruction: string;
  scrambledWords: string[];
  correctSentence: string;
  translationHint?: string;
}

export interface MatchingPair {
  id: string;
  word: string;
  definition: string;
  tag?: string;
}

export interface FillBlankData {
  sentenceWithBlank: string; // e.g. "I ___ going to school."
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface MultipleChoiceData {
  question: string;
  context?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ListeningData {
  audioText: string;
  instruction: string;
  question: string;
  options: string[];
  correctIndex: number;
  transcript: string;
  explanation: string;
}

export interface ListenArrangeData {
  audioText: string;
  instruction: string;
  words: string[];
  correctSequence: string[];
}

export interface VocabTooltip {
  word: string;
  phonetic: string;
  definition: string;
  example: string;
}

export interface ReadingData {
  title: string;
  category: string;
  level: string;
  passage: string[];
  interactiveVocab: Record<string, VocabTooltip>;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SpeakingData {
  prompt: string;
  phonetic: string;
  sampleAudioText: string;
  keyPhrases: string[];
  tips: string;
}

export interface CategorizeActivityData {
  instruction: string;
  category1: string;
  category2: string;
  items: Array<{ id: string; text: string; targetCategory: string }>;
}

export interface LessonActivity {
  id: string;
  type: ActivityType;
  title: string;
  xpValue: number;
  data: 
    | { kind: 'flashcard'; data: FlashcardData }
    | { kind: 'drag-drop'; data: DragDropData }
    | { kind: 'categorize'; data: CategorizeActivityData }
    | { kind: 'matching'; pairs: MatchingPair[] }
    | { kind: 'fill-blank'; data: FillBlankData }
    | { kind: 'multiple-choice'; data: MultipleChoiceData }
    | { kind: 'listening'; data: ListeningData }
    | { kind: 'listen-arrange'; data: ListenArrangeData }
    | { kind: 'reading'; data: ReadingData }
    | { kind: 'speaking'; data: SpeakingData };
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: SkillCategory;
  estimatedMinutes: number;
  xpTotal: number;
  activities: LessonActivity[];
  progressPercent: number;
  completed: boolean;
  unlocked: boolean;
}

export interface ExamQuestion {
  id: string;
  section: 'Listening' | 'Reading' | 'Speaking' | 'Writing';
  passageTitle?: string;
  passageText?: string;
  audioPrompt?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  skillTested: string;
}

export interface ExamPractice {
  id: string;
  exam: ExamType;
  title: string;
  description: string;
  timeLimitMinutes: number;
  totalQuestions: number;
  sections: Array<{
    name: 'Listening' | 'Reading' | 'Speaking' | 'Writing';
    questionCount: number;
    description: string;
  }>;
  questions: ExamQuestion[];
}

export interface ExamReport {
  exam: ExamType;
  score: string; // e.g. "Band 7.5" or "102/120" or "885/990"
  accuracyPercent: number;
  timeSpentSeconds: number;
  totalQuestions: number;
  correctCount: number;
  strongAreas: string[];
  weakAreas: string[];
  recommendedLessons: string[];
  sectionScores: Record<string, { correct: number; total: number; scoreLabel: string }>;
}

