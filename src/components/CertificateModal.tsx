import React, { useRef } from 'react';
import { Award, Download, Printer, X, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { sounds } from '../utils/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  level: string;
  cefr: string;
}

export const CertificateModal: React.FC<Props> = ({
  isOpen,
  onClose,
  userName,
  level,
  cefr
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-soft-lg border border-slate-200 overflow-hidden animate-pop-in flex flex-col">
        {/* Top Control Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Verified Certificate of Competency
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Area */}
        <div className="p-6 sm:p-10 flex items-center justify-center bg-slate-100/50">
          <div
            ref={certificateRef}
            className="w-full bg-white p-8 sm:p-10 rounded-2xl border-4 border-double border-brand-200 shadow-soft-lg text-center relative overflow-hidden"
          >
            {/* Watermark Crest */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <span className="text-[200px] font-black text-brand-600">E</span>
            </div>

            {/* Corner Decorative Accents */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-brand-500" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-brand-500" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-brand-500" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-brand-500" />

            <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-brand-700 mb-1">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Englicious Academy of International English</span>
              <Sparkles className="w-4 h-4 text-brand-600" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
              CERTIFICATE OF PROFICIENCY
            </h2>

            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">
              This is to formally certify that
            </p>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-600 tracking-tight font-serif italic mb-4">
              {userName}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
              has successfully fulfilled all curriculum benchmarks, interactive listening assessments, and academic examinations in accordance with the Common European Framework of Reference for Languages (CEFR) at the level of:
            </p>

            {/* Level Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-brand-50 border border-brand-200 text-brand-800 font-black text-base sm:text-lg mb-8 shadow-soft-sm">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              <span>CEFR {cefr} — {level} Mastery</span>
            </div>

            {/* Signatures & Verification Row */}
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-100 text-left">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Date Issued</p>
                <p className="text-xs font-bold text-slate-800">{currentDate}</p>
                <p className="text-[10px] text-slate-400 mt-1">Verification ID: ENG-2026-{Math.floor(Math.random() * 899999 + 100000)}</p>
              </div>

              <div className="text-right">
                <div className="font-serif italic text-base font-bold text-slate-800 mb-0.5">
                  Dr. Eleanor Vance
                </div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Academic Director</p>
                <p className="text-[10px] text-brand-600 font-semibold">Standardized Testing Council</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
