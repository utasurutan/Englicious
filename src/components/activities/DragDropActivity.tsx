import React, { useState } from 'react';
import { RotateCcw, Check, Sparkles, AlertCircle, Move } from 'lucide-react';
import { DragDropData } from '../../types';
import { sounds } from '../../utils/sound';
import { SpeechService } from '../../utils/speech';

interface Props {
  data: DragDropData;
  onComplete: (isCorrect: boolean) => void;
}

interface DraggedItem {
  source: 'bank' | 'sentence';
  index: number;
  word: string;
}

export const DragDropActivity: React.FC<Props> = ({ data, onComplete }) => {
  // Available tokens in bank
  const [bankWords, setBankWords] = useState<string[]>(data.scrambledWords);
  // Selected tokens in assembled sentence
  const [sentenceWords, setSentenceWords] = useState<string[]>([]);
  // Status: idle, checked
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Drag and Drop active states
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [isOverSentenceDock, setIsOverSentenceDock] = useState(false);
  const [isOverBank, setIsOverBank] = useState(false);
  const [hoverIndexInSentence, setHoverIndexInSentence] = useState<number | null>(null);

  // --- TAP / CLICK HANDLERS ---
  const handleWordClickFromBank = (word: string, index: number) => {
    sounds.playClick();
    setFeedback(null);
    setSentenceWords(prev => [...prev, word]);
    setBankWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleWordClickFromSentence = (word: string, index: number) => {
    sounds.playClick();
    setFeedback(null);
    setBankWords(prev => [...prev, word]);
    setSentenceWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    sounds.playClick();
    setBankWords(data.scrambledWords);
    setSentenceWords([]);
    setFeedback(null);
    setDraggedItem(null);
    setIsOverSentenceDock(false);
    setIsOverBank(false);
    setHoverIndexInSentence(null);
  };

  const handleCheck = () => {
    const assembled = sentenceWords.join(' ').trim().toLowerCase();
    const target = data.correctSentence.trim().toLowerCase();
    const isCorrect = assembled === target;

    if (isCorrect) {
      sounds.playCorrect();
      setFeedback('correct');
      // Speak the correct full sentence aloud
      SpeechService.speak(data.correctSentence, 0.95);
      setTimeout(() => {
        onComplete(true);
      }, 1500);
    } else {
      sounds.playIncorrect();
      setFeedback('incorrect');
    }
  };

  // --- HTML5 DRAG AND DROP HANDLERS ---
  const handleDragStart = (
    e: React.DragEvent,
    source: 'bank' | 'sentence',
    index: number,
    word: string
  ) => {
    setFeedback(null);
    const item: DraggedItem = { source, index, word };
    setDraggedItem(item);

    // Set drag transfer data
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setIsOverSentenceDock(false);
    setIsOverBank(false);
    setHoverIndexInSentence(null);
  };

  // Sentence Dock Drop Target
  const handleSentenceDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isOverSentenceDock) setIsOverSentenceDock(true);
  };

  const handleSentenceDragLeave = (e: React.DragEvent) => {
    // Only leave if exiting the dock container itself
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsOverSentenceDock(false);
    setHoverIndexInSentence(null);
  };

  const handleSentenceDrop = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault();
    setIsOverSentenceDock(false);
    setHoverIndexInSentence(null);

    const rawData = e.dataTransfer.getData('application/json');
    let item = draggedItem;
    if (rawData) {
      try {
        item = JSON.parse(rawData);
      } catch {
        // use draggedItem state
      }
    }

    if (!item) return;

    sounds.playClick();

    if (item.source === 'bank') {
      // Remove from bank and insert into sentence
      const wordToInsert = item.word;
      const bankIndex = item.index;

      setBankWords(prev => prev.filter((_, i) => i !== bankIndex));

      setSentenceWords(prev => {
        const next = [...prev];
        if (targetIndex !== undefined && targetIndex >= 0 && targetIndex <= next.length) {
          next.splice(targetIndex, 0, wordToInsert);
        } else {
          next.push(wordToInsert);
        }
        return next;
      });
    } else if (item.source === 'sentence') {
      // Reordering within the sentence
      const fromIndex = item.index;
      const toIndex = targetIndex !== undefined ? targetIndex : sentenceWords.length - 1;

      if (fromIndex === toIndex) return;

      setSentenceWords(prev => {
        const next = [...prev];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved);
        return next;
      });
    }

    setDraggedItem(null);
  };

  // Bank Drop Target (dragging back to word bank)
  const handleBankDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isOverBank) setIsOverBank(true);
  };

  const handleBankDragLeave = (e: React.DragEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsOverBank(false);
  };

  const handleBankDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOverBank(false);

    const rawData = e.dataTransfer.getData('application/json');
    let item = draggedItem;
    if (rawData) {
      try {
        item = JSON.parse(rawData);
      } catch {
        // use state
      }
    }

    if (!item || item.source !== 'sentence') return;

    sounds.playClick();
    const wordToReturn = item.word;
    const sentenceIndex = item.index;

    setSentenceWords(prev => prev.filter((_, i) => i !== sentenceIndex));
    setBankWords(prev => [...prev, wordToReturn]);
    setDraggedItem(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto py-2">
      {/* Instruction */}
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 mb-2">
          Word Order Challenge
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
          {data.instruction}
        </h3>
        {data.translationHint && (
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Sentence pattern: {data.translationHint}
          </p>
        )}
      </div>

      {/* Target Assembled Sentence Dock */}
      <div
        onDragOver={handleSentenceDragOver}
        onDragLeave={handleSentenceDragLeave}
        onDrop={(e) => handleSentenceDrop(e)}
        className={`min-h-[110px] p-4 sm:p-5 rounded-2xl border-2 transition-all flex flex-wrap items-center gap-2.5 mb-6 relative ${
          feedback === 'correct' 
            ? 'bg-mint-50/70 border-mint-500 shadow-glow-success'
            : feedback === 'incorrect'
            ? 'bg-coral-50/50 border-coral-400'
            : isOverSentenceDock
            ? 'bg-brand-50/70 border-brand-500 ring-4 ring-brand-100 shadow-soft-lg scale-[1.01]'
            : sentenceWords.length > 0
            ? 'bg-white border-brand-300 shadow-soft'
            : 'bg-slate-50/70 border-dashed border-slate-300'
        }`}
      >
        {sentenceWords.length === 0 ? (
          <div className="w-full text-center text-sm font-medium text-slate-400 select-none py-4 flex flex-col items-center justify-center gap-1.5">
            <span className="flex items-center gap-1 text-slate-500 font-semibold">
              <Move className="w-4 h-4 text-brand-600 animate-pulse" /> Drag or tap words below into this slot
            </span>
            <span className="text-xs text-slate-400">You can also drag words to rearrange their order</span>
          </div>
        ) : (
          sentenceWords.map((word, idx) => {
            const isBeingDragged = draggedItem?.source === 'sentence' && draggedItem.index === idx;

            return (
              <div
                key={`${word}-${idx}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setHoverIndexInSentence(idx);
                }}
                onDrop={(e) => {
                  e.stopPropagation();
                  handleSentenceDrop(e, idx);
                }}
                className="relative inline-flex items-center"
              >
                {/* Visual Insertion Drop Indicator */}
                {isOverSentenceDock && hoverIndexInSentence === idx && (
                  <div className="w-1.5 h-8 bg-brand-500 rounded-full mx-1 animate-pulse" />
                )}

                <button
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'sentence', idx, word)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleWordClickFromSentence(word, idx)}
                  className={`px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm sm:text-base shadow-soft-sm active:scale-95 transition-all flex items-center gap-1.5 cursor-grab active:cursor-grabbing select-none ${
                    isBeingDragged ? 'opacity-40 scale-95 border-2 border-dashed border-white' : ''
                  }`}
                  title="Drag to rearrange, or click to return to word bank"
                >
                  <Move className="w-3.5 h-3.5 text-brand-200" />
                  <span>{word}</span>
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Available Word Bank */}
      <div
        onDragOver={handleBankDragOver}
        onDragLeave={handleBankDragLeave}
        onDrop={handleBankDrop}
        className={`mb-6 p-4 rounded-2xl border-2 transition-all ${
          isOverBank
            ? 'bg-amber-50/70 border-amber-400 ring-4 ring-amber-100'
            : 'bg-transparent border-transparent'
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center flex items-center justify-center gap-1.5">
          <Move className="w-3.5 h-3.5 text-slate-400" />
          <span>Available Words (Drag or Tap to Place)</span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5 min-h-[60px]">
          {bankWords.map((word, idx) => {
            const isBeingDragged = draggedItem?.source === 'bank' && draggedItem.index === idx;

            return (
              <button
                key={`${word}-${idx}`}
                draggable
                onDragStart={(e) => handleDragStart(e, 'bank', idx, word)}
                onDragEnd={handleDragEnd}
                onClick={() => handleWordClickFromBank(word, idx)}
                className={`px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 font-semibold text-sm sm:text-base shadow-soft-sm hover:border-brand-400 active:scale-95 transition-all cursor-grab active:cursor-grabbing select-none flex items-center gap-2 ${
                  isBeingDragged ? 'opacity-40 scale-95 border-brand-400' : ''
                }`}
                title="Drag into the sentence box above or click to place"
              >
                <Move className="w-3.5 h-3.5 text-slate-400" />
                <span>{word}</span>
              </button>
            );
          })}
          {bankWords.length === 0 && sentenceWords.length > 0 && (
            <span className="text-xs text-slate-400 italic">
              All words placed. Drag to reorder, or click "Check Sentence"!
            </span>
          )}
        </div>
      </div>

      {/* Action Controls & Feedback */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>

        <button
          onClick={handleCheck}
          disabled={sentenceWords.length === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-soft active:scale-95 ${
            sentenceWords.length === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-brand-600 hover:bg-brand-700 text-white shadow-glow-brand'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>Check Sentence</span>
        </button>
      </div>

      {/* Dynamic Feedback Banner */}
      {feedback === 'correct' && (
        <div className="mt-4 p-3.5 rounded-xl bg-mint-50 border border-mint-200 text-mint-800 flex items-center gap-2 text-sm font-semibold animate-pop-in">
          <Sparkles className="w-4 h-4 text-mint-600" />
          <span>Perfect word order! 🎉 +20 XP</span>
        </div>
      )}
      {feedback === 'incorrect' && (
        <div className="mt-4 p-3.5 rounded-xl bg-coral-50 border border-coral-200 text-coral-800 flex items-center gap-2 text-sm font-semibold animate-pop-in">
          <AlertCircle className="w-4 h-4 text-coral-600" />
          <span>Almost! Pay attention to the subject and time position. Try rearranging the words!</span>
        </div>
      )}
    </div>
  );
};
