import React, { useState, useEffect } from 'react';
import { 
  Award, Clock, Flag, CheckCircle2, ChevronRight, ChevronLeft, 
  RotateCcw, Sparkles, Volume2, Play, Pause, AlertTriangle, ArrowRight, 
  BookOpen, Layers, BarChart3, Headphones, ShieldCheck, Check 
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
  const [secondsRemaining, setSecondsRemaining] = useState<number>(25 * 60);
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

  const handleStartExam = (mode: 'full' | 'listening' | 'reading' = 'full') => {
    sounds.playClick();
    const basePractice = SAMPLE_EXAM_PRACTICES[selectedExam];

    let filteredQuestions = basePractice.questions;
    let timeLimit = basePractice.timeLimitMinutes;
    let title = basePractice.title;

    if (mode === 'listening') {
      filteredQuestions = basePractice.questions.filter(q => q.section === 'Listening');
      timeLimit = Math.max(12, Math.round(filteredQuestions.length * 1.3));
      title = `${selectedExam} Listening Section Focus (${filteredQuestions.length} Questions)`;
    } else if (mode === 'reading') {
      filteredQuestions = basePractice.questions.filter(q => q.section === 'Reading');
      timeLimit = Math.max(15, Math.round(filteredQuestions.length * 1.4));
      title = `${selectedExam} Reading Section Focus (${filteredQuestions.length} Questions)`;
    }

    const practiceToRun: ExamPractice = {
      ...basePractice,
      title,
      timeLimitMinutes: timeLimit,
      totalQuestions: filteredQuestions.length,
      questions: filteredQuestions
    };

    setActivePractice(practiceToRun);
    setCurrentQIndex(0);
    setUserAnswers({});
    setMarkedForReview({});
    setSecondsRemaining(timeLimit * 60);
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

    // Compute scaled exam score based on official benchmarks
    let scoreLabel = '';
    if (selectedExam === 'IELTS') {
      const band = accuracy >= 88 ? 'Band 8.5 (Expert)' : 
                   accuracy >= 78 ? 'Band 8.0 (Very Good)' : 
                   accuracy >= 68 ? 'Band 7.5 (Good User)' : 
                   accuracy >= 58 ? 'Band 7.0 (Competent)' : 
                   accuracy >= 48 ? 'Band 6.5 (Modest)' : 'Band 6.0';
      scoreLabel = band;
    } else if (selectedExam === 'TOEFL') {
      const points = Math.min(120, Math.round((accuracy / 100) * 120));
      scoreLabel = `${points}/120`;
    } else {
      const points = Math.min(990, Math.round((accuracy / 100) * 990));
      scoreLabel = `${points}/990`;
    }

    const examReport: ExamReport = {
      exam: selectedExam,
      score: scoreLabel,
      accuracyPercent: accuracy,
      timeSpentSeconds: (activePractice.timeLimitMinutes * 60) - secondsRemaining,
      totalQuestions: totalQ,
      correctCount,
      strongAreas: strongAreas.slice(0, 4),
      weakAreas: weakAreas.slice(0, 4),
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
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4 border border-brand-100 shadow-soft-sm">
            <Award className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            {report.exam} Diagnostic Report
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-1">
            Official Scaled Result: <span className="text-brand-600">{report.score}</span>
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Completed in {Math.floor(report.timeSpentSeconds / 60)}m {report.timeSpentSeconds % 60}s • {report.correctCount} of {report.totalQuestions} questions correct
          </p>

          {/* 3 Metric Badges */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
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
              <p className="text-2xl font-black text-amber-500">+150 XP</p>
            </div>
          </div>

          {/* Section Score Breakdown Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {Object.entries(report.sectionScores).map(([secName, secData]) => {
              const secAcc = Math.round((secData.correct / secData.total) * 100);
              return (
                <div key={secName} className="px-4 py-2.5 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2">
                  <span className="text-slate-500 font-extrabold">{secName}:</span>
                  <span className="text-brand-700 font-black">{secData.correct}/{secData.total} ({secAcc}%)</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    secAcc >= 70 ? 'bg-mint-100 text-mint-800' : 'bg-coral-100 text-coral-800'
                  }`}>
                    {secAcc >= 70 ? 'Competent' : 'Needs Review'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Strong vs Weak Areas Diagnostic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
            {/* Strong Areas */}
            <div className="p-5 rounded-2xl bg-mint-50/70 border border-mint-200">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-mint-600" />
                <h4 className="text-sm font-bold text-mint-950">Mastered Skills (Strong Areas)</h4>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-mint-900">
                {report.strongAreas.length > 0 ? (
                  report.strongAreas.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-mint-500 flex-shrink-0" />
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
                      <span className="w-1.5 h-1.5 rounded-full bg-coral-500 flex-shrink-0" />
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
              onClick={() => handleStartExam('full')}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-soft transition-all"
            >
              Retake Full Mock Exam
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
            <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-brand-600 text-white shadow-soft-sm">
              {activePractice.exam}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-800 hidden sm:inline">
              {activePractice.title}
            </span>
          </div>

          {/* Timer and Question Count */}
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-mono font-bold ${
              secondsRemaining < 180
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
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                  currentQ.section === 'Listening'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {currentQ.section === 'Listening' ? <Headphones className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                  <span>{currentQ.section}</span>
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Question {currentQIndex + 1} of {activePractice.questions.length}
                </span>
              </div>

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
              <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm leading-relaxed max-h-64 overflow-y-auto">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  <BookOpen className="w-3.5 h-3.5 text-brand-600" />
                  <span>{currentQ.passageTitle || 'Reading Reference Text'}</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed font-normal">
                  {currentQ.passageText}
                </div>
              </div>
            )}

            {/* Listening Audio Prompt if present */}
            {currentQ.audioPrompt && (
              <div className="mb-6 p-4 rounded-2xl bg-brand-50/70 border border-brand-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handlePlayAudio(currentQ.audioPrompt!)}
                    className="w-11 h-11 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-soft hover:bg-brand-700 transition-colors flex-shrink-0"
                  >
                    {audioPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5 fill-white" />}
                  </button>
                  <div>
                    <p className="text-xs font-bold text-brand-900">Audio Prompt Clip</p>
                    <p className="text-[11px] text-brand-600">Dengarkan audio penutur asli untuk menjawab soal</p>
                  </div>
                </div>
                <button
                  onClick={() => handlePlayAudio(currentQ.audioPrompt!)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-brand-200 text-xs font-bold text-brand-700 hover:bg-brand-50 shadow-soft-sm transition-colors flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{audioPlaying ? 'Sedang Memutar...' : 'Putar Audio'}</span>
                </button>
              </div>
            )}

            {/* Question Heading */}
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6 leading-snug">
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
                    className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-semibold border transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'bg-brand-50 border-brand-500 text-brand-900 ring-2 ring-brand-400/20 shadow-soft'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-soft-sm'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-xl text-xs font-black flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-brand-600 text-white shadow-soft-sm' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt}</span>
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
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
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
                <span>{currentQIndex + 1 === activePractice.questions.length ? 'Selesai & Kumpulkan' : 'Soal Berikutnya'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Navigator Column */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Question Navigator
              </h4>
              <span className="text-xs font-extrabold text-brand-600">
                {Object.keys(userAnswers).length}/{activePractice.questions.length} Dijawab
              </span>
            </div>

            {/* Question Grid (22 questions displayed in clean grid) */}
            <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2 mb-6">
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
                    className={`h-9 rounded-xl font-bold text-xs flex items-center justify-center relative transition-all ${
                      isCurrent
                        ? 'ring-2 ring-brand-600 font-black scale-105'
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
                <span>Dijawab (Answered)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-200 border border-amber-300" />
                <span>Ditandai untuk Diperiksa (Flagged)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-100 border border-slate-200" />
                <span>Belum Dijawab (Unanswered)</span>
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
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3.5 py-1 rounded-full border border-brand-100 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
          <span>Official International Exam Bank (66+ Questions)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
          Persiapan Ujian Resmi IELTS, TOEFL & TOEIC
        </h1>
        <p className="text-sm text-slate-500">
          Simulasi terstandarisasi autentik dengan bank soal 22 soal per ujian, audio clips penutur asli, teks jurnal akademik, timer ujian, serta laporan diagnostik kelulusan.
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
              <span className="text-slate-400">Bank Soal Tersedia:</span>
              <span className="text-brand-600 font-bold">{examInfo.totalQuestionsBank} Soal Terstandarisasi</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <span className="text-slate-400">Rentang Skor:</span>
              <span className="text-brand-600 font-bold">{examInfo.scoringRange}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-1">Target / Cocok Untuk:</span>
              <span>{examInfo.bestFor}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-brand-50/50 border border-brand-100 text-brand-900">
              <span className="font-bold block mb-1">Panduan Standar Kelulusan:</span>
              <span className="font-normal">{examInfo.scoringGuide}</span>
            </div>
          </div>

          {/* Action Launch Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleStartExam('full')}
              className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-glow-brand transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Mulai Simulasi Lengkap (22 Soal • 25 Menit)</span>
            </button>

            {/* Quick Section Focus Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => handleStartExam('listening')}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <Headphones className="w-3.5 h-3.5 text-brand-600" />
                <span>Fokus Listening Audio</span>
              </button>
              <button
                onClick={() => handleStartExam('reading')}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-brand-600" />
                <span>Fokus Reading Teks</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Section Breakdown Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Struktur & Komponen Ujian Resmi {selectedExam}
            </h3>
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full">
              Standar CEFR B2 - C2
            </span>
          </div>

          {examInfo.sections.map((section, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm hover:border-brand-300 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-black text-slate-900 flex items-center gap-2">
                  {section.name === 'Listening' ? <Headphones className="w-4 h-4 text-brand-600" /> : <BookOpen className="w-4 h-4 text-brand-600" />}
                  <span>{section.name} Section</span>
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
