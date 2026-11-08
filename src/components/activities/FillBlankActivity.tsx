import React, { useState } from 'react';
import { Check, AlertCircle, Sparkles } from 'lucide-react';
import { FillBlankData } from '../../types';
import { sounds } from '../../utils/sound';
import { SpeechService } from '../../utils/speech';

interface Props {
  data: FillBlankData;
  onComplete: (isCorrect: boolean) => void;
}

export const FillBlankActivity: React.FC<Props> = ({ data, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    sounds.playClick();
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option.toLowerCase() === data.correctAnswer.toLowerCase();
    if (isCorrect) {
      sounds.playCorrect();
      // Speak the completed sentence
      const completedSentence = data.sentenceWithBlank.replace('___', option);
      SpeechService.speak(completedSentence, 0.95);
      setTimeout(() => {
        onComplete(true);
      }, 1800);
    } else {
      sounds.playIncorrect();
    }
  };

  const isCorrect = selectedOption?.toLowerCase() === data.correctAnswer.toLowerCase();

  return (
    <div className="w-full max-w-xl mx-auto py-2">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 mb-2">
          Fill in the Blank
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
          Choose the word that fits best
        </h3>
      </div>

      {/* Sentence display with highlighted blank */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-soft text-center mb-6">
        <p className="text-xl sm:text-2xl font-semibold text-slate-800 leading-relaxed">
          {data.sentenceWithBlank.split('___').map((part, idx, arr) => (
            <React.Fragment key={idx}>
              <span>{part}</span>
              {idx < arr.length - 1 && (
                <span className={`inline-block mx-1.5 px-3 py-0.5 rounded-lg border-b-2 font-bold transition-all ${
                  !selectedOption
                    ? 'border-brand-500 text-brand-600 bg-brand-50 min-w-[50px]'
                    : isCorrect
                    ? 'border-mint-500 text-mint-700 bg-mint-50'
                    : 'border-coral-400 text-coral-700 bg-coral-50'
                }`}>
                  {selectedOption || '___'}
                </span>
              )}
            </React.Fragment>
          ))}
        </p>
      </div>

      {/* Option Choices */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {data.options.map((option) => {
          const isThisSelected = selectedOption === option;
          const isThisCorrect = option.toLowerCase() === data.correctAnswer.toLowerCase();

          return (
            <button
              key={option}
              disabled={isAnswered}
              onClick={() => handleSelect(option)}
              className={`p-4 rounded-xl font-bold text-base transition-all border shadow-soft-sm text-center ${
                !isAnswered
                  ? 'bg-white hover:bg-slate-50 border-slate-200 hover:border-brand-400 text-slate-800 active:scale-95'
                  : isThisCorrect
                  ? 'bg-mint-50 border-mint-500 text-mint-800 ring-2 ring-mint-400/30'
                  : isThisSelected
                  ? 'bg-coral-50 border-coral-400 text-coral-800'
                  : 'bg-white border-slate-200 text-slate-400 opacity-60'
              }`}
            >
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback banner */}
      {isAnswered && (
        <div className={`p-4 rounded-xl border animate-pop-in ${
          isCorrect ? 'bg-mint-50 border-mint-200 text-mint-900' : 'bg-coral-50 border-coral-200 text-coral-900'
        }`}>
          <div className="flex items-center gap-2 font-bold text-sm mb-1">
            {isCorrect ? (
              <>
                <Sparkles className="w-4 h-4 text-mint-600" />
                <span>Great job! 🎉 +15 XP</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-coral-600" />
                <span>Almost! Check the explanation below:</span>
              </>
            )}
          </div>
          <p className="text-xs sm:text-sm opacity-90">
            {data.explanation}
          </p>
          {!isCorrect && (
            <button
              onClick={() => {
                setIsAnswered(false);
                setSelectedOption(null);
              }}
              className="mt-3 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white border border-coral-300 text-coral-700 hover:bg-coral-50 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      )}
    </div>
  );
};

