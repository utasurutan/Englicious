import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { MatchingPair } from '../../types';
import { sounds } from '../../utils/sound';
import { SpeechService } from '../../utils/speech';

interface Props {
  pairs: MatchingPair[];
  onComplete: () => void;
}

export const MatchingActivity: React.FC<Props> = ({ pairs, onComplete }) => {
  // Shuffled definitions on initial load
  const [shuffledDefs] = useState(() => 
    [...pairs].sort(() => Math.random() - 0.5)
  );

  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState<{ wordId: string; defId: string } | null>(null);

  const handleWordSelect = (id: string, word: string) => {
    if (matchedIds.includes(id)) return;
    sounds.playClick();
    SpeechService.speak(word, 1.0);
    setSelectedWordId(id);
    setWrongPair(null);
  };

  const handleDefSelect = (defId: string) => {
    if (!selectedWordId || matchedIds.includes(defId)) return;

    if (selectedWordId === defId) {
      // Correct Match!
      sounds.playCorrect();
      const updated = [...matchedIds, defId];
      setMatchedIds(updated);
      setSelectedWordId(null);
      setWrongPair(null);

      if (updated.length === pairs.length) {
        sounds.playXpReward();
        setTimeout(() => {
          onComplete();
        }, 1200);
      }
    } else {
      // Incorrect Match
      sounds.playIncorrect();
      setWrongPair({ wordId: selectedWordId, defId });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedWordId(null);
      }, 700);
    }
  };

  const allCompleted = matchedIds.length === pairs.length;

  return (
    <div className="w-full max-w-xl mx-auto py-2">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 mb-2">
          Vocabulary Matching
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
          Match English words with their definitions
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Select a word on the left, then click its corresponding meaning on the right.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Left column: Words */}
        <div className="space-y-2.5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center mb-2">Words</p>
          {pairs.map(p => {
            const isMatched = matchedIds.includes(p.id);
            const isSelected = selectedWordId === p.id;
            const isWrong = wrongPair?.wordId === p.id;

            return (
              <button
                key={p.id}
                disabled={isMatched}
                onClick={() => handleWordSelect(p.id, p.word)}
                className={`w-full min-h-[58px] p-3 rounded-xl font-bold text-sm sm:text-base border text-left transition-all flex items-center justify-between ${
                  isMatched
                    ? 'bg-mint-50 border-mint-200 text-mint-700 opacity-80 cursor-default'
                    : isWrong
                    ? 'bg-coral-50 border-coral-300 text-coral-700 animate-shake'
                    : isSelected
                    ? 'bg-brand-50 border-brand-500 text-brand-700 ring-2 ring-brand-400/30'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-soft-sm'
                }`}
              >
                <span>{p.word}</span>
                {isMatched && <Check className="w-4 h-4 text-mint-600 flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Right column: Definitions */}
        <div className="space-y-2.5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center mb-2">Definitions</p>
          {shuffledDefs.map(d => {
            const isMatched = matchedIds.includes(d.id);
            const isWrong = wrongPair?.defId === d.id;

            return (
              <button
                key={d.id}
                disabled={isMatched}
                onClick={() => handleDefSelect(d.id)}
                className={`w-full min-h-[58px] p-3 rounded-xl text-xs sm:text-sm font-medium border text-left transition-all flex items-center justify-between ${
                  isMatched
                    ? 'bg-mint-50 border-mint-200 text-mint-700 opacity-80 cursor-default'
                    : isWrong
                    ? 'bg-coral-50 border-coral-300 text-coral-700'
                    : selectedWordId
                    ? 'bg-white hover:bg-brand-50 hover:border-brand-300 border-slate-200 text-slate-700 shadow-soft-sm cursor-pointer'
                    : 'bg-white border-slate-200 text-slate-700 shadow-soft-sm'
                }`}
              >
                <span className="leading-snug">{d.definition}</span>
                {isMatched && <Check className="w-4 h-4 text-mint-600 flex-shrink-0 ml-1.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {allCompleted && (
        <div className="mt-6 p-4 rounded-xl bg-mint-50 border border-mint-200 text-mint-800 flex items-center justify-center gap-2 text-sm font-bold animate-pop-in">
          <Sparkles className="w-5 h-5 text-mint-600" />
          <span>All pairs matched flawlessly! +20 XP</span>
        </div>
      )}
    </div>
  );
};

