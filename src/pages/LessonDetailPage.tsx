import React, { useState, useEffect } from 'react';
import { Clock, BookOpen, CheckCircle, ArrowLeft, ArrowRight, Share2, Bookmark, Check, User } from 'lucide-react';
import { LESSONS } from '../data/mockData';
import { Lesson } from '../types';
import { InteractiveDiagram } from '../components/InteractiveDiagrams';
import { ShlokaPlayer } from '../components/ShlokaPlayer';
import { QuizCard } from '../components/QuizCard';
import { soundEngine } from '../utils/audio';

interface Props {
  lessonId: string;
  onBack: () => void;
  onSelectLesson: (id: string) => void;
  completedLessonIds: string[];
  bookmarkedLessonIds: string[];
  onToggleComplete: (id: string) => void;
  onToggleBookmark: (id: string) => void;
}

export const LessonDetailPage: React.FC<Props> = ({
  lessonId,
  onBack,
  onSelectLesson,
  completedLessonIds,
  bookmarkedLessonIds,
  onToggleComplete,
  onToggleBookmark
}) => {
  const lesson = LESSONS.find((l) => l.id === lessonId) || LESSONS[0];
  const isCompleted = completedLessonIds.includes(lesson.id);
  const isBookmarked = bookmarkedLessonIds.includes(lesson.id);
  const [copiedShare, setCopiedShare] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>(lesson.sections[0]?.id || '');

  // Scroll to top on lesson switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (lesson.sections[0]) {
      setActiveSectionId(lesson.sections[0].id);
    }
  }, [lessonId, lesson.sections]);

  // Find previous and next lessons
  const currentIndex = LESSONS.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? LESSONS[currentIndex - 1] : null;
  const nextLesson = currentIndex < LESSONS.length - 1 ? LESSONS[currentIndex + 1] : null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleCompleteClick = () => {
    if (!isCompleted) {
      soundEngine.playChime();
    }
    onToggleComplete(lesson.id);
  };

  return (
    <article className="min-h-screen bg-[#FAF9F5] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Curricula</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(lesson.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                isBookmarked
                  ? 'bg-amber-500 text-white border-amber-600'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
              <span>{isBookmarked ? 'Bookmarked' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedShare ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={handleCompleteClick}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs ${
                isCompleted
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#FF9933] text-white hover:bg-[#ea8422]'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isCompleted ? 'Completed' : 'Mark as Completed'}</span>
            </button>
          </div>
        </div>

        {/* Lesson Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-stone-200 bg-stone-900 mb-10 shadow-lg">
          <div className="relative aspect-21/9 sm:aspect-24/9 min-h-[260px] sm:min-h-[320px]">
            <img
              src={lesson.coverImage}
              alt={lesson.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

            {/* Scrim Overlay Text */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 text-white max-w-4xl">
              <div className="flex items-center gap-3 text-xs text-amber-300 mb-2 font-medium">
                <span className="uppercase tracking-wider font-semibold">Masterclass</span>
                <span aria-hidden="true">·</span>
                <span>{lesson.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{lesson.difficulty} Level</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                {lesson.title}
              </h1>

              {/* Author / Scholar Attribution */}
              <div className="mt-4 pt-3 border-t border-white/15 flex items-center gap-3 text-xs text-stone-300">
                <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-serif font-bold">
                  {lesson.author.name.charAt(0)}
                </div>
                <div>
                  <span className="font-semibold text-white block">{lesson.author.name}</span>
                  <span className="text-[11px] text-stone-300">{lesson.author.title} · {lesson.author.institution}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Content Layout (75% Main Essay / 25% Sticky Syllabus Rail) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Reading Column (8 cols) */}
          <main className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xs space-y-8">
            {/* Executive Summary */}
            <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-amber-200/80">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                Executive Synthesis
              </span>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                {lesson.summary}
              </p>
            </div>

            {/* Key Insights Box */}
            <div className="border border-stone-200 rounded-2xl p-6 bg-white space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Core Conceptual Takeaways
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                {lesson.keyInsights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#FF9933] font-bold">0{idx + 1}.</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sanskrit Shloka audio card if present */}
            {lesson.shloka && <ShlokaPlayer shloka={lesson.shloka} />}

            {/* Lesson Sections with Drop Caps and Diagrams */}
            <div className="space-y-12">
              {lesson.sections.map((section, idx) => (
                <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#172554] tracking-tight border-b border-stone-100 pb-2">
                    {section.title}
                  </h2>

                  <div className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base">
                    {section.content.map((p, pIdx) => {
                      // Apply editorial drop cap on the very first paragraph of section 1
                      const isFirstDropCap = idx === 0 && pIdx === 0;

                      return (
                        <p
                          key={pIdx}
                          className={
                            isFirstDropCap
                              ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#172554]'
                              : ''
                          }
                        >
                          {p}
                        </p>
                      );
                    })}
                  </div>

                  {/* Pull quote if available */}
                  {section.quote && (
                    <blockquote className="my-6 py-4 px-6 border-y border-amber-300/60 bg-amber-50/40 rounded-xl text-stone-800">
                      <p className="font-serif italic text-base sm:text-lg leading-relaxed">
                        "{section.quote.text}"
                      </p>
                      <cite className="block text-xs font-semibold text-amber-900 not-italic mt-2 text-right">
                        — {section.quote.author}
                      </cite>
                    </blockquote>
                  )}

                  {/* Interactive Diagram if attached */}
                  {section.diagram && <InteractiveDiagram diagram={section.diagram} />}
                </section>
              ))}
            </div>

            {/* Interactive Knowledge Check Quiz */}
            <QuizCard
              lessonId={lesson.id}
              questions={lesson.quiz}
              onQuizComplete={(score) => {
                if (score === lesson.quiz.length) {
                  onToggleComplete(lesson.id);
                }
              }}
            />

            {/* Mark as Completed Footer Banner */}
            <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Finished reading this lesson?</span>
                <span className="text-[11px] text-stone-500">Record your progress in your personal scholar dashboard.</span>
              </div>
              <button
                onClick={handleCompleteClick}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 ${
                  isCompleted
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#FF9933] text-white hover:bg-[#ea8422]'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>{isCompleted ? 'Mastered & Completed' : 'Mark Lesson as Completed'}</span>
              </button>
            </div>

            {/* Prev / Next Navigation Controls */}
            <div className="pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevLesson ? (
                <button
                  onClick={() => onSelectLesson(prevLesson.id)}
                  className="p-4 rounded-xl border border-stone-200 bg-[#FAF9F5] hover:bg-white text-left transition-colors flex items-center gap-3 group"
                >
                  <ArrowLeft className="w-4 h-4 text-stone-400 group-hover:-translate-x-1 transition-transform shrink-0" />
                  <div>
                    <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block">
                      Previous Masterclass
                    </span>
                    <span className="text-xs font-bold text-slate-900 line-clamp-1">
                      {prevLesson.title}
                    </span>
                  </div>
                </button>
              ) : (
                <div />
              )}

              {nextLesson && (
                <button
                  onClick={() => onSelectLesson(nextLesson.id)}
                  className="p-4 rounded-xl border border-stone-200 bg-[#FAF9F5] hover:bg-white text-right transition-colors flex items-center justify-end gap-3 group sm:col-start-2"
                >
                  <div>
                    <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block">
                      Next Masterclass
                    </span>
                    <span className="text-xs font-bold text-slate-900 line-clamp-1">
                      {nextLesson.title}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
              )}
            </div>
          </main>

          {/* Sticky Syllabus & Related Lessons Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Table of Contents Box */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Contents in This Lesson
              </h3>
              <nav className="space-y-1 text-xs">
                {lesson.sections.map((section, sIdx) => {
                  const isActive = activeSectionId === section.id;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={() => setActiveSectionId(section.id)}
                      className={`block py-1.5 px-2.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-amber-50 text-amber-900 font-semibold'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                      }`}
                    >
                      <span className="text-amber-700 font-mono mr-1.5">{sIdx + 1}.</span>
                      {section.title.replace(/^\d+\.\s*/, '')}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Scholar Citation / Provenance */}
            <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200 text-xs space-y-2">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                Academic Citation
              </span>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                BharatGyan Curatorial Archives (2026). "{lesson.title}". Peer-reviewed by Dr. Radhika Sen &amp; Council of Indic Studies.
              </p>
              <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-[11px] text-stone-500 font-mono">
                <span>IAST Transliteration: Validated</span>
                <span>Open CC-BY-NC 4.0</span>
              </div>
            </div>

            {/* Related Lessons */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Related Masterclasses
              </h3>
              <div className="space-y-3">
                {lesson.relatedLessonIds.map((relId) => {
                  const relLesson = LESSONS.find((l) => l.id === relId);
                  if (!relLesson) return null;

                  return (
                    <button
                      key={relLesson.id}
                      onClick={() => onSelectLesson(relLesson.id)}
                      className="w-full text-left p-3 rounded-xl border border-stone-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all flex items-start gap-3 group"
                    >
                      <img
                        src={relLesson.coverImage}
                        alt={relLesson.title}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-900 line-clamp-2">
                          {relLesson.title}
                        </h4>
                        <span className="text-[10px] text-stone-500 mt-0.5 block">
                          {relLesson.readTime} · {relLesson.difficulty}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
};
