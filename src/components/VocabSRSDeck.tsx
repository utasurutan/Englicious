import React, { useState } from 'react';
import { 
  Volume2, RotateCcw, Check, Sparkles, Layers, 
  HelpCircle, ChevronRight, Award, Bookmark, ArrowRight, Zap 
} from 'lucide-react';
import { sounds } from '../utils/sound';
import { SpeechService } from '../utils/speech';
import confetti from 'canvas-confetti';

interface VocabCardItem {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  collocations: string[];
  deckCategory: string;
  box: 1 | 2 | 3 | 4; // Leitner Box 1 (New) -> 4 (Mastered)
}

const INITIAL_DECKS: VocabCardItem[] = [
  // Academic Word List (AWL)
  {
    id: 'awl-1',
    word: 'ANOMALY',
    phonetic: '/əˈnɒməli/',
    partOfSpeech: 'noun',
    definition: 'Something that deviates from what is standard, normal, or expected.',
    example: 'The geneticist identified a statistical anomaly in the experimental drug trial.',
    collocations: ['genetic anomaly', 'detect an anomaly', 'statistical anomaly'],
    deckCategory: 'Academic Word List (AWL)',
    box: 1
  },
  {
    id: 'awl-2',
    word: 'CORROBORATE',
    phonetic: '/kəˈrɒbəreɪt/',
    partOfSpeech: 'verb',
    definition: 'To confirm or give support to a statement, theory, or finding.',
    example: 'Independent satellite telemetry corroborated the oceanographer’s initial findings.',
    collocations: ['corroborate evidence', 'findings corroborate', 'witness corroborate'],
    deckCategory: 'Academic Word List (AWL)',
    box: 2
  },
  {
    id: 'awl-3',
    word: 'PRAGMATIC',
    phonetic: '/præɡˈmætɪk/',
    partOfSpeech: 'adjective',
    definition: 'Dealing with things sensibly and realistically based on practical rather than theoretical considerations.',
    example: 'The committee adopted a pragmatic approach to zoning regulations.',
    collocations: ['pragmatic approach', 'pragmatic solution', 'pragmatic view'],
    deckCategory: 'Academic Word List (AWL)',
    box: 3
  },
  {
    id: 'awl-4',
    word: 'PERPETUATE',
    phonetic: '/pərˈpɛtʃueɪt/',
    partOfSpeech: 'verb',
    definition: 'To make something, typically an undesirable situation, continue indefinitely.',
    example: 'Sensationalist headlines often perpetuate unfounded misconceptions about public health.',
    collocations: ['perpetuate a myth', 'perpetuate inequality', 'perpetuate cycle'],
    deckCategory: 'Academic Word List (AWL)',
    box: 1
  },
  // Oxford 3000 Essentials
  {
    id: 'ox-1',
    word: 'DILIGENT',
    phonetic: '/ˈdɪlɪdʒənt/',
    partOfSpeech: 'adjective',
    definition: 'Having or showing steady care and conscientious effort in one’s work or duties.',
    example: 'Through diligent revision and practice, he achieved a 99th percentile test score.',
    collocations: ['diligent effort', 'diligent student', 'diligent research'],
    deckCategory: 'Oxford 3000 Core',
    box: 2
  },
  {
    id: 'ox-2',
    word: 'CONCURRENT',
    phonetic: '/kənˈkʌrənt/',
    partOfSpeech: 'adjective',
    definition: 'Existing, happening, or done at the exact same time.',
    example: 'The university offers concurrent degree pathways in economics and computer science.',
    collocations: ['concurrent events', 'concurrent sessions', 'concurrent sentence'],
    deckCategory: 'Oxford 3000 Core',
    box: 1
  },
  // Business & Corporate (TOEIC)
  {
    id: 'biz-1',
    word: 'LEVERAGE',
    phonetic: '/ˈliːvərɪdʒ/',
    partOfSpeech: 'verb & noun',
    definition: 'Use something to maximum advantage to accomplish a strategic commercial goal.',
    example: 'The enterprise aims to leverage cloud infrastructure to expand into Asian markets.',
    collocations: ['leverage assets', 'gain leverage', 'strategic leverage'],
    deckCategory: 'Business & Corporate',
    box: 3
  },
  {
    id: 'biz-2',
    word: 'STIPULATE',
    phonetic: '/ˈstɪpjʊleɪt/',
    partOfSpeech: 'verb',
    definition: 'Demand or specify a requirement typically as part of a bargain or contract.',
    example: 'The contract stipulates that payment must be finalized within thirty calendar days.',
    collocations: ['contract stipulates', 'stipulate conditions', 'clearly stipulate'],
    deckCategory: 'Business & Corporate',
    box: 4
  },
  // Phrasal Verbs & Idioms
  {
    id: 'pv-1',
    word: 'TAKE SOMETHING FOR GRANTED',
    phonetic: '/teɪk fɔːr ˈɡræntɪd/',
    partOfSpeech: 'idiom',
    definition: 'Fail to properly appreciate someone or something, especially as a consequence of overfamiliarity.',
    example: 'We often take clean municipal water for granted until supplies are disrupted.',
    collocations: ['take for granted', 'never take for granted'],
    deckCategory: 'Phrasal Verbs & Idioms',
    box: 2
  },
  {
    id: 'pv-2',
    word: 'CALL OFF',
    phonetic: '/kɔːl ɒf/',
    partOfSpeech: 'phrasal verb',
    definition: 'Cancel an event or agreement that had already been scheduled.',
    example: 'The organizers decided to call off the outdoor conference due to gale-force winds.',
    collocations: ['call off the match', 'call off negotiations', 'call off the search'],
    deckCategory: 'Phrasal Verbs & Idioms',
    box: 4
  }
];

