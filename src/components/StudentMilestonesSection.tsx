import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Cpu, 
  Layers, 
  Award, 
  ArrowRight,
  Code2,
  Binary,
  Wrench,
  Radio,
  Cloud,
  FileCheck2,
  Briefcase
} from 'lucide-react';
import { gsap, ScrollTrigger } from '../utils/animations';

interface StudentMilestonesSectionProps {
  onNavigate?: (tab: string) => void;
}

export const StudentMilestonesSection: React.FC<StudentMilestonesSectionProps> = ({ onNavigate }) => {
  const [activeYearIndex, setActiveYearIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const yearCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // The 4-Year Academic Progression Data ("From First Principles to Global Impact")
  const years = [
    {
      id: '01',
      category: 'YEAR 01',
      tabTitle: 'Foundational Rigor & Logic',
      headerTag: 'YEAR 01 · COMPUTATIONAL LOGIC',
      headerDotColor: 'bg-[#1E3A8A]',
      headerTextColor: 'text-[#1E3A8A]',
      ctaLabel: 'EXPLORE YEAR 1',
      ctaTarget: 'programs',
      pillars: [
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Terminal,
          eyebrow: 'CORE COMPUTATIONAL FOUNDATION',
          headline: 'From First Principles',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Establish unshakeable fundamentals in mathematical calculus, discrete structures, and procedural computing. First-year engineers spend 120+ hours in hands-on Linux shell environments, writing optimized algorithms and building real CLI tools.'
        },
        {
          badgeBg: 'bg-[#047857]',
          iconColor: 'text-white',
          icon: Code2,
          eyebrow: 'HANDS-ON LAB PRACTICAL RATIO',
          headline: '100%',
          headlineColor: 'text-[#047857]',
          description:
            'Mastering Advanced C & Modern Python 3.12, Discrete Mathematics, Linear Algebra, and Linux Kernel Git workflows with full practical bench immersion.'
        },
        {
          badgeBg: 'bg-[#926315]',
          iconColor: 'text-white',
          icon: Binary,
          eyebrow: 'ANNUAL CAPSTONE DELIVERABLE',
          headline: '10+ Projects',
          headlineColor: 'text-[#926315]',
          description:
            'Every student builds and deploys 10+ algorithmic projects and completes a mandatory 48-hour competitive prototype hackathon before advancing.'
        }
      ]
    },
    {
      id: '02',
      category: 'YEAR 02',
      tabTitle: 'Maker Hubs & IoT Prototyping',
      headerTag: 'YEAR 02 · HARDWARE & EMBEDDED',
      headerDotColor: 'bg-[#047857]',
      headerTextColor: 'text-[#047857]',
      ctaLabel: 'EXPLORE YEAR 2',
      ctaTarget: 'programs',
      pillars: [
        {
          badgeBg: 'bg-[#047857]',
          iconColor: 'text-white',
          icon: Cpu,
          eyebrow: 'CISCO THINGQBATOR MAKER SPACE',
          headline: 'Breadboards to Silicon',
          headlineColor: 'text-[#047857]',
          description:
            'Step directly into the CISCO thingQbator Maker Space. Students design custom multi-layer PCBs, program low-power LoRaWAN sensor nodes, 3D print enclosures, and interface microcontrollers with industrial cloud endpoints.'
        },
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Wrench,
          eyebrow: 'FUNCTIONAL COE PROTOTYPES BUILT',
          headline: '320+',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Hands-on mastery of ESP32 and ARM Cortex firmware, Cadence EDA PCB milling, relational SQL databases, and industrial LoRaWAN telemetry.'
        },
        {
          badgeBg: 'bg-[#926315]',
          iconColor: 'text-white',
          icon: Radio,
          eyebrow: 'FIELD LAB VALIDATION',
          headline: 'Autonomous Hardware',
          headlineColor: 'text-[#926315]',
          description:
            'Bench-tested physical devices deployed across smart campus agricultural beds, solar arrays, and environmental sensor networks.'
        }
      ]
    },
    {
      id: '03',
      category: 'YEAR 03',
      tabTitle: 'Enterprise Architecture & AI',
      headerTag: 'YEAR 03 · SYSTEMS & INTERNSHIPS',
      headerDotColor: 'bg-[#926315]',
      headerTextColor: 'text-[#926315]',
      ctaLabel: 'EXPLORE YEAR 3',
      ctaTarget: 'programs',
      pillars: [
        {
          badgeBg: 'bg-[#926315]',
          iconColor: 'text-white',
          icon: Layers,
          eyebrow: 'DEEP TRACK SPECIALIZATIONS',
          headline: 'Enterprise Architecture',
          headlineColor: 'text-[#926315]',
          description:
            'Specialize deeply in Generative AI, VLSI Microelectronics, Cloud Native DevOps, or Enterprise Cybersecurity with industry-guided curricular rigor.'
        },
        {
          badgeBg: 'bg-[#C41F3B]',
          iconColor: 'text-white',
          icon: Briefcase,
          eyebrow: 'MANDATORY INDUSTRY IMMERSION',
          headline: '8 Weeks',
          headlineColor: 'text-[#C41F3B]',
          description:
            'Every student undertakes a compulsory 8-week corporate summer internship with Fortune 500 tech partners and research centers.'
        },
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Cloud,
          eyebrow: 'ENTERPRISE PRODUCTION DEPLOYMENT',
          headline: 'Cloud-Native Scale',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Building distributed microservices, Docker & Kubernetes CI/CD pipelines, Kafka streaming engines, and deep neural vision networks.'
        }
      ]
    },
    {
      id: '04',
      category: 'YEAR 04',
      tabTitle: 'Capstones & Day-1 Placements',
      headerTag: 'YEAR 04 · PATENTS & CAREERS',
      headerDotColor: 'bg-[#C41F3B]',
      headerTextColor: 'text-[#C41F3B]',
      ctaLabel: 'EXPLORE PLACEMENTS',
      ctaTarget: 'placements',
      pillars: [
        {
          badgeBg: 'bg-[#C41F3B]',
          iconColor: 'text-white',
          icon: Award,
          eyebrow: 'PATENT FILING & IPR GRANTS',
          headline: 'Translational Impact',
          headlineColor: 'text-[#C41F3B]',
          description:
            'Culminate with a faculty-advised capstone project eligible for DSIR-SIRO institutional patent funding, startup incubation seed grants, and publication.'
        },
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: FileCheck2,
          eyebrow: 'AVERAGE DREAM CAMPUS OFFER',
          headline: '₹7.5 LPA',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Targeted coaching for Tier-1 corporate drives, high-concurrency system design interviews, and competitive international fellowships.'
        },
        {
          badgeBg: 'bg-[#047857]',
          iconColor: 'text-white',
          icon: Briefcase,
          eyebrow: 'CAREER COMMENCEMENT',
          headline: 'Day-1 Recruited',
          headlineColor: 'text-[#047857]',
          description:
            'Graduating as verified engineers joining global technology leaders, premier research laboratories, and high-growth venture-backed startups.'
        }
      ]
    }
  ];

  // ScrollTrigger: Smooth entrance for each card and sync active year with right sticky sidebar
  useEffect(() => {
    const ctx = gsap.context(() => {
      yearCardRefs.current.forEach((card, index) => {
        if (!card) return;

        // Smooth bottom-to-top entrance animation
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );

        // Update active index for the sticky right column as each card passes through viewport
        ScrollTrigger.create({
          trigger: card,
          start: index === 3 ? 'top 75%' : 'top 45%',
          end: index === 3 ? 'bottom 15%' : 'bottom 45%',
          onEnter: () => setActiveYearIndex(index),
          onEnterBack: () => setActiveYearIndex(index)
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth scroll to target year when clicking the sticky tab on the right
  const scrollToYear = (index: number) => {
    setActiveYearIndex(index);
    const targetCard = yearCardRefs.current[index];
    if (targetCard) {
      const topOffset = targetCard.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full pt-20 sm:pt-28 pb-32 sm:pb-48 bg-[#FAF8F5] border-b border-stone-200 select-none"
    >
      {/* Background Pastel Geometric Shapes (Isolated in clipped container to avoid overflow-hidden on section) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-12 -left-20 w-[460px] h-[460px] rounded-full bg-[#EADBEC]/65 blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-[420px] h-[420px] rounded-full bg-[#E2EFE7]/70 blur-3xl" />
        <div className="absolute bottom-24 left-1/3 w-[380px] h-[380px] rounded-full bg-[#FBEFE3]/75 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* ===================================================================
              LEFT SIDE: MAIN DATA IN SERIES FORMAT
              (Comes one by one from bottom to top smoothly as series type.
               No white background box; content sits cleanly on canvas)
              =================================================================== */}
          <div className="lg:col-span-7 space-y-16 sm:space-y-24 order-2 lg:order-1">
            {years.map((year, yIdx) => {
              const isLastYear = yIdx === years.length - 1;

              return (
                <div
                  key={year.id}
                  ref={(el) => { yearCardRefs.current[yIdx] = el; }}
                  className={`year-card transition-all duration-300 ${
                    !isLastYear ? 'pb-16 sm:pb-20 border-b border-stone-200/80' : 'pb-24 sm:pb-36'
                  }`}
                >
                  {/* Top Status Header Strip */}
                  <div className="flex items-center justify-between gap-4 pb-5 border-b border-stone-200/80 mb-8 sm:mb-10">
                    {/* Left: Indicator Dot + Category Title */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className={`w-2.5 h-2.5 rounded-full ${year.headerDotColor}`} />
                      <span className={`text-xs font-mono font-bold tracking-[0.2em] uppercase ${year.headerTextColor}`}>
                        {year.headerTag}
                      </span>
                    </div>

                    {/* Connecting hairline rule */}
                    <div className="flex-1 h-px bg-stone-200/70 mx-3 hidden sm:block" />

                    {/* Right: Step Counter ("01", "02", "03", "04") + Action Pill */}
                    <div className="flex items-center gap-3.5 shrink-0">
                      <span className="text-xs font-mono font-bold text-stone-400">
                        {year.id}
                      </span>

                      <button
                        onClick={() => onNavigate && onNavigate(year.ctaTarget)}
                        className="group px-4 py-1.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300/80 text-stone-800 text-[11px] font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-2xs hover:shadow-xs"
                      >
                        <span>{year.ctaLabel}</span>
                        <div className="w-4 h-4 rounded-full bg-stone-100 group-hover:bg-[#1E3A8A] group-hover:text-white flex items-center justify-center transition-colors">
                          <ArrowRight className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* 3 Stacked Pillars for this Year with Minimal Gap */}
                  <div className="space-y-8 sm:space-y-10">
                    {year.pillars.map((pillar, pIdx) => {
                      const IconComp = pillar.icon;
                      const isLastPillar = pIdx === year.pillars.length - 1;

                      return (
                        <div 
                          key={`${year.id}-${pIdx}`}
                          className={`flex items-start gap-4 sm:gap-6 ${
                            !isLastPillar ? 'pb-8 sm:pb-10 border-b border-stone-200/80' : ''
                          }`}
                        >
                          {/* Rounded Icon Badge */}
                          <div 
                            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl shrink-0 flex items-center justify-center shadow-xs transition-transform duration-300 hover:scale-105 ${pillar.badgeBg} ${pillar.iconColor}`}
                          >
                            <IconComp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                          </div>

                          {/* Right Text Block */}
                          <div className="flex-1 min-w-0">
                            {/* Eyebrow Label */}
                            <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.16em] uppercase text-stone-400 mb-1.5">
                              {pillar.eyebrow}
                            </div>

                            {/* Large Bold Headline */}
                            <h3 
                              className={`text-2xl sm:text-3xl lg:text-[38px] font-serif font-bold tracking-tight leading-tight mb-2.5 ${pillar.headlineColor}`}
                            >
                              {pillar.headline}
                            </h3>

                            {/* Descriptive Paragraph */}
                            <p className="text-stone-600 text-xs sm:text-sm sm:leading-relaxed font-sans max-w-xl">
                              {pillar.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===================================================================
              RIGHT SIDE: FIXED / STATIC FROM SECTION START TO SECTION END
              (Compact vertical footprint so all 4 tabs fit on all screen heights)
              =================================================================== */}
          <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-20 xl:top-24 self-start max-h-[calc(100vh-5rem)] overflow-y-auto no-scrollbar">
            <div className="pr-2 sm:pr-4">
              
              {/* Main Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[38px] xl:text-[44px] font-serif font-bold text-[#111827] leading-[1.10] tracking-tight mb-3">
                From First<br />
                Principles<br />
                <span className="italic font-serif text-[#6B7280] font-normal">to Global Impact.</span>
              </h2>

              {/* Subtitle Description */}
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 font-sans max-w-md">
                Explore the structured four-year progression engineered to transform aspiring students into published researchers, patent holders, and industry leaders.
              </p>

              {/* 4 Interactive Vertical Year Tabs */}
              <div className="space-y-2 max-w-md">
                {years.map((year, idx) => {
                  const isActive = activeYearIndex === idx;

                  return (
                    <button
                      key={year.id}
                      onClick={() => scrollToYear(idx)}
                      className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl text-left transition-all duration-300 flex items-center gap-3.5 cursor-pointer ${
                        isActive
                          ? 'bg-white text-stone-900 shadow-md border border-stone-200/90 ring-1 ring-black/5 translate-x-1.5'
                          : 'bg-transparent text-stone-800 hover:bg-white/50 border border-transparent'
                      }`}
                    >
                      {/* Circular Number Badge: 01, 02, 03, 04 */}
                      <div 
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                          isActive
                            ? 'border-2 border-stone-900 text-stone-900 bg-stone-50'
                            : 'border border-stone-300 text-stone-400 group-hover:border-stone-400'
                        }`}
                      >
                        {year.id}
                      </div>

                      {/* Tab Content: Category & Title */}
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block leading-tight">
                          {year.category}
                        </span>
                        <h4 className="text-xs sm:text-[14px] font-serif font-bold text-stone-900 tracking-tight truncate leading-snug">
                          {year.tabTitle}
                        </h4>
                      </div>

                      {/* Clean arrow on active tab */}
                      {isActive && (
                        <ArrowRight className="w-4 h-4 text-stone-900 shrink-0 stroke-[2.2]" />
                      )}
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
