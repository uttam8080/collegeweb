import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Award, Building2, Users } from 'lucide-react';

interface StatItem {
  id: string;
  icon: React.ElementType;
  valuePrefix?: string;
  targetNumber: number;
  decimals?: number;
  suffix: string;
  label: string;
}

interface StatsBannerProps {
  onNavigate?: (tab: string) => void;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  const stats: StatItem[] = [
    {
      id: 'stat-highest',
      icon: TrendingUp,
      valuePrefix: '₹',
      targetNumber: 7.5,
      decimals: 1,
      suffix: ' LPA',
      label: 'HIGHEST PACKAGE',
    },
    {
      id: 'stat-average',
      icon: Award,
      valuePrefix: '₹',
      targetNumber: 4.5,
      decimals: 1,
      suffix: ' LPA',
      label: 'AVERAGE PACKAGE',
    },
    {
      id: 'stat-companies',
      icon: Building2,
      targetNumber: 120,
      decimals: 0,
      suffix: '+',
      label: 'COMPANIES VISITED',
    },
    {
      id: 'stat-rate',
      icon: Users,
      targetNumber: 94,
      decimals: 0,
      suffix: '%',
      label: 'PLACEMENT RATE',
    },
  ];

  // Smooth Count-Up Animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1400;
          const startTime = performance.now();

          const updateCounter = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts(
              stats.map((s) => {
                const val = s.targetNumber * easeOut;
                return s.decimals && s.decimals > 0
                  ? parseFloat(val.toFixed(s.decimals))
                  : Math.floor(val);
              })
            );

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#991B1B] border-b border-[#7F1D1D] overflow-hidden py-10 md:py-14"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 4 Clean Columns with Simple White Vertical Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.id}
                onClick={() => onNavigate?.('placements')}
                className={`relative px-4 sm:px-6 py-7 sm:py-6 flex flex-col items-center justify-center text-center cursor-pointer transition-transform duration-200 hover:-translate-y-0.5 ${
                  idx !== 0 ? 'lg:border-l lg:border-white/20' : ''
                } ${idx % 2 !== 0 ? 'sm:border-l sm:border-white/20 lg:border-l' : ''}`}
              >
                {/* Simple Rounded Square Icon */}
                <div className="relative z-10 mb-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center text-white shadow-2xs">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                </div>

                {/* Big Clean Serif Number in Pure White */}
                <div className="relative z-10 min-h-[3rem] flex items-baseline justify-center">
                  <h3 className="text-4xl sm:text-[42px] lg:text-[46px] font-serif font-bold text-white tracking-tight leading-none drop-shadow-xs">
                    {stat.valuePrefix && (
                      <span className="text-amber-200 mr-0.5">{stat.valuePrefix}</span>
                    )}
                    {hasAnimated
                      ? (stat.decimals ? counts[idx].toFixed(stat.decimals) : counts[idx])
                      : (stat.decimals ? stat.targetNumber.toFixed(stat.decimals) : stat.targetNumber)}
                    <span className="text-3xl sm:text-4xl font-serif font-bold ml-0.5 text-rose-100">
                      {stat.suffix}
                    </span>
                  </h3>
                </div>

                {/* Simple Uppercase Tracked Label */}
                <p className="relative z-10 text-[11px] sm:text-xs font-sans font-semibold tracking-[0.22em] uppercase text-rose-100 mt-3 leading-snug">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
