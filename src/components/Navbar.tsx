import React, { useState, useRef, useEffect } from 'react';
import { 
  Flame, Zap, Volume2, VolumeX, Sparkles, BookOpen, Layers, 
  Award, BarChart3, Trophy, ChevronDown, Check, Globe
} from 'lucide-react';
import { UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface Props {
  currentView: string;
  onNavigate: (view: string) => void;
  user: UserProfile;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenLeaderboard?: () => void;
  onOpenCertificate?: () => void;
  onOpenSpeedChallenge?: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentView,
  onNavigate,
  user,
  soundEnabled,
  onToggleSound,
  onOpenLeaderboard,
  onOpenCertificate,
  onOpenSpeedChallenge
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPracticeDropdownOpen, setIsPracticeDropdownOpen] = useState(false);
  
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const practiceDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (practiceDropdownRef.current && !practiceDropdownRef.current.contains(event.target as Node)) {
        setIsPracticeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (id: string) => {
    sounds.playClick();
    setIsProfileOpen(false);
    setIsPracticeDropdownOpen(false);
    onNavigate(id);
  };

  const isPracticeActive = currentView === 'practice' || currentView === 'exam-prep';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo - Navigates to Dashboard or Home */}
        <div 
          onClick={() => handleNav('dashboard')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          title="Englicious - Go to Dashboard"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
            <span className="font-black text-xl tracking-tighter">E</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
                Englicious
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-100">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block">Learn • Practice • Master</p>
          </div>
        </div>

        {/* Center Desktop Navigation - Essential 4 Core Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/70 shadow-soft-sm">
          {/* Dashboard */}
          <button
            onClick={() => handleNav('dashboard')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentView === 'dashboard'
                ? 'bg-white text-brand-600 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${currentView === 'dashboard' ? 'text-brand-600' : 'text-slate-400'}`} />
            <span>Dashboard</span>
          </button>

          {/* Learn */}
          <button
            onClick={() => handleNav('learn')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentView === 'learn'
                ? 'bg-white text-brand-600 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <BookOpen className={`w-3.5 h-3.5 ${currentView === 'learn' ? 'text-brand-600' : 'text-slate-400'}`} />
            <span>Learn</span>
          </button>

          {/* Practice (Includes Dropdown with Skill Studios & Exam Prep) */}
          <div className="relative" ref={practiceDropdownRef}>
            <div className="flex items-center">
              <button
                onClick={() => handleNav('practice')}
                className={`flex items-center gap-1.5 pl-3.5 pr-1.5 py-1.5 rounded-l-lg text-xs font-bold transition-all ${
                  isPracticeActive
                    ? 'bg-white text-brand-600 shadow-soft-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Layers className={`w-3.5 h-3.5 ${isPracticeActive ? 'text-brand-600' : 'text-slate-400'}`} />
                <span>Practice</span>
              </button>
              <button
                onClick={() => setIsPracticeDropdownOpen(!isPracticeDropdownOpen)}
                className={`px-1.5 py-1.5 rounded-r-lg text-xs font-bold transition-all border-l ${
                  isPracticeActive
                    ? 'bg-white text-brand-600 border-slate-100 shadow-soft-sm'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-white/50 border-slate-200/50'
                }`}
                title="Practice sub-sections"
              >
                <ChevronDown className={`w-3 h-3 transition-transform ${isPracticeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Practice Dropdown Menu */}
            {isPracticeDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-soft-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <button
                  onClick={() => handleNav('practice')}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group"
                >
                  <div className="p-2 rounded-lg bg-brand-50 text-brand-600 group-hover:bg-brand-100 transition-colors mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Skill Studios</p>
                    <p className="text-[11px] text-slate-400 leading-tight">Listening, Reading, Writing, Speaking & SRS</p>
                  </div>
                </button>

                <button
                  onClick={() => handleNav('exam-prep')}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group"
                >
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-100 transition-colors mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-slate-800">Exam Prep Hub</p>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">Mocks</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">TOEFL iBT, IELTS & TOEIC Simulators</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Progress */}
          <button
            onClick={() => handleNav('progress')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentView === 'progress'
                ? 'bg-white text-brand-600 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <BarChart3 className={`w-3.5 h-3.5 ${currentView === 'progress' ? 'text-brand-600' : 'text-slate-400'}`} />
            <span>Progress</span>
          </button>
        </nav>

        {/* Right Side: Compact Stats Pill & User Profile Menu */}
        <div className="flex items-center gap-3">
          {/* Combined Compact Stats Pill (Streak + XP in One Clean Component) */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200/80 text-xs font-bold shadow-soft-sm">
            <div className="flex items-center gap-1 text-amber-600" title="Daily Streak">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
              <span>{user.streak}d</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1 text-brand-600" title="Total XP Earned">
              <Zap className="w-4 h-4 fill-brand-600 text-brand-600" />
              <span>{user.xp.toLocaleString()} <span className="hidden sm:inline">XP</span></span>
            </div>
          </div>

          {/* User Profile Avatar with Contextual Dropdown */}
          <div className="relative" ref={profileMenuRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 transition-colors select-none"
              aria-label="User profile and settings menu"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-500 text-white font-bold text-xs flex items-center justify-center shadow-soft-sm ring-2 ring-white">
                {user.name.charAt(0)}
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-xs font-bold text-slate-800 leading-tight">{user.name}</p>
                <p className="text-[10px] text-brand-600 font-semibold">{user.cefr} • {user.level}</p>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* User Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-soft-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {/* Profile Header Card */}
                <div className="p-3 mb-1 bg-gradient-to-br from-slate-50 to-brand-50/40 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-brand-600 text-white">
                      {user.cefr}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{user.level} Learner</p>
                </div>

                <div className="space-y-0.5 pt-1 border-t border-slate-100">
                  {/* Weekly League Modal Trigger */}
                  {onOpenLeaderboard && (
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setIsProfileOpen(false);
                        onOpenLeaderboard();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-900 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span>Weekly League</span>
                      </div>
                      <span className="text-[10px] text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full font-semibold">
                        Rank #4
                      </span>
                    </button>
                  )}

                  {/* Verified Certificate Modal Trigger */}
                  {onOpenCertificate && (
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setIsProfileOpen(false);
                        onOpenCertificate();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-2"
                    >
                      <Award className="w-4 h-4 text-brand-600" />
                      <span>Verified Certificate</span>
                    </button>
                  )}

                  {/* 60s Speed Drill Mini-Game Trigger */}
                  {onOpenSpeedChallenge && (
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setIsProfileOpen(false);
                        onOpenSpeedChallenge();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span>60s Speed Drill</span>
                    </button>
                  )}

                  {/* Sound FX Toggle */}
                  <button
                    onClick={() => {
                      onToggleSound();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      {soundEnabled ? (
                        <Volume2 className="w-4 h-4 text-brand-600" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-slate-400" />
                      )}
                      <span>Sound Effects</span>
                    </div>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      soundEnabled ? 'bg-mint-50 text-mint-700' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {soundEnabled ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  {/* Marketing / Overview Landing Page */}
                  <button
                    onClick={() => handleNav('landing')}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-2 pt-2 border-t border-slate-100"
                  >
                    <Globe className="w-4 h-4 text-slate-400" />
                    <span>Platform Overview (Landing)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
