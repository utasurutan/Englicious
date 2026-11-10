import React, { useState } from 'react';
import { 
  BookOpen, Volume2, Highlighter, Type, Sun, Moon, 
  Sparkles, Check, AlertCircle, X, HelpCircle, ChevronRight, Eye 
} from 'lucide-react';
import { sounds } from '../utils/sound';
import { SpeechService } from '../utils/speech';

interface VocabEntry {
  word: string;
  phonetic: string;
  definition: string;
  example: string;
  synonyms: string[];
}

export const ReadingLab: React.FC = () => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [themeMode, setThemeMode] = useState<'clean' | 'warm' | 'soft-dark'>('clean');
  const [highlightColor, setHighlightColor] = useState<'yellow' | 'mint' | 'sky'>('yellow');
  const [highlightToolActive, setHighlightToolActive] = useState(false);
  const [highlightedSentences, setHighlightedSentences] = useState<number[]>([]);
  const [activeVocab, setActiveVocab] = useState<VocabEntry | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const readingVocab: Record<string, VocabEntry> = {
    ubiquitous: {
      word: 'Ubiquitous',
      phonetic: '/juːˈbɪkwɪtəs/',
      definition: 'Present, appearing, or found everywhere at the same time.',
      example: 'Smartphones have become ubiquitous in modern urban societies.',
      synonyms: ['omnipresent', 'pervasive', 'universal']
    },
    countermeasures: {
      word: 'Countermeasures',
      phonetic: '/ˈkaʊntərmeʒərz/',
      definition: 'Actions taken to counteract or mitigate a negative danger or threat.',
      example: 'The security team implemented stringent countermeasures against cyber threats.',
      synonyms: ['safeguards', 'preventative steps', 'defenses']
    },
    anthropogenic: {
      word: 'Anthropogenic',
      phonetic: '/ˌænθrəpəˈdʒɛnɪk/',
      definition: 'Originating in human activity, especially regarding environmental pollution.',
      example: 'Anthropogenic carbon emissions continue to alter global atmospheric chemistry.',
      synonyms: ['human-induced', 'synthetic', 'man-made']
    },
    symbiosis: {
      word: 'Symbiosis',
      phonetic: '/ˌsɪmbaɪˈoʊsɪs/',
      definition: 'An interdependent and mutually beneficial relationship between two different entities.',
      example: 'The symbiosis between clownfish and sea anemones provides shelter and food for both.',
      synonyms: ['mutualism', 'interdependence', 'cooperation']
    }
  };

  const paragraphs = [
    {
      id: 0,
      text: "In the study of modern ecology, anthropogenic disruptions have accelerated microclimatic imbalances across global metropolitan centers. Concrete infrastructures absorb solar irradiance throughout daylight hours, rendering thermal heat islands an ubiquitous reality for over four billion urban inhabitants."
    },
    {
      id: 1,
      text: "In response, municipal architects are developing living biophilic envelopes. Rather than deploying energy-intensive cooling countermeasures, these structures foster a biological symbiosis: vertical micro-forests cool surface masonry via evapotranspiration while absorbing airborne particulates."
    },
    {
      id: 2,
      text: "Recent longitudinal trials demonstrate that integrating permeable pavements and dense foliage matrices can depress localized ambient summer temperatures by as much as three point five degrees Celsius, while slashing civic cooling energy requirements by eighteen percent."
    }
  ];

  const handleVocabClick = (wordKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    const entry = readingVocab[wordKey.toLowerCase()];
    if (entry) {
      setActiveVocab(entry);
      SpeechService.speak(entry.word, 0.95);
    }
  };

  const handleSentenceClick = (pId: number) => {
    if (!highlightToolActive) return;
    sounds.playClick();
    setHighlightedSentences(prev =>
      prev.includes(pId) ? prev.filter(i => i !== pId) : [...prev, pId]
    );
  };

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    sounds.playClick();
    setSelectedAnswer(idx);
    setIsAnswered(true);

    if (idx === 0) {
      sounds.playCorrect();
      sounds.playXpReward();
    } else {
      sounds.playIncorrect();
    }
  };

  const renderParagraphText = (text: string) => {
    const keys = Object.keys(readingVocab);
    const regex = new RegExp(`\\b(${keys.join('|')})\\b`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) => {
      const lower = part.toLowerCase();
      if (keys.includes(lower)) {
        return (
          <span
            key={i}
            onClick={(e) => handleVocabClick(lower, e)}
            className="vocab-word font-bold text-brand-700 bg-brand-50/80 px-1 py-0.5 rounded cursor-pointer"
            title="Click for pronunciation & definition"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Font size class mapping
  const fontClass = 
    fontSize === 'xl' ? 'text-xl leading-relaxed sm:text-2xl sm:leading-loose' :
    fontSize === 'large' ? 'text-lg leading-relaxed sm:text-xl sm:leading-relaxed' :
    'text-base leading-relaxed sm:text-lg sm:leading-relaxed';

  // Theme styles mapping
  const themeClass = 
    themeMode === 'warm' ? 'bg-[#fbf7ee] text-amber-950 border-amber-200/80' :
    themeMode === 'soft-dark' ? 'bg-[#1a2233] text-slate-100 border-slate-700' :
    'bg-white text-slate-900 border-slate-200/90';

  const highlightClass =
    highlightColor === 'yellow' ? 'bg-amber-100/80 border-l-4 border-amber-400' :
    highlightColor === 'mint' ? 'bg-mint-100/70 border-l-4 border-mint-500' :
    'bg-sky-100/70 border-l-4 border-sky-500';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Academic Reading Studio
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Urban Microclimates & Biophilic Architecture
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            CEFR B2 - C1 Advanced • Targeted for IELTS Academic Section 3 & TOEFL Reading
          </p>
        </div>

        {/* Reader Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Font Size Selector */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-1 rounded-lg text-xs font-bold ${fontSize === 'normal' ? 'bg-white shadow-soft-sm text-brand-600' : 'text-slate-600'}`}
            >
              Aa
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-1 rounded-lg text-sm font-bold ${fontSize === 'large' ? 'bg-white shadow-soft-sm text-brand-600' : 'text-slate-600'}`}
            >
              Aa+
            </button>
            <button
              onClick={() => setFontSize('xl')}
              className={`px-2 py-1 rounded-lg text-base font-bold ${fontSize === 'xl' ? 'bg-white shadow-soft-sm text-brand-600' : 'text-slate-600'}`}
            >
              Aa++
            </button>
          </div>

          {/* Theme contrast toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setThemeMode('clean')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${themeMode === 'clean' ? 'bg-white shadow-soft-sm text-slate-900' : 'text-slate-500'}`}
            >
              Clean
            </button>
            <button
              onClick={() => setThemeMode('warm')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${themeMode === 'warm' ? 'bg-amber-100 shadow-soft-sm text-amber-900' : 'text-slate-500'}`}
            >
              Sepia
            </button>
            <button
              onClick={() => setThemeMode('soft-dark')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${themeMode === 'soft-dark' ? 'bg-slate-800 text-white shadow-soft-sm' : 'text-slate-500'}`}
            >
              Dark
            </button>
          </div>

          {/* Highlighter Toggle */}
          <button
            onClick={() => setHighlightToolActive(!highlightToolActive)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              highlightToolActive
                ? 'bg-amber-500 text-white shadow-soft'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Highlighter className="w-3.5 h-3.5" />
            <span>{highlightToolActive ? 'Highlighter On' : 'Highlight Tool'}</span>
          </button>
        </div>
      </div>

      {/* Main Reading Workspace: Side-by-side on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Passage */}
        <div className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border shadow-soft transition-colors ${themeClass}`}>
          <div className="flex items-center justify-between text-xs opacity-70 font-medium mb-6 pb-2 border-b border-current/10">
            <span>Passage 1 of 1</span>
            <span>💡 Click highlighted terms for instant definitions & speech</span>
          </div>

          <div className={`space-y-6 font-sans ${fontClass}`}>
            {paragraphs.map((p) => {
              const isHighlighted = highlightedSentences.includes(p.id);
              return (
                <p
                  key={p.id}
                  onClick={() => handleSentenceClick(p.id)}
                  className={`p-2 rounded-xl transition-all ${
                    highlightToolActive ? 'cursor-pointer hover:ring-2 hover:ring-brand-300' : ''
                  } ${isHighlighted ? highlightClass : ''}`}
                >
                  {renderParagraphText(p.text)}
                </p>
              );
            })}
          </div>

          {/* Active Interactive Vocab Drawer */}
          {activeVocab && (
            <div className="mt-8 p-5 rounded-2xl bg-brand-50 border border-brand-200 text-slate-900 shadow-soft animate-pop-in relative">
              <button
                onClick={() => setActiveVocab(null)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-xl font-black text-brand-950">{activeVocab.word}</h4>
                <span className="text-xs font-mono font-bold text-brand-600">{activeVocab.phonetic}</span>
                <button
                  onClick={() => SpeechService.speak(activeVocab.word, 0.9)}
                  className="p-1.5 rounded-full bg-white text-brand-700 hover:bg-brand-100 shadow-soft-sm"
                  title="Pronounce word"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-slate-800 font-medium mb-3">
                {activeVocab.definition}
              </p>

              <div className="p-3 rounded-xl bg-white/80 border border-brand-100 text-xs italic text-slate-700 mb-3">
                "{activeVocab.example}"
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="font-bold">Synonyms:</span>
                {activeVocab.synonyms.map((s, idx) => (
                  <span key={idx} className="bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Comprehension Question Panel */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-soft">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-xl bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center">
              01
            </span>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Comprehension Question</p>
              <p className="text-xs text-slate-500">Academic Synthesis & Inference</p>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 leading-snug">
            What is the primary mechanism through which vertical micro-forests reduce building masonry temperatures?
          </h3>

          <div className="space-y-3 mb-6">
            {[
              {
                text: "Evapotranspiration and particulate absorption fostering biological symbiosis",
                correct: true
              },
              {
                text: "Deploying high-voltage mechanical refrigeration compressors",
                correct: false
              },
              {
                text: "Converting concrete facades entirely into synthetic reflective mirrors",
                correct: false
              },
              {
                text: "Removing all windows to prevent interior daylight penetration",
                correct: false
              }
            ].map((opt, idx) => {
              const isThisSelected = selectedAnswer === idx;
              const isCorrect = opt.correct;

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-semibold border transition-all flex items-start gap-3 ${
                    !isAnswered
                      ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-soft-sm active:scale-98'
                      : isCorrect
                      ? 'bg-mint-50 border-mint-500 text-mint-950 ring-2 ring-mint-400/20'
                      : isThisSelected
                      ? 'bg-coral-50 border-coral-400 text-coral-950'
                      : 'bg-white border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-md text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isAnswered && isCorrect ? 'bg-mint-600 text-white' : isAnswered && isThisSelected ? 'bg-coral-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className={`p-4 rounded-2xl border animate-pop-in ${
              selectedAnswer === 0 ? 'bg-mint-50 border-mint-200 text-mint-950' : 'bg-coral-50 border-coral-200 text-coral-950'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                {selectedAnswer === 0 ? (
                  <>
                    <Sparkles className="w-4 h-4 text-mint-600" />
                    <span>Exact inference! 🎉 +25 XP</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-coral-600" />
                    <span>Review paragraph 2 carefully:</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm opacity-90 leading-relaxed mb-3">
                Paragraph 2 states: "vertical micro-forests cool surface masonry via evapotranspiration while absorbing airborne particulates."
              </p>
              {selectedAnswer !== 0 && (
                <button
                  onClick={() => {
                    setIsAnswered(false);
                    setSelectedAnswer(null);
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white border border-coral-300 text-coral-700 hover:bg-coral-50"
                >
                  Retry Question
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

