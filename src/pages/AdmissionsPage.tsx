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

  // Animated 2-second increment counters for Admission Placement Highlights
  const [placementStats, setPlacementStats] = useState({
    offers: 0,
    highest: 0,
    rate: 0,
    partners: 0,
  });

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
      title: 'School of Polytechnic',
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

  // ScrollTrigger: Placement Highlights section texts, cards & pills popping out while scrolling down, and 2-second number increment
  useEffect(() => {
    const section = placementSectionRef.current;
    if (!section) return;

    let animFrame: number;
    let hasAnimated = false;

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

      // 2. Stat cards popping out with stagger and synchronized 2-second number increment
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
            toggleActions: 'play none none none',
            onEnter: () => {
              if (hasAnimated) return;
              hasAnimated = true;

              // Exact 2-second synchronized increment for all 4 numbers
              const targets = { offers: 1203, highest: 28, rate: 94.8, partners: 120 };
              const startTime = performance.now();
              const duration = 2000; // exactly 2.0 seconds

              const update = (now: number) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Unified smooth cubic ease-out
                const ease = 1 - Math.pow(1 - progress, 3);

                setPlacementStats({
                  offers: Math.round(targets.offers * ease),
                  highest: Math.round(targets.highest * ease),
                  rate: Math.round(targets.rate * ease * 10) / 10,
                  partners: Math.round(targets.partners * ease),
                });

                if (progress < 1) {
                  animFrame = requestAnimationFrame(update);
                } else {
                  // Guarantee all numbers reach final values simultaneously at 2.0s
                  setPlacementStats(targets);
                }
              };

              animFrame = requestAnimationFrame(update);
            }
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

    return () => {
      ctx.revert();
      if (animFrame) cancelAnimationFrame(animFrame);
    };
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
      <section className="relative w-full h-screen min-h-[100dvh] bg-stone-950 overflow-hidden flex flex-col justify-between">
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
          - Background: Exact 2D layered wavy curves created in HTML & CSS SVG matching reference image
          - Typography: "Where ambition takes shape." in Playfair Display
          - No container boxes: Text rendered directly on the background
          - Accreditations: Clean text with line separators
          - Key highlights: Clean prominent text with dividing line separators
          - Slightly increased text pixels for elevated legibility
          ========================================================================= */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-[#FAFBFD]">
        {/* Exact 2D Wavy Layered Vector Background in HTML & CSS matching reference image */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
          <svg
            viewBox="0 0 1440 900"
            preserveAspectRatio="none"
            className="w-full h-full object-cover"
          >
            <defs>
              <linearGradient id="waveBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#FAFBFD" />
                <stop offset="100%" stopColor="#F1F5F9" />
              </linearGradient>
              <linearGradient id="waveLayer1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5F8FA" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#E6EBEF" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="waveLayer2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DEE7EE" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#BACCDA" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="waveLayer3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9BB8CB" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#678BA3" stopOpacity="0.65" />
              </linearGradient>
              <linearGradient id="waveLayer4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4A7595" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#336586" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="waveLayer5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#25597D" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1F577C" stopOpacity="0.55" />
              </linearGradient>
            </defs>

            {/* Base Canvas */}
            <rect width="1440" height="900" fill="url(#waveBaseGrad)" />

            {/* Layer 1: Top Soft Wave */}
            <path
              d="M 0,170 C 260,110 500,240 820,200 C 1120,160 1300,270 1440,240 L 1440,900 L 0,900 Z"
              fill="url(#waveLayer1)"
            />

            {/* Layer 2: Upper Mid Flowing Curve */}
            <path
              d="M 0,350 C 280,280 540,440 880,370 C 1180,300 1340,460 1440,420 L 1440,900 L 0,900 Z"
              fill="url(#waveLayer2)"
            />

            {/* Layer 3: Central Ambient Wave */}
            <path
              d="M 0,530 C 300,460 560,630 920,550 C 1220,480 1360,630 1440,590 L 1440,900 L 0,900 Z"
              fill="url(#waveLayer3)"
            />

            {/* Layer 4: Lower Slate Wave */}
            <path
              d="M 0,700 C 320,640 600,790 960,710 C 1240,650 1380,760 1440,730 L 1440,900 L 0,900 Z"
              fill="url(#waveLayer4)"
            />

            {/* Layer 5: Bottom Deep Ocean Wave */}
            <path
              d="M 0,820 C 360,770 680,880 1040,810 C 1260,770 1380,850 1440,830 L 1440,900 L 0,900 Z"
              fill="url(#waveLayer5)"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* Left Headline & Accreditation Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
                <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-[#0D9488] uppercase block">
                  ABOUT US
                </span>
              </div>

              {/* Headline in Playfair Display with Increased Pixels */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-[#0B1528] tracking-tight leading-[1.12]">
                Where ambition<br />
                <span className="italic font-playfair font-normal text-[#0D9488]">takes shape.</span>
              </h2>

              <div className="w-20 h-1.5 bg-[#0D9488] rounded-full" />

              {/* Accreditation Badges Row (No Boxes, Clean Text with Line Separators & Increased Pixels) */}
              <div className="pt-4 flex flex-wrap items-center gap-x-3.5 gap-y-2 text-sm sm:text-base font-semibold text-slate-800">
                <span className="hover:text-[#0D9488] transition-colors">NAAC A+</span>
                <span className="text-slate-300 font-light select-none">|</span>
                <span className="hover:text-[#0D9488] transition-colors">NBA Tier-1</span>
                <span className="text-slate-300 font-light select-none">|</span>
                <span className="hover:text-[#0D9488] transition-colors">AICTE</span>
                <span className="text-slate-300 font-light select-none">|</span>
                <span className="hover:text-[#0D9488] transition-colors">BPUT Odisha</span>
                <span className="text-slate-300 font-light select-none">|</span>
                <span className="hover:text-[#0D9488] transition-colors">DSIR-SIRO</span>
              </div>
            </div>

            {/* Right Detailed Narrative (Clean Text directly on Normal Background, No Container Box, Increased Pixels) */}
            <div className="lg:col-span-7 space-y-6 pt-1">
              <p className="text-slate-800 text-base sm:text-lg lg:text-[19px] leading-relaxed font-normal">
                Trident Academy of Technology (TAT), Bhubaneswar is a premier engineering institution established in 2005 under the visionary DF Group. Known for academic rigor, cutting-edge research, and an exceptional faculty-student mentorship framework, Trident stands as a benchmark of technical excellence in Eastern India.
              </p>

              <p className="text-slate-700 text-base sm:text-lg lg:text-[19px] leading-relaxed font-normal">
                Equipped with world-class laboratories, DST-SIRO recognized research centers, Cisco thingQbator IoT makerspace, and an outcome-based education model aligned with National Education Policy (NEP), we groom aspiring students into industry-ready leaders, innovators, and entrepreneurs.
              </p>

              {/* Key Institutional Highlights with Dividing Line Separators */}
              <div className="pt-6 border-t border-slate-300/80 space-y-3.5">
                <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-[#0D9488] shrink-0" />
                  <span>20+ Years of Academic Excellence, Rigor &amp; Transparent Institutional Governance</span>
                </div>
                <div className="border-t border-slate-200/70" />
                <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-[#0D9488] shrink-0" />
                  <span>100% Placement Assistance with 120+ Global Fortune 500 Recruiters</span>
                </div>
                <div className="border-t border-slate-200/70" />
                <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-[#0D9488] shrink-0" />
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
        className="relative w-full"
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
                    className={`absolute inset-0 transition-all duration-700 ease-out ${isActive
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
                      <h3 className="font-chango font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-normal leading-tight drop-shadow-md">
                        {school.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-white font-extrabold drop-shadow-sm">
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
                        <h3 className="font-chango font-bold text-3xl sm:text-4xl lg:text-[42px] text-stone-950 tracking-normal leading-[1.2]">
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
                      <p className="school-motto-reveal text-xs sm:text-sm font-mono font-extrabold tracking-[0.2em] uppercase text-[#784421] mb-4">
                        {school.motto}
                      </p>

                      {/* Editorial Description */}
                      <p className="school-desc-reveal text-stone-950 text-base sm:text-lg leading-relaxed font-bold max-w-2xl mb-8">
                        {school.description}
                      </p>

                      {/* Optional Accreditation Badge (e.g. School of Business) */}
                      {school.badge && (
                        <div className="school-badge-reveal mb-8 inline-block px-5 py-3 rounded-lg bg-white/95 border border-stone-300 shadow-2xs">
                          <span className="text-xs font-mono font-extrabold tracking-widest text-[#784421] uppercase block">
                            {school.badge.eyebrow}
                          </span>
                          <span className="text-base sm:text-lg font-extrabold text-stone-950 block mt-0.5">
                            {school.badge.title}
                          </span>
                        </div>
                      )}

                      {/* Categories and Divided Program Rows */}
                      <div className="space-y-6">
                        {school.categories.map((category, cIdx) => (
                          <div key={cIdx} className="space-y-1">
                            {/* Category Header */}
                            <h4 className="school-cat-reveal text-sm sm:text-base font-extrabold tracking-wider text-stone-950 uppercase pt-4 pb-2">
                              {category.name}
                            </h4>

                            {/* Program Rows with horizontal dividing lines on every row and right arrows */}
                            <div className="space-y-0">
                              {category.programs.map((prog, pIdx) => (
                                <div
                                  key={pIdx}
                                  onClick={() => handleOpenApplyModal(prog.name)}
                                  className="school-row-reveal group flex items-center justify-between py-3.5 sm:py-4 border-b border-stone-300 hover:border-[#784421] cursor-pointer transition-colors"
                                >
                                  <span className="text-stone-950 text-base sm:text-lg font-bold group-hover:text-[#784421] transition-colors pr-4">
                                    {prog.name}
                                  </span>
                                  <ArrowRight className="w-5 h-5 text-stone-600 stroke-[2.5] group-hover:text-[#784421] group-hover:translate-x-1.5 transition-all shrink-0" />
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
          SECTION 5: "Scholarship support." (Exact HTML & CSS Vector Mint Geometric Background matching reference)
          ========================================================================= */}
      <section
        ref={scholarshipSectionRef}
        className="relative py-20 sm:py-28 bg-[#F6FAF8] overflow-hidden border-y border-emerald-900/10"
      >
        {/* Exact Geometric Mint & Sage Line-Art Background in HTML & CSS SVG matching reference image */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
          <svg
            viewBox="0 0 1440 900"
            preserveAspectRatio="none"
            className="w-full h-full object-cover"
          >
            <defs>
              <linearGradient id="scholarshipBgBase" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F6FAF8" />
                <stop offset="50%" stopColor="#FAFCFB" />
                <stop offset="100%" stopColor="#F3F8F5" />
              </linearGradient>
            </defs>

            {/* Base Canvas */}
            <rect width="1440" height="900" fill="url(#scholarshipBgBase)" />

            {/* ================= TOP-LEFT GEOMETRIC POLYGONS ================= */}
            <polygon points="0,0 620,0 420,240 0,440" fill="#D7EBE0" opacity="0.5" />
            <polygon points="0,0 460,0 300,320 0,560" fill="#C4E0D1" opacity="0.45" />
            <polygon points="0,220 320,300 180,520 0,680" fill="#E6F2EC" opacity="0.55" />
            <polygon points="120,0 520,0 380,180 180,120" fill="#B8D9C6" opacity="0.38" />

            {/* Top-Left Concentric Bent Lines */}
            <polyline points="280,0 460,260 0,620" stroke="#84AC97" strokeWidth="1.75" fill="none" opacity="0.75" />
            <polyline points="255,0 435,245 0,590" stroke="#92B6A3" strokeWidth="1.25" fill="none" opacity="0.7" />
            <polyline points="230,0 410,230 0,560" stroke="#92B6A3" strokeWidth="1.25" fill="none" opacity="0.7" />
            <polyline points="205,0 385,215 0,530" stroke="#84AC97" strokeWidth="1.75" fill="none" opacity="0.75" />
            <polyline points="180,0 360,200 0,500" stroke="#92B6A3" strokeWidth="1.25" fill="none" opacity="0.65" />
            <polyline points="155,0 335,185 0,470" stroke="#92B6A3" strokeWidth="1.25" fill="none" opacity="0.65" />
            <polyline points="130,0 310,170 0,440" stroke="#84AC97" strokeWidth="1.75" fill="none" opacity="0.7" />
            <polyline points="105,0 285,155 0,410" stroke="#92B6A3" strokeWidth="1.25" fill="none" opacity="0.6" />
            <polyline points="80,0 260,140 0,380" stroke="#92B6A3" strokeWidth="1.25" fill="none" opacity="0.6" />
            <polyline points="55,0 235,125 0,350" stroke="#92B6A3" strokeWidth="1.25" fill="none" opacity="0.55" />
            <polyline points="30,0 210,110 0,320" stroke="#84AC97" strokeWidth="1.5" fill="none" opacity="0.6" />
            <polyline points="5,0 185,95 0,290" stroke="#92B6A3" strokeWidth="1.25" fill="none" opacity="0.5" />

            {/* Top-Left Diagonal Parallel Hatch Lines */}
            <line x1="0" y1="280" x2="380" y2="680" stroke="#95B9A6" strokeWidth="1.25" opacity="0.45" />
            <line x1="0" y1="320" x2="350" y2="700" stroke="#95B9A6" strokeWidth="1.25" opacity="0.45" />
            <line x1="0" y1="360" x2="320" y2="720" stroke="#95B9A6" strokeWidth="1.25" opacity="0.45" />
            <line x1="0" y1="400" x2="290" y2="740" stroke="#95B9A6" strokeWidth="1.25" opacity="0.45" />
            <line x1="0" y1="440" x2="260" y2="760" stroke="#95B9A6" strokeWidth="1.25" opacity="0.45" />
            <line x1="0" y1="480" x2="230" y2="780" stroke="#95B9A6" strokeWidth="1.25" opacity="0.45" />
            <line x1="0" y1="520" x2="200" y2="800" stroke="#95B9A6" strokeWidth="1.25" opacity="0.45" />

            {/* ================= TOP-RIGHT STREAMING PARALLEL LINES ================= */}
            <polygon points="900,0 1440,0 1440,180 1120,90" fill="#E2EFE7" opacity="0.55" />
            <polygon points="1100,0 1440,0 1440,120" fill="#D3E8DC" opacity="0.45" />
            <line x1="820" y1="0" x2="1440" y2="60" stroke="#90B4A0" strokeWidth="1.25" opacity="0.65" />
            <line x1="860" y1="0" x2="1440" y2="85" stroke="#90B4A0" strokeWidth="1.25" opacity="0.65" />
            <line x1="900" y1="0" x2="1440" y2="110" stroke="#7DA48E" strokeWidth="1.5" opacity="0.75" />
            <line x1="940" y1="0" x2="1440" y2="135" stroke="#90B4A0" strokeWidth="1.25" opacity="0.65" />
            <line x1="980" y1="0" x2="1440" y2="160" stroke="#90B4A0" strokeWidth="1.25" opacity="0.65" />
            <line x1="1020" y1="0" x2="1440" y2="185" stroke="#7DA48E" strokeWidth="1.5" opacity="0.7" />
            <line x1="1060" y1="0" x2="1440" y2="210" stroke="#90B4A0" strokeWidth="1.25" opacity="0.6" />
            <line x1="1100" y1="0" x2="1440" y2="235" stroke="#90B4A0" strokeWidth="1.25" opacity="0.6" />
            <line x1="1140" y1="0" x2="1440" y2="260" stroke="#90B4A0" strokeWidth="1.25" opacity="0.55" />

            {/* ================= BOTTOM-RIGHT GEOMETRIC POLYGONS & LINES ================= */}
            <polygon points="1440,480 1140,680 1280,900 1440,900" fill="#C5DFD0" opacity="0.6" />
            <polygon points="1440,620 1220,780 1360,900 1440,900" fill="#B3D7C1" opacity="0.5" />
            <polygon points="1020,900 1240,720 1440,840 1440,900" fill="#D8ECE0" opacity="0.55" />

            <polyline points="1440,480 1140,690 1280,900" stroke="#7FA792" strokeWidth="1.75" fill="none" opacity="0.75" />
            <polyline points="1440,505 1160,705 1300,900" stroke="#90B4A0" strokeWidth="1.25" fill="none" opacity="0.7" />
            <polyline points="1440,530 1180,720 1320,900" stroke="#90B4A0" strokeWidth="1.25" fill="none" opacity="0.7" />
            <polyline points="1440,555 1200,735 1340,900" stroke="#7FA792" strokeWidth="1.75" fill="none" opacity="0.7" />
            <polyline points="1440,580 1220,750 1360,900" stroke="#90B4A0" strokeWidth="1.25" fill="none" opacity="0.65" />
            <polyline points="1440,605 1240,765 1380,900" stroke="#90B4A0" strokeWidth="1.25" fill="none" opacity="0.65" />
            <polyline points="1440,630 1260,780 1400,900" stroke="#7FA792" strokeWidth="1.5" fill="none" opacity="0.65" />
            <polyline points="1440,655 1280,795 1420,900" stroke="#90B4A0" strokeWidth="1.25" fill="none" opacity="0.6" />
            <polyline points="1440,680 1300,810 1440,900" stroke="#90B4A0" strokeWidth="1.25" fill="none" opacity="0.55" />

            {/* ================= BOTTOM-CENTER UPWARD CHEVRONS ================= */}
            <polygon points="680,900 780,740 980,900" fill="#DCEDE4" opacity="0.5" />
            <polyline points="660,900 780,740 970,900" stroke="#7AA38E" strokeWidth="1.75" fill="none" opacity="0.8" />
            <polyline points="680,900 785,760 950,900" stroke="#8EAF9D" strokeWidth="1.25" fill="none" opacity="0.7" />
            <polyline points="700,900 790,780 930,900" stroke="#8EAF9D" strokeWidth="1.25" fill="none" opacity="0.7" />
            <polyline points="720,900 795,800 910,900" stroke="#7AA38E" strokeWidth="1.5" fill="none" opacity="0.7" />
            <polyline points="740,900 800,820 890,900" stroke="#8EAF9D" strokeWidth="1.25" fill="none" opacity="0.65" />
            <polyline points="760,900 805,840 870,900" stroke="#8EAF9D" strokeWidth="1.25" fill="none" opacity="0.6" />
          </svg>
        </div>

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
          SECTION 6: "Placement Highlights" (Reference 3D Low-Poly Origami Crystal Faceted Vector Background & 2s Pop-Out Counter Animation)
          - Background: Exact 3D Low-Poly White Origami Crystal vector background crafted in HTML & CSS SVG matching reference image
          - Multi-angle faceted geometry, directional linear gradients, crease drop-shadow filters, sharp specular ridge lines, and radiant apex glare flare
          ========================================================================= */}
      <section
        ref={placementSectionRef}
        className="relative py-20 sm:py-28 bg-[#F8FAFC] text-slate-900 overflow-hidden border-y border-slate-200/80"
      >
        {/* Exact 3D Low-Poly Origami Crystal Faceted Vector Background in HTML & CSS SVG matching reference image */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
          <svg
            viewBox="0 0 1440 900"
            preserveAspectRatio="none"
            className="w-full h-full object-cover"
          >
            <defs>
              {/* Facet Gradients for 3D Directional Shading */}
              <linearGradient id="crystalFacetF1" x1="140" y1="200" x2="640" y2="240" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F1F4F8" />
              </linearGradient>

              <linearGradient id="crystalFacetF2" x1="0" y1="0" x2="260" y2="200" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F7F9FC" />
                <stop offset="100%" stopColor="#ECF0F4" />
              </linearGradient>

              <linearGradient id="crystalFacetF3" x1="1440" y1="0" x2="1120" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#D8DDE3" />
                <stop offset="100%" stopColor="#EAEFF4" />
              </linearGradient>

              <linearGradient id="crystalFacetF4" x1="640" y1="180" x2="1440" y2="440" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="45%" stopColor="#F6F8FB" />
                <stop offset="100%" stopColor="#E8ECF1" />
              </linearGradient>

              <linearGradient id="crystalFacetF5" x1="0" y1="340" x2="320" y2="380" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#DFE4EA" />
                <stop offset="100%" stopColor="#F3F5F8" />
              </linearGradient>

              <linearGradient id="crystalFacetF6" x1="320" y1="380" x2="760" y2="560" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#EFF2F6" />
              </linearGradient>

              <linearGradient id="crystalFacetF7" x1="1440" y1="340" x2="760" y2="560" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#DCE1E7" />
                <stop offset="100%" stopColor="#F3F6F9" />
              </linearGradient>

              <linearGradient id="crystalFacetF8" x1="440" y1="640" x2="1020" y2="720" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F9FAFD" />
                <stop offset="100%" stopColor="#E6EBF0" />
              </linearGradient>

              <linearGradient id="crystalFacetF9" x1="0" y1="620" x2="440" y2="640" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#D3D8DF" />
                <stop offset="100%" stopColor="#E7ECF1" />
              </linearGradient>

              <linearGradient id="crystalFacetF10" x1="0" y1="900" x2="320" y2="760" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#C5CBD2" />
                <stop offset="100%" stopColor="#DDE2E7" />
              </linearGradient>

              <linearGradient id="crystalFacetF11" x1="520" y1="820" x2="880" y2="900" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E8ECF2" />
              </linearGradient>

              <linearGradient id="crystalFacetF12" x1="1020" y1="720" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#DEE3E9" />
                <stop offset="100%" stopColor="#D2D8DF" />
              </linearGradient>

              {/* Subtle Fold Drop Shadow Filter */}
              <filter id="crystalCreaseShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#4A5568" floodOpacity="0.14" />
              </filter>

              {/* Radiant Specular Apex Radial Flare */}
              <radialGradient id="crystalApexGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="25%" stopColor="#FFFDF7" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#EFF4F9" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Base Background Fill */}
            <rect width="1440" height="900" fill="#F8FAFC" />

            {/* ================= LOW-POLY CRYSTAL FACET MESH ================= */}
            {/* Top-Left Facets */}
            <polygon points="0,0 260,0 140,200" fill="url(#crystalFacetF2)" />
            <polygon points="0,0 140,200 0,340" fill="url(#crystalFacetF2)" />
            <polygon points="260,0 860,0 640,240 140,200" fill="url(#crystalFacetF1)" />

            {/* Top-Right Facets */}
            <polygon points="860,0 1440,0 1120,100" fill="url(#crystalFacetF3)" />
            <polygon points="860,0 1120,100 640,240" fill="url(#crystalFacetF4)" />
            <polygon points="1120,100 1440,0 1440,340 1080,420" fill="url(#crystalFacetF3)" />
            <polygon points="640,240 1120,100 1080,420 760,560" fill="url(#crystalFacetF4)" filter="url(#crystalCreaseShadow)" />

            {/* Mid-Left & Central Illuminated Planes */}
            <polygon points="0,340 140,200 320,380" fill="url(#crystalFacetF5)" />
            <polygon points="140,200 640,240 760,560 320,380" fill="url(#crystalFacetF6)" />
            <polygon points="0,340 320,380 440,640 0,620" fill="url(#crystalFacetF5)" />
            <polygon points="320,380 760,560 440,640" fill="url(#crystalFacetF6)" />

            {/* Mid-Right Structural Planes */}
            <polygon points="1080,420 1440,340 1440,680 760,560" fill="url(#crystalFacetF7)" />

            {/* Lower Planes & Slabs with 3D Depth Creases */}
            <polygon points="0,620 440,640 320,900 0,900" fill="url(#crystalFacetF9)" />
            <polygon points="440,640 760,560 1020,720 520,820" fill="url(#crystalFacetF8)" filter="url(#crystalCreaseShadow)" />
            <polygon points="760,560 1440,680 1020,720" fill="url(#crystalFacetF7)" />
            <polygon points="440,640 520,820 320,900" fill="url(#crystalFacetF10)" />
            <polygon points="520,820 1020,720 880,900 320,900" fill="url(#crystalFacetF11)" filter="url(#crystalCreaseShadow)" />
            <polygon points="1020,720 1440,680 1440,900 880,900" fill="url(#crystalFacetF12)" />

            {/* ================= SPECULAR RIDGE HIGHLIGHT LINES ================= */}
            <line x1="0" y1="0" x2="140" y2="200" stroke="#FFFFFF" strokeWidth="2" opacity="0.9" />
            <line x1="260" y1="0" x2="140" y2="200" stroke="#FFFFFF" strokeWidth="2.25" opacity="0.95" />
            <line x1="140" y1="200" x2="640" y2="240" stroke="#FFFFFF" strokeWidth="2.75" opacity="1" />
            <line x1="640" y1="240" x2="1120" y2="100" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" />
            <line x1="1120" y1="100" x2="1440" y2="0" stroke="#FFFFFF" strokeWidth="1.75" opacity="0.8" />
            <line x1="0" y1="340" x2="140" y2="200" stroke="#FFFFFF" strokeWidth="2" opacity="0.9" />
            <line x1="140" y1="200" x2="320" y2="380" stroke="#FFFFFF" strokeWidth="2.25" opacity="0.95" />
            <line x1="640" y1="240" x2="760" y2="560" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.95" />
            <line x1="1120" y1="100" x2="1080" y2="420" stroke="#FFFFFF" strokeWidth="1.75" opacity="0.75" />
            <line x1="320" y1="380" x2="760" y2="560" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.95" />
            <line x1="0" y1="340" x2="320" y2="380" stroke="#FFFFFF" strokeWidth="1.75" opacity="0.8" />
            <line x1="320" y1="380" x2="440" y2="640" stroke="#FFFFFF" strokeWidth="2.25" opacity="0.9" />
            <line x1="440" y1="640" x2="760" y2="560" stroke="#FFFFFF" strokeWidth="2.25" opacity="0.9" />
            <line x1="760" y1="560" x2="1080" y2="420" stroke="#FFFFFF" strokeWidth="1.75" opacity="0.8" />
            <line x1="1080" y1="420" x2="1440" y2="340" stroke="#FFFFFF" strokeWidth="1.75" opacity="0.75" />
            <line x1="760" y1="560" x2="1440" y2="680" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" />
            <line x1="760" y1="560" x2="1020" y2="720" stroke="#FFFFFF" strokeWidth="2.25" opacity="0.9" />
            <line x1="440" y1="640" x2="520" y2="820" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" />
            <line x1="520" y1="820" x2="1020" y2="720" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.95" />
            <line x1="1020" y1="720" x2="1440" y2="680" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" />
            <line x1="520" y1="820" x2="320" y2="900" stroke="#FFFFFF" strokeWidth="1.75" opacity="0.8" />
            <line x1="520" y1="820" x2="880" y2="900" stroke="#FFFFFF" strokeWidth="2.25" opacity="0.9" />
            <line x1="1020" y1="720" x2="880" y2="900" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" />
            <line x1="0" y1="620" x2="440" y2="640" stroke="#FFFFFF" strokeWidth="1.75" opacity="0.8" />

            {/* ================= RADIANT APEX SPECULAR FLARE ================= */}
            {/* Ambient Radial Soft Bloom */}
            <circle cx="140" cy="200" r="160" fill="url(#crystalApexGlow)" />
            <circle cx="140" cy="200" r="70" fill="url(#crystalApexGlow)" opacity="0.85" />
            {/* Primary Glare Cross Rays */}
            <line x1="20" y1="200" x2="260" y2="200" stroke="#FFFFFF" strokeWidth="3" opacity="0.85" strokeLinecap="round" />
            <line x1="140" y1="80" x2="140" y2="320" stroke="#FFFFFF" strokeWidth="3" opacity="0.85" strokeLinecap="round" />
            {/* Diagonal Secondary Glare Beams */}
            <line x1="65" y1="125" x2="215" y2="275" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" strokeLinecap="round" />
            <line x1="65" y1="275" x2="215" y2="125" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" strokeLinecap="round" />
            {/* Diamond Core Specular Star */}
            <polygon points="140,184 156,200 140,216 124,200" fill="#FFFFFF" opacity="0.98" />
          </svg>
        </div>

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

          {/* Big Key Stats (Animated 2-Second Increments) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 max-w-5xl mx-auto pt-2">
            {[
              {
                value: `${placementStats.offers.toLocaleString()}+`,
                label: 'Placement Offers',
                border: 'from-emerald-400 to-teal-500'
              },
              {
                value: `${placementStats.highest}+ LPA`,
                label: 'Highest Package',
                border: 'from-cyan-400 to-blue-500'
              },
              {
                value: `${placementStats.rate.toFixed(1)}%`,
                label: 'Placement Rate',
                border: 'from-amber-400 to-orange-500'
              },
              {
                value: `${placementStats.partners}+`,
                label: 'Hiring Partners',
                border: 'from-purple-400 to-indigo-500'
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="placement-card-reveal group relative p-6 sm:p-7 rounded-3xl bg-white/90 hover:bg-white backdrop-blur-xl border border-slate-200/90 hover:border-teal-500/50 shadow-[0_10px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(13,148,136,0.12)] transition-all duration-300 overflow-hidden text-center"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.border} opacity-80 group-hover:h-1.5 transition-all duration-300`} />
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-mono tracking-tight block tabular-nums group-hover:text-[#0D9488] transition-colors">
                  {stat.value}
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
                  className="placement-badge-reveal px-4 py-2 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-slate-950 border border-slate-200 shadow-2xs text-xs font-semibold transition-all hover:scale-105 hover:border-teal-400/50 cursor-default"
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

