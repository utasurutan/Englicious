import React, { useState } from 'react';
import { 
  Play, Target, BookOpen, Info, Volume2, VolumeX, 
  ArrowRight, Sparkles, CheckCircle2, Award, 
  X, ChevronLeft, ChevronRight, FileText, Mic, Sliders
} from 'lucide-react';
import { VisualObjectId } from '../types';
import { VisualObjectRenderer } from './activities/VisualObjectRenderer';
import { sounds } from '../utils/sound';
import { SpeechService } from '../utils/speech';

interface Props {
  onStartLearning: () => void;
  onExploreCourses: () => void;
  onOpenMaterials?: () => void;
  onStart3dQuiz?: () => void;
  onOpenTeacherReport?: () => void;
  onSkipToDashboard?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const SHOWCASE_OBJECTS: Array<{ id: VisualObjectId; name: string; phonetic: string; meaning: string }> = [
  { id: 'apple', name: 'Apple', phonetic: '/ˈæp.əl/', meaning: 'Apel' },
  { id: 'pencil', name: 'Pencil', phonetic: '/ˈpen.səl/', meaning: 'Pensil' },
  { id: 'microscope', name: 'Microscope', phonetic: '/ˈmaɪ.krə.skoʊp/', meaning: 'Mikroskop' },
  { id: 'globe', name: 'Globe', phonetic: '/ɡloʊb/', meaning: 'Bola Dunia' },
  { id: 'guitar', name: 'Guitar', phonetic: '/ɡɪˈtɑːr/', meaning: 'Gitar Akustik' },
  { id: 'telescope', name: 'Telescope', phonetic: '/ˈtel.ə.skoʊp/', meaning: 'Teleskop Bintang' },
  { id: 'coffee', name: 'Coffee Mug', phonetic: '/ˈkɒf.i mʌɡ/', meaning: 'Cangkir Kopi' },
  { id: 'airplane', name: 'Airplane', phonetic: '/ˈeə.pleɪn/', meaning: 'Pesawat Terbang' },
  { id: 'headphones', name: 'Headphones', phonetic: '/ˈhɛd.foʊnz/', meaning: 'Headphone' },
  { id: 'backpack', name: 'Backpack', phonetic: '/ˈbæk.pæk/', meaning: 'Ransel' },
  { id: 'car', name: 'Electric Car', phonetic: '/kɑːr/', meaning: 'Mobil' },
  { id: 'clock', name: 'Alarm Clock', phonetic: '/əˈlɑːm klɒk/', meaning: 'Jam Beker' }
];

export const MpiCoverThumbnail: React.FC<Props> = ({
  onStartLearning,
  onOpenMaterials,
  onStart3dQuiz,
  onOpenTeacherReport,
  onSkipToDashboard,
  soundEnabled,
  onToggleSound
}) => {
  const [activeModal, setActiveModal] = useState<'objectives' | 'guide' | 'about' | null>(null);
  const [currentShowcaseIdx, setCurrentShowcaseIdx] = useState(0);
  const [isSpeakingIntro, setIsSpeakingIntro] = useState(false);

  const currentObj = SHOWCASE_OBJECTS[currentShowcaseIdx];

  const handleStart = () => {
    sounds.playClick();
    onStartLearning();
  };

  const handleSkip = () => {
    sounds.playClick();
    if (onSkipToDashboard) {
      onSkipToDashboard();
    } else {
      onStartLearning();
    }
  };

  const handleOpenModal = (modal: 'objectives' | 'guide' | 'about') => {
    sounds.playClick();
    setActiveModal(modal);
  };

  const handleNextObject = () => {
    sounds.playClick();
    setCurrentShowcaseIdx(prev => (prev + 1) % SHOWCASE_OBJECTS.length);
  };

  const handlePrevObject = () => {
    sounds.playClick();
    setCurrentShowcaseIdx(prev => (prev - 1 + SHOWCASE_OBJECTS.length) % SHOWCASE_OBJECTS.length);
  };

  const handlePronounceShowcase = () => {
    sounds.playClick();
    SpeechService.speak(`${currentObj.name}. In Indonesian, it means ${currentObj.meaning}.`);
  };

  const handlePlayVoiceover = () => {
    sounds.playClick();
    if (isSpeakingIntro) {
      SpeechService.stop();
      setIsSpeakingIntro(false);
      return;
    }

    setIsSpeakingIntro(true);
    SpeechService.speak(
      "Selamat datang di Englicious, Media Pembelajaran Interaktif Bahasa Inggris karya Sultan. Media ini dirancang khusus untuk pembelajaran mandiri dan kelas, lengkap dengan objek 3D interaktif, modul teori mendalam, dan evaluasi resmi. Silakan klik Mulai Pembelajaran untuk mengatur preferensi belajar Anda.",
      1.0,
      1.0,
      () => {
        setIsSpeakingIntro(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative overflow-hidden flex flex-col justify-between selection:bg-brand-500 selection:text-white">
      {/* Ambient glowing background gradients matching Englicious palette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-blue-100/70 via-indigo-50/40 to-transparent pointer-events-none -z-10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none -z-10" />

      {/* TOP HEADER BAR */}
      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between z-20">
        {/* Brand identity */}
        <div className="flex items-center gap-3 select-none">
          <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-glow-brand font-black text-xl tracking-tighter">
            E
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-slate-900">Englicious</span>
              <span className="text-[10px] uppercase font-extrabold tracking-widest px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200/80 shadow-soft-xs">
                MPI PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Media Pembelajaran Interaktif Bahasa Inggris</p>
          </div>
        </div>

        {/* Audio Narator & Sound Toggle & Quick Enter */}
        <div className="flex items-center gap-2.5">
          {/* Narator Intro Voiceover Button */}
          <button
            onClick={handlePlayVoiceover}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border shadow-soft-sm ${
              isSpeakingIntro
                ? 'bg-amber-50 text-amber-700 border-amber-300 ring-2 ring-amber-400/20 shadow-glow-amber animate-pulse'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90'
            }`}
            title="Dengarkan pengantar suara resmi Media Pembelajaran"
          >
            <Mic className={`w-3.5 h-3.5 ${isSpeakingIntro ? 'text-amber-500 animate-spin' : 'text-brand-600'}`} />
            <span className="hidden sm:inline">
              {isSpeakingIntro ? 'Narator Sedang Berbicara...' : 'Sambutan Suara Narator'}
            </span>
          </button>

          <button
            onClick={onToggleSound}
            className="p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-600 shadow-soft-sm transition-colors flex items-center gap-2 text-xs font-bold"
            title={soundEnabled ? 'Matikan Suara Efek' : 'Aktifkan Suara Efek'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-brand-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          <button
            onClick={handleSkip}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-xs font-bold text-slate-700 shadow-soft-sm hover:border-slate-300 transition-all active:scale-95"
            title="Langsung menuju halaman Dashboard utama"
          >
            <span>Lewati ke Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* MAIN COVER THUMBNAIL CONTAINER */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 my-auto z-10">
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-soft-xl p-6 sm:p-10 lg:p-12">
          {/* Internal gradient top rim */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Title & Metadata */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-extrabold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>PROJECT MEDIA PEMBELAJARAN INTERAKTIF (MPI)</span>
              </div>

              {/* Main Subject Title */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-slate-900">
                  ENGLICIOUS
                </h1>
                <p className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600 mt-2">
                  Media Pembelajaran Interaktif Bahasa Inggris Berbasis Web
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 max-w-xl leading-relaxed mx-auto lg:mx-0">
                  Media multimedia memadukan pengenalan objek 3D interaktif, modul teori PDF, bank soal 20+ per bab, latihan drag & drop, waveform listening, serta instrumen penilaian guru.
                </p>
              </div>

              {/* Curriculum & Developer Meta Card */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pengembang (Author)</p>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">Sultan</p>
                  <p className="text-[10px] text-brand-600 font-bold bg-brand-50 border border-brand-200/60 px-2 py-0.5 rounded-full inline-block mt-0.5">Project MPI Siswa</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Standar Kurikulum</p>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">CEFR A1 - C2</p>
                  <p className="text-[10px] text-mint-700 font-bold bg-mint-50 border border-mint-200/60 px-2 py-0.5 rounded-full inline-block mt-0.5">Kurikulum Merdeka</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left col-span-2 sm:col-span-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mata Pelajaran</p>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">Bahasa Inggris</p>
                  <p className="text-[10px] text-amber-700 font-bold bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full inline-block mt-0.5">6 Keterampilan Inti</p>
                </div>
              </div>

              {/* PRIMARY ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={handleStart}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-black text-sm shadow-glow-brand transition-all flex items-center justify-center gap-3 active:scale-95 group"
                >
                  <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </div>
                  <div className="text-left">
                    <p className="leading-none">MULAI PEMBELAJARAN</p>
                    <p className="text-[10px] font-semibold text-blue-100 mt-0.5">Atur Preferensi Belajar Anda</p>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-1" />
                </button>

                {onOpenMaterials && (
                  <button
                    onClick={() => { sounds.playClick(); onOpenMaterials(); }}
                    className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm shadow-soft-sm transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <BookOpen className="w-4 h-4 text-brand-600" />
                    <span>Materi & Teori</span>
                  </button>
                )}

                {onStart3dQuiz && (
                  <button
                    onClick={() => { sounds.playClick(); onStart3dQuiz(); }}
                    className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-bold text-xs sm:text-sm shadow-soft-sm transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Latihan Objek 3D</span>
                  </button>
                )}
              </div>

              {/* TEACHER EVALUATION & STANDARD MPI BUTTONS */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
                {onOpenTeacherReport && (
                  <button
                    onClick={() => { sounds.playClick(); onOpenTeacherReport(); }}
                    className="px-3.5 py-2 rounded-xl bg-mint-50 hover:bg-mint-100 border border-mint-200 text-mint-800 transition-colors flex items-center gap-1.5 font-bold shadow-soft-xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-mint-600" />
                    <span>Lembar Penilaian Guru (Grade Report)</span>
                  </button>
                )}

                <button
                  onClick={() => handleOpenModal('objectives')}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 font-semibold shadow-soft-xs"
                >
                  <Target className="w-3.5 h-3.5 text-brand-600" />
                  <span>Tujuan Pembelajaran (CP/TP)</span>
                </button>

                <button
                  onClick={() => handleOpenModal('guide')}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 font-semibold shadow-soft-xs"
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Petunjuk Penggunaan</span>
                </button>

                <button
                  onClick={() => handleOpenModal('about')}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 font-semibold shadow-soft-xs"
                >
                  <Info className="w-3.5 h-3.5 text-amber-600" />
                  <span>Info Media & Profil</span>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Visual 3D Showcase Graphic */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Outer decorative card frame matching web light palette */}
              <div className="w-full max-w-sm aspect-square rounded-3xl bg-gradient-to-tr from-brand-50/80 via-white to-indigo-50/60 p-3 border border-slate-200/90 shadow-soft-lg relative flex items-center justify-center overflow-hidden group">
                {/* Soft backdrop glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-blue-50/20 to-indigo-50/30 pointer-events-none" />

                {/* 3D Showcase Navigation Arrows */}
                <button
                  onClick={handlePrevObject}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200/90 shadow-soft-sm transition-all active:scale-90"
                  title="Objek 3D Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNextObject}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200/90 shadow-soft-sm transition-all active:scale-90"
                  title="Objek 3D Selanjutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Floating 3D Artwork */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div 
                    onClick={handlePronounceShowcase}
                    className="scale-105 sm:scale-120 mb-2 group-hover:scale-125 transition-transform duration-500 cursor-pointer"
                    title="Klik untuk mendengarkan pengucapan kata"
                  >
                    <VisualObjectRenderer objectId={currentObj.id} rotation={{ x: 18, y: -25 }} />
                  </div>

                  {/* Glass Tag below object with Audio Button */}
                  <button
                    onClick={handlePronounceShowcase}
                    className="px-4 py-2.5 rounded-2xl bg-white/95 hover:bg-white backdrop-blur-md border border-slate-200/90 text-center shadow-soft-md mt-2 transition-all group flex items-center gap-2.5 active:scale-98"
                  >
                    <Volume2 className="w-4 h-4 text-brand-600 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <p className="text-xs font-black text-slate-900">{currentObj.name} <span className="font-mono text-slate-500 font-semibold">{currentObj.phonetic}</span></p>
                      <p className="text-[10px] text-brand-600 font-bold">"{currentObj.meaning}" • 3D Visual Model ({currentShowcaseIdx + 1}/{SHOWCASE_OBJECTS.length})</p>
                    </div>
                  </button>
                </div>

                {/* Floating mini badges */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/80 text-[10px] font-bold text-mint-700 flex items-center gap-1.5 shadow-soft-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-mint-600" />
                  <span>IELTS & TOEFL Ready</span>
                </div>

                <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/80 text-[10px] font-bold text-amber-700 flex items-center gap-1.5 shadow-soft-sm">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>15 Objek 3D Vektor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER METADATA */}
      <footer className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 border-t border-slate-200/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 z-10">
        <p>© 2026 Englicious • Media Pembelajaran Interaktif (MPI) Bahasa Inggris oleh Sultan</p>
        <p className="text-[11px] text-slate-400">
          Dirancang untuk pembelajaran mandiri, penilaian guru, & persiapan tes terstandar
        </p>
      </footer>

      {/* MODAL 1: TUJUAN PEMBELAJARAN (CAPAIAN PEMBELAJARAN) */}
      {activeModal === 'objectives' && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl border border-slate-200 p-6 sm:p-8 text-slate-800 shadow-soft-2xl animate-pop-in max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-brand-50 text-brand-600 border border-brand-200">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Capaian & Tujuan Pembelajaran (CP / TP)</h3>
                  <p className="text-xs text-slate-500">Sasaran Kompetensi Media Pembelajaran Interaktif</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <p className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  1. Penguasaan Kosa Kata Visual 3D (Vocabulary Acquisition)
                </p>
                <p className="text-slate-600 text-xs pl-4 leading-relaxed">
                  Siswa mampu mengenali, melafalkan secara fonetik, dan menggunakan kosakata benda 3D dalam konteks kalimat nyata tanpa harus menerjemahkan secara manual.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <p className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  2. Pemahaman Tata Bahasa & Modul Teori (Grammar & Structure)
                </p>
                <p className="text-slate-600 text-xs pl-4 leading-relaxed">
                  Siswa memahami rumus tenses (Simple Past vs Present Perfect), kalimat pengandaian (Conditionals), dan Passive Voice melalui modul teori mendalam dan contoh kalimat kontekstual.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <p className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  3. Keterampilan Mendengar & Berbicara (Listening & Speaking)
                </p>
                <p className="text-slate-600 text-xs pl-4 leading-relaxed">
                  Siswa mampu mengenali pola connected speech, elision, dan reduksi kata melalui audio waveform serta berlatih dialog lisan dengan AI Speaking Roleplay.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <p className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-mint-500" />
                  4. Kesiapan Ujian Standar Internasional (Exam Readiness)
                </p>
                <p className="text-slate-600 text-xs pl-4 leading-relaxed">
                  Siswa terlatih menghadapi ujian TOEFL iBT, IELTS Academic, dan TOEIC dengan simulasi waktu nyata, evaluasi band score, dan identifikasi area kelemahan secara otomatis.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => { setActiveModal(null); handleStart(); }}
                className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-soft transition-all flex items-center gap-2"
              >
                <span>Mulai Pembelajaran & Atur Preferensi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PETUNJUK PENGGUNAAN MEDIA */}
      {activeModal === 'guide' && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl border border-slate-200 p-6 sm:p-8 text-slate-800 shadow-soft-2xl animate-pop-in max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Petunjuk Penggunaan Media</h3>
                  <p className="text-xs text-slate-500">Panduan Mengoperasikan Media Pembelajaran Interaktif</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="w-6 h-6 rounded-lg bg-brand-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                  1
                </span>
                <div>
                  <p className="font-bold text-slate-900">Preferensi & Alur Belajar</p>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Saat mengklik <strong>Mulai Pembelajaran</strong>, Anda akan diarahkan ke bagian <strong>Preferensi Belajar</strong> untuk memilih level awal, target (TOEFL/IELTS/Sekolah), dan fokus keterampilan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                  2
                </span>
                <div>
                  <p className="font-bold text-slate-900">Pelajari Teori Sebelum Mengerjakan Kuis</p>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Di alur belajar, buka ikon modul teori <strong>PDF</strong> untuk membaca rumus tenses, phrasal verbs, dan tips guru sebelum mengerjakan latihan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                  3
                </span>
                <div>
                  <p className="font-bold text-slate-900">Interaktivitas Soal (3D, Drag & Drop, Audio)</p>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Klik atau geser kata (drag-and-drop), putar objek 3D untuk melihat berbagai sudut, dan tekan ikon speaker untuk mendengarkan audio pengucapan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="w-6 h-6 rounded-lg bg-mint-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                  4
                </span>
                <div>
                  <p className="font-bold text-slate-900">Lembar Evaluasi Guru & Cetak Laporan</p>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Buka <strong>Lembar Penilaian Guru</strong> untuk melihat rekap nilai ketuntasan, rubrik kelayakan media, dan mencetak laporan resmi format PDF.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => { setActiveModal(null); handleStart(); }}
                className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-soft transition-all flex items-center gap-2"
              >
                <span>Saya Mengerti, Masuk ke Preferensi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: TENTANG MEDIA & PENGEMBANG */}
      {activeModal === 'about' && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-xl rounded-3xl border border-slate-200 p-6 sm:p-8 text-slate-800 shadow-soft-2xl animate-pop-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Informasi Media & Pengembang</h3>
                  <p className="text-xs text-slate-500">Profil Pengembang & Spesifikasi Media Pembelajaran</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex justify-between items-center">
                <span className="text-slate-500">Nama Media</span>
                <span className="font-bold text-slate-900">ENGLICIOUS</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex justify-between items-center">
                <span className="text-slate-500">Jenis Media</span>
                <span className="font-bold text-slate-900">Media Pembelajaran Interaktif (MPI) Berbasis Web</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex justify-between items-center">
                <span className="text-slate-500">Pengembang (Author)</span>
                <span className="font-bold text-brand-600">Sultan</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex justify-between items-center">
                <span className="text-slate-500">Tujuan Pembuatan</span>
                <span className="font-bold text-slate-900 text-right">Tugas Proyek MPI untuk Guru Pembimbing</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex justify-between items-center">
                <span className="text-slate-500">Teknologi yang Digunakan</span>
                <span className="font-mono text-xs text-mint-700 font-bold">React 18 + TS + Tailwind + Web Speech API</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
