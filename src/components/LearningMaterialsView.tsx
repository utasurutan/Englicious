import React, { useState } from 'react';
import { 
  BookOpen, Search, Clock, Sparkles, Volume2, ArrowRight, 
  CheckCircle2, AlertTriangle, HelpCircle, Check, ArrowLeft, 
  Award, FileText, Headphones, Layers, Tag 
} from 'lucide-react';
import { LearningMaterial } from '../types';
import { LEARNING_MATERIALS } from '../data/materials';
import { sounds } from '../utils/sound';
import { SpeechService } from '../utils/speech';

interface Props {
  onStartLessonById?: (lessonId: string) => void;
}

export const LearningMaterialsView: React.FC<Props> = ({ onStartLessonById }) => {
  const [materials] = useState<LearningMaterial[]>(LEARNING_MATERIALS);
  const [selectedMaterial, setSelectedMaterial] = useState<LearningMaterial | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [quickCheckAnswer, setQuickCheckAnswer] = useState<number | null>(null);
  const [quickCheckFeedback, setQuickCheckFeedback] = useState<boolean | null>(null);

  const categories = ['All', 'Grammar', 'Vocabulary', 'Pronunciation', 'Writing'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filtered materials
  const filteredMaterials = materials.filter(m => {
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || m.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleOpenMaterial = (material: LearningMaterial) => {
    sounds.playClick();
    setSelectedMaterial(material);
    setQuickCheckAnswer(null);
    setQuickCheckFeedback(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    sounds.playClick();
    setSelectedMaterial(null);
  };

  const handleSpeak = (text: string) => {
    sounds.playClick();
    SpeechService.speak(text);
  };

  const handleQuickCheck = (idx: number, correctIdx: number) => {
    setQuickCheckAnswer(idx);
    if (idx === correctIdx) {
      sounds.playCorrect();
      setQuickCheckFeedback(true);
    } else {
      sounds.playIncorrect();
      setQuickCheckFeedback(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 animate-fade-in">
      {/* If in detail reader view */}
      {selectedMaterial ? (
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={handleBackToList}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-brand-600 font-bold text-xs shadow-soft-sm transition-all mb-6 group active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Daftar Materi</span>
          </button>

          {/* Article Header Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-sm mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200/60">
                {selectedMaterial.category}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                Level {selectedMaterial.level}
              </span>
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1 ml-auto">
                <Clock className="w-3.5 h-3.5" />
                <span>{selectedMaterial.readingTimeMinutes} min read</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
              {selectedMaterial.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
              {selectedMaterial.subtitle}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
              {selectedMaterial.tags.map(tag => (
                <span key={tag} className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/70">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Article Content Sections */}
          <div className="space-y-6 mb-10">
            {selectedMaterial.sections.map((sec, sIdx) => (
              <div key={sIdx} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-sm">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-3">
                  {sec.heading}
                </h3>
                <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line mb-4 font-normal">
                  {sec.content}
                </div>

                {/* Formula Highlight Box */}
                {sec.formula && (
                  <div className="my-4 p-4 rounded-2xl bg-brand-50/80 border border-brand-200 text-brand-950 font-mono text-xs sm:text-sm">
                    <p className="text-[10px] uppercase font-bold text-brand-700 tracking-wider mb-1 font-sans">
                      📐 Rumus & Pola Kalimat:
                    </p>
                    <pre className="whitespace-pre-wrap font-mono font-bold">{sec.formula}</pre>
                  </div>
                )}

                {/* Example Sentences with Audio Button */}
                {sec.examples && sec.examples.length > 0 && (
                  <div className="mt-4 space-y-2.5">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Contoh Kalimat Nyata:
                    </p>
                    {sec.examples.map((ex, eIdx) => (
                      <div key={eIdx} className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3 group">
                        <div className="space-y-0.5">
                          <p className="text-sm font-bold text-slate-900">{ex.en}</p>
                          <p className="text-xs text-slate-500">{ex.id}</p>
                        </div>
                        {ex.audioPhrase && (
                          <button
                            onClick={() => handleSpeak(ex.audioPhrase!)}
                            className="p-2 rounded-xl bg-white hover:bg-brand-50 text-slate-500 hover:text-brand-600 border border-slate-200 shadow-soft-sm transition-colors flex-shrink-0"
                            title="Dengarkan pengucapan audio"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Teacher's Golden Tip */}
                {sec.teacherTip && (
                  <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-extrabold text-amber-900 mb-0.5">💡 Tips Penting dari Guru:</p>
                      <p className="text-amber-800 leading-relaxed">{sec.teacherTip}</p>
                    </div>
                  </div>
                )}

                {/* Warning Callout */}
                {sec.warning && (
                  <div className="mt-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 text-xs sm:text-sm flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-extrabold text-rose-900 mb-0.5">⚠️ Perhatian / Kesalahan Umum:</p>
                      <p className="text-rose-800 leading-relaxed">{sec.warning}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Check Comprehension Quiz */}
          {selectedMaterial.quickCheck && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft-sm mb-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  Uji Pemahaman Cepat (Quick Check)
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-slate-900 mb-4">
                {selectedMaterial.quickCheck.question}
              </h4>

              <div className="space-y-2.5 mb-4">
                {selectedMaterial.quickCheck.options.map((opt, oIdx) => {
                  const isSelected = quickCheckAnswer === oIdx;
                  const isCorrect = oIdx === selectedMaterial.quickCheck!.correctIndex;
                  let optClass = 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800';

                  if (quickCheckAnswer !== null) {
                    if (isCorrect) {
                      optClass = 'bg-mint-50 border-mint-400 text-mint-900 font-bold';
                    } else if (isSelected) {
                      optClass = 'bg-rose-50 border-rose-400 text-rose-900';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleQuickCheck(oIdx, selectedMaterial.quickCheck!.correctIndex)}
                      disabled={quickCheckAnswer !== null}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs sm:text-sm flex items-center justify-between ${optClass}`}
                    >
                      <span>{opt}</span>
                      {quickCheckAnswer !== null && isCorrect && (
                        <Check className="w-4 h-4 text-mint-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {quickCheckFeedback !== null && (
                <div className={`p-4 rounded-2xl text-xs sm:text-sm ${
                  quickCheckFeedback ? 'bg-mint-50 text-mint-900 border border-mint-200' : 'bg-amber-50 text-amber-900 border border-amber-200'
                }`}>
                  <p className="font-bold mb-1">
                    {quickCheckFeedback ? 'Tepat sekali! 🎉' : 'Hampir benar! Simak penjelasannya:'}
                  </p>
                  <p className="opacity-90">{selectedMaterial.quickCheck.explanation}</p>
                </div>
              )}
            </div>
          )}

          {/* Action to Jump Directly to Quiz */}
          {selectedMaterial.relatedLessonId && onStartLessonById && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-soft-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase font-extrabold tracking-wider text-brand-200">
                  Latihan Interaktif
                </p>
                <h4 className="text-lg sm:text-xl font-black">
                  Siap menguji pemahaman Anda dengan soal interaktif?
                </h4>
                <p className="text-xs text-brand-100 mt-0.5">
                  Kerjakan kuis flashcard, drag & drop, audio, dan objek 3D untuk materi ini.
                </p>
              </div>
              <button
                onClick={() => onStartLessonById(selectedMaterial.relatedLessonId!)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-brand-700 hover:bg-brand-50 font-extrabold text-xs shadow-soft transition-all flex items-center justify-center gap-2 flex-shrink-0 active:scale-95"
              >
                <span>Mulai Kuis Latihan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Materials List Overview */
        <div>
          {/* Header Title */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200/60">
              Pusat Materi & Teori Belajar
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2 mb-2">
              Materi Pembelajaran Bahasa Inggris
            </h1>
            <p className="text-sm text-slate-500">
              Bukan hanya sekadar kuis! Pelajari konsep tata bahasa, rumus tenses, daftar kosakata akademis, dan strategi ujian berstandar internasional secara mendalam.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari materi grammar, phrasal verbs, tenses, rumus..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm font-medium shadow-soft-sm"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-1">Kategori:</span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { sounds.playClick(); setSelectedCategory(cat); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-brand-600 text-white shadow-soft-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}

              <span className="text-xs font-bold text-slate-400 mx-2 hidden sm:inline">|</span>

              <span className="text-xs font-bold text-slate-400 mr-1">Level:</span>
              {levels.map(lvl => (
                <button
                  key={lvl}
                  onClick={() => { sounds.playClick(); setSelectedLevel(lvl); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedLevel === lvl
                      ? 'bg-slate-800 text-white shadow-soft-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((mat) => (
              <div
                key={mat.id}
                onClick={() => handleOpenMaterial(mat)}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-brand-300 shadow-soft-sm hover:shadow-soft-lg transition-all cursor-pointer flex flex-col justify-between group active:scale-[0.99]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200/60">
                      {mat.category}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{mat.readingTimeMinutes} min</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-brand-600 transition-colors mb-2 leading-snug">
                    {mat.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                    {mat.summary}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {mat.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-600">
                      Level: <strong className="text-brand-600">{mat.level}</strong>
                    </span>
                    <span className="text-xs font-bold text-brand-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>Baca Materi</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMaterials.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-700 mb-1">Materi tidak ditemukan</p>
              <p className="text-xs text-slate-400">Coba kata kunci pencarian yang lain atau ubah filter kategori.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
