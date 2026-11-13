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
  const stageRef = useRef<HTMLDivElement>(null);
  
  // Continuous rotational angle state (in degrees)
  const targetAngle = useRef<number>(0);
  const currentAngle = useRef<number>(0);
  const animFrameId = useRef<number | null>(null);
  const snapTimer = useRef<NodeJS.Timeout | null>(null);

  const [displayAngle, setDisplayAngle] = useState<number>(0);

  // Drag & touch state
  const isDragging = useRef<boolean>(false);
  const dragStartY = useRef<number>(0);
  const dragStartAngle = useRef<number>(0);

  // Spacing between cards along the circular arc
  const CARD_SPACING = 18; // 18 degrees between cards
  const TOTAL_SPAN = schools.length * CARD_SPACING; // e.g. 8 * 18 = 144 degrees
  const HALF_SPAN = TOTAL_SPAN / 2; // 72 degrees

  // Initialize targetAngle matching activeSchoolId
  useEffect(() => {
    const idx = schools.findIndex(s => s.id === activeSchoolId);
    if (idx >= 0) {
      const normalizedCurrent = ((targetAngle.current % TOTAL_SPAN) + TOTAL_SPAN) % TOTAL_SPAN;
      const targetIdxAngle = idx * CARD_SPACING;
      let diff = targetIdxAngle - normalizedCurrent;
      if (diff > HALF_SPAN) diff -= TOTAL_SPAN;
      if (diff < -HALF_SPAN) diff += TOTAL_SPAN;
      targetAngle.current += diff;
    }
  }, [activeSchoolId, schools, TOTAL_SPAN, HALF_SPAN]);

  // Liquid-smooth inertia animation loop
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;
      const diff = targetAngle.current - currentAngle.current;
      if (Math.abs(diff) > 0.01) {
        currentAngle.current += diff * 0.12;
        setDisplayAngle(currentAngle.current);
      }
      animFrameId.current = requestAnimationFrame(tick);
    };

    animFrameId.current = requestAnimationFrame(tick);
    return () => {
      active = false;
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Compute current active school from angle
  const normalizedAngle = ((displayAngle % TOTAL_SPAN) + TOTAL_SPAN) % TOTAL_SPAN;
  const activeIndex = Math.min(schools.length - 1, Math.max(0, Math.round(normalizedAngle / CARD_SPACING) % schools.length));
  const activeSchool = schools[activeIndex] || schools[0];

  // Notify parent of active school change
  useEffect(() => {
    onSelectSchool(activeSchool);
  }, [activeIndex]);

  // Mouse wheel listener on stage: continuous fluid rotational scrub
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onNativeWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 4) {
        e.preventDefault();
        // Scale deltaY: continuous scrub proportional to scroll wheel velocity
        targetAngle.current += e.deltaY * 0.085;

        // Auto-snap gently to nearest card slot once scrolling stops
        if (snapTimer.current) clearTimeout(snapTimer.current);
        snapTimer.current = setTimeout(() => {
          const nearest = Math.round(targetAngle.current / CARD_SPACING) * CARD_SPACING;
          targetAngle.current = nearest;
        }, 180);
      }
    };

    el.addEventListener('wheel', onNativeWheel, { passive: false });
    return () => el.removeEventListener('wheel', onNativeWheel);
  }, [schools.length, CARD_SPACING]);

  // Drag listeners
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartY.current = e.clientY;
    dragStartAngle.current = targetAngle.current;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dy = dragStartY.current - e.clientY;
    targetAngle.current = dragStartAngle.current + dy * 0.22;
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      isDragging.current = false;
      const nearest = Math.round(targetAngle.current / CARD_SPACING) * CARD_SPACING;
      targetAngle.current = nearest;
    }
  };

  // Touch Swipe for mobile/tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
    dragStartAngle.current = targetAngle.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const dy = dragStartY.current - e.touches[0].clientY;
    targetAngle.current = dragStartAngle.current + dy * 0.24;
  };

  const handleTouchEnd = () => {
    const nearest = Math.round(targetAngle.current / CARD_SPACING) * CARD_SPACING;
    targetAngle.current = nearest;
  };

  // Chevron click actions
  const rotatePrev = () => {
    targetAngle.current = Math.round((targetAngle.current - CARD_SPACING) / CARD_SPACING) * CARD_SPACING;
  };

  const rotateNext = () => {
    targetAngle.current = Math.round((targetAngle.current + CARD_SPACING) / CARD_SPACING) * CARD_SPACING;
  };

  // Keyboard controls
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      rotateNext();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      rotatePrev();
    }
  };

  return (
    <div className="w-full space-y-10 select-none">
      {/* =========================================================================
          UNBOUNDED FULL-WIDTH STAGE (Matching Video: Semicircle stuck to right edge)
          ========================================================================= */}
      <div
        ref={stageRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-[620px] sm:h-[680px] md:h-[740px] lg:h-[780px] xl:h-[820px] overflow-hidden outline-none cursor-grab active:cursor-grabbing"
      >
        {/* Soft Background Ambiance */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-blue-100/30 blur-3xl" />
          <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-sky-200/20 blur-3xl" />
        </div>

        {/* Top-Left Cue (Matching Reference Video "CURVED PAGE FLOW") */}
        <div className="absolute top-4 sm:top-8 left-6 sm:left-12 lg:left-16 z-20 space-y-1">
          <span className="text-xs font-mono font-bold tracking-widest text-[#1E3A8A] uppercase block">
            CURVED PAGE FLOW
          </span>
          <span className="text-[11px] font-mono text-stone-500 hidden sm:block">
            Pages move around the semi-circle as you scroll
          </span>
        </div>

        {/* Orbit SVG Circular Track Guideline (Curving gracefully across the section through cards) */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" 
          aria-hidden="true"
        >
          {/* Main light blue arc line passing through the cards' action caps */}
          <path 
            d="M calc(100% - 370px) -120 A 700 700 0 0 0 calc(100% - 370px) 940" 
            fill="none" 
            stroke="#38BDF8" 
            strokeWidth="2.5" 
            strokeDasharray="6 8" 
            opacity="0.5" 
          />
        </svg>

        {/* =========================================================================
            TRUE SEMICIRCLE STUCK TO THE RIGHT (Matching Reference Video "YOUR JOURNEY")
            ========================================================================= */}
        <div 
          onClick={() => onOpenModal(activeSchool)}
          className="absolute top-1/2 -translate-y-1/2 right-0 z-30 w-[240px] sm:w-[300px] md:w-[360px] lg:w-[420px] xl:w-[460px] h-[480px] sm:h-[600px] md:h-[700px] lg:h-[780px] xl:h-[820px] rounded-l-full bg-gradient-to-br from-[#0B1E48] via-[#123068] to-[#0A1633] border-l-[6px] border-y-[6px] border-r-0 border-[#38BDF8] shadow-[-25px_0_70px_rgba(56,189,248,0.4)] flex flex-col items-center justify-center pl-8 sm:pl-14 md:pl-20 pr-4 sm:pr-8 text-white text-center cursor-pointer group transition-all duration-300 hover:shadow-[-30px_0_85px_rgba(56,189,248,0.5)]"
          title="Click to explore full curriculum"
        >
          {/* Concentric Pulsing Aura along Semicircular Arc */}
          <div className="absolute inset-y-[-14px] left-[-14px] right-0 rounded-l-full border-l border-y border-r-0 border-cyan-400/30 pointer-events-none animate-pulse" />
          <div className="absolute inset-y-[-28px] left-[-28px] right-0 rounded-l-full border-l border-y border-r-0 border-dashed border-cyan-300/20 pointer-events-none" />

          {/* Interactive Top Chevron Button (Rotate Up) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              rotatePrev();
            }}
            className="absolute top-6 sm:top-10 left-12 sm:left-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg z-20"
            aria-label="Previous programme"
            title="Previous programme"
          >
            <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* Central Semicircle Typography (Matching Reference "YOUR JOURNEY / SCROLL TO MOVE") */}
          <div className="space-y-2 sm:space-y-3 relative z-10 max-w-[220px] sm:max-w-[260px] select-none">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-cyan-300 uppercase block">
              ACADEMIC DISCIPLINES
            </span>

            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-serif font-black tracking-tight leading-[0.95] text-white drop-shadow-lg">
              YOUR<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-blue-200">
                JOURNEY
              </span>
            </h3>
            
            <div className="pt-2 flex flex-col items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-cyan-200 uppercase font-semibold flex items-center gap-1.5 drop-shadow-sm">
                <MousePointer className="w-3.5 h-3.5 animate-bounce text-cyan-300" />
                <span>SCROLL TO MOVE</span>
              </span>

              {/* Progress Count Badge */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs sm:text-sm font-mono font-bold text-white/95 bg-white/15 px-3.5 py-1 rounded-full border border-white/20 shadow-xs">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(schools.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Bottom Chevron Button (Rotate Down) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              rotateNext();
            }}
            className="absolute bottom-6 sm:bottom-10 left-12 sm:left-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg z-20"
            aria-label="Next programme"
            title="Next programme"
          >
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* =========================================================================
            BIG SUB-CONTENT DIVS (Moving Circularly Around the Semicircle)
            ========================================================================= */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {schools.map((school, index) => {
            // Compute signed angular distance from continuous displayAngle
            const baseAngle = index * CARD_SPACING;
            const rawOffset = baseAngle - displayAngle;
            // Shortest circular wrap distance around TOTAL_SPAN
            const wrappedAngle = (((rawOffset + HALF_SPAN) % TOTAL_SPAN) + TOTAL_SPAN) % TOTAL_SPAN - HALF_SPAN;

            // Only render cards within visible orbital range (-45 to +45 deg)
            if (Math.abs(wrappedAngle) > 46) return null;

            const angleRad = (wrappedAngle * Math.PI) / 180;

            // Opacity: center card is 100%. As card moves upward (< 0), it smoothly fades away to 0!
            // When coming from downward (> 0), it smoothly fades in!
            const absAngle = Math.abs(wrappedAngle);
            const opacity = Math.max(0, Math.min(1, 1 - Math.pow(absAngle / 44, 1.5)));
            const scale = Math.max(0.88, 1.02 - (absAngle / 44) * 0.12);
            const zIndex = Math.round(30 - absAngle);

            // Trajectory: radial positions follow the circular orbit around the right semicircle
            const yOffset = Math.sin(angleRad) * 360;
            const xOffset = -(1 - Math.cos(angleRad)) * 120;

            const isCurrent = absAngle < 8;

            return (
              <div
                key={school.id}
                onClick={() => {
                  if (absAngle < 6) {
                    onOpenModal(school);
                  } else {
                    targetAngle.current += wrappedAngle;
                  }
                }}
                style={{
                  top: `calc(50% + ${yOffset}px)`,
                  // Position right end of card adjacent to the semicircle on the right edge
                  right: `calc(clamp(180px, 22vw, 380px) + ${xOffset}px)`,
                  transformOrigin: 'right center',
                  transform: `translateY(-50%) rotate(${wrappedAngle}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  willChange: 'transform, opacity, top',
                }}
                className={`pointer-events-auto absolute w-[86vw] sm:w-[620px] md:w-[720px] lg:w-[820px] xl:w-[920px] h-[130px] sm:h-[150px] lg:h-[165px] rounded-3xl bg-white/95 backdrop-blur-md border cursor-pointer flex items-stretch overflow-hidden transition-shadow duration-200 group ${
                  isCurrent 
                    ? `border-stone-300 shadow-2xl ${school.glowColor} ring-2 ring-sky-400/40`
                    : 'border-stone-200/90 shadow-lg hover:shadow-xl hover:border-stone-300'
                }`}
              >
                {/* 1. LEFT NUMBER TAG (Big vibrant block matching reference 04, 03, 02, 01) */}
                <div 
                  className={`w-18 sm:w-22 md:w-26 lg:w-28 bg-gradient-to-br ${school.gradientBadge} text-white flex flex-col items-center justify-center shrink-0 rounded-l-3xl shadow-inner relative p-2`}
                >
                  <span className="font-mono font-black text-2xl sm:text-3xl md:text-4xl tracking-wider drop-shadow-sm">
                    {school.numberTag}
                  </span>
                  <school.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 mt-1" />
                  <span className="text-[9px] font-mono font-bold tracking-widest text-white/70 uppercase mt-0.5 hidden sm:block">
                    SCHOOL
                  </span>
                </div>

                {/* 2. CENTER CONTENT (Big rich details covering the section) */}
                <div className="flex-1 px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex flex-col justify-center min-w-0">
                  {/* Top Badges Row */}
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
                      {school.degrees}
                    </span>
                    <span className={`text-[9px] sm:text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${school.badgeBg}`}>
                      {school.tagline}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400 hidden xl:inline-block">
                      {school.credits}
                    </span>
                  </div>

                  {/* Main School Heading */}
                  <h4 className="text-base sm:text-lg md:text-xl lg:text-[23px] font-serif font-bold text-stone-900 tracking-tight leading-snug truncate group-hover:text-blue-900 transition-colors">
                    {school.name}
                  </h4>

                  {/* Description snippet */}
                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-1 mt-1 font-sans">
                    {school.description}
                  </p>

                  {/* Specialization Tags Row */}
                  <div className="pt-2 flex flex-wrap items-center gap-1.5 hidden sm:flex">
                    {school.specializations.slice(0, 3).map((spec, sIdx) => (
                      <span 
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] md:text-[11px] font-mono"
                      >
                        ✓ {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. RIGHT SEMICIRCULAR CAP WITH CIRCULAR ACTION BUTTON (Contours the Semicircle on the right) */}
                <div 
                  className="pr-4 sm:pr-6 md:pr-8 flex items-center justify-center shrink-0 rounded-r-full"
                  title="Explore Full Curriculum & Syllabus"
                >
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenModal(school);
                    }}
                    className={`w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${school.gradientBadge} text-white flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl cursor-pointer`}
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white ml-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom-Left Progress Bar (Matching Reference Video) */}
        <div className="absolute bottom-4 sm:bottom-8 left-6 sm:left-12 lg:left-16 z-20 flex items-center gap-3">
          <div className="w-28 sm:w-36 h-2 sm:h-2.5 bg-stone-200/90 rounded-full overflow-hidden border border-stone-300/60 p-0.5 shadow-2xs">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-75"
              style={{ width: `${Math.max(14, Math.min(100, (normalizedAngle / TOTAL_SPAN) * 100))}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-stone-500 font-bold">
            {String(activeIndex + 1).padStart(2, '0')} / {String(schools.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* =========================================================================
          ACTIVE PROGRAM PREVIEW / DETAIL ACCENT STRIP (Full Width)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-300">
          <div className="space-y-2 max-w-3xl">
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
              className="px-6 py-3.5 rounded-xl bg-[#1E3A8A] hover:bg-blue-800 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
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
    </div>
  );
};
