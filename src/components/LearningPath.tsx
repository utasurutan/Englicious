import React, { useState } from 'react';
import { 
  Check, Lock, Play, Sparkles, BookOpen, Clock, 
  Layers, Headphones, MessageCircle, FileText, Award, Trophy, ChevronDown 
} from 'lucide-react';
import { CURRICULA, PathNode } from '../data/curriculum';
import { Lesson, SkillCategory } from '../types';
import { sounds } from '../utils/sound';

interface Props {
  lessons: Lesson[];
  onStartLesson: (lesson: Lesson) => void;
}

export const LearningPath: React.FC<Props> = ({ lessons, onStartLesson }) => {
  const [selectedLevel, setSelectedLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');

  const curriculum = CURRICULA[selectedLevel];

  const skillFilters = ['All', 'Vocabulary', 'Grammar', 'Listening', 'Reading', 'Speaking'];

  const filteredNodes = curriculum.nodes.filter(node => 
    selectedSkill === 'All' ? true : node.category === selectedSkill
  );

  const handleNodeClick = (node: PathNode) => {
    if (node.status === 'locked') {
      sounds.playIncorrect();
      return;
    }
    sounds.playClick();
    const targetLesson = lessons.find(l => l.id === node.lessonId) || lessons[0];
    onStartLesson(targetLesson);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Top Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Visual Curriculum Path
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2 mb-2">
          {curriculum.title}
        </h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          {curriculum.description}
        </p>
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

      {/* Skill Filters */}
      <div className="flex items-center justify-center flex-wrap gap-1.5 mb-12">
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
      <div className="relative max-w-xl mx-auto py-4">
        {/* Central connecting stem line */}
        <div className="absolute left-6 sm:left-8 top-10 bottom-10 w-1 bg-slate-200 -z-0 rounded-full" />

        <div className="space-y-8 relative z-10">
          {filteredNodes.map((node, index) => {
            const isCompleted = node.status === 'completed';
            const isCurrent = node.status === 'current';
            const isLocked = node.status === 'locked';

            return (
              <div
                key={node.id}
                onClick={() => handleNodeClick(node)}
                className={`flex items-start gap-4 sm:gap-6 group transition-all select-none ${
                  isLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                }`}
              >
                {/* Node Orb Marker */}
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform ${
                  isCompleted
                    ? 'bg-mint-500 text-white shadow-glow-success'
                    : isCurrent
                    ? 'bg-brand-600 text-white shadow-glow-brand ring-4 ring-brand-100 group-hover:scale-105 animate-pulse-glow'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}>
                  {isCompleted ? (
                    <Check className="w-6 h-6 stroke-[3]" />
                  ) : isCurrent ? (
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  ) : (
                    <Lock className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                {/* Node Content Card */}
                <div className={`flex-1 p-5 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-white border-brand-400 shadow-soft-lg ring-1 ring-brand-100'
                    : isCompleted
                    ? 'bg-mint-50/40 border-mint-200 shadow-soft-sm'
                    : 'bg-white/80 border-slate-200 shadow-soft-sm'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isCompleted ? 'bg-mint-100 text-mint-800' : isCurrent ? 'bg-brand-100 text-brand-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {node.category}
                    </span>

                    <span className="text-xs font-bold text-slate-400">
                      +{node.xpReward} XP
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {node.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {node.description}
                  </p>

                  {/* Progress bar if ongoing or completed */}
                  {node.progress > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400">
                        {isCompleted ? 'Completed' : `${node.progress}% Mastered`}
                      </span>
                      <div className="w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${isCompleted ? 'bg-mint-500' : 'bg-brand-600'}`}
                          style={{ width: `${node.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* End of Path Milestone Checkpoint Card */}
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-600 flex items-center justify-center flex-shrink-0 shadow-soft">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="flex-1 p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 shadow-soft">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-200/80 text-amber-900">
                Milestone Exam
              </span>
              <h3 className="text-base sm:text-lg font-black text-amber-950 mt-1">
                {curriculum.milestoneTitle}
              </h3>
              <p className="text-xs text-amber-800/80 mt-0.5">
                Comprehensive certification test covering all lessons in {selectedLevel}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

