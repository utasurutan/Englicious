import React, { useState } from 'react';
import { X, Flame, Zap, Trophy, ArrowRight, RotateCcw, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
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
import { VisualObjectActivity } from './activities/VisualObjectActivity';
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
  const [showTheoryModal, setShowTheoryModal] = useState(false);

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

        {/* Right: Gamification Badges & Concept Guide */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => { sounds.playClick(); setShowTheoryModal(true); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 text-xs font-bold transition-colors shadow-soft-sm"
            title="Buka panduan materi & rumus pelajaran ini"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Materi Pelajaran</span>
          </button>

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
            {currentActivity.data.kind === 'visual-object' && (
              <VisualObjectActivity
                data={currentActivity.data.data}
                onComplete={() => handleNextActivity(currentActivity.xpValue)}
              />
            )}
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

      {/* Theory & Concept Guide Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-2xl max-h-[85vh] rounded-3xl shadow-soft-xl border border-slate-200 flex flex-col overflow-hidden animate-pop-in">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    Panduan Materi: {lesson.title}
                  </h3>
                  <p className="text-xs text-slate-400">{lesson.subtitle} • Level {lesson.level}</p>
                </div>
              </div>
              <button
                onClick={() => setShowTheoryModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-700">
              {lesson.theoryGuide ? (
                <>
                  <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200">
                    <p className="font-extrabold text-brand-900 text-xs uppercase tracking-wider mb-1">
                      Ringkasan Konsep:
                    </p>
                    <p className="text-brand-950 leading-relaxed text-xs sm:text-sm">
                      {lesson.theoryGuide.summary}
                    </p>
                  </div>

                  {lesson.theoryGuide.keyFormulas && lesson.theoryGuide.keyFormulas.length > 0 && (
                    <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-sans">
                        📐 Rumus & Pola Kalimat:
                      </p>
                      {lesson.theoryGuide.keyFormulas.map((f, i) => (
                        <p key={i} className="mb-1 text-mint-400 font-bold">{f}</p>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Aturan & Contoh Penggunaan:
                    </p>
                    {lesson.theoryGuide.rules.map((r, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <p className="font-extrabold text-slate-900 mb-1">{r.title}</p>
                        <p className="text-xs text-slate-600 mb-2 leading-relaxed">{r.explanation}</p>
                        {r.formula && (
                          <div className="p-2 rounded-lg bg-white border border-slate-200 font-mono text-xs text-brand-700 font-bold mb-2">
                            {r.formula}
                          </div>
                        )}
                        <p className="text-xs font-semibold text-slate-800 bg-white p-2.5 rounded-xl border border-slate-200/80">
                          Contoh: <span className="text-brand-600">{r.example}</span>
                        </p>
                      </div>
                    ))}
                  </div>

                  {lesson.theoryGuide.teacherTip && (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-amber-900 mb-0.5">Tips Guru:</p>
                        <p className="text-amber-800 leading-relaxed">{lesson.theoryGuide.teacherTip}</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 text-brand-900 text-xs sm:text-sm">
                    <p className="font-bold mb-1">Fokus Pembelajaran:</p>
                    <p>Pelajaran ini melatih kompetensi {lesson.category} pada tingkat {lesson.level}. Kerjakan setiap aktivitas interaktif dengan cermat untuk memahami pola kalimat dan memperkuat ingatan visual.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                    <p className="font-bold text-slate-800 mb-1">Tip Belajar:</p>
                    <p>Ucapkan setiap kata atau kalimat secara lisan dengan suara yang jelas saat menjawab untuk melatih memori otot lidah dan intonasi alami.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setShowTheoryModal(false)}
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-soft transition-colors"
              >
                Lanjutkan Kuis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

