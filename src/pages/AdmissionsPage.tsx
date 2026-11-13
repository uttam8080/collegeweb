import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Building2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Download, 
  Sparkles, 
  FileText, 
  HelpCircle, 
  BookOpen, 
  Laptop, 
  Users, 
  TrendingUp, 
  Compass, 
  ChevronRight, 
  ExternalLink,
  Check,
  Send,
  X,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Binary,
  Briefcase,
  Wrench,
  Cloud,
  FileCheck2,
  Radio
} from 'lucide-react';
import { gsap, ScrollTrigger } from '../utils/animations';

interface AdmissionsPageProps {
  onNavigate: (tab: string) => void;
  onOpenAuth?: (mode?: 'login' | 'signup') => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({ onNavigate, onOpenAuth }) => {
  // Active Program index for the sticky right column ("From First Principles" architecture)
  const [activeProgramIndex, setActiveProgramIndex] = useState<number>(0);
  const programsSectionRef = useRef<HTMLElement>(null);
  const programCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Direct Application Modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [modalProgram, setModalProgram] = useState('B.Tech (Computer Science & Engineering)');
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantScore, setApplicantScore] = useState('');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Helpdesk Inquiry form state
  const [helpdeskName, setHelpdeskName] = useState('');
  const [helpdeskEmail, setHelpdeskEmail] = useState('');
  const [helpdeskPhone, setHelpdeskPhone] = useState('');
  const [helpdeskProgram, setHelpdeskProgram] = useState('B.Tech in Computer Science & Engineering');
  const [helpdeskExam, setHelpdeskExam] = useState('JEE Main');
  const [helpdeskSubmitted, setHelpdeskSubmitted] = useState(false);

