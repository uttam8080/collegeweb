import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface HighlightMetric {
  id: string;
  target: number;
  suffix: string;
  label: string;
  subtext: string;
  formatFn: (val: number) => string;
}

const METRICS: HighlightMetric[] = [
  {
    id: 'placed',
    target: 5000,
    suffix: '+',
    label: 'PLACED',
    subtext: '5,000+ Career Milestone Achieved',
    formatFn: (val: number) => `${Math.floor(val).toLocaleString('en-US')}+`,
  },
  {
    id: 'companies',
    target: 120,
    suffix: '+',
    label: 'COMPANIES',
    subtext: '120+ Global Recruiting Partners',
    formatFn: (val: number) => `${Math.floor(val)}+`,
  },
  {
    id: 'rate',
    target: 94,
    suffix: '%',
    label: 'RATE',
    subtext: '94.8% Verified Placement Rate',
    formatFn: (val: number) => `${Math.floor(val)}%`,
  },
  {
    id: 'highest',
    target: 44,
    suffix: ' LPA',
    label: 'HIGHEST',
    subtext: '₹44.0 LPA Premier Package',
    formatFn: (val: number) => `${Math.floor(val)} LPA`,
  },
];

export const PlacementHighlightsBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [scaleProgress, setScaleProgress] = useState<number>(0.75);
  const [animKey, setAnimKey] = useState(0);

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

  // Smooth count-up and growing scale animation
  useEffect(() => {
    if (!inView) return;

    const duration = 1600; // 1.6 seconds smooth animation
    const startTime = performance.now();

    let animationFrameId: number;

    const updateAnimation = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cubic ease-out
      const easeOut = 1 - Math.pow(1 - progress, 3);

      // Growing values
      setCounts(METRICS.map(m => m.target * easeOut));

      // Growing scale: 0.75 -> 1.0
      setScaleProgress(0.75 + 0.25 * easeOut);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateAnimation);
      } else {
        setCounts(METRICS.map(m => m.target));
        setScaleProgress(1);
      }
    };

    animationFrameId = requestAnimationFrame(updateAnimation);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, animKey]);

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCounts([0, 0, 0, 0]);
    setScaleProgress(0.75);
    setAnimKey(prev => prev + 1);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 select-none bg-gradient-to-br from-[#070D1E] via-[#0E1A38] to-[#0A1329] py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16"
    >
      {/* Decorative Modern Background Elements (Different from reference image) */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      {/* Top subtle accent highlight line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      {/* Ambient Radial Lighting Glows */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Replay button in the top right corner */}
      <button
        onClick={handleReplay}
        title="Replay count-up animation"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-stone-400 hover:text-white transition-all cursor-pointer group z-20"
      >
        <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
      </button>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Main Section Headline: "Placement highlights." matching reference typography */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] text-white tracking-tight leading-tight">
            <span className="font-sans font-extrabold text-white">Placement</span>{' '}
            <span className="font-serif italic font-normal text-white">highlights.</span>
          </h2>
        </div>

        {/* 4 Large Animated Numbers Row in Growing Manner */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 items-center justify-items-center">
          {METRICS.map((metric, idx) => {
            const rawCount = inView ? counts[idx] : 0;
            const formatted = metric.formatFn(rawCount);

            return (
              <div
                key={metric.id}
                className="flex flex-col items-center justify-center text-center group cursor-default"
              >
                {/* Number with growing scale and count-up */}
                <div
                  className="font-sans font-extrabold text-white tracking-tight leading-none drop-shadow-md select-none group-hover:scale-108 transition-all duration-300"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                    transform: `scale(${scaleProgress})`,
                    transformOrigin: 'center center',
                    willChange: 'transform, contents',
                  }}
                >
                  {formatted}
                </div>

                {/* Clean uppercase tracked label below number */}
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.24em] uppercase text-stone-300/90 mt-3 sm:mt-4 block select-none group-hover:text-cyan-300 transition-colors">
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
