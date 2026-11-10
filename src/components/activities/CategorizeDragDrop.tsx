import React, { useState } from 'react';
import { Check, RotateCcw, Sparkles, AlertCircle, Move } from 'lucide-react';
import { sounds } from '../../utils/sound';

export interface CategorizeItem {
  id: string;
  text: string;
  targetCategory: string; // matches Category 1 or Category 2
}

export interface CategorizeData {
  instruction: string;
  category1: string;
  category2: string;
  items: CategorizeItem[];
}

interface Props {
  data: CategorizeData;
  onComplete: (isCorrect: boolean) => void;
}

export const CategorizeDragDrop: React.FC<Props> = ({ data, onComplete }) => {
  const [unassigned, setUnassigned] = useState<CategorizeItem[]>(data.items);
  const [bucket1, setBucket1] = useState<CategorizeItem[]>([]);
  const [bucket2, setBucket2] = useState<CategorizeItem[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState<boolean | null>(null);

  // Drag states
  const [draggedItem, setDraggedItem] = useState<CategorizeItem | null>(null);
  const [isOverBucket1, setIsOverBucket1] = useState(false);
  const [isOverBucket2, setIsOverBucket2] = useState(false);

  const handleAssign = (item: CategorizeItem, bucketTarget: 1 | 2) => {
    sounds.playClick();
    setUnassigned(prev => prev.filter(i => i.id !== item.id));
    if (bucketTarget === 1) {
      setBucket1(prev => [...prev, item]);
    } else {
      setBucket2(prev => [...prev, item]);
    }
    setIsAnswered(false);
    setIsAllCorrect(null);
  };

  const handleRemoveFromBucket = (item: CategorizeItem, fromBucket: 1 | 2) => {
    sounds.playClick();
    if (fromBucket === 1) {
      setBucket1(prev => prev.filter(i => i.id !== item.id));
    } else {
      setBucket2(prev => prev.filter(i => i.id !== item.id));
    }
    setUnassigned(prev => [...prev, item]);
    setIsAnswered(false);
    setIsAllCorrect(null);
  };

  const handleReset = () => {
    sounds.playClick();
    setUnassigned(data.items);
    setBucket1([]);
    setBucket2([]);
    setIsAnswered(false);
    setIsAllCorrect(null);
    setDraggedItem(null);
  };

  const handleCheck = () => {
    sounds.playClick();
    setIsAnswered(true);

    const bucket1Valid = bucket1.every(i => i.targetCategory === data.category1);
    const bucket2Valid = bucket2.every(i => i.targetCategory === data.category2);
    const allAssigned = unassigned.length === 0;

    const correct = bucket1Valid && bucket2Valid && allAssigned;
    setIsAllCorrect(correct);

    if (correct) {
      sounds.playCorrect();
      setTimeout(() => {
        onComplete(true);
      }, 1500);
    } else {
      sounds.playIncorrect();
    }
  };

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, item: CategorizeItem) => {
    setDraggedItem(item);
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setIsOverBucket1(false);
    setIsOverBucket2(false);
  };

  const handleBucketDrop = (e: React.DragEvent, bucketTarget: 1 | 2) => {
    e.preventDefault();
    setIsOverBucket1(false);
    setIsOverBucket2(false);

    const rawData = e.dataTransfer.getData('application/json');
    let item = draggedItem;
    if (rawData) {
      try {
        item = JSON.parse(rawData);
      } catch {
        // fallback
      }
    }

    if (!item) return;

    sounds.playClick();

    // Remove from unassigned or other bucket if necessary
    setUnassigned(prev => prev.filter(i => i.id !== item!.id));
    if (bucketTarget === 1) {
      setBucket2(prev => prev.filter(i => i.id !== item!.id));
      setBucket1(prev => (prev.some(i => i.id === item!.id) ? prev : [...prev, item!]));
    } else {
      setBucket1(prev => prev.filter(i => i.id !== item!.id));
      setBucket2(prev => (prev.some(i => i.id === item!.id) ? prev : [...prev, item!]));
    }

    setIsAnswered(false);
    setIsAllCorrect(null);
    setDraggedItem(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto py-2">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 mb-2">
          Category Sort & Drag
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
          {data.instruction}
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Drag cards directly into the buckets, or use the quick 1/2 buttons below.
        </p>
      </div>

      {/* Two Sorting Buckets as Drop Targets */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
        {/* Bucket 1 */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            if (!isOverBucket1) setIsOverBucket1(true);
          }}
          onDragLeave={(e) => {
            if (e.currentTarget.contains(e.relatedTarget as Node)) return;
            setIsOverBucket1(false);
          }}
          onDrop={(e) => handleBucketDrop(e, 1)}
          className={`p-4 rounded-2xl bg-white border-2 transition-all shadow-soft-sm flex flex-col justify-between min-h-[190px] ${
            isOverBucket1
              ? 'border-brand-500 bg-brand-50/70 ring-4 ring-brand-100 scale-[1.01]'
              : 'border-brand-200'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-brand-100">
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand-700">
                {data.category1}
              </span>
              <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                {bucket1.length} items
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 min-h-[90px]">
              {bucket1.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleRemoveFromBucket(item, 1)}
                  className="px-2.5 py-1 rounded-xl bg-brand-50 hover:bg-rose-50 text-brand-800 hover:text-rose-700 border border-brand-200 text-xs font-semibold shadow-soft-sm transition-all flex items-center gap-1"
                  title="Click to remove"
                >
                  <span>{item.text}</span>
                  <span className="text-slate-400">✕</span>
                </button>
              ))}
              {bucket1.length === 0 && (
                <div className="w-full text-center text-xs text-slate-400 italic py-6 flex items-center justify-center gap-1">
                  <Move className="w-3.5 h-3.5 text-brand-400" />
                  <span>Drop items here</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bucket 2 */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            if (!isOverBucket2) setIsOverBucket2(true);
          }}
          onDragLeave={(e) => {
            if (e.currentTarget.contains(e.relatedTarget as Node)) return;
            setIsOverBucket2(false);
          }}
          onDrop={(e) => handleBucketDrop(e, 2)}
          className={`p-4 rounded-2xl bg-white border-2 transition-all shadow-soft-sm flex flex-col justify-between min-h-[190px] ${
            isOverBucket2
              ? 'border-purple-500 bg-purple-50/70 ring-4 ring-purple-100 scale-[1.01]'
              : 'border-purple-200'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-100">
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
                {data.category2}
              </span>
              <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                {bucket2.length} items
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 min-h-[90px]">
              {bucket2.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleRemoveFromBucket(item, 2)}
                  className="px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-rose-50 text-purple-800 hover:text-rose-700 border border-purple-200 text-xs font-semibold shadow-soft-sm transition-all flex items-center gap-1"
                  title="Click to remove"
                >
                  <span>{item.text}</span>
                  <span className="text-slate-400">✕</span>
                </button>
              ))}
              {bucket2.length === 0 && (
                <div className="w-full text-center text-xs text-slate-400 italic py-6 flex items-center justify-center gap-1">
                  <Move className="w-3.5 h-3.5 text-purple-400" />
                  <span>Drop items here</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Available Unassigned Items Bank */}
      <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/90">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center flex items-center justify-center gap-1">
          <Move className="w-3.5 h-3.5" />
          <span>Draggable Cards ({unassigned.length} remaining)</span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {unassigned.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onDragEnd={handleDragEnd}
              className="flex items-center gap-1.5 bg-white border border-slate-200 hover:border-brand-300 p-1.5 rounded-xl shadow-soft-sm cursor-grab active:cursor-grabbing select-none transition-all"
            >
              <Move className="w-3 h-3 text-slate-400 ml-1" />
              <span className="text-xs font-bold text-slate-800 px-1">{item.text}</span>
              <button
                onClick={() => handleAssign(item, 1)}
                className="px-2 py-0.5 rounded-md bg-brand-50 hover:bg-brand-600 hover:text-white text-brand-700 text-[10px] font-bold transition-colors"
                title={`Assign to ${data.category1}`}
              >
                1
              </button>
              <button
                onClick={() => handleAssign(item, 2)}
                className="px-2 py-0.5 rounded-md bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-700 text-[10px] font-bold transition-colors"
                title={`Assign to ${data.category2}`}
              >
                2
              </button>
            </div>
          ))}
          {unassigned.length === 0 && (
            <span className="text-xs text-slate-400 italic">
              All items sorted! Check your categorization below.
            </span>
          )}
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>

        <button
          onClick={handleCheck}
          disabled={unassigned.length > 0}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-soft active:scale-95 ${
            unassigned.length > 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-brand-600 hover:bg-brand-700 text-white shadow-glow-brand'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>Verify Categories</span>
        </button>
      </div>

      {/* Feedback banner */}
      {isAnswered && (
        <div className={`mt-4 p-4 rounded-xl border animate-pop-in ${
          isAllCorrect ? 'bg-mint-50 border-mint-200 text-mint-900' : 'bg-coral-50 border-coral-200 text-coral-900'
        }`}>
          <div className="flex items-center gap-2 font-bold text-sm">
            {isAllCorrect ? (
              <>
                <Sparkles className="w-4 h-4 text-mint-600" />
                <span>Flawless sorting! You know your registers. +25 XP</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-coral-600" />
                <span>Some items are in the wrong category. Double-check and re-sort!</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
