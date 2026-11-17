import React, { useState } from 'react';
import { 
  Play, Target, BookOpen, Info, Volume2, VolumeX, 
  ArrowRight, Sparkles, CheckCircle2, Award, HelpCircle, 
  X, Layers, Globe, Star, ShieldCheck, Flame, Zap,
  ChevronLeft, ChevronRight, FileText, Check, Mic
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
  onExploreCourses,
  onOpenMaterials,
  onStart3dQuiz,
  onOpenTeacherReport,
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
      "Selamat datang di Englicious, Media Pembelajaran Interaktif Bahasa Inggris karya Sultan. Media ini dirancang khusus untuk pembelajaran mandiri dan kelas, lengkap dengan objek 3D interaktif, materi teori mendalam, dan evaluasi resmi. Silakan klik Mulai Pembelajaran.",
      1.0,
      1.0,
      () => {
        setIsSpeakingIntro(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col justify-between selection:bg-brand-500 selection:text-white">
      {/* Ambient glowing background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-brand-600/25 via-indigo-600/10 to-transparent pointer-events-none -z-10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none -z-10" />

      {/* TOP HEADER BAR */}
      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between z-20">
        {/* Brand identity */}
        <div className="flex items-center gap-3 select-none">
          <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-glow-brand font-black text-xl tracking-tighter">
            E
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight text-white">Englicious</span>
              <span className="text-[10px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30">
                MPI PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Media Pembelajaran Interaktif Bahasa Inggris</p>
          </div>
        </div>

        {/* Audio Narator & Sound Toggle & Quick Enter */}
        <div className="flex items-center gap-2.5">
          {/* Narator Intro Voiceover Button */}
          <button
            onClick={handlePlayVoiceover}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              isSpeakingIntro
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-glow-amber animate-pulse'
                : 'bg-white/10 hover:bg-white/15 text-slate-200 border-white/10 hover:text-white'
            }`}
            title="Dengarkan pengantar suara resmi Media Pembelajaran"
          >
            <Mic className={`w-3.5 h-3.5 ${isSpeakingIntro ? 'text-amber-400 animate-spin' : 'text-brand-400'}`} />
            <span className="hidden sm:inline">
              {isSpeakingIntro ? 'Narator Sedang Berbicara...' : 'Sambutan Suara Narator'}
            </span>
          </button>

          <button
            onClick={onToggleSound}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold"
            title={soundEnabled ? 'Matikan Suara Efek' : 'Aktifkan Suara Efek'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-brand-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          <button
            onClick={handleStart}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-bold text-white transition-all active:scale-95"
          >
            <span>Lewati ke Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* MAIN COVER THUMBNAIL CONTAINER */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 my-auto z-10">
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-slate-900/80 backdrop-blur-xl shadow-soft-2xl p-6 sm:p-10 lg:p-12">
          {/* Internal gradient rim */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-indigo-500 to-purple-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Title & Metadata */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-extrabold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                <span>PROJECT MEDIA PEMBELAJARAN INTERAKTIF (MPI)</span>
              </div>

              {/* Main Subject Title */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                  ENGLICIOUS
                </h1>
                <p className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-300 mt-2">
                  Media Pembelajaran Interaktif Bahasa Inggris Berbasis Web
                </p>
                <p className="text-xs sm:text-sm text-slate-400 mt-2.5 max-w-xl leading-relaxed mx-auto lg:mx-0">
                  Media multimedia berbasis web memadukan pengenalan objek 3D interaktif, modul teori tata bahasa lengkap, latihan drag & drop, waveform listening, serta instrumen penilaian guru.
                </p>
              </div>

              {/* Curriculum & Developer Meta Card */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-left">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pengembang (Author)</p>
                  <p className="text-xs sm:text-sm font-extrabold text-white mt-0.5">Sultan</p>
                  <p className="text-[10px] text-brand-400 font-semibold">Project MPI Siswa</p>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-left">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Standar Kurikulum</p>
                  <p className="text-xs sm:text-sm font-extrabold text-white mt-0.5">CEFR A1 - C2</p>
                  <p className="text-[10px] text-mint-400 font-semibold">Kurikulum Merdeka</p>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-left col-span-2 sm:col-span-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mata Pelajaran</p>
                  <p className="text-xs sm:text-sm font-extrabold text-white mt-0.5">Bahasa Inggris</p>
                  <p className="text-[10px] text-amber-400 font-semibold">6 Keterampilan Inti</p>
                </div>
              </div>

              {/* PRIMARY ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={handleStart}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-black text-sm shadow-glow-brand hover:shadow-glow-brand transition-all flex items-center justify-center gap-3 active:scale-95 group"
                >
                  <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </div>
                  <span>MULAI PEMBELAJARAN</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {onOpenMaterials && (
                  <button
                    onClick={() => { sounds.playClick(); onOpenMaterials(); }}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <BookOpen className="w-4 h-4 text-brand-400" />
                    <span>Materi & Teori</span>
                  </button>
                )}

                {onStart3dQuiz && (
                  <button
                    onClick={() => { sounds.playClick(); onStart3dQuiz(); }}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-indigo-600/30 hover:bg-indigo-600/40 border border-indigo-400/40 text-indigo-200 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Latihan Objek 3D</span>
                  </button>
                )}
              </div>

              {/* TEACHER EVALUATION & STANDARD MPI BUTTONS */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
                {onOpenTeacherReport && (
                  <button
                    onClick={() => { sounds.playClick(); onOpenTeacherReport(); }}
                    className="px-3.5 py-2 rounded-xl bg-mint-500/20 hover:bg-mint-500/30 border border-mint-400/40 text-mint-300 transition-colors flex items-center gap-1.5 font-bold"
                  >
                    <FileText className="w-3.5 h-3.5 text-mint-400" />
                    <span>Lembar Penilaian Guru (Grade Report)</span>
                  </button>
                )}

                <button
                  onClick={() => handleOpenModal('objectives')}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Target className="w-3.5 h-3.5 text-brand-400" />
                  <span>Tujuan Pembelajaran (CP/TP)</span>
                </button>

                <button
                  onClick={() => handleOpenModal('guide')}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Petunjuk Penggunaan</span>
                </button>

                <button
                  onClick={() => handleOpenModal('about')}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 text-amber-400" />
                  <span>Info Media & Profil</span>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Visual 3D Showcase Graphic */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Outer decorative card frame */}
              <div className="w-full max-w-sm aspect-square rounded-3xl bg-gradient-to-tr from-brand-600/30 via-slate-800 to-purple-600/20 p-1 border border-white/20 shadow-soft-2xl relative flex items-center justify-center overflow-hidden group">
                
                {/* 3D Showcase Navigation Arrows */}
                <button
                  onClick={handlePrevObject}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/70 hover:text-white border border-white/10 transition-all active:scale-90"
                  title="Objek 3D Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNextObject}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/70 hover:text-white border border-white/10 transition-all active:scale-90"
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
                    className="px-4 py-2 rounded-2xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-center shadow-soft-lg mt-2 transition-all group flex items-center gap-2"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-brand-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-xs font-black text-white">{currentObj.name} <span className="font-mono text-slate-300 font-semibold">{currentObj.phonetic}</span></p>
                      <p className="text-[10px] text-brand-300 font-semibold">"{currentObj.meaning}" • 3D Visual Model ({currentShowcaseIdx + 1}/{SHOWCASE_OBJECTS.length})</p>
                    </div>
                  </button>
                </div>

                {/* Floating mini badges */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-mint-400 flex items-center gap-1.5 shadow-soft">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>IELTS & TOEFL Ready</span>
                </div>

                <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-amber-400 flex items-center gap-1.5 shadow-soft">
                  <Award className="w-3.5 h-3.5" />
                  <span>15 Objek 3D Vektor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER METADATA */}
      <footer className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 border-t border-white/10 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 z-10">
        <p>© 2026 Englicious • Media Pembelajaran Interaktif (MPI) Bahasa Inggris oleh Sultan</p>
        <p className="text-[11px] text-slate-500">
          Dirancang untuk pembelajaran mandiri, penilaian guru, & persiapan tes terstandar
        </p>
      </footer>

      {/* MODAL 1: TUJUAN PEMBELAJARAN (CAPAIAN PEMBELAJARAN) */}
      {activeModal === 'objectives' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 w-full max-w-2xl rounded-3xl border border-white/15 p-6 sm:p-8 text-white shadow-soft-2xl animate-pop-in max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-brand-500/20 text-brand-400 border border-brand-400/30">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black">Capaian & Tujuan Pembelajaran (CP / TP)</h3>
                  <p className="text-xs text-slate-400">Sasaran Kompetensi Media Pembelajaran Interaktif</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="font-bold text-white mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-400" />
                  1. Penguasaan Kosa Kata Visual 3D (Vocabulary Acquisition)
                </p>
                <p className="text-slate-400 text-xs pl-4 leading-relaxed">
                  Siswa mampu mengenali, melafalkan secara fonetik, dan menggunakan kosakata benda 3D dalam konteks kalimat nyata tanpa harus menerjemahkan secara manual.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="font-bold text-white mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  2. Pemahaman Tata Bahasa & Modul Teori (Grammar & Structure)
                </p>
                <p className="text-slate-400 text-xs pl-4 leading-relaxed">
                  Siswa memahami rumus tenses (Simple Past vs Present Perfect), kalimat pengandaian (Conditionals), dan Passive Voice melalui modul teori mendalam dan contoh kalimat kontekstual.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="font-bold text-white mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  3. Keterampilan Mendengar & Berbicara (Listening & Speaking)
                </p>
                <p className="text-slate-400 text-xs pl-4 leading-relaxed">
                  Siswa mampu mengenali pola connected speech, elision, dan reduksi kata melalui audio waveform serta berlatih dialog lisan dengan AI Speaking Roleplay.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="font-bold text-white mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-mint-400" />
                  4. Kesiapan Ujian Standar Internasional (Exam Readiness)
                </p>
                <p className="text-slate-400 text-xs pl-4 leading-relaxed">
                  Siswa terlatih menghadapi ujian TOEFL iBT, IELTS Academic, dan TOEIC dengan simulasi waktu nyata, evaluasi band score, dan identifikasi area kelemahan secara otomatis.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => { setActiveModal(null); handleStart(); }}
                className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs shadow-soft transition-all"
              >
                Mulai Pembelajaran Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PETUNJUK PENGGUNAAN MEDIA */}
      {activeModal === 'guide' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 w-full max-w-2xl rounded-3xl border border-white/15 p-6 sm:p-8 text-white shadow-soft-2xl animate-pop-in max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-400/30">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black">Petunjuk Penggunaan Media</h3>
                  <p className="text-xs text-slate-400">Panduan Mengoperasikan Media Pembelajaran Interaktif</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="w-6 h-6 rounded-lg bg-brand-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                  1
                </span>
                <div>
                  <p className="font-bold text-white">Menu Utama & Navigasi</p>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Gunakan bilah navigasi atas untuk berpindah antara <strong>Dashboard</strong>, <strong>Learn</strong>, <strong>Practice</strong>, dan <strong>Progress</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                  2
                </span>
                <div>
                  <p className="font-bold text-white">Pelajari Teori Sebelum Mengerjakan Kuis</p>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Di menu <strong>Learn</strong>, buka tab <strong>"Materi Pembelajaran & Teori"</strong> untuk membaca rumus tenses, phrasal verbs, dan tips guru sebelum mengerjakan latihan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                  3
                </span>
                <div>
                  <p className="font-bold text-white">Interaktivitas Soal (3D, Drag & Drop, Audio)</p>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Klik atau geser kata (drag-and-drop), putar objek 3D untuk melihat berbagai sudut, dan tekan ikon speaker untuk mendengarkan audio pengucapan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="w-6 h-6 rounded-lg bg-mint-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                  4
                </span>
                <div>
                  <p className="font-bold text-white">Lembar Evaluasi Guru & Cetak Laporan</p>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Buka <strong>Lembar Penilaian Guru</strong> untuk melihat rekap nilai ketuntasan, rubrik kelayakan media, dan mencetak laporan resmi format PDF.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => { setActiveModal(null); handleStart(); }}
                className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs shadow-soft transition-all"
              >
                Saya Mengerti, Masuk ke Media
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: TENTANG MEDIA & PENGEMBANG */}
      {activeModal === 'about' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 w-full max-w-xl rounded-3xl border border-white/15 p-6 sm:p-8 text-white shadow-soft-2xl animate-pop-in">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black">Informasi Media & Pengembang</h3>
                  <p className="text-xs text-slate-400">Profil Pengembang & Spesifikasi Media Pembelajaran</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-300">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-slate-400">Nama Media</span>
                <span className="font-bold text-white">ENGLICIOUS</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-slate-400">Jenis Media</span>
                <span className="font-bold text-white">Media Pembelajaran Interaktif (MPI) Berbasis Web</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-slate-400">Pengembang (Author)</span>
                <span className="font-bold text-brand-400">Sultan</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-slate-400">Tujuan Pembuatan</span>
                <span className="font-bold text-white text-right">Tugas Proyek MPI untuk Guru Pembimbing</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-slate-400">Teknologi yang Digunakan</span>
                <span className="font-mono text-xs text-mint-400">React 18 + TS + Tailwind + Web Speech API</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all"
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
