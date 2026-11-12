import React, { useEffect, useRef } from 'react';
import { Landmark, Compass, Brain, Palette, BookOpen, Music, ArrowRight } from 'lucide-react';
import { SUBJECTS } from '../data/mockData';
import { Subject } from '../types';
import { AnimatedHeading } from './AnimatedText';
import { gsap } from '../utils/animations';

interface Props {
  onSelectSubject: (subjectId: string) => void;
  onViewAllSubjects: () => void;
}

export const FeaturedSubjects: React.FC<Props> = ({ onSelectSubject, onViewAllSubjects }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.subject-card');
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 35,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.08,
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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark':
        return <Landmark className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Brain':
        return <Brain className="w-5 h-5" />;
      case 'Palette':
        return <Palette className="w-5 h-5" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5" />;
      case 'Music':
        return <Music className="w-5 h-5" />;
      default:
        return <Landmark className="w-5 h-5" />;
    }
  };

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 block mb-1">
              Curated Knowledge Disciplines
            </span>
            <AnimatedHeading
              text="Featured Subjects"
              as="h2"
              className="text-3xl sm:text-4xl font-serif font-bold text-[#172554]"
            />
            <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-2xl">
              Immerse yourself in six foundational pillars of Indian thought, from empirical sciences and architectural monoliths to profound non-dual philosophy.
            </p>
          </div>
          <button
            onClick={onViewAllSubjects}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#172554] hover:text-amber-800 transition-colors shrink-0 group self-start md:self-end pb-1 border-b border-stone-300 hover:border-amber-800 cursor-pointer"
          >
            <span>View All Subjects</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SUBJECTS.map((subject) => (
            <div
              key={subject.id}
              className="subject-card group rounded-2xl border border-stone-200 bg-[#FDFCF9] hover:bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Card Image */}
              <div className="relative aspect-16/10 overflow-hidden bg-stone-900">
                <img
                  src={subject.image}
                  alt={subject.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Subject Icon Box */}
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/95 text-[#172554] flex items-center justify-center shadow-md backdrop-blur-xs">
                  {getIcon(subject.iconName)}
                </div>

                {/* Lesson Count Unboxed Label */}
                <div className="absolute bottom-3 right-3 text-xs font-medium text-white/90 drop-shadow">
                  {subject.lessonCount} Lessons · {subject.pathCount} Paths
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-700 block mb-1">
                    {subject.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#172554] transition-colors">
                    {subject.name}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {subject.description}
                  </p>

                  {/* Clean unboxed topic tags with bullet separators */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center gap-1.5 text-[11px] text-stone-500">
                    {subject.topics.slice(0, 3).map((topic, i) => (
                      <React.Fragment key={topic}>
                        <span className="hover:text-stone-800 transition-colors">{topic}</span>
                        {i < 2 && <span aria-hidden="true" className="text-stone-300">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Explore Action Button */}
                <div className="mt-6 pt-4 border-t border-stone-100">
                  <button
                    onClick={() => onSelectSubject(subject.id)}
                    className="w-full py-2.5 px-4 bg-stone-100 hover:bg-[#172554] hover:text-white text-slate-800 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group-hover:bg-[#172554] group-hover:text-white cursor-pointer"
                  >
                    <span>Explore {subject.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
