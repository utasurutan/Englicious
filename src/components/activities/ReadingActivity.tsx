import React, { useState } from 'react';
import { Volume2, Highlighter, Sparkles, AlertCircle, X, HelpCircle, Check } from 'lucide-react';
import { ReadingData, VocabTooltip } from '../../types';
import { sounds } from '../../utils/sound';
import { SpeechService } from '../../utils/speech';

interface Props {
  data: ReadingData;
  onComplete: (isCorrect: boolean) => void;
}

export const ReadingActivity: React.FC<Props> = ({ data, onComplete }) => {
  const [selectedWord, setSelectedWord] = useState<VocabTooltip | null>(null);
  const [highlighterActive, setHighlighterActive] = useState(false);
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleWordClick = (wordKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    const vocab = data.interactiveVocab[wordKey.toLowerCase()];
    if (vocab) {
      setSelectedWord(vocab);
      SpeechService.speak(vocab.word, 1.0);
    }
  };

  const handleSentenceClick = (idx: number) => {
    if (!highlighterActive) return;
    sounds.playClick();
    setHighlightedIndices(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const handleAnswerSubmit = (optionIdx: number) => {
    if (isAnswered) return;
    sounds.playClick();
    setSelectedAnswer(optionIdx);
    setIsAnswered(true);

    const isCorrect = optionIdx === data.correctIndex;
    if (isCorrect) {
      sounds.playCorrect();
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    } else {
      sounds.playIncorrect();
    }
  };

  const isCorrect = selectedAnswer === data.correctIndex;

  // Render passage with interactive keywords
  const renderParagraph = (text: string, pIdx: number) => {
    const vocabKeys = Object.keys(data.interactiveVocab);
    if (vocabKeys.length === 0) return text;

    // Regex to match any of the vocab words
    const regex = new RegExp(`\\b(${vocabKeys.join('|')})\\b`, 'gi');
    const parts = text.split(regex);

    return (
      <span key={pIdx}>
        {parts.map((part, i) => {
          const lower = part.toLowerCase();
          if (vocabKeys.includes(lower)) {
            return (
              <span
                key={i}
                onClick={(e) => handleWordClick(lower, e)}
                className="vocab-word font-medium text-brand-700 bg-brand-50/70"
                title="Click for definition & pronunciation"
              >
                {part}
              </span>
            );
          }
          return part;
        })}
      </span>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-2">
      {/* Top Header & Tools */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-200">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 mr-2">
            {data.category}
          </span>
          <span className="text-xs font-semibold text-slate-400">
            {data.level}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {data.title}
          </h2>
        </div>

        {/* Highlighter Tool Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHighlighterActive(!highlighterActive)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              highlighterActive
                ? 'bg-amber-100 text-amber-800 border border-amber-300 ring-2 ring-amber-300/40'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
            title="Toggle sentence highlighter"
          >
            <Highlighter className="w-3.5 h-3.5 text-amber-500" />
            <span>{highlighterActive ? 'Highlighter On' : 'Highlight Tool'}</span>
          </button>
        </div>
      </div>

      {/* Main layout: Desktop Side-by-side / Mobile Stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Passage */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-soft">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-4 pb-2 border-b border-slate-100">
            <span>Passage</span>
            <span>💡 Click underlined words for vocabulary insights</span>
          </div>

          <div className="space-y-4 text-slate-800 text-base sm:text-lg leading-relaxed font-sans">
            {data.passage.map((para, idx) => (
              <p
                key={idx}
                onClick={() => handleSentenceClick(idx)}
                className={`transition-colors rounded-lg p-1.5 -m-1.5 cursor-pointer ${
                  highlightedIndices.includes(idx)
                    ? 'bg-amber-100/70 border-l-4 border-amber-400 pl-2.5'
                    : 'hover:bg-slate-50/60'
                }`}
              >
                {renderParagraph(para, idx)}
              </p>
            ))}
          </div>

          {/* Interactive Vocab Word Drawer/Tooltip if clicked */}
          {selectedWord && (
            <div className="mt-6 p-4 rounded-xl bg-brand-50/80 border border-brand-200 shadow-soft animate-pop-in relative">
              <button
                onClick={() => setSelectedWord(null)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base font-extrabold text-brand-900">{selectedWord.word}</span>
                <span className="text-xs font-mono text-brand-600 font-semibold">{selectedWord.phonetic}</span>
                <button
                  onClick={() => SpeechService.speak(selectedWord.word, 0.9)}
                  className="p-1 rounded-full bg-white hover:bg-brand-100 text-brand-700 transition-colors shadow-soft-sm"
                  title="Pronounce"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 mb-1.5 font-medium">
                {selectedWord.definition}
              </p>
              <p className="text-xs text-slate-500 italic bg-white/70 p-2 rounded-lg border border-brand-100">
                "{selectedWord.example}"
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Question & Comprehension Check */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-soft">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center">
              ?
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Comprehension Check
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 leading-snug">
            {data.question}
          </h3>

          <div className="space-y-3 mb-6">
            {data.options.map((option, idx) => {
              const isThisSelected = selectedAnswer === idx;
              const isThisCorrect = idx === data.correctIndex;

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleAnswerSubmit(idx)}
                  className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-semibold border transition-all flex items-start gap-3 ${
                    !isAnswered
                      ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-soft-sm active:scale-98'
                      : isThisCorrect
                      ? 'bg-mint-50 border-mint-500 text-mint-900 ring-2 ring-mint-400/20'
                      : isThisSelected
                      ? 'bg-coral-50 border-coral-400 text-coral-900'
                      : 'bg-white border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-md text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5 ${
                    isThisCorrect && isAnswered
                      ? 'bg-mint-600 text-white'
                      : isThisSelected && isAnswered
                      ? 'bg-coral-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback Section */}
          {isAnswered && (
            <div className={`p-4 rounded-xl border animate-pop-in ${
              isCorrect ? 'bg-mint-50 border-mint-200 text-mint-900' : 'bg-coral-50 border-coral-200 text-coral-900'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                {isCorrect ? (
                  <>
                    <Sparkles className="w-4 h-4 text-mint-600" />
                    <span>Sharp analysis! 🎉 +35 XP</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-coral-600" />
                    <span>Review the text explanation:</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm opacity-90 leading-relaxed mb-3">
                {data.explanation}
              </p>
              {!isCorrect && (
                <button
                  onClick={() => {
                    setIsAnswered(false);
                    setSelectedAnswer(null);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-coral-300 text-coral-700 hover:bg-coral-50 transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

