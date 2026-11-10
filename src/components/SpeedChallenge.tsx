import React, { useState, useEffect } from 'react';
import { 
  Zap, Clock, Flame, RotateCcw, Trophy, Check, AlertCircle, 
  Sparkles, Award, ArrowRight, Play, X 
} from 'lucide-react';
import { sounds } from '../utils/sound';
import confetti from 'canvas-confetti';

interface QuickQuestion {
  prompt: string;
  category: string;
  options: string[];
  correct: number;
}

const CHALLENGE_QUESTIONS: QuickQuestion[] = [
  {
    prompt: 'Choose the synonym for "ELOQUENT":',
    category: 'Vocabulary',
    options: ['Articulate', 'Hesitant', 'Awkward', 'Aggressive'],
    correct: 0
  },
  {
    prompt: 'She is genuinely interested ___ learning Arabic.',
    category: 'Prepositions',
    options: ['at', 'on', 'in', 'for'],
    correct: 2
  },
  {
    prompt: 'Select the correctly spelled word:',
    category: 'Spelling',
    options: ['Accommodate', 'Acommodate', 'Accomodate', 'Acomodate'],
    correct: 0
  },
  {
    prompt: 'What is the noun form of "DECIDE"?',
    category: 'Word Formation',
    options: ['Decisive', 'Decision', 'Decidedly', 'Decisiveness'],
    correct: 1
  },
  {
    prompt: 'What does the phrasal verb "CALL OFF" mean?',
    category: 'Phrasal Verbs',
    options: ['Postpone', 'Cancel', 'Confront', 'Celebrate'],
    correct: 1
  },
  {
    prompt: 'Choose the antonym of "SCARCE":',
    category: 'Vocabulary',
    options: ['Abundant', 'Rare', 'Deficient', 'Sparse'],
    correct: 0
  },
  {
    prompt: 'He was accused ___ leaking proprietary design files.',
    category: 'Prepositions',
    options: ['with', 'of', 'by', 'about'],
    correct: 1
  },
  {
    prompt: 'Select the past participle of "UNDERTAKE":',
    category: 'Grammar',
    options: ['Undertook', 'Undertaken', 'Undertaking', 'Undertakes'],
    correct: 1
  },
  {
    prompt: 'Choose the synonym for "PERSEVERANCE":',
    category: 'Vocabulary',
    options: ['Tenacity', 'Indifference', 'Hesitation', 'Reluctance'],
    correct: 0
  },
  {
    prompt: 'Hardly ___ when the siren began to sound.',
    category: 'Inversion',
    options: ['had I arrived', 'I had arrived', 'did I arrived', 'arrived I'],
    correct: 0
  },
  {
    prompt: 'Neither the manager nor the employees ___ informed.',
    category: 'Subject-Verb Agreement',
    options: ['was', 'were', 'is', 'has been'],
    correct: 1
  },
  {
    prompt: 'Choose the synonym for "MITIGATE":',
    category: 'Vocabulary',
    options: ['Alleviate', 'Aggravate', 'Expand', 'Accelerate'],
    correct: 0
  }
];

interface Props {
  onClose?: () => void;
  onRewardXp: (xp: number) => void;
}

