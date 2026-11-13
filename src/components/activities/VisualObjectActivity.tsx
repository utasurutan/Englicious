import React, { useState } from 'react';
import { 
  Volume2, Sparkles, Check, AlertCircle, RotateCcw, 
  HelpCircle, Eye, Compass, Info, Award 
} from 'lucide-react';
import { VisualObjectData } from '../../types';
import { VisualObjectRenderer } from './VisualObjectRenderer';
import { sounds } from '../../utils/sound';
import { SpeechService } from '../../utils/speech';

interface Props {
  data: VisualObjectData;
  onComplete: (isCorrect: boolean) => void;
}

export const VisualObjectActivity: React.FC<Props> = ({ data, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [rotationAngle, setRotationAngle] = useState({ x: 12, y: -20 });
  const [isRotating, setIsRotating] = useState(false);
  const [mode, setMode] = useState<'multiple-choice' | 'spelling'>('multiple-choice');
  const [spelledLetters, setSpelledLetters] = useState<string[]>([]);

  // Split target word into scrambled letters for spelling mode
  const targetWord = data.correctAnswer.toUpperCase();
  const targetLetters = targetWord.split('');

  const handleSelectOption = (option: string) => {
    if (feedback === 'correct') return;
    setSelectedOption(option);
    sounds.playClick();
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;

    if (selectedOption.toLowerCase() === data.correctAnswer.toLowerCase()) {
      sounds.playCorrect();
      setFeedback('correct');
      // Speak the correct word with audio
      SpeechService.speak(`${data.correctAnswer}. ${data.exampleSentence}`);
      setTimeout(() => {
        onComplete(true);
      }, 1900);
    } else {
      sounds.playIncorrect();
      setFeedback('incorrect');
    }
  };

  const handleSpeak = () => {
    sounds.playClick();
    SpeechService.speak(data.correctAnswer);
  };

  const handleInspectView = (view: 'front' | 'tilt' | 'side') => {
    sounds.playClick();
    if (view === 'front') setRotationAngle({ x: 0, y: 0 });
    if (view === 'tilt') setRotationAngle({ x: 20, y: -25 });
    if (view === 'side') setRotationAngle({ x: 5, y: 45 });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border border-slate-200/90 shadow-soft-lg animate-fade-in">
      {/* Category & Clue Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200/60">
            3D Object Identification
          </span>
          <span className="text-xs font-medium text-slate-400 hidden sm:inline">
            {data.category}
          </span>
        </div>

        {/* Audio Clue Button */}
        <button
          onClick={handleSpeak}
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          title="Listen to object pronunciation hint"
        >
          <Volume2 className="w-3.5 h-3.5 text-brand-600" />
          <span>Listen</span>
        </button>
      </div>

      {/* Main 3D Object Showcase Card */}
      <div className="relative mb-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-50 via-brand-50/20 to-slate-100/60 border border-slate-200 flex flex-col items-center justify-center overflow-hidden">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        {/* 3D Object Render */}
        <div className="relative z-10 my-2">
          <VisualObjectRenderer 
            objectId={data.objectId} 
            rotation={rotationAngle}
          />
        </div>

        {/* 3D Camera Controls */}
        <div className="relative z-10 flex items-center gap-2 mt-2 pt-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Compass className="w-3 h-3" /> 3D View:
          </span>
          <button
            onClick={() => handleInspectView('front')}
            className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-white text-slate-700 border border-slate-200 hover:border-brand-400 transition-colors shadow-soft-sm"
          >
            Front
          </button>
          <button
            onClick={() => handleInspectView('tilt')}
            className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-white text-brand-600 border border-brand-200 hover:bg-brand-50 transition-colors shadow-soft-sm"
          >
            3D Isometric
          </button>
          <button
            onClick={() => handleInspectView('side')}
            className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-white text-slate-700 border border-slate-200 hover:border-brand-400 transition-colors shadow-soft-sm"
          >
            Side
          </button>
        </div>
      </div>

      {/* Question Prompt */}
      <div className="text-center mb-6">
        <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1.5">
          {data.question}
        </h3>
        <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
          <span>Arti dalam bahasa Indonesia: <strong className="text-slate-700">"{data.indonesianMeaning}"</strong></span>
          {data.hint && (
            <button 
              onClick={() => setShowHint(!showHint)}
              className="text-brand-600 hover:underline font-semibold text-xs ml-1 inline-flex items-center gap-0.5"
            >
              <HelpCircle className="w-3 h-3" />
              <span>{showHint ? 'Tutup Petunjuk' : 'Lihat Petunjuk'}</span>
            </button>
          )}
        </p>

        {showHint && data.hint && (
          <div className="mt-2.5 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left max-w-md mx-auto animate-fade-in">
            <p className="font-bold flex items-center gap-1 mb-0.5">
              💡 Petunjuk Guru:
            </p>
            <p>{data.hint}</p>
          </div>
        )}
      </div>

      {/* Answer Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {data.options.map((option, idx) => {
          const isSelected = selectedOption === option;
          const isCorrectAnswer = option.toLowerCase() === data.correctAnswer.toLowerCase();

          let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-brand-400 hover:bg-slate-50';

          if (feedback === 'correct' && isCorrectAnswer) {
            btnStyle = 'bg-mint-500 border-mint-500 text-white shadow-glow-mint';
          } else if (feedback === 'incorrect' && isSelected) {
            btnStyle = 'bg-coral-50 border-coral-400 text-coral-800';
          } else if (isSelected) {
            btnStyle = 'bg-brand-50 border-brand-500 text-brand-800 ring-2 ring-brand-200';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(option)}
              disabled={feedback === 'correct'}
              className={`p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all shadow-soft-sm flex items-center justify-between group active:scale-98 ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${
                  isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-brand-100 group-hover:text-brand-700'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>
              
              {isSelected && feedback === 'correct' && (
                <Check className="w-5 h-5 text-white" />
              )}
            </button>
          );
        })}
      </div>

      {/* Immediate Diagnostic Feedback */}
      {feedback && (
        <div className={`p-4 rounded-2xl mb-6 flex items-start gap-3 transition-all animate-fade-in ${
          feedback === 'correct'
            ? 'bg-mint-50 border border-mint-200 text-mint-900'
            : 'bg-coral-50 border border-coral-200 text-coral-900'
        }`}>
          {feedback === 'correct' ? (
            <div className="p-2 rounded-xl bg-mint-500 text-white flex-shrink-0">
              <Check className="w-4 h-4" />
            </div>
          ) : (
            <div className="p-2 rounded-xl bg-coral-500 text-white flex-shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-extrabold text-sm">
                {feedback === 'correct' ? `Great job! 🎉 It's a "${data.correctAnswer}"` : 'Almost! Try again.'}
              </p>
              {feedback === 'correct' && (
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-mint-200 text-mint-800">
                  {data.phonetic}
                </span>
              )}
            </div>
            <p className="text-xs leading-relaxed opacity-90">
              {data.exampleSentence}
            </p>
            {feedback === 'correct' && data.funFact && (
              <p className="text-[11px] font-medium text-mint-800 mt-1.5 italic">
                ✨ {data.funFact}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="text-xs font-bold text-slate-400">
          Reward: <span className="text-brand-600">+15 XP</span>
        </div>

        <button
          onClick={handleCheckAnswer}
          disabled={!selectedOption || feedback === 'correct'}
          className={`px-7 py-3 rounded-2xl font-bold text-sm transition-all shadow-soft flex items-center gap-2 active:scale-95 ${
            !selectedOption || feedback === 'correct'
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-brand-600 hover:bg-brand-700 text-white shadow-glow-brand'
          }`}
        >
          <span>Check Answer</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
