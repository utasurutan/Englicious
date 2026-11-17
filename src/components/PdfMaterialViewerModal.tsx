import React, { useState } from 'react';
import { 
  Printer, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, 
  Volume2, VolumeX, Sparkles, CheckCircle2, BookOpen, Download, 
  Share2, Award, FileText, Check 
} from 'lucide-react';
import { PdfDocumentData } from '../data/pdfMaterials';
import { sounds } from '../utils/sound';
import { SpeechService } from '../utils/speech';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  document: PdfDocumentData | null;
  onMarkCompleted?: (xpEarned: number) => void;
}

export const PdfMaterialViewerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  document,
  onMarkCompleted
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasClaimedXp, setHasClaimedXp] = useState(false);

  if (!isOpen || !document) return null;

  const activePage = document.pages.find(p => p.pageNumber === currentPage) || document.pages[0];

  const handlePrevPage = () => {
    sounds.playClick();
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      stopAudio();
    }
  };

  const handleNextPage = () => {
    sounds.playClick();
    if (currentPage < document.totalPages) {
      setCurrentPage(prev => prev + 1);
      stopAudio();
    }
  };

  const handleZoomIn = () => {
    sounds.playClick();
    setZoomLevel(prev => Math.min(130, prev + 10));
  };

  const handleZoomOut = () => {
    sounds.playClick();
    setZoomLevel(prev => Math.max(80, prev - 10));
  };

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const stopAudio = () => {
    SpeechService.stop();
    setIsSpeaking(false);
  };

  const handleReadAloud = () => {
    sounds.playClick();
    if (isSpeaking) {
      stopAudio();
      return;
    }

    setIsSpeaking(true);
    // Combine text from sections to read aloud
    const fullTextToRead = `${activePage.title}. ${activePage.sections.map(s => `${s.heading}. ${s.text}`).join(' ')}`;
    SpeechService.speak(fullTextToRead, 0.95, 1.0, () => {
      setIsSpeaking(false);
    });
  };

  const handleClaim = () => {
    sounds.playCorrect();
    setHasClaimedXp(true);
    if (onMarkCompleted) {
      onMarkCompleted(50);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col justify-between print:static print:bg-white print:p-0 animate-fade-in select-none">
      
      {/* TOP PDF TOOLBAR (Hidden in Print) */}
      <div className="bg-slate-900 border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between text-white print:hidden z-20 flex-wrap gap-2">
        {/* Left: Document metadata */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white font-black text-xs shadow-glow-brand">
            PDF
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-xs sm:text-sm text-white line-clamp-1 max-w-xs sm:max-w-md">
                {document.title}
              </h3>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30">
                {document.cefr}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Dokumen Resmi MPI • Kode: {document.documentCode}
            </p>
          </div>
        </div>

        {/* Center: Page Navigation & Zoom */}
        <div className="flex items-center gap-3 bg-white/5 p-1 rounded-2xl border border-white/10">
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Halaman Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono font-bold text-white px-2">
            Hal {currentPage} / {document.totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= document.totalPages}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Halaman Selanjutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-white/10 mx-1" />

          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 text-xs font-bold"
            title="Perkecil Tampilan"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="text-[11px] font-mono font-semibold text-slate-300">
            {zoomLevel}%
          </span>

          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 text-xs font-bold"
            title="Perbesar Tampilan"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Audio Reader, Print & Close */}
        <div className="flex items-center gap-2">
          {/* Read Aloud Text-to-Speech button */}
          <button
            onClick={handleReadAloud}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              isSpeaking
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/40 shadow-glow-amber animate-pulse'
                : 'bg-white/10 hover:bg-white/15 text-slate-200 border-white/10'
            }`}
            title="Dengarkan pembacaan teks modul ini"
          >
            {isSpeaking ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span className="hidden sm:inline">Membaca...</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-brand-400" />
                <span className="hidden sm:inline">Audio Narator</span>
              </>
            )}
          </button>

          {/* Print / PDF Download */}
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-soft active:scale-95"
            title="Cetak atau Unduh Dokumen ke Format PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cetak PDF</span>
          </button>

          <button
            onClick={() => {
              stopAudio();
              onClose();
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* PDF DOCUMENT PAGE VIEWER CANVAS (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center bg-slate-900/60 print:p-0 print:bg-white">
        
        {/* SIMULATED A4 PAPER SHEET */}
        <div 
          className="bg-white text-slate-900 rounded-2xl shadow-soft-2xl border border-slate-300 p-8 sm:p-12 w-full max-w-3xl transition-transform duration-200 print:shadow-none print:border-none print:p-0 print:rounded-none relative min-h-[750px] flex flex-col justify-between"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          {/* Subtle Watermark on Paper */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
            <span className="text-8xl font-black rotate-[-30deg] tracking-widest text-slate-900">
              ENGLICIOUS MPI
            </span>
          </div>

          <div>
            {/* Paper Header / Letterhead */}
            <div className="border-b-2 border-slate-900 pb-4 mb-6 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-black text-brand-700 tracking-tight text-sm">ENGLICIOUS</span>
                <span className="font-bold text-slate-400">• Media Pembelajaran Interaktif</span>
              </div>
              <div className="text-right text-[11px] text-slate-500 font-mono">
                {document.documentCode} | Halaman {activePage.pageNumber} dari {document.totalPages}
              </div>
            </div>

            {/* Document Title Banner */}
            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                MODUL TEORI & LEMBAR MATERI {document.cefr}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
                {activePage.title}
              </h2>
              {activePage.subtitle && (
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  {activePage.subtitle}
                </p>
              )}
            </div>

            {/* Content Sections */}
            <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
              {activePage.sections.map((sec, secIdx) => (
                <div key={secIdx} className="space-y-2.5">
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2 border-l-4 border-brand-600 pl-2.5">
                    {sec.heading}
                  </h4>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line pl-3.5">
                    {sec.text}
                  </p>

                  {/* Formula Callout Box */}
                  {sec.formula && (
                    <div className="ml-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-brand-900">
                      <p className="font-bold text-[10px] uppercase text-brand-600 tracking-wider mb-1">
                        📐 Rumus / Formula Tata Bahasa:
                      </p>
                      <p className="whitespace-pre-line font-bold leading-normal">{sec.formula}</p>
                    </div>
                  )}

                  {/* Reference Table */}
                  {sec.table && (
                    <div className="ml-3.5 overflow-x-auto border border-slate-200 rounded-xl my-2">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                          <tr>
                            {sec.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="py-2 px-3">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {sec.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="py-1.5 px-3 font-medium text-slate-800">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Bullet Points */}
                  {sec.bulletPoints && (
                    <ul className="ml-3.5 space-y-1 list-disc list-inside text-slate-700">
                      {sec.bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx} className="leading-relaxed">
                          <span className="font-medium">{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Example Sentences */}
                  {sec.examples && (
                    <div className="ml-3.5 p-3 rounded-xl bg-brand-50/50 border border-brand-200/80 space-y-1.5">
                      <p className="text-[10px] font-black uppercase tracking-wider text-brand-700">
                        Contoh Kalimat Nyata:
                      </p>
                      {sec.examples.map((ex, exIdx) => (
                        <div key={exIdx} className="text-xs">
                          <p className="font-bold text-slate-900">🇬🇧 "{ex.en}"</p>
                          <p className="text-slate-500 text-[11px] italic">🇮🇩 "{ex.id}"</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Teacher Warning / Advice Tip */}
                  {sec.warningOrTip && (
                    <div className="ml-3.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                      <p className="font-bold flex items-center gap-1 mb-0.5">
                        💡 Catatan Khusus Guru:
                      </p>
                      <p className="leading-relaxed">{sec.warningOrTip}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Paper Footer with Official Signature Tag */}
          <div className="border-t border-slate-200 pt-4 mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <p>Englicious Learning Document • Hak Cipta Dilindungi</p>
            <p className="font-semibold text-slate-600">
              Author Pengembang: <span className="text-brand-600 font-bold">Sultan</span> (Kurikulum Merdeka CEFR)
            </p>
          </div>

        </div>
      </div>

      {/* BOTTOM ACTION BAR (Hidden in Print) */}
      <div className="bg-slate-900 border-t border-white/10 px-6 py-3 flex items-center justify-between text-xs text-white print:hidden z-20">
        <p className="text-slate-400 hidden sm:block">
          💡 Pelajari teori di atas dengan seksama sebelum melanjutkan ke latihan kuis berikutnya.
        </p>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed font-bold"
            >
              ← Halaman Sebelumnya
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= document.totalPages}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed font-bold"
            >
              Halaman Selanjutnya →
            </button>
          </div>

          <button
            onClick={handleClaim}
            disabled={hasClaimedXp}
            className={`px-5 py-2 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 active:scale-95 ${
              hasClaimedXp
                ? 'bg-mint-500 text-white cursor-default'
                : 'bg-brand-600 hover:bg-brand-500 text-white shadow-glow-brand'
            }`}
          >
            {hasClaimedXp ? (
              <>
                <Check className="w-4 h-4" />
                <span>Materi Sudah Dipelajari (+50 XP)</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Tandai Selesai & Klaim (+50 XP)</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};
