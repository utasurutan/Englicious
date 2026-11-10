import React from 'react';
import { Flame, Clock, Sparkles } from 'lucide-react';

interface Props {
  streak: number;
}

export const ActivityHeatmap: React.FC<Props> = ({ streak }) => {
  // Generate 12 weeks of historical daily data
  const weeks = 12;
  const daysPerWeek = 7;
  const totalDays = weeks * daysPerWeek;

  // Simulate active days leading up to today
  const dayActivity = Array.from({ length: totalDays }).map((_, index) => {
    const daysAgo = totalDays - 1 - index;
    // Current streak days are guaranteed active
    if (daysAgo < streak) {
      return { level: Math.min(4, Math.floor(Math.random() * 2) + 3), mins: Math.floor(Math.random() * 20) + 20 };
    }
    // Random past activity
    const rand = Math.random();
    if (rand > 0.6) {
      return { level: Math.floor(Math.random() * 4) + 1, mins: Math.floor(Math.random() * 30) + 10 };
    }
    return { level: 0, mins: 0 };
  });

  const getCellColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-mint-200';
      case 2: return 'bg-mint-300';
      case 3: return 'bg-mint-400';
      case 4: return 'bg-mint-500';
      default: return 'bg-slate-100';
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-soft">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-base font-black text-slate-900">Study Habit Heatmap</h3>
          <p className="text-xs text-slate-400">Daily learning frequency across the last 12 weeks</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
          <Flame className="w-3.5 h-3.5 fill-amber-500" />
          <span>{streak} Day Current Streak</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 min-w-[500px]">
          {dayActivity.map((day, idx) => (
            <div
              key={idx}
              className={`w-3.5 h-3.5 rounded-sm transition-transform hover:scale-125 ${getCellColor(day.level)}`}
              title={day.mins > 0 ? `${day.mins} minutes studied` : 'Rest day'}
            />
          ))}
        </div>
      </div>

      {/* Legend & Stats */}
      <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-[11px] text-slate-400 font-semibold">
        <span>Less active</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-slate-100" />
          <span className="w-2.5 h-2.5 rounded-sm bg-mint-200" />
          <span className="w-2.5 h-2.5 rounded-sm bg-mint-300" />
          <span className="w-2.5 h-2.5 rounded-sm bg-mint-400" />
          <span className="w-2.5 h-2.5 rounded-sm bg-mint-500" />
        </div>
        <span>More active</span>
      </div>
    </div>
  );
};
