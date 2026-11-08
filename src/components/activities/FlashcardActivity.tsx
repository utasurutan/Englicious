import React, { useState } from 'react';
import { Volume2, RotateCcw, Check, Sparkles, HelpCircle } from 'lucide-react';
import { FlashcardData } from '../../types';
import { SpeechService } from '../../utils/speech';
import { sounds } from '../../utils/sound';

interface Props {
  data: FlashcardData;
  onComplete: (isKnown: boolean) => void;
}

export const FlashcardActivity: React.FC<Props> = ({ data, onComplete }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingAudio(true);
    sounds.playClick();
    SpeechService.speak(data.audioPrompt || data.word, 0.9, 1.0, () => {
      setIsPlayingAudio(false);
    });
  };

  const handleFlip = () => {
    sounds.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleAction = (known: boolean) => {
    if (known) {
      sounds.playCorrect();
    } else {
      sounds.playIncorrect();
    }
    onComplete(known);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto py-4">
      {/* Interaction hint */}
      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-4 tracking-wide uppercase">
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Tap card or flip button to reveal meaning</span>
      </div>

      {/* 3D Flashcard Container */}
      <div 
        onClick={handleFlip}
        className="w-full aspect-[4/3] sm:aspect-[16/10] max-h-[380px] perspective-1000 cursor-pointer select-none group"
      >
        <div 
          className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform rounded-2xl shadow-soft-lg border border-slate-200/80 bg-white ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT OF CARD */}
          <div className="absolute inset-0 w-full h-full backface-hidden p-6 sm:p-8 flex flex-col justify-between rounded-2xl bg-gradient-to-b from-white to-slate-50/50">
            {/* Top row: badge & audio */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-100">
                {data.partOfSpeech}
              </span>
              <button
                onClick={handleSpeak}
                className={`p-2.5 rounded-full transition-all ${
                  isPlayingAudio
                    ? 'bg-brand-600 text-white scale-110 shadow-glow-brand'
                    : 'bg-slate-100 hover:bg-brand-100 text-slate-700 hover:text-brand-700'
                }`}
                title="Listen to native pronunciation"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Center: Big Word & Phonetics */}
            <div className="text-center my-auto">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
                {data.word}
              </h2>
              <div className="flex items-center justify-center gap-3 text-slate-500 font-mono text-sm sm:text-base">
                <span className="text-brand-600 font-semibold">{data.phonetic}</span>
                <span className="text-slate-300">•</span>
                <span className="italic text-slate-500 font-sans">"{data.accentNote}"</span>
              </div>
              {data.translationHint && (
                <p className="mt-3 text-xs sm:text-sm text-slate-400">
                  Hint: {data.translationHint}
                </p>
              )}
            </div>

            {/* Bottom: flip CTA */}
            <div className="text-center text-xs font-medium text-slate-400 group-hover:text-brand-600 transition-colors">
              Click to flip and see example sentence →
            </div>
          </div>

          {/* BACK OF CARD */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-6 sm:p-8 flex flex-col justify-between rounded-2xl bg-white border border-brand-100">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-mint-50 text-mint-700 border border-mint-100">
                <Sparkles className="w-3 h-3" /> Definition & Context
              </span>
              <button
                onClick={handleSpeak}
                className="p-2 rounded-full bg-slate-100 hover:bg-brand-100 text-slate-700 hover:text-brand-700 transition-colors"
                title="Listen to sentence"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="my-auto space-y-4">
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">Meaning</p>
                <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
                  {data.meaning}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs uppercase font-bold tracking-wider text-brand-600 mb-1">Example Sentence</p>
                <p className="text-sm sm:text-base text-slate-700 italic">
                  "{data.example}"
                </p>
              </div>
            </div>

            <div className="text-center text-xs font-medium text-slate-400">
              Click anywhere on card to flip back
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons: Still Learning vs Known */}
      <div className="grid grid-cols-2 gap-3 w-full mt-6">
        <button
          onClick={() => handleAction(false)}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold text-sm transition-all shadow-soft-sm active:scale-95"
        >
          <HelpCircle className="w-4 h-4 text-amber-500" />
          <span>Still Learning</span>
        </button>

        <button
          onClick={() => handleAction(true)}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition-all shadow-soft active:scale-95"
        >
          <Check className="w-4 h-4" />
          <span>Known (+15 XP)</span>
        </button>
      </div>
    </div>
  );
};

