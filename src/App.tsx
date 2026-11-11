import React, { useState, useEffect } from 'react';
import { UserProfile, Lesson } from './types';
import { SAMPLE_LESSONS } from './data/lessons';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { LearningPath } from './components/LearningPath';
import { InteractiveLesson } from './components/InteractiveLesson';
import { ExamPrep } from './components/ExamPrep';
import { ListeningLab } from './components/ListeningLab';
import { ReadingLab } from './components/ReadingLab';
import { WritingLab } from './components/WritingLab';
import { SpeakingRoleplay } from './components/SpeakingRoleplay';
import { VocabSRSDeck } from './components/VocabSRSDeck';
import { SpeedChallenge } from './components/SpeedChallenge';
import { LeaderboardModal } from './components/LeaderboardModal';
import { CertificateModal } from './components/CertificateModal';
import { ProgressDashboard } from './components/ProgressDashboard';
import { OnboardingModal } from './components/OnboardingModal';
import { sounds } from './utils/sound';
import { SpeechService } from './utils/speech';

export const App: React.FC = () => {
  // Current view state
  const [currentView, setCurrentView] = useState<string>('landing');
  const [practiceTab, setPracticeTab] = useState<'listening' | 'reading' | 'writing' | 'roleplay' | 'srs' | 'exam-prep'>('listening');

  // Modals state
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isSpeedChallengeOpen, setIsSpeedChallengeOpen] = useState(false);

  // Sound cues state
  const [soundEnabled, setSoundEnabled] = useState(true);

  // User profile state
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('englicious_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      name: 'Sultan',
      avatar: '',
      level: 'Intermediate',
      cefr: 'B1',
      goal: 'TOEFL',
      skillsFocus: ['Listening', 'Reading', 'Grammar', 'Vocabulary'],
      xp: 1420,
      streak: 5,
      dailyGoalMinutes: 20,
      todayMinutes: 16,
      completedLessonsCount: 14,
      overallProgress: 64,
      accuracy: 94
    };
  });

  // Lessons state with progress tracking
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem('englicious_lessons_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return SAMPLE_LESSONS;
  });

  // Initialize Speech synthesis voices on mount
  useEffect(() => {
    SpeechService.init();
    setSoundEnabled(sounds.isEnabled());
  }, []);

  // Save user profile changes
  useEffect(() => {
    localStorage.setItem('englicious_user_profile', JSON.stringify(user));
  }, [user]);

  // Save lessons state changes
  useEffect(() => {
    localStorage.setItem('englicious_lessons_state', JSON.stringify(lessons));
  }, [lessons]);

  const handleToggleSound = () => {
    const next = sounds.toggleSound();
    setSoundEnabled(next);
  };

  const handleStartLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
  };

  const handleLessonCompleted = (xpEarned: number) => {
    if (!activeLesson) return;

    // Update lessons list
    setLessons(prev => prev.map(l => {
      if (l.id === activeLesson.id) {
        return {
          ...l,
          completed: true,
          progressPercent: 100
        };
      }
      return l;
    }));

    // Update user stats
    setUser(prev => ({
      ...prev,
      xp: prev.xp + xpEarned,
      completedLessonsCount: prev.completedLessonsCount + 1,
      todayMinutes: Math.min(prev.dailyGoalMinutes, prev.todayMinutes + activeLesson.estimatedMinutes),
      overallProgress: Math.min(100, prev.overallProgress + 2)
    }));

    setActiveLesson(null);
    setCurrentView('dashboard');
  };

  const handleSelectRecommendedLesson = (lessonId: string) => {
    const target = lessons.find(l => l.id === lessonId) || lessons[0];
    handleStartLesson(target);
  };

  const handleCompleteOnboarding = (updatedProfile: Partial<UserProfile>) => {
    setUser(prev => ({
      ...prev,
      ...updatedProfile
    }));
    setCurrentView('dashboard');
  };

  const handleNavigate = (view: string) => {
    if (view === 'practice-writing') {
      setCurrentView('practice');
      setPracticeTab('writing');
    } else if (view === 'practice-roleplay') {
      setCurrentView('practice');
      setPracticeTab('roleplay');
    } else if (view === 'practice-srs') {
      setCurrentView('practice');
      setPracticeTab('srs');
    } else if (view === 'exam-prep') {
      setCurrentView('practice');
      setPracticeTab('exam-prep');
    } else {
      setCurrentView(view);
    }
  };

  const handleRewardXp = (xpEarned: number) => {
    setUser(prev => ({
      ...prev,
      xp: prev.xp + xpEarned
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-16 md:pb-0">
      {/* Top Desktop & Tablet Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        user={user}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onOpenSpeedChallenge={() => setIsSpeedChallengeOpen(true)}
      />

      {/* Main Routed View Content */}
      <div className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onStartLearning={() => setIsOnboardingOpen(true)}
            onExploreCourses={() => setCurrentView('learn')}
            onOpenExamPrep={() => setCurrentView('exam-prep')}
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard
            user={user}
            lessons={lessons}
            onStartLesson={handleStartLesson}
            onNavigate={handleNavigate}
            onOpenSpeedChallenge={() => setIsSpeedChallengeOpen(true)}
          />
        )}

        {currentView === 'learn' && (
          <LearningPath
            lessons={lessons}
            onStartLesson={handleStartLesson}
          />
        )}

        {currentView === 'practice' && (
          <div>
            {/* Practice Studio Sub-Navigation Bar */}
            <div className="max-w-6xl mx-auto px-4 pt-6 pb-2 overflow-x-auto flex items-center justify-start sm:justify-center gap-2">
              <div className="flex items-center p-1.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold whitespace-nowrap">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setPracticeTab('listening');
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-xl transition-all ${
                    practiceTab === 'listening' ? 'bg-white text-brand-600 shadow-soft-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🎧 Listening Lab
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setPracticeTab('reading');
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-xl transition-all ${
                    practiceTab === 'reading' ? 'bg-white text-brand-600 shadow-soft-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  📖 Reading Studio
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setPracticeTab('writing');
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-xl transition-all ${
                    practiceTab === 'writing' ? 'bg-white text-brand-600 shadow-soft-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ✍️ Writing Lab
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setPracticeTab('roleplay');
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-xl transition-all ${
                    practiceTab === 'roleplay' ? 'bg-white text-brand-600 shadow-soft-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🗣️ AI Roleplay
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setPracticeTab('srs');
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-xl transition-all ${
                    practiceTab === 'srs' ? 'bg-white text-brand-600 shadow-soft-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🗂️ Vocab SRS Decks
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setPracticeTab('exam-prep');
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-xl transition-all ${
                    practiceTab === 'exam-prep' ? 'bg-white text-brand-600 shadow-soft-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🎓 Exam Prep (TOEFL / IELTS)
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setIsSpeedChallengeOpen(true);
                  }}
                  className="px-3 sm:px-4 py-2 rounded-xl transition-all text-amber-700 hover:bg-amber-100/50 flex items-center gap-1"
                >
                  ⚡ 60s Speed Drill
                </button>
              </div>
            </div>

            {/* Studio Views */}
            {practiceTab === 'listening' && <ListeningLab />}
            {practiceTab === 'reading' && <ReadingLab />}
            {practiceTab === 'writing' && <WritingLab />}
            {practiceTab === 'roleplay' && <SpeakingRoleplay />}
            {practiceTab === 'srs' && <VocabSRSDeck />}
            {practiceTab === 'exam-prep' && (
              <ExamPrep
                onBackToDashboard={() => setCurrentView('dashboard')}
                onSelectRecommendedLesson={handleSelectRecommendedLesson}
              />
            )}
          </div>
        )}

        {currentView === 'exam-prep' && (
          <ExamPrep
            onBackToDashboard={() => setCurrentView('dashboard')}
            onSelectRecommendedLesson={handleSelectRecommendedLesson}
          />
        )}

        {currentView === 'progress' && (
          <ProgressDashboard
            user={user}
            onSelectRecommendedLesson={handleSelectRecommendedLesson}
            onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          />
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Fullscreen Interactive Lesson Overlay */}
      {activeLesson && (
        <InteractiveLesson
          lesson={activeLesson}
          onExit={() => setActiveLesson(null)}
          onLessonCompleted={handleLessonCompleted}
        />
      )}

      {/* Onboarding Flow Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleCompleteOnboarding}
      />

      {/* Weekly League Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        currentUserXp={user.xp}
      />

      {/* Verified Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        userName={user.name}
        level={user.level}
        cefr={user.cefr}
      />

      {/* 60s Speed Drill Modal */}
      {isSpeedChallengeOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-soft-lg overflow-hidden animate-pop-in">
            <SpeedChallenge
              onClose={() => setIsSpeedChallengeOpen(false)}
              onRewardXp={handleRewardXp}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

