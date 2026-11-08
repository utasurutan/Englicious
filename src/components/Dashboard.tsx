import React from 'react';
import { 
  Play, Flame, Zap, CheckCircle2, AlertCircle, ArrowRight, 
  Sparkles, Clock, BookOpen, Headphones, FileText, Mic, Award, Compass 
} from 'lucide-react';
import { UserProfile, Lesson, SkillCategory } from '../types';
import { sounds } from '../utils/sound';

interface Props {
  user: UserProfile;
  lessons: Lesson[];
  onStartLesson: (lesson: Lesson) => void;
  onNavigate: (view: string) => void;
}

export const Dashboard: React.FC<Props> = ({
  user,
  lessons,
  onStartLesson,
  onNavigate
}) => {
  // Dynamic greeting based on user's local time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // The active lesson to continue (e.g. Simple Past Tense 72%)
  const continueLesson = lessons.find(l => l.id === 'lesson-past-tense') || lessons[0];

  // Recommended lessons for flexible horizontal list
  const recommendedItems = [
    {
      category: 'Listening' as SkillCategory,
      title: 'Fast Speech & Reductions',
      time: '10 min',
      xp: '+75 XP',
      lessonId: 'lesson-listening-essentials',
      icon: Headphones,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      category: 'Grammar' as SkillCategory,
      title: 'Past Continuous vs Simple Past',
      time: '8 min',
      xp: '+80 XP',
      lessonId: 'lesson-past-tense',
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      category: 'Vocabulary' as SkillCategory,
      title: 'High-Frequency Idioms',
      time: '6 min',
      xp: '+65 XP',
      lessonId: 'lesson-vocab-foundations',
      icon: Sparkles,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      category: 'Reading' as SkillCategory,
      title: 'Urban Architecture & Ecology',
      time: '12 min',
      xp: '+90 XP',
      lessonId: 'lesson-reading-mastery',
      icon: FileText,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    }
  ];

  const handleStartContinue = () => {
    sounds.playClick();
    onStartLesson(continueLesson);
  };

  const handleStartRecommended = (lessonId: string) => {
    sounds.playClick();
    const found = lessons.find(l => l.id === lessonId);
    if (found) {
      onStartLesson(found);
    } else {
      onStartLesson(continueLesson);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* TOP GREETING & STATS STRIP */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {getGreeting()}, {user.name} 👋
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              You are making steady progress toward your <span className="font-semibold text-brand-600">{user.goal}</span> target.
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onNavigate('learn');
            }}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 shadow-soft-sm transition-all"
          >
            <Compass className="w-4 h-4 text-brand-600" />
            <span>Explore Learning Path</span>
          </button>
        </div>

        {/* 5-Column Clean Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          {/* 1. Level */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Level</p>
            <p className="text-lg font-black text-slate-900">{user.cefr} <span className="text-xs font-semibold text-slate-500 font-sans">• {user.level}</span></p>
          </div>

          {/* 2. Daily Goal */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Daily Goal</p>
            <div className="flex items-center justify-between">
              <p className="text-lg font-black text-slate-900">{user.todayMinutes}/{user.dailyGoalMinutes} <span className="text-xs font-normal text-slate-500">mins</span></p>
              <div className="w-6 h-6 rounded-full border-2 border-brand-500 border-t-transparent animate-spin-slow hidden sm:block" />
            </div>
          </div>

          {/* 3. XP */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Total XP</p>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-brand-600 fill-brand-600" />
              <p className="text-lg font-black text-slate-900">{user.xp.toLocaleString()}</p>
            </div>
          </div>

          {/* 4. Streak */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Daily Streak</p>
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <p className="text-lg font-black text-slate-900">{user.streak} <span className="text-xs font-normal text-slate-500">days</span></p>
            </div>
          </div>

          {/* 5. Overall Progress */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm col-span-2 sm:col-span-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Overall Path</p>
            <div className="flex items-center justify-between">
              <p className="text-lg font-black text-slate-900">{user.overallProgress}%</p>
              <div className="w-12 h-2 rounded-full bg-slate-100 overflow-hidden ml-2">
                <div className="h-full bg-mint-500 rounded-full" style={{ width: `${user.overallProgress}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN SECTION: CONTINUE LEARNING HERO */}
      <section className="mb-10">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Continue Learning
        </h2>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-soft-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle accent border */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-brand-600" />

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-100">
                {continueLesson.level} • {continueLesson.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {continueLesson.estimatedMinutes} mins
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              {continueLesson.title}
            </h3>
            <p className="text-sm text-slate-500 max-w-xl">
              {continueLesson.subtitle}
            </p>

            {/* Clear Progress Indicator */}
            <div className="pt-2 max-w-sm">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-500">Progress</span>
                <span className="text-brand-600">{continueLesson.progressPercent}% complete</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-brand-600 rounded-full transition-all duration-700"
                  style={{ width: `${continueLesson.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Prominent Continue Button */}
          <button
            onClick={handleStartContinue}
            className="w-full md:w-auto px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-glow-brand transition-all flex items-center justify-center gap-2.5 active:scale-95 flex-shrink-0"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Continue Lesson</span>
          </button>
        </div>
      </section>

      {/* WEAK AREAS SMART INSIGHT CARD */}
      <section className="mb-10">
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-soft-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-800">Your Weak Areas</p>
                <span className="text-[10px] bg-amber-200/60 text-amber-900 px-2 py-0.5 rounded font-bold">Smart Diagnostic</span>
              </div>
              <p className="text-sm text-amber-950 font-medium mt-0.5">
                Your listening accuracy is lower than your reading performance. Try a 10-minute listening lesson today.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleStartRecommended('lesson-listening-essentials')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-soft transition-all flex items-center justify-center gap-1.5 flex-shrink-0 active:scale-95"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Start 10-min Listening Drill</span>
          </button>
        </div>
      </section>

      {/* RECOMMENDED FOR YOU (Flexible horizontal learning list) */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Recommended for You
          </h2>
          <span className="text-xs font-semibold text-slate-400">
            Based on {user.cefr} goals
          </span>
        </div>

        {/* Horizontal flexible learning list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => handleStartRecommended(item.lessonId)}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm hover:shadow-soft hover:border-brand-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${item.color}`}>
                      {item.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-1 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400">Interactive practice session</p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs font-bold text-brand-600">
                  <span>{item.xp}</span>
                  <div className="w-7 h-7 rounded-full bg-slate-50 group-hover:bg-brand-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* STANDARDIZED EXAM PREP SHORTCUT BANNER */}
      <section>
        <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-soft-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30 text-xs font-bold mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Exam Prep Hub</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Preparing for TOEFL, IELTS, or TOEIC?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg">
              Take full timed section tests with band score analytics and diagnostic feedback.
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onNavigate('exam-prep');
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-soft transition-all flex items-center justify-center gap-2 active:scale-95 flex-shrink-0"
          >
            <span>Open Exam Simulator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

