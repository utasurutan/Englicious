import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Check, Sparkles, AlertCircle, Move } from 'lucide-react';
import { ListenArrangeData } from '../../types';
import { sounds } from '../../utils/sound';
import { SpeechService } from '../../utils/speech';

interface Props {
  data: ListenArrangeData;
  onComplete: (isCorrect: boolean) => void;
}

interface DraggedWord {
  source: 'bank' | 'arranged';
  index: number;
  word: string;
}

export const ListenArrangeActivity: React.FC<Props> = ({ data, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bankWords, setBankWords] = useState<string[]>(data.words);
  const [arrangedWords, setArrangedWords] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Drag and drop states
  const [draggedItem, setDraggedItem] = useState<DraggedWord | null>(null);
  const [isOverArrangedDock, setIsOverArrangedDock] = useState(false);

  const handlePlayAudio = () => {
    sounds.playClick();
    setIsPlaying(true);
    SpeechService.speak(data.audioText, 0.9, 1.0, () => {
      setIsPlaying(false);
    });
  };

  const handleSelectWord = (word: string, index: number) => {
    sounds.playClick();
    setFeedback(null);
    setArrangedWords(prev => [...prev, word]);
    setBankWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveWord = (word: string, index: number) => {
    sounds.playClick();
    setFeedback(null);
    setBankWords(prev => [...prev, word]);
    setArrangedWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    sounds.playClick();
    setBankWords(data.words);
    setArrangedWords([]);
    setFeedback(null);
    setDraggedItem(null);
  };

  const handleCheck = () => {
    const assembled = arrangedWords.join(' ').trim().toLowerCase();
    const target = data.correctSequence.join(' ').trim().toLowerCase();
    const isCorrect = assembled === target;

    if (isCorrect) {
      sounds.playCorrect();
      setFeedback('correct');
      setTimeout(() => {
        onComplete(true);
      }, 1600);
    } else {
      sounds.playIncorrect();
      setFeedback('incorrect');
    }
  };

  // Drag & drop handlers
  const handleDragStart = (e: React.DragEvent, source: 'bank' | 'arranged', index: number, word: string) => {
    setFeedback(null);
    const item: DraggedWord = { source, index, word };
    setDraggedItem(item);
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setIsOverArrangedDock(false);
  };

  const handleDrop = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault();
    setIsOverArrangedDock(false);

    const rawData = e.dataTransfer.getData('application/json');
    let item = draggedItem;
    if (rawData) {
      try {
        item = JSON.parse(rawData);
      } catch {
        // fallback to state
      }
    }

    if (!item) return;

    sounds.playClick();

    if (item.source === 'bank') {
      const wordToInsert = item.word;
      const bankIndex = item.index;

      setBankWords(prev => prev.filter((_, i) => i !== bankIndex));
      setArrangedWords(prev => {
        const next = [...prev];
        if (targetIndex !== undefined && targetIndex >= 0 && targetIndex <= next.length) {
          next.splice(targetIndex, 0, wordToInsert);
        } else {
          next.push(wordToInsert);
        }
        return next;
      });
    } else if (item.source === 'arranged') {
      const fromIndex = item.index;
      const toIndex = targetIndex !== undefined ? targetIndex : arrangedWords.length - 1;

      if (fromIndex === toIndex) return;

      setArrangedWords(prev => {
        const next = [...prev];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved);
        return next;
      });
    }

    setDraggedItem(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto py-2">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 mb-2">
          Listen & Arrange
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
          {data.instruction}
        </h3>
      </div>

      {/* Audio Play Trigger Card */}
      <div className="flex items-center justify-between p-4 mb-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayAudio}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all active:scale-95 ${
              isPlaying ? 'bg-amber-500 ring-4 ring-amber-100' : 'bg-brand-600 hover:bg-brand-700 ring-4 ring-brand-100'
            }`}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
          <div>
            <p className="text-sm font-bold text-slate-800">Spoken Audio Clip</p>
            <p className="text-xs text-slate-400">Click to listen carefully</p>
          </div>
        </div>

        <button
          onClick={handlePlayAudio}
          className="text-xs font-semibold text-brand-600 hover:text-brand-700 px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors"
        >
          Replay Audio
        </button>
      </div>

      {/* Arranged Slots Dock */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          if (!isOverArrangedDock) setIsOverArrangedDock(true);
        }}
        onDragLeave={(e) => {
          if (e.currentTarget.contains(e.relatedTarget as Node)) return;
          setIsOverArrangedDock(false);
        }}
        onDrop={(e) => handleDrop(e)}
        className={`min-h-[100px] p-4 rounded-2xl border-2 transition-all flex flex-wrap items-center gap-2 mb-6 ${
          feedback === 'correct'
            ? 'bg-mint-50/70 border-mint-500 shadow-glow-success'
            : feedback === 'incorrect'
            ? 'bg-coral-50/50 border-coral-400'
            : isOverArrangedDock
            ? 'bg-brand-50/80 border-brand-500 ring-4 ring-brand-100 shadow-soft-lg'
            : arrangedWords.length > 0
            ? 'bg-white border-brand-300 shadow-soft'
            : 'bg-slate-50/70 border-dashed border-slate-300'
        }`}
      >
        {arrangedWords.length === 0 ? (
          <div className="w-full text-center text-sm font-medium text-slate-400 py-3 flex items-center justify-center gap-1.5">
            <Move className="w-4 h-4 text-brand-600" />
            <span>Drag or tap the spoken words below in the sequence you hear</span>
          </div>
        ) : (
          arrangedWords.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              draggable
              onDragStart={(e) => handleDragStart(e, 'arranged', idx, word)}
              onDragEnd={handleDragEnd}
              onClick={() => handleRemoveWord(word, idx)}
              className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm shadow-soft-sm active:scale-95 transition-all cursor-grab active:cursor-grabbing select-none flex items-center gap-1.5"
              title="Drag to rearrange, or click to remove"
            >
              <Move className="w-3.5 h-3.5 text-brand-200" />
              <span>{word}</span>
            </button>
          ))
        )}
      </div>

      {/* Word Options Bank */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center flex items-center justify-center gap-1">
          <Move className="w-3.5 h-3.5" />
          <span>Available Spoken Words (Drag or Tap)</span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {bankWords.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              draggable
              onDragStart={(e) => handleDragStart(e, 'bank', idx, word)}
              onDragEnd={handleDragEnd}
              onClick={() => handleSelectWord(word, idx)}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm shadow-soft-sm hover:border-brand-300 active:scale-95 transition-all cursor-grab active:cursor-grabbing select-none flex items-center gap-1.5"
            >
              <Move className="w-3.5 h-3.5 text-slate-400" />
              <span>{word}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom controls */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>

        <button
          onClick={handleCheck}
          disabled={arrangedWords.length === 0}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-soft active:scale-95 ${
            arrangedWords.length === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-brand-600 hover:bg-brand-700 text-white shadow-glow-brand'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>Check Order</span>
        </button>
      </div>

      {feedback === 'correct' && (
        <div className="mt-4 p-3.5 rounded-xl bg-mint-50 border border-mint-200 text-mint-800 flex items-center gap-2 text-sm font-semibold animate-pop-in">
          <Sparkles className="w-4 h-4 text-mint-600" />
          <span>Accurate transcription! 🎉 +20 XP</span>
        </div>
      )}
      {feedback === 'incorrect' && (
        <div className="mt-4 p-3.5 rounded-xl bg-coral-50 border border-coral-200 text-coral-800 flex items-center gap-2 text-sm font-semibold animate-pop-in">
          <AlertCircle className="w-4 h-4 text-coral-600" />
          <span>The order doesn't match the spoken clip. Replay and try dragging the words!</span>
        </div>
      )}
    </div>
  );
};
