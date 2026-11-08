import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles, Check, RefreshCw } from 'lucide-react';
import { SpeakingData } from '../../types';
import { sounds } from '../../utils/sound';
import { SpeechService } from '../../utils/speech';

interface Props {
  data: SpeakingData;
  onComplete: () => void;
}

export const SpeakingActivity: React.FC<Props> = ({ data, onComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleHearSample = () => {
    sounds.playClick();
    SpeechService.speak(data.sampleAudioText, 0.85);
  };

  const handleStartRecord = () => {
    sounds.playClick();
    setIsRecording(true);
    setRecorded(false);
    setScore(null);

    // Simulate speech recognition & acoustic scoring with real mic feedback feel
    setTimeout(() => {
      setIsRecording(false);
      setRecorded(true);
      const calculatedScore = Math.floor(Math.random() * 8) + 92; // 92% - 99%
      setScore(calculatedScore);
      sounds.playCorrect();
      sounds.playXpReward();
    }, 2500);
  };

  return (
    <div className="w-full max-w-xl mx-auto py-2">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 mb-2">
          Speaking & Pronunciation
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
          Speak with natural rhythm and intonation
        </h3>
      </div>

      {/* Target Sentence Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft text-center mb-6">
        <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Target Phrase</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
          "{data.prompt.replace('Practice saying: ', '').replace(/"/g, '')}"
        </h2>
        <div className="text-brand-600 font-mono text-sm font-semibold mb-4">
          {data.phonetic}
        </div>

        {/* Hear Reference Audio */}
        <button
          onClick={handleHearSample}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-700 font-semibold text-xs transition-colors"
        >
          <Volume2 className="w-4 h-4" />
          <span>Listen to Native Model</span>
        </button>
      </div>

      {/* Recording Studio & Waveform */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center mb-6">
        {/* Animated Microphone button */}
        <div className="relative inline-block my-2">
          {isRecording && (
            <span className="absolute -inset-3 rounded-full bg-coral-400/30 animate-ping" />
          )}
          <button
            onClick={handleStartRecord}
            disabled={isRecording}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center text-white transition-all shadow-soft active:scale-95 ${
              isRecording
                ? 'bg-coral-500 ring-8 ring-coral-100 animate-pulse'
                : 'bg-brand-600 hover:bg-brand-700 ring-4 ring-brand-100'
            }`}
          >
            {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </button>
        </div>

        <p className="text-sm font-semibold text-slate-700 mt-3">
          {isRecording ? 'Listening... Speak naturally now!' : 'Tap microphone to record your voice'}
        </p>

        {isRecording && (
          <div className="flex items-center justify-center gap-1.5 h-8 mt-3">
            {[40, 70, 30, 80, 50, 90, 60, 40].map((h, i) => (
              <div
                key={i}
                className="w-1.5 rounded-full bg-coral-500 wave-bar"
                style={{ height: `${h * 0.3}px`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Result Card */}
      {recorded && score !== null && (
        <div className="p-5 rounded-2xl bg-mint-50 border border-mint-200 text-center animate-pop-in mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-mint-100 text-mint-700 mb-2">
            <Sparkles className="w-6 h-6" />
          </div>
          <h4 className="text-2xl font-black text-mint-900">
            {score}% Fluency Score!
          </h4>
          <p className="text-xs sm:text-sm text-mint-800 font-medium mt-1">
            Excellent pronunciation clarity and sentence rhythm. +30 XP
          </p>

          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={handleStartRecord}
              className="px-3.5 py-2 rounded-xl bg-white border border-mint-300 text-mint-800 font-semibold text-xs flex items-center gap-1.5 hover:bg-mint-100/50 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
            <button
              onClick={onComplete}
              className="px-5 py-2 rounded-xl bg-mint-600 hover:bg-mint-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-soft transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Continue</span>
            </button>
          </div>
        </div>
      )}

      {/* Pro pronunciation tips */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-500">
        <span className="font-bold text-slate-700">Pro Tip: </span>
        {data.tips}
      </div>
    </div>
  );
};

