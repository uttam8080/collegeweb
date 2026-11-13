import React, { useState } from 'react';
import { Cpu, Microscope, Compass, Code2, ArrowRight, ExternalLink, Users, BookOpen, Award, CheckCircle2, Sparkles, Radio } from 'lucide-react';
import { R_AND_D_LABS, RndLab } from '../data/collegeData';

interface Props {
  onNavigate?: (tab: string) => void;
}

export const InnovationLabsSection: React.FC<Props> = ({ onNavigate }) => {
  const [activeLabId, setActiveLabId] = useState<string>(R_AND_D_LABS[0].id);
  const [activeSimModal, setActiveSimModal] = useState<RndLab | null>(null);

  const activeLab = R_AND_D_LABS.find((l) => l.id === activeLabId) || R_AND_D_LABS[0];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#172554] tracking-tight">
            Research Laboratories &amp; Innovation Hub
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-4 leading-relaxed">
            Where ideas transform into industrial patents and market-ready ventures. State-of-the-art facilities equipped with advanced 3D printers, UAV testbeds, and GPU clusters.
          </p>

          {/* Tab selector for Labs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {R_AND_D_LABS.map((lab) => (
              <button
                key={lab.id}
                onClick={() => setActiveLabId(lab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeLabId === lab.id
                    ? 'bg-[#1b2a60] text-white shadow-md'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {lab.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Active Lab Showcase Card */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-[#101b42] to-slate-950 text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-slate-800 relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-semibold">
                  {activeLab.shortName}
                </span>
                <span className="text-xs text-stone-400">
                  Focus: {activeLab.focus}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                {activeLab.name}
              </h3>

              <p className="text-sm text-stone-300 leading-relaxed">
                {activeLab.description}
              </p>

              {/* Stat counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {activeLab.stats.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="text-xl sm:text-2xl font-metro font-extrabold text-cyan-400 block tabular-nums">
                      {s.metric}
                    </span>
                    <span className="text-[11px] text-stone-300 font-medium block mt-0.5 leading-snug">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Lead Investigator */}
              <div className="pt-2 flex items-center gap-3 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 flex items-center justify-center font-bold text-xs">
                  {activeLab.lead.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{activeLab.lead}</h4>
                  <p className="text-[11px] text-stone-400">{activeLab.leadTitle}</p>
                </div>
              </div>
            </div>

            {/* Right Card: Key Projects & Equipment (5 Cols) */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Flagship Innovation Projects</span>
                </h4>
                <ul className="space-y-2 text-xs text-stone-200">
                  {activeLab.keyProjects.map((proj, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{proj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 mb-3">
                  <Radio className="w-3.5 h-3.5" />
                  <span>Industrial Equipment &amp; Testbeds</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeLab.equipment.map((eq, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-white/10 text-stone-200 text-[11px] font-mono border border-white/10">
                      {eq}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('research')}
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Explore Research Papers &amp; Patents</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
