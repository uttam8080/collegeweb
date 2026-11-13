import React, { useEffect, useRef, useState } from 'react';
import { 
  RefreshCw, 
  Sparkles, 
  Briefcase, 
  Building2, 
  TrendingUp, 
  Trophy 
} from 'lucide-react';
import { gsap, ScrollTrigger } from '../utils/animations';

interface HighlightMetric {
  id: string;
  division: string;
  target: number;
  formatFn: (val: number) => string;
  label: string;
  category: string;
  desc: string;
  benchmark: string;
  icon: React.ElementType;
  accentBorder: string;
  accentText: string;
  badgeBg: string;
  iconBg: string;
  glowColor: string;
  cardBorderHover: string;
}

const METRICS: HighlightMetric[] = [
  {
    id: 'placed',
    division: 'Division 01',
    target: 5000,
    formatFn: (val: number) => `${Math.round(val).toLocaleString('en-US')}+`,
    label: 'PLACED',
    category: 'Career Transitions',
    desc: 'Graduates successfully recruited into Fortune 500 multinationals & high-growth tech ventures.',
    benchmark: '100% Verified Track Record',
    icon: Briefcase,
    accentBorder: 'from-emerald-400 via-teal-400 to-emerald-500',
    accentText: 'text-emerald-300',
    badgeBg: 'bg-emerald-950/70 border-emerald-500/30 text-emerald-300',
    iconBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    glowColor: 'bg-emerald-500/15 group-hover:bg-emerald-500/25',
    cardBorderHover: 'hover:border-emerald-400/50 hover:shadow-[0_20px_50px_rgba(16,185,129,0.2)]',
  },
  {
    id: 'companies',
    division: 'Division 02',
    target: 120,
    formatFn: (val: number) => `${Math.round(val)}+`,
    label: 'COMPANIES',
    category: 'Enterprise Network',
    desc: 'Global corporate recruiting partners visiting on-campus annually for engineering & product drives.',
    benchmark: 'Tier-1 Tech Conglomerates',
    icon: Building2,
    accentBorder: 'from-cyan-400 via-sky-400 to-blue-500',
    accentText: 'text-cyan-300',
    badgeBg: 'bg-cyan-950/70 border-cyan-500/30 text-cyan-300',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    glowColor: 'bg-cyan-500/15 group-hover:bg-cyan-500/25',
    cardBorderHover: 'hover:border-cyan-400/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.2)]',
  },
  {
    id: 'rate',
    division: 'Division 03',
    target: 94,
    formatFn: (val: number) => `${Math.round(val)}%`,
    label: 'RATE',
    category: 'Cohort Conversion',
    desc: 'Consistently high placement rate sustained across all eligible B.Tech, MCA & M.Tech batches.',
    benchmark: 'National Accreditation High',
    icon: TrendingUp,
    accentBorder: 'from-amber-400 via-yellow-400 to-orange-500',
    accentText: 'text-amber-300',
    badgeBg: 'bg-amber-950/70 border-amber-500/30 text-amber-300',
    iconBg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    glowColor: 'bg-amber-500/15 group-hover:bg-amber-500/25',
    cardBorderHover: 'hover:border-amber-400/50 hover:shadow-[0_20px_50px_rgba(245,158,11,0.2)]',
  },
  {
    id: 'highest',
    division: 'Division 04',
    target: 44,
    formatFn: (val: number) => `${Math.round(val)} LPA`,
    label: 'HIGHEST',
    category: 'Apex Compensation',
    desc: 'Apex international CTC package secured with Tier-1 AI & cloud computing technology pioneers.',
    benchmark: 'All-India Elite Band',
    icon: Trophy,
    accentBorder: 'from-purple-400 via-fuchsia-400 to-indigo-500',
    accentText: 'text-purple-300',
    badgeBg: 'bg-purple-950/70 border-purple-500/30 text-purple-300',
    iconBg: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    glowColor: 'bg-purple-500/15 group-hover:bg-purple-500/25',
    cardBorderHover: 'hover:border-purple-400/50 hover:shadow-[0_20px_50px_rgba(168,85,247,0.2)]',
  },
];

type SpatialTheme = 'oxford' | 'charcoal' | 'warm' | 'classic';

interface ThemeConfig {
  name: string;
  bgGradient: string;
  nebula1: string;
  nebula2: string;
  nebula3: string;
  nebula4: string;
  cardBg: string;
  horizonTop: string;
  horizonBottom: string;
}