export const SpeedChallenge: React.FC<Props> = ({ onClose, onRewardXp }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [streakCount, setStreakCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleEndGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleStartGame = () => {
    sounds.playClick();
    setIsPlaying(true);
    setTimeLeft(60);
    setScore(0);
    setCombo(1);
    setStreakCount(0);
    setCorrectCount(0);
    setCurrentIdx(0);
    setIsGameOver(false);
  };

  const handleAnswer = (optionIdx: number) => {
    const q = CHALLENGE_QUESTIONS[currentIdx % CHALLENGE_QUESTIONS.length];
    const isCorrect = optionIdx === q.correct;

    if (isCorrect) {
      sounds.playCorrect();
      const points = 10 * combo;
      setScore(prev => prev + points);
      setCorrectCount(prev => prev + 1);
      const nextStreak = streakCount + 1;
      setStreakCount(nextStreak);

      // Combo multiplier logic
      if (nextStreak >= 8) setCombo(4);
      else if (nextStreak >= 5) setCombo(3);
      else if (nextStreak >= 2) setCombo(2);
      else setCombo(1);
    } else {
      sounds.playIncorrect();
      setStreakCount(0);
      setCombo(1);
    }

    // Advance to next question instantly
    setCurrentIdx(prev => prev + 1);
  };

  const handleEndGame = () => {
    setIsPlaying(false);
    setIsGameOver(true);
    sounds.playCompletionFanfare();
    onRewardXp(score);

    try {
      confetti({ particleCount: 80, spread: 75, origin: { y: 0.6 } });
    } catch {
      // fallback
    }
  };

  const currentQ = CHALLENGE_QUESTIONS[currentIdx % CHALLENGE_QUESTIONS.length];

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {/* Top Banner */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black shadow-soft">
            <Zap className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 leading-tight">
              60-Second Speed Drill
            </h2>
            <p className="text-[11px] text-slate-400">High-tempo vocabulary & grammar blitz</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {!isPlaying && !isGameOver ? (
        /* START SCREEN */
        <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-soft-lg text-center">
          <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center mx-auto mb-4">
            <Flame className="w-8 h-8 fill-amber-500 animate-pulse" />
          </div>

          <h3 className="text-2xl font-black text-slate-900 mb-2">
            Ready for the Speed Rush?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
            Answer as many rapid-fire questions as you can in 60 seconds. Chain consecutive correct answers for up to <span className="font-bold text-amber-600">4x Combo Multipliers</span>!
          </p>

          <div className="grid grid-cols-3 gap-2 mb-8">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Time</span>
              <span className="text-lg font-black text-slate-800">60s</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Max Combo</span>
              <span className="text-lg font-black text-amber-600">4x</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">XP Target</span>
              <span className="text-lg font-black text-brand-600">100+ XP</span>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-glow-brand transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Start 60s Challenge</span>
          </button>
        </div>
      ) : isGameOver ? (
        /* GAME OVER SCREEN */
        <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-soft-lg text-center animate-pop-in">
          <div className="w-16 h-16 rounded-3xl bg-mint-50 border border-mint-200 text-mint-600 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-mint-700 bg-mint-50 px-3 py-1 rounded-full">
            Time's Up!
          </span>

          <h3 className="text-3xl font-black text-slate-900 mt-2 mb-1">
            Challenge Completed!
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Spectacular speed and recall agility.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">Final Score</span>
              <span className="text-2xl font-black text-slate-900">{score}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">Correct</span>
              <span className="text-2xl font-black text-mint-600">{correctCount}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">XP Earned</span>
              <span className="text-2xl font-black text-brand-600">+{score} XP</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleStartGame}
              className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-soft transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                Back to Dashboard
              </button>
            )}
          </div>
        </div>
      ) : (
        /* LIVE QUESTION GAMEPLAY */
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-soft-lg">
          {/* Status Bar */}
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
            {/* Countdown Clock */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-sm font-black border ${
              timeLeft <= 10
                ? 'bg-rose-50 text-rose-600 border-rose-200 animate-pulse'
                : 'bg-slate-100 text-slate-800 border-slate-200'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{timeLeft}s</span>
            </div>

            {/* Combo Multiplier Badge */}
            <div className="flex items-center gap-2">
              {combo > 1 && (
                <div className="px-2.5 py-1 rounded-xl bg-amber-500 text-white font-black text-xs flex items-center gap-1 shadow-soft-sm animate-pop-in">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  <span>{combo}x Multiplier!</span>
                </div>
              )}
              <span className="text-sm font-black text-brand-600 bg-brand-50 px-3 py-1 rounded-xl">
                {score} pts
              </span>
            </div>
          </div>

          {/* Question Category */}
          <div className="text-center mb-6">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 mb-2 inline-block">
              {currentQ.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {currentQ.prompt}
            </h3>
          </div>

          {/* Rapid Answer Options */}
          <div className="space-y-2.5 mb-2">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="w-full p-4 rounded-2xl text-left text-sm font-bold border border-slate-200 bg-white hover:bg-brand-50 hover:border-brand-400 text-slate-800 shadow-soft-sm transition-all active:scale-98 flex items-center justify-between"
              >
                <span>{opt}</span>
                <span className="w-6 h-6 rounded-lg bg-slate-100 text-xs font-bold flex items-center justify-center text-slate-400">
                  {idx + 1}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
