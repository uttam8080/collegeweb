import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Map, Landmark, ArrowRight } from 'lucide-react';
import { SUBJECTS, LEARNING_PATHS, LESSONS } from '../data/mockData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
  onSelectPath: (pathId: string) => void;
  onSelectSubject: (subjectId: string) => void;
}

export const SearchModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectLesson,
  onSelectPath,
  onSelectSubject
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or toggle
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredLessons = q
    ? LESSONS.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.summary.toLowerCase().includes(q) ||
          l.keyInsights.some((k) => k.toLowerCase().includes(q))
      )
    : LESSONS.slice(0, 3);

  const filteredPaths = q
    ? LEARNING_PATHS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    : LEARNING_PATHS.slice(0, 2);

  const filteredSubjects = q
    ? SUBJECTS.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q) ||
          s.topics.some((t) => t.toLowerCase().includes(q))
      )
    : SUBJECTS.slice(0, 3);

  const totalResults = filteredLessons.length + filteredPaths.length + filteredSubjects.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-stone-100">
          <Search className="w-5 h-5 text-amber-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Aryabhata, zero, Harappa, Advaita, Ellora, Natyashastra..."
            className="w-full text-sm sm:text-base text-slate-900 placeholder:text-stone-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-[11px] font-mono text-stone-500 bg-stone-100 rounded-md hover:bg-stone-200"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {totalResults === 0 ? (
            <div className="py-12 text-center text-stone-500 text-sm">
              <p>No results found for "{query}".</p>
              <p className="text-xs text-stone-400 mt-1">Try searching for "astronomy", "architecture", "zero", or "philosophy".</p>
            </div>
          ) : (
            <>
              {/* Lessons */}
              {filteredLessons.length > 0 && (
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block px-2 mb-2">
                    Lessons ({filteredLessons.length})
                  </span>
                  <div className="space-y-1">
                    {filteredLessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          onSelectLesson(lesson.id);
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-amber-50/50 group flex items-start justify-between gap-3 transition-colors border border-transparent hover:border-amber-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-stone-100 text-stone-700 rounded-lg group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors shrink-0">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-amber-900">
                              {lesson.title}
                            </h4>
                            <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                              <span>{lesson.readTime}</span>
                              <span aria-hidden="true">·</span>
                              <span>{lesson.difficulty}</span>
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-amber-600 shrink-0 self-center" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning Paths */}
              {filteredPaths.length > 0 && (
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block px-2 mb-2">
                    Structured Paths ({filteredPaths.length})
                  </span>
                  <div className="space-y-1">
                    {filteredPaths.map((path) => (
                      <button
                        key={path.id}
                        onClick={() => {
                          onSelectPath(path.id);
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-indigo-50/50 group flex items-start justify-between gap-3 transition-colors border border-transparent hover:border-indigo-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-stone-100 text-stone-700 rounded-lg group-hover:bg-indigo-100 group-hover:text-[#172554] transition-colors shrink-0">
                            <Map className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-[#172554]">
                              {path.title}
                            </h4>
                            <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                              {path.subtitle}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#172554] shrink-0 self-center" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Subjects */}
              {filteredSubjects.length > 0 && (
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block px-2 mb-2">
                    Disciplines &amp; Subjects ({filteredSubjects.length})
                  </span>
                  <div className="space-y-1">
                    {filteredSubjects.map((subject) => (
                      <button
                        key={subject.id}
                        onClick={() => {
                          onSelectSubject(subject.id);
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-stone-50 group flex items-start justify-between gap-3 transition-colors border border-transparent hover:border-stone-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-stone-100 text-stone-700 rounded-lg group-hover:bg-stone-200 transition-colors shrink-0">
                            <Landmark className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                              {subject.name}
                            </h4>
                            <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                              {subject.tagline}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-slate-700 shrink-0 self-center" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
          <div className="flex items-center gap-3">
            <span>Navigation: Click to jump</span>
            <span aria-hidden="true">·</span>
            <span>Shortcut: <kbd className="px-1.5 py-0.5 bg-white border border-stone-200 rounded text-[10px]">⌘K</kbd> / <kbd className="px-1.5 py-0.5 bg-white border border-stone-200 rounded text-[10px]">Ctrl+K</kbd></span>
          </div>
          <span>BharatGyan Archives</span>
        </div>
      </div>
    </div>
  );
};
