import React, { useState, useMemo, useEffect } from 'react';
import { 
  Check, Lock, Play, Sparkles, BookOpen, Clock, 
  Layers, Headphones, MessageCircle, FileText, Award, Trophy, 
  X, AlertTriangle, ShieldCheck, RotateCcw, Search 
} from 'lucide-react';
import { CURRICULA, PathNode } from '../data/curriculum';
import { Lesson, SkillCategory } from '../types';
import { LearningMaterialsView } from './LearningMaterialsView';
import { PdfMaterialViewerModal } from './PdfMaterialViewerModal';
import { PDF_MATERIALS, PdfDocumentData } from '../data/pdfMaterials';
import { sounds } from '../utils/sound';

interface Props {
  lessons: Lesson[];
  onStartLesson: (lesson: Lesson, nodeId?: string) => void;
  onRewardXp?: (xp: number) => void;
  completedNodeIds?: string[];
  onCompleteNode?: (nodeId: string) => void;
  onResetPath?: () => void;
}

export const LearningPath: React.FC<Props> = ({ 
  lessons, 
  onStartLesson, 
  onRewardXp,
  completedNodeIds,
  onCompleteNode,
  onResetPath
}) => {
  const [mainView, setMainView] = useState<'path' | 'materials'>('path');
  const [selectedLevel, setSelectedLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // PDF Document Viewer State
  const [selectedPdfDoc, setSelectedPdfDoc] = useState<PdfDocumentData | null>(null);
  const [activePdfNode, setActivePdfNode] = useState<PathNode | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Internal completed nodes tracking with localStorage backup
  const [internalCompletedNodes, setInternalCompletedNodes] = useState<string[]>(() => {
    const saved = localStorage.getItem('englicious_completed_nodes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return ['node-b1', 'node-b2', 'node-b3-pdf'];
  });

  const effectiveCompletedNodeIds = completedNodeIds || internalCompletedNodes;

  // Completed PDF IDs tracking
  const [completedPdfIds, setCompletedPdfIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('englicious_completed_pdfs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return ['pdf-beginner-grammar'];
  });

  // Locked alert notification toast
  const [lockedAlert, setLockedAlert] = useState<{
    show: boolean;
    title: string;
    requiredTitle: string;
  } | null>(null);

  // Auto-dismiss alert after 4.5 seconds
  useEffect(() => {
    if (lockedAlert?.show) {
      const timer = setTimeout(() => {
        setLockedAlert(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [lockedAlert]);

  const curriculum = CURRICULA[selectedLevel];
  const skillFilters = ['All', 'Vocabulary', 'Grammar', 'Listening', 'Reading', 'Speaking'];

  // Helper to determine if a single node is 100% completed
  const isNodeFinished = (node: PathNode): boolean => {
    // 1. Direct node ID completion record
    if (effectiveCompletedNodeIds.includes(node.id)) return true;

    // 2. PDF Document completion
    if (node.nodeType === 'pdf-document' && node.pdfMaterialId) {
      if (completedPdfIds.includes(node.pdfMaterialId)) return true;
    }

    // 3. Lesson completion check
    if (node.nodeType !== 'pdf-document') {
      const match = lessons.find(l => l.id === node.lessonId);
      if (match && match.completed && match.progressPercent >= 100) {
        // If node was completed or marked
        if (effectiveCompletedNodeIds.includes(node.id) || (node.level === 'Beginner' && (node.id === 'node-b1' || node.id === 'node-b2'))) {
          return true;
        }
      }
    }

    return false;
  };

  // Dynamically compute locked/current/completed status sequentially!
  // Rule: Node i can ONLY be unlocked if node i-1 is 100% completed.
  const computedNodes = useMemo(() => {
    const nodes = curriculum.nodes;
    let canUnlockNext = true; // Node 0 is always accessible

    return nodes.map((node, index) => {
      const isDone = isNodeFinished(node);
      const prevNode = index > 0 ? nodes[index - 1] : null;

      let effectiveStatus: 'completed' | 'current' | 'locked';
      let requiredPreviousTitle = '';

      if (index === 0) {
        effectiveStatus = isDone ? 'completed' : 'current';
      } else {
        if (!canUnlockNext) {
          // Previous node was NOT completed: this node MUST be locked!
          effectiveStatus = 'locked';
          requiredPreviousTitle = prevNode ? prevNode.title : 'Tahap sebelumnya';
        } else {
          // Previous node WAS completed: this node is open!
          effectiveStatus = isDone ? 'completed' : 'current';
        }
      }

      // If this node is not done, then all future nodes cannot be unlocked!
      if (!isDone) {
        canUnlockNext = false;
      }

      // Compute progress percentage
      let effectiveProgress = 0;
      if (effectiveStatus === 'completed') {
        effectiveProgress = 100;
      } else if (effectiveStatus === 'current') {
        const matchLesson = lessons.find(l => l.id === node.lessonId);
        effectiveProgress = matchLesson ? matchLesson.progressPercent : (node.progress || 0);
      } else {
        effectiveProgress = 0; // locked nodes show 0%
      }

      return {
        ...node,
        status: effectiveStatus,
        progress: effectiveProgress,
        requiredPreviousTitle
      };
    });
  }, [curriculum.nodes, effectiveCompletedNodeIds, completedPdfIds, lessons]);

  const filteredNodes = computedNodes.filter(node => {
    const matchesSkill = selectedSkill === 'All' ? true : node.category === selectedSkill;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = query === '' ? true : (
      node.title.toLowerCase().includes(query) ||
      node.description.toLowerCase().includes(query) ||
      node.category.toLowerCase().includes(query)
    );
    return matchesSkill && matchesSearch;
  });

  const completedCount = computedNodes.filter(n => n.status === 'completed').length;
  const isAllLevelCompleted = computedNodes.length > 0 && completedCount === computedNodes.length;

  const handleNodeClick = (node: typeof computedNodes[0]) => {
    if (node.status === 'locked') {
      sounds.playIncorrect();
      setLockedAlert({
        show: true,
        title: node.title,
        requiredTitle: node.requiredPreviousTitle || 'tahap sebelumnya'
      });
      return;
    }

    sounds.playClick();

    if (node.nodeType === 'pdf-document' && node.pdfMaterialId) {
      const doc = PDF_MATERIALS[node.pdfMaterialId];
      if (doc) {
        setActivePdfNode(node);
        setSelectedPdfDoc(doc);
        setIsPdfModalOpen(true);
        return;
      }
    }

    const targetLesson = lessons.find(l => l.id === node.lessonId) || lessons[0];
    onStartLesson(targetLesson, node.id);
  };

  const handlePdfCompleted = (xpEarned: number) => {
    if (activePdfNode) {
      const nodeId = activePdfNode.id;
      const pdfId = activePdfNode.pdfMaterialId;

      const nextNodes = effectiveCompletedNodeIds.includes(nodeId)
        ? effectiveCompletedNodeIds
        : [...effectiveCompletedNodeIds, nodeId];

      setInternalCompletedNodes(nextNodes);
      localStorage.setItem('englicious_completed_nodes', JSON.stringify(nextNodes));

      if (onCompleteNode) {
        onCompleteNode(nodeId);
      }

      if (pdfId && !completedPdfIds.includes(pdfId)) {
        const nextPdfs = [...completedPdfIds, pdfId];
        setCompletedPdfIds(nextPdfs);
        localStorage.setItem('englicious_completed_pdfs', JSON.stringify(nextPdfs));
      }
    }

    if (onRewardXp) {
      onRewardXp(xpEarned);
    }
  };

  return (
    <div className="py-6 sm:py-8 relative">
      {/* FLOATING TOAST NOTIFICATION WHEN USER CLICKS A LOCKED STAGE */}
      {lockedAlert && lockedAlert.show && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] animate-fade-in shadow-2xl">
          <div className="bg-slate-900 text-white p-4 rounded-2xl border border-amber-400/50 flex items-start gap-3 shadow-glow-brand">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Lock className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-amber-300 font-extrabold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Tahap Belajar Masih Terkunci</span>
              </div>
              <h4 className="font-black text-sm text-white mt-0.5">
                {lockedAlert.title}
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Anda belum dapat membuka tahap ini. Selesaikan 100% materi pada <strong className="text-amber-200 underline underline-offset-2">"{lockedAlert.requiredTitle}"</strong> terlebih dahulu!
              </p>
            </div>
            <button
              onClick={() => setLockedAlert(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors flex-shrink-0"
              title="Tutup pesan"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Top Main Mode Switcher: Visual Path vs Materi Pembelajaran */}
      <div className="flex items-center justify-center mb-8 px-4">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/70 border border-slate-300/60 shadow-soft-sm">
          <button
            onClick={() => { sounds.playClick(); setMainView('path'); }}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
              mainView === 'path'
                ? 'bg-white text-brand-600 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Alur Belajar Berurutan</span>
          </button>

          <button
            onClick={() => { sounds.playClick(); setMainView('materials'); }}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
              mainView === 'materials'
                ? 'bg-white text-brand-600 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>Materi Pembelajaran & Teori</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-100 text-brand-700 font-black hidden sm:inline">
              Lengkap
            </span>
          </button>
        </div>
      </div>

      {mainView === 'materials' ? (
        <LearningMaterialsView
          onStartLessonById={(lessonId) => {
            const found = lessons.find(l => l.id === lessonId) || lessons[0];
            onStartLesson(found);
          }}
        />
      ) : (
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Top Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
              <span>Sequential Mastery Path (CEFR {curriculum.cefr})</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2 mb-2">
              {curriculum.title}
            </h1>
            <p className="text-sm text-slate-500 max-w-lg mx-auto">
              {curriculum.description}
            </p>
            
            {/* Sequential learning badge note */}
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-50/80 border border-amber-200/60 text-amber-800 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>Tahapan berikutnya terkunci hingga Anda menuntaskan tahapan sebelumnya secara berurutan.</span>
            </div>
          </div>

          {/* Level Tabs: Beginner, Intermediate, Advanced */}
          <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-200/60 rounded-2xl max-w-md mx-auto mb-8 border border-slate-300/40">
            {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => {
              const isSelected = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedLevel(lvl);
                  }}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isSelected
                      ? 'bg-white text-brand-600 shadow-soft-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{lvl}</span>
                  <span className="text-[10px] block font-normal opacity-80">
                    {lvl === 'Beginner' ? 'A1-A2' : lvl === 'Intermediate' ? 'B1-B2' : 'C1-C2'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari materi, tata bahasa, atau topik..."
                className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-400/20 shadow-soft-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 absolute right-2.5 top-1/2 -translate-y-1/2 transition-colors"
                  title="Hapus pencarian"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Skill Filters */}
          <div className="flex items-center justify-center flex-wrap gap-1.5 mb-10">
            {skillFilters.map((skill) => {
              const isActive = selectedSkill === skill;
              return (
                <button
                  key={skill}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedSkill(skill);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-soft-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>

          {/* VISUAL LEARNING PATH (Node Line Stepper) */}
          {filteredNodes.length === 0 ? (
            <div className="py-12 px-6 text-center bg-white rounded-3xl border border-slate-200 max-w-md mx-auto shadow-soft-sm mb-12 animate-fade-in">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">Tidak ada materi yang cocok</p>
              <p className="text-xs text-slate-400 mt-1 mb-4">Coba cari dengan kata kunci lain atau ubah filter keterampilan.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSkill('All');
                }}
                className="px-4 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-600 font-bold text-xs transition-colors"
              >
                Reset Pencarian & Filter
              </button>
            </div>
          ) : (
            <div className="relative max-w-xl mx-auto py-4">
            {/* Central connecting stem line */}
            <div className="absolute left-6 sm:left-8 top-10 bottom-10 w-1 bg-slate-200 -z-0 rounded-full" />

            <div className="space-y-8 relative z-10">
              {filteredNodes.map((node) => {
                const isCompleted = node.status === 'completed';
                const isCurrent = node.status === 'current';
                const isLocked = node.status === 'locked';

                return (
                  <div
                    key={node.id}
                    onClick={() => handleNodeClick(node)}
                    className={`flex items-start gap-4 sm:gap-6 group transition-all select-none ${
                      isLocked ? 'cursor-not-allowed opacity-65' : 'cursor-pointer'
                    }`}
                  >
                    {/* Node Orb Marker */}
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform ${
                      isCompleted
                        ? 'bg-mint-500 text-white shadow-glow-success'
                        : isCurrent
                        ? 'bg-brand-600 text-white shadow-glow-brand ring-4 ring-brand-100 group-hover:scale-105 animate-pulse-glow'
                        : 'bg-slate-100 border-2 border-slate-300 text-slate-400 group-hover:border-slate-400'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-6 h-6 stroke-[3]" />
                      ) : isCurrent ? (
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      ) : (
                        <Lock className="w-5 h-5 text-slate-400 group-hover:text-slate-500" />
                      )}
                    </div>

                    {/* Node Content Card */}
                    <div className={`flex-1 p-5 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-white border-brand-400 shadow-soft-lg ring-1 ring-brand-100'
                        : isCompleted
                        ? 'bg-mint-50/40 border-mint-200 shadow-soft-sm'
                        : 'bg-slate-50/70 border-slate-200/90 shadow-soft-sm hover:bg-slate-50'
                    }`}>
                      <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            node.nodeType === 'pdf-document'
                              ? 'bg-purple-100 text-purple-800 border border-purple-200'
                              : isCompleted 
                              ? 'bg-mint-100 text-mint-800' 
                              : isCurrent 
                              ? 'bg-brand-100 text-brand-800' 
                              : 'bg-slate-200/80 text-slate-600'
                          }`}>
                            {node.nodeType === 'pdf-document' ? '📑 E-Book PDF' : node.category}
                          </span>

                          {node.questionsCount && (
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border ${
                              isLocked 
                                ? 'bg-slate-100 text-slate-400 border-slate-200'
                                : 'bg-amber-50 text-amber-800 border-amber-200/80'
                            }`}>
                              🎯 {node.questionsCount} Latihan Soal
                            </span>
                          )}

                          {isLocked && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200/90 text-slate-600 flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5 text-slate-500" /> Terkunci
                            </span>
                          )}
                        </div>

                        <span className="text-xs font-bold text-slate-400">
                          +{node.xpReward} XP
                        </span>
                      </div>

                      <h3 className={`text-lg font-bold transition-colors ${
                        isLocked 
                          ? 'text-slate-600' 
                          : 'text-slate-900 group-hover:text-brand-600'
                      }`}>
                        {node.title}
                      </h3>
                      <p className={`text-xs sm:text-sm mt-1 ${isLocked ? 'text-slate-400' : 'text-slate-500'}`}>
                        {node.description}
                      </p>

                      {/* Progress bar if ongoing or completed */}
                      {!isLocked && node.progress > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-500">
                            {isCompleted ? '100% Selesai' : `${node.progress}% Terkuasai`}
                          </span>
                          <div className="w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${isCompleted ? 'bg-mint-500' : 'bg-brand-600'}`}
                              style={{ width: `${node.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Locked State Requirement Hint */}
                      {isLocked && (
                        <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs flex-wrap gap-2">
                          <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50/90 px-2.5 py-1 rounded-lg border border-amber-200/70 font-semibold">
                            <Lock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                            <span>
                              Prasyarat: Selesaikan <strong>"{node.requiredPreviousTitle}"</strong>
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-medium">
                            Klik untuk info kunci
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* End of Path Milestone Checkpoint Card */}
              <div className="flex items-start gap-4 sm:gap-6">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-soft transition-all ${
                  isAllLevelCompleted
                    ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-glow-amber animate-bounce-subtle'
                    : 'bg-slate-100 border-2 border-slate-300 text-slate-400'
                }`}>
                  {isAllLevelCompleted ? <Trophy className="w-6 h-6" /> : <Lock className="w-5 h-5 text-slate-400" />}
                </div>
                
                <div className={`flex-1 p-5 rounded-2xl border shadow-soft ${
                  isAllLevelCompleted
                    ? 'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/50 border-amber-300'
                    : 'bg-slate-50/70 border-slate-200 opacity-80'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isAllLevelCompleted
                        ? 'bg-amber-200/80 text-amber-900'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      Milestone Exam
                    </span>
                    <span className="text-xs font-bold text-amber-900/60">
                      {completedCount}/{computedNodes.length} Selesai
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                    {curriculum.milestoneTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isAllLevelCompleted
                      ? `Selamat! Seluruh tahapan materi pada level ${selectedLevel} telah tuntas. Ujian sertifikasi siap dimulai!`
                      : `Selesaikan seluruh ${computedNodes.length} tahapan materi di atas secara berurutan untuk membuka ujian kelulusan ini.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      )}

      {/* Interactive PDF Document Viewer Modal */}
      <PdfMaterialViewerModal
        isOpen={isPdfModalOpen}
        onClose={() => {
          setIsPdfModalOpen(false);
          setActivePdfNode(null);
        }}
        document={selectedPdfDoc}
        onMarkCompleted={handlePdfCompleted}
      />
    </div>
  );
};
