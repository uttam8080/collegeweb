import React, { useState, useRef } from 'react';
import { usePageTextAnimations } from '../utils/animations';
import { Search, Filter, Landmark, Compass, Brain, Palette, BookOpen, Music, ArrowRight, BookMarked } from 'lucide-react';
import { SUBJECTS, LESSONS } from '../data/mockData';
import { Subject, Difficulty } from '../types';

interface Props {
  selectedSubjectId?: string | null;
  onSelectSubject: (subjectId: string) => void;
  onSelectLesson: (lessonId: string) => void;
  onSelectPath: (pathId: string) => void;
}

export const SubjectsPage: React.FC<Props> = ({
  selectedSubjectId,
  onSelectSubject,
  onSelectLesson,
  onSelectPath
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(selectedSubjectId || null);

  const categories = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'History & Civilization', label: 'History & Civilization' },
    { id: 'Science & Mathematics', label: 'Science & Mathematics' },
    { id: 'Philosophy & Ethics', label: 'Philosophy & Ethics' },
    { id: 'Arts & Architecture', label: 'Arts & Architecture' },
    { id: 'Literature & Linguistics', label: 'Literature & Languages' },
    { id: 'Culture & Living Heritage', label: 'Culture & Traditions' }
  ];

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

  const filteredSubjects = SUBJECTS.filter((subject) => {
    const matchesCategory = selectedCategory === 'all' || subject.category === selectedCategory;
    const matchesSearch =
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const activeSubject = activeSubjectId
    ? SUBJECTS.find((s) => s.id === activeSubjectId)
    : null;

  const subjectLessons = activeSubject
    ? LESSONS.filter((l) => l.subjectId === activeSubject.id)
    : [];

  const pageRef = useRef<HTMLDivElement>(null);
  usePageTextAnimations(pageRef, [selectedCategory, searchQuery, activeSubjectId]);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FAF9F5] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-stone-200 pb-8 mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 block mb-1">
            Knowledge Repositories
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#172554] tracking-tight">
            Explore Subjects
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-3 max-w-3xl leading-relaxed">
            Delve into systematic fields of inquiry cultivated across the Indian subcontinent: from Aryabhata’s trigonometry and Panini’s computational linguistics to the temple engineering of Ellora.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#172554] text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter topics or keywords..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-stone-200 rounded-lg text-slate-900 placeholder:text-stone-400 focus:outline-hidden focus:border-[#172554]"
            />
          </div>
        </div>

        {/* If a subject is selected for deep drilldown view */}
        {activeSubject && (
          <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-white border border-amber-300/80 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
                  {getIcon(activeSubject.iconName)}
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider">
                    Focused Discipline
                  </span>
                  <h2 className="text-2xl font-bold font-serif text-slate-900">
                    {activeSubject.name}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setActiveSubjectId(null)}
                className="text-xs text-stone-500 hover:text-stone-800 px-3 py-1.5 border border-stone-200 rounded-lg self-start sm:self-auto"
              >
                Close Discipline Focus
              </button>
            </div>

            <p className="text-sm text-stone-700 leading-relaxed mb-6 max-w-3xl">
              {activeSubject.description}
            </p>

            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
              Curated Masterclasses in {activeSubject.name}
            </h3>

            {subjectLessons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjectLessons.map((l) => (
                  <div
                    key={l.id}
                    className="p-4 rounded-xl border border-stone-200 bg-[#FAF9F5] hover:bg-white hover:border-amber-300 transition-colors flex items-start justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{l.title}</h4>
                      <p className="text-xs text-stone-600 line-clamp-2 mt-1">{l.summary}</p>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-2">
                        <span>{l.readTime}</span>
                        <span aria-hidden="true">·</span>
                        <span>{l.difficulty}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onSelectLesson(l.id)}
                      className="px-3 py-1.5 bg-[#172554] text-white text-xs font-semibold rounded-lg hover:bg-slate-800 shrink-0 self-center"
                    >
                      Open Lesson
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-stone-50 text-center text-xs text-stone-500 border border-stone-200">
                Additional lessons for this discipline are being prepared by the Nalanda scholarly advisory council.
              </div>
            )}
          </div>
        )}

        {/* Subject Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSubjects.map((subject) => (
            <div
              key={subject.id}
              className="group rounded-2xl border border-stone-200 bg-white hover:border-stone-300 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-stone-900">
                  <img
                    src={subject.image}
                    alt={subject.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-white/95 text-[#172554] flex items-center justify-center shadow-md">
                    {getIcon(subject.iconName)}
                  </div>

                  <div className="absolute bottom-3 right-3 text-xs font-medium text-white/90 drop-shadow">
                    {subject.lessonCount} Lessons
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 block mb-1">
                    {subject.category}
                  </span>
                  <h3 className="text-xl font-bold font-serif text-slate-900 group-hover:text-[#172554] transition-colors">
                    {subject.name}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {subject.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block mb-1.5">
                      Key Syllabus Topics:
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-stone-600">
                      {subject.topics.map((t, idx) => (
                        <React.Fragment key={t}>
                          <span>{t}</span>
                          {idx < subject.topics.length - 1 && <span aria-hidden="true" className="text-stone-300">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    setActiveSubjectId(subject.id);
                    onSelectSubject(subject.id);
                  }}
                  className="w-full py-2.5 px-4 bg-stone-100 hover:bg-[#172554] hover:text-white text-slate-900 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 group-hover:bg-[#172554] group-hover:text-white"
                >
                  <span>Explore {subject.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
