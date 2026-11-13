import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Award, TrendingUp, Users, Building, Sparkles } from 'lucide-react';
import { WHY_TEKKZY_PILLARS } from '../data/collegeData';

export const WhyBharatGyan: React.FC = () => {
  const iconList = [
    <Award className="w-6 h-6 text-[#172554]" />,
    <TrendingUp className="w-6 h-6 text-[#E03D2E]" />,
    <Sparkles className="w-6 h-6 text-cyan-600" />,
    <Users className="w-6 h-6 text-amber-600" />,
    <Building className="w-6 h-6 text-emerald-600" />,
    <ShieldCheck className="w-6 h-6 text-indigo-600" />,
  ];

  return (
    <section className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#172554] tracking-tight">
            Why Choose TEKKZY College of Technology
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-4 leading-relaxed">
            Consistently recognized as a benchmark institution in Eastern India for technical rigor, innovative research, and stellar campus placements.
          </p>
        </div>

        {/* 6 Institutional Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_TEKKZY_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:border-blue-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {iconList[idx % iconList.length]}
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                    {pillar.stat}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                  {pillar.title}
                </h3>
                <span className="text-xs font-semibold text-blue-700 block mt-0.5">
                  {pillar.label}
                </span>

                <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center text-[11px] text-stone-400 font-mono">
                <span>Verified by Academic Senate</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
