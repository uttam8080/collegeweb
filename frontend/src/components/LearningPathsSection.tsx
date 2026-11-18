import React, { useEffect, useRef } from 'react';
import { Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { LEARNING_PATHS } from '../data/mockData';
import { LearningPath } from '../types';
import { AnimatedHeading } from './AnimatedText';
import { gsap } from '../utils/animations';

interface Props {
  onSelectPath: (pathId: string) => void;
  onViewAllPaths: () => void;
  enrolledPathIds: string[];
  completedLessonIds: string[];
}
export const LearningPathsSection: React.FC<Props> = ({
  onSelectPath,
  onViewAllPaths,
  enrolledPathIds,
  completedLessonIds  
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.learning-path-card');
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
          stagger: 0.12,
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
    <section ref={sectionRef} className="py-16 sm:py-20 bg-[#FAF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 block mb-1">
              Curated Structured Curricula
            </span>
            <AnimatedHeading
              text="Guided Learning Paths"
              as="h2"
              className="text-3xl sm:text-4xl font-serif font-bold text-[#172554]"
            />
            <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-2xl">
              Follow chronological and thematic roadmaps crafted by historians and epistemologists, complete with quizzes and primary text analysis.
            </p>
          </div>
          <button
            onClick={onViewAllPaths}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#172554] hover:text-amber-800 transition-colors shrink-0 group self-start md:self-end pb-1 border-b border-stone-300 hover:border-amber-800 cursor-pointer"
          >
            <span>View All Learning Paths</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Learning Paths 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LEARNING_PATHS.map((path) => {
            const isEnrolled = enrolledPathIds.includes(path.id);
            // Calculate path progress
            const allLessonIds = path.modules.flatMap((m) => m.lessonIds);
            const completedCount = allLessonIds.filter((id) => completedLessonIds.includes(id)).length;
            const progressPercent = allLessonIds.length > 0 ? Math.round((completedCount / allLessonIds.length) * 100) : 0;

            return (
              <div
                key={path.id}
                className="learning-path-card group rounded-2xl border border-stone-200 bg-white p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top unboxed metadata */}
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                    <span className="font-semibold text-amber-800 uppercase tracking-wider text-[11px]">
                      {path.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{path.level}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        {path.duration}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 group-hover:text-[#172554] transition-colors leading-snug">
                    {path.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-amber-800 mt-1">
                    {path.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed line-clamp-3">
                    {path.description}
                  </p>

                  {/* Modules syllabus preview */}
                  <div className="mt-5 pt-4 border-t border-stone-100 space-y-2">
                    <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                      Curriculum Overview ({path.modules.length} Modules · {path.totalLessons} Lessons)
                    </span>
                    {path.modules.slice(0, 2).map((mod, i) => (
                      <div key={mod.id} className="flex items-start gap-2 text-xs text-stone-700">
                        <span className="text-amber-600 font-mono text-[11px] font-bold">0{i + 1}.</span>
                        <span className="line-clamp-1">{mod.title}</span>
                      </div>
                    ))}
                  </div>

                  {/* Progress bar if enrolled */}
                  {isEnrolled && (
                    <div className="mt-4 pt-3 border-t border-stone-100">
                      <div className="flex justify-between text-xs text-stone-600 mb-1.5 font-medium">
                        <span>Your Journey Progress</span>
                        <span className="text-emerald-700 font-bold">{progressPercent}%</span>
                      </div>
                      <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Card Action */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-500">
                    {path.totalLessons} Comprehensive Lessons
                  </span>
                  <button
                    onClick={() => onSelectPath(path.id)}
                    className="px-4 py-2 bg-[#172554] hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>{isEnrolled ? 'Continue Journey' : 'Explore Learning Path'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
