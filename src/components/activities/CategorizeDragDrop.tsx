import React, { useState } from 'react';
import { Check, RotateCcw, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
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
          Tap an item below, then tap the appropriate category bucket to sort.
        </p>
      </div>

      {/* Two Sorting Buckets */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
        {/* Bucket 1 */}
        <div className="p-4 rounded-2xl bg-white border-2 border-brand-200 shadow-soft-sm flex flex-col justify-between min-h-[180px]">
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
                  className="px-2.5 py-1 rounded-xl bg-brand-50 hover:bg-rose-50 text-brand-800 hover:text-rose-700 border border-brand-200 text-xs font-semibold shadow-soft-sm transition-all"
                  title="Click to remove"
                >
                  {item.text} ✕
                </button>
              ))}
              {bucket1.length === 0 && (
                <span className="text-xs text-slate-400 italic m-auto">
                  Empty bucket
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bucket 2 */}
        <div className="p-4 rounded-2xl bg-white border-2 border-purple-200 shadow-soft-sm flex flex-col justify-between min-h-[180px]">
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
                  className="px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-rose-50 text-purple-800 hover:text-rose-700 border border-purple-200 text-xs font-semibold shadow-soft-sm transition-all"
                  title="Click to remove"
                >
                  {item.text} ✕
                </button>
              ))}
              {bucket2.length === 0 && (
                <span className="text-xs text-slate-400 italic m-auto">
                  Empty bucket
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Available Unassigned Items Bank */}
      <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/90">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">
          Items to Sort ({unassigned.length} remaining)
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {unassigned.map((item) => (
            <div key={item.id} className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-xl shadow-soft-sm">
              <span className="text-xs font-bold text-slate-800 px-2">{item.text}</span>
              <button
                onClick={() => handleAssign(item, 1)}
                className="px-2 py-1 rounded-lg bg-brand-50 hover:bg-brand-600 hover:text-white text-brand-700 text-[10px] font-bold transition-colors"
                title={`Assign to ${data.category1}`}
              >
                1
              </button>
              <button
                onClick={() => handleAssign(item, 2)}
                className="px-2 py-1 rounded-lg bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-700 text-[10px] font-bold transition-colors"
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
