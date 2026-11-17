import React, { useState } from 'react';
import { 
  Printer, X, Award, CheckCircle2, Star, BookOpen, 
  UserCheck, ShieldCheck, Download, Sparkles, FileText, Check 
} from 'lucide-react';
import { UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

export const TeacherReportModal: React.FC<Props> = ({ isOpen, onClose, user }) => {
  const [teacherNotes, setTeacherNotes] = useState<string>(
    'Media Pembelajaran Interaktif (MPI) Englicious karya Sultan dinilai sangat baik, inovatif, dan komprehensif. Objek visual 3D, materi teori tata bahasa, serta fitur audio pengucapan sangat mendukung pencapaian kompetensi siswa sesuai Kurikulum Merdeka dan standar CEFR.'
  );

  const [ratings, setRatings] = useState<{ [key: string]: number }>({
    curriculum: 5,
    visual3d: 5,
    audio: 5,
    interactivity: 5,
    usability: 5
  });

  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const handleRatingChange = (key: string, val: number) => {
    sounds.playClick();
    setRatings(prev => ({ ...prev, [key]: val }));
  };

  const averageScore = Math.round(
    (Object.values(ratings).reduce((a, b) => a + b, 0) / (Object.values(ratings).length * 5)) * 100
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto print:p-0 print:bg-white print:static animate-fade-in">
      <div className="bg-white w-full max-w-3xl rounded-3xl border border-slate-200 shadow-soft-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
        {/* MODAL HEADER (Hidden on print) */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white font-black text-base shadow-glow-brand">
              E
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base tracking-tight flex items-center gap-2">
                <span>Lembar Hasil Belajar & Evaluasi Guru (MPI)</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-mint-500/20 text-mint-300 border border-mint-400/30">
                  Resmi
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">Media Pembelajaran Interaktif Bahasa Inggris • Guru Pembimbing</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-soft active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={() => { sounds.playClick(); onClose(); }}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE REPORT CONTENT BODY */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 print:p-8 print:space-y-4">
          
          {/* Official Letterhead Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl text-brand-700 tracking-tight">ENGLICIOUS</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">• MPI PRO</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 mt-1 uppercase tracking-tight">
                Laporan Hasil Belajar & Lembar Validasi Media Pembelajaran Interaktif
              </h2>
              <p className="text-xs text-slate-500">
                Standar Kurikulum Merdeka & Common European Framework of Reference (CEFR A1 - C2)
              </p>
            </div>

            <div className="text-left sm:text-right text-xs space-y-0.5 border-l-2 sm:border-l-0 pl-3 sm:pl-0 border-brand-500">
              <p className="text-slate-500">Tanggal Asesmen:</p>
              <p className="font-bold text-slate-900">
                {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <p className="text-[11px] text-brand-600 font-semibold">No. Dokumen: MPI-ENG-2026/01</p>
            </div>
          </div>

          {/* Student & Project Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Siswa / Author</span>
              <strong className="text-sm font-extrabold text-slate-900">{user.name}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tingkat Kemahiran</span>
              <strong className="text-sm font-extrabold text-brand-700">{user.level} ({user.cefr})</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Target Pembelajaran</span>
              <strong className="text-sm font-extrabold text-indigo-700">{user.goal} Ready</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Status Ketuntasan</span>
              <span className="inline-flex items-center gap-1 font-black text-mint-700 bg-mint-100 px-2 py-0.5 rounded-md text-xs mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                TUNTAS (KKM: 75)
              </span>
            </div>
          </div>

          {/* SECTION 1: REKAPITULASI HASIL EVALUASI SISWA */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-brand-600" />
              1. Rekapitulasi Capaian Belajar Siswa (Student Competency)
            </h4>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Kompetensi / Aspek Latihan</th>
                    <th className="py-2.5 px-3">Bentuk Interaksi</th>
                    <th className="py-2.5 px-3 text-center">Skor Siswa</th>
                    <th className="py-2.5 px-3 text-center">KKM</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Visual 3D Object Vocabulary</td>
                    <td className="py-2 px-3 text-slate-500">Render Vektor 3D, Multi-angle & Spelling</td>
                    <td className="py-2 px-3 text-center font-bold text-mint-700">96 / 100</td>
                    <td className="py-2 px-3 text-center text-slate-400">75</td>
                    <td className="py-2 px-3 text-center font-bold text-mint-600">Sangat Baik</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Grammar & Sentence Structure</td>
                    <td className="py-2 px-3 text-slate-500">Drag & Drop Word Order & Theory Modul</td>
                    <td className="py-2 px-3 text-center font-bold text-mint-700">92 / 100</td>
                    <td className="py-2 px-3 text-center text-slate-400">75</td>
                    <td className="py-2 px-3 text-center font-bold text-mint-600">Sangat Baik</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Listening Comprehension</td>
                    <td className="py-2 px-3 text-slate-500">Interactive Waveform & Accent Nuance</td>
                    <td className="py-2 px-3 text-center font-bold text-mint-700">94 / 100</td>
                    <td className="py-2 px-3 text-center text-slate-400">75</td>
                    <td className="py-2 px-3 text-center font-bold text-mint-600">Sangat Baik</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Reading Passage & Context</td>
                    <td className="py-2 px-3 text-slate-500">Interactive Clickable Word Definition</td>
                    <td className="py-2 px-3 text-center font-bold text-mint-700">95 / 100</td>
                    <td className="py-2 px-3 text-center text-slate-400">75</td>
                    <td className="py-2 px-3 text-center font-bold text-mint-600">Sangat Baik</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Writing & AI Dialogue</td>
                    <td className="py-2 px-3 text-slate-500">CEFR Rubric Evaluator & Roleplay</td>
                    <td className="py-2 px-3 text-center font-bold text-brand-700">88 / 100</td>
                    <td className="py-2 px-3 text-center text-slate-400">75</td>
                    <td className="py-2 px-3 text-center font-bold text-brand-600">Baik Sekali</td>
                  </tr>
                  <tr className="bg-brand-50/60 font-black text-slate-900">
                    <td className="py-2.5 px-3" colSpan={2}>Rata-Rata Capaian Pembelajaran Siswa</td>
                    <td className="py-2.5 px-3 text-center text-brand-700 text-sm">93.0 / 100</td>
                    <td className="py-2.5 px-3 text-center text-slate-600">75</td>
                    <td className="py-2.5 px-3 text-center text-mint-700 uppercase">KOMPETEN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 2: RUBRIK PENILAIAN KELAYAKAN MEDIA OLEH GURU */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                2. Instrumen Validasi Kelayakan Media (Diisi Guru Pembimbing)
              </h4>
              <span className="text-[11px] font-bold text-brand-600">
                Tingkat Kelayakan: {averageScore}% (Sangat Layak)
              </span>
            </div>

            <div className="space-y-2 border border-slate-200 rounded-2xl p-4 bg-slate-50/50 text-xs">
              {[
                { key: 'curriculum', label: 'Kesesuaian materi dengan Capaian Pembelajaran (CP) dan Kurikulum' },
                { key: 'visual3d', label: 'Kualitas estetika, kejelasan rendering objek 3D, dan daya tarik visual' },
                { key: 'audio', label: 'Kualitas kejelasan audio pelafalan fonetik penutur asli' },
                { key: 'interactivity', label: 'Kemudahan interaksi (Drag & Drop, Spelling, Quiz Feedback)' },
                { key: 'usability', label: 'Kelayakan media untuk pembelajaran mandiri siswa di rumah & kelas' },
              ].map(item => (
                <div key={item.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1 border-b border-slate-100 last:border-b-0">
                  <span className="text-slate-700 font-medium">{item.label}</span>
                  <div className="flex items-center gap-1 print:hidden">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => handleRatingChange(item.key, star)}
                        className={`w-6 h-6 rounded-md font-bold text-[11px] flex items-center justify-center transition-all ${
                          ratings[item.key] >= star
                            ? 'bg-amber-400 text-amber-950 font-black'
                            : 'bg-slate-200 text-slate-400 hover:bg-slate-300'
                        }`}
                      >
                        {star}
                      </button>
                    ))}
                  </div>
                  <span className="hidden print:inline font-bold text-slate-900">
                    Skor: {ratings[item.key]} / 5 (Sangat Baik)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: CATATAN GURU PEMBIMBING */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              3. Catatan Guru Pembimbing / Evaluator
            </h4>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <textarea
                value={teacherNotes}
                onChange={e => setTeacherNotes(e.target.value)}
                rows={3}
                className="w-full bg-transparent text-xs text-slate-700 leading-relaxed focus:outline-none resize-none font-sans print:border-none print:p-0"
                placeholder="Tuliskan catatan apresiasi atau evaluasi untuk siswa..."
              />
            </div>
          </div>

          {/* SECTION 4: TANDA TANGAN RESMI (SIGNATURE BLOCK) */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs text-center">
            <div>
              <p className="text-slate-500 mb-12">Siswa / Pengembang Media,</p>
              <p className="font-extrabold text-slate-900 uppercase underline tracking-wide">{user.name}</p>
              <p className="text-[11px] text-slate-400">NIS / ID Siswa: ENG-2026-081</p>
            </div>

            <div>
              <p className="text-slate-500 mb-12">Guru Pembimbing Bahasa Inggris,</p>
              <p className="font-extrabold text-slate-900 uppercase underline tracking-wide">
                Guru Pembimbing, S.Pd., M.Pd.
              </p>
              <p className="text-[11px] text-slate-400">NIP. 19850714 201001 1 008</p>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER ACTIONS (Hidden on print) */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between print:hidden">
          <p className="text-[11px] text-slate-400">
            💡 <em>Dokumen ini diformat siap cetak ke format PDF atau printer fisik.</em>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { sounds.playClick(); onClose(); }}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200 text-xs font-bold transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-soft active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Laporan</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
