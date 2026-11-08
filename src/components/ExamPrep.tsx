import React, { useState, useEffect } from 'react';
import { 
  Award, Clock, Flag, CheckCircle2, ChevronRight, ChevronLeft, 
  RotateCcw, Sparkles, Volume2, Play, Pause, AlertTriangle, ArrowRight, BookOpen, Layers, BarChart3 
} from 'lucide-react';
import { ExamType, ExamPractice, ExamQuestion, ExamReport } from '../types';
import { EXAM_INFOS, SAMPLE_EXAM_PRACTICES } from '../data/examPrep';
import { sounds } from '../utils/sound';
import { SpeechService } from '../utils/speech';
import confetti from 'canvas-confetti';

interface Props {
  onBackToDashboard: () => void;
  onSelectRecommendedLesson: (lessonId: string) => void;
}

export const ExamPrep: React.FC<Props> = ({ onBackToDashboard, onSelectRecommendedLesson }) => {
  const [selectedExam, setSelectedExam] = useState<ExamType>('IELTS');
  const [activePractice, setActivePractice] = useState<ExamPractice | null>(null);

  // Practice Test State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(12 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  // Result Report
  const [report, setReport] = useState<ExamReport | null>(null);

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activePractice && timerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            setTimerRunning(false);
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activePractice, timerRunning, secondsRemaining]);

  const examInfo = EXAM_INFOS[selectedExam];

  const handleStartExam = () => {
    sounds.playClick();
    const practice = SAMPLE_EXAM_PRACTICES[selectedExam];
    setActivePractice(practice);
    setCurrentQIndex(0);
    setUserAnswers({});
    setMarkedForReview({});
    setSecondsRemaining(practice.timeLimitMinutes * 60);
    setTimerRunning(true);
    setReport(null);
  };

  const handleAnswerSelect = (optIndex: number) => {
    if (!activePractice) return;
    sounds.playClick();
    const currentQ = activePractice.questions[currentQIndex];
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optIndex
    }));
  };

  const toggleMarkForReview = () => {
    if (!activePractice) return;
    sounds.playClick();
    const currentQ = activePractice.questions[currentQIndex];
    setMarkedForReview(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handlePlayAudio = (text: string) => {
    sounds.playClick();
    setAudioPlaying(true);
    SpeechService.speak(text, 0.95, 1.0, () => setAudioPlaying(false));
  };

  const handleFinishExam = () => {
    if (!activePractice) return;
    sounds.playCompletionFanfare();

    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch {
      // fallback
    }

    // Calculate score & diagnostic
    let correctCount = 0;
    const totalQ = activePractice.questions.length;
    const strongAreas: string[] = [];
    const weakAreas: string[] = [];
    const sectionScores: Record<string, { correct: number; total: number; scoreLabel: string }> = {};

    activePractice.questions.forEach(q => {
      if (!sectionScores[q.section]) {
        sectionScores[q.section] = { correct: 0, total: 0, scoreLabel: '' };
      }
      sectionScores[q.section].total += 1;

      const userAns = userAnswers[q.id];
      if (userAns === q.correctIndex) {
        correctCount += 1;
        sectionScores[q.section].correct += 1;
        if (!strongAreas.includes(q.skillTested)) strongAreas.push(q.skillTested);
      } else {
        if (!weakAreas.includes(q.skillTested)) weakAreas.push(q.skillTested);
      }
    });

    const accuracy = Math.round((correctCount / totalQ) * 100);

    // Compute scaled exam score
    let scoreLabel = '';
    if (selectedExam === 'IELTS') {
      const band = accuracy >= 80 ? 'Band 8.0' : accuracy >= 60 ? 'Band 7.0' : accuracy >= 40 ? 'Band 6.0' : 'Band 5.0';
      scoreLabel = band;
    } else if (selectedExam === 'TOEFL') {
      const points = Math.round((accuracy / 100) * 120);
      scoreLabel = `${points}/120`;
    } else {
      const points = Math.round((accuracy / 100) * 990);
      scoreLabel = `${points}/990`;
    }

    const examReport: ExamReport = {
      exam: selectedExam,
      score: scoreLabel,
      accuracyPercent: accuracy,
      timeSpentSeconds: (activePractice.timeLimitMinutes * 60) - secondsRemaining,
      totalQuestions: totalQ,
      correctCount,
      strongAreas: strongAreas.slice(0, 3),
      weakAreas: weakAreas.slice(0, 3),
      recommendedLessons: [
        'Connected Speech & Reductions',
        'Academic Reading: Climate & Cities',
        'Simple Past & Conditional Tense'
      ],
      sectionScores
    };

    setReport(examReport);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // RENDER REPORT IF TEST FINISHED
  if (report) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 animate-pop-in">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft-lg p-6 sm:p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4 border border-brand-100">
            <Award className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full">
            {report.exam} Diagnostic Report
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-1">
            Official Scaled Result: <span className="text-brand-600">{report.score}</span>
          </h2>
          <p className="text-sm text-slate-500 mb-8">
            Completed in {Math.floor(report.timeSpentSeconds / 60)}m {report.timeSpentSeconds % 60}s • {report.correctCount} of {report.totalQuestions} questions correct
          </p>

          {/* 3 Metric Badges */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Overall Accuracy</p>
              <p className="text-2xl font-black text-slate-900">{report.accuracyPercent}%</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Pacing Speed</p>
              <p className="text-2xl font-black text-mint-600">On Target</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">XP Earned</p>
              <p className="text-2xl font-black text-amber-500">+120 XP</p>
            </div>
          </div>

          {/* Strong vs Weak Areas Diagnostic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
            {/* Strong Areas */}
            <div className="p-5 rounded-2xl bg-mint-50/70 border border-mint-200">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-mint-600" />
                <h4 className="text-sm font-bold text-mint-950">Strong Areas</h4>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-mint-900">
                {report.strongAreas.length > 0 ? (
                  report.strongAreas.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-mint-500" />
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="italic text-mint-700">Continue practicing foundational drills.</li>
                )}
              </ul>
            </div>

            {/* Weak Areas */}
            <div className="p-5 rounded-2xl bg-coral-50/60 border border-coral-200">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-coral-600" />
                <h4 className="text-sm font-bold text-coral-950">Areas for Improvement</h4>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-coral-900">
                {report.weakAreas.length > 0 ? (
                  report.weakAreas.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="italic text-coral-700">Flawless performance across all tested skills!</li>
                )}
              </ul>
            </div>
          </div>

          {/* Recommended Next Practice */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Recommended Targeted Practice
            </h4>
            <div className="flex flex-wrap gap-2">
              {report.recommendedLessons.map((item, i) => (
                <button
                  key={i}
                  onClick={() => onSelectRecommendedLesson('lesson-listening-essentials')}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-xs font-bold text-slate-800 transition-colors flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5 text-brand-600" />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setActivePractice(null);
                setReport(null);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
            >
              Back to Exam Hub
            </button>
            <button
              onClick={handleStartExam}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-soft transition-all"
            >
              Retake Mock Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // RENDER ACTIVE PRACTICE TEST SIMULATOR
  if (activePractice) {
    const currentQ = activePractice.questions[currentQIndex];
    const isAnswered = userAnswers[currentQ.id] !== undefined;
    const isMarked = !!markedForReview[currentQ.id];

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col pb-12">
        {/* Exam Test Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-brand-600 text-white">
              {activePractice.exam}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-800 hidden sm:inline">
              {activePractice.title}
            </span>
          </div>

          {/* Timer and Question Count */}
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-mono font-bold ${
              secondsRemaining < 120
                ? 'bg-coral-50 border-coral-200 text-coral-600 animate-pulse'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}>
              <Clock className="w-4 h-4 text-slate-500" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            <button
              onClick={handleFinishExam}
              className="px-4 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-soft transition-all"
            >
              Finish Test
            </button>
          </div>
        </header>

        {/* Question Area & Navigator Grid */}
        <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Question Column */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {currentQ.section} • Question {currentQIndex + 1} of {activePractice.questions.length}
              </span>

              {/* Mark for Review Button */}
              <button
                onClick={toggleMarkForReview}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  isMarked
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{isMarked ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>
            </div>

            {/* Reading Passage if present */}
            {currentQ.passageText && (
              <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm leading-relaxed max-h-56 overflow-y-auto">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {currentQ.passageTitle || 'Reading Reference Text'}
                </p>
                <p>{currentQ.passageText}</p>
              </div>
            )}

            {/* Listening Audio Prompt if present */}
            {currentQ.audioPrompt && (
              <div className="mb-6 p-4 rounded-2xl bg-brand-50/70 border border-brand-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handlePlayAudio(currentQ.audioPrompt!)}
                    className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-soft hover:bg-brand-700 transition-colors"
                  >
                    {audioPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div>
                    <p className="text-xs font-bold text-brand-900">Audio Prompt Clip</p>
                    <p className="text-[10px] text-brand-600">Listen closely to answer the question</p>
                  </div>
                </div>
                <button
                  onClick={() => handlePlayAudio(currentQ.audioPrompt!)}
                  className="text-xs font-bold text-brand-600 hover:text-brand-800"
                >
                  Play Clip
                </button>
              </div>
            )}

            {/* Question Heading */}
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 leading-snug">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((opt, idx) => {
                const isSelected = userAnswers[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    className={`w-full p-4 rounded-2xl text-left text-sm font-semibold border transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'bg-brand-50 border-brand-500 text-brand-900 ring-2 ring-brand-400/20'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-soft-sm'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Previous / Next Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  sounds.playClick();
                  setCurrentQIndex(Math.max(0, currentQIndex - 1));
                }}
                disabled={currentQIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  if (currentQIndex + 1 < activePractice.questions.length) {
                    setCurrentQIndex(currentQIndex + 1);
                  } else {
                    handleFinishExam();
                  }
                }}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-soft transition-all"
              >
                <span>{currentQIndex + 1 === activePractice.questions.length ? 'Submit Exam' : 'Next Question'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Navigator Column */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Question Navigator
            </h4>

            {/* Question Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2 mb-6">
              {activePractice.questions.map((q, idx) => {
                const ans = userAnswers[q.id] !== undefined;
                const flagged = markedForReview[q.id];
                const isCurrent = currentQIndex === idx;

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      sounds.playClick();
                      setCurrentQIndex(idx);
                    }}
                    className={`h-10 rounded-xl font-bold text-xs flex items-center justify-center relative transition-all ${
                      isCurrent
                        ? 'ring-2 ring-brand-600 font-black'
                        : ''
                    } ${
                      flagged
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : ans
                        ? 'bg-brand-600 text-white shadow-soft-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {flagged && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs font-medium text-slate-500 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-brand-600" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-200" />
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-100" />
                <span>Unanswered</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // RENDER MAIN EXAM PREP HUB
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Top Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Official Exam Preparation
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2 mb-2">
          Targeted Preparation for Global Standards
        </h1>
        <p className="text-sm text-slate-500">
          Realistic simulations, scoring bands, and diagnostic feedback calibrated for university and corporate admissions.
        </p>
      </div>

      {/* 3 Main Options Selector: TOEFL, IELTS, TOEIC */}
      <div className="flex items-center justify-center gap-3 max-w-md mx-auto mb-10 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80">
        {(['IELTS', 'TOEFL', 'TOEIC'] as const).map((exam) => {
          const isSelected = selectedExam === exam;
          return (
            <button
              key={exam}
              onClick={() => {
                sounds.playClick();
                setSelectedExam(exam);
              }}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-extrabold transition-all ${
                isSelected
                  ? 'bg-white text-brand-600 shadow-soft-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {exam}
            </button>
          );
        })}
      </div>

      {/* Exam Details & Sections Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left: Overview Card */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-brand-50 text-brand-700 border border-brand-200">
              {examInfo.badge}
            </span>
            <span className="text-xs font-bold text-slate-400">
              {examInfo.duration}
            </span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mb-1">
            {examInfo.fullName}
          </h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            {examInfo.tagline}
          </p>

          <div className="space-y-3.5 mb-8 text-xs font-semibold text-slate-700">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <span className="text-slate-400">Scoring Range:</span>
              <span className="text-brand-600 font-bold">{examInfo.scoringRange}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-1">Best For:</span>
              <span>{examInfo.bestFor}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-brand-50/50 border border-brand-100 text-brand-900">
              <span className="font-bold block mb-1">Scoring Guide:</span>
              <span className="font-normal">{examInfo.scoringGuide}</span>
            </div>
          </div>

          <button
            onClick={handleStartExam}
            className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-glow-brand transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Launch Timed Mock Exam</span>
          </button>
        </div>

        {/* Right: Section Breakdown Cards */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Tested Skill Sections
          </h3>

          {examInfo.sections.map((section, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm hover:border-brand-300 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-black text-slate-900">
                  {section.name}
                </span>
                <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full">
                  {section.duration} • {section.questionsCount}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 mb-3 leading-relaxed">
                {section.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {section.skillsTested.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-600"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

