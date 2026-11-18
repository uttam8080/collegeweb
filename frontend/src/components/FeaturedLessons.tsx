import React, { useEffect, useRef } from 'react';
import { Clock, CheckCircle, Bookmark, ArrowRight } from 'lucide-react';
import { LESSONS } from '../data/mockData';
import { Lesson } from '../types';
import { AnimatedHeading } from './AnimatedText';
import { gsap } from '../utils/animations';

interface Props {
  onSelectLesson: (lessonId: string) => void;
  completedLessonIds: string[];
  bookmarkedLessonIds: string[];
  onToggleBookmark: (lessonId: string) => void;
}

export const FeaturedLessons: React.FC<Props> = ({
  onSelectLesson,
  completedLessonIds,
  bookmarkedLessonIds,
  onToggleBookmark
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.lesson-card');
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 block mb-1">
              Curated Masterclasses
            </span>
            <AnimatedHeading
              text="Featured Lessons"
              as="h2"
              className="text-3xl sm:text-4xl font-serif font-bold text-[#172554]"
            />
            <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-2xl">
              Engage with primary texts, interactive engineering models, and self-evaluations designed for self-paced mastery.
            </p>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LESSONS.map((lesson) => {
            const isCompleted = completedLessonIds.includes(lesson.id);
            const isBookmarked = bookmarkedLessonIds.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                className="lesson-card group rounded-2xl border border-stone-200 bg-[#FAF9F5] hover:bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-16/10 overflow-hidden bg-stone-900">
                    <img
                      src={lesson.coverImage}
                      alt={lesson.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />

                    {/* Bookmark action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(lesson.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-xs transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'bg-amber-500 text-white shadow-md'
                          : 'bg-white/90 text-stone-700 hover:text-amber-800'
                      }`}
                      title={isBookmarked ? 'Bookmarked' : 'Bookmark lesson'}
                    >
                      <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>

                    {/* Completion Tag */}
                    {isCompleted && (
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-600/95 text-white rounded-md text-[11px] font-semibold backdrop-blur-xs shadow-xs">
                        <CheckCircle className="w-3 h-3" />
                        <span>Completed</span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    {/* Unboxed metadata */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                      <span className="font-medium text-amber-800">{lesson.difficulty}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        {lesson.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-serif text-slate-900 group-hover:text-[#172554] transition-colors line-clamp-2 leading-snug">
                      {lesson.title}
                    </h3>

                    <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                      {lesson.summary}
                    </p>

                    {/* Key takeaways count */}
                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                      <span>{lesson.sections.length} Reading Modules</span>
                      <span>{lesson.quiz.length} Quiz Questions</span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => onSelectLesson(lesson.id)}
                    className="w-full py-2.5 px-4 bg-[#172554] hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>{isCompleted ? 'Review Lesson' : 'Start Learning'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
