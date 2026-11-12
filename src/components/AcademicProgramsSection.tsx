import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Clock, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight, 
  Download, 
  Building2, 
  Sparkles, 
  Laptop, 
  Cpu, 
  Layers, 
  Microscope, 
  Briefcase, 
  Code2, 
  X,
  ExternalLink,
  ShieldCheck,
  Award,
  Filter
} from 'lucide-react';
import { gsap, ScrollTrigger } from '../utils/animations';

interface ProgramModule {
  number: string;
  title: string;
}

interface AcademicProgram {
  id: string;
  degree: string;
  duration: string;
  title: string;
  school: string;
  schoolId: string;
  level: 'ug' | 'pg' | 'phd' | 'cert';
  levelLabel: string;
  overview: string;
  coreModules: string[];
  credits?: string;
  accreditation?: string;
  badgeStyle: {
    bg: string;
    text: string;
    border: string;
  };
  accentColor: string;
  accentHex: string;
}

interface Props {
  onNavigate?: (tab: string) => void;
}

export const AcademicProgramsSection: React.FC<Props> = ({ onNavigate }) => {
  const [activeTier, setActiveTier] = useState<'all' | 'ug' | 'pg' | 'phd' | 'cert'>('all');
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [syllabusProgram, setSyllabusProgram] = useState<AcademicProgram | null>(null);
  const [applyProgram, setApplyProgram] = useState<AcademicProgram | null>(null);
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const schoolsRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // 5 Dedicated Academic Schools (Preserved 100% from User Content Specification)
  const schools = [
    {
      id: 'computing',
      name: 'School of Computing',
      degreeTypes: 'B.Tech · M.Tech · Ph.D',
      icon: Laptop,
      accentColor: '#1E40AF', // Deep Blue
      badge: 'bg-blue-50 text-blue-800 border-blue-200'
    },
    {
      id: 'applications',
      name: 'School of Computer Applications',
      degreeTypes: 'BCA · MCA',
      icon: Code2,
      accentColor: '#4338CA', // Indigo
      badge: 'bg-indigo-50 text-indigo-800 border-indigo-200'
    },
    {
      id: 'engineering',
      name: 'School of Engineering',
      degreeTypes: 'B.Tech · M.Tech',
      icon: Cpu,
      accentColor: '#BE123C', // Rose Red
      badge: 'bg-rose-50 text-rose-800 border-rose-200'
    },
    {
      id: 'biotech',
      name: 'School of Biotechnology',
      degreeTypes: 'B.Sc · M.Sc · Ph.D',
      icon: Microscope,
      accentColor: '#047857', // Emerald Green
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      id: 'business',
      name: 'School of Business & Management',
      degreeTypes: 'BBA · MBA',
      icon: Briefcase,
      accentColor: '#B45309', // Amber Gold
      badge: 'bg-amber-50 text-amber-800 border-amber-200'
    }
  ];

  // 7 Authentic Degree Programs (Preserved 100% from User Content Specification)
  const programs: AcademicProgram[] = [
    {
      id: 'prog-cse',
      degree: 'B.Tech',
      duration: '4 Years (8 Semesters)',
      title: 'Computer Science & Engineering',
      school: 'School of Computing',
      schoolId: 'computing',
      level: 'ug',
      levelLabel: 'Undergraduate Degree',
      credits: '160 Credits · AICTE & BPUT Model',
      accreditation: 'NBA Tier-1 Accredited',
      overview: 'Flagship engineering program focused on computing theory, modern algorithmic design, full-stack enterprise systems, cloud scalability, and cybersecurity.',
      coreModules: [
        'Data Structures & Advanced Algorithmic Design',
        'Object-Oriented Software Engineering & Design Patterns',
        'Operating Systems & Distributed Computing Systems'
      ],
      badgeStyle: {
        bg: 'bg-blue-50',
        text: 'text-blue-900',
        border: 'border-blue-200'
      },
      accentColor: 'from-blue-600 via-blue-700 to-indigo-800',
      accentHex: '#1E40AF'
    },
    {
      id: 'prog-cse-aiml',
      degree: 'B.Tech',
      duration: '4 Years (8 Semesters)',
      title: 'CSE (Artificial Intelligence & Machine Learning)',
      school: 'School of Computing',
      schoolId: 'computing',
      level: 'ug',
      levelLabel: 'Undergraduate Degree',
      credits: '164 Credits · AICTE & BPUT Model',
      accreditation: 'AICTE Approved Emerging Area',
      overview: 'Specialized program delving deeply into generative AI models, natural language processing, computer vision, robotics perception, and automated reasoning.',
      coreModules: [
        'Applied Linear Algebra, Multivariate Calculus & Probability',
        'Supervised & Unsupervised Machine Learning Algorithms',
        'Deep Neural Networks (CNNs, RNNs, Transformers)'
      ],
      badgeStyle: {
        bg: 'bg-sky-50',
        text: 'text-sky-900',
        border: 'border-sky-200'
      },
      accentColor: 'from-cyan-600 via-sky-600 to-blue-700',
      accentHex: '#0284C7'
    },
    {
      id: 'prog-ece',
      degree: 'B.Tech',
      duration: '4 Years (8 Semesters)',
      title: 'Electronics & Communication Engineering',
      school: 'School of Engineering',
      schoolId: 'engineering',
      level: 'ug',
      levelLabel: 'Undergraduate Degree',
      credits: '162 Credits · NBA Accredited',
      accreditation: 'NBA Accredited Program',
      overview: 'NBA-accredited program combining semiconductor fundamentals, VLSI design, wireless 5G communications, IoT embedded microcontrollers, and signal processing.',
      coreModules: [
        'Semiconductor Physics & Microelectronic Circuits',
        'Digital Signal Processing & Fourier Transform Math',
        'VLSI Design & CMOS Circuit Layout in Cadence EDA'
      ],
      badgeStyle: {
        bg: 'bg-rose-50',
        text: 'text-rose-900',
        border: 'border-rose-200'
      },
      accentColor: 'from-rose-600 via-rose-700 to-red-800',
      accentHex: '#BE123C'
    },
    {
      id: 'prog-mca',
      degree: 'MCA',
      duration: '2 Years (4 Semesters)',
      title: 'Master of Computer Applications',
      school: 'School of Computer Applications',
      schoolId: 'applications',
      level: 'pg',
      levelLabel: 'Postgraduate Degree',
      credits: '100 Credits · Autonomous Curriculum',
      accreditation: 'AICTE Approved Post-Graduation',
      overview: 'Advanced postgraduate curriculum tailored for high-impact software careers in modern web frameworks, DevOps pipelines, cloud computing, and enterprise database systems.',
      coreModules: [
        'Advanced Java Enterprise Edition & Microservices',
        'Python Data Analytics & Machine Learning Applications',
        'DevOps CI/CD Pipelines, Docker Containers & Kubernetes'
      ],
      badgeStyle: {
        bg: 'bg-indigo-50',
        text: 'text-indigo-900',
        border: 'border-indigo-200'
      },
      accentColor: 'from-indigo-600 via-indigo-700 to-violet-800',
      accentHex: '#4338CA'
    },
    {
      id: 'prog-mba',
      degree: 'MBA',
      duration: '2 Years (4 Semesters)',
      title: 'Master of Business Administration',
      school: 'School of Business',
      schoolId: 'business',
      level: 'pg',
      levelLabel: 'Postgraduate Degree',
      credits: '108 Credits · AICTE Approved',
      accreditation: 'Management Excellence Curriculum',
      overview: 'Premier business management program blending core managerial competencies with modern technological disruptions, financial analytics, and strategic leadership.',
      coreModules: [
        'Financial Management & Investment Banking Analytics',
        'Marketing Management & Digital Growth Hacking',
        'Human Resource Strategy & Organizational Dynamics'
      ],
      badgeStyle: {
        bg: 'bg-amber-50',
        text: 'text-amber-900',
        border: 'border-amber-200'
      },
      accentColor: 'from-amber-600 via-amber-700 to-yellow-800',
      accentHex: '#B45309'
    },
    {
      id: 'prog-phd',
      degree: 'Ph.D',
      duration: '3–5 Years',
      title: 'Doctor of Philosophy in Computer Science & Engineering',
      school: 'School of Computing',
      schoolId: 'computing',
      level: 'phd',
      levelLabel: 'Doctoral Research Degree',
      credits: 'Doctoral Dissertation & Viva Voce',
      accreditation: 'DSIR-SIRO Recognized Research',
      overview: 'Rigorous doctoral research in distributed systems, quantum computing algorithms, explainable AI, computer vision, biomedical signal processing, and IoT security.',
      coreModules: [
        'Advanced Research Methodology & Statistical Modeling',
        'Doctoral Seminar in High-Impact Computer Science',
        'Patent Filing, IPR Laws & Academic Publication Ethics'
      ],
      badgeStyle: {
        bg: 'bg-purple-50',
        text: 'text-purple-900',
        border: 'border-purple-200'
      },
      accentColor: 'from-purple-600 via-purple-700 to-indigo-900',
      accentHex: '#7E22CE'
    },
    {
      id: 'prog-cisco',
      degree: 'CISCO Certified',
      duration: '6 Months (240 Hours)',
      title: 'IoT, Robotics & Autonomous Embedded Systems',
      school: 'CISCO thingQbator Hub',
      schoolId: 'computing',
      level: 'cert',
      levelLabel: 'Professional Industry Certification',
      credits: '240 Laboratory Practicum Hours',
      accreditation: 'CISCO Certified Credential',
      overview: 'Practical industry-backed certification covering sensor networks, LoRaWAN, RTOS, PCB layout fabrication, and autonomous drone firmware development.',
      coreModules: [
        'Microcontroller Firmware (ESP32, STM32, Arduino)',
        'LoRaWAN, Zigbee & Industrial Cloud Gateways',
        '3D Prototyping & SLA Laser Printing'
      ],
      badgeStyle: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-900',
        border: 'border-emerald-200'
      },
      accentColor: 'from-emerald-600 via-teal-700 to-cyan-800',
      accentHex: '#047857'
    }
  ];

  // Filtering Logic
  const filteredPrograms = programs.filter((p) => {
    const matchesTier = activeTier === 'all' || p.level === activeTier;
    const matchesSchool = !selectedSchool || p.schoolId === selectedSchool;
    return matchesTier && matchesSchool;
  });

  // Scroll-Triggered Micro-Animations (GSAP)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Animate Header Elements
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // 2. Animate 5 School Cards
      if (schoolsRef.current) {
        const schoolButtons = schoolsRef.current.querySelectorAll('.school-card');
        gsap.fromTo(
          schoolButtons,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: schoolsRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // 3. Animate Filter Pills Bar
      if (filterRef.current) {
        gsap.fromTo(
          filterRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: filterRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // 4. Animate Degree Program Cards (Staggered Entrance on Scroll)
      if (cardsContainerRef.current) {
        const programCards = cardsContainerRef.current.querySelectorAll('.program-degree-card');
        gsap.fromTo(
          programCards,
          { opacity: 0, y: 45, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Animate cards when filter changes
  useEffect(() => {
    if (!cardsContainerRef.current) return;
    const cards = cardsContainerRef.current.querySelectorAll('.program-degree-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 25, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out'
      }
    );
  }, [activeTier, selectedSchool]);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone) return;
    setApplySubmitted(true);
    setTimeout(() => {
      setApplyProgram(null);
      setApplySubmitted(false);
      setApplicantName('');
      setApplicantPhone('');
      setApplicantEmail('');
    }, 2800);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-[#FAF9F6] border-b border-stone-200 py-16 sm:py-24 lg:py-28 overflow-hidden select-none"
    >
      
      {/* Background Architectural Ambient Radial Glows */}
      <div 
        className="absolute top-10 -left-28 w-[480px] h-[480px] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/2 -right-32 w-[520px] h-[520px] rounded-full bg-amber-100/40 blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-20 left-1/3 w-[450px] h-[450px] rounded-full bg-emerald-100/30 blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =====================================================================
            1. INSTITUTIONAL SECTION HEADER (Scroll-Animated)
            ===================================================================== */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1528] text-amber-300 border border-stone-800 text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Academic Degrees &amp; Syllabi · Admissions 2026</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-bold text-[#0B1528] tracking-tight leading-[1.14]">
            Academic Schools &amp; Degree Programs
          </h2>

          {/* Subtitle */}
          <p className="text-stone-600 text-sm sm:text-base mt-4 leading-relaxed font-normal">
            AICTE-approved, BPUT-affiliated, and NBA-accredited degrees across 5 dedicated academic schools, combining rigorous theoretical foundations with world-class laboratory innovation.
          </p>
        </div>

        {/* =====================================================================
            2. THE 5 DEDICATED ACADEMIC SCHOOLS (Interactive Faculty Console)
            ===================================================================== */}
        <div ref={schoolsRef} className="mb-12 sm:mb-14">
          <div className="flex items-center justify-between mb-3.5 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0B1528]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-stone-500">
                5 Dedicated Academic Schools
              </span>
            </div>

            {selectedSchool && (
              <button
                onClick={() => setSelectedSchool(null)}
                className="text-xs text-[#991B1B] hover:text-[#7F1D1D] font-bold flex items-center gap-1.5 cursor-pointer bg-rose-50 px-3 py-1 rounded-full border border-rose-200 transition-colors"
              >
                <span>Clear School Filter</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {schools.map((sch) => {
              const Icon = sch.icon;
              const isSelected = selectedSchool === sch.id;

              return (
                <button
                  key={sch.id}
                  onClick={() => setSelectedSchool(isSelected ? null : sch.id)}
                  className={`school-card p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer border relative overflow-hidden group flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-[#0B1528] shadow-lg ring-2 ring-[#0B1528]/15 -translate-y-1'
                      : 'bg-white/85 backdrop-blur-xs border-stone-200/90 shadow-2xs hover:bg-white hover:border-stone-300 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {/* Accent Top Border Indicator */}
                  <div 
                    className={`absolute top-0 inset-x-0 h-1.5 transition-all duration-300 ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                    style={{ backgroundColor: sch.accentColor }}
                  />

                  {/* Watermark Icon in background */}
                  <div className="absolute -bottom-2 -right-2 text-stone-200/60 pointer-events-none group-hover:text-stone-300/80 transition-colors">
                    <Icon className="w-16 h-16 stroke-[1.2]" />
                  </div>

                  <div className="relative z-10">
                    {/* Degree Types Badge (e.g. B.Tech · M.Tech · Ph.D) */}
                    <div className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                      {sch.degreeTypes}
                    </div>

                    {/* School Name */}
                    <h4 className="text-xs sm:text-[13px] font-bold text-stone-900 tracking-tight leading-snug line-clamp-2">
                      {sch.name}
                    </h4>
                  </div>

                  {/* Bottom Indicator */}
                  <div className="relative z-10 mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px]">
                    <div 
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: isSelected ? `${sch.accentColor}20` : '#f3f4f6',
                        color: sch.accentColor
                      }}
                    >
                      <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>

                    <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      isSelected ? 'text-[#0B1528]' : 'text-stone-400 group-hover:text-stone-700'
                    }`}>
                      {isSelected ? 'Active Filter' : 'Filter →'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            3. DEGREE LEVEL FILTER PILLS (Scroll-Animated)
            ===================================================================== */}
        <div ref={filterRef} className="flex items-center justify-center mb-12 sm:mb-14">
          <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-stone-200/80 border border-stone-300/80 shadow-inner gap-1 max-w-full">
            {[
              { id: 'all', label: 'All Curricula' },
              { id: 'ug', label: 'Undergraduate (B.Tech / BCA)' },
              { id: 'pg', label: 'Postgraduate (M.Tech / MCA / MBA)' },
              { id: 'phd', label: 'Doctoral (Ph.D.)' },
              { id: 'cert', label: 'Executive & Certifications' },
            ].map((tab) => {
              const isActive = activeTier === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTier(tab.id as any)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#0B1528] text-white shadow-md scale-102'
                      : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100/70'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            4. THE 7 BESPOKE ACADEMIC DEGREE CARDS GRID (Scroll-Staggered)
            ===================================================================== */}
        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch"
        >
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="program-degree-card group relative bg-white/95 backdrop-blur-xs rounded-3xl border border-stone-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-8px_rgba(11,21,40,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-2 hover:border-stone-300"
            >
              {/* Dynamic Gradient Top Accent Rail */}
              <div 
                className={`h-1.5 w-full bg-gradient-to-r ${prog.accentColor}`} 
              />

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col">
                
                {/* Degree Tag & Duration Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${prog.badgeStyle.bg} ${prog.badgeStyle.text} ${prog.badgeStyle.border}`}>
                    {prog.degree}
                  </span>
                  
                  <span className="text-[11px] font-mono font-semibold text-stone-500 flex items-center gap-1.5 shrink-0 bg-stone-100/80 px-2.5 py-1 rounded-full border border-stone-200/80">
                    <Clock className="w-3 h-3 text-stone-400" />
                    <span>{prog.duration}</span>
                  </span>
                </div>

                {/* Program Title (Bold, Serif, Editorial) */}
                <h3 className="text-xl sm:text-[22px] font-serif font-bold text-[#0B1528] tracking-tight leading-snug group-hover:text-blue-900 transition-colors">
                  {prog.title}
                </h3>

                {/* School Name with Building Icon */}
                <p className="text-xs font-semibold text-stone-600 mt-1.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                  <span>{prog.school}</span>
                  {prog.accreditation && (
                    <>
                      <span className="text-stone-300">·</span>
                      <span className="text-emerald-700 font-medium">{prog.accreditation}</span>
                    </>
                  )}
                </p>

                {/* Program Overview */}
                <p className="text-xs sm:text-[13px] text-stone-600 mt-3.5 leading-relaxed flex-1 font-normal">
                  {prog.overview}
                </p>

                {/* Core Curricular Modules (Editorial Numbered Format) */}
                <div className="mt-6 pt-5 border-t border-stone-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
                      Core Curricular Modules
                    </span>
                    <span className="text-[10px] font-mono text-stone-400 font-semibold">
                      3 Core Tracks
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {prog.coreModules.map((moduleName, idx) => (
                      <li 
                        key={idx} 
                        className="p-2.5 rounded-xl bg-stone-50/70 border border-stone-200/60 flex items-start gap-2.5 text-xs text-stone-800 leading-snug group/module hover:bg-white hover:border-stone-300 transition-colors"
                      >
                        <span 
                          className="font-mono font-bold text-[10px] w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-white shadow-2xs"
                          style={{ backgroundColor: prog.accentHex }}
                        >
                          0{idx + 1}
                        </span>
                        <span className="font-medium text-stone-700 group-hover/module:text-stone-950 transition-colors">
                          {moduleName}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Card Footer CTAs (Matching Exact User Specification) */}
              <div className="px-6 py-4 bg-stone-50/90 border-t border-stone-100 flex items-center justify-between gap-3">
                
                {/* View Syllabus CTA */}
                <button
                  onClick={() => setSyllabusProgram(prog)}
                  className="text-xs font-bold text-stone-800 hover:text-blue-900 flex items-center gap-1.5 transition-colors cursor-pointer group/btn"
                >
                  <FileText className="w-3.5 h-3.5 text-stone-500 group-hover/btn:text-blue-800 transition-colors" />
                  <span>View Syllabus</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                {/* Apply Online CTA (Deep Indian Navy/Crimson Primary Button) */}
                <button
                  onClick={() => setApplyProgram(prog)}
                  className="px-4 py-2 rounded-xl bg-[#0B1528] hover:bg-[#1a2d4f] text-white text-xs font-semibold tracking-wide transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <span>Apply Online</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* Empty State if filter yields zero */}
        {filteredPrograms.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/80 p-8 max-w-lg mx-auto shadow-xs">
            <Filter className="w-8 h-8 text-stone-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-stone-800">No Programs Found</h4>
            <p className="text-stone-500 text-xs mt-1">
              No programs match the selected school and level filter combination.
            </p>
            <button
              onClick={() => {
                setActiveTier('all');
                setSelectedSchool(null);
              }}
              className="mt-4 px-5 py-2 rounded-xl bg-[#0B1528] text-white text-xs font-semibold cursor-pointer shadow-xs"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Bottom Catalog Action Bar */}
        <div className="mt-14 sm:mt-18 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 p-3 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
            <span className="text-xs text-stone-600 pl-2">
              Looking for credit transfer regulations or lateral entry admissions?
            </span>
            <button
              onClick={() => onNavigate && onNavigate('programs')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B1528] hover:bg-[#1b2a60] text-white text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-xs"
            >
              <span>Explore Complete 2026 Academic Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* =====================================================================
          5. INTERACTIVE SYLLABUS DETAIL MODAL
          ===================================================================== */}
      {syllabusProgram && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSyllabusProgram(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#0B1528] text-white p-6 sm:p-8 relative">
              <button
                onClick={() => setSyllabusProgram(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-[11px] font-mono font-bold">
                  {syllabusProgram.degree}
                </span>
                <span className="text-xs text-stone-300 font-mono">
                  {syllabusProgram.duration}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                {syllabusProgram.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 mt-1 flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{syllabusProgram.school}</span>
                {syllabusProgram.accreditation && (
                  <>
                    <span>·</span>
                    <span className="text-amber-300">{syllabusProgram.accreditation}</span>
                  </>
                )}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
              {/* Program Overview */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400 mb-2">
                  Curriculum Architecture &amp; Objectives
                </h4>
                <p className="text-stone-700 text-sm leading-relaxed">
                  {syllabusProgram.overview}
                </p>
              </div>

              {/* Core Curricular Modules Detailed */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center justify-between">
                  <span>Core Modules &amp; Laboratory Work</span>
                  <span className="text-[11px] text-blue-900 font-sans font-bold">Autonomous Syllabus 2026</span>
                </h4>

                <div className="space-y-2.5">
                  {syllabusProgram.coreModules.map((mod, idx) => (
                    <div 
                      key={idx} 
                      className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-lg bg-[#0B1528] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-stone-900">
                          {mod}
                        </h5>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Lectures, Experimental Laboratory Practicals, and Industry Capstone Projects.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regulatory Notice */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-800 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Accredited by AICTE, New Delhi and BPUT, Odisha. Includes mandatory continuous evaluation, internal credit assignments, and industrial internship credit transfer.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-stone-50 px-6 sm:px-8 py-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  alert(`Downloading complete ${syllabusProgram.degree} ${syllabusProgram.title} syllabus PDF (BPUT Autonomous 2026 Edition)...`);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-blue-800" />
                <span>Download Official Syllabus PDF</span>
              </button>

              <button
                onClick={() => {
                  setApplyProgram(syllabusProgram);
                  setSyllabusProgram(null);
                }}
                className="px-5 py-2 rounded-xl bg-[#0B1528] hover:bg-[#1a2d4f] text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer shadow-sm"
              >
                Apply for 2026 Admissions
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =====================================================================
          6. INTERACTIVE DIRECT APPLICATION MODAL
          ===================================================================== */}
      {applyProgram && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setApplyProgram(null)}
        >
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#0B1528] text-white p-6 relative">
              <button
                onClick={() => setApplyProgram(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-[11px] font-mono font-bold tracking-widest text-amber-300 uppercase block mb-1">
                Admissions Portal · Batch 2026–27
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Apply for {applyProgram.degree}
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                {applyProgram.title} · {applyProgram.school}
              </p>
            </div>

            {/* Form */}
            {applySubmitted ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-stone-900">Application Submitted!</h4>
                <p className="text-xs text-stone-600 max-w-xs mx-auto">
                  Thank you, <strong>{applicantName}</strong>. Our admissions directorate will contact you at <strong>{applicantPhone}</strong> within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="p-6 sm:p-7 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Ananya Mohapatra"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#0B1528] focus:border-transparent outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#0B1528] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#0B1528] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#0B1528] hover:bg-[#1a2d4f] text-white text-xs font-bold tracking-wide transition-colors cursor-pointer shadow-md"
                  >
                    Submit Application for {applyProgram.degree} 2026
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