export const VocabSRSDeck: React.FC = () => {
  const [cards, setCards] = useState<VocabCardItem[]>(INITIAL_DECKS);
  const [selectedCategory, setSelectedCategory] = useState<string>('Academic Word List (AWL)');
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const categories = [
    'Academic Word List (AWL)',
    'Oxford 3000 Core',
    'Business & Corporate',
    'Phrasal Verbs & Idioms'
  ];

  const activeCards = cards.filter(c => c.deckCategory === selectedCategory);
  const currentCard = activeCards[currentCardIdx] || activeCards[0];

  // Leitner Box Counts
  const box1Count = cards.filter(c => c.box === 1).length;
  const box2Count = cards.filter(c => c.box === 2).length;
  const box3Count = cards.filter(c => c.box === 3).length;
  const box4Count = cards.filter(c => c.box === 4).length;

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    if (currentCard) {
      SpeechService.speak(currentCard.word, 0.95);
    }
  };

  const handleFlipCard = () => {
    sounds.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleSrsRating = (action: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentCard) return;

    let nextBox: 1 | 2 | 3 | 4 = currentCard.box;
    if (action === 'again') {
      sounds.playIncorrect();
      nextBox = 1;
    } else if (action === 'hard') {
      sounds.playClick();
      nextBox = 2;
    } else if (action === 'good') {
      sounds.playCorrect();
      nextBox = Math.min(4, currentCard.box + 1) as 1 | 2 | 3 | 4;
    } else if (action === 'easy') {
      sounds.playCompletionFanfare();
      nextBox = 4;
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {
        // fallback
      }
    }

    // Update card state
    setCards(prev => prev.map(c => c.id === currentCard.id ? { ...c, box: nextBox } : c));

    // Advance to next card
    setIsFlipped(false);
    if (currentCardIdx + 1 < activeCards.length) {
      setCurrentCardIdx(currentCardIdx + 1);
    } else {
      setCurrentCardIdx(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Top Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Spaced Repetition System (SRS)
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-2 mb-2">
          Vocabulary Mastery Decks
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Scientifically calibrated intervals based on the Leitner spaced repetition method for permanent long-term retention.
        </p>
      </div>

      {/* Leitner Box Status Dashboard */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-8">
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-soft-sm text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Box 1 • New
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-900">{box1Count}</span>
        </div>
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-soft-sm text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 block mb-1">
            Box 2 • Learning
          </span>
          <span className="text-xl sm:text-2xl font-black text-amber-600">{box2Count}</span>
        </div>
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-soft-sm text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 block mb-1">
            Box 3 • Review
          </span>
          <span className="text-xl sm:text-2xl font-black text-brand-600">{box3Count}</span>
        </div>
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-soft-sm text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-mint-500 block mb-1">
            Box 4 • Mastered
          </span>
          <span className="text-xl sm:text-2xl font-black text-mint-600">{box4Count}</span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sounds.playClick();
              setSelectedCategory(cat);
              setCurrentCardIdx(0);
              setIsFlipped(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-brand-600 text-white shadow-soft'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FLASHCARD INTERACTION CANVAS */}
      {currentCard && (
        <div className="max-w-xl mx-auto">
          {/* Card Meta Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-3 px-2">
            <span>Card {currentCardIdx + 1} of {activeCards.length}</span>
            <span className="text-brand-600">Leitner Box {currentCard.box} / 4</span>
          </div>

          {/* 3D Flippable Flashcard */}
          <div
            onClick={handleFlipCard}
            className="w-full aspect-[16/11] min-h-[320px] perspective-1000 cursor-pointer select-none group"
          >
            <div
              className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform rounded-3xl shadow-soft-lg border border-slate-200/90 bg-white ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT OF CARD */}
              <div className="absolute inset-0 w-full h-full backface-hidden p-6 sm:p-8 flex flex-col justify-between rounded-3xl bg-gradient-to-b from-white to-slate-50/50">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-100">
                    {currentCard.partOfSpeech}
                  </span>
                  <button
                    onClick={handleSpeak}
                    className="p-2.5 rounded-full bg-slate-100 hover:bg-brand-50 text-brand-700 shadow-soft-sm transition-transform active:scale-95"
                    title="Pronounce word"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-center my-auto">
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
                    {currentCard.word}
                  </h2>
                  <p className="text-sm font-mono text-brand-600 font-bold">
                    {currentCard.phonetic}
                  </p>
                </div>

                <div className="text-center text-xs font-semibold text-slate-400 group-hover:text-brand-600 transition-colors">
                  Tap anywhere on card to flip & reveal meaning →
                </div>
              </div>

              {/* BACK OF CARD */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-6 sm:p-8 flex flex-col justify-between rounded-3xl bg-white border border-brand-100">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-mint-50 text-mint-700 border border-mint-100 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Definition & Collocations
                  </span>
                  <button
                    onClick={handleSpeak}
                    className="p-2 rounded-full bg-slate-100 hover:bg-brand-50 text-brand-700"
                    title="Pronounce"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 my-auto">
                  <div>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-0.5">Meaning</p>
                    <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
                      {currentCard.definition}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-brand-600 mb-0.5">In Context</p>
                    <p className="text-xs sm:text-sm text-slate-700 italic">
                      "{currentCard.example}"
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Key Collocations</p>
                    <div className="flex flex-wrap gap-1">
                      {currentCard.collocations.map((col, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-semibold text-slate-700">
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center text-xs text-slate-400">
                  Rate your recall difficulty below to schedule next review
                </div>
              </div>
            </div>
          </div>

          {/* SRS Action Rating Buttons (Leitner Interval Triggers) */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-6">
            <button
              onClick={() => handleSrsRating('again')}
              className="py-3 px-2 rounded-2xl bg-white hover:bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs sm:text-sm transition-all shadow-soft-sm active:scale-95"
            >
              Again
              <span className="block text-[10px] font-normal text-rose-500">Reset Box 1</span>
            </button>

            <button
              onClick={() => handleSrsRating('hard')}
              className="py-3 px-2 rounded-2xl bg-white hover:bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs sm:text-sm transition-all shadow-soft-sm active:scale-95"
            >
              Hard
              <span className="block text-[10px] font-normal text-amber-500">Box 2</span>
            </button>

            <button
              onClick={() => handleSrsRating('good')}
              className="py-3 px-2 rounded-2xl bg-white hover:bg-blue-50 border border-brand-200 text-brand-700 font-bold text-xs sm:text-sm transition-all shadow-soft-sm active:scale-95"
            >
              Good
              <span className="block text-[10px] font-normal text-brand-500">Box 3 (+10 XP)</span>
            </button>

            <button
              onClick={() => handleSrsRating('easy')}
              className="py-3 px-2 rounded-2xl bg-mint-600 hover:bg-mint-700 text-white font-bold text-xs sm:text-sm transition-all shadow-soft active:scale-95"
            >
              Easy
              <span className="block text-[10px] font-normal text-mint-100">Mastered (+25 XP)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

