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
  // Active School index for sticky left showcase
  const [activeSchoolIndex, setActiveSchoolIndex] = useState<number>(0);
  const programsSectionRef = useRef<HTMLElement>(null);
  const scholarshipSectionRef = useRef<HTMLElement>(null);
  const placementSectionRef = useRef<HTMLElement>(null);
  const schoolRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  // School offerings & categorized disciplines data matching reference design
  const schoolsData = [
    {
      id: '01',
      title: 'School of Engineering',
      motto: 'BUILDING THE FUTURE, ONE INNOVATION AT A TIME',
      image: '/admissions-programs/btech-engineering.jpg',
      imageAlt: 'School of Engineering Prototyping and Robotics Laboratory',
      description:
        'The School of Engineering delivers outcome-based engineering education accredited by NBA Tier-1. Through cutting-edge maker labs, Cisco thingQbator innovation centers, and world-class faculty mentoring, students master engineering fundamentals and emerge as pioneering builders.',
      badge: null,
      categories: [
        {
          name: '1. Computer Science & AI',
          programs: [
            { name: 'Computer Science and Engineering (B.Tech)', degree: 'B.Tech' },
            { name: 'Artificial Intelligence & Machine Learning (B.Tech)', degree: 'B.Tech' },
            { name: 'Computer Science & Technology (B.Tech)', degree: 'B.Tech' },
            { name: 'Computer Science & Engineering (M.Tech)', degree: 'M.Tech' },
          ]
        },
        {
          name: '2. Electrical & Power / Vehicle Technology',
          programs: [
            { name: 'Electrical and Electronics Engineering (B.Tech)', degree: 'B.Tech' },
            { name: 'Electrical Engineering (Diploma)', degree: 'Diploma' },
            { name: 'Electrical Vehicle Technology (M.Tech)', degree: 'M.Tech' },
            { name: 'Energy and Environmental Engineering (M.Tech)', degree: 'M.Tech' },
          ]
        },
        {
          name: '3. Mechanical Engineering',
          programs: [
            { name: 'Mechanical Engineering (B.Tech / Diploma)', degree: 'B.Tech / Diploma' },
          ]
        },
        {
          name: '4. Civil & Structural Engineering',
          programs: [
            { name: 'Civil Engineering (B.Tech / Diploma)', degree: 'B.Tech / Diploma' },
            { name: 'Structural Engineering (M.Tech)', degree: 'M.Tech' },
          ]
        },
        {
          name: '5. Environmental Engineering',
          programs: [
            { name: 'Environmental Engineering (M.Tech)', degree: 'M.Tech' },
            { name: 'Energy and Environmental Engineering (M.Tech)', degree: 'M.Tech' },
          ]
        },
        {
          name: '6. Safety Engineering',
          programs: [
            { name: 'Industrial Safety Engineering (M.Tech)', degree: 'M.Tech' },
          ]
        }
      ]
    },
    {
      id: '02',
      title: 'School of Biotechnology',
      motto: 'INNOVATING FOR A HEALTHIER TOMORROW',
      image: '/admissions-programs/biotechnology-bioinformatics.jpg',
      imageAlt: 'School of Biotechnology and Bioinformatics Research Laboratory',
      description:
        'The School of Biotechnology offers advanced programmes fostering research and innovation in healthcare, agriculture, and environmental sustainability. Students work on cutting-edge projects in state-of-the-art labs, bridging the gap between science and real-world impact.',
      badge: null,
      categories: [
        {
          name: 'PROGRAMMES OFFERED',
          programs: [
            { name: 'B.Tech in Biotechnology Engineering', degree: 'B.Tech' },
            { name: 'Integrated M.Tech in Biotechnology', degree: 'M.Tech' },
            { name: 'Applied Biosciences & Bioinformatics (M.Tech)', degree: 'M.Tech' },
          ]
        }
      ]
    },
    {
      id: '03',
      title: 'School of Business',
      motto: 'SHAPING LEADERS FOR A DYNAMIC WORLD',
      image: '/admissions-programs/mba-business-leadership.jpg',
      imageAlt: 'School of Business Executive Case Study and Strategy Boardroom',
      description:
        'The School of Business develops strategic thinkers and future corporate leaders through MBA and specialized management programmes. Strong industry partnerships enable students to gain real-world exposure through internships, live projects, and case studies.',
      badge: {
        eyebrow: 'NBA-ACCREDITED',
        title: 'MBA'
      },
      categories: [
        {
          name: 'PROGRAMMES OFFERED',
          programs: [
            { name: 'Master of Business Administration (MBA)', degree: 'MBA' },
            { name: 'MBA in Financial Technology & Analytics', degree: 'MBA' },
            { name: 'BBA (Honours in Digital Business Strategy)', degree: 'BBA' },
          ]
        }
      ]
    },
    {
      id: '04',
      title: 'School of Computer Applications',
      motto: 'EMPOWERING SOFTWARE ARCHITECTS & PRACTITIONERS',
      image: '/admissions-programs/mca-software-cloud.jpg',
      imageAlt: 'School of Computer Applications Cloud Computing and DevOps Lab',
      description:
        'The School of Computer Applications prepares students for fast-paced careers in enterprise software engineering, cloud architecture, and full-stack systems. Students build production-ready applications with hands-on labs and Fortune 500 mentor workshops.',
      badge: null,
      categories: [
        {
          name: 'PROGRAMMES OFFERED',
          programs: [
            { name: 'Master of Computer Applications (MCA Full-Stack)', degree: 'MCA' },
            { name: 'MCA in Cloud Architecture & DevOps', degree: 'MCA' },
            { name: 'Bachelor of Computer Applications (BCA)', degree: 'BCA' },
          ]
        }
      ]
    },
    {
      id: '05',
      title: 'School of Advanced Research & Polytechnic',
      motto: 'HANDS-ON TECHNICAL RIGOR & DIPLOMA WORKSHOPS',
      image: '/admissions-programs/diploma-polytechnic-workshop.jpg',
      imageAlt: 'School of Polytechnic Engineering and CNC Machining Workshop',
      description:
        'Delivering foundational technical education, heavy machine tool immersion, and cutting-edge prototyping workshops, providing direct lateral entry pathways into 2nd year B.Tech alongside specialized industrial diplomas.',
      badge: null,
      categories: [
        {
          name: 'PROGRAMMES OFFERED',
          programs: [
            { name: 'Polytechnic Diploma in Mechanical Engineering', degree: 'Diploma' },
            { name: 'Polytechnic Diploma in Electrical Engineering', degree: 'Diploma' },
            { name: 'Polytechnic Diploma in Civil Engineering', degree: 'Diploma' },
            { name: 'Advanced Post-Diploma in Tool Design & CAD/CAM', degree: 'Post-Diploma' },
          ]
        }
      ]
    }
  ];

  // ScrollTrigger: Smooth pop-out entrance for each school section and sync active school with left sticky showcase
  useEffect(() => {
    if (!programsSectionRef.current) return;
    const ctx = gsap.context(() => {
      schoolRefs.current.forEach((schoolEl, index) => {
        if (!schoolEl) return;

        // Texts and program rows popping out smoothly while scrolling down
        const header = schoolEl.querySelector('.school-header-reveal');
        const motto = schoolEl.querySelector('.school-motto-reveal');
        const desc = schoolEl.querySelector('.school-desc-reveal');
        const badge = schoolEl.querySelector('.school-badge-reveal');
        const catHeaders = schoolEl.querySelectorAll('.school-cat-reveal');
        const rows = schoolEl.querySelectorAll('.school-row-reveal');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: schoolEl,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        });

        if (header) {
          tl.fromTo(header, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' });
        }
        if (motto) {
          tl.fromTo(motto, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3');
        }
        if (desc) {
          tl.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');
        }
        if (badge) {
          tl.fromTo(badge, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.2');
        }
        if (catHeaders.length) {
          tl.fromTo(catHeaders, { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, '-=0.2');
        }
        if (rows.length) {
          tl.fromTo(
            rows, 
            { opacity: 0, x: -20, scale: 0.97 }, 
            { opacity: 1, x: 0, scale: 1, duration: 0.45, stagger: 0.04, ease: 'back.out(1.2)' }, 
            '-=0.3'
          );
        }

        ScrollTrigger.create({
          trigger: schoolEl,
          start: index === 0 ? 'top 70%' : 'top 45%',
          end: index === schoolsData.length - 1 ? 'bottom 20%' : 'bottom 45%',
          onEnter: () => setActiveSchoolIndex(index),
          onEnterBack: () => setActiveSchoolIndex(index)
        });
      });
    }, programsSectionRef.current);

    return () => ctx.revert();
  }, []);

  // ScrollTrigger: Placement Highlights section texts, cards & pills popping out while scrolling down
  useEffect(() => {
    const section = placementSectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Header texts popping out smoothly
      gsap.fromTo(
        '.placement-text-reveal',
        { opacity: 0, y: 35, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 2. Stat cards popping out with stagger
      gsap.fromTo(
        '.placement-card-reveal',
        { opacity: 0, y: 55, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 3. Recruiter badges popping out with rapid stagger
      gsap.fromTo(
        '.placement-badge-reveal',
        { opacity: 0, y: 25, scale: 0.85 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // ScrollTrigger: Scholarship section texts and cards popping out while scrolling down
  useEffect(() => {
    const section = scholarshipSectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Header texts popping out smoothly with playful back.out curve
      gsap.fromTo(
        '.scholarship-text-reveal',
        { opacity: 0, y: 35, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 2. Scholarship cards popping out with stagger
      gsap.fromTo(
        '.scholarship-card-reveal',
        { opacity: 0, y: 55, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.16,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

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
      <section className="relative w-full h-screen min-h-[100dvh] bg-stone-950 overflow-hidden flex flex-col justify-between select-none">
        {/* Background Hero Image (Uploaded Seminar/Mentorship Photo) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/admissions_hero.jpg"
            alt="Students and Faculty Mentorship at Trident"
            className="w-full h-full object-cover object-center scale-102"
            onError={(e) => {
              // Fallback to campus hero if needed
              (e.target as HTMLImageElement).src = '/trident-gate-hero.jpg';
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

        {/* Hero Content Area */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 w-full my-auto pb-6">
          <div className="max-w-2xl text-left">
            
            {/* Main Huge Serif Headline (Matching Landing Page Hero typography) */}
            <h1 className="font-serif font-bold text-white text-5xl sm:text-6xl md:text-7xl lg:text-[78px] leading-[1.06] tracking-tight drop-shadow-md">
              Begin your<br />
              journey at<br />
              Trident
            </h1>

            {/* Subtitle / Descriptive Text */}
            <p className="text-white/90 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl mt-5 drop-shadow-xs">
              Discover your potential at one of Eastern India&apos;s leading autonomous technical institutions. Admissions are now open for B.Tech, MCA, MBA &amp; M.Tech programs under BPUT and AICTE norms.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleOpenApplyModal()}
                className="px-6 sm:px-8 py-3.5 rounded-md bg-[#0D9488] hover:bg-[#0f766e] active:scale-98 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-teal-950/40 flex items-center gap-2 cursor-pointer"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const target = document.getElementById('admissions-programs');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3.5 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Explore Programs</span>
                <ChevronRight className="w-4 h-4 text-cyan-300" />
              </button>

              <button
                onClick={() => onNavigate('campus')}
                className="px-5 py-3.5 rounded-md bg-white/5 hover:bg-white/15 backdrop-blur-md border border-white/15 text-white/90 hover:text-white font-semibold text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-cyan-300" />
                <span>Virtual Campus Tour</span>
              </button>
            </div>

          </div>
        </div>

        {/* Hero Bottom Strip: Accreditations & Key Indicators */}
        <div className="relative z-20 w-full px-4 sm:px-8 pb-7 sm:pb-9">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15 text-xs text-white/90">
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
          SECTION 3: "Choose your Degree Programs & Path."
          PART A: HEADING BLOCK (Distinct Architectural Sand/Stone Background #EFEAE1)
          PART B: MAIN CONTENT (Distinct Clean Canvas #FAF9F6 with Full-Bleed Sticky Dynamic Showcase)
          ========================================================================= */}
      <section 
        id="admissions-programs"
        ref={programsSectionRef}
        className="relative w-full select-none"
      >
        {/* Wave Section Divider: Flowing from Section 2 (White) into Header */}
        <div className="overflow-hidden leading-none z-10 pointer-events-none -mb-px" aria-hidden="true">
          <svg 
            viewBox="0 0 1440 80" 
            preserveAspectRatio="none" 
            className="w-full h-8 sm:h-12 md:h-14 block"
          >
            <path 
              d="M0,0 L0,45 C240,75 480,25 720,35 C960,45 1200,75 1440,50 L1440,0 Z" 
              className="fill-white"
            />
          </svg>
        </div>

        {/* ---------------------------------------------------------------------
            PART A: GRAND HEADING BLOCK
            Distinct warm architectural stone/parchment background (#EFEAE1)
            Bigger prominent typography as per reference
            --------------------------------------------------------------------- */}
        <div className="w-full bg-[#EFEAE1] border-b border-stone-300/80 pt-12 sm:pt-16 pb-16 sm:pb-20 relative overflow-hidden">
          {/* Subtle decorative background blur shapes */}
          <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full bg-[#E2EFE7]/60 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-8 w-[380px] h-[380px] rounded-full bg-[#EADBEC]/50 blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
                  <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-[#0D9488] uppercase">
                    ACADEMIC DISCIPLINES &amp; PROGRAMMES
                  </span>
                </div>
                {/* Grand Larger Heading */}
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-[#111827] leading-[1.05] tracking-tight mb-4">
                  Choose your Degree{' '}
                  <span className="italic font-serif text-[#0D9488] font-normal block sm:inline">
                    Programs &amp; Path.
                  </span>
                </h2>
                <p className="text-stone-700 text-sm sm:text-base lg:text-lg sm:leading-relaxed font-sans max-w-2xl">
                  Explore our premier undergraduate, postgraduate, and diploma technical curricula approved by AICTE, NBA Tier-1 accredited, and affiliated with BPUT Odisha.
                </p>
              </div>

              {/* Quality Accreditations Strip */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono shrink-0">
                <span className="px-4 py-2 rounded-full bg-white/95 border border-stone-300/80 shadow-xs text-stone-800 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  AICTE Approved New Delhi
                </span>
                <span className="px-4 py-2 rounded-full bg-white/95 border border-stone-300/80 shadow-xs text-stone-800 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  BPUT Affiliated (Autonomous)
                </span>
                <span className="px-4 py-2 rounded-full bg-white/95 border border-stone-300/80 shadow-xs text-stone-800 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  NBA Tier-1 &amp; NAAC A+
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------------
            PART B: 50/50 SPLIT SHOWCASE (EXACT MATCH TO REFERENCE VIDEO)
            - ZERO GAP between Left Sticky Image and Right Scrolling Content
            - Left: 50% width sticky image (full screen height) with smooth crossfade, dark gradient & School Title + Motto
            - Right: 50% width scrolling content with seamless warm parchment background (#FAF6EF)
            - NO white card boxes - open editorial typography with vertical brown accent line
            - School title with circular arrow button
            - Categorized disciplines with clean divided rows and right arrows
            --------------------------------------------------------------------- */}
        <div className="w-full bg-[#EDF5FD] relative">
          <div className="w-full flex flex-col lg:flex-row items-start">
            
            {/* LEFT COLUMN: 50% WIDTH STICKY SHOWCASE (ZERO GAP, FULL BLEED) */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-0 h-[480px] sm:h-[600px] lg:h-screen self-start overflow-hidden bg-stone-950 z-20">
              {schoolsData.map((school, sIdx) => {
                const isActive = activeSchoolIndex === sIdx;

                return (
                  <div
                    key={school.id}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isActive
                        ? 'opacity-100 scale-100 z-10'
                        : 'opacity-0 scale-105 z-0 pointer-events-none'
                    }`}
                  >
                    {/* Full 50% width image */}
                    <img
                      src={school.image}
                      alt={school.imageAlt}
                      className="w-full h-full object-cover"
                    />

                    {/* Smooth Cinematic Gradient Overlay (Dark at bottom for crisp title legibility) */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.6) 24%, rgba(15, 23, 42, 0.2) 44%, transparent 70%)'
                      }}
                    />

                    {/* School Title & Motto at Bottom (Matching Reference Video Exactly) */}
                    <div className="absolute bottom-8 sm:bottom-12 inset-x-8 sm:inset-x-12 z-20 space-y-2 pointer-events-none">
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight drop-shadow-md">
                        {school.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-stone-200 font-bold drop-shadow-sm">
                        {school.motto}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: 50% WIDTH SCROLLING CONTENT (WITH STICKY REFERENCE GEOMETRIC BLUE BACKGROUND) */}
            <div className="w-full lg:w-1/2 relative bg-[#EDF5FD]">
              {/* STICKY REFERENCE GEOMETRIC BLUE BACKGROUND (DESKTOP) */}
              <div className="hidden lg:block sticky top-0 h-screen w-full -mb-[100vh] pointer-events-none z-0 overflow-hidden">
                <img
                  src="/admissions-programs/geometric-blue-bg.png"
                  alt=""
                  className="w-full h-full object-cover object-right opacity-95"
                />
              </div>

              {/* MOBILE BACKGROUND */}
              <div className="lg:hidden absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <img
                  src="/admissions-programs/geometric-blue-bg.png"
                  alt=""
                  className="w-full h-full object-cover object-right opacity-95"
                />
              </div>

              {/* Scrolling Content */}
              <div className="relative z-10 px-8 sm:px-12 lg:px-16 xl:px-20 py-16 sm:py-24 space-y-24 sm:space-y-32">
              {schoolsData.map((school, sIdx) => {
                return (
                  <div
                    key={school.id}
                    ref={(el) => { schoolRefs.current[sIdx] = el; }}
                    className="school-section relative pl-6 sm:pl-8 border-l-[3.5px] border-[#784421]"
                  >
                    {/* Header Row: School Title + Circular Arrow Button */}
                    <div className="school-header-reveal flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-stone-900 tracking-tight leading-[1.12]">
                        {school.title}
                      </h3>

                      <button
                        onClick={() => handleOpenApplyModal(school.title)}
                        aria-label={`Apply for ${school.title}`}
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#8E877E] hover:bg-[#784421] text-white flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm hover:scale-105 cursor-pointer mt-1"
                      >
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    </div>

                    {/* Motto */}
                    <p className="school-motto-reveal text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#8B5A2B] mb-4">
                      {school.motto}
                    </p>

                    {/* Editorial Description */}
                    <p className="school-desc-reveal text-stone-700 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mb-8">
                      {school.description}
                    </p>

                    {/* Optional Accreditation Badge (e.g. School of Business) */}
                    {school.badge && (
                      <div className="school-badge-reveal mb-8 inline-block px-5 py-3 rounded-lg bg-white/90 border border-stone-200/90 shadow-2xs">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-[#8B5A2B] uppercase block">
                          {school.badge.eyebrow}
                        </span>
                        <span className="text-base font-bold text-stone-900 block mt-0.5">
                          {school.badge.title}
                        </span>
                      </div>
                    )}

                    {/* Categories and Divided Program Rows */}
                    <div className="space-y-6">
                      {school.categories.map((category, cIdx) => (
                        <div key={cIdx} className="space-y-1">
                          {/* Category Header */}
                          <h4 className="school-cat-reveal text-xs sm:text-sm font-bold tracking-wider text-stone-900 uppercase pt-4 pb-2">
                            {category.name}
                          </h4>

                          {/* Program Rows with horizontal dividing lines on every row and right arrows */}
                          <div className="space-y-0">
                            {category.programs.map((prog, pIdx) => (
                              <div
                                key={pIdx}
                                onClick={() => handleOpenApplyModal(prog.name)}
                                className="school-row-reveal group flex items-center justify-between py-3.5 sm:py-4 border-b border-stone-300/80 hover:border-[#784421] cursor-pointer transition-colors"
                              >
                                <span className="text-stone-800 text-sm sm:text-base font-medium group-hover:text-[#784421] transition-colors pr-4">
                                  {prog.name}
                                </span>
                                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#784421] group-hover:translate-x-1 transition-all shrink-0" />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                );
              })}
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
          SECTION 5: "Scholarship support." (Reference Geometric Sage/Mint Background & Pop-Out Scroll Animation)
          ========================================================================= */}
      <section 
        ref={scholarshipSectionRef}
        className="relative py-20 sm:py-28 bg-[#F4F9F6] overflow-hidden border-y border-emerald-900/10 select-none"
      >
        {/* Reference Geometric Light Mint/Sage Background with Wireframe Line Facets */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-95 bg-cover bg-center"
          style={{
            backgroundImage: `url('/admissions-programs/scholarship-geometric-bg.jpg')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />

        {/* Ambient Subtle Emerald & Teal Glow Accents */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-teal-500/10 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="scholarship-text-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/10 border border-emerald-600/20 text-[#047857] text-[11px] font-mono font-bold tracking-[0.25em] uppercase shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              SCHOLARSHIPS &amp; ENDOWMENTS
            </div>

            <h2 className="scholarship-text-reveal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1528] tracking-tight">
              Scholarship <span className="italic font-serif font-normal text-[#0D9488]">support.</span>
            </h2>

            <p className="scholarship-text-reveal text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-sans">
              We believe financial constraints should never stand in the way of exceptional academic talent. Explore our comprehensive scholarship ecosystems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Pillar 1: Merit Scholarships */}
            <div className="scholarship-card-reveal group relative bg-white/85 hover:bg-white backdrop-blur-xl border border-emerald-900/10 hover:border-amber-400/60 rounded-3xl p-7 sm:p-8 space-y-5 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(245,158,11,0.15)] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 opacity-80 group-hover:h-1.5 transition-all duration-300" />
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/25 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                  Merit Scholarships
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  Up to 100% tuition fee waiver for top rankers in JEE Main (AIR &lt; 50,000) and OJEE (Rank &lt; 1,000). Academic excellence cash awards and fee concessions for branch toppers across every semester.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between">
                <button 
                  onClick={() => alert('Merit Scholarship Guidelines: Candidates maintaining CGPA >= 8.5 qualify for annual tuition waivers under Trident Merit Policy.')}
                  className="text-xs font-bold text-[#0D9488] hover:text-[#0f766e] flex items-center gap-1.5 cursor-pointer transition-colors group-hover:translate-x-0.5"
                >
                  <span>View Merit Guidelines</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  Up to 100%
                </span>
              </div>
            </div>

            {/* Pillar 2: Government Schemes */}
            <div className="scholarship-card-reveal group relative bg-white/85 hover:bg-white backdrop-blur-xl border border-emerald-900/10 hover:border-emerald-500/60 rounded-3xl p-7 sm:p-8 space-y-5 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.15)] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 opacity-80 group-hover:h-1.5 transition-all duration-300" />

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  Government Schemes
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  Dedicated facilitation for Odisha State PRERANA Post-Matric Scholarship for SC/ST/OBC/SEBC students. Complete guidance for National Scholarship Portal (NSP), Medhabruti, and Pragati scholarships.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between">
                <button 
                  onClick={() => alert('Govt Scholarship Portal: Full verification assistance provided by the Trident Student Welfare Secretariat.')}
                  className="text-xs font-bold text-[#0D9488] hover:text-[#0f766e] flex items-center gap-1.5 cursor-pointer transition-colors group-hover:translate-x-0.5"
                >
                  <span>Government Portal Info</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  State &amp; National
                </span>
              </div>
            </div>

            {/* Pillar 3: Special Grants */}
            <div className="scholarship-card-reveal group relative bg-white/85 hover:bg-white backdrop-blur-xl border border-emerald-900/10 hover:border-rose-400/60 rounded-3xl p-7 sm:p-8 space-y-5 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(244,63,94,0.15)] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-500 opacity-80 group-hover:h-1.5 transition-all duration-300" />

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/25 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-800 transition-colors">
                  Special Grants
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  Special fee benefits for wards of Indian Armed Forces and Paramilitary personnel. Women in STEM tuition concessions, sports achiever fellowships, and seed funds for student hardware prototypes.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between">
                <button 
                  onClick={() => alert('Special Grants Desk: Reach out to admissions@trident.ac.in for defense and sports concession applications.')}
                  className="text-xs font-bold text-[#0D9488] hover:text-[#0f766e] flex items-center gap-1.5 cursor-pointer transition-colors group-hover:translate-x-0.5"
                >
                  <span>Apply for Special Grants</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                  Welfare &amp; STEM
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: "Placement Highlights" (Reference Modern Grey/White Tech Pill Background & Pop-Out Scroll Animation)
          ========================================================================= */}
      <section 
        ref={placementSectionRef}
        className="relative py-20 sm:py-28 bg-[#F8F9FA] text-slate-900 overflow-hidden border-y border-slate-200/80 select-none"
      >
        {/* Reference Modern Light Tech Capsules/Circuits Background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-90 bg-cover bg-center"
          style={{
            backgroundImage: `url('/admissions-programs/placement-highlights-tech-bg.jpg')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />

        {/* Ambient Subtle Light Teal Glow Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[22rem] rounded-full bg-teal-500/5 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-10">
          
          <div className="space-y-3 max-w-2xl mx-auto">
            <div className="placement-text-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 text-slate-700 text-[11px] font-mono font-bold tracking-[0.25em] uppercase shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0D9488] animate-pulse" />
              CAREER EXCELLENCE &amp; CORPORATE OUTCOMES
            </div>

            <h2 className="placement-text-reveal text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B1528]">
              Placement <span className="italic font-serif font-normal text-[#0D9488]">Highlights.</span>
            </h2>

            <p className="placement-text-reveal text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-sans">
              Consistently recognized among Eastern India&apos;s leading technical institutions for corporate ascendancy and high-tier recruitment.
            </p>
          </div>

          {/* Big Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 max-w-5xl mx-auto pt-2">
            {[
              { number: '1,203+', label: 'Placement Offers', border: 'from-emerald-400 to-teal-500' },
              { number: '28+ LPA', label: 'Highest Package', border: 'from-cyan-400 to-blue-500' },
              { number: '94.8%', label: 'Placement Rate', border: 'from-amber-400 to-orange-500' },
              { number: '120+', label: 'Hiring Partners', border: 'from-purple-400 to-indigo-500' },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="placement-card-reveal group relative p-6 sm:p-7 rounded-3xl bg-white/85 hover:bg-white backdrop-blur-xl border border-slate-200/80 hover:border-teal-500/50 shadow-[0_10px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(13,148,136,0.12)] transition-all duration-300 overflow-hidden text-center"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.border} opacity-80 group-hover:h-1.5 transition-all duration-300`} />
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-mono tracking-tight block tabular-nums group-hover:text-[#0D9488] transition-colors">
                  {stat.number}
                </span>
                <span className="text-xs font-mono uppercase tracking-[0.18em] text-slate-500 font-bold mt-2.5 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Top Recruiters Badges */}
          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase block">
              PREMIER HIRING RECRUITERS
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
              {['TCS Digital', 'Infosys', 'Wipro', 'Cognizant GenC', 'Amazon AWS', 'Cisco Systems', 'Capgemini', 'Accenture', 'Tech Mahindra'].map((rec, i) => (
                <span 
                  key={i} 
                  className="placement-badge-reveal px-4 py-2 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-950 border border-slate-200 shadow-2xs text-xs font-semibold transition-all hover:scale-105 hover:border-teal-400/50 cursor-default"
                >
                  {rec}
                </span>
              ))}
            </div>
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

