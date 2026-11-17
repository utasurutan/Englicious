import React, { useState } from 'react';
import { 
  Play, Target, BookOpen, Info, Volume2, VolumeX, 
  ArrowRight, Sparkles, X, FileText, Mic, Award
} from 'lucide-react';
import { sounds } from '../utils/sound';
import { SpeechService } from '../utils/speech';

interface Props {
  onStartLearning: () => void;
  onExploreCourses?: () => void;
  onOpenTeacherReport?: () => void;
  onSkipToDashboard?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const MpiCoverThumbnail: React.FC<Props> = ({
  onStartLearning,
  onOpenTeacherReport,
  onSkipToDashboard,
  soundEnabled,
  onToggleSound
}) => {
  const [activeModal, setActiveModal] = useState<'objectives' | 'guide' | 'about' | null>(null);
  const [isSpeakingIntro, setIsSpeakingIntro] = useState(false);

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

  const handlePlayVoiceover = () => {
    sounds.playClick();
    if (isSpeakingIntro) {
      SpeechService.stop();
      setIsSpeakingIntro(false);
      return;
    }

    setIsSpeakingIntro(true);
    SpeechService.speak(
      "Selamat datang di Englicious, Media Pembelajaran Interaktif Bahasa Inggris karya Sultan. Media ini memadukan pengenalan kosa kata 3D, modul teori tata bahasa, latihan drag and drop, serta instrumen evaluasi guru. Silakan klik Mulai Pembelajaran untuk mengatur preferensi belajar Anda.",
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
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 my-auto z-10">
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-soft-xl p-6 sm:p-10 lg:p-12 text-center">
          {/* Internal gradient top rim */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600" />

          <div className="space-y-7 max-w-3xl mx-auto">
            {/* Category Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-extrabold tracking-wide shadow-soft-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>PROJECT MEDIA PEMBELAJARAN INTERAKTIF (MPI)</span>
            </div>

            {/* Main Subject Title */}
            <div className="space-y-2.5">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-slate-900">
                ENGLICIOUS
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600">
                Media Pembelajaran Interaktif Bahasa Inggris Berbasis Web
              </p>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed mx-auto pt-1 font-medium">
                Media multimedia memadukan pengenalan kosa kata 3D, modul teori PDF interaktif, bank latihan 20+ soal per bab, latihan drag & drop, waveform listening, serta instrumen penilaian guru.
              </p>
            </div>

            {/* Curriculum & Developer Meta Card (Neat 3-Column Symmetrical Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left">
              {/* 1. Pengembang */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-soft-xs flex items-center gap-3.5 hover:border-brand-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200/80 flex items-center justify-center text-brand-600 flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pengembang (Author)</p>
                  <p className="text-sm font-black text-slate-900 truncate">Sultan</p>
                  <span className="text-[10px] text-brand-600 font-bold bg-brand-50 border border-brand-200/60 px-2 py-0.5 rounded-full inline-block mt-0.5">
                    Project MPI Siswa
                  </span>
                </div>
              </div>

              {/* 2. Standar Kurikulum */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-soft-xs flex items-center gap-3.5 hover:border-mint-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-mint-50 border border-mint-200/80 flex items-center justify-center text-mint-600 flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Standar Kurikulum</p>
                  <p className="text-sm font-black text-slate-900 truncate">CEFR A1 – C2</p>
                  <span className="text-[10px] text-mint-700 font-bold bg-mint-50 border border-mint-200/60 px-2 py-0.5 rounded-full inline-block mt-0.5">
                    Kurikulum Merdeka
                  </span>
                </div>
              </div>

              {/* 3. Mata Pelajaran */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-soft-xs flex items-center gap-3.5 hover:border-amber-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 flex-shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mata Pelajaran</p>
                  <p className="text-sm font-black text-slate-900 truncate">Bahasa Inggris</p>
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full inline-block mt-0.5">
                    6 Keterampilan Inti
                  </span>
                </div>
              </div>
            </div>

            {/* PRIMARY CALL TO ACTION BUTTON */}
            <div className="pt-2 flex flex-col items-center justify-center">
              <button
                onClick={handleStart}
                className="w-full sm:w-auto px-10 py-4.5 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-600 hover:from-brand-500 hover:to-indigo-500 text-white font-black text-base shadow-glow-brand hover:shadow-glow-brand transition-all flex items-center justify-center gap-3.5 active:scale-95 group"
              >
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
                <span>MULAI PEMBELAJARAN</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <p className="text-xs text-slate-400 mt-2.5 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                <span>Klik untuk mengatur preferensi belajar dan masuk ke dashboard</span>
              </p>
            </div>

            {/* TEACHER EVALUATION & STANDARD MPI BUTTONS (Balanced 4-Column Grid) */}
            <div className="pt-6 border-t border-slate-100">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                {/* 1. Lembar Penilaian Guru */}
                {onOpenTeacherReport && (
                  <button
                    onClick={() => { sounds.playClick(); onOpenTeacherReport(); }}
                    className="p-3 rounded-2xl bg-mint-50/80 hover:bg-mint-100 border border-mint-200/90 text-mint-800 transition-all flex flex-col sm:flex-row items-center justify-center gap-2 font-bold shadow-soft-xs hover:-translate-y-0.5 group"
                    title="Buka Lembar Penilaian Guru format PDF"
                  >
                    <FileText className="w-4 h-4 text-mint-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-center sm:text-left leading-tight">Penilaian Guru (PDF)</span>
                  </button>
                )}

                {/* 2. Tujuan Pembelajaran (CP/TP) */}
                <button
                  onClick={() => handleOpenModal('objectives')}
                  className="p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-all flex flex-col sm:flex-row items-center justify-center gap-2 font-semibold shadow-soft-xs hover:-translate-y-0.5 group"
                  title="Lihat Capaian & Tujuan Pembelajaran"
                >
                  <Target className="w-4 h-4 text-brand-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-center sm:text-left leading-tight">Tujuan Belajar (CP/TP)</span>
                </button>

                {/* 3. Petunjuk Penggunaan */}
                <button
                  onClick={() => handleOpenModal('guide')}
                  className="p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-all flex flex-col sm:flex-row items-center justify-center gap-2 font-semibold shadow-soft-xs hover:-translate-y-0.5 group"
                  title="Lihat Petunjuk Penggunaan Media"
                >
                  <BookOpen className="w-4 h-4 text-indigo-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-center sm:text-left leading-tight">Petunjuk Penggunaan</span>
                </button>

                {/* 4. Info Media & Profil */}
                <button
                  onClick={() => handleOpenModal('about')}
                  className="p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-all flex flex-col sm:flex-row items-center justify-center gap-2 font-semibold shadow-soft-xs hover:-translate-y-0.5 group"
                  title="Informasi Pengembang dan Media"
                >
                  <Info className="w-4 h-4 text-amber-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-center sm:text-left leading-tight">Info Media & Profil</span>
                </button>
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
