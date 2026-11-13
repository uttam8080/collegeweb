import React from 'react';
import { Award, Building2, Globe, TrendingUp, CheckCircle, Quote, ArrowUpRight, ArrowRight } from 'lucide-react';
import { RECRUITERS, ALUMNI_SPOTLIGHT } from '../data/collegeData';
import { RecruiterLogo } from './RecruiterLogo';

interface Props {
  onNavigate?: (tab: string) => void;
}

export const ScholarPlacementsSection: React.FC<Props> = ({ onNavigate }) => {
  const stats = [
    { value: '94.8%', label: 'Overall Placement Success Rate', sub: 'Across B.Tech, M.Tech, MCA & MBA cohorts' },
    { value: '120+', label: 'Global Recruiting Partners', sub: 'Product giants, IT conglomerates & core industries' },
    { value: '₹44.0 LPA', label: 'Highest Salary Package', sub: 'Offered by premier tier-1 tech enterprises' },
    { value: '₹7.8 LPA', label: 'Average Branch Package', sub: 'Substantial multi-year growth across all departments' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#172554] tracking-tight">
            Proven Career Launchpads &amp; Global Recruiters
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-4 leading-relaxed">
            Our dedicated Training &amp; Placement (T&amp;P) Cell bridges classroom excellence with industry leadership, consistently placing over 94% of graduates in leading Fortune 500 conglomerates.
          </p>
        </div>

        {/* 4 Stat Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-300 hover:shadow-md transition-all text-left"
            >
              <span className="text-3xl sm:text-4xl font-metro font-extrabold text-[#172554] block tracking-tight">
                {s.value}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 mt-2 block font-metro">
                {s.label}
              </span>
              <span className="text-[11px] text-stone-500 mt-1 block leading-tight">
                {s.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Prominent Recruiting Conglomerates Wall */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold font-serif text-slate-900">
                Top Hiring Partners &amp; Industry Leaders
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Companies actively recruiting from TEKKZY College of Technology
              </p>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('placements')}
              className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All 120+ Recruiters</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {RECRUITERS.map((r, idx) => (
              <div
                key={idx}
                className="group relative p-5 rounded-2xl bg-gradient-to-br from-white via-slate-50/90 to-teal-50/40 border border-stone-200/80 shadow-2xs hover:shadow-xl hover:border-[#0D9488] transition-all duration-300 text-left flex flex-col justify-between hover:-translate-y-1 overflow-hidden"
              >
                {/* Top subtle accent gradient */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-600 opacity-80" />

                <div>
                  {/* Top Row: Package in Gradient Format */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] uppercase font-mono font-bold text-stone-400 truncate">
                      {r.category.split('&')[0]}
                    </span>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-2xs">
                      {r.highestPackage}
                    </span>
                  </div>

                  {/* Bigger Logo Container in Gradient Format */}
                  <div className="w-full h-18 sm:h-20 rounded-xl bg-gradient-to-b from-white to-slate-100/70 border border-white p-3 flex items-center justify-center shadow-2xs mb-3 group-hover:from-white group-hover:to-teal-50/30 transition-all">
                    <RecruiterLogo name={r.name} logoText={r.logoText} className="max-h-12 max-w-[140px] object-contain transition-transform duration-300 group-hover:scale-108" />
                  </div>

                  <span className="text-xs font-bold text-slate-800 block truncate group-hover:text-[#0D9488] transition-colors">
                    {r.name}
                  </span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500 font-mono">
                  <span>Intake</span>
                  <span className="text-[#0D9488] font-bold">{r.intakeAnnual}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alumni Spotlight Showcase */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              Alumni Speak &amp; Industry Impact
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Hear directly from our graduates excelling in global tech enterprises and national organizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ALUMNI_SPOTLIGHT.slice(0, 2).map((alum) => (
              <div
                key={alum.id}
                className="p-6 sm:p-7 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs flex flex-col justify-between relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={alum.image}
                        alt={alum.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{alum.name}</h4>
                        <p className="text-xs text-emerald-700 font-semibold">{alum.currentRole}</p>
                        <p className="text-[11px] text-stone-500">{alum.organization}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                      {alum.badge}
                    </span>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed italic">
                    "{alum.quote}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200 text-[11px] text-stone-500 font-mono flex items-center justify-between">
                  <span>{alum.program}</span>
                  <span>{alum.batch}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
