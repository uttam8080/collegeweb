import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  ArrowRight, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ExternalLink,
  MousePointer
} from 'lucide-react';

export interface SchoolProgram {
  id: string;
  name: string;
  shortName: string;
  degrees: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeBg: string;
  gradientBadge: string;
  glowColor: string;
  numberTag: string;
  enrolled: string;
  description: string;
  specializations: string[];
  labs: string[];
  credits: string;
}

interface CircularProgramsOrbitProps {
  schools: SchoolProgram[];
  activeSchoolId: string;
  onSelectSchool: (school: SchoolProgram) => void;
  onOpenModal: (school: SchoolProgram) => void;
}

export const CircularProgramsOrbit: React.FC<CircularProgramsOrbitProps> = ({
  schools,
  activeSchoolId,
  onSelectSchool,
  onOpenModal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastWheelTime = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  // Find index of currently active school
  const initialIndex = Math.max(0, schools.findIndex(s => s.id === activeSchoolId));
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex >= 0 ? initialIndex : 0);

  // Sync activeSchoolId from parent
  useEffect(() => {
    const idx = schools.findIndex(s => s.id === activeSchoolId);
    if (idx >= 0 && idx !== activeIndex) {
      setActiveIndex(idx);
    }
  }, [activeSchoolId, schools]);

  const activeSchool = schools[activeIndex] || schools[0];

  // Advance to next program (moves upward, new program fades in from bottom)
  const nextProgram = () => {
    const nextIdx = (activeIndex + 1) % schools.length;
    setActiveIndex(nextIdx);
    onSelectSchool(schools[nextIdx]);
  };

  // Return to previous program (moves downward, new program fades in from top)
  const prevProgram = () => {
    const prevIdx = (activeIndex - 1 + schools.length) % schools.length;
    setActiveIndex(prevIdx);
    onSelectSchool(schools[prevIdx]);
  };

  // Wheel listener: smoothly intercepts mouse scroll within the orbit container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onNativeWheel = (e: WheelEvent) => {
      // If user scrolls vertically inside this orbital container
      if (Math.abs(e.deltaY) > 8) {
        const now = Date.now();
        // Prevent default window scroll to capture interactive orbital stepping
        e.preventDefault();

        if (now - lastWheelTime.current > 180) {
          lastWheelTime.current = now;
          if (e.deltaY > 0) {
            nextProgram();
          } else {
            prevProgram();
          }
        }
      }
    };

    el.addEventListener('wheel', onNativeWheel, { passive: false });
    return () => el.removeEventListener('wheel', onNativeWheel);
  }, [activeIndex, schools]);

  // Touch Swipe for mobile/tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diffY) > 35) {
      if (diffY > 0) {
        nextProgram();
      } else {
        prevProgram();
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      nextProgram();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      prevProgram();
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Outer Curved Container matching reference design */}
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full min-h-[580px] lg:min-h-[640px] xl:min-h-[660px] rounded-[36px] border border-sky-200/90 bg-gradient-to-br from-white via-sky-50/25 to-blue-50/40 shadow-xl overflow-hidden select-none outline-none focus:ring-2 focus:ring-sky-400/40"
      >
        {/* Subtle Background Radial Aura */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl" />
          <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] rounded-full bg-sky-200/30 blur-3xl" />
        </div>

        {/* Top Header Pill / Cue inside container */}
        <div className="absolute top-6 left-6 sm:left-10 z-20 flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 text-stone-700 shadow-xs flex items-center gap-2 text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#1E3A8A] animate-pulse" />
            <span>CURVED ORBITAL SHOWCASE</span>
          </div>
          <span className="text-[11px] font-mono text-stone-500 hidden sm:inline-block">
            Pages move around the semi-circle
          </span>
        </div>

        {/* Orbit SVG Circular Track Guidelines */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" 
          aria-hidden="true"
        >
          {/* Radial concentric dashed orbital guides centered on the right hub */}
          <circle 
            cx="calc(100% - 150px)" 
            cy="50%" 
            r="230" 
            fill="none" 
            stroke="#38BDF8" 
            strokeWidth="1.5" 
            strokeDasharray="6 8" 
            opacity="0.35" 
          />
          <circle 
            cx="calc(100% - 150px)" 
            cy="50%" 
            r="340" 
            fill="none" 
            stroke="#38BDF8" 
            strokeWidth="1" 
            strokeDasharray="4 8" 
            opacity="0.25" 
          />
          <circle 
            cx="calc(100% - 150px)" 
            cy="50%" 
            r="460" 
            fill="none" 
            stroke="#38BDF8" 
            strokeWidth="1" 
            strokeDasharray="4 10" 
            opacity="0.18" 
          />
        </svg>

        {/* =========================================================================
            RIGHT SEMICIRCLE / CIRCLE HUB (Matching "YOUR JOURNEY / SCROLL TO MOVE" Reference)
            ========================================================================= */}
        <div 
          className="absolute -right-28 sm:-right-24 md:-right-20 lg:-right-16 xl:right-4 top-1/2 -translate-y-1/2 z-20 w-[330px] sm:w-[380px] lg:w-[430px] h-[330px] sm:h-[380px] lg:h-[430px] rounded-full bg-gradient-to-br from-[#0F2850] via-[#153E75] to-[#0A1633] border-[6px] border-[#38BDF8] shadow-[0_0_60px_rgba(56,189,248,0.35)] flex flex-col items-center justify-center p-6 text-white text-center cursor-pointer group transition-transform duration-300 hover:scale-[1.01]"
          onClick={() => onOpenModal(activeSchool)}
          title="Click to view detailed curriculum"
        >
          {/* Pulsing Concentric Outer Aura */}
          <div className="absolute inset-[-14px] rounded-full border border-cyan-400/25 pointer-events-none animate-pulse" />
          <div className="absolute inset-[-28px] rounded-full border border-dashed border-cyan-300/15 pointer-events-none animate-spin-slow" />

          {/* Interactive Navigation Chevron Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevProgram();
            }}
            className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-md"
            aria-label="Previous programme"
          >
            <ChevronUp className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Hub Content */}
          <div className="space-y-2 sm:space-y-3 px-6 max-w-xs relative z-10">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-cyan-300 uppercase block">
              ACADEMIC DISCIPLINES
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-none text-white drop-shadow-md">
              YOUR<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-blue-200">
                JOURNEY
              </span>
            </h3>
            
            <div className="pt-2 flex flex-col items-center gap-1.5">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-cyan-200 uppercase font-semibold flex items-center gap-1.5">
                <MousePointer className="w-3.5 h-3.5 animate-bounce" />
                <span>SCROLL TO MOVE</span>
              </span>
              <span className="text-xs font-mono font-bold text-white/80 bg-white/10 px-3 py-0.5 rounded-full border border-white/15">
                {String(activeIndex + 1).padStart(2, '0')} / {String(schools.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextProgram();
            }}
            className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-md"
            aria-label="Next programme"
          >
            <ChevronDown className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* =========================================================================
            CIRCULAR ORBITAL CARDS ("Pages move around semi-circle")
            ========================================================================= */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {schools.map((school, index) => {
            // Calculate signed distance along circular modulo
            const total = schools.length;
            let offset = index - activeIndex;
            // Shortest circular wrap distance
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            // Only render cards within visible orbital range (-2 to +2 steps)
            const isVisible = Math.abs(offset) <= 2;
            if (!isVisible) return null;

            // Angular step around the right semicircle (22 deg per card slot)
            const angle = offset * 22; // -44 deg (top) to +44 deg (bottom)
            
            // Opacity: center card is 100%, moving upward or downward fades smoothly
            let opacity = 1;
            let scale = 1;
            let zIndex = 30;

            if (offset === 0) {
              opacity = 1;
              scale = 1.02;
              zIndex = 30;
            } else if (Math.abs(offset) === 1) {
              opacity = 0.88;
              scale = 0.96;
              zIndex = 20;
            } else if (Math.abs(offset) === 2) {
              opacity = 0.42;
              scale = 0.90;
              zIndex = 10;
            }

            // Radius from center of right hub
            const radius = 250; // pixels
            const angleRad = (angle * Math.PI) / 180;
            
            // Card position along circular arc
            // Right edge follows circle: X = Xc - R * cos(theta), Y = Yc + R * sin(theta)
            const yOffset = Math.sin(angleRad) * radius;
            const xOffset = -(1 - Math.cos(angleRad)) * 80;

            const isCurrent = offset === 0;

            return (
              <div
                key={school.id}
                onClick={() => {
                  setActiveIndex(index);
                  onSelectSchool(school);
                }}
                style={{
                  top: `calc(50% + ${yOffset}px)`,
                  right: `calc(130px + ${xOffset}px)`,
                  transformOrigin: 'right center',
                  transform: `translateY(-50%) rotate(${angle}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: 'transform 0.45s cubic-bezier(0.2, 0.9, 0.4, 1.1), opacity 0.45s ease-out, top 0.45s ease-out'
                }}
                className={`pointer-events-auto absolute w-[360px] sm:w-[440px] md:w-[490px] lg:w-[540px] h-[100px] sm:h-[112px] rounded-3xl bg-white border cursor-pointer flex items-stretch overflow-hidden transition-shadow duration-300 group ${
                  isCurrent 
                    ? `border-stone-300 shadow-2xl ${school.glowColor} ring-2 ring-sky-400/40`
                    : 'border-stone-200/90 shadow-md hover:shadow-xl hover:border-stone-300'
                }`}
              >
                {/* 1. LEFT NUMBER TAG (Purple, Orange, Green matching reference 04, 03, 02) */}
                <div 
                  className={`w-14 sm:w-16 md:w-20 bg-gradient-to-br ${school.gradientBadge} text-white flex flex-col items-center justify-center shrink-0 rounded-l-3xl shadow-inner relative`}
                >
                  <span className="font-mono font-black text-lg sm:text-2xl tracking-wider">
                    {school.numberTag}
                  </span>
                  <school.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/80 mt-0.5" />
                </div>

                {/* 2. CENTER CONTENT (Title, Degrees, Specializations) */}
                <div className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 truncate">
                      {school.degrees.split('·')[0]}
                    </span>
                    <span className={`hidden sm:inline-block text-[9px] font-mono px-2 py-0.5 rounded-full border ${school.badgeBg}`}>
                      {school.tagline.split('&')[0]}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base md:text-lg font-serif font-bold text-stone-900 tracking-tight leading-snug truncate group-hover:text-blue-900 transition-colors">
                    {school.name}
                  </h4>

                  <p className="text-[11px] sm:text-xs text-stone-600 line-clamp-1 mt-0.5 font-sans">
                    {school.specializations.slice(0, 2).join(' · ')}
                  </p>
                </div>

                {/* 3. RIGHT SEMICIRCULAR END WITH CIRCULAR ACTION BUTTON (Contours circular hub) */}
                <div 
                  className="pr-4 sm:pr-5 flex items-center justify-center shrink-0 rounded-r-full"
                  title="Explore Syllabus"
                >
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenModal(school);
                    }}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${school.gradientBadge} text-white flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                  >
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white ml-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile / Narrow Screen Horizontal Quick Indicator */}
        <div className="absolute bottom-4 left-6 right-6 z-20 flex sm:hidden items-center justify-between bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-stone-200 text-xs font-mono">
          <span className="font-bold text-stone-800">
            {activeSchool.shortName}
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={prevProgram}
              className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-700"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button 
              onClick={nextProgram}
              className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-700"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ACTIVE PROGRAM PREVIEW / DETAIL ACCENT STRIP
          ========================================================================= */}
      <div className="rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-300">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${activeSchool.badgeBg}`}>
              {activeSchool.degrees}
            </span>
            <span className="text-xs font-mono text-stone-500">
              {activeSchool.credits} · {activeSchool.enrolled}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
            {activeSchool.name}
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {activeSchool.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            {activeSchool.specializations.map((spec, i) => (
              <span 
                key={i} 
                className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 text-[11px] font-mono"
              >
                ✓ {spec}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
          <button
            onClick={() => onOpenModal(activeSchool)}
            className="px-6 py-3 rounded-xl bg-[#1E3A8A] hover:bg-blue-800 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
          >
            <span>View Full Syllabus &amp; Labs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="text-[11px] font-mono text-stone-500 text-center flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>AICTE &amp; NBA Accredited Curriculum</span>
          </div>
        </div>
      </div>
    </div>
  );
};
