import React, { useRef } from 'react';
import { usePageTextAnimations } from '../utils/animations';
import { Hero } from '../components/Hero';
import { StatsBanner } from '../components/StatsBanner';
import { ImportantAnnouncements } from '../components/ImportantAnnouncements';
import { SuccessStoriesSection } from '../components/SuccessStoriesSection';
import { AcademicUnitsSection } from '../components/AcademicUnitsSection';
import { VisionMissionSection } from '../components/VisionMissionSection';
import { StudentMilestonesSection } from '../components/StudentMilestonesSection';
import { UniversityLeadershipSection } from '../components/UniversityLeadershipSection';
import { FeaturedSubjects } from '../components/FeaturedSubjects';
import { FeaturedLessons } from '../components/FeaturedLessons';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { NewsletterSection } from '../components/NewsletterSection';
import { NoticeAndEventsSection } from '../components/NoticeAndEventsSection';

interface Props {
  onSelectSubject: (subjectId: string) => void;
  onSelectPath: (pathId: string) => void;
  onSelectLesson: (lessonId: string) => void;
  onNavigate: (tab: string) => void;
  completedLessonIds: string[];
  bookmarkedLessonIds: string[];
  enrolledPathIds: string[];
  onToggleBookmark: (lessonId: string) => void;
  onOpenSearch?: () => void;
  onOpenAuth?: (mode?: 'login' | 'signup') => void;
}

export const HomePage: React.FC<Props> = ({
  onSelectSubject,
  onSelectPath,
  onSelectLesson,
  onNavigate,
  completedLessonIds,
  bookmarkedLessonIds,
  enrolledPathIds,
  onToggleBookmark,
  onOpenSearch,
  onOpenAuth
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  usePageTextAnimations(pageRef);

  return (
    <div ref={pageRef} className="min-h-screen">
      {/* 1. Full Viewport Hero Banner with 2-Second Swap */}
      <Hero
        onStartLearning={() => {
          onNavigate('programs');
        }}
        onExploreCourses={() => onNavigate('programs')}
        onNavigate={onNavigate}
        onOpenSearch={onOpenSearch}
        onOpenAuth={onOpenAuth}
      />

      {/* Placement Statistics Banner (Matching requested placement metrics with dynamic animations) */}
      <StatsBanner onNavigate={onNavigate} />

      {/* Important Announcements Section (Matching IIT Delhi card layout with authentic distinct content) */}
      <div id="announcements">
        <ImportantAnnouncements onNavigate={onNavigate} />
      </div>

      {/* Success Stories Section: Where Our Students Work (Modern distinct design with interactive cards) */}
      <div id="success-stories">
        <SuccessStoriesSection onNavigate={onNavigate} />
      </div>

      {/* Academic Units Section (Matching IIT Delhi 4-card grid: Departments, Centres, Schools, CoE) */}
      <div id="academic-units">
        <AcademicUnitsSection onNavigate={onNavigate} />
      </div>

      {/* Built on a Foundation of Excellence: Our Vision & Our Mission (Split Dark Navy / Warm Canvas Layout) */}
      <div id="vision-mission">
        <VisionMissionSection onNavigate={onNavigate} />
      </div>

      {/* 4-Year Academic Journey & Student Milestones Roadmap (Pastel Circular Geometry & Connected Path) */}
      <div id="academic-journey">
        <StudentMilestonesSection onNavigate={onNavigate} />
      </div>

      {/* University Leadership: Chancellor & Vice Chancellor */}
      <div id="university-leadership">
        <UniversityLeadershipSection onNavigate={onNavigate} />
      </div>

      {/* 5. Official Gazette Notice Board & Upcoming Drives */}
      <div id="notices-events">
        <NoticeAndEventsSection onNavigate={onNavigate} />
      </div>

      {/* 8. Specialized Engineering Disciplines */}
      <FeaturedSubjects
        onSelectSubject={onSelectSubject}
        onViewAllSubjects={() => onNavigate('programs')}
      />

      {/* 10. Institutional Newsletter & Advisory Admissions Connect */}
      <NewsletterSection />
    </div>
  );
};