const SPATIAL_THEMES: Record<SpatialTheme, ThemeConfig> = {
  oxford: {
    name: 'Oxford',
    bgGradient: 'from-[#020617] via-[#071328] via-50% to-[#020617]',
    nebula1: 'bg-cyan-500/20',
    nebula2: 'bg-indigo-600/20',
    nebula3: 'bg-teal-500/15',
    nebula4: 'bg-purple-600/15',
    cardBg: 'bg-slate-900/60',
    horizonTop: 'from-transparent via-cyan-400/50 to-transparent',
    horizonBottom: 'from-transparent via-indigo-400/40 to-transparent',
  },
  charcoal: {
    name: 'Charcoal',
    bgGradient: 'from-[#030712] via-[#0f172a] via-50% to-[#030712]',
    nebula1: 'bg-blue-500/15',
    nebula2: 'bg-violet-600/20',
    nebula3: 'bg-sky-500/15',
    nebula4: 'bg-fuchsia-600/15',
    cardBg: 'bg-zinc-900/60',
    horizonTop: 'from-transparent via-sky-400/50 to-transparent',
    horizonBottom: 'from-transparent via-violet-400/40 to-transparent',
  },
  warm: {
    name: 'Warm',
    bgGradient: 'from-[#0c0a09] via-[#1c1917] via-50% to-[#0c0a09]',
    nebula1: 'bg-amber-500/20',
    nebula2: 'bg-orange-600/15',
    nebula3: 'bg-yellow-500/15',
    nebula4: 'bg-rose-600/15',
    cardBg: 'bg-stone-900/60',
    horizonTop: 'from-transparent via-amber-400/50 to-transparent',
    horizonBottom: 'from-transparent via-orange-400/40 to-transparent',
  },
  classic: {
    name: 'Classic',
    bgGradient: 'from-[#02130e] via-[#06241b] via-50% to-[#02130e]',
    nebula1: 'bg-emerald-500/20',
    nebula2: 'bg-teal-600/20',
    nebula3: 'bg-teal-500/15',
    nebula4: 'bg-cyan-600/15',
    cardBg: 'bg-emerald-950/40',
    horizonTop: 'from-transparent via-emerald-400/50 to-transparent',
    horizonBottom: 'from-transparent via-teal-400/40 to-transparent',
  },
};

