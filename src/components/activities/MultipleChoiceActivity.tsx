import React, { useState } from 'react';
import { Check, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';
import { MultipleChoiceData } from '../../types';
import { sounds } from '../../utils/sound';
import { SpeechService } from '../../utils/speech';

interface Props {
  data: MultipleChoiceData;
  onComplete: (isCorrect: boolean) => void;
}

export const MultipleChoiceActivity: React.FC<Props> = ({ data, onComplete }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    sounds.playClick();
    setSelectedIndex(idx);
    setIsAnswered(true);

    const isCorrect = idx === data.correctIndex;
    if (isCorrect) {
      sounds.playCorrect();
      SpeechService.speak(`Correct! ${data.options[idx]}`, 1.0);
      setTimeout(() => {
        onComplete(true);
      }, 1800);
    } else {
      sounds.playIncorrect();
    }
  };

  const isCorrect = selectedIndex === data.correctIndex;

  return (
    <div className="w-full max-w-xl mx-auto py-2 animate-fade-in">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 mb-2">
          Multiple Choice Challenge
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
          {data.question}
        </h3>
        {data.context && (
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto">
            {data.context}
          </p>
        )}
      </div>

      {/* Answer Options Grid */}
      <div className="space-y-3 mb-6">
        {data.options.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          const isThisCorrect = idx === data.correctIndex;

          let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-brand-500 hover:bg-brand-50/30';

          if (isAnswered) {
            if (isThisCorrect) {
              btnStyle = 'bg-mint-50 border-mint-500 text-mint-900 shadow-glow-mint ring-2 ring-mint-300';
            } else if (isSelected && !isThisCorrect) {
              btnStyle = 'bg-coral-50 border-coral-400 text-coral-900';
            } else {
              btnStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all shadow-soft-sm flex items-center justify-between group active:scale-98 ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${
                  isSelected 
                    ? (isCorrect ? 'bg-mint-600 text-white' : 'bg-coral-500 text-white')
                    : 'bg-slate-100 text-slate-600 group-hover:bg-brand-100 group-hover:text-brand-700'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>

              {isAnswered && isThisCorrect && (
                <Check className="w-5 h-5 text-mint-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Immediate Diagnostic Feedback */}
      {isAnswered && (
        <div className={`p-4 rounded-2xl mb-4 flex items-start gap-3 transition-all animate-fade-in ${
          isCorrect
            ? 'bg-mint-50 border border-mint-200 text-mint-900'
            : 'bg-coral-50 border border-coral-200 text-coral-900'
        }`}>
          {isCorrect ? (
            <div className="p-2 rounded-xl bg-mint-500 text-white flex-shrink-0">
              <Check className="w-4 h-4" />
            </div>
          ) : (
            <div className="p-2 rounded-xl bg-coral-500 text-white flex-shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}

          <div>
            <p className="font-extrabold text-sm mb-0.5">
              {isCorrect ? 'Great job! 🎉 Correct answer!' : 'Almost! Try to review the rule below.'}
            </p>
            <p className="text-xs leading-relaxed opacity-90">
              {data.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
