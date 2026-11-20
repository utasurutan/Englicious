import React, { useState, useEffect } from 'react';
import { 
  Award, Clock, Flag, CheckCircle2, ChevronRight, ChevronLeft, 
  RotateCcw, Sparkles, Volume2, Play, Pause, AlertTriangle, ArrowRight, 
  BookOpen, Layers, BarChart3, Headphones, ShieldCheck, Check, 
  Printer, FileText, Send, Mic, MicOff, User, PenTool, ExternalLink, 
  HelpCircle, X, Sparkle, RefreshCw, Zap, Keyboard 
} from 'lucide-react';
import { ExamType, ExamPractice, ExamQuestion, ExamReport, UserProfile } from '../types';
import { 
  EXAM_INFOS, 
  SAMPLE_EXAM_PRACTICES, 
  MOCKUP_TEST_CATALOG, 
  WRITING_MOCKS, 
  SPEAKING_MOCKS, 
  MockupTestCard, 
  WritingMockData, 
  SpeakingMockData 
} from '../data/examPrep';
import { sounds } from '../utils/sound';
import { SpeechService } from '../utils/speech';
import confetti from 'canvas-confetti';

interface Props {
  user?: UserProfile;
  onBackToDashboard: () => void;
  onSelectRecommendedLesson: (lessonId: string) => void;
}