export const PlacementHighlightsBanner: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [activeTheme, setActiveTheme] = useState<SpatialTheme>('oxford');

  const currentTheme = SPATIAL_THEMES[activeTheme];

  // Exact 2-second synchronized count-up: all 4 numbers finish at the exact same millisecond
  const runSynchronizedCountUp = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const startTime = performance.now();
    const duration = 2000; // exactly 2.0 seconds

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts(METRICS.map(m => Math.round(m.target * ease)));

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(update);
      } else {
        // Guarantee all numbers reach final values simultaneously at 2.0s
        setCounts(METRICS.map(m => m.target));
      }
    };

    animFrameRef.current = requestAnimationFrame(update);
  };

  // Scroll-triggered text entrance and synchronized count-up animation
  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    let hasAnimated = false;

    const ctx = gsap.context(() => {
      // 1. Text elements coming out smoothly on scroll with stagger
      gsap.fromTo(
        '.stat-text-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none none',
          }
        }
      );

      // 2. Division cards coming out smoothly on scroll with stagger
      gsap.fromTo(
        '.stat-card-reveal',
        { opacity: 0, y: 55, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            toggleActions: 'play none none none',
            onEnter: () => {
              if (hasAnimated) return;
              hasAnimated = true;
              runSynchronizedCountUp();
            }
          }
        }
      );
    }, section);

    return () => {
      ctx.revert();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCounts([0, 0, 0, 0]);
    runSynchronizedCountUp();
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#020617] overflow-hidden select-none border-y border-cyan-500/20"
    >
      {/* Spatial Cosmic & Nebula Gradient Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.18),rgba(255,255,255,0))] pointer-events-none" />
      <div className={`absolute inset-0 bg-gradient-to-b ${currentTheme.bgGradient} pointer-events-none transition-colors duration-700`} />

      {/* Spatial Glowing Nebula Orbs */}
      <div className={`absolute -top-32 -left-32 w-96 h-96 rounded-full ${currentTheme.nebula1} blur-[130px] pointer-events-none transition-all duration-700`} />
      <div className={`absolute top-1/2 -right-32 w-[30rem] h-[30rem] rounded-full ${currentTheme.nebula2} blur-[150px] pointer-events-none transition-all duration-700`} />
      <div className={`absolute -bottom-32 left-1/3 w-[26rem] h-[26rem] rounded-full ${currentTheme.nebula3} blur-[140px] pointer-events-none transition-all duration-700`} />
      <div className={`absolute top-1/4 left-2/3 w-80 h-80 rounded-full ${currentTheme.nebula4} blur-[140px] pointer-events-none transition-all duration-700`} />

      {/* Spatial Grid Texture */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Subtle Cosmic Light Horizon Lines */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${currentTheme.horizonTop} transition-colors duration-700`} />
      <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r ${currentTheme.horizonBottom} transition-colors duration-700`} />

      {/* Top Controls: Theme Ambiance Switcher & Replay Button */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10 lg:right-16 flex items-center gap-2.5 z-20">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
          {(['oxford', 'charcoal', 'warm', 'classic'] as SpatialTheme[]).map((themeKey) => {
            const isSelected = activeTheme === themeKey;
            const themeObj = SPATIAL_THEMES[themeKey];

            return (
              <button
                key={themeKey}
                onClick={() => setActiveTheme(themeKey)}
                title={`Switch spatial ambiance to ${themeObj.name}`}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-stone-900 shadow-md scale-105'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {themeObj.name}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleReplay}
          title="Replay 2-second synchronized animation"
          className="p-2 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 text-stone-300 hover:text-white transition-all cursor-pointer shadow-lg group"
        >
          <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
        </button>
      </div>

      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header with Scroll-Triggered Text Reveal */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="stat-text-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            CAREER ASCENDANCY &amp; ANNUAL AUDIT
          </div>

          <h2 className="stat-text-reveal text-3xl sm:text-4xl lg:text-[48px] xl:text-[54px] tracking-tight leading-tight mb-4">
            <span className="font-sans font-extrabold text-white">
              Placement
            </span>{' '}
            <span className="font-serif italic font-normal bg-gradient-to-r from-cyan-300 via-teal-200 to-sky-300 bg-clip-text text-transparent">
              highlights.
            </span>
          </h2>

          <p className="stat-text-reveal text-sm sm:text-base text-slate-300/90 font-sans max-w-2xl mx-auto leading-relaxed">
            Consistently achieving tier-1 corporate recruitment milestones across graduating cohorts through intensive algorithmic bootcamps and 120+ global hiring partners.
          </p>
        </div>

        {/* 4 Expansive Divisions Spanning Across Entire Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 w-full">
          {METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            const currentCount = counts[idx] || 0;
            const formatted = metric.formatFn(currentCount);

            return (
              <div
                key={metric.id}
                className={`stat-card-reveal group relative flex flex-col justify-between p-7 sm:p-8 lg:p-9 rounded-3xl ${currentTheme.cardBg} backdrop-blur-xl border border-white/10 ${metric.cardBorderHover} shadow-[0_10px_35px_rgba(0,0,0,0.4)] transition-all duration-500 overflow-hidden`}
              >
                {/* Card Top Accent Gradient Strip */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${metric.accentBorder} opacity-80 group-hover:h-1.5 transition-all duration-300`}
                />

                {/* Internal Hover Glow Orb */}
                <div
                  className={`absolute -top-16 -right-16 w-40 h-40 rounded-full ${metric.glowColor} blur-2xl transition-all duration-500 pointer-events-none`}
                />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full border ${metric.badgeBg}`}
                    >
                      {metric.division}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${metric.iconBg} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Fixed-height tabular number container for zero vibration */}
                  <div className="h-16 sm:h-20 flex items-center mb-2.5">
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-white tabular-nums whitespace-nowrap">
                      {formatted}
                    </div>
                  </div>

                  {/* Tracked Uppercase Label matching reference */}
                  <div className={`text-xs sm:text-sm font-mono uppercase tracking-[0.2em] ${metric.accentText} font-bold mb-2`}>
                    {metric.label}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {metric.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{metric.category}</span>
                  <span className={`${metric.accentText} font-semibold`}>
                    {metric.benchmark}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlacementHighlightsBanner;
