import React, { useState, useMemo } from 'react';
import { 
  Volume2, Sparkles, Check, AlertCircle, RotateCcw, 
  HelpCircle, Eye, Compass, Info, Award, Type, CheckCircle2,
  Delete
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
  const [mode, setMode] = useState<'multiple-choice' | 'spelling'>('multiple-choice');
  const [spelledLetters, setSpelledLetters] = useState<string[]>([]);
  const [usedLetterIndices, setUsedLetterIndices] = useState<number[]>([]);

  // Split target word into uppercase letters
  const cleanTarget = useMemo(() => {
    return data.correctAnswer.toUpperCase().replace(/[^A-Z]/g, '');
  }, [data.correctAnswer]);

  // Create scrambled letter bank with reproducible scramble
  const scrambledBank = useMemo(() => {
    const letters = cleanTarget.split('');
    // Deterministic shuffle using character codes
    const shuffled = [...letters].sort((a, b) => {
      return (a.charCodeAt(0) * 17) % 7 - (b.charCodeAt(0) * 17) % 7;
    });
    return shuffled;
  }, [cleanTarget]);

  const handleSelectOption = (option: string) => {
    if (feedback === 'correct') return;
    setSelectedOption(option);
    sounds.playClick();
  };

  const handleCheckAnswer = () => {
    if (mode === 'multiple-choice') {
      if (!selectedOption) return;

      if (selectedOption.toLowerCase() === data.correctAnswer.toLowerCase()) {
        sounds.playCorrect();
        setFeedback('correct');
        SpeechService.speak(`${data.correctAnswer}. ${data.exampleSentence}`);
        setTimeout(() => {
          onComplete(true);
        }, 1900);
      } else {
        sounds.playIncorrect();
        setFeedback('incorrect');
      }
    } else {
      // Spelling check
      const currentWord = spelledLetters.join('');
      if (currentWord === cleanTarget) {
        sounds.playCorrect();
        setFeedback('correct');
        SpeechService.speak(`Excellent spelling! ${data.correctAnswer}. ${data.exampleSentence}`);
        setTimeout(() => {
          onComplete(true);
        }, 2000);
      } else {
        sounds.playIncorrect();
        setFeedback('incorrect');
      }
    }
  };

  const handleTapLetter = (letter: string, index: number) => {
    if (feedback === 'correct') return;
    if (usedLetterIndices.includes(index)) return;
    if (spelledLetters.length >= cleanTarget.length) return;

    sounds.playClick();
    SpeechService.speak(letter);
    setSpelledLetters(prev => [...prev, letter]);
    setUsedLetterIndices(prev => [...prev, index]);
  };

  const handleBackspaceLetter = () => {
    if (spelledLetters.length === 0 || feedback === 'correct') return;
    sounds.playClick();
    const nextSpelled = [...spelledLetters];
    nextSpelled.pop();
    setSpelledLetters(nextSpelled);

    const nextUsed = [...usedLetterIndices];
    nextUsed.pop();
    setUsedLetterIndices(nextUsed);
  };

  const handleResetSpelling = () => {
    sounds.playClick();
    setSpelledLetters([]);
    setUsedLetterIndices([]);
    setFeedback(null);
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

  const handleSwitchMode = (newMode: 'multiple-choice' | 'spelling') => {
    sounds.playClick();
    setMode(newMode);
    setFeedback(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border border-slate-200/90 shadow-soft-lg animate-fade-in">
      {/* Category & Clue Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200/60 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            3D Visual Object Quiz
          </span>
          <span className="text-xs font-medium text-slate-400 hidden sm:inline">
            {data.category}
          </span>
        </div>

        {/* Mode Switcher Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
          <button
            onClick={() => handleSwitchMode('multiple-choice')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              mode === 'multiple-choice'
                ? 'bg-white text-brand-600 shadow-soft-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🎯 Pilihan Ganda
          </button>
          <button
            onClick={() => handleSwitchMode('spelling')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              mode === 'spelling'
                ? 'bg-white text-brand-600 shadow-soft-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🔤 Susun Huruf (Spelling)
          </button>
        </div>
      </div>

      {/* Main 3D Object Showcase Card */}
      <div className="relative mb-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-50 via-brand-50/20 to-slate-100/60 border border-slate-200 flex flex-col items-center justify-center overflow-hidden">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        {/* Audio Clue Button Float Top-Right */}
        <button
          onClick={handleSpeak}
          className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200/80 hover:bg-brand-50 text-slate-700 hover:text-brand-700 text-xs font-bold transition-colors shadow-soft-sm"
          title="Dengarkan pengucapan penutur asli"
        >
          <Volume2 className="w-3.5 h-3.5 text-brand-600" />
          <span>Listen Audio</span>
        </button>

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
            <Compass className="w-3 h-3" /> Sudut 3D:
          </span>
          <button
            onClick={() => handleInspectView('front')}
            className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-white text-slate-700 border border-slate-200 hover:border-brand-400 transition-colors shadow-soft-sm"
          >
            Depan
          </button>
          <button
            onClick={() => handleInspectView('tilt')}
            className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-white text-brand-600 border border-brand-200 hover:bg-brand-50 transition-colors shadow-soft-sm"
          >
            3D Isometrik
          </button>
          <button
            onClick={() => handleInspectView('side')}
            className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-white text-slate-700 border border-slate-200 hover:border-brand-400 transition-colors shadow-soft-sm"
          >
            Samping
          </button>
        </div>
      </div>

      {/* Question Prompt */}
      <div className="text-center mb-6">
        <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1.5">
          {mode === 'multiple-choice' ? data.question : `Susun huruf untuk mengeja objek 3D di atas dalam bahasa Inggris:`}
        </h3>
        <p className="text-xs text-slate-500 flex items-center justify-center gap-2 flex-wrap">
          <span>Arti dalam bahasa Indonesia: <strong className="text-slate-800">"{data.indonesianMeaning}"</strong></span>
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

      {/* MODE 1: MULTIPLE CHOICE OPTIONS GRID */}
      {mode === 'multiple-choice' && (
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
      )}

      {/* MODE 2: SPELLING / WORD ASSEMBLY CHALLENGE */}
      {mode === 'spelling' && (
        <div className="mb-6 space-y-5 animate-fade-in">
          {/* Letter Slots */}
          <div className="flex items-center justify-center gap-2 flex-wrap min-h-[58px] p-3 rounded-2xl bg-slate-50 border border-slate-200">
            {Array.from({ length: cleanTarget.length }).map((_, slotIdx) => {
              const letter = spelledLetters[slotIdx];
              return (
                <div
                  key={slotIdx}
                  className={`w-11 h-12 rounded-xl flex items-center justify-center font-black text-xl border-2 transition-all shadow-soft-sm ${
                    letter
                      ? 'bg-brand-600 border-brand-600 text-white animate-pop-in'
                      : 'bg-white border-dashed border-slate-300 text-slate-300'
                  }`}
                >
                  {letter || ''}
                </div>
              );
            })}
          </div>

          {/* Scrambled Letter Bank */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Ketuk huruf untuk mengeja:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBackspaceLetter}
                  disabled={spelledLetters.length === 0 || feedback === 'correct'}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Delete className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
                <button
                  onClick={handleResetSpelling}
                  disabled={spelledLetters.length === 0 || feedback === 'correct'}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 flex-wrap">
              {scrambledBank.map((letter, idx) => {
                const isUsed = usedLetterIndices.includes(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => handleTapLetter(letter, idx)}
                    disabled={isUsed || feedback === 'correct'}
                    className={`w-11 h-12 rounded-xl font-black text-lg border-2 transition-all active:scale-95 ${
                      isUsed
                        ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
                        : 'bg-white border-slate-200 hover:border-brand-500 hover:bg-brand-50 text-slate-800 shadow-soft-sm'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

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
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <p className="font-extrabold text-sm">
                {feedback === 'correct' ? `Jawaban Tepat! 🎉 "${data.correctAnswer}"` : 'Hampir benar! Coba periksa kembali.'}
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
                ✨ Fakta Menarik: {data.funFact}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="text-xs font-bold text-slate-400">
          Reward: <span className="text-brand-600 font-extrabold">+15 XP</span>
        </div>

        <button
          onClick={handleCheckAnswer}
          disabled={
            feedback === 'correct' || 
            (mode === 'multiple-choice' ? !selectedOption : spelledLetters.length < cleanTarget.length)
          }
          className={`px-7 py-3 rounded-2xl font-bold text-sm transition-all shadow-soft flex items-center gap-2 active:scale-95 ${
            feedback === 'correct' || 
            (mode === 'multiple-choice' ? !selectedOption : spelledLetters.length < cleanTarget.length)
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-brand-600 hover:bg-brand-700 text-white shadow-glow-brand'
          }`}
        >
          <span>Periksa Jawaban</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