  // Program offerings data ("From First Principles" 2-Col Interactive Architecture)
  const programsData = [
    {
      id: '01',
      progKey: 'btech',
      tabCategory: 'UNDERGRADUATE',
      tabTitle: 'B.Tech Engineering (7 Disciplines)',
      headerTag: 'B.TECH · 4-YEAR UG DEGREE',
      headerDotColor: 'bg-[#1E3A8A]',
      headerTextColor: 'text-[#1E3A8A]',
      title: 'B.Tech',
      fullName: 'Bachelor of Technology',
      level: 'Undergraduate Program',
      duration: '4 Years (8 Semesters)',
      intake: '600+ Seats Across 7 Disciplines',
      annualFee: '₹89,000 / Year',
      ctaLabel: 'APPLY FOR B.TECH',
      pillars: [
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Terminal,
          eyebrow: 'AICTE APPROVED & BPUT AFFILIATED',
          headline: 'Outcome-Based Rigor',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Comprehensive 4-year engineering curriculum NBA Tier-1 accredited, with intensive hands-on laboratory immersion, Cisco thingQbator makerspace access, and faculty-mentored research patent creation.'
        },
        {
          badgeBg: 'bg-[#047857]',
          iconColor: 'text-white',
          icon: Code2,
          eyebrow: 'SPECIALIZATIONS & DISCIPLINES',
          headline: '7 Core Engineering Branches',
          headlineColor: 'text-[#047857]',
          description:
            'Computer Science & Engineering (CSE), AI & Machine Learning, Data Science, Electronics & Telecommunication (ETC), Electrical & Electronics (EEE), Mechanical Engineering (ME), and Civil Engineering (CE).'
        },
        {
          badgeBg: 'bg-[#926315]',
          iconColor: 'text-white',
          icon: Award,
          eyebrow: 'ELIGIBILITY, INTAKE & ANNUAL TUITION',
          headline: '600+ Seats · ₹89,000 / Year',
          headlineColor: 'text-[#926315]',
          description:
            'Eligibility: 10+2 with Physics & Mathematics (Min 45% aggregate; 40% for SC/ST). Official admission pathway through JEE (Main) 2026 / OJEE Web Counseling.'
        }
      ]
    },
    {
      id: '02',
      progKey: 'mca',
      tabCategory: 'POSTGRADUATE',
      tabTitle: 'MCA Cloud & Software Architecture',
      headerTag: 'MCA · 2-YEAR PG DEGREE',
      headerDotColor: 'bg-[#047857]',
      headerTextColor: 'text-[#047857]',
      title: 'MCA',
      fullName: 'Master of Computer Applications',
      level: 'Postgraduate Program',
      duration: '2 Years (4 Semesters)',
      intake: '120 Seats',
      annualFee: '₹75,000 / Year',
      ctaLabel: 'APPLY FOR MCA',
      pillars: [
        {
          badgeBg: 'bg-[#047857]',
          iconColor: 'text-white',
          icon: Cloud,
          eyebrow: 'ENTERPRISE SOFTWARE & DEVOPS',
          headline: 'Production-Scale Systems',
          headlineColor: 'text-[#047857]',
          description:
            'Advanced postgraduate software curriculum transforming graduates into senior cloud architects, DevOps engineers, distributed database specialists, and enterprise technology innovators.'
        },
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Layers,
          eyebrow: 'SPECIALIZED TRACKS',
          headline: 'Full-Stack, Cloud & Applied AI',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Specializations in Full Stack Cloud Architecture, Enterprise Software Engineering, Distributed Systems, Data Engineering, and Cybersecurity & Network Systems.'
        },
        {
          badgeBg: 'bg-[#926315]',
          iconColor: 'text-white',
          icon: FileCheck2,
          eyebrow: 'ELIGIBILITY, INTAKE & TUITION',
          headline: '120 Seats · ₹75,000 / Year',
          headlineColor: 'text-[#926315]',
          description:
            'Eligibility: BCA / B.Sc (Computer Science / Mathematics) with min 50% marks (45% for SC/ST). Admission through OJEE 2026 / NIMCET centralized web counseling.'
        }
      ]
    },
    {
      id: '03',
      progKey: 'mba',
      tabCategory: 'MANAGEMENT',
      tabTitle: 'MBA Business Administration & Analytics',
      headerTag: 'MBA · 2-YEAR PG DEGREE',
      headerDotColor: 'bg-[#926315]',
      headerTextColor: 'text-[#926315]',
      title: 'MBA',
      fullName: 'Master of Business Administration',
      level: 'Postgraduate Program',
      duration: '2 Years (4 Semesters)',
      intake: '120 Seats',
      annualFee: '₹85,000 / Year',
      ctaLabel: 'APPLY FOR MBA',
      pillars: [
        {
          badgeBg: 'bg-[#926315]',
          iconColor: 'text-white',
          icon: Briefcase,
          eyebrow: 'INDUSTRY-INTEGRATED MANAGEMENT',
          headline: 'Corporate Leadership',
          headlineColor: 'text-[#926315]',
          description:
            'Industry-integrated management degree featuring Fortune 500 corporate internships, CXO mentorship roundtables, executive case studies, and career ascendancy with multinational business conglomerates.'
        },
        {
          badgeBg: 'bg-[#C41F3B]',
          iconColor: 'text-white',
          icon: Binary,
          eyebrow: 'MANAGEMENT CONCENTRATIONS',
          headline: 'Finance, Marketing, HR & Analytics',
          headlineColor: 'text-[#C41F3B]',
          description:
            'Specialized master tracks in Financial Analytics & Banking, Digital Marketing & Transformation, Strategic Human Resource Management (HRM), and Operations & Global Supply Chain.'
        },
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Award,
          eyebrow: 'ELIGIBILITY, INTAKE & TUITION',
          headline: '120 Seats · ₹85,000 / Year',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Eligibility: Recognized Bachelor Degree in any discipline with min 50% aggregate marks (45% for reserved). Admission via CAT / MAT / XAT / CMAT / OJEE 2026.'
        }
      ]
    },
    {
      id: '04',
      progKey: 'mtech',
      tabCategory: 'RESEARCH & PG',
      tabTitle: 'M.Tech Advanced Embedded & Power Systems',
      headerTag: 'M.TECH · 2-YEAR RESEARCH DEGREE',
      headerDotColor: 'bg-[#C41F3B]',
      headerTextColor: 'text-[#C41F3B]',
      title: 'M.Tech',
      fullName: 'Master of Technology',
      level: 'Postgraduate Research Program',
      duration: '2 Years (4 Semesters)',
      intake: '36 Seats',
      annualFee: '₹70,000 / Year',
      ctaLabel: 'APPLY FOR M.TECH',
      pillars: [
        {
          badgeBg: 'bg-[#C41F3B]',
          iconColor: 'text-white',
          icon: Cpu,
          eyebrow: 'DSIR-SIRO RECOGNIZED RESEARCH',
          headline: 'Translational Research & Patents',
          headlineColor: 'text-[#C41F3B]',
          description:
            'High-rigor research-driven post-graduate engineering curriculum in DST-SIRO approved labs, focusing on patent creation, IEEE peer-reviewed publications, and direct doctoral PhD progression.'
        },
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Wrench,
          eyebrow: 'ADVANCED DISCIPLINES',
          headline: 'VLSI, AI Systems & Smart Energy',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Specializations in Computer Science & Engineering, VLSI & Embedded Systems Design, and Power Systems & Clean Renewable Energy.'
        },
        {
          badgeBg: 'bg-[#047857]',
          iconColor: 'text-white',
          icon: ShieldCheck,
          eyebrow: 'ELIGIBILITY, INTAKE & TUITION',
          headline: '36 Seats · ₹70,000 / Year',
          headlineColor: 'text-[#047857]',
          description:
            'Eligibility: B.Tech / B.E. in relevant engineering discipline with min 50% marks (45% for reserved category). Admission through GATE 2026 / OJEE PGAT.'
        }
      ]
    },
    {
      id: '05',
      progKey: 'diploma',
      tabCategory: 'POLYTECHNIC',
      tabTitle: 'Diploma Core Engineering Fundamentals',
      headerTag: 'DIPLOMA · 3-YEAR / 2-YEAR LATERAL',
      headerDotColor: 'bg-[#0D9488]',
      headerTextColor: 'text-[#0D9488]',
      title: 'Diploma',
      fullName: 'Polytechnic Engineering Diploma',
      level: 'Diploma Program',
      duration: '3 Years (Lateral: 2 Years)',
      intake: '180 Seats',
      annualFee: '₹35,000 / Year',
      ctaLabel: 'APPLY FOR DIPLOMA',
      pillars: [
        {
          badgeBg: 'bg-[#0D9488]',
          iconColor: 'text-white',
          icon: Radio,
          eyebrow: 'PRACTICAL INDUSTRY-ALIGNED TRAINING',
          headline: 'Foundational Polytechnic Rigor',
          headlineColor: 'text-[#0D9488]',
          description:
            'Practical, hands-on foundational polytechnic technical training providing direct lateral entry into 2nd year B.Tech and immediate technical employment in core industries.'
        },
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Layers,
          eyebrow: 'CORE DISCIPLINES',
          headline: 'Civil, Mechanical & Electrical',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Intensive workshop training in Civil Engineering, Mechanical Engineering, and Electrical Engineering with modern machine tools and CAD labs.'
        },
        {
          badgeBg: 'bg-[#926315]',
          iconColor: 'text-white',
          icon: CheckCircle2,
          eyebrow: 'ELIGIBILITY, INTAKE & TUITION',
          headline: '180 Seats · ₹35,000 / Year',
          headlineColor: 'text-[#926315]',
          description:
            'Eligibility: 10th Standard / Matriculation with Mathematics & Science (Min 35% marks). Direct 2nd-year lateral entry available for 12th Vocational or ITI certified holders.'
        }
      ]
    }
  ];

  // ScrollTrigger: Smooth entrance for each card and sync active program with right sticky sidebar
  useEffect(() => {
    if (!programsSectionRef.current) return;
    const ctx = gsap.context(() => {
      programCardRefs.current.forEach((card, index) => {
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
          start: index === programsData.length - 1 ? 'top 75%' : 'top 45%',
          end: index === programsData.length - 1 ? 'bottom 15%' : 'bottom 45%',
          onEnter: () => setActiveProgramIndex(index),
          onEnterBack: () => setActiveProgramIndex(index)
        });
      });
    }, programsSectionRef.current);

    return () => ctx.revert();
  }, []);

  const scrollToProgram = (index: number) => {
    setActiveProgramIndex(index);
    const targetCard = programCardRefs.current[index];
    if (targetCard) {
      const topOffset = targetCard.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenApplyModal = (programName?: string) => {
    if (programName) setModalProgram(programName);
    setIsApplyModalOpen(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone) return;
    setApplicationSubmitted(true);
    setTimeout(() => {
      setApplicationSubmitted(false);
      setIsApplyModalOpen(false);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      setApplicantScore('');
    }, 3000);
  };

  const handleHelpdeskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!helpdeskName || !helpdeskPhone) return;
    setHelpdeskSubmitted(true);
    setTimeout(() => {
      setHelpdeskSubmitted(false);
      setHelpdeskName('');
      setHelpdeskEmail('');
      setHelpdeskPhone('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-800 selection:bg-[#FF9933]/20 selection:text-[#172554]">
      
      {/* =========================================================================
          SECTION 1: HERO BANNER ("Begin your journey at Trident")
          ========================================================================= */}
      <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex flex-col justify-between overflow-hidden bg-slate-950">
        {/* Background Image: Trident Entrance Arch with Students */}
        <div className="absolute inset-0 z-0">
          <img
            src="/trident-gate-hero.jpg"
            alt="Trident Academy of Technology Campus Entrance Gate"
            className="w-full h-full object-cover object-center scale-102 filter brightness-85"
            onError={(e) => {
              // Fallback to high-res campus hero if needed
              (e.target as HTMLImageElement).src = '/assets/images/college_campus_hero_1793988186342.jpg';
            }}
          />
          {/* Subtle multi-tier dark gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
        </div>

        {/* Hero Content Area */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto pt-24 sm:pt-28 pb-12 sm:pb-16">
          <div className="max-w-2xl text-left space-y-5">
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
              Begin your journey at<br />
              <span className="text-white drop-shadow-md">Trident</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-normal drop-shadow-sm">
              Discover your potential at one of Eastern India&apos;s leading institutions. Admissions are now open for B.Tech, MCA, MBA &amp; M.Tech programs under BPUT and AICTE norms.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleOpenApplyModal()}
                className="px-6 sm:px-8 py-3.5 rounded-md bg-[#0D9488] hover:bg-[#0f766e] active:scale-98 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-teal-950/40 flex items-center gap-2 cursor-pointer"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('campus')}
                className="px-5 sm:px-6 py-3.5 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-cyan-300" />
                <span>Virtual Campus Tour</span>
              </button>
            </div>

          </div>
        </div>

        {/* Quick Facts Dark Navy Bottom Strip */}
        <div className="relative z-10 w-full bg-[#0B1528]/95 backdrop-blur-md border-t border-white/10 py-3.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>AICTE Approved New Delhi</span>
            </span>
            <span className="flex items-center gap-2 font-medium">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>BPUT Affiliated (Autonomous State Univ.)</span>
            </span>
            <span className="flex items-center gap-2 font-medium">
              <Award className="w-4 h-4 text-amber-400" />
              <span>NAAC &amp; NBA Tier-1 Accredited</span>
            </span>
            <span className="flex items-center gap-2 font-medium">
              <TrendingUp className="w-4 h-4 text-rose-400" />
              <span>94.8% Placement Success Rate</span>
            </span>
          </div>
        </div>

        {/* Decorative Wave Divider at bottom */}
        <div className="w-full overflow-hidden leading-none z-10 bg-white" aria-hidden="true">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-8 sm:h-12 fill-[#0B1528]">
            <path d="M0,0 C300,50 600,0 900,40 C1050,60 1150,20 1200,0 L1200,0 L0,0 Z" />
          </svg>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: "Where ambition takes shape." (About Institutional Legacy)
          ========================================================================= */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
        {/* Soft geometric faceted background watermark */}
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(13, 148, 136, 0.08) 0%, rgba(248, 250, 252, 0) 70%)'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Headline & Accreditation Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase block">
                ABOUT US
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1528] tracking-tight leading-[1.12]">
                Where ambition<br />
                <span className="italic font-serif font-normal text-[#0D9488]">takes shape.</span>
              </h2>

              <div className="w-16 h-1 bg-[#0D9488] rounded-full" />

              {/* Accreditation Badges Row (NAAC, NBA, AICTE, BPUT) */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
                  NAAC A+
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
                  NBA Tier-1
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
                  AICTE
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
                  BPUT Odisha
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
                  DSIR-SIRO
                </span>
              </div>
            </div>

            {/* Right Detailed Narrative Card */}
            <div className="lg:col-span-7 bg-[#FAF9F5] border border-stone-200/90 rounded-3xl p-8 sm:p-10 shadow-xs space-y-5">
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Trident Academy of Technology (TAT), Bhubaneswar is a premier engineering institution established in 2005 under the visionary DF Group. Known for academic rigor, cutting-edge research, and an exceptional faculty-student mentorship framework, Trident stands as a benchmark of technical excellence in Eastern India.
              </p>

              <p className="text-stone-600 text-sm leading-relaxed">
                Equipped with world-class laboratories, DST-SIRO recognized research centers, Cisco thingQbator IoT makerspace, and an outcome-based education model aligned with National Education Policy (NEP), we groom aspiring students into industry-ready leaders, innovators, and entrepreneurs.
              </p>

              <div className="pt-4 border-t border-stone-200/70 space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>20+ Years of Academic Excellence, Rigor &amp; Transparent Institutional Governance</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>100% Placement Assistance with 120+ Global Fortune 500 Recruiters</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>10+ Acres Lush Eco-Friendly Smart Campus Situated in Infocity, Bhubaneswar</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: "Choose your path." (Milestones-Style 2-Col Interactive Showcase)
          ========================================================================= */}
      <section 
        id="admissions-programs"
        ref={programsSectionRef}
        className="relative w-full pt-20 sm:pt-28 pb-32 sm:pb-44 bg-[#FAF8F5] select-none"
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
              {programsData.map((prog, pIdx) => {
                const isLastProg = pIdx === programsData.length - 1;

                return (
                  <div
                    key={prog.id}
                    ref={(el) => { programCardRefs.current[pIdx] = el; }}
                    className={`program-card transition-all duration-300 ${
                      !isLastProg ? 'pb-16 sm:pb-20 border-b border-stone-200/80' : 'pb-24 sm:pb-36'
                    }`}
                  >
                    {/* Top Status Header Strip */}
                    <div className="flex items-center justify-between gap-4 pb-5 border-b border-stone-200/80 mb-8 sm:mb-10">
                      {/* Left: Indicator Dot + Header Tag */}
                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className={`w-2.5 h-2.5 rounded-full ${prog.headerDotColor}`} />
                        <span className={`text-xs font-mono font-bold tracking-[0.2em] uppercase ${prog.headerTextColor}`}>
                          {prog.headerTag}
                        </span>
                      </div>

                      {/* Connecting hairline rule */}
                      <div className="flex-1 h-px bg-stone-200/70 mx-3 hidden sm:block" />

                      {/* Right: Step Counter ("01", "02"...) + Action Pill */}
                      <div className="flex items-center gap-3.5 shrink-0">
                        <span className="text-xs font-mono font-bold text-stone-400">
                          {prog.id}
                        </span>

                        <button
                          onClick={() => handleOpenApplyModal(`${prog.title} (${prog.fullName})`)}
                          className="group px-4 py-1.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300/80 text-stone-800 text-[11px] font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-2xs hover:shadow-xs"
                        >
                          <span>{prog.ctaLabel}</span>
                          <div className="w-4 h-4 rounded-full bg-stone-100 group-hover:bg-[#0D9488] group-hover:text-white flex items-center justify-center transition-colors">
                            <ArrowRight className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" />
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* 3 Stacked Pillars for this Program */}
                    <div className="space-y-8 sm:space-y-10">
                      {prog.pillars.map((pillar, pillarIdx) => {
                        const IconComp = pillar.icon;
                        const isLastPillar = pillarIdx === prog.pillars.length - 1;

                        return (
                          <div 
                            key={`${prog.id}-${pillarIdx}`}
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
                
                <span className="text-xs font-mono font-bold tracking-widest text-[#0D9488] uppercase block mb-2">
                  PROGRAMS
                </span>

                {/* Main Headline */}
                <h2 className="text-3xl sm:text-4xl lg:text-[38px] xl:text-[44px] font-serif font-bold text-[#111827] leading-[1.10] tracking-tight mb-3">
                  Choose your<br />
                  Degree<br />
                  <span className="italic font-serif text-[#0D9488] font-normal">Programs &amp; Path.</span>
                </h2>

                {/* Subtitle Description */}
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 font-sans max-w-md">
                  Explore our premier undergraduate, postgraduate, and diploma technical curricula approved by AICTE, NBA Tier-1 accredited, and affiliated with BPUT.
                </p>

                {/* 5 Interactive Vertical Program Tabs */}
                <div className="space-y-2 max-w-md">
                  {programsData.map((prog, idx) => {
                    const isActive = activeProgramIndex === idx;

                    return (
                      <button
                        key={prog.id}
                        onClick={() => scrollToProgram(idx)}
                        className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl text-left transition-all duration-300 flex items-center gap-3.5 cursor-pointer ${
                          isActive
                            ? 'bg-white text-stone-900 shadow-md border border-stone-200/90 ring-1 ring-black/5 translate-x-1.5'
                            : 'bg-transparent text-stone-800 hover:bg-white/50 border border-transparent'
                        }`}
                      >
                        {/* Circular Number Badge: 01, 02, 03... */}
                        <div 
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                            isActive
                              ? 'border-2 border-stone-900 text-stone-900 bg-stone-50'
                              : 'border border-stone-300 text-stone-400 group-hover:border-stone-400'
                          }`}
                        >
                          {prog.id}
                        </div>

                        {/* Tab Content: Category & Title */}
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block leading-tight">
                            {prog.tabCategory}
                          </span>
                          <h4 className="text-xs sm:text-[14px] font-serif font-bold text-stone-900 tracking-tight truncate leading-snug">
                            {prog.tabTitle}
                          </h4>
                        </div>

                        {/* Clean arrow on active tab */}
                        {isActive && (
                          <ArrowRight className="w-4 h-4 text-[#0D9488] shrink-0 stroke-[2.2]" />
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

      {/* =========================================================================
          SECTION 4: "Eligibility criteria."
          ========================================================================= */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
        {/* Subtle Watermark '?' on the right */}
        <div 
          className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 text-[260px] sm:text-[340px] font-black text-slate-100 select-none pointer-events-none opacity-60 leading-none"
          aria-hidden="true"
        >
          ?
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#0D9488] uppercase block">
              ADMISSIONS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1528] tracking-tight">
              Eligibility <span className="italic font-serif font-normal text-[#0D9488]">criteria.</span>
            </h2>
          </div>

          <div className="space-y-6 max-w-4xl">
            
            {/* Category 1: 1st Year B.Tech (Direct Entry) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F5] border-l-4 border-l-[#1E3A8A] border-y border-r border-stone-200/80 shadow-2xs space-y-3">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                1st Year B.Tech (Direct Entry)
              </h3>
              <ul className="text-xs sm:text-sm text-stone-700 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A] mt-2 shrink-0" />
                  <span>Passed 10+2 examination conducted by CHSE Odisha, CBSE, CISCE, or equivalent state board.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A] mt-2 shrink-0" />
                  <span>Physics and Mathematics as compulsory subjects alongside Chemistry / Biotechnology / Biology / Technical Vocational subject / Computer Science.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A] mt-2 shrink-0" />
                  <span>Obtained at least 45% aggregate marks (40% for candidates belonging to SC / ST / PwD reserved categories) in the above subjects taken together.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A] mt-2 shrink-0" />
                  <span>Qualified rank in JEE (Main) 2026 or Odisha Joint Entrance Examination (OJEE 2026).</span>
                </li>
              </ul>
            </div>

            {/* Category 2: Lateral Entry (2nd Year B.Tech) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F5] border-l-4 border-l-[#F97316] border-y border-r border-stone-200/80 shadow-2xs space-y-3">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Lateral Entry (2nd Year B.Tech)
              </h3>
              <ul className="text-xs sm:text-sm text-stone-700 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] mt-2 shrink-0" />
                  <span>Passed minimum 3 years or 2 years (Lateral Entry) Diploma examination in any branch of engineering and technology with at least 45% marks (40% in case of reserved category).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] mt-2 shrink-0" />
                  <span>OR passed B.Sc Degree from a recognized university with at least 45% marks (40% for reserved category) and passed 10+2 examination with Mathematics as a subject.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] mt-2 shrink-0" />
                  <span>Valid rank in OJEE (Lateral Entry B.Tech) centralized state counseling.</span>
                </li>
              </ul>
            </div>

            {/* Category 3: PG Programs (M.Tech / MCA / MBA) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F5] border-l-4 border-l-[#0D9488] border-y border-r border-stone-200/80 shadow-2xs space-y-3">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                PG Programs (M.Tech / MCA / MBA)
              </h3>
              <ul className="text-xs sm:text-sm text-stone-700 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] mt-2 shrink-0" />
                  <span><strong>MCA:</strong> Passed BCA / Bachelor Degree in Computer Science Engineering or equivalent with at least 50% marks (45% for SC/ST), or passed B.Sc / B.Com / B.A with Mathematics at 10+2 or Graduation. Valid OJEE / NIMCET.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] mt-2 shrink-0" />
                  <span><strong>MBA:</strong> Passed Bachelor Degree of minimum 3 years duration in any discipline with at least 50% marks (45% for reserved category). Valid score in CAT / MAT / XAT / CMAT / OJEE.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] mt-2 shrink-0" />
                  <span><strong>M.Tech:</strong> Passed B.Tech / B.E. in relevant discipline with min 50% marks (45% for reserved category). Valid GATE score or OJEE PGAT rank.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: "Scholarship support."
          ========================================================================= */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#1E1B4B] text-white overflow-hidden">
        {/* Subtle Geometric Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#A5B4FC] uppercase block">
              SCHOLARSHIPS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Scholarship <span className="italic font-serif font-normal text-[#A5B4FC]">support.</span>
            </h2>
            <p className="text-indigo-200 text-xs sm:text-sm leading-relaxed">
              We believe financial constraints should never stand in the way of exceptional academic talent. Explore our comprehensive scholarship ecosystems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Pillar 1: Merit Scholarships */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4 flex flex-col justify-between hover:bg-white/15 transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
                  <Award className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Merit Scholarships</h3>
                <p className="text-xs text-indigo-100 leading-relaxed">
                  Up to 100% tuition fee waiver for top rankers in JEE Main (AIR &lt; 50,000) and OJEE (Rank &lt; 1,000). Academic excellence cash awards and fee concessions for branch toppers across every semester.
                </p>
              </div>
              <button 
                onClick={() => alert('Merit Scholarship Guidelines: Candidates maintaining CGPA >= 8.5 qualify for annual tuition waivers under Trident Merit Policy.')}
                className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 flex items-center gap-1.5 cursor-pointer pt-2"
              >
                <span>View Merit Guidelines</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pillar 2: Government Schemes */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4 flex flex-col justify-between hover:bg-white/15 transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Government Schemes</h3>
                <p className="text-xs text-indigo-100 leading-relaxed">
                  Dedicated facilitation for Odisha State PRERANA Post-Matric Scholarship for SC/ST/OBC/SEBC students. Complete guidance for National Scholarship Portal (NSP), Medhabruti, and Pragati scholarships.
                </p>
              </div>
              <button 
                onClick={() => alert('Govt Scholarship Portal: Full verification assistance provided by the Trident Student Welfare Secretariat.')}
                className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 flex items-center gap-1.5 cursor-pointer pt-2"
              >
                <span>Government Portal Info</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pillar 3: Special Grants */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4 flex flex-col justify-between hover:bg-white/15 transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-400/20 text-rose-300 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-rose-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Special Grants</h3>
                <p className="text-xs text-indigo-100 leading-relaxed">
                  Special fee benefits for wards of Indian Armed Forces and Paramilitary personnel. Women in STEM tuition concessions, sports achiever fellowships, and seed funds for student hardware prototypes.
                </p>
              </div>
              <button 
                onClick={() => alert('Special Grants Desk: Reach out to admissions@trident.ac.in for defense and sports concession applications.')}
                className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 flex items-center gap-1.5 cursor-pointer pt-2"
              >
                <span>Apply for Special Grants</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: "Placement Highlights"
          ========================================================================= */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] text-white overflow-hidden shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Placement Highlights
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-xl mx-auto">
              Consistently recognized among Eastern India&apos;s leading technical institutions for corporate ascendancy and high-tier recruitment.
            </p>
          </div>

          {/* Big Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto pt-2">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-3xl sm:text-5xl font-black text-white block">1,203+</span>
              <span className="text-xs text-emerald-100 font-medium uppercase tracking-wider mt-1 block">Placement Offers</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-3xl sm:text-5xl font-black text-white block">28+ LPA</span>
              <span className="text-xs text-emerald-100 font-medium uppercase tracking-wider mt-1 block">Highest Package</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-3xl sm:text-5xl font-black text-white block">94.8%</span>
              <span className="text-xs text-emerald-100 font-medium uppercase tracking-wider mt-1 block">Placement Rate</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-3xl sm:text-5xl font-black text-white block">120+</span>
              <span className="text-xs text-emerald-100 font-medium uppercase tracking-wider mt-1 block">Hiring Partners</span>
            </div>
          </div>

          {/* Top Recruiters Marquee Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4 text-xs font-semibold text-emerald-950">
            {['TCS Digital', 'Infosys', 'Wipro', 'Cognizant GenC', 'Amazon AWS', 'Cisco Systems', 'Capgemini', 'Accenture', 'Tech Mahindra'].map((rec, i) => (
              <span key={i} className="px-3.5 py-1.5 rounded-full bg-white/90 shadow-sm">
                {rec}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: "Fee Structure & Seat Matrix"
          ========================================================================= */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase block">
              SEATS &amp; FEES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1528] tracking-tight">
              Fee &amp; Seat Distribution
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm">
              Approved, government-regulated tuition fee structure established by Fee Structure Committee, Govt. of Odisha and BPUT.
            </p>
          </div>

          {/* Fee Table */}
          <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm bg-white">
            <table className="w-full text-left text-xs sm:text-sm text-stone-700">
              <thead className="bg-[#FAF9F5] border-b border-stone-200 text-slate-900 font-bold uppercase text-[11px] font-mono tracking-wider">
                <tr>
                  <th className="py-4 px-6">Program</th>
                  <th className="py-4 px-6">Specialization / Discipline</th>
                  <th className="py-4 px-6 text-center">Intake</th>
                  <th className="py-4 px-6 text-center text-[#E03D2E]">Annual Tuition</th>
                  <th className="py-4 px-6">Eligibility &amp; Pathway</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {[
                  { prog: 'B.Tech', spec: 'Computer Science & Engineering (CSE)', seats: 180, fee: '₹89,000', elig: '10+2 (45%) + JEE / OJEE' },
                  { prog: 'B.Tech', spec: 'Artificial Intelligence & Machine Learning', seats: 120, fee: '₹89,000', elig: '10+2 (45%) + JEE / OJEE' },
                  { prog: 'B.Tech', spec: 'CSE (Data Science)', seats: 60, fee: '₹89,000', elig: '10+2 (45%) + JEE / OJEE' },
                  { prog: 'B.Tech', spec: 'Electronics & Telecommunication (ETC)', seats: 60, fee: '₹82,000', elig: '10+2 (45%) + JEE / OJEE' },
                  { prog: 'B.Tech', spec: 'Electrical & Electronics Engineering (EEE)', seats: 60, fee: '₹82,000', elig: '10+2 (45%) + JEE / OJEE' },
                  { prog: 'B.Tech', spec: 'Mechanical Engineering (ME)', seats: 60, fee: '₹75,000', elig: '10+2 (45%) + JEE / OJEE' },
                  { prog: 'B.Tech', spec: 'Civil Engineering (CE)', seats: 60, fee: '₹75,000', elig: '10+2 (45%) + JEE / OJEE' },
                  { prog: 'MCA', spec: 'Master of Computer Applications', seats: 120, fee: '₹75,000', elig: 'BCA / B.Sc (50%) + OJEE' },
                  { prog: 'MBA', spec: 'Master of Business Administration', seats: 120, fee: '₹85,000', elig: 'Graduation (50%) + CAT/MAT/OJEE' },
                  { prog: 'M.Tech', spec: 'Computer Science & Engineering', seats: 18, fee: '₹70,000', elig: 'B.Tech (50%) + GATE / OJEE' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-slate-900">{row.prog}</td>
                    <td className="py-3.5 px-6 text-stone-800">{row.spec}</td>
                    <td className="py-3.5 px-6 text-center font-mono font-semibold">{row.seats}</td>
                    <td className="py-3.5 px-6 text-center font-bold text-[#E03D2E] font-mono">{row.fee}</td>
                    <td className="py-3.5 px-6 text-xs text-stone-500">{row.elig}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={() => alert('Downloading official BPUT Gazette Tuition Fee Structure (Academic Session 2026–27)...')}
              className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Fee Gazette PDF (2026 Edition)</span>
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8: "Five steps to enrollment."
          ========================================================================= */}
      <section className="relative py-16 sm:py-24 bg-[#FAF9F5] overflow-hidden">
        {/* Giant Watermark '5' on the Right */}
        <div 
          className="absolute right-6 sm:right-16 top-1/2 -translate-y-1/2 text-[300px] sm:text-[440px] font-black text-slate-200 select-none pointer-events-none opacity-40 leading-none"
          aria-hidden="true"
        >
          5
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#F97316] uppercase block">
              ADMISSIONS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1528] tracking-tight">
              Five steps to <span className="italic font-serif font-normal text-[#F97316]">enrollment.</span>
            </h2>
            <p className="text-stone-600 text-sm max-w-xl">
              A streamlined, transparent admissions roadmap from your first inquiry to campus induction.
            </p>
          </div>

          {/* Sequential Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 relative">
            {[
              {
                step: '01',
                title: 'Inquire & Register',
                desc: 'Fill out online pre-registration or visit campus Admissions Desk for personal counseling.',
                iconBg: 'bg-[#4F46E5]',
              },
              {
                step: '02',
                title: 'Choice Filling',
                desc: 'Appear for JEE Main / OJEE and select Trident Academy of Technology (TAT) in web counseling.',
                iconBg: 'bg-[#0D9488]',
              },
              {
                step: '03',
                title: 'Doc Verification',
                desc: 'Submit original 10th & 12th marksheets, rank card, conduct and domicile certificates.',
                iconBg: 'bg-[#F97316]',
              },
              {
                step: '04',
                title: 'Seat Allocation',
                desc: 'Receive provisional admission offer letter and complete the semester fee payment.',
                iconBg: 'bg-[#E03D2E]',
              },
              {
                step: '05',
                title: 'Campus Induction',
                desc: 'Join 2-week Foundation Induction bootcamp, meet faculty mentors, and start classes.',
                iconBg: 'bg-[#047857]',
              },
            ].map((st, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow relative"
              >
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-full ${st.iconBg} text-white font-mono font-bold text-sm flex items-center justify-center shadow-sm`}>
                    {st.step}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {st.title}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 9: "Mandatory examinations."
          ========================================================================= */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
        {/* Giant Watermark 'JEE' */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[200px] sm:text-[340px] font-black text-slate-100 select-none pointer-events-none opacity-50 tracking-widest"
          aria-hidden="true"
        >
          JEE
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
          
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#F97316] uppercase block">
              ENTRANCE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1528] tracking-tight">
              Mandatory <span className="italic font-serif font-normal text-[#F97316]">examinations.</span>
            </h2>
            <p className="text-stone-600 text-sm max-w-xl">
              Official entrance examinations recognized for admission to undergraduate and postgraduate degrees at Trident.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            
            {/* JEE Main Card */}
            <div className="p-8 rounded-3xl bg-[#FAF9F5] border border-stone-200/90 shadow-2xs space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-[#1E3A8A] tracking-wider">
                  JEE Main
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">
                  National Level
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                Joint Entrance Examination conducted by National Testing Agency (NTA), Govt. of India. Primary entrance exam for 1st Year B.Tech admissions across Eastern India.
              </p>
              <ul className="text-xs text-stone-600 space-y-2 pt-2 border-t border-stone-200">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-700" />
                  <span>Physics, Chemistry &amp; Mathematics (Paper 1 B.E./B.Tech)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-700" />
                  <span>Centralized counseling via CSAB / OJEE web portal</span>
                </li>
              </ul>
            </div>

            {/* OJEE Card */}
            <div className="p-8 rounded-3xl bg-[#FAF9F5] border border-stone-200/90 shadow-2xs space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-[#F97316] tracking-wider">
                  OJEE
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-[11px] font-bold">
                  State Level
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                Odisha Joint Entrance Examination conducted by OJEE Board, Skill Development &amp; Technical Education Dept. Gateway for B.Tech Lateral Entry, MCA, MBA &amp; M.Tech.
              </p>
              <ul className="text-xs text-stone-600 space-y-2 pt-2 border-t border-stone-200">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-orange-700" />
                  <span>State rank card &amp; seat allocation via OJEE web counseling</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-orange-700" />
                  <span>Full on-campus counseling assistance at Trident Admissions Desk</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 10: "Admission Helpdesk"
          ========================================================================= */}
      <section className="relative py-16 sm:py-24 bg-[#0B1528] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-2xl space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Admission Helpdesk
            </h2>
            <p className="text-slate-300 text-sm">
              Get in touch with our admissions deans and counseling secretariat for personalized guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Contact Directory */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-mono block">Direct Telephonic Helplines</span>
                    <a href="tel:+919861191195" className="text-lg font-bold text-white hover:text-cyan-300 transition-colors block">
                      +91 98611 91195
                    </a>
                    <a href="tel:+916742740555" className="text-sm text-slate-300 hover:text-cyan-300 transition-colors block">
                      +91 674 274-0555
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-mono block">Official Admissions Email</span>
                    <a href="mailto:admissions@trident.ac.in" className="text-sm font-semibold text-white hover:text-amber-300 transition-colors">
                      admissions@trident.ac.in
                    </a>
                    <p className="text-xs text-slate-400">info@trident.ac.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-mono block">Counseling Office Hours</span>
                    <span className="text-sm text-white font-medium block">
                      Monday – Saturday: 09:00 AM – 06:00 PM IST
                    </span>
                    <span className="text-xs text-slate-400">Sunday open during OJEE counseling rounds</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-mono block">Campus Address</span>
                    <span className="text-sm text-white font-medium block leading-relaxed">
                      F2/A, Chandaka Industrial Estate, In front of Infocity, Patia, Bhubaneswar, Odisha, Pin: 751024
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Inquiry Form */}
            <div className="lg:col-span-6 bg-white/5 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-1">
                Direct Inquiry Helpline
              </h3>
              <p className="text-xs text-slate-300 mb-6">
                Submit your query and our admissions counselor will reach out within 2 hours.
              </p>

              {helpdeskSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Inquiry Transmitted!</h4>
                  <p className="text-xs text-emerald-200">
                    Thank you, <strong>{helpdeskName}</strong>. Our admissions officer will contact you at <strong>{helpdeskPhone}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleHelpdeskSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Candidate Full Name *</label>
                    <input
                      type="text"
                      required
                      value={helpdeskName}
                      onChange={(e) => setHelpdeskName(e.target.value)}
                      placeholder="e.g. Suman Mohapatra"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={helpdeskPhone}
                        onChange={(e) => setHelpdeskPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                      <input
                        type="email"
                        value={helpdeskEmail}
                        onChange={(e) => setHelpdeskEmail(e.target.value)}
                        placeholder="suman@gmail.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Program of Interest</label>
                      <select
                        value={helpdeskProgram}
                        onChange={(e) => setHelpdeskProgram(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs focus:outline-none focus:border-cyan-400"
                      >
                        <option>B.Tech in Computer Science &amp; Engineering</option>
                        <option>B.Tech in AI &amp; Machine Learning</option>
                        <option>B.Tech in Data Science</option>
                        <option>B.Tech in Electronics &amp; Telecom</option>
                        <option>B.Tech in Electrical &amp; Electronics</option>
                        <option>B.Tech (Lateral Entry)</option>
                        <option>MCA (Master of Computer App)</option>
                        <option>MBA (Master of Business Admin)</option>
                        <option>M.Tech</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Entrance Examination</label>
                      <select
                        value={helpdeskExam}
                        onChange={(e) => setHelpdeskExam(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs focus:outline-none focus:border-cyan-400"
                      >
                        <option>JEE Main 2026</option>
                        <option>OJEE 2026</option>
                        <option>CAT / MAT / CMAT</option>
                        <option>GATE</option>
                        <option>Appearing in 10+2 / Diploma</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-2 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry to Admissions Desk</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE DIRECT APPLICATION MODAL
          ========================================================================= */}
      {isApplyModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsApplyModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#0B1528] text-white p-6 relative">
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-[11px] font-mono font-bold tracking-widest text-[#22D3EE] uppercase block mb-1">
                Admissions Portal · Batch 2026–27
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Apply for Admission
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {modalProgram}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              {applicationSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Application Registered!</h4>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{applicantName}</strong>. Your provisional application for <strong>{modalProgram}</strong> has been logged. Our admissions directorate will contact you at <strong>{applicantPhone}</strong> within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleModalSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Applicant Full Name *</label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#0B1528] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#0B1528] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Email Address</label>
                      <input
                        type="email"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="rahul@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#0B1528] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">10+2 / Degree %</label>
                      <input
                        type="text"
                        value={applicantScore}
                        onChange={(e) => setApplicantScore(e.target.value)}
                        placeholder="e.g. 84.5%"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#0B1528] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Target Program</label>
                      <select
                        value={modalProgram}
                        onChange={(e) => setModalProgram(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#0B1528] focus:outline-none bg-white"
                      >
                        <option>B.Tech (Computer Science &amp; Engineering)</option>
                        <option>B.Tech (AI &amp; Machine Learning)</option>
                        <option>B.Tech (Data Science)</option>
                        <option>B.Tech (Electronics &amp; Telecom)</option>
                        <option>B.Tech (Electrical &amp; Electronics)</option>
                        <option>B.Tech (Mechanical Engineering)</option>
                        <option>B.Tech (Civil Engineering)</option>
                        <option>B.Tech (Lateral Entry 2nd Year)</option>
                        <option>MCA (Master of Computer App)</option>
                        <option>MBA (Master of Business Admin)</option>
                        <option>M.Tech</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-500 leading-relaxed pt-1">
                    By submitting, you agree to receive admission counseling alerts via SMS/WhatsApp under BPUT/OJEE regulations.
                  </p>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsApplyModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-bold tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

