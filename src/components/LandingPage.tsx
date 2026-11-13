import React, { useState } from 'react';
import { 
  ArrowRight, Sparkles, Volume2, Play, Pause, RotateCcw, 
  Check, Flame, Zap, Award, BookOpen, Compass, ShieldCheck, 
  MessageSquare, ChevronRight, Headphones, FileText, CheckCircle2,
  Film, X, ChevronLeft, Eye, Star, Layers
} from 'lucide-react';
import { VisualObjectRenderer } from './activities/VisualObjectRenderer';
import { sounds } from '../utils/sound';
import { SpeechService } from '../utils/speech';

interface Props {
  onStartLearning: () => void;
  onExploreCourses: () => void;
  onOpenExamPrep: () => void;
}

export const LandingPage: React.FC<Props> = ({
  onStartLearning,
  onExploreCourses,
  onOpenExamPrep
}) => {
  // Showcase mode on Hero: 'thumbnail' (Video-style thumbnail requested by teacher) or 'interactive'
  const [showcaseMode, setShowcaseMode] = useState<'thumbnail' | 'interactive'>('thumbnail');
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [activeTourSlide, setActiveTourSlide] = useState(0);

  // Interactive Mini-Demo state on the Hero right column!
  const [demoFlipped, setDemoFlipped] = useState(false);
  const [demoPlayingAudio, setDemoPlayingAudio] = useState(false);
  const [demoWordOrder, setDemoWordOrder] = useState<string[]>(['school', 'yesterday', 'I', 'went', 'to']);
  const [demoSentence, setDemoSentence] = useState<string[]>([]);

  const handleDemoFlip = () => {
    sounds.playClick();
    setDemoFlipped(!demoFlipped);
  };

  const handleDemoAudio = () => {
    if (demoPlayingAudio) {
      SpeechService.stop();
      setDemoPlayingAudio(false);
    } else {
      sounds.playClick();
      setDemoPlayingAudio(true);
      SpeechService.speak('Perseverance. Continued effort despite difficulties.', 0.95, 1.0, () => {
        setDemoPlayingAudio(false);
      });
    }
  };

  const handleDemoWordClick = (word: string, idx: number) => {
    sounds.playClick();
    setDemoSentence(prev => [...prev, word]);
    setDemoWordOrder(prev => prev.filter((_, i) => i !== idx));
  };

  const handleResetDemoWords = () => {
    sounds.playClick();
    setDemoWordOrder(['school', 'yesterday', 'I', 'went', 'to']);
    setDemoSentence([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[420px] bg-gradient-to-b from-brand-50/70 via-brand-50/20 to-transparent pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline & CTAs */}
            <div className="lg:col-span-6 text-center lg:text-left">
              {/* Product Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-200/80 shadow-soft-sm text-xs font-bold text-brand-700 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>Next-Generation English Learning</span>
              </div>

              {/* Exact user requested headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] mb-6">
                Learn English.<br />
                <span className="text-brand-600">Practice Naturally.</span><br />
                Reach Your Goal.
              </h1>

              {/* Exact user requested supporting text */}
              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                An interactive English learning platform designed to help you build real English skills and prepare for TOEFL, IELTS, and TOEIC.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onStartLearning();
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-glow-brand transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    onExploreCourses();
                  }}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-base shadow-soft-sm transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>Explore Courses</span>
                  <Compass className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Social Proof & Metrics */}
              <div className="pt-6 border-t border-slate-200/80 flex items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-mint-600" />
                  <span>Beginner to C2 Mastery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-mint-600" />
                  <span>IELTS • TOEFL • TOEIC</span>
                </div>
                <div className="flex items-center gap-1.5 hidden sm:flex">
                  <CheckCircle2 className="w-4 h-4 text-mint-600" />
                  <span>Real Audio Feedback</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visually Engaging Live Interactive Product Showcase */}
            <div className="lg:col-span-6 relative">
              {/* Floating learning elements */}
              <div className="absolute -top-6 -left-6 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-slate-200/90 shadow-soft-lg animate-float">
                <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Flame className="w-4 h-4 fill-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold">DAILY STREAK</p>
                  <p className="text-xs font-extrabold text-slate-800">5 Days Active</p>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-4 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-slate-200/90 shadow-soft-lg animate-float-delayed">
                <div className="w-7 h-7 rounded-xl bg-mint-50 text-mint-600 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold">IELTS PREP</p>
                  <p className="text-xs font-extrabold text-slate-800">Band 7.5 Target</p>
                </div>
              </div>

              {/* Main Showcase Container: Switch between Thumbnail Showcase & Live Interactive Quiz */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft-lg p-5 sm:p-6 relative overflow-hidden">
                {/* Top Mode Switcher Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200/70 text-xs font-bold">
                    <button
                      onClick={() => { sounds.playClick(); setShowcaseMode('thumbnail'); }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                        showcaseMode === 'thumbnail'
                          ? 'bg-white text-brand-600 shadow-soft-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Film className="w-3.5 h-3.5 text-brand-600" />
                      <span>Platform Thumbnail Tour</span>
                    </button>
                    <button
                      onClick={() => { sounds.playClick(); setShowcaseMode('interactive'); }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                        showcaseMode === 'interactive'
                          ? 'bg-white text-brand-600 shadow-soft-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Live Mini Quiz</span>
                    </button>
                  </div>

                  <span className="text-[11px] font-mono font-semibold text-mint-700 bg-mint-50 px-2 py-0.5 rounded-md border border-mint-200/60 hidden sm:inline">
                    Englicious 2.0
                  </span>
                </div>

                {/* SHOWCASE MODE 1: CINEMATIC THUMBNAIL (As Requested by Teacher) */}
                {showcaseMode === 'thumbnail' ? (
                  <div 
                    onClick={() => {
                      sounds.playClick();
                      setIsTourModalOpen(true);
                    }}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-soft hover:shadow-soft-xl transition-all border border-slate-200 select-none aspect-video bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 flex flex-col justify-between p-4 sm:p-5"
                  >
                    {/* Background Visual Graphic with 3D Elements */}
                    <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:20px_20px]" />
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-500/30 rounded-full blur-2xl group-hover:bg-brand-500/40 transition-colors pointer-events-none" />
                    
                    {/* Floating 3D Object Preview Inside Thumbnail */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 group-hover:opacity-100 transition-all group-hover:scale-105 pointer-events-none scale-75 sm:scale-90">
                      <VisualObjectRenderer objectId="apple" rotation={{ x: 15, y: -25 }} />
                    </div>

                    {/* Top Thumbnail Badges */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-brand-600/90 text-white font-extrabold text-[10px] tracking-wider uppercase backdrop-blur-md shadow-soft-sm flex items-center gap-1">
                          <Film className="w-3 h-3" />
                          <span>Platform Tour</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-white/10 text-white/90 text-[10px] font-mono backdrop-blur-md">
                          Full HD 1080p
                        </span>
                      </div>

                      <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 text-amber-400 font-bold text-[10px] backdrop-blur-md border border-white/10 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>4.9 / 5.0</span>
                      </span>
                    </div>

                    {/* Center Glowing Play Button */}
                    <div className="relative z-10 my-auto text-center flex flex-col items-center justify-center py-2">
                      <div className="relative mb-2">
                        {/* Pulsing glow ring */}
                        <div className="absolute inset-0 rounded-full bg-brand-500/40 animate-ping" />
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-600 group-hover:bg-brand-500 text-white flex items-center justify-center shadow-glow-brand group-hover:scale-110 transition-transform relative z-10">
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-1" />
                        </div>
                      </div>
                      <p className="text-white font-black text-sm sm:text-base tracking-wide drop-shadow-md">
                        Preview Interactive Tour
                      </p>
                      <p className="text-white/70 text-xs drop-shadow-sm hidden sm:block">
                        Klik untuk melihat demonstrasi 3D objek, materi teori, & simulasi ujian
                      </p>
                    </div>

                    {/* Bottom Video Controls Mockup Bar */}
                    <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-white/80 text-[10px] font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-brand-400 font-bold">01:45</span>
                        <span>/</span>
                        <span>04:30</span>
                        <div className="w-20 sm:w-28 h-1 bg-white/20 rounded-full overflow-hidden">
                          <div className="w-2/5 h-full bg-brand-500 rounded-full" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-mint-400 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-mint-400 animate-pulse" />
                          Audio Synthesizer
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-white/15 text-[9px]">CC</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* SHOWCASE MODE 2: LIVE MINI INTERACTIVE SANDBOX */
                  <div>
                    {/* 1. Interactive Vocabulary Card Preview */}
                    <div 
                      onClick={handleDemoFlip}
                      className="p-4 sm:p-5 rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/30 cursor-pointer shadow-soft-sm hover:shadow-soft transition-all mb-4 select-none group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-white px-2 py-0.5 rounded-full border border-brand-100">
                          Vocabulary Card • Click to Flip
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDemoAudio();
                          }}
                          className="p-2 rounded-full bg-white hover:bg-brand-50 text-brand-700 shadow-soft-sm transition-transform active:scale-95"
                          title="Listen"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {!demoFlipped ? (
                        <div>
                          <h4 className="text-2xl font-black text-slate-900 mb-0.5 group-hover:text-brand-600 transition-colors">
                            PERSEVERANCE
                          </h4>
                          <p className="text-xs font-mono text-slate-500">/ˌpɜːrsəˈvɪrəns/ • noun</p>
                          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                            <span>Tap to reveal meaning & example</span>
                            <ChevronRight className="w-3.5 h-3.5 text-brand-500" />
                          </p>
                        </div>
                      ) : (
                        <div className="animate-pop-in">
                          <p className="text-xs font-bold text-slate-800 mb-1">
                            "Continued effort to do something despite difficulties or failure."
                          </p>
                          <p className="text-xs text-brand-700 italic bg-white p-2 rounded-lg border border-brand-100">
                            "Through dedication and perseverance, she earned a 9.0 in IELTS."
                          </p>
                        </div>
                      )}
                    </div>

                    {/* 2. Interactive Audio Waveform Player Preview */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-4">
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleDemoAudio}
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-transform active:scale-95 ${
                              demoPlayingAudio ? 'bg-amber-500 ring-2 ring-amber-200' : 'bg-brand-600 hover:bg-brand-700'
                            }`}
                          >
                            {demoPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                          </button>
                          <div>
                            <p className="text-xs font-bold text-slate-800">Native Audio Synthesis</p>
                            <p className="text-[10px] text-slate-400">Natural accent & pace</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200">
                          0.95x Speed
                        </span>
                      </div>

                      {/* Waveform bars */}
                      <div className="flex items-center justify-center gap-1 h-8 bg-white rounded-xl px-3 border border-slate-100">
                        {[30, 60, 40, 80, 50, 90, 70, 30, 60, 85, 45, 75, 55, 35].map((h, i) => (
                          <div
                            key={i}
                            className={`w-1 rounded-full transition-all ${
                              demoPlayingAudio ? 'bg-brand-600 wave-bar' : 'bg-slate-300'
                            }`}
                            style={{ height: demoPlayingAudio ? undefined : `${h * 0.25}px` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 3. Interactive Drag & Word-Builder Mini Preview */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200/80">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-slate-700">Sentence Builder</span>
                        <button
                          onClick={handleResetDemoWords}
                          className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1"
                        >
                          <RotateCcw className="w-3 h-3" /> Reset
                        </button>
                      </div>

                      {/* Assembled slots */}
                      <div className="min-h-[38px] p-2 rounded-xl bg-slate-50 border border-dashed border-slate-200 flex flex-wrap items-center gap-1.5 mb-2.5">
                        {demoSentence.length === 0 ? (
                          <span className="text-[11px] text-slate-400 italic">Tap words below to arrange:</span>
                        ) : (
                          demoSentence.map((w, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-md bg-brand-600 text-white font-bold text-xs">
                              {w}
                            </span>
                          ))
                        )}
                      </div>

                      {/* Bank words */}
                      <div className="flex flex-wrap gap-1.5">
                        {demoWordOrder.map((w, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleDemoWordClick(w, idx)}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 font-semibold text-xs border border-slate-200/80 transition-all active:scale-95"
                          >
                            {w}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE EXPERIENCE FLOW: Learn -> Practice -> Master -> Track Progress */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              The Learning Flow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-3">
              Learn → Practice → Master → Track Progress
            </h2>
            <p className="text-base text-slate-600">
              A structured methodology that moves from fundamental comprehension to rapid, unassisted recall and standardized test readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1: Learn */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 font-black text-lg flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Learn Fundamentals</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Concise explanations, contextual audio examples, IPA phonetics, and interactive vocabulary cards.
              </p>
            </div>

            {/* Step 2: Practice */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-mint-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-mint-100 text-mint-700 font-black text-lg flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Interactive Drills</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Drag-and-drop word order, audio dictation, speech recognition, and contextual sentence completion.
              </p>
            </div>

            {/* Step 3: Master */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-purple-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 font-black text-lg flex items-center justify-center mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Exam Mastery</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Realistic mock simulations for TOEFL, IELTS, and TOEIC with timing, review flags, and scaled score bands.
              </p>
            </div>

            {/* Step 4: Track Progress */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 font-black text-lg flex items-center justify-center mb-4">
                04
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Track & Optimize</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Automated detection of weak areas, personalized daily recommendations, and CEFR level analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXAM PREPARATION SPOTLIGHT */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                Standardized Exam Prep
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Engineered for TOEFL, IELTS & TOEIC
              </h2>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                onOpenExamPrep();
              }}
              className="text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1.5"
            >
              <span>Explore All Exam Modules</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* IELTS Card */}
            <div 
              onClick={() => {
                sounds.playClick();
                onOpenExamPrep();
              }}
              className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-soft hover:shadow-soft-lg hover:border-brand-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-50 text-rose-700 border border-rose-200">
                  IELTS Academic
                </span>
                <span className="text-xs font-bold text-slate-400">Band 0.0 - 9.0</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-600 transition-colors mb-2">
                IELTS Preparation
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                Listening, Reading, Writing, and Speaking modules with academic passage analysis and timing pressure.
              </p>
              <div className="flex items-center justify-between text-xs font-bold text-brand-600 pt-4 border-t border-slate-100">
                <span>Start Practice Mock</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* TOEFL Card */}
            <div 
              onClick={() => {
                sounds.playClick();
                onOpenExamPrep();
              }}
              className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-soft hover:shadow-soft-lg hover:border-brand-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-700 border border-blue-200">
                  TOEFL iBT
                </span>
                <span className="text-xs font-bold text-slate-400">0 - 120 Points</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-600 transition-colors mb-2">
                TOEFL Preparation
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                Reading academic journals, synthesizing campus lectures, and integrated speech and writing drills.
              </p>
              <div className="flex items-center justify-between text-xs font-bold text-brand-600 pt-4 border-t border-slate-100">
                <span>Start Practice Mock</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* TOEIC Card */}
            <div 
              onClick={() => {
                sounds.playClick();
                onOpenExamPrep();
              }}
              className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-soft hover:shadow-soft-lg hover:border-brand-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                  TOEIC Professional
                </span>
                <span className="text-xs font-bold text-slate-400">10 - 990 Points</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-600 transition-colors mb-2">
                TOEIC Preparation
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                Commercial listening, corporate memos, office correspondence, and workplace communication.
              </p>
              <div className="flex items-center justify-between text-xs font-bold text-brand-600 pt-4 border-t border-slate-100">
                <span>Start Practice Mock</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Ready to master English and hit your exam goals?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl mx-auto">
            Take our short 3-minute placement test and get your personalized learning path immediately.
          </p>
          <button
            onClick={() => {
              sounds.playClick();
              onStartLearning();
            }}
            className="px-9 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-glow-brand transition-all inline-flex items-center gap-2 active:scale-98"
          >
            <span>Start Free Placement & Learning</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* PLATFORM SHOWCASE & VIDEO TOUR MODAL */}
      {isTourModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-soft-2xl border border-slate-200 flex flex-col overflow-hidden animate-pop-in">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900">
                    Englicious Interactive Platform Showcase
                  </h3>
                  <p className="text-[11px] text-slate-400">Tur Demonstrasi Fitur & Pengalaman Belajar</p>
                </div>
              </div>
              <button
                onClick={() => setIsTourModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Interactive Slide Content */}
            <div className="p-6 sm:p-8">
              {/* Slide 0: 3D Visual Objects */}
              {activeTourSlide === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-7 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                      Fitur Baru: 3D Visual Object Engine
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                      Belajar Kosakata dengan Objek 3D Nyata
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Siswa tidak hanya menghafal teks! Englicious menampilkan objek visual 3D (Apple, Airplane, Coffee Mug, Headphones, Backpack, Car) yang dapat dirotasi secara interaktif, lengkap dengan pelafalan fonetik IPA dan contoh kalimat sehari-hari.
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-brand-600">
                      <CheckCircle2 className="w-4 h-4 text-mint-600" />
                      <span>Asosiasi visual langsung tanpa menerjemahkan</span>
                    </div>
                  </div>

                  <div className="sm:col-span-5 bg-gradient-to-br from-slate-50 to-brand-50/50 p-6 rounded-3xl border border-slate-200 flex flex-col items-center justify-center shadow-soft-sm">
                    <VisualObjectRenderer objectId="apple" rotation={{ x: 15, y: -20 }} />
                    <span className="text-xs font-bold text-slate-700 mt-2">Apple /ˈæp.əl/</span>
                  </div>
                </div>
              )}

              {/* Slide 1: Materi Pembelajaran Lengkap */}
              {activeTourSlide === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-7 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      Pusat Materi Belajar (Study Library)
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                      Bukan Sekadar Kuis — Ada Teori & Rumus Lengkap!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Platform menyediakan modul teori komprehensif: rumus tenses lengkap, tabel 30 Phrasal Verbs populer, aturan Passive Voice, Connected Speech, dan tips guru untuk menghindari kesalahan umum (common mistakes).
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-brand-600">
                      <CheckCircle2 className="w-4 h-4 text-mint-600" />
                      <span>Dilengkapi tombol audio untuk setiap contoh kalimat</span>
                    </div>
                  </div>

                  <div className="sm:col-span-5 bg-gradient-to-br from-slate-50 to-indigo-50/50 p-6 rounded-3xl border border-slate-200 flex flex-col items-center justify-center shadow-soft-sm">
                    <VisualObjectRenderer objectId="books" rotation={{ x: 15, y: -15 }} />
                    <span className="text-xs font-bold text-slate-700 mt-2">Grammar & Vocab Encyclopedia</span>
                  </div>
                </div>
              )}

              {/* Slide 2: Listening & Waveform */}
              {activeTourSlide === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-7 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      Listening Lab & Waveform Audio
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                      Audio Berkualitas Tinggi dengan Waveform Dinamis
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Latih ketajaman telinga Anda menangkap connected speech, reduksi kata (*gonna, wanna, coulda*), serta intonasi native speaker dengan visualisasi waveform dan pengatur kecepatan putar audio.
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-brand-600">
                      <CheckCircle2 className="w-4 h-4 text-mint-600" />
                      <span>Web Speech API & Web Audio Synthesizer native</span>
                    </div>
                  </div>

                  <div className="sm:col-span-5 bg-gradient-to-br from-slate-50 to-amber-50/50 p-6 rounded-3xl border border-slate-200 flex flex-col items-center justify-center shadow-soft-sm">
                    <VisualObjectRenderer objectId="headphones" rotation={{ x: 10, y: -10 }} />
                    <span className="text-xs font-bold text-slate-700 mt-2">Studio Headphones & Waveform</span>
                  </div>
                </div>
              )}

              {/* Slide 3: Exam Prep */}
              {activeTourSlide === 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-7 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Simulasi Resmi: TOEFL, IELTS, TOEIC
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                      Ujian Berstandar Internasional dengan Skala Nilai Nyata
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Uji kesiapan Anda menghadapi ujian IELTS (Band 0-9), TOEFL iBT (0-120), dan TOEIC (10-990). Dilengkapi dengan pengatur waktu otomatis, navigator pertanyaan, dan evaluasi kekuatan vs kelemahan Anda.
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-brand-600">
                      <CheckCircle2 className="w-4 h-4 text-mint-600" />
                      <span>Writing Lab & AI Roleplay Speaking Studio</span>
                    </div>
                  </div>

                  <div className="sm:col-span-5 bg-gradient-to-br from-slate-50 to-emerald-50/50 p-6 rounded-3xl border border-slate-200 flex flex-col items-center justify-center shadow-soft-sm">
                    <VisualObjectRenderer objectId="airplane" rotation={{ x: 20, y: -30 }} />
                    <span className="text-xs font-bold text-slate-700 mt-2">Ready for International Flight</span>
                  </div>
                </div>
              )}

              {/* Slide Navigation Dots */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {[0, 1, 2, 3].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => { sounds.playClick(); setActiveTourSlide(idx); }}
                    className={`h-2 rounded-full transition-all ${
                      activeTourSlide === idx ? 'w-8 bg-brand-600' : 'w-2 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Modal Action Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveTourSlide(prev => Math.max(0, prev - 1));
                  }}
                  disabled={activeTourSlide === 0}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Sebelumnya
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveTourSlide(prev => Math.min(3, prev + 1));
                  }}
                  disabled={activeTourSlide === 3}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Selanjutnya
                </button>
              </div>

              <button
                onClick={() => {
                  sounds.playClick();
                  setIsTourModalOpen(false);
                  onStartLearning();
                }}
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-glow-brand transition-all flex items-center gap-1.5 active:scale-95"
              >
                <span>Mulai Belajar Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

