import React from 'react';
import { Home, BookOpen, Layers, BarChart3 } from 'lucide-react';
import { sounds } from '../utils/sound';

interface Props {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const MobileNav: React.FC<Props> = ({ currentView, onNavigate }) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Layers },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
  ];

  const handleSelect = (id: string) => {
    sounds.playClick();
    onNavigate(id);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 pb-safe shadow-soft-lg">
      <div className="grid grid-cols-4 h-16">
        {tabs.map((tab) => {
          const isActive = tab.id === 'practice' 
            ? currentView === 'practice' || currentView === 'exam-prep'
            : currentView === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className="flex flex-col items-center justify-center gap-1 text-[10px] font-bold transition-all relative py-1"
            >
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 rounded-full bg-brand-600" />
              )}
              <Icon className={`w-5 h-5 transition-transform ${
                isActive ? 'text-brand-600 scale-110' : 'text-slate-400'
              }`} />
              <span className={isActive ? 'text-brand-600 font-extrabold' : 'text-slate-500'}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
