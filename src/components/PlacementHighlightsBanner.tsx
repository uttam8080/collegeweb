import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface HighlightMetric {
  id: string;
  target: number;
  suffix: string;
  label: string;
  formatFn: (val: number) => string;
}

const METRICS: HighlightMetric[] = [
  {
    id: 'placed',
    target: 5000,
    suffix: '+',
    label: 'PLACED',
    formatFn: (val: number) => `${Math.floor(val).toLocaleString('en-US')}+`,
  },
  {
    id: 'companies',
    target: 120,
    suffix: '+',
    label: 'COMPANIES',
    formatFn: (val: number) => `${Math.floor(val)}+`,
  },
  {
    id: 'rate',
    target: 94,
    suffix: '%',
    label: 'RATE',
    formatFn: (val: number) => `${Math.floor(val)}%`,
  },
  {
    id: 'highest',
    target: 44,
    suffix: ' LPA',
    label: 'HIGHEST',
    formatFn: (val: number) => `${Math.floor(val)} LPA`,
  },
];

type ClassicTheme = 'oxford' | 'charcoal' | 'ivory' | 'forest';

const THEMES: Record<ClassicTheme, {
  name: string;
  containerBg: string;
  border: string;
  headlineText: string;
  highlightText: string;
  numberText: string;
  labelText: string;
  accentPill: string;
}> = {
  oxford: {
    name: 'Oxford Navy',
    containerBg: 'bg-[#0E1D38]',
    border: 'border border-blue-900/40 shadow-xl',
    headlineText: 'text-white',
    highlightText: 'text-white',
    numberText: 'text-white',
    labelText: 'text-slate-300',
    accentPill: 'bg-white/10 text-white hover:bg-white/20',
  },
  charcoal: {
    name: 'Charcoal',
    containerBg: 'bg-[#181F2B]',
    border: 'border border-slate-700/60 shadow-xl',
    headlineText: 'text-white',
    highlightText: 'text-white',
    numberText: 'text-white',
    labelText: 'text-slate-300',
    accentPill: 'bg-white/10 text-white hover:bg-white/20',
  },
  ivory: {
    name: 'Warm Ivory',
    containerBg: 'bg-[#F9F8F5]',
    border: 'border border-stone-300/80 shadow-md',
    headlineText: 'text-stone-900',
    highlightText: 'text-[#1E3A8A]',
    numberText: 'text-[#1E3A8A]',
    labelText: 'text-stone-500',
    accentPill: 'bg-stone-200/80 text-stone-800 hover:bg-stone-300',
  },
  forest: {
    name: 'Classic Forest',
    containerBg: 'bg-[#0A2219]',
    border: 'border border-emerald-900/40 shadow-xl',
    headlineText: 'text-white',
    highlightText: 'text-white',
    numberText: 'text-white',
    labelText: 'text-emerald-100/80',
    accentPill: 'bg-white/10 text-white hover:bg-white/20',
  }
};

export const PlacementHighlightsBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [animKey, setAnimKey] = useState(0);
  const [activeTheme, setActiveTheme] = useState<ClassicTheme>('oxford');

  const currentTheme = THEMES[activeTheme];

  // Trigger on scroll into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Smooth count-up animation without vibration or layout shifts
  useEffect(() => {
    if (!inView) return;

    const duration = 1400; // 1.4 seconds smooth animation
    const startTime = performance.now();
    let animationFrameId: number;

    const updateAnimation = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cubic ease-out
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts(METRICS.map(m => m.target * easeOut));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateAnimation);
      } else {
        setCounts(METRICS.map(m => m.target));
      }
    };

    animationFrameId = requestAnimationFrame(updateAnimation);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, animKey]);

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCounts([0, 0, 0, 0]);
    setAnimKey(prev => prev + 1);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl overflow-hidden select-none transition-colors duration-500 ${currentTheme.containerBg} ${currentTheme.border} py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16`}
    >
      {/* Top Controls: Replay Animation & Classic Palette Switcher */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-20">
        {/* Simple & Classic Color Palette Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/20 backdrop-blur-xs border border-white/10">
          {(['oxford', 'charcoal', 'ivory', 'forest'] as ClassicTheme[]).map((themeKey) => {
            const isSelected = activeTheme === themeKey;
            const themeObj = THEMES[themeKey];

            return (
              <button
                key={themeKey}
                onClick={() => setActiveTheme(themeKey)}
                title={`Switch to ${themeObj.name}`}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {themeObj.name.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Replay Counter Animation */}
        <button
          onClick={handleReplay}
          title="Replay count-up animation"
          className="p-2 rounded-xl bg-black/20 hover:bg-black/30 border border-white/10 text-stone-300 hover:text-white transition-all cursor-pointer group"
        >
          <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
        </button>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Main Section Headline: "Placement highlights." matching reference typography */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] tracking-tight leading-tight">
            <span className={`font-sans font-extrabold ${currentTheme.headlineText}`}>
              Placement
            </span>{' '}
            <span className={`font-serif italic font-normal ${currentTheme.highlightText}`}>
              highlights.
            </span>
          </h2>
        </div>

        {/* 4 Steady Numbers Row: Rigid Height, Tabular Digits, No Wrapping, Zero Vibration */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 items-center justify-items-center">
          {METRICS.map((metric, idx) => {
            const rawCount = inView ? counts[idx] : 0;
            const formatted = metric.formatFn(rawCount);

            return (
              <div
                key={metric.id}
                className="w-full flex flex-col items-center justify-center text-center group cursor-default"
              >
                {/* Fixed-height number container: prevents any vertical or horizontal layout shifts */}
                <div className="h-14 sm:h-16 lg:h-20 flex items-center justify-center">
                  <span
                    className={`font-sans font-extrabold tracking-tight leading-none drop-shadow-xs select-none tabular-nums whitespace-nowrap text-3xl sm:text-4xl md:text-5xl lg:text-[52px] ${currentTheme.numberText}`}
                  >
                    {formatted}
                  </span>
                </div>

                {/* Clean uppercase tracked label below number */}
                <span
                  className={`text-[11px] sm:text-xs font-mono font-bold tracking-[0.24em] uppercase mt-2 sm:mt-3 block select-none ${currentTheme.labelText}`}
                >
                  {metric.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlacementHighlightsBanner;
