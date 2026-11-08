import React from 'react';
import { 
  Flame, Zap, Award, Target, TrendingUp, CheckCircle2, 
  BookOpen, Headphones, FileText, Mic, Sparkles, ArrowRight, Clock 
} from 'lucide-react';
import { UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface Props {
  user: UserProfile;
  onSelectRecommendedLesson: (lessonId: string) => void;
}

export const ProgressDashboard: React.FC<Props> = ({ user, onSelectRecommendedLesson }) => {
  // Skill breakdown percentages
  const skillsBreakdown = [
    { name: 'Vocabulary', score: 86, color: 'bg-emerald-500', note: '+12% this week' },
    { name: 'Grammar', score: 78, color: 'bg-blue-500', note: 'Steady progression' },
    { name: 'Reading', score: 82, color: 'bg-indigo-500', note: 'Strong academic score' },
    { name: 'Listening', score: 68, color: 'bg-amber-500', note: 'Needs focus' },
    { name: 'Speaking', score: 74, color: 'bg-purple-500', note: 'Good rhythm & fluency' },
    { name: 'Writing', score: 70, color: 'bg-rose-500', note: 'Clear structure' },
  ];

  // Weekly study minutes activity
  const weeklyData = [
    { day: 'Mon', minutes: 25, completed: true },
    { day: 'Tue', minutes: 30, completed: true },
    { day: 'Wed', minutes: 15, completed: true },
    { day: 'Thu', minutes: 35, completed: true },
    { day: 'Fri', minutes: 28, completed: true },
    { day: 'Sat', minutes: 40, completed: true },
    { day: 'Sun (Today)', minutes: 20, completed: true },
  ];

  // Badges & Achievements
  const achievements = [
    { title: '7-Day Streak Warrior', desc: 'Maintained uninterrupted daily practice', icon: Flame, earned: true },
    { title: 'Vocabulary Prodigy', desc: 'Mastered 250+ advanced academic words', icon: Sparkles, earned: true },
    { title: 'IELTS Explorer', desc: 'Completed first full timed academic mock', icon: Award, earned: true },
    { title: 'Sharp Ear Listener', desc: 'Achieved 90%+ in 5 listening sessions', icon: Headphones, earned: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Top Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Learning Analytics
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2 mb-2">
          Your Progress & Mastery Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Comprehensive evaluation of your CEFR progression, weekly study frequency, and skill breakdown.
        </p>
      </div>

      {/* 5 Core Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm">
          <p className="text-xs font-bold uppercase text-slate-400 mb-1">CEFR Level</p>
          <p className="text-2xl font-black text-slate-900">{user.cefr}</p>
          <p className="text-[10px] text-brand-600 font-semibold">{user.level}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm">
          <p className="text-xs font-bold uppercase text-slate-400 mb-1">Total XP</p>
          <div className="flex items-center gap-1">
            <Zap className="w-5 h-5 text-brand-600 fill-brand-600" />
            <p className="text-2xl font-black text-slate-900">{user.xp.toLocaleString()}</p>
          </div>
          <p className="text-[10px] text-mint-600 font-semibold">+180 this week</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm">
          <p className="text-xs font-bold uppercase text-slate-400 mb-1">Daily Streak</p>
          <div className="flex items-center gap-1">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            <p className="text-2xl font-black text-slate-900">{user.streak} Days</p>
          </div>
          <p className="text-[10px] text-amber-600 font-semibold">Keep it alive!</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm">
          <p className="text-xs font-bold uppercase text-slate-400 mb-1">Lessons Done</p>
          <p className="text-2xl font-black text-slate-900">{user.completedLessonsCount}</p>
          <p className="text-[10px] text-slate-400 font-semibold">Across all levels</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm col-span-2 sm:col-span-1">
          <p className="text-xs font-bold uppercase text-slate-400 mb-1">Accuracy</p>
          <p className="text-2xl font-black text-mint-600">{user.accuracy}%</p>
          <p className="text-[10px] text-slate-400 font-semibold">Drills & Mocks</p>
        </div>
      </div>

      {/* CEFR Progression Path Bar */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-soft mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            CEFR Milestones Progression
          </span>
          <span className="text-xs font-bold text-brand-600">
            Target: B2 / C1 Proficiency
          </span>
        </div>

        <div className="grid grid-cols-6 gap-2 text-center my-3">
          {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map((lvl, idx) => {
            const isCompleted = idx < 2; // A1, A2
            const isCurrent = idx === 2; // B1
            return (
              <div
                key={lvl}
                className={`py-2 rounded-xl text-xs font-black border transition-all ${
                  isCurrent
                    ? 'bg-brand-600 text-white border-brand-600 shadow-glow-brand ring-2 ring-brand-200'
                    : isCompleted
                    ? 'bg-mint-50 border-mint-200 text-mint-800'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                {lvl}
                {isCompleted && <span className="block text-[9px] font-normal">Passed</span>}
                {isCurrent && <span className="block text-[9px] font-bold">Active</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* TWO COLUMN GRID: Skill Breakdown + Weekly Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* SKILL BREAKDOWN (6 Skills) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-soft">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Skill Breakdown</h3>
              <p className="text-xs text-slate-400">Evaluated across all test sessions</p>
            </div>
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
              6 Skills
            </span>
          </div>

          <div className="space-y-4">
            {skillsBreakdown.map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-slate-800">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-normal">{item.note}</span>
                    <span className="text-slate-900">{item.score}%</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-700`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WEEKLY ACTIVITY CHART */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Weekly Activity</h3>
                <p className="text-xs text-slate-400">Study minutes logged per day</p>
              </div>
              <span className="text-xs font-bold text-mint-700 bg-mint-50 px-2.5 py-1 rounded-full">
                193 Total Mins
              </span>
            </div>

            {/* Vertical Bar Chart */}
            <div className="flex items-end justify-between gap-2 h-44 pt-6 px-2">
              {weeklyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500">{d.minutes}m</span>
                  <div className="w-full max-w-[32px] bg-slate-100 rounded-t-xl overflow-hidden flex flex-col justify-end h-32">
                    <div
                      className={`w-full rounded-t-xl transition-all duration-700 ${
                        i === weeklyData.length - 1 ? 'bg-brand-600' : 'bg-brand-400/80 hover:bg-brand-500'
                      }`}
                      style={{ height: `${(d.minutes / 45) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 whitespace-nowrap">
                    {d.day.substring(0, 3)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 text-xs font-medium text-slate-500 flex items-center justify-between">
            <span>🔥 7-Day Consistency Record</span>
            <span className="text-brand-600 font-bold">Goal met 7/7 days</span>
          </div>
        </div>
      </div>

      {/* RECOMMENDED NEXT & INSIGHTS (Exact prompt example) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-brand-50/70 border border-brand-200 shadow-soft mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
            Personalized Diagnostic
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-brand-950">
            You've improved your vocabulary by 12% this week.
          </h3>
          <p className="text-xs sm:text-sm text-brand-800">
            Your next recommended lesson is <span className="font-bold">Intermediate Listening (Connected Speech & Reductions)</span>.
          </p>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            onSelectRecommendedLesson('lesson-listening-essentials');
          }}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-soft transition-all flex items-center justify-center gap-2 flex-shrink-0 active:scale-95"
        >
          <span>Start Recommended Lesson</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* ACHIEVEMENTS & BADGES */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
          Earned Badges & Milestones
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((ach, idx) => {
            const Icon = ach.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  ach.earned
                    ? 'bg-white border-slate-200/90 shadow-soft-sm'
                    : 'bg-slate-50/60 border-slate-200 opacity-60'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  ach.earned ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-slate-200 text-slate-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-0.5">{ach.title}</h4>
                <p className="text-xs text-slate-500 leading-snug">{ach.desc}</p>
                <span className={`inline-block mt-3 text-[10px] font-bold px-2 py-0.5 rounded ${
                  ach.earned ? 'bg-mint-50 text-mint-700' : 'bg-slate-100 text-slate-400'
                }`}>
                  {ach.earned ? 'Unlocked' : 'In Progress'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

