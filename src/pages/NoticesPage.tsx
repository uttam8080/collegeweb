import React, { useState } from 'react';
import { Bell, FileText, Calendar, Search, Filter, Download, ArrowRight, CheckCircle2, Clock, MapPin, Tag } from 'lucide-react';
import { INSTITUTIONAL_NOTICES, CampusNotice } from '../data/collegeData';

export const NoticesPage: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const [filterCat, setFilterCat] = useState<'all' | 'exam' | 'placement' | 'academic' | 'event' | 'administration'>('all');
  const [searchKey, setSearchKey] = useState('');
  const [selectedNotice, setSelectedNotice] = useState<CampusNotice | null>(null);

  const filtered = INSTITUTIONAL_NOTICES.filter((n) => {
    const matchesCat = filterCat === 'all' || n.category === filterCat;
    const matchesSearch =
      n.title.toLowerCase().includes(searchKey.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchKey.toLowerCase()) ||
      n.refNo.toLowerCase().includes(searchKey.toLowerCase()) ||
      n.issuingAuthority.toLowerCase().includes(searchKey.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAF9F5] pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EFE1] border-b border-stone-200 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#172554] tracking-tight leading-tight">
            Official Notices, Circulars &amp; Gazette
          </h1>
          <p className="text-stone-600 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
            Official announcements, BPUT academic regulations, examination timetables, campus recruitment schedules, and administrative notifications.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Search circulars by keyword, reference no, or issuing body..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-stone-300 text-sm shadow-sm focus:outline-hidden focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
            
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCat(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filterCat === tab.id
                    ? 'bg-[#1b2a60] text-white shadow-md'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notices List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-stone-500 font-mono">
            Showing <strong className="text-slate-800">{filtered.length}</strong> official circulars
          </p>
        </div>

        {filtered.map((notice) => (
          <div
            key={notice.id}
            onClick={() => setSelectedNotice(notice)}
            className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            <div className="flex items-start gap-4">
              {/* Date Box */}
              <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col items-center justify-center shrink-0">
                <span className="text-lg font-bold font-mono leading-none">{notice.date.day}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">{notice.date.month}</span>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-mono">
                    {notice.refNo}
                  </span>
                  <span className="text-[10px] font-semibold text-blue-700">
                    {notice.categoryLabel}
                  </span>
                  {notice.isImportant && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                      High Priority
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                  {notice.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {notice.summary}
                </p>

                <p className="text-[11px] text-stone-400 font-mono pt-1">
                  Issued by: {notice.issuingAuthority}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2 sm:self-center">
              <span className="text-xs font-bold text-[#1b2a60] group-hover:underline flex items-center gap-1">
                Read Gazette <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        ))}
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
    </div>
  );
};
