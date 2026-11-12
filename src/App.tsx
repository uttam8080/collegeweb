import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './utils/animations';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import SplashCursor from './components/SplashCursor';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { SubjectsPage } from './pages/SubjectsPage';
import { LearningPathsPage } from './pages/LearningPathsPage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { AboutPage } from './pages/AboutPage';
import { AcademicProgramsPage } from './pages/AcademicProgramsPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { ResearchLabsPage } from './pages/ResearchLabsPage';
import { NoticesPage } from './pages/NoticesPage';
import { CampusLifePage } from './pages/CampusLifePage';
import { PlacementsPage } from './pages/PlacementsPage';
import { ContactPage } from './pages/ContactPage';

export type NavigationTab = 
  | 'home' 
  | 'subjects' 
  | 'paths' 
  | 'programs' 
  | 'admissions'
  | 'research' 
  | 'notices' 
  | 'campus' 
  | 'placements' 
  | 'contact' 
  | 'about' 
  | 'lesson-detail';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string>('lesson-aryabhata-zero');

  // Search & Auth Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Lenis instance ref
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll and connect to GSAP ticker
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // User Authentication & LocalStorage Persistence
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    try {
      const saved = localStorage.getItem('bharatgyan_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bharatgyan_completed');
      return saved ? JSON.parse(saved) : ['lesson-mohenjo-daro']; // initial sample progress
    } catch {
      return ['lesson-mohenjo-daro'];
    }
  });

  const [bookmarkedLessonIds, setBookmarkedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bharatgyan_bookmarks');
      return saved ? JSON.parse(saved) : ['lesson-aryabhata-zero'];
    } catch {
      return ['lesson-aryabhata-zero'];
    }
  });

  const [enrolledPathIds, setEnrolledPathIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bharatgyan_enrolled');
      return saved ? JSON.parse(saved) : ['path-ancient-india', 'path-indian-math'];
    } catch {
      return ['path-ancient-india', 'path-indian-math'];
    }
  });

  // Save to localStorage whenever states change
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('bharatgyan_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('bharatgyan_user');
      }
    } catch {
      // ignore storage errors
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('bharatgyan_completed', JSON.stringify(completedLessonIds));
    } catch {
      // ignore
    }
  }, [completedLessonIds]);

  useEffect(() => {
    try {
      localStorage.setItem('bharatgyan_bookmarks', JSON.stringify(bookmarkedLessonIds));
    } catch {
      // ignore
    }
  }, [bookmarkedLessonIds]);

  useEffect(() => {
    try {
      localStorage.setItem('bharatgyan_enrolled', JSON.stringify(enrolledPathIds));
    } catch {
      // ignore
    }
  }, [enrolledPathIds]);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab as NavigationTab);
    scrollToTop();
  };

  const handleSelectSubject = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setCurrentTab('subjects');
    scrollToTop();
  };

  const handleSelectPath = (pathId: string) => {
    setSelectedPathId(pathId);
    setCurrentTab('paths');
    scrollToTop();
  };

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentTab('lesson-detail');
    scrollToTop();
  };

  const handleToggleComplete = (id: string) => {
    setCompletedLessonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarkedLessonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleEnroll = (pathId: string) => {
    setEnrolledPathIds((prev) =>
      prev.includes(pathId) ? prev.filter((p) => p !== pathId) : [...prev, pathId]
    );
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (newUser: { name: string; email: string }) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-slate-800 antialiased selection:bg-[#FF9933]/20 selection:text-[#172554]">
      {/* Interactive Fluid Splash Cursor Animation from React Bits */}
      <SplashCursor
        rainbow
        size={1}
        force={0.25}
        swirl={3}
        trail={1}
        clickSplash
        colorSpeed={3.65}
        intensity={0.5}
      />
      {/* Global Unified Navigation Header - Matching Home Section across ALL sections */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
        user={user}
        onLogout={handleLogout}
        completedLessonsCount={completedLessonIds.length}
      />

      {/* Main Page Routing */}
      <div className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onSelectSubject={handleSelectSubject}
            onSelectPath={handleSelectPath}
            onSelectLesson={handleSelectLesson}
            onNavigate={handleNavigate}
            completedLessonIds={completedLessonIds}
            bookmarkedLessonIds={bookmarkedLessonIds}
            enrolledPathIds={enrolledPathIds}
            onToggleBookmark={handleToggleBookmark}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {currentTab === 'subjects' && (
          <SubjectsPage
            selectedSubjectId={selectedSubjectId}
            onSelectSubject={handleSelectSubject}
            onSelectLesson={handleSelectLesson}
            onSelectPath={handleSelectPath}
          />
        )}

        {currentTab === 'paths' && (
          <LearningPathsPage
            selectedPathId={selectedPathId}
            onSelectLesson={handleSelectLesson}
            enrolledPathIds={enrolledPathIds}
            completedLessonIds={completedLessonIds}
            onToggleEnroll={handleToggleEnroll}
          />
        )}

        {currentTab === 'lesson-detail' && (
          <LessonDetailPage
            lessonId={activeLessonId}
            onBack={() => setCurrentTab('paths')}
            onSelectLesson={handleSelectLesson}
            completedLessonIds={completedLessonIds}
            bookmarkedLessonIds={bookmarkedLessonIds}
            onToggleComplete={handleToggleComplete}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentTab === 'admissions' && (
          <AdmissionsPage
            onNavigate={handleNavigate}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {currentTab === 'programs' && (
          <AcademicProgramsPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'research' && (
          <ResearchLabsPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'notices' && (
          <NoticesPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'campus' && (
          <CampusLifePage onNavigate={handleNavigate} />
        )}

        {currentTab === 'placements' && (
          <PlacementsPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'about' && <AboutPage />}
      </div>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} onSelectSubject={handleSelectSubject} />

      {/* Interactive Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLesson={handleSelectLesson}
        onSelectPath={handleSelectPath}
        onSelectSubject={handleSelectSubject}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
