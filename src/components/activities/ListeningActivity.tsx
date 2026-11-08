import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, Sparkles, AlertCircle, FastForward } from 'lucide-react';
import { ListeningData } from '../../types';
import { sounds } from '../../utils/sound';
import { SpeechService } from '../../utils/speech';

interface Props {
  data: ListeningData;
  onComplete: (isCorrect: boolean) => void;
}

export const ListeningActivity: React.FC<Props> = ({ data, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1.0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const handlePlayToggle = () => {
    if (isPlaying) {
      SpeechService.stop();
      setIsPlaying(false);
    } else {
      sounds.playClick();
      setIsPlaying(true);
      SpeechService.speak(data.audioText, playSpeed, 1.0, () => {
        setIsPlaying(false);
      });
    }
  };

  const handleSpeedToggle = () => {
    sounds.playClick();
    const speeds = [0.75, 1.0, 1.25];
    const nextIdx = (speeds.indexOf(playSpeed) + 1) % speeds.length;
    setPlaySpeed(speeds[nextIdx]);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    sounds.playClick();
    setSelectedIndex(index);
    setIsAnswered(true);

    const isCorrect = index === data.correctIndex;
    if (isCorrect) {
      sounds.playCorrect();
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    } else {
      sounds.playIncorrect();
    }
  };

  const isCorrect = selectedIndex === data.correctIndex;

  return (
    <div className="w-full max-w-xl mx-auto py-2">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 mb-2">
          Listening Comprehension
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
          {data.instruction}
        </h3>
      </div>

      {/* Audio Player Studio Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft mb-6">
        {/* Animated Waveform Visualization */}
        <div className="flex items-center justify-center gap-1.5 h-14 mb-5 px-4 bg-slate-50/80 rounded-xl border border-slate-100">
          {[40, 70, 30, 90, 60, 85, 45, 95, 65, 35, 80, 50, 75, 40, 85, 60, 30, 70].map((h, i) => (
            <div
              key={i}
              className={`w-1.5 rounded-full transition-all duration-300 ${
                isPlaying 
                  ? 'bg-brand-600 wave-bar' 
                  : 'bg-slate-300'
              }`}
              style={{
                height: isPlaying ? undefined : `${h * 0.35}px`,
                animationDelay: `${(i % 5) * 0.15}s`
              }}
            />
          ))}
        </div>

        {/* Player Controls */}
        <div className="flex items-center justify-between">
          {/* Speed badge */}
          <button
            onClick={handleSpeedToggle}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Toggle playback speed"
          >
            <FastForward className="w-3.5 h-3.5 text-brand-600" />
            <span>{playSpeed}x</span>
          </button>

          {/* Central Play/Pause button */}
          <button
            onClick={handlePlayToggle}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-soft transition-all active:scale-95 ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 shadow-glow-brand ring-4 ring-amber-100'
                : 'bg-brand-600 hover:bg-brand-700 ring-4 ring-brand-100'
            }`}
            title={isPlaying ? 'Pause' : 'Play Audio'}
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>

          {/* Replay */}
          <button
            onClick={() => {
              SpeechService.stop();
              setIsPlaying(true);
              SpeechService.speak(data.audioText, playSpeed, 1.0, () => setIsPlaying(false));
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay</span>
          </button>
        </div>

        {/* Optional Transcript toggle */}
        {isAnswered && (
          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{showTranscript ? 'Hide Audio Transcript' : 'Show Audio Transcript'}</span>
            </button>
            {showTranscript && (
              <p className="mt-2 text-xs sm:text-sm text-slate-700 italic bg-brand-50/50 p-2.5 rounded-lg border border-brand-100 animate-pop-in">
                "{data.transcript}"
              </p>
            )}
          </div>
        )}
      </div>

      {/* Question */}
      <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-3 text-center sm:text-left">
        {data.question}
      </h4>

      {/* Answer Choices */}
      <div className="space-y-2.5 mb-6">
        {data.options.map((option, idx) => {
          const isThisSelected = selectedIndex === idx;
          const isThisCorrect = idx === data.correctIndex;

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleSelectOption(idx)}
              className={`w-full p-3.5 sm:p-4 rounded-xl text-left font-semibold text-sm sm:text-base border transition-all flex items-center justify-between ${
                !isAnswered
                  ? 'bg-white hover:bg-slate-50 border-slate-200/90 text-slate-800 shadow-soft-sm active:scale-98'
                  : isThisCorrect
                  ? 'bg-mint-50 border-mint-500 text-mint-900 ring-2 ring-mint-400/20'
                  : isThisSelected
                  ? 'bg-coral-50 border-coral-400 text-coral-900'
                  : 'bg-white border-slate-200 text-slate-400 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-lg text-xs flex items-center justify-center font-bold ${
                  isThisCorrect && isAnswered
                    ? 'bg-mint-600 text-white'
                    : isThisSelected && isAnswered
                    ? 'bg-coral-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback Card */}
      {isAnswered && (
        <div className={`p-4 rounded-xl border animate-pop-in ${
          isCorrect ? 'bg-mint-50 border-mint-200 text-mint-900' : 'bg-coral-50 border-coral-200 text-coral-900'
        }`}>
          <div className="flex items-center gap-2 font-bold text-sm mb-1">
            {isCorrect ? (
              <>
                <Sparkles className="w-4 h-4 text-mint-600" />
                <span>Great ear! 🎉 +15 XP</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-coral-600" />
                <span>Keep training your ear! Review explanation:</span>
              </>
            )}
          </div>
          <p className="text-xs sm:text-sm opacity-90">{data.explanation}</p>
          {!isCorrect && (
            <button
              onClick={() => {
                setIsAnswered(false);
                setSelectedIndex(null);
                setShowTranscript(false);
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

