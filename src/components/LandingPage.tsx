import React, { useState } from 'react';
import { 
  ArrowRight, Sparkles, Volume2, Play, Pause, RotateCcw, 
  Check, Flame, Zap, Award, BookOpen, Compass, ShieldCheck, 
  MessageSquare, ChevronRight, Headphones, FileText, CheckCircle2 
} from 'lucide-react';
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

              {/* Main Interactive Demo Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft-lg p-6 sm:p-7 relative overflow-hidden">
                {/* Top mini lesson bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-mint-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-700">Live Interactive Preview</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
                    Tap to test
                  </span>
                </div>

                {/* 1. Interactive Vocabulary Card Preview */}
                <div 
                  onClick={handleDemoFlip}
                  className="p-5 rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/30 cursor-pointer shadow-soft-sm hover:shadow-soft transition-all mb-4 select-none group"
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
    </div>
  );
};

