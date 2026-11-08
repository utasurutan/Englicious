import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, Award, Compass, HelpCircle, X, ChevronRight } from 'lucide-react';
import { UserLevel, LearningGoal, SkillCategory, CEFRLevel, UserProfile } from '../types';
import { sounds } from '../utils/sound';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (updatedProfile: Partial<UserProfile>) => void;
}

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
    else if (step === 3) setStep(4); // Placement test offer
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
      setStep(5); // Result screen
    }
  };

  const handleSkipPlacement = () => {
    sounds.playClick();
    finishOnboarding('B1', selectedLevel);
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
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-soft-lg border border-slate-200 overflow-hidden animate-pop-in">
        {/* Header with step progress indicator */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-brand-50 text-brand-700 font-bold text-xs flex items-center justify-center">
              {step}/5
            </span>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Personalization</p>
              <p className="text-sm font-bold text-slate-800">
                {step === 1 && 'Your English Level'}
                {step === 2 && 'Your Learning Goal'}
                {step === 3 && 'Skills to Improve'}
                {step === 4 && 'Quick Placement Test'}
                {step === 5 && 'Assessment Result'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Body */}
        <div className="p-6 sm:p-8">
          {/* STEP 1: Level */}
          {step === 1 && (
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                What is your English level?
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                This helps us calibrate vocabulary and grammatical complexity to your comfort level.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {levels.map((lvl) => {
                  const isSelected = selectedLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => {
                        sounds.playClick();
                        setSelectedLevel(lvl);
                      }}
                      className={`p-4 rounded-2xl font-bold text-sm text-left border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-brand-50 border-brand-500 text-brand-700 ring-2 ring-brand-400/20'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-soft-sm'
                      }`}
                    >
                      <span>{lvl}</span>
                      {isSelected && <Check className="w-4 h-4 text-brand-600" />}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNextStep}
                className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-soft transition-all flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Goal */}
          {step === 2 && (
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                What is your primary goal?
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                We'll prioritize relevant vocabulary, mock exams, and practical drills for your mission.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {goals.map((goal) => {
                  const isSelected = selectedGoal === goal;
                  return (
                    <button
                      key={goal}
                      onClick={() => {
                        sounds.playClick();
                        setSelectedGoal(goal);
                      }}
                      className={`p-3.5 rounded-2xl font-bold text-sm text-center border transition-all ${
                        isSelected
                          ? 'bg-brand-50 border-brand-500 text-brand-700 ring-2 ring-brand-400/20'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-soft-sm'
                      }`}
                    >
                      {goal}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNextStep}
                className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-soft transition-all flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 3: Skills to Improve */}
          {step === 3 && (
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                What would you like to improve?
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                Select all that apply. You can always change your focus later.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {skillsList.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`p-3.5 rounded-2xl font-bold text-sm text-left border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-brand-50 border-brand-500 text-brand-700 ring-2 ring-brand-400/20'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-soft-sm'
                      }`}
                    >
                      <span>{skill}</span>
                      {isSelected && <Check className="w-4 h-4 text-brand-600" />}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNextStep}
                disabled={selectedSkills.length === 0}
                className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-soft transition-all flex items-center justify-center gap-2 disabled:bg-slate-200"
              >
                <span>Continue to Placement</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 4: Optional Placement Test */}
          {step === 4 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                  Question {currentQuizIdx + 1} of {placementQuestions.length}
                </span>
                <button
                  onClick={handleSkipPlacement}
                  className="text-xs font-medium text-slate-400 hover:text-slate-600"
                >
                  Skip test & use self-rating →
                </button>
              </div>

              <h4 className="text-lg font-bold text-slate-800 mb-4">
                {placementQuestions[currentQuizIdx].question}
              </h4>

              <div className="space-y-2.5 mb-6">
                {placementQuestions[currentQuizIdx].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuizAnswer(i)}
                    className="w-full p-3.5 rounded-xl text-left text-sm font-semibold border border-slate-200 bg-white hover:bg-brand-50 hover:border-brand-400 transition-all flex items-center gap-3 text-slate-700 shadow-soft-sm active:scale-98"
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-xs font-bold flex items-center justify-center text-slate-500">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Placement Result */}
          {step === 5 && (
            <div className="text-center py-2">
              <div className="w-16 h-16 rounded-2xl bg-mint-50 border border-mint-200 text-mint-600 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-mint-700 bg-mint-50 px-3 py-1 rounded-full">
                Placement Complete
              </span>

              <h3 className="text-3xl font-black text-slate-900 mt-2 mb-1">
                Your estimated level is B1 — Intermediate
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                Based on your answers, we have custom-tailored your roadmap with targeted grammar, listening, and exam prep modules.
              </p>

              {/* Recommended Learning Path Preview */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left mb-6">
                <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
                  Recommended Learning Path
                </p>
                <div className="space-y-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-mint-500" />
                    <span>Past Tense Mastery (Grammar Foundations)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-500" />
                    <span>Connected Speech & Reductions (Listening Essentials)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Academic Reading & Inference Drills</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>{selectedGoal} Mock Exam Diagnostic</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => finishOnboarding('B1', 'Intermediate')}
                className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-glow-brand transition-all flex items-center justify-center gap-2"
              >
                <span>Launch My Learning Path</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

