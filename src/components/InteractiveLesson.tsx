import React, { useState } from 'react';
import { X, Flame, Zap, Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson } from '../types';
import { FlashcardActivity } from './activities/FlashcardActivity';
import { DragDropActivity } from './activities/DragDropActivity';
import { CategorizeDragDrop } from './activities/CategorizeDragDrop';
import { MatchingActivity } from './activities/MatchingActivity';
import { FillBlankActivity } from './activities/FillBlankActivity';
import { ListeningActivity } from './activities/ListeningActivity';
import { ListenArrangeActivity } from './activities/ListenArrangeActivity';
import { ReadingActivity } from './activities/ReadingActivity';
import { SpeakingActivity } from './activities/SpeakingActivity';
import { sounds } from '../utils/sound';

interface Props {
  lesson: Lesson;
  onExit: () => void;
  onLessonCompleted: (xpEarned: number) => void;
}

export const InteractiveLesson: React.FC<Props> = ({ lesson, onExit, onLessonCompleted }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const activities = lesson.activities;
  const currentActivity = activities[currentIdx];
  const progressPercent = Math.round(((currentIdx) / activities.length) * 100);

  const handleNextActivity = (activityXp: number) => {
    const updatedXp = earnedXp + activityXp;
    setEarnedXp(updatedXp);

    if (currentIdx + 1 < activities.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Completed full lesson!
      sounds.playCompletionFanfare();
      setIsFinished(true);

      // Trigger celebratory confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }
    }
  };

  const handleFinishLesson = () => {
    onLessonCompleted(earnedXp);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col overflow-hidden">
      {/* Top Header Bar */}
      <header className="h-16 border-b border-slate-200/80 bg-white px-4 sm:px-8 flex items-center justify-between gap-4 select-none">
        {/* Left: Exit button */}
        <button
          onClick={onExit}
          className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Exit lesson"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Center: Progress Bar */}
        <div className="flex-1 max-w-md mx-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1">
            <span>{lesson.title}</span>
            <span>{currentIdx + 1} of {activities.length}</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-brand-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(10, progressPercent)}%` }}
            />
          </div>
        </div>

        {/* Right: Gamification Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>5 Streak</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200/80 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 fill-brand-500 text-brand-500" />
            <span>+{earnedXp} XP</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        {!isFinished ? (
          <div className="w-full max-w-4xl mx-auto">
            {currentActivity.data.kind === 'flashcard' && (
              <FlashcardActivity
                data={currentActivity.data.data}
                onComplete={() => handleNextActivity(currentActivity.xpValue)}
              />
            )}
            {currentActivity.data.kind === 'drag-drop' && (
              <DragDropActivity
                data={currentActivity.data.data}
                onComplete={() => handleNextActivity(currentActivity.xpValue)}
              />
            )}
            {currentActivity.data.kind === 'categorize' && (
              <CategorizeDragDrop
                data={currentActivity.data.data}
                onComplete={() => handleNextActivity(currentActivity.xpValue)}
              />
            )}
            {currentActivity.data.kind === 'matching' && (
              <MatchingActivity
                pairs={currentActivity.data.pairs}
                onComplete={() => handleNextActivity(currentActivity.xpValue)}
              />
            )}
            {currentActivity.data.kind === 'fill-blank' && (
              <FillBlankActivity
                data={currentActivity.data.data}
                onComplete={() => handleNextActivity(currentActivity.xpValue)}
              />
            )}
            {currentActivity.data.kind === 'listening' && (
              <ListeningActivity
                data={currentActivity.data.data}
                onComplete={() => handleNextActivity(currentActivity.xpValue)}
              />
            )}
            {currentActivity.data.kind === 'listen-arrange' && (
              <ListenArrangeActivity
                data={currentActivity.data.data}
                onComplete={() => handleNextActivity(currentActivity.xpValue)}
              />
            )}
            {currentActivity.data.kind === 'reading' && (
              <ReadingActivity
                data={currentActivity.data.data}
                onComplete={() => handleNextActivity(currentActivity.xpValue)}
              />
            )}
            {currentActivity.data.kind === 'speaking' && (
              <SpeakingActivity
                data={currentActivity.data.data}
                onComplete={() => handleNextActivity(currentActivity.xpValue)}
              />
            )}
          </div>
        ) : (
          /* Lesson Completed Celebration View */
          <div className="w-full max-w-md mx-auto text-center p-8 bg-white rounded-3xl border border-slate-200/90 shadow-soft-lg animate-pop-in">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 mb-6 shadow-soft">
              <Trophy className="w-10 h-10" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-mint-50 text-mint-700 border border-mint-200 mb-2">
              Lesson Complete!
            </span>

            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              Outstanding Work!
            </h2>
            <p className="text-sm text-slate-500 mb-8">
              You've mastered <span className="font-semibold text-slate-800">"{lesson.title}"</span>. Daily goal updated.
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-400 font-semibold mb-1">XP Earned</p>
                <p className="text-xl font-extrabold text-brand-600">+{earnedXp}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-400 font-semibold mb-1">Accuracy</p>
                <p className="text-xl font-extrabold text-mint-600">96%</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-400 font-semibold mb-1">Streak</p>
                <p className="text-xl font-extrabold text-amber-500">5 Days</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <button
                onClick={handleFinishLesson}
                className="w-full py-4 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base transition-all shadow-glow-brand flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Continue to Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setCurrentIdx(0);
                  setIsFinished(false);
                }}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Practice Again</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

