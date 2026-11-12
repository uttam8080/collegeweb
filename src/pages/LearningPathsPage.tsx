import React, { useState } from 'react';
import { Clock, BookOpen, CheckCircle2, ArrowRight, Award, Compass, Check, ChevronRight } from 'lucide-react';
import { LEARNING_PATHS, LESSONS } from '../data/mockData';
import { LearningPath } from '../types';

interface Props {
  selectedPathId?: string | null;
  onSelectLesson: (lessonId: string) => void;
  enrolledPathIds: string[];
  completedLessonIds: string[];
  onToggleEnroll: (pathId: string) => void;
}

export const LearningPathsPage: React.FC<Props> = ({
  selectedPathId,
  onSelectLesson,
  enrolledPathIds,
  completedLessonIds,
  onToggleEnroll
}) => {
  const [activePathId, setActivePathId] = useState<string | null>(selectedPathId || LEARNING_PATHS[0].id);

  const activePath = LEARNING_PATHS.find((p) => p.id === activePathId) || LEARNING_PATHS[0];
  const isEnrolled = enrolledPathIds.includes(activePath.id);

  // Calculate detailed progress for active path
  const allPathLessonIds = activePath.modules.flatMap((m) => m.lessonIds);
  const completedCount = allPathLessonIds.filter((id) => completedLessonIds.includes(id)).length;
  const progressPercent = allPathLessonIds.length > 0 ? Math.round((completedCount / allPathLessonIds.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#FAF9F5] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-stone-200 pb-8 mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 block mb-1">
            Structured Pedagogical Journeys
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#172554] tracking-tight">
            Learning Paths
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-3 max-w-3xl leading-relaxed">
            Multi-stage curricula that guide you chronologically and thematically through India's intellectual revolutions, with modular milestones and knowledge verification.
          </p>
        </div>

        {/* Master-Detail Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Path Selector List (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
              Available Curricula ({LEARNING_PATHS.length})
            </span>

            {LEARNING_PATHS.map((path) => {
              const isSelected = activePath.id === path.id;
              const pathEnrolled = enrolledPathIds.includes(path.id);
              const pathLessons = path.modules.flatMap((m) => m.lessonIds);
              const pathCompleted = pathLessons.filter((id) => completedLessonIds.includes(id)).length;
              const pathPercent = pathLessons.length > 0 ? Math.round((pathCompleted / pathLessons.length) * 100) : 0;

              return (
                <button
                  key={path.id}
                  onClick={() => setActivePathId(path.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all text-slate-800 ${
                    isSelected
                      ? 'bg-white border-[#172554] shadow-md ring-1 ring-[#172554]'
                      : 'bg-[#FDFCF9] border-stone-200 hover:border-stone-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                    <span className="font-semibold text-amber-800 uppercase text-[10px]">
                      {path.level}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 text-stone-400" />
                      {path.duration}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {path.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                    {path.subtitle}
                  </p>

                  {/* Progress snippet */}
                  <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px]">
                    <span className="text-stone-500">{path.totalLessons} Lessons</span>
                    {pathEnrolled ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {pathPercent}% Done
                      </span>
                    ) : (
                      <span className="text-stone-400">Not enrolled</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Path Detailed View (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-10 space-y-8">
            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                  {activePath.category} · {activePath.level} Level
                </span>

                <button
                  onClick={() => onToggleEnroll(activePath.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                    isEnrolled
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                      : 'bg-[#FF9933] text-white hover:bg-[#ea8422] shadow-xs'
                  }`}
                >
                  {isEnrolled ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Enrolled (Active Journey)</span>
                    </>
                  ) : (
                    <>
                      <Compass className="w-4 h-4" />
                      <span>Enroll in Learning Path</span>
                    </>
                  )}
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#172554] tracking-tight">
                {activePath.title}
              </h2>
              <p className="text-sm font-medium text-amber-800 mt-1">
                {activePath.subtitle}
              </p>
              <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                {activePath.description}
              </p>

              {/* Progress Bar */}
              <div className="mt-6 p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex items-center justify-between text-xs font-medium text-slate-800 mb-2">
                  <span>Syllabus Completion</span>
                  <span className="font-mono text-emerald-800 font-bold">{progressPercent}% Completed</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="mt-2 text-[11px] text-stone-500 flex justify-between">
                  <span>{completedCount} of {allPathLessonIds.length} modules mastered</span>
                  <span>Estimated total time: {activePath.duration}</span>
                </div>
              </div>
            </div>

            {/* Prerequisites & Outcomes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100 text-xs">
              <div className="bg-[#FAF9F5] p-5 rounded-xl border border-stone-200">
                <span className="font-bold text-slate-900 block mb-2 uppercase tracking-wider text-[11px]">
                  Prerequisites &amp; Audience
                </span>
                <ul className="space-y-1.5 text-stone-600">
                  {activePath.prerequisites.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">·</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FAF9F5] p-5 rounded-xl border border-stone-200">
                <span className="font-bold text-slate-900 block mb-2 uppercase tracking-wider text-[11px]">
                  Key Learning Outcomes
                </span>
                <ul className="space-y-1.5 text-stone-600">
                  {activePath.learningOutcomes.map((o, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modules & Lessons Syllabus Breakdown */}
            <div className="pt-4 border-t border-stone-100 space-y-6">
              <h3 className="text-lg font-bold font-serif text-slate-900">
                Curriculum Structure &amp; Lessons
              </h3>

              <div className="space-y-6">
                {activePath.modules.map((mod, modIdx) => (
                  <div key={mod.id} className="border border-stone-200 rounded-2xl overflow-hidden bg-stone-50/50">
                    <div className="bg-stone-100/80 px-5 py-3.5 border-b border-stone-200">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#172554] text-white flex items-center justify-center text-[10px] font-mono font-bold">
                          {modIdx + 1}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                          {mod.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-1 pl-7">
                        {mod.description}
                      </p>
                    </div>

                    {/* Module lessons */}
                    <div className="p-4 space-y-2.5">
                      {mod.lessonIds.map((lId) => {
                        const lessonData = LESSONS.find((l) => l.id === lId);
                        const isLessonDone = completedLessonIds.includes(lId);

                        if (!lessonData) {
                          return (
                            <div key={lId} className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between text-xs text-stone-500">
                              <span>Module Lesson #{lId.replace('lesson-', '')}</span>
                              <span className="text-[11px] text-stone-400">In Preparation</span>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={lessonData.id}
                            className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-amber-300 transition-colors flex items-center justify-between gap-3 shadow-2xs"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-1.5 rounded-full ${isLessonDone ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-400'}`}>
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                              <div>
                                <h5 className="text-xs sm:text-sm font-semibold text-slate-900">
                                  {lessonData.title}
                                </h5>
                                <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                                  <span>{lessonData.readTime}</span>
                                  <span aria-hidden="true">·</span>
                                  <span>{lessonData.difficulty}</span>
                                  <span aria-hidden="true">·</span>
                                  <span>{lessonData.quiz.length} Quiz Questions</span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => onSelectLesson(lessonData.id)}
                              className="px-3.5 py-1.5 bg-[#172554] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shrink-0"
                            >
                              <span>{isLessonDone ? 'Review' : 'Start'}</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
