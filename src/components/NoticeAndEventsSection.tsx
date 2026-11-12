import React, { useState } from 'react';
import { Calendar, Bell, FileText, ArrowRight, Clock, MapPin, Tag, ExternalLink, CheckCircle } from 'lucide-react';
import { INSTITUTIONAL_NOTICES, CampusNotice } from '../data/collegeData';

interface Props {
  onNavigate?: (tab: string) => void;
}

export const NoticeAndEventsSection: React.FC<Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'academic' | 'placement' | 'exam' | 'event'>('all');
  const [selectedNotice, setSelectedNotice] = useState<CampusNotice | null>(null);

  const filteredNotices = activeTab === 'all'
    ? INSTITUTIONAL_NOTICES
    : INSTITUTIONAL_NOTICES.filter((n) => n.category === activeTab);

  return (
    <section className="pt-20 sm:pt-28 pb-16 sm:pb-24 bg-[#FAF9F5] border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Bell className="w-3.5 h-3.5 text-amber-600" />
            <span>Official Announcements &amp; Notifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#172554] tracking-tight">
            Institutional Notice Board &amp; Gazettes
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-4 leading-relaxed">
            Stay abreast of university circulars, end-semester examination timetables, campus recruitment schedules, and hackathon registrations.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Notices' },
              { id: 'exam', label: 'Examinations' },
              { id: 'placement', label: 'Placements & Drives' },
              { id: 'academic', label: 'Academic Regulations' },
              { id: 'event', label: 'Symposiums & Fests' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#1b2a60] text-white shadow-md'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notice Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                    {notice.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-stone-400">
                    <Calendar className="w-3 h-3 text-stone-400" />
                    <span>{notice.date.day} {notice.date.month} {notice.date.year}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2 leading-snug">
                  {notice.title}
                </h3>

                <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                  {notice.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-blue-900">
                <span className="text-[11px] text-stone-400 font-mono">{notice.issuingAuthority}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Read Gazette <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Notices Link */}
        <div className="mt-10 text-center">
          <button
            onClick={() => onNavigate && onNavigate('notices')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1b2a60] hover:text-blue-700 underline underline-offset-4 cursor-pointer"
          >
            <span>Access Complete Gazette Archive with PDF Circulars</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  {selectedNotice.categoryLabel}
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-900 mt-2">
                  {selectedNotice.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-stone-500 font-mono mt-1">
                  <span>Ref: {selectedNotice.refNo}</span>
                  <span>·</span>
                  <span>{selectedNotice.date.day} {selectedNotice.date.month} {selectedNotice.date.year}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 border-y border-stone-100 text-xs text-stone-700 leading-relaxed space-y-3">
              <p>{selectedNotice.fullBody}</p>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs">
              <span className="text-stone-500">Issued by: <strong className="text-slate-800">{selectedNotice.issuingAuthority}</strong></span>
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2 bg-[#1b2a60] text-white font-bold rounded-xl hover:bg-blue-900 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
