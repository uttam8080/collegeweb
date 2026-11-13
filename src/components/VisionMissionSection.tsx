import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, 
  Target, 
  GraduationCap, 
  Sparkles, 
  Atom, 
  Award, 
  Quote, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen 
} from 'lucide-react';
import { gsap, ScrollTrigger } from '../utils/animations';

interface VisionMissionSectionProps {
  onNavigate?: (tab: string) => void;
}

export const VisionMissionSection: React.FC<VisionMissionSectionProps> = ({ onNavigate }) => {
  const [activeVisionIndex, setActiveVisionIndex] = useState(0);

  const visionStatements = [
    {
      statement: 'To become a sustainable institution of excellence, advancing innovative education, research and skill development.',
      author: 'TRIDENT ACADEMY OF TECHNOLOGY · TEKKZY',
    },
    {
      statement: 'To empower every student with transformative computational fluency, research rigor, and fearless entrepreneurial thinking.',
      author: 'DIRECTORATE OF ACADEMIC EXCELLENCE',
    },
    {
      statement: 'To establish world-class collaborative ecosystems connecting academia with Fortune 500 industry leadership.',
      author: 'CENTRAL BOARD OF GOVERNANCE',
    },
  ];

  // Auto-rotate vision statements gently
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveVisionIndex((prev) => (prev + 1) % visionStatements.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [visionStatements.length]);

  const missionRef = useRef<HTMLDivElement>(null);
  const missionLineRef = useRef<HTMLDivElement>(null);

  // Buttery-smooth scroll animation: top-to-bottom reveal
  useEffect(() => {
    const el = missionRef.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>('.mission-item');
    const line = missionLineRef.current;
    const nodes = el.querySelectorAll<HTMLElement>('.mission-node');
    const cards = el.querySelectorAll<HTMLElement>('.mission-card');

    const ctx = gsap.context(() => {
      // Pre-set initial states cleanly with GPU acceleration to prevent layout flashes
      if (line) {
        gsap.set(line, { scaleY: 0, transformOrigin: 'top center', force3D: true });
      }
      gsap.set(nodes, { scale: 0.65, opacity: 0, transformOrigin: 'center center', force3D: true });
      gsap.set(cards, { opacity: 0, y: 22, force3D: true });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // 1. Draw the vertical guideline softly from top to bottom
      if (line) {
        tl.to(
          line,
          { 
            scaleY: 1, 
            duration: 1.1, 
            ease: 'power1.inOut' 
          },
          0
        );
      }

      // 2. Animate items sequentially with natural easing (no jittery bounce)
      items.forEach((item, index) => {
        const node = item.querySelector('.mission-node');
        const card = item.querySelector('.mission-card');
        const startTime = 0.15 + index * 0.28;

        if (node) {
          tl.to(
            node,
            { 
              scale: 1, 
              opacity: 1, 
              duration: 0.7, 
              ease: 'power2.out' 
            },
            startTime
          );
        }

        if (card) {
          tl.to(
            card,
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.85, 
              ease: 'power2.out' 
            },
            startTime + 0.05
          );
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const missionPoints = [
    {
      id: '01',
      icon: GraduationCap,
      text: 'To foster holistic excellence in the new generation of students.',
      subText: 'Outcome-based engineering pedagogy, experimental labs, and mentorship.',
    },
    {
      id: '02',
      icon: Atom,
      text: 'To advance innovative education, cutting-edge research, and skill development.',
      subText: 'DSIR-SIRO recognized research centers and CISCO thingQbator incubation.',
    },
    {
      id: '03',
      icon: Award,
      text: 'To instill strong ethical leadership, sustainable values, and entrepreneurial capacity.',
      subText: 'Empowering future-ready technologists with integrity and societal responsibility.',
    },
  ];

  return (
    <section className="relative w-full border-b border-stone-200 overflow-hidden select-none">
      
      {/* "Curve" Section Divider extending Academic Units Green & Dark Gradient into Vision & Mission */}
      <div className="absolute top-0 inset-x-0 overflow-hidden leading-none z-20 pointer-events-none" aria-hidden="true">
        <svg 
          viewBox="0 0 1440 64" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 lg:h-16 block"
        >
          <defs>
            <linearGradient id="academicUnitsGreenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0b6623" />
              <stop offset="45%" stopColor="#074626" />
              <stop offset="100%" stopColor="#04140c" />
            </linearGradient>
          </defs>
          <path 
            d="M0,0 Q720,64 1440,0 L1440,0 L0,0 Z" 
            fill="url(#academicUnitsGreenGrad)" 
          />
          <path 
            d="M0,0 Q720,64 1440,0" 
            stroke="rgba(52, 211, 153, 0.2)" 
            strokeWidth="1.5" 
            fill="none"
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* =========================================================================
            LEFT COLUMN (Dark Navy: "Built on a foundation of excellence.")
            ========================================================================= */}
        <div className="lg:col-span-5 bg-[#0E1726] text-white p-8 sm:p-12 lg:p-14 pt-12 sm:pt-16 lg:pt-20 flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle Ambient Radial Light in Corner */}
          <div 
            className="absolute -top-24 -left-24 w-80 h-80 bg-amber-500/[0.07] blur-3xl rounded-full pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            {/* Top Eyebrow Tag: EST. 2005 · BHUBANESWAR */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-amber-400/90">
                EST. 2005 · BHUBANESWAR
              </span>
            </div>

            {/* Main Headline (Matching First Image Typography) */}
            <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-serif font-bold text-white leading-[1.12] tracking-tight">
              Built on a<br />
              foundation of<br />
              <span className="italic font-serif text-[#E5A93C] drop-shadow-xs">excellence.</span>
            </h2>
          </div>

          {/* Authentic College Photo Showcase (Updated Fresh Images: AI Student Lab + Faculty Prototyping Inset) */}
          <div className="relative z-10 mt-6 sm:mt-8 pb-5 pr-4 max-w-[500px]">
            {/* Main Lab Photo */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src="/new-lab-main.jpg"
                alt="Student engineers collaborating in advanced AI, IoT & Robotics Research Lab"
                className="w-full h-[250px] sm:h-[290px] object-cover transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1726]/80 via-transparent to-transparent pointer-events-none" />
              
            </div>

            {/* Overlapping Inset Faculty / Testing Workbench Photo */}
            <div className="absolute -bottom-3 right-0 w-[55%] sm:w-[50%] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#0E1726] transition-transform duration-300 hover:scale-[1.03]">
              <img
                src="/new-research-inset.jpg"
                alt="Faculty mentoring research scholar on electronics testing and IoT sensor array workbench"
                className="w-full h-[145px] sm:h-[175px] object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1726]/75 via-transparent to-transparent pointer-events-none" />
              
            </div>
          </div>

        </div>

        {/* =========================================================================
            RIGHT COLUMN (Warm Ivory/Cream #FAF7F2: Our Vision & Our Mission)
            ========================================================================= */}
        <div className="lg:col-span-7 bg-[#FAF7F2] p-8 sm:p-12 lg:p-14 pt-12 sm:pt-16 lg:pt-20 flex flex-col justify-center space-y-10 sm:space-y-12">
          
          {/* =======================================================================
              1. OUR VISION BLOCK (Matching Screenshot: Amber Eye Badge + Card)
              ======================================================================= */}
          <div>
            {/* Header: Amber Eye Icon + "Our Vision" */}
            <div className="flex items-center gap-3 mb-4">

              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E293B] tracking-tight">
  Our Vision
</h3>
            </div>

            {/* Vision Statement Card (Matching Screenshot with Amber Top Accent Bar) */}
            <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-stone-200/90 border-t-[3px] border-t-[#E5A93C]">
              {/* Subtle Decorative Quote Icon Watermark */}
              <Quote className="w-8 h-8 text-[#E5A93C]/20 absolute top-5 left-5 -z-0 pointer-events-none" />

              <div className="relative z-10 pl-2">
                <p className="text-stone-800 text-base sm:text-lg font-serif italic leading-relaxed">
                  "{visionStatements[activeVisionIndex].statement}"
                </p>

                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400 mt-4">
                  —— {visionStatements[activeVisionIndex].author}
                </p>
              </div>
            </div>

            {/* 3 Pagination Indicator Dots (Matching Screenshot: • • •) */}
            <div className="flex items-center justify-center gap-2 mt-3.5">
              {visionStatements.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveVisionIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    activeVisionIndex === idx 
                      ? 'bg-[#E5A93C] w-5' 
                      : 'bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Go to vision statement ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* =======================================================================
              2. OUR MISSION BLOCK (Matching Screenshot: Blue Target + Vertical Nodes)
              ======================================================================= */}
          <div ref={missionRef}>
            {/* Header: Dark Blue Bullseye Icon + "Our Mission" */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center shadow-xs">
                <Target className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-2xl sm:text-[26px] font-serif font-bold text-[#1E293B] tracking-tight">
                Our Mission
              </h3>
            </div>

            {/* Timeline Mission Points with Vertical Connecting Guide */}
            <div className="space-y-3.5 relative">
              {/* Vertical Connecting Line on Left (Scroll-Animated from top) */}
              <div 
                ref={missionLineRef}
                className="absolute left-4 sm:left-4 top-4 bottom-4 w-0.5 bg-blue-200 pointer-events-none hidden sm:block origin-top" 
                aria-hidden="true" 
              />

              {missionPoints.map((point) => {
                const Icon = point.icon;

                return (
                  <div key={point.id} className="mission-item relative flex items-center gap-3.5 sm:gap-4">
                    {/* Left Icon Node on the Vertical Guideline */}
                    <div className="mission-node relative z-10 shrink-0 w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center shadow-xs transform-gpu">
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Mission Card (Matching Screenshot with Large "01" Watermark) */}
                    <div className="mission-card flex-1 bg-white rounded-xl p-4 sm:p-4.5 border border-stone-200/90 shadow-2xs hover:shadow-xs transition-all hover:-translate-y-0.5 flex items-center gap-3.5 sm:gap-4 transform-gpu">
                      {/* Big Watermarked Number: 01, 02, 03 */}
                      <span className="text-2xl sm:text-3xl font-serif font-bold text-blue-900/25 shrink-0 select-none">
                        {point.id}
                      </span>

                      {/* Mission Statement Text */}
                      <p className="text-stone-800 text-xs sm:text-sm font-medium leading-relaxed">
                        {point.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

