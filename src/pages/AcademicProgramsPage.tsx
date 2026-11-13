import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Download, 
  Award, 
  BookOpen, 
  Clock, 
  Building2, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2,
  Layers,
  Binary,
  FileCheck2,
  Briefcase,
  Radio
} from 'lucide-react';
import { gsap, ScrollTrigger } from '../utils/animations';

interface AcademicProgramsPageProps {
  onNavigate: (tab: string) => void;
}

export const AcademicProgramsPage: React.FC<AcademicProgramsPageProps> = ({ onNavigate }) => {
  const [activeRegIndex, setActiveRegIndex] = useState<number>(0);
  const regSectionRef = useRef<HTMLElement>(null);
  const regCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Regulations Data ("From First Principles" 2-Col Interactive Architecture)
  const regulationsData = [
    {
      id: '01',
      category: 'ORDINANCE 01',
      tabTitle: 'Autonomous Academic Regulations (2026–27)',
      headerTag: 'BPUT AUTONOMOUS · REGULATORY GAZETTE',
      headerDotColor: 'bg-[#1E3A8A]',
      headerTextColor: 'text-[#1E3A8A]',
      ctaLabel: 'DOWNLOAD GAZETTE PDF',
      action: () => alert('Downloading Autonomous Academic Regulations Gazette PDF (2026 Edition)...'),
      pillars: [
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: BookOpen,
          eyebrow: 'CHOICE BASED CREDIT SYSTEM (CBCS)',
          headline: '160-Credit Degree Framework',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Autonomous rules governing semester credit allocations, core discipline modules, open interdisciplinary minors, and industry elective baskets mandated by BPUT.'
        },
        {
          badgeBg: 'bg-[#047857]',
          iconColor: 'text-white',
          icon: Layers,
          eyebrow: '10-POINT SGPA & CGPA SCALE',
          headline: 'Evaluation & Grading Matrix',
          headlineColor: 'text-[#047857]',
          description:
            'Continuous internal evaluation (30%), practical laboratory continuous assessment (20%), and centralized semester-end examination (50%) with absolute letter grading.'
        },
        {
          badgeBg: 'bg-[#926315]',
          iconColor: 'text-white',
          icon: ShieldCheck,
          eyebrow: 'ACADEMIC ETHICS & COMPLIANCE',
          headline: '75% Attendance & Research Integrity',
          headlineColor: 'text-[#926315]',
          description:
            'Mandatory 75% biometric attendance required for term exams, rigorous IEEE citation standards, and automated anti-plagiarism verification for all academic submissions.'
        }
      ]
    },
    {
      id: '02',
      category: 'SCHEDULE 02',
      tabTitle: 'Academic Calendar & Examination Schedule',
      headerTag: 'SEMESTER TIMETABLES · EVALUATION CYCLE',
      headerDotColor: 'bg-[#047857]',
      headerTextColor: 'text-[#047857]',
      ctaLabel: 'DOWNLOAD CALENDAR PDF',
      action: () => alert('Downloading Official Academic Calendar 2026–27...'),
      pillars: [
        {
          badgeBg: 'bg-[#047857]',
          iconColor: 'text-white',
          icon: Clock,
          eyebrow: 'STRUCTURED INSTRUCTION DAYS',
          headline: 'Autumn & Spring Term Timelines',
          headlineColor: 'text-[#047857]',
          description:
            'Strict adherence to 90 instructional working days per academic term, schedule of mid-semester tests, project milestone reviews, and scheduled preparatory recesses.'
        },
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: FileCheck2,
          eyebrow: 'CENTRALIZED CONTROLLER OF EXAMS',
          headline: 'BPUT Autonomous Examinations',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Proctored centralized term-end examinations, external question moderation, digital script evaluation, and guaranteed grade sheet publication within 30 days.'
        },
        {
          badgeBg: 'bg-[#C41F3B]',
          iconColor: 'text-white',
          icon: Radio,
          eyebrow: 'CONTINUOUS LAB VIVAS',
          headline: 'External Board Practical Evaluations',
          headlineColor: 'text-[#C41F3B]',
          description:
            'Laboratory practical examinations conducted in presence of external university examiners, evaluating bench work, hardware demonstrations, and software builds.'
        }
      ]
    },
    {
      id: '03',
      category: 'GUIDELINES 03',
      tabTitle: 'Lateral Entry & Credit Transfer Rules',
      headerTag: 'OJEE PATHWAYS · DIPLOMA CONVERSIONS',
      headerDotColor: 'bg-[#926315]',
      headerTextColor: 'text-[#926315]',
      ctaLabel: 'VIEW GUIDELINES',
      action: () => alert('Downloading Lateral Entry Credit Transfer Guidelines 2026...'),
      pillars: [
        {
          badgeBg: 'bg-[#926315]',
          iconColor: 'text-white',
          icon: Award,
          eyebrow: 'DIRECT 2ND-YEAR B.TECH ADMISSION',
          headline: 'Polytechnic & B.Sc Lateral Entry',
          headlineColor: 'text-[#926315]',
          description:
            'Established regulatory pathway for 3-year polytechnic diploma holders and B.Sc graduates to join directly in 3rd semester B.Tech via centralized OJEE counseling.'
        },
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Binary,
          eyebrow: 'CREDIT MAPPING & BRIDGE MODULES',
          headline: 'Prior Learning Credit Recognition',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Equivalent credit exemptions for first-year engineering sciences with specialized bridge courses in computational logic, linear algebra, and data structures.'
        },
        {
          badgeBg: 'bg-[#047857]',
          iconColor: 'text-white',
          icon: Briefcase,
          eyebrow: 'CAREER ACCELERATION',
          headline: 'Accelerated Placement Induction',
          headlineColor: 'text-[#047857]',
          description:
            'Lateral scholars receive early training in coding bootcamps and resume clinics by the Directorate of Training & Placement for Day-1 campus hiring.'
        }
      ]
    }
  ];

  // ScrollTrigger: Smooth entrance for each card and sync active regulation with right sticky sidebar
  useEffect(() => {
    const ctx = gsap.context(() => {
      regCardRefs.current.forEach((card, index) => {
        if (!card) return;

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

        ScrollTrigger.create({
          trigger: card,
          start: index === regulationsData.length - 1 ? 'top 75%' : 'top 45%',
          end: index === regulationsData.length - 1 ? 'bottom 15%' : 'bottom 45%',
          onEnter: () => setActiveRegIndex(index),
          onEnterBack: () => setActiveRegIndex(index)
        });
      });
    }, regSectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToReg = (index: number) => {
    setActiveRegIndex(index);
    const targetCard = regCardRefs.current[index];
    if (targetCard) {
      const topOffset = targetCard.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* =========================================================================
          HERO SECTION: Equal size & exact gradient format as the Landing Page Hero
          ========================================================================= */}
      <section className="relative w-full h-screen min-h-[100dvh] bg-stone-950 overflow-hidden flex flex-col justify-between select-none">
        
        {/* Background Convocation Hero Image (Uploaded by user) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/academics_convocation_hero.jpg"
            alt="Academic Convocation & Graduating Scholars"
            className="w-full h-full object-cover object-center scale-102"
            onError={(e) => {
              // Fallback if needed
              (e.target as HTMLImageElement).src = '/assets/images/college_convocation_1793988239815.jpg';
            }}
          />
        </div>

        {/* Soft black gradient on the left side: Exactly matching landing page */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.94) 0%, rgba(0, 0, 0, 0.86) 28%, rgba(0, 0, 0, 0.65) 48%, rgba(0, 0, 0, 0.3) 68%, rgba(0, 0, 0, 0.08) 84%, transparent 100%)'
          }}
        />

        {/* Top subtle gradient for header legibility */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.3) 18%, transparent 35%)'
          }}
        />

        {/* Bottom subtle gradient for bottom strip */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.45) 16%, transparent 34%)'
          }}
        />

        {/* Top Spacer to preserve perfect headline spacing when navbar is fixed */}
        <div className="w-full h-24 sm:h-28 pointer-events-none select-none" aria-hidden="true" />

        {/* Hero Content Zone: Matching landing page serif headline and typography */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 w-full my-auto pb-6">
          <div className="max-w-2xl text-left">
            
            {/* Main Huge Serif Headline (Matching landing page typography) */}
            <h1 className="font-serif font-bold text-white text-5xl sm:text-6xl md:text-7xl lg:text-[78px] leading-[1.06] tracking-tight drop-shadow-md">
              Curricula &amp;<br />
              academic<br />
              excellence
            </h1>

            {/* Subtitle / Descriptive Text */}
            <p className="text-white/90 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl mt-5 drop-shadow-xs">
              Outcome-Based Technical Pedagogy approved by AICTE New Delhi and affiliated with Biju Patnaik University of Technology (BPUT), Odisha. Fostering rigorous inquiry, state-of-the-art research centers, and global placement ecosystems.
            </p>

            {/* Action CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  const target = document.getElementById('academic-regulations');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 sm:px-8 py-3.5 rounded-md bg-[#E03D2E] hover:bg-[#c93224] active:scale-98 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-red-950/40 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Syllabi</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('admissions')}
                className="px-6 py-3.5 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Admission Guidelines</span>
                <ChevronRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>

          </div>
        </div>

        {/* Hero Bottom Strip: Key Accreditations & Standards */}
        <div className="relative z-20 w-full px-4 sm:px-8 pb-7 sm:pb-9">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15 text-xs text-white/90">
            <span className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>AICTE Model Curriculum 2026</span>
            </span>
            <span className="flex items-center gap-2 font-medium">
              <Award className="w-4 h-4 text-amber-400" />
              <span>NBA Tier-1 Accredited Disciplines</span>
            </span>
            <span className="flex items-center gap-2 font-medium">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>BPUT Autonomous Regulations</span>
            </span>
            <span className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Choice Based Credit System (CBCS)</span>
            </span>
          </div>
        </div>

      </section>

      {/* =========================================================================
          Academic Regulations & Ordinances (Milestones-Style 2-Col Interactive Showcase)
          ========================================================================= */}
      <section 
        id="academic-regulations"
        ref={regSectionRef}
        className="relative w-full pt-20 sm:pt-28 pb-32 sm:pb-44 bg-[#FAF8F5] select-none border-t border-stone-200 scroll-mt-10"
      >
        {/* Background Pastel Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-12 -left-20 w-[460px] h-[460px] rounded-full bg-[#EADBEC]/65 blur-3xl" />
          <div className="absolute top-1/2 -right-24 w-[420px] h-[420px] rounded-full bg-[#E2EFE7]/70 blur-3xl" />
          <div className="absolute bottom-24 left-1/3 w-[380px] h-[380px] rounded-full bg-[#FBEFE3]/75 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* ===================================================================
                LEFT SIDE: MAIN DATA IN SERIES FORMAT
                (Bottom-to-top smooth ScrollTrigger animation, clean canvas layout)
                =================================================================== */}
            <div className="lg:col-span-7 space-y-16 sm:space-y-24 order-2 lg:order-1">
              {regulationsData.map((reg, rIdx) => {
                const isLastReg = rIdx === regulationsData.length - 1;

                return (
                  <div
                    key={reg.id}
                    ref={(el) => { regCardRefs.current[rIdx] = el; }}
                    className={`reg-card transition-all duration-300 ${
                      !isLastReg ? 'pb-16 sm:pb-20 border-b border-stone-200/80' : 'pb-24 sm:pb-36'
                    }`}
                  >
                    {/* Top Status Header Strip */}
                    <div className="flex items-center justify-between gap-4 pb-5 border-b border-stone-200/80 mb-8 sm:mb-10">
                      {/* Left: Indicator Dot + Header Tag */}
                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className={`w-2.5 h-2.5 rounded-full ${reg.headerDotColor}`} />
                        <span className={`text-xs font-mono font-bold tracking-[0.2em] uppercase ${reg.headerTextColor}`}>
                          {reg.headerTag}
                        </span>
                      </div>

                      {/* Connecting hairline rule */}
                      <div className="flex-1 h-px bg-stone-200/70 mx-3 hidden sm:block" />

                      {/* Right: Step Counter ("01", "02"...) + Action Pill */}
                      <div className="flex items-center gap-3.5 shrink-0">
                        <span className="text-xs font-mono font-bold text-stone-400">
                          {reg.id}
                        </span>

                        <button
                          onClick={reg.action}
                          className="group px-4 py-1.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300/80 text-stone-800 text-[11px] font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-2xs hover:shadow-xs"
                        >
                          <span>{reg.ctaLabel}</span>
                          <div className="w-4 h-4 rounded-full bg-stone-100 group-hover:bg-[#1E3A8A] group-hover:text-white flex items-center justify-center transition-colors">
                            <Download className="w-2.5 h-2.5 transition-transform group-hover:translate-y-0.5" />
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* 3 Stacked Pillars for this Regulation */}
                    <div className="space-y-8 sm:space-y-10">
                      {reg.pillars.map((pillar, pillarIdx) => {
                        const IconComp = pillar.icon;
                        const isLastPillar = pillarIdx === reg.pillars.length - 1;

                        return (
                          <div 
                            key={`${reg.id}-${pillarIdx}`}
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
                RIGHT SIDE: STICKY COLUMN
                =================================================================== */}
            <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-20 xl:top-24 self-start max-h-[calc(100vh-5rem)] overflow-y-auto no-scrollbar">
              <div className="pr-2 sm:pr-4">
                
                <span className="text-xs font-mono font-bold tracking-widest text-[#1E3A8A] uppercase block mb-2">
                  INSTITUTIONAL REGULATIONS
                </span>

                {/* Main Headline */}
                <h2 className="text-3xl sm:text-4xl lg:text-[38px] xl:text-[44px] font-serif font-bold text-[#111827] leading-[1.10] tracking-tight mb-3">
                  Autonomous Academic<br />
                  Ordinances &amp;<br />
                  <span className="italic font-serif text-[#1E3A8A] font-normal">Syllabi Frameworks.</span>
                </h2>

                {/* Subtitle Description */}
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 font-sans max-w-md">
                  Official regulatory gazettes, academic calendars, credit allocation frameworks, and examination schedules established under BPUT autonomous norms.
                </p>

                {/* 3 Interactive Vertical Regulation Tabs */}
                <div className="space-y-2 max-w-md">
                  {regulationsData.map((reg, idx) => {
                    const isActive = activeRegIndex === idx;

                    return (
                      <button
                        key={reg.id}
                        onClick={() => scrollToReg(idx)}
                        className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl text-left transition-all duration-300 flex items-center gap-3.5 cursor-pointer ${
                          isActive
                            ? 'bg-white text-stone-900 shadow-md border border-stone-200/90 ring-1 ring-black/5 translate-x-1.5'
                            : 'bg-transparent text-stone-800 hover:bg-white/50 border border-transparent'
                        }`}
                      >
                        {/* Circular Number Badge: 01, 02, 03 */}
                        <div 
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                            isActive
                              ? 'border-2 border-stone-900 text-stone-900 bg-stone-50'
                              : 'border border-stone-300 text-stone-400 group-hover:border-stone-400'
                          }`}
                        >
                          {reg.id}
                        </div>

                        {/* Tab Content: Category & Title */}
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block leading-tight">
                            {reg.category}
                          </span>
                          <h4 className="text-xs sm:text-[14px] font-serif font-bold text-stone-900 tracking-tight truncate leading-snug">
                            {reg.tabTitle}
                          </h4>
                        </div>

                        {/* Clean arrow on active tab */}
                        {isActive && (
                          <ArrowRight className="w-4 h-4 text-[#1E3A8A] shrink-0 stroke-[2.2]" />
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

    </div>
  );
};