export const ExamPrep: React.FC<Props> = ({ user, onBackToDashboard, onSelectRecommendedLesson }) => {
  const [selectedExam, setSelectedExam] = useState<ExamType>('IELTS');
  
  // Active Test States
  const [activePractice, setActivePractice] = useState<ExamPractice | null>(null);
  const [activeWritingMock, setActiveWritingMock] = useState<WritingMockData | null>(null);
  const [activeSpeakingMock, setActiveSpeakingMock] = useState<SpeakingMockData | null>(null);

  // Pre-Exam Check-in & Equipment Verification Modal
  const [checkInTarget, setCheckInTarget] = useState<MockupTestCard | null>(null);
  const [isPlayingSoundCheck, setIsPlayingSoundCheck] = useState(false);

  // MCQ Practice Test State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [passageFontSize, setPassageFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);

  // Writing Mock State
  const [writingUserText, setWritingUserText] = useState('');
  const [writingSecondsRemaining, setWritingSecondsRemaining] = useState(40 * 60);
  const [writingTimerRunning, setWritingTimerRunning] = useState(false);
  const [writingSubmitted, setWritingSubmitted] = useState(false);
  const [writingEvaluation, setWritingEvaluation] = useState<{
    wordCount: number;
    bandScore: string;
    taskAchievementFeedback: string;
    coherenceFeedback: string;
    lexicalFeedback: string;
    grammarFeedback: string;
  } | null>(null);

  // Speaking Mock State
  const [speakingCurrentPartIdx, setSpeakingCurrentPartIdx] = useState(0);
  const [speakingTimerSeconds, setSpeakingTimerSeconds] = useState(60);
  const [isPrepCountdown, setIsPrepCountdown] = useState(false);
  const [isRecordingAnswer, setIsRecordingAnswer] = useState(false);
  const [recordedNotes, setRecordedNotes] = useState<Record<number, string>>({});
  const [speakingFinished, setSpeakingFinished] = useState(false);

  // Result Report
  const [report, setReport] = useState<ExamReport | null>(null);

  // View Filter: Full Mock Tests vs Sectional Mock Tests
  const [catalogTab, setCatalogTab] = useState<'all' | 'full' | 'sectional'>('full');
  const [sectionalSkillFilter, setSectionalSkillFilter] = useState<'all' | 'listening' | 'reading' | 'writing' | 'speaking'>('all');

  // Candidate Profile Details
  const candidateName = user?.name || 'Sultan';
  const candidateNumber = `ENG-2026-${selectedExam}-${Math.floor(1000 + Math.random() * 9000)}`;

  // MCQ Countdown timer effect
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

  // Writing countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeWritingMock && writingTimerRunning && writingSecondsRemaining > 0 && !writingSubmitted) {
      interval = setInterval(() => {
        setWritingSecondsRemaining(prev => {
          if (prev <= 1) {
            setWritingTimerRunning(false);
            handleSubmitWriting();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeWritingMock, writingTimerRunning, writingSecondsRemaining, writingSubmitted]);

  // Speaking timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeSpeakingMock && speakingTimerSeconds > 0 && !speakingFinished && (isPrepCountdown || isRecordingAnswer)) {
      interval = setInterval(() => {
        setSpeakingTimerSeconds(prev => {
          if (prev <= 1) {
            if (isPrepCountdown) {
              // Transition from prep to speaking
              setIsPrepCountdown(false);
              setIsRecordingAnswer(true);
              const part = activeSpeakingMock.parts[speakingCurrentPartIdx];
              return part.speakTimeSeconds;
            } else {
              // Time's up for speaking
              setIsRecordingAnswer(false);
              sounds.playCompletionFanfare();
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeSpeakingMock, speakingTimerSeconds, isPrepCountdown, isRecordingAnswer, speakingFinished]);

  const examInfo = EXAM_INFOS[selectedExam];
  const examMockCatalog = MOCKUP_TEST_CATALOG[selectedExam] || [];

  const fullMockCount = examMockCatalog.filter(c => c.type === 'full').length;
  const sectionalMockCount = examMockCatalog.filter(c => c.type !== 'full').length;

  const displayedMockCatalog = examMockCatalog.filter(card => {
    if (catalogTab === 'full') {
      return card.type === 'full';
    }
    if (catalogTab === 'sectional') {
      if (card.type === 'full') return false;
      if (sectionalSkillFilter === 'all') return true;
      return card.type === sectionalSkillFilter;
    }
    return true;
  });

  // Launch Candidate Check-in Modal
  const handleOpenCheckIn = (mockCard: MockupTestCard) => {
    sounds.playClick();
    setCheckInTarget(mockCard);
  };

  // Run Headset Sound Check
  const handlePlaySoundCheck = () => {
    sounds.playClick();
    setIsPlayingSoundCheck(true);
    SpeechService.speak(
      `This is a sound check for the official Englicious ${selectedExam} examination simulator. If you can hear this audio clearly through your headset, your workstation is ready.`,
      0.95,
      1.0,
      () => setIsPlayingSoundCheck(false)
    );
  };

  // Confirm Check-in and Start the Selected Test
  const handleConfirmStartTest = () => {
    if (!checkInTarget) return;
    sounds.playClick();
    const target = checkInTarget;
    setCheckInTarget(null);

    if (target.type === 'writing') {
      const writingData = WRITING_MOCKS[target.id];
      if (writingData) {
        setActiveWritingMock(writingData);
        setWritingUserText('');
        setWritingSecondsRemaining(writingData.timeLimitMinutes * 60);
        setWritingTimerRunning(true);
        setWritingSubmitted(false);
        setWritingEvaluation(null);
        return;
      }
    }

    if (target.type === 'speaking') {
      const speakingData = SPEAKING_MOCKS[target.id];
      if (speakingData) {
        setActiveSpeakingMock(speakingData);
        setSpeakingCurrentPartIdx(0);
        const firstPart = speakingData.parts[0];
        setSpeakingTimerSeconds(firstPart.speakTimeSeconds);
        setIsPrepCountdown(false);
        setIsRecordingAnswer(false);
        setRecordedNotes({});
        setSpeakingFinished(false);
        return;
      }
    }

    // Otherwise, start Multiple-Choice Simulator (Full, Listening, Reading, Sprint)
    const basePractice = SAMPLE_EXAM_PRACTICES[selectedExam];
    let filteredQuestions = basePractice.questions;
    let timeLimit = target.durationMinutes;
    let title = target.title;

    if (target.type === 'listening') {
      filteredQuestions = basePractice.questions.filter(q => q.section === 'Listening');
    } else if (target.type === 'reading') {
      filteredQuestions = basePractice.questions.filter(q => q.section === 'Reading');
      if (target.id === 'toeic-mock-sprint') {
        filteredQuestions = filteredQuestions.slice(0, 10);
      }
    } else if (target.id.endsWith('-2')) {
      const listening = basePractice.questions.filter(q => q.section === 'Listening').reverse();
      const reading = basePractice.questions.filter(q => q.section === 'Reading').reverse();
      filteredQuestions = [...listening, ...reading];
    }

    const practiceToRun: ExamPractice = {
      ...basePractice,
      id: target.id,
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

  // MCQ Handlers
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

  // CBT Standard Keyboard Navigation effect
  useEffect(() => {
    if (!activePractice) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input, textarea, or contentEditable
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      const key = e.key.toLowerCase();
      const currentQ = activePractice.questions[currentQIndex];

      // Option Selection: 1-4 or a-d
      if (key === '1' || key === 'a') {
        if (currentQ && currentQ.options.length > 0) handleAnswerSelect(0);
      } else if (key === '2' || key === 'b') {
        if (currentQ && currentQ.options.length > 1) handleAnswerSelect(1);
      } else if (key === '3' || key === 'c') {
        if (currentQ && currentQ.options.length > 2) handleAnswerSelect(2);
      } else if (key === '4' || key === 'd') {
        if (currentQ && currentQ.options.length > 3) handleAnswerSelect(3);
      }
      // Next: ArrowRight or n
      else if (e.key === 'ArrowRight' || key === 'n') {
        if (currentQIndex < activePractice.questions.length - 1) {
          sounds.playClick();
          setCurrentQIndex(prev => prev + 1);
        }
      }
      // Prev: ArrowLeft or p
      else if (e.key === 'ArrowLeft' || key === 'p') {
        if (currentQIndex > 0) {
          sounds.playClick();
          setCurrentQIndex(prev => prev - 1);
        }
      }
      // Flag / Review: f or m
      else if (key === 'f' || key === 'm') {
        toggleMarkForReview();
      }
      // Replay Audio: r or Space
      else if (key === 'r' || e.code === 'Space') {
        if (currentQ && currentQ.audioPrompt && !audioPlaying) {
          e.preventDefault();
          handlePlayAudio(currentQ.audioPrompt);
        }
      }
      // Shortcuts guide cheat sheet: ?
      else if (e.key === '?' || (e.shiftKey && key === '/')) {
        setShowShortcutsModal(prev => !prev);
      }
      // Escape closes cheat sheet
      else if (e.key === 'Escape') {
        setShowShortcutsModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePractice, currentQIndex, audioPlaying]);

  const handleFinishExam = () => {
    if (!activePractice) return;
    sounds.playCompletionFanfare();

    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch {}

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

  // Writing Submission Evaluation
  const handleSubmitWriting = () => {
    if (!activeWritingMock) return;
    sounds.playCompletionFanfare();
    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch {}

    const words = writingUserText.trim().split(/\s+/).filter(Boolean);
    const count = words.length;

    let band = 'Band 6.5';
    if (count >= activeWritingMock.minWords) {
      if (count >= activeWritingMock.minWords + 50) {
        band = selectedExam === 'IELTS' ? 'Band 8.5 (Very High)' : 'Top Score (5.0 / 5.0)';
      } else {
        band = selectedExam === 'IELTS' ? 'Band 7.5 (Good User)' : 'Competitive (4.0 / 5.0)';
      }
    } else {
      band = selectedExam === 'IELTS' ? 'Band 6.0 (Underlength Penalty)' : 'Adequate (3.0 / 5.0)';
    }

    setWritingEvaluation({
      wordCount: count,
      bandScore: band,
      taskAchievementFeedback: count >= activeWritingMock.minWords 
        ? 'Target jumlah kata tercapai dengan baik. Argumen disajikan dengan posisi yang jelas dan koheren.'
        : `Panjang teks (${count} kata) masih di bawah batas minimal ${activeWritingMock.minWords} kata. Pastikan mengelaborasi argumen lebih mendalam.`,
      coherenceFeedback: 'Struktur paragraf logis dengan transisi akademik yang memisahkan klausa premis dan kesimpulan.',
      lexicalFeedback: 'Penggunaan kosakata formal dan istilah konseptual sesuai register akademik standar internasional.',
      grammarFeedback: 'Variasi kalimat majemuk dan klausa kondisional terangkai secara teratur.'
    });

    setWritingSubmitted(true);
    setWritingTimerRunning(false);
  };

  // Format MM:SS helper
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Print Report Handler
  const handlePrintCertificate = () => {
    sounds.playClick();
    window.print();
  };

  // ==============================================================
  // VIEW 1: OFFICIAL SCORE CERTIFICATE REPORT
  // ==============================================================
  if (report) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 animate-pop-in">
        <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-soft-lg p-6 sm:p-10 text-center print:border-none print:shadow-none print:p-0">
          
          {/* Certificate Header Banner */}
          <div className="border-b-2 border-slate-100 pb-6 mb-8 flex items-center justify-between flex-wrap gap-4 print:border-black">
            <div className="text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 print:hidden">
                Official Examination Report Form (TRF)
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                {report.exam} Test Taker Score Record
              </h1>
              <p className="text-xs text-slate-500">
                Englicious International Assessment Suite • Candidate: <strong className="text-slate-800">{candidateName}</strong>
              </p>
            </div>

            <div className="text-right">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto border border-brand-100 shadow-soft-sm print:hidden">
                <Award className="w-7 h-7" />
              </div>
              <p className="text-[10px] font-mono text-slate-400 mt-1">Ref: {candidateNumber}</p>
            </div>
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3.5 py-1 rounded-full border border-brand-200">
            {report.exam} Official Scaled Result
          </span>

          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mt-3 mb-2">
            <span className="text-brand-600">{report.score}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-8">
            Completed in {Math.floor(report.timeSpentSeconds / 60)}m {report.timeSpentSeconds % 60}s • {report.correctCount} of {report.totalQuestions} questions correct
          </p>

          {/* 3 Metric Badges */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase mb-1">Akurasi Ujian</p>
              <p className="text-xl sm:text-3xl font-black text-slate-900">{report.accuracyPercent}%</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase mb-1">Pacing Speed</p>
              <p className="text-xl sm:text-3xl font-black text-mint-600">On Target</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase mb-1">XP Kelulusan</p>
              <p className="text-xl sm:text-3xl font-black text-amber-500">+150 XP</p>
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

          {/* Diagnostic Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
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
                  <li className="italic text-mint-700">Tingkatkan latihan pemahaman dasar secara berulang.</li>
                )}
              </ul>
            </div>

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
                  <li className="italic text-coral-700">Performa luar biasa! Seluruh kemampuan teruji dengan akurat.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Action buttons (Hidden in Print) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 print:hidden">
            <button
              onClick={() => {
                setActivePractice(null);
                setReport(null);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
            >
              Kembali ke Exam Hub
            </button>
            <button
              onClick={handlePrintCertificate}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Hasil Ujian (Print / PDF)</span>
            </button>
            <button
              onClick={() => {
                setReport(null);
                const fullTest = examMockCatalog.find(t => t.type === 'full') || examMockCatalog[0];
                handleOpenCheckIn(fullTest);
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-soft transition-all"
            >
              Ulangi Ujian Mockup
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==============================================================
  // VIEW 2: INTERACTIVE WRITING MOCKUP TEST SIMULATOR
  // ==============================================================
  if (activeWritingMock) {
    const wordCount = writingUserText.trim().split(/\s+/).filter(Boolean).length;
    const isTargetMet = wordCount >= activeWritingMock.minWords;

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col pb-12">
        {/* Top Exam Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-purple-600 text-white shadow-soft-sm">
              {activeWritingMock.exam} WRITING
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-800 hidden sm:inline">
              {activeWritingMock.title}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-mono font-bold ${
              writingSecondsRemaining < 300
                ? 'bg-coral-50 border-coral-200 text-coral-600 animate-pulse'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}>
              <Clock className="w-4 h-4 text-slate-500" />
              <span>{formatTime(writingSecondsRemaining)}</span>
            </div>

            {!writingSubmitted ? (
              <button
                onClick={handleSubmitWriting}
                disabled={wordCount < 10}
                className="px-4 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-bold text-xs shadow-soft transition-all"
              >
                Submit Essay
              </button>
            ) : (
              <button
                onClick={() => setActiveWritingMock(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 text-white font-bold text-xs"
              >
                Selesai & Keluar
              </button>
            )}
          </div>
        </header>

        <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Official Prompt & Background */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                {activeWritingMock.taskType}
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-2 mb-3">
                {activeWritingMock.title}
              </h3>
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium mb-4">
                {activeWritingMock.promptText}
              </div>

              {activeWritingMock.scenarioBackground && (
                <p className="text-xs text-slate-500 leading-relaxed mb-4 italic">
                  💡 {activeWritingMock.scenarioBackground}
                </p>
              )}

              {/* Peer Posts if TOEFL Academic Discussion */}
              {activeWritingMock.peerDiscussions && (
                <div className="space-y-2.5 mb-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Peer Forum Responses:
                  </p>
                  {activeWritingMock.peerDiscussions.map((peer, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-100/70 border border-slate-200 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                        <span>{peer.avatar}</span>
                        <span>{peer.name}:</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed italic">{peer.response}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Rubric Criteria */}
              <div className="border-t border-slate-100 pt-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Official Assessment Criteria:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {activeWritingMock.keyAssessmentCriteria.map((crit, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-mint-600 flex-shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Discourse Transitions Helper */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Recommended Academic Discourse Markers:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeWritingMock.recommendedTransitions.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Writing Editor & Word Counter */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-soft">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-brand-600" />
                <span className="text-xs font-bold text-slate-800">Candidate Essay Response Editor</span>
              </div>

              {/* Word Count Pill */}
              <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                isTargetMet 
                  ? 'bg-mint-100 text-mint-800 border border-mint-200' 
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                <span>{wordCount} / {activeWritingMock.minWords} Kata Minimum</span>
                {isTargetMet && <Check className="w-3.5 h-3.5 text-mint-700" />}
              </div>
            </div>

            {!writingSubmitted ? (
              <div>
                <textarea
                  value={writingUserText}
                  onChange={(e) => setWritingUserText(e.target.value)}
                  placeholder="Ketik esai akademik Anda di sini. Gunakan argumen terstruktur, transisi kohesif, dan kembangkan ide secara mendalam..."
                  className="w-full h-96 p-4 rounded-2xl border border-slate-200 text-slate-800 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none font-sans"
                />

                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-slate-400">
                    Karakter: {writingUserText.length} | Paragraf: {writingUserText.split('\n\n').filter(Boolean).length}
                  </span>
                  <button
                    onClick={handleSubmitWriting}
                    disabled={wordCount < 10}
                    className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-bold text-xs shadow-soft transition-all"
                  >
                    Kumpulkan & Evaluasi Band
                  </button>
                </div>
              </div>
            ) : (
              /* Writing Result & Model Answer Comparison */
              <div className="space-y-6 animate-fade-in">
                <div className="p-5 rounded-2xl bg-brand-50/70 border border-brand-200 text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-white px-2.5 py-0.5 rounded-full">
                    Hasil Penilaian Otomatis
                  </span>
                  <h3 className="text-2xl font-black text-brand-900 mt-2">
                    Skor Evaluasi: <span className="text-brand-600">{writingEvaluation?.bandScore}</span>
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Jumlah Kata: <strong>{writingEvaluation?.wordCount} kata</strong> (Target: {activeWritingMock.minWords}+ kata)
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-brand-100">
                      <p className="font-bold text-slate-800">Task Achievement</p>
                      <p className="text-slate-600 mt-0.5">{writingEvaluation?.taskAchievementFeedback}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-brand-100">
                      <p className="font-bold text-slate-800">Coherence & Cohesion</p>
                      <p className="text-slate-600 mt-0.5">{writingEvaluation?.coherenceFeedback}</p>
                    </div>
                  </div>
                </div>

                {/* Model Band 9.0 Answer */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Kunci Jawaban Model Resmi (Band 9.0 Benchmark):
                    </h4>
                    <span className="text-[10px] font-bold text-mint-700 bg-mint-100 px-2 py-0.5 rounded-full">
                      Model Examiner
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed max-h-72 overflow-y-auto p-3 bg-white rounded-xl border border-slate-200">
                    {activeWritingMock.modelAnswer}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2 italic">
                    Catatan Penguji: {activeWritingMock.examinerNotes}
                  </p>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => setActiveWritingMock(null)}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs"
                  >
                    Kembali ke Exam Hub
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // ==============================================================
  // VIEW 3: INTERACTIVE SPEAKING INTERVIEW SIMULATOR
  // ==============================================================
  if (activeSpeakingMock) {
    const currentPart = activeSpeakingMock.parts[speakingCurrentPartIdx];
    const isLastPart = speakingCurrentPartIdx === activeSpeakingMock.parts.length - 1;

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col pb-12">
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-rose-600 text-white shadow-soft-sm">
              {activeSpeakingMock.exam} SPEAKING
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-800">
              {activeSpeakingMock.title} (Part {currentPart.partNumber} of {activeSpeakingMock.parts.length})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSpeakingMock(null)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
            >
              Keluar
            </button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-soft text-center">
            
            {/* Examiner Avatar */}
            <div className="w-20 h-20 rounded-3xl bg-brand-50 border-2 border-brand-200 text-brand-600 flex items-center justify-center mx-auto mb-4 text-3xl shadow-soft">
              🎙️
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              {currentPart.partTitle}
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-3 mb-2">
              {activeSpeakingMock.examinerName}
            </h3>
            <p className="text-xs text-slate-400 mb-6">{activeSpeakingMock.examinerRole}</p>

            {/* Question Text Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Examiner Question Prompt:
                </span>
                <button
                  onClick={() => SpeechService.speak(currentPart.examinerAudioPrompt)}
                  className="px-3 py-1 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center gap-1 shadow-soft-sm"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengarkan Suara Penguji</span>
                </button>
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                "{currentPart.questionText}"
              </p>

              {currentPart.cueCardPoints && (
                <div className="mt-4 pt-3 border-t border-slate-200/80">
                  <p className="text-xs font-bold text-slate-600 mb-1.5">You should say:</p>
                  <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                    {currentPart.cueCardPoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Timers & Recording Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              {currentPart.prepTimeSeconds && !isRecordingAnswer && (
                <button
                  onClick={() => {
                    setIsPrepCountdown(true);
                    setSpeakingTimerSeconds(currentPart.prepTimeSeconds!);
                  }}
                  disabled={isPrepCountdown}
                  className={`px-6 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 border transition-all ${
                    isPrepCountdown
                      ? 'bg-amber-50 border-amber-300 text-amber-900 animate-pulse'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>{isPrepCountdown ? `Persiapan: ${speakingTimerSeconds}s` : `Mulai Waktu Persiapan (${currentPart.prepTimeSeconds}s)`}</span>
                </button>
              )}

              <button
                onClick={() => {
                  sounds.playClick();
                  setIsPrepCountdown(false);
                  setIsRecordingAnswer(prev => !prev);
                  if (!isRecordingAnswer) {
                    setSpeakingTimerSeconds(currentPart.speakTimeSeconds);
                  }
                }}
                className={`px-8 py-3.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all shadow-soft active:scale-95 ${
                  isRecordingAnswer
                    ? 'bg-rose-600 text-white animate-pulse shadow-glow-rose'
                    : 'bg-brand-600 hover:bg-brand-700 text-white shadow-glow-brand'
                }`}
              >
                {isRecordingAnswer ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{isRecordingAnswer ? `Sedang Merekam... (${speakingTimerSeconds}s sisa)` : 'Mulai Rekam Jawaban Lisan Anda'}</span>
              </button>
            </div>

            {/* Model Response Toggle */}
            <div className="p-5 rounded-2xl bg-mint-50/60 border border-mint-200 text-left mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-mint-950 uppercase tracking-wider">
                  Model Jawaban Native (Band 8.5+ Speaker Response):
                </span>
                <button
                  onClick={() => SpeechService.speak(currentPart.modelNativeResponse)}
                  className="text-xs font-bold text-mint-700 hover:text-mint-900 flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengarkan Model</span>
                </button>
              </div>
              <p className="text-xs text-mint-900 leading-relaxed font-normal whitespace-pre-line">
                {currentPart.modelNativeResponse}
              </p>
            </div>

            {/* Navigation to Next Part */}
            <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-100">
              {!isLastPart ? (
                <button
                  onClick={() => {
                    sounds.playClick();
                    const nextIdx = speakingCurrentPartIdx + 1;
                    setSpeakingCurrentPartIdx(nextIdx);
                    const nextPart = activeSpeakingMock.parts[nextIdx];
                    setSpeakingTimerSeconds(nextPart.speakTimeSeconds);
                    setIsPrepCountdown(false);
                    setIsRecordingAnswer(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-soft"
                >
                  <span>Lanjut ke Bagian {speakingCurrentPartIdx + 2}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    sounds.playCompletionFanfare();
                    setActiveSpeakingMock(null);
                  }}
                  className="px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-soft"
                >
                  Selesaikan Simulasi Wawancara Speaking
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==============================================================
  // VIEW 4: MULTIPLE-CHOICE CBT SIMULATOR (FULL, LISTENING, READING)
  // ==============================================================
  if (activePractice) {
    const currentQ = activePractice.questions[currentQIndex];
    const isAnswered = userAnswers[currentQ.id] !== undefined;
    const isMarked = !!markedForReview[currentQ.id];

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col pb-12">
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-brand-600 text-white shadow-soft-sm">
              {activePractice.exam}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-800 hidden sm:inline">
              {activePractice.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowShortcutsModal(true)}
              title="Pintasan Keyboard (Tekan ?)"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <Keyboard className="w-3.5 h-3.5 text-slate-500" />
              <span>Pintasan CBT</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 text-[10px] font-mono text-slate-600 font-bold">?</kbd>
            </button>

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

        <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
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

            {/* Reading Passage */}
            {currentQ.passageText && (
              <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm leading-relaxed max-h-64 overflow-y-auto">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-brand-600" />
                    <span>{currentQ.passageTitle || 'Reading Reference Text'}</span>
                  </div>
                  {/* Font Size Selector */}
                  <div className="flex items-center gap-1 text-[10px] lowercase">
                    <button
                      onClick={() => setPassageFontSize('normal')}
                      className={`px-1.5 py-0.5 rounded ${passageFontSize === 'normal' ? 'bg-white font-bold text-brand-600 shadow-xs' : 'text-slate-400'}`}
                    >
                      A
                    </button>
                    <button
                      onClick={() => setPassageFontSize('large')}
                      className={`px-1.5 py-0.5 rounded ${passageFontSize === 'large' ? 'bg-white font-bold text-brand-600 shadow-xs' : 'text-slate-400'}`}
                    >
                      A+
                    </button>
                  </div>
                </div>
                <div className={`text-slate-700 whitespace-pre-line leading-relaxed font-normal ${
                  passageFontSize === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                }`}>
                  {currentQ.passageText}
                </div>
              </div>
            )}

            {/* Listening Audio Prompt */}
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
                    <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-400 font-bold">
                      {idx + 1}
                    </kbd>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
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

        {/* Keyboard Shortcuts Modal (CBT Cheat Sheet) */}
        {showShortcutsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full border border-slate-200 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                    <Keyboard className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Pintasan Keyboard (CBT Standard)</h3>
                    <p className="text-[11px] text-slate-400">Navigasi ujian cepat berstandar resmi</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowShortcutsModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 font-medium">Pilih Opsi Jawaban</span>
                  <div className="flex items-center gap-1 font-mono">
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 shadow-xs font-bold text-slate-800">1</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 shadow-xs font-bold text-slate-800">2</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 shadow-xs font-bold text-slate-800">3</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 shadow-xs font-bold text-slate-800">4</kbd>
                    <span className="text-slate-400 text-[10px] mx-1">atau</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 shadow-xs font-bold text-slate-800">A-D</kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 font-medium">Soal Selanjutnya (Next)</span>
                  <div className="flex items-center gap-1 font-mono">
                    <kbd className="px-2 py-0.5 rounded bg-white border border-slate-200 shadow-xs font-bold text-slate-800">→</kbd>
                    <span className="text-slate-400 text-[10px]">atau</span>
                    <kbd className="px-2 py-0.5 rounded bg-white border border-slate-200 shadow-xs font-bold text-slate-800">N</kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 font-medium">Soal Sebelumnya (Previous)</span>
                  <div className="flex items-center gap-1 font-mono">
                    <kbd className="px-2 py-0.5 rounded bg-white border border-slate-200 shadow-xs font-bold text-slate-800">←</kbd>
                    <span className="text-slate-400 text-[10px]">atau</span>
                    <kbd className="px-2 py-0.5 rounded bg-white border border-slate-200 shadow-xs font-bold text-slate-800">P</kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 font-medium">Tandai untuk Ditinjau (Flag)</span>
                  <div className="flex items-center gap-1 font-mono">
                    <kbd className="px-2 py-0.5 rounded bg-white border border-slate-200 shadow-xs font-bold text-slate-800">F</kbd>
                    <span className="text-slate-400 text-[10px]">atau</span>
                    <kbd className="px-2 py-0.5 rounded bg-white border border-slate-200 shadow-xs font-bold text-slate-800">M</kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 font-medium">Putar Audio Listening</span>
                  <div className="flex items-center gap-1 font-mono">
                    <kbd className="px-2 py-0.5 rounded bg-white border border-slate-200 shadow-xs font-bold text-slate-800">Space</kbd>
                    <span className="text-slate-400 text-[10px]">atau</span>
                    <kbd className="px-2 py-0.5 rounded bg-white border border-slate-200 shadow-xs font-bold text-slate-800">R</kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 font-medium">Buka Panduan Pintasan Ini</span>
                  <kbd className="px-2 py-0.5 rounded bg-white border border-slate-200 shadow-xs font-bold text-slate-800 font-mono">?</kbd>
                </div>
              </div>

              <button
                onClick={() => setShowShortcutsModal(false)}
                className="w-full mt-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-soft transition-colors"
              >
                Mengerti (Lanjutkan Ujian)
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==============================================================
  // VIEW 5: MAIN EXAM PREP HUB (CATALOG OF ALL OFFICIAL MOCKUP TESTS)
  // ==============================================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      
      {/* CANDIDATE CHECK-IN & AUDIO VERIFICATION MODAL */}
      {checkInTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in select-none">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-pop-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-600" />
                <h3 className="font-black text-slate-900 text-base sm:text-lg">
                  Candidate Examination Check-in
                </h3>
              </div>
              <button
                onClick={() => setCheckInTarget(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Candidate Details */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Candidate Name:</span>
                <span className="font-extrabold text-slate-800">{candidateName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Candidate Number:</span>
                <span className="font-mono text-brand-700 font-bold">{candidateNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Selected Mock Test:</span>
                <span className="font-bold text-slate-800 text-right">{checkInTarget.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Alokasi Waktu:</span>
                <span className="font-bold text-amber-700">{checkInTarget.durationMinutes} Menit ({checkInTarget.questionCountLabel})</span>
              </div>
            </div>

            {/* Equipment & Headset Sound Check */}
            <div className="mt-4 p-4 rounded-2xl bg-brand-50/60 border border-brand-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-brand-900 flex items-center gap-1.5">
                  <Headphones className="w-4 h-4 text-brand-600" />
                  <span>Uji Suara Headset / Speaker</span>
                </span>
                <span className="text-[10px] text-brand-700 font-semibold">Penting sebelum tes</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Pastikan volume suara Anda terdengar jelas untuk mendengarkan audio penguji penutur asli.
              </p>
              <button
                onClick={handlePlaySoundCheck}
                className="w-full py-2.5 rounded-xl bg-white border border-brand-300 text-xs font-bold text-brand-700 hover:bg-brand-50 shadow-soft-sm transition-all flex items-center justify-center gap-2"
              >
                <Volume2 className="w-4 h-4 text-brand-600" />
                <span>{isPlayingSoundCheck ? 'Memutar Audio Uji Suara...' : 'Putar Suara Uji Coba Headset'}</span>
              </button>
            </div>

            {/* Exam Rules Bulletins */}
            <div className="mt-4 text-[11px] text-slate-500 space-y-1">
              <p>• Timer akan berjalan otomatis begitu Anda menekan tombol di bawah.</p>
              <p>• Jawaban tersimpan otomatis secara real-time.</p>
              <p>• Pada akhir tes, laporan diagnostik resmi dan sertifikat nilai akan diterbitkan.</p>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setCheckInTarget(null)}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmStartTest}
                className="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-glow-brand flex items-center justify-center gap-1.5"
              >
                <span>Masuk ke Ruang Ujian</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3.5 py-1 rounded-full border border-brand-100 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
          <span>Official Mockup Test Center (IELTS • TOEFL • TOEIC)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
          Simulasi Ujian Resmi (Official Mock Tests)
        </h1>
        <p className="text-sm text-slate-500">
          Ujian mockup sesungguhnya dengan format Computer-Based Test (CBT), timer resmi, audio penutur asli, esai interaktif, wawancara speaking, serta sertifikat nilai terstandarisasi.
        </p>
      </div>

      {/* 3 Main Options Selector: IELTS, TOEFL, TOEIC */}
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

      {/* Exam Details & Interactive Mock Test Catalog */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left: Overview & Candidate Card */}
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
          <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
            {examInfo.tagline}
          </p>

          <div className="space-y-3 mb-6 text-xs font-semibold text-slate-700">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <span className="text-slate-400">Candidate Profil:</span>
              <span className="text-slate-900 font-extrabold">{candidateName}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <span className="text-slate-400">Rentang Skor:</span>
              <span className="text-brand-600 font-bold">{examInfo.scoringRange}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Target / Cocok Untuk:</span>
              <span>{examInfo.bestFor}</span>
            </div>
            <div className="p-3 rounded-xl bg-brand-50/50 border border-brand-100 text-brand-900">
              <span className="font-bold block mb-0.5">Standar Kelulusan:</span>
              <span className="font-normal">{examInfo.scoringGuide}</span>
            </div>
          </div>

          {/* Official Exam Format Breakdown (Reference Syllabus) */}
          <div className="pt-4 border-t border-slate-100 mb-6">
            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2.5">
              <span>Struktur Format Ujian</span>
              <span>4 Komponen Resmi</span>
            </div>
            <div className="space-y-2">
              {examInfo.sections.map((sec, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {sec.name === 'Listening' ? <Headphones className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" /> :
                     sec.name === 'Reading' ? <BookOpen className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" /> :
                     sec.name === 'Writing' ? <PenTool className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" /> :
                     <Mic className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />}
                    <span className="font-bold text-slate-800">{sec.name}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200/80">
                    {sec.duration} • {sec.questionsCount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => {
              const fullTest = examMockCatalog.find(t => t.type === 'full') || examMockCatalog[0];
              handleOpenCheckIn(fullTest);
            }}
            className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-glow-brand transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Mulai Full Mockup Test 1 (22 Soal • 25 Menit)</span>
          </button>
        </div>

        {/* Right: DAFTAR MOCKUP TEST RESMI YANG SIAP DIKERJAKAN */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Pusat Ujian & Latihan Mockup {selectedExam}
              </h3>
              <p className="text-xs text-slate-500">
                Pilih antara simulasi ujian penuh (full test) atau latihan fokus per seksi
              </p>
            </div>
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 shadow-soft-sm">
              {examMockCatalog.length} Paket Ujian
            </span>
          </div>

          {/* DUAL MODE SELECTOR: UJIAN PENUH LENGKAP VS LATIHAN PER SEKSI */}
          <div className="p-1.5 rounded-2xl bg-slate-100 border border-slate-200/90 grid grid-cols-1 sm:grid-cols-3 gap-1.5">
            <button
              onClick={() => {
                sounds.playClick();
                setCatalogTab('full');
              }}
              className={`py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all ${
                catalogTab === 'full'
                  ? 'bg-white text-brand-700 shadow-soft-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <span>🏆 Ujian Penuh ({fullMockCount})</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setCatalogTab('sectional');
              }}
              className={`py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all ${
                catalogTab === 'sectional'
                  ? 'bg-white text-brand-700 shadow-soft-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
              <span>🎯 Latihan Per Seksi ({sectionalMockCount})</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setCatalogTab('all');
              }}
              className={`py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all ${
                catalogTab === 'all'
                  ? 'bg-white text-brand-700 shadow-soft-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Semua Paket ({examMockCatalog.length})</span>
            </button>
          </div>

          {/* Explanatory Banner based on Selected Tab */}
          {catalogTab === 'full' && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-extrabold text-amber-950 block">
                  Simulasi Lengkap Resmi (Full CBT Mock Test)
                </span>
                <span className="text-amber-800 leading-relaxed block mt-0.5">
                  Menggabungkan seluruh komponen ujian (Listening + Reading) secara terpadu dengan durasi 25 menit, 22 soal autentik, Question Navigator 1–22, timer ketat, serta lembar sertifikat nilai resmi TRF (Test Report Form).
                </span>
              </div>
            </div>
          )}

          {catalogTab === 'sectional' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-extrabold text-brand-950 block">
                    Latihan Terfokus Per Seksi (Listening, Reading, Writing, Speaking)
                  </span>
                  <span className="text-brand-800 leading-relaxed block mt-0.5">
                    Fokus latih kelemahan spesifik Anda tanpa harus menghabiskan waktu mengerjakan seluruh rangkaian ujian. Pilih filter seksi di bawah untuk mulai latihan mandiri.
                  </span>
                </div>
              </div>

              {/* Sub-Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pb-1">
                {[
                  { id: 'all', label: `Semua Seksi (${sectionalMockCount})` },
                  { id: 'listening', label: '🎧 Listening Mockup' },
                  { id: 'reading', label: '📖 Reading Mockup' },
                  { id: 'writing', label: '✍️ Writing Mockup' },
                  { id: 'speaking', label: '🎙️ Speaking Mockup' },
                ].map((pill) => {
                  const isPillActive = sectionalSkillFilter === pill.id;
                  return (
                    <button
                      key={pill.id}
                      onClick={() => {
                        sounds.playClick();
                        setSectionalSkillFilter(pill.id as any);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isPillActive
                          ? 'bg-brand-600 text-white shadow-soft-sm'
                          : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cards List */}
          {displayedMockCatalog.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center text-slate-400">
              <p className="text-sm font-semibold">Tidak ada paket ujian pada filter ini.</p>
              <button
                onClick={() => setSectionalSkillFilter('all')}
                className="mt-2 text-xs font-bold text-brand-600 underline"
              >
                Tampilkan semua seksi
              </button>
            </div>
          ) : (
            displayedMockCatalog.map((mockCard) => {
              const isFull = mockCard.type === 'full';
              return (
                <div
                  key={mockCard.id}
                  className={`p-5 sm:p-6 rounded-3xl bg-white border transition-all group ${
                    isFull
                      ? 'border-amber-200/90 shadow-soft hover:border-amber-400 ring-1 ring-amber-100/50'
                      : 'border-slate-200/90 shadow-soft-sm hover:border-brand-400 hover:shadow-soft'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        isFull
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : mockCard.type === 'listening'
                          ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                          : mockCard.type === 'reading'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : mockCard.type === 'writing'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}>
                        {mockCard.badge}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {mockCard.difficulty}
                      </span>
                    </div>

                    <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                      isFull
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'text-brand-600 bg-brand-50'
                    }`}>
                      {mockCard.durationMinutes} Mins • {mockCard.questionCountLabel}
                    </span>
                  </div>

                  <h4 className={`text-base sm:text-lg font-black transition-colors ${
                    isFull
                      ? 'text-slate-900 group-hover:text-amber-600'
                      : 'text-slate-900 group-hover:text-brand-600'
                  }`}>
                    {mockCard.title}
                  </h4>
                  <p className="text-xs font-bold text-slate-500 mt-0.5 mb-2">
                    {mockCard.subtitle}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {mockCard.description}
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1.5">
                      {mockCard.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-600"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleOpenCheckIn(mockCard)}
                      className={`px-5 py-2 rounded-xl text-white font-bold text-xs shadow-soft transition-all flex items-center gap-1.5 active:scale-95 ml-auto ${
                        isFull
                          ? 'bg-amber-600 hover:bg-amber-700 shadow-glow-amber'
                          : 'bg-brand-600 hover:bg-brand-700'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>{isFull ? 'Mulai Ujian Penuh' : 'Mulai Latihan Seksi'}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
