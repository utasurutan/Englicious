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
import { ProgressDashboard } from './components/ProgressDashboard';
import { OnboardingModal } from './components/OnboardingModal';
import { sounds } from './utils/sound';
import { SpeechService } from './utils/speech';

export const App: React.FC = () => {
  // Current view state
  const [currentView, setCurrentView] = useState<string>('landing');
  const [practiceTab, setPracticeTab] = useState<'listening' | 'reading'>('listening');

  // Active full-screen interactive lesson
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Onboarding modal state
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-16 md:pb-0">
      {/* Top Desktop & Tablet Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        user={user}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
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
            onNavigate={setCurrentView}
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
            <div className="max-w-4xl mx-auto px-4 pt-6 flex items-center justify-center gap-3">
              <div className="flex items-center p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setPracticeTab('listening');
                  }}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    practiceTab === 'listening' ? 'bg-white text-brand-600 shadow-soft-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🎧 Listening & Dictation Lab
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setPracticeTab('reading');
                  }}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    practiceTab === 'reading' ? 'bg-white text-brand-600 shadow-soft-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  📖 Academic Reading Studio
                </button>
              </div>
            </div>
            {practiceTab === 'listening' ? <ListeningLab /> : <ReadingLab />}
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
          />
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        currentView={currentView}
        onNavigate={setCurrentView}
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
    </div>
  );
};

export default App;

