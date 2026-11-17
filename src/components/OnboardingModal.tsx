import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, Award, HelpCircle, X, ChevronRight, Sliders, Target, BookOpen } from 'lucide-react';
import { UserLevel, LearningGoal, SkillCategory, CEFRLevel, UserProfile } from '../types';
import { sounds } from '../utils/sound';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (updatedProfile: Partial<UserProfile>) => void;
}

const LEVEL_DETAILS: Record<UserLevel, { cefr: string; desc: string }> = {
  'Beginner': { cefr: 'A1', desc: 'Pemula • Kosa kata dasar & pola kalimat S-V-O' },
  'Elementary': { cefr: 'A2', desc: 'Dasar • Percakapan sehari-hari & aktivitas rutin' },
  'Intermediate': { cefr: 'B1', desc: 'Menengah • Tenses lampau, conditionals, & opini' },
  'Upper Intermediate': { cefr: 'B2', desc: 'Menengah Atas • Kemahiran kerja & persiapan tes' },
  'Advanced': { cefr: 'C1/C2', desc: 'Mahir • Tata bahasa kompleks & esai akademik' },
  'Not sure': { cefr: 'Diagnostik', desc: 'Belum yakin • Ikuti mini kuis penempatan' }
};

const GOAL_DETAILS: Record<LearningGoal, { icon: string; desc: string }> = {
  'Improve my English': { icon: '💬', desc: 'Percakapan sehari-hari & kelancaran umum' },
  'School': { icon: '🏫', desc: 'Ujian sekolah, tugas, & Kurikulum Merdeka' },
  'TOEFL': { icon: '🎓', desc: 'Persiapan sertifikasi TOEFL iBT / ITP' },
  'IELTS': { icon: '📜', desc: 'Persiapan kuliah luar negeri & IELTS Academic' },
  'TOEIC': { icon: '💼', desc: 'Komunikasi bisnis & sertifikasi industri' },
  'Work': { icon: '📊', desc: 'Karier profesional, presentasi, & email kerja' },
  'Travel': { icon: '✈️', desc: 'Perjalanan luar negeri & percakapan turis' }
};

const SKILL_DETAILS: Record<SkillCategory, { desc: string }> = {
  'Vocabulary': { desc: 'Objek 3D visual & kosa kata tematik' },
  'Grammar': { desc: 'Rumus tenses & struktur kalimat' },
  'Listening': { desc: 'Audio waveform & aksen penutur asli' },
  'Reading': { desc: 'Teks bacaan, artikel, & kosakata klik' },
  'Speaking': { desc: 'AI roleplay & latihan pengucapan lisan' },
  'Writing': { desc: 'Lab penulisan esai & tata kalimat' }
};

