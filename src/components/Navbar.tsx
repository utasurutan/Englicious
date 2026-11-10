import React from 'react';
import { Flame, Zap, Volume2, VolumeX, Sparkles, BookOpen, Layers, Award, BarChart3, Home, Trophy } from 'lucide-react';
import { UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface Props {
  currentView: string;
  onNavigate: (view: string) => void;
  user: UserProfile;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenLeaderboard?: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentView,
  onNavigate,
  user,
  soundEnabled,
  onToggleSound,
  onOpenLeaderboard
}) => {
  const navItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: Sparkles },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Layers },
    { id: 'exam-prep', label: 'Exam Prep', icon: Award },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
  ];

  const handleNav = (id: string) => {
    sounds.playClick();
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNav('landing')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
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

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1 rounded-xl border border-slate-200/60">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-white text-brand-600 shadow-soft-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Side: Badges & Profile */}
        <div className="flex items-center gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors hidden sm:flex"
            title={soundEnabled ? 'Mute audio cues' : 'Enable audio cues'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-brand-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Trophy Leaderboard Button */}
          {onOpenLeaderboard && (
            <button
              onClick={() => {
                sounds.playClick();
                onOpenLeaderboard();
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/80 text-xs font-bold hover:bg-amber-100 transition-colors shadow-soft-sm"
              title="View Weekly League Leaderboard"
            >
              <Trophy className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">League</span>
            </button>
          )}

          {/* Streak Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/80 text-xs font-bold shadow-soft-sm">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{user.streak} <span className="hidden sm:inline">Days</span></span>
          </div>

          {/* XP Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-brand-50 text-brand-800 border border-brand-200/80 text-xs font-bold shadow-soft-sm">
            <Zap className="w-4 h-4 text-brand-600 fill-brand-600" />
            <span>{user.xp.toLocaleString()} <span className="hidden sm:inline">XP</span></span>
          </div>

          {/* User Profile avatar & level badge */}
          <button 
            onClick={() => handleNav('dashboard')}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-500 text-white font-bold text-xs flex items-center justify-center shadow-soft-sm ring-2 ring-white">
              {user.name.charAt(0)}
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-xs font-bold text-slate-800 leading-tight">{user.name}</p>
              <p className="text-[10px] text-brand-600 font-semibold">{user.cefr} • {user.level}</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

