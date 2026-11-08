import React, { useState } from 'react';
import { RotateCcw, Check, Sparkles, AlertCircle } from 'lucide-react';
import { DragDropData } from '../../types';
import { sounds } from '../../utils/sound';
import { SpeechService } from '../../utils/speech';

interface Props {
  data: DragDropData;
  onComplete: (isCorrect: boolean) => void;
}

export const DragDropActivity: React.FC<Props> = ({ data, onComplete }) => {
  // Available tokens in bank
  const [bankWords, setBankWords] = useState<string[]>(data.scrambledWords);
  // Selected tokens in assembled sentence
  const [sentenceWords, setSentenceWords] = useState<string[]>([]);
  // Status: idle, checked
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const handleWordClickFromBank = (word: string, index: number) => {
    sounds.playClick();
    setFeedback(null);
    setSentenceWords(prev => [...prev, word]);
    setBankWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleWordClickFromSentence = (word: string, index: number) => {
    sounds.playClick();
    setFeedback(null);
    setBankWords(prev => [...prev, word]);
    setSentenceWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    sounds.playClick();
    setBankWords(data.scrambledWords);
    setSentenceWords([]);
    setFeedback(null);
  };

  const handleCheck = () => {
    const assembled = sentenceWords.join(' ').trim().toLowerCase();
    const target = data.correctSentence.trim().toLowerCase();
    const isCorrect = assembled === target;

    if (isCorrect) {
      sounds.playCorrect();
      setFeedback('correct');
      // Speak the correct full sentence aloud
      SpeechService.speak(data.correctSentence, 0.95);
      setTimeout(() => {
        onComplete(true);
      }, 1500);
    } else {
      sounds.playIncorrect();
      setFeedback('incorrect');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto py-2">
      {/* Instruction */}
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 mb-2">
          Word Order Challenge
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
          {data.instruction}
        </h3>
        {data.translationHint && (
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Sentence pattern: {data.translationHint}
          </p>
        )}
      </div>

      {/* Target Assembled Sentence Dock */}
      <div className={`min-h-[110px] p-4 sm:p-5 rounded-2xl border-2 transition-all flex flex-wrap items-center gap-2.5 mb-6 ${
        feedback === 'correct' 
          ? 'bg-mint-50/70 border-mint-500 shadow-glow-success'
          : feedback === 'incorrect'
          ? 'bg-coral-50/50 border-coral-400'
          : sentenceWords.length > 0
          ? 'bg-white border-brand-300 shadow-soft'
          : 'bg-slate-50/70 border-dashed border-slate-300'
      }`}>
        {sentenceWords.length === 0 ? (
          <div className="w-full text-center text-sm font-medium text-slate-400 select-none py-4">
            Tap words below to build the sentence in order
          </div>
        ) : (
          sentenceWords.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              onClick={() => handleWordClickFromSentence(word, idx)}
              className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm sm:text-base shadow-soft-sm active:scale-95 transition-all flex items-center gap-1.5 animate-pop-in"
              title="Click to remove from sentence"
            >
              <span>{word}</span>
            </button>
          ))
        )}
      </div>

      {/* Available Word Bank */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
          Available Words
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5 min-h-[60px]">
          {bankWords.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              onClick={() => handleWordClickFromBank(word, idx)}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 font-semibold text-sm sm:text-base shadow-soft-sm hover:border-brand-400 active:scale-95 transition-all"
            >
              {word}
            </button>
          ))}
          {bankWords.length === 0 && sentenceWords.length > 0 && (
            <span className="text-xs text-slate-400 italic">
              All words placed. Check your sentence!
            </span>
          )}
        </div>
      </div>

      {/* Action Controls & Feedback */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>

        <button
          onClick={handleCheck}
          disabled={sentenceWords.length === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-soft active:scale-95 ${
            sentenceWords.length === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-brand-600 hover:bg-brand-700 text-white shadow-glow-brand'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>Check Sentence</span>
        </button>
      </div>

      {/* Dynamic Feedback Banner */}
      {feedback === 'correct' && (
        <div className="mt-4 p-3.5 rounded-xl bg-mint-50 border border-mint-200 text-mint-800 flex items-center gap-2 text-sm font-semibold animate-pop-in">
          <Sparkles className="w-4 h-4 text-mint-600" />
          <span>Perfect word order! 🎉 +20 XP</span>
        </div>
      )}
      {feedback === 'incorrect' && (
        <div className="mt-4 p-3.5 rounded-xl bg-coral-50 border border-coral-200 text-coral-800 flex items-center gap-2 text-sm font-semibold animate-pop-in">
          <AlertCircle className="w-4 h-4 text-coral-600" />
          <span>Almost! Pay attention to the subject and time position. Try again!</span>
        </div>
      )}
    </div>
  );
};