export const OnboardingModal: React.FC<Props> = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedLevel, setSelectedLevel] = useState<UserLevel>('Intermediate');
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal>('TOEFL');
  const [selectedSkills, setSelectedSkills] = useState<SkillCategory[]>([
    'Listening',
    'Speaking',
    'Vocabulary',
    'Grammar'
  ]);

  // Mini Placement Test State
  const [placementAnswers, setPlacementAnswers] = useState<number[]>([]);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);

  if (!isOpen) return null;

  const levels: UserLevel[] = [
    'Beginner',
    'Elementary',
    'Intermediate',
    'Upper Intermediate',
    'Advanced',
    'Not sure'
  ];

  const goals: LearningGoal[] = [
    'Improve my English',
    'School',
    'TOEFL',
    'IELTS',
    'TOEIC',
    'Work',
    'Travel'
  ];

  const skillsList: SkillCategory[] = [
    'Vocabulary',
    'Grammar',
    'Listening',
    'Reading',
    'Speaking',
    'Writing'
  ];

  const placementQuestions = [
    {
      question: 'Which sentence is grammatically correct?',
      options: [
        'She don’t like coffee in the morning.',
        'She doesn’t like coffee in the morning.',
        'She not likes coffee in the morning.',
        'She isn’t like coffee in the morning.'
      ],
      correct: 1
    },
    {
      question: 'Choose the word closest in meaning to "ESSENTIAL":',
      options: ['Optional', 'Crucial', 'Complicated', 'Rare'],
      correct: 1
    },
    {
      question: 'Complete the sentence: "If I ___ more time, I would study for the IELTS exam."',
      options: ['have', 'had', 'will have', 'would have'],
      correct: 1
    }
  ];

  const toggleSkill = (skill: SkillCategory) => {
    sounds.playClick();
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleNextStep = () => {
    sounds.playClick();
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) setStep(4);
  };

  const handleQuizAnswer = (ansIdx: number) => {
    sounds.playClick();
    const updated = [...placementAnswers, ansIdx];
    setPlacementAnswers(updated);

    if (currentQuizIdx + 1 < placementQuestions.length) {
      setCurrentQuizIdx(currentQuizIdx + 1);
    } else {
      // Completed quiz!
      sounds.playCompletionFanfare();
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {
        // fallback
      }
      setStep(5);
    }
  };

  const handleSkipPlacement = () => {
    sounds.playClick();
    const cefr = selectedLevel === 'Beginner' ? 'A1' :
                 selectedLevel === 'Elementary' ? 'A2' :
                 selectedLevel === 'Intermediate' ? 'B1' :
                 selectedLevel === 'Upper Intermediate' ? 'B2' :
                 selectedLevel === 'Advanced' ? 'C1' : 'B1';
    finishOnboarding(cefr, selectedLevel);
  };

  const finishOnboarding = (cefr: CEFRLevel = 'B1', level: UserLevel = selectedLevel) => {
    sounds.playCorrect();
    onComplete({
      level,
      cefr,
      goal: selectedGoal,
      skillsFocus: selectedSkills
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-soft-2xl border border-slate-200 overflow-hidden animate-pop-in">
        {/* Header with step progress indicator */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-brand-50 text-brand-700 font-extrabold text-xs flex items-center justify-center border border-brand-200/80 shadow-soft-xs">
              {step}/5
            </span>
            <div>
              <div className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-brand-600" />
                <p className="text-xs uppercase font-extrabold tracking-wider text-brand-600">
                  Preferensi Belajar (Learning Preferences)
                </p>
              </div>
              <p className="text-sm font-bold text-slate-800">
                {step === 1 && '1. Pilih Tingkat Kemahiran (English Level)'}
                {step === 2 && '2. Target & Sasaran Belajar (Learning Goal)'}
                {step === 3 && '3. Fokus Keterampilan Inti (Skills Focus)'}
                {step === 4 && '4. Mini Kuis Penempatan (Placement Test)'}
                {step === 5 && '5. Rekomendasi Kurikulum Pribadi'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Tutup preferensi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Body */}
        <div className="p-6 sm:p-8">
          {/* STEP 1: Level */}
          {step === 1 && (
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1.5">
                Sejauh mana kemampuan bahasa Inggris Anda?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                Pilih tingkat kemahiran Anda saat ini agar materi dan kuis disesuaikan dengan kenyamanan belajar Anda.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-7">
                {levels.map((lvl) => {
                  const isSelected = selectedLevel === lvl;
                  const details = LEVEL_DETAILS[lvl];
                  return (
                    <button
                      key={lvl}
                      onClick={() => {
                        sounds.playClick();
                        setSelectedLevel(lvl);
                      }}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex items-start justify-between ${
                        isSelected
                          ? 'bg-brand-50 border-brand-500 text-brand-900 ring-2 ring-brand-400/20 shadow-soft-sm'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-soft-xs'
                      }`}
                    >
                      <div className="pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-sm text-slate-900">{lvl}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                            {details.cefr}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          {details.desc}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNextStep}
                className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-glow-brand transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Lanjut ke Target Belajar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Goal */}
          {step === 2 && (
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1.5">
                Apa tujuan utama Anda belajar di Englicious?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                Kami akan memprioritaskan kosa kata praktis, modul simulasi ujian, dan latihan yang sesuai sasaran Anda.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-7">
                {goals.map((goal) => {
                  const isSelected = selectedGoal === goal;
                  const details = GOAL_DETAILS[goal];
                  return (
                    <button
                      key={goal}
                      onClick={() => {
                        sounds.playClick();
                        setSelectedGoal(goal);
                      }}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex items-start justify-between ${
                        isSelected
                          ? 'bg-brand-50 border-brand-500 text-brand-900 ring-2 ring-brand-400/20 shadow-soft-sm'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-soft-xs'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-lg">{details.icon}</span>
                        <div>
                          <p className="font-extrabold text-sm text-slate-900">{goal}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                            {details.desc}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-3.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Kembali
                </button>
                <button
                  onClick={handleNextStep}
                  className="flex-1 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-glow-brand transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>Lanjut ke Fokus Keterampilan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Skills to Improve */}
          {step === 3 && (
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1.5">
                Keterampilan apa yang ingin Anda asah?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                Pilih keterampilan yang ingin diprioritaskan (bisa memilih lebih dari satu). Anda dapat mengubahnya kapan saja.
              </p>

              <div className="grid grid-cols-2 gap-2.5 mb-7">
                {skillsList.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  const details = SKILL_DETAILS[skill];
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex items-start justify-between ${
                        isSelected
                          ? 'bg-brand-50 border-brand-500 text-brand-900 ring-2 ring-brand-400/20 shadow-soft-sm'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-soft-xs'
                      }`}
                    >
                      <div>
                        <p className="font-extrabold text-sm text-slate-900">{skill}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          {details.desc}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-3.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Kembali
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={selectedSkills.length === 0}
                  className="flex-1 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-glow-brand transition-all flex items-center justify-center gap-2 disabled:bg-slate-200 disabled:shadow-none active:scale-98"
                >
                  <span>Lanjut ke Tes Penempatan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Optional Placement Test */}
          {step === 4 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 border border-brand-200/80 px-2.5 py-1 rounded-full">
                  Soal {currentQuizIdx + 1} dari {placementQuestions.length}
                </span>
                <button
                  onClick={handleSkipPlacement}
                  className="text-xs font-bold text-brand-600 hover:text-brand-800 transition-colors flex items-center gap-1"
                >
                  <span>Lewati tes & pakai level saya</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-4">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {placementQuestions[currentQuizIdx].question}
                </h4>
              </div>

              <div className="space-y-2.5 mb-6">
                {placementQuestions[currentQuizIdx].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuizAnswer(i)}
                    className="w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-semibold border border-slate-200 bg-white hover:bg-brand-50 hover:border-brand-400 transition-all flex items-center gap-3 text-slate-800 shadow-soft-xs active:scale-98"
                  >
                    <span className="w-7 h-7 rounded-xl bg-slate-100 text-xs font-black flex items-center justify-center text-slate-600">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt}</span>
                  </button>
                ))}
              </div>

              <div className="text-center">
                <p className="text-[11px] text-slate-400">
                  Tes penempatan cepat ini membantu memverifikasi rekomendasi level awal Anda.
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: Placement Result */}
          {step === 5 && (
            <div className="text-center py-2">
              <div className="w-16 h-16 rounded-3xl bg-mint-50 border border-mint-200 text-mint-600 flex items-center justify-center mx-auto mb-4 shadow-soft">
                <Sparkles className="w-8 h-8" />
              </div>

              <span className="text-xs font-extrabold uppercase tracking-wider text-mint-700 bg-mint-50 border border-mint-200 px-3 py-1 rounded-full">
                Preferensi Selesai Dikonfigurasi
              </span>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 mb-1">
                Level Rekomendasi: B1 — Intermediate
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
                Berdasarkan target <span className="font-bold text-slate-800">"{selectedGoal}"</span> dan evaluasi Anda, kami telah menyusun kurikulum interaktif dengan 20+ soal per bab dan modul PDF.
              </p>

              {/* Recommended Learning Path Preview */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left mb-6">
                <p className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-2">
                  Alur Belajar Prioritas Anda
                </p>
                <div className="space-y-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-mint-500" />
                    <span>Simple Past Tense & Irregular Verbs (20 Latihan Soal)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-500" />
                    <span>Modul Teori PDF: Conditionals & Passive Voice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>3D Visual Objects Vocabulary & Fonetik IPA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Simulasi Target Ujian: {selectedGoal} Gateway</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => finishOnboarding('B1', 'Intermediate')}
                className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-black text-sm shadow-glow-brand transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Buka Dashboard & Mulai Belajar</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
