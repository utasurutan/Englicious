import React, { useState } from 'react';
import { 
  Play, Pause, RotateCcw, FastForward, Volume2, 
  Check, Sparkles, AlertCircle, Headphones, Mic, BookOpen, Layers 
} from 'lucide-react';
import { sounds } from '../utils/sound';
import { SpeechService } from '../utils/speech';

export const ListeningLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'choose' | 'dictation' | 'arrange'>('choose');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1.0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Dictation state
  const [typedText, setTypedText] = useState('');
  const [dictationScore, setDictationScore] = useState<number | null>(null);

  const sampleAudioSentence = "The international conference on artificial intelligence will be held in Geneva next September.";
  const dictationTarget = "The international conference on artificial intelligence will be held in Geneva next September.";

  const handlePlayAudio = () => {
    if (isPlaying) {
      SpeechService.stop();
      setIsPlaying(false);
    } else {
      sounds.playClick();
      setIsPlaying(true);
      SpeechService.speak(sampleAudioSentence, playSpeed, 1.0, () => setIsPlaying(false));
    }
  };

  const handleSpeedToggle = () => {
    sounds.playClick();
    const speeds = [0.75, 1.0, 1.25];
    const nextIdx = (speeds.indexOf(playSpeed) + 1) % speeds.length;
    setPlaySpeed(speeds[nextIdx]);
  };

  const handleCheckChoice = (idx: number) => {
    if (isAnswered) return;
    sounds.playClick();
    setSelectedChoice(idx);
    setIsAnswered(true);

    if (idx === 1) {
      sounds.playCorrect();
      sounds.playXpReward();
    } else {
      sounds.playIncorrect();
    }
  };

  const handleCheckDictation = () => {
    sounds.playClick();
    const cleanTyped = typedText.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
    const cleanTarget = dictationTarget.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');

    const wordsTyped = cleanTyped.split(/\s+/);
    const wordsTarget = cleanTarget.split(/\s+/);

    let matchCount = 0;
    wordsTarget.forEach(w => {
      if (wordsTyped.includes(w)) matchCount += 1;
    });

    const calculated = Math.round((matchCount / wordsTarget.length) * 100);
    setDictationScore(calculated);

    if (calculated >= 80) {
      sounds.playCorrect();
      sounds.playXpReward();
    } else {
      sounds.playIncorrect();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Top Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Dedicated Practice Studio
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2 mb-2">
          Listening Lab & Waveform Studio
        </h1>
        <p className="text-sm text-slate-500">
          Train your ear on native contractions, sentence melody, fast academic lectures, and office announcements.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-md mx-auto mb-8 border border-slate-200/80">
        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab('choose');
          }}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'choose' ? 'bg-white text-brand-600 shadow-soft-sm' : 'text-slate-600'
          }`}
        >
          Listen & Choose
        </button>
        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab('dictation');
          }}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'dictation' ? 'bg-white text-brand-600 shadow-soft-sm' : 'text-slate-600'
          }`}
        >
          Listen & Type
        </button>
      </div>

      {/* MASTER AUDIO PLAYER CONSOLE */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft-lg mb-8">
        {/* Dynamic Animated Waveform */}
        <div className="flex items-center justify-center gap-1.5 h-20 bg-slate-50 rounded-2xl px-6 mb-6 border border-slate-100">
          {[20, 50, 80, 40, 95, 60, 30, 85, 70, 40, 90, 65, 35, 80, 55, 25, 75, 45, 90, 60, 30, 70, 85, 40].map((h, i) => (
            <div
              key={i}
              className={`w-1.5 rounded-full transition-all duration-300 ${
                isPlaying ? 'bg-brand-600 wave-bar' : 'bg-slate-300'
              }`}
              style={{
                height: isPlaying ? undefined : `${h * 0.4}px`,
                animationDelay: `${(i % 6) * 0.12}s`
              }}
            />
          ))}
        </div>

        {/* Player Controls Strip */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleSpeedToggle}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <FastForward className="w-4 h-4 text-brand-600" />
            <span>{playSpeed}x Speed</span>
          </button>

          <button
            onClick={handlePlayAudio}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all shadow-glow-brand active:scale-95 ${
              isPlaying ? 'bg-amber-500 ring-4 ring-amber-100' : 'bg-brand-600 hover:bg-brand-700 ring-4 ring-brand-100'
            }`}
          >
            {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-0.5" />}
          </button>

          <button
            onClick={() => {
              SpeechService.stop();
              setIsPlaying(true);
              SpeechService.speak(sampleAudioSentence, playSpeed, 1.0, () => setIsPlaying(false));
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay</span>
          </button>
        </div>
      </div>

      {/* EXERCISE INTERACTION AREA */}
      {activeTab === 'choose' ? (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
            Listen carefully and select the accurate location and date mentioned:
          </h3>

          <div className="space-y-3 mb-6">
            {[
              'In Paris next November',
              'In Geneva next September',
              'In London next December',
              'In Zurich next August'
            ].map((option, idx) => {
              const isSelected = selectedChoice === idx;
              const isCorrect = idx === 1;

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleCheckChoice(idx)}
                  className={`w-full p-4 rounded-2xl text-left text-sm font-semibold border transition-all flex items-center justify-between ${
                    !isAnswered
                      ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-soft-sm'
                      : isCorrect
                      ? 'bg-mint-50 border-mint-500 text-mint-950 ring-2 ring-mint-400/20'
                      : isSelected
                      ? 'bg-coral-50 border-coral-400 text-coral-950'
                      : 'bg-white border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {isAnswered && isCorrect && <Check className="w-5 h-5 text-mint-600" />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="p-4 rounded-2xl bg-mint-50 border border-mint-200 text-mint-950 animate-pop-in">
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                <Sparkles className="w-4 h-4 text-mint-600" />
                <span>Spot-on comprehension! +15 XP</span>
              </div>
              <p className="text-xs text-mint-800">
                Transcript: "{sampleAudioSentence}"
              </p>
            </div>
          )}
        </div>
      ) : (
        /* DICTATION / TYPE WHAT YOU HEAR */
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Listen & Type (Dictation)
            </h3>
            <span className="text-xs font-medium text-slate-400">
              Type the exact sentence you heard
            </span>
          </div>

          <textarea
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            placeholder="Type what the speaker says..."
            rows={3}
            className="w-full p-4 rounded-2xl border border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 text-sm sm:text-base outline-none transition-all mb-4 resize-none"
          />

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setTypedText('');
                setDictationScore(null);
              }}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600"
            >
              Clear text
            </button>

            <button
              onClick={handleCheckDictation}
              disabled={typedText.trim().length === 0}
              className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-soft transition-all disabled:opacity-50"
            >
              Evaluate Dictation
            </button>
          </div>

          {dictationScore !== null && (
            <div className={`mt-6 p-4 rounded-2xl border animate-pop-in ${
              dictationScore >= 80 ? 'bg-mint-50 border-mint-200 text-mint-950' : 'bg-coral-50 border-coral-200 text-coral-950'
            }`}>
              <div className="flex items-center gap-2 font-bold text-base mb-1">
                {dictationScore >= 80 ? <Sparkles className="w-5 h-5 text-mint-600" /> : <AlertCircle className="w-5 h-5 text-coral-600" />}
                <span>{dictationScore}% Transcription Accuracy</span>
              </div>
              <p className="text-xs opacity-90 mt-1">
                Target: "{dictationTarget}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

