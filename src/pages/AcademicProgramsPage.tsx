import React, { useState, useRef } from 'react';
import { usePageTextAnimations } from '../utils/animations';
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
  Radio,
  Laptop,
  Cpu,
  Microscope,
  Code2,
  Sparkles,
  ExternalLink,
  FileText,
  Users,
  Landmark,
  Calendar,
  X,
  Search,
  BookMarked
} from 'lucide-react';

interface AcademicProgramsPageProps {
  onNavigate: (tab: string) => void;
}

export const AcademicProgramsPage: React.FC<AcademicProgramsPageProps> = ({ onNavigate }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  usePageTextAnimations(pageRef);
  const [activeSchoolId, setActiveSchoolId] = useState<string>('computing');
  const [selectedSchoolModal, setSelectedSchoolModal] = useState<any | null>(null);
  const [selectedGovModal, setSelectedGovModal] = useState<any | null>(null);

  // Quick navigation items
  const navItems = [
    { label: 'Overview', href: '#academic-overview' },
    { label: 'Our Schools & Programmes', href: '#schools-programs' },
    { label: 'Autonomous Regulations', href: '#autonomous-academics' },
    { label: 'Academic Governance', href: '#academic-governance' },
    { label: 'Conferences & Seminars', href: '#academic-conferences' },
    { label: 'Digital Repository & Journals', href: '#digital-repository' }
  ];

  // 6 Dedicated Academic Schools & Programmes
  const schoolsData = [
    {
      id: 'computing',
      name: 'School of Computer Science & Engineering',
      shortName: 'Computer Science & AI',
      degrees: 'B.Tech (CSE, AI & ML, Data Science) · M.Tech · Ph.D',
      tagline: 'AICTE Approved & NBA Tier-1 Accredited',
      icon: Laptop,
      accentColor: '#1E40AF',
      badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
      enrolled: '600+ Scholars Enrolled',
      description: 'Flagship engineering school with outcome-based pedagogy focusing on computational logic, distributed cloud systems, cybersecurity, and deep neural network architectures.',
      specializations: [
        'Artificial Intelligence & Machine Learning',
        'Full-Stack Enterprise Cloud Architecture',
        'Cybersecurity & Cryptographic Systems',
        'Data Science & Predictive Analytics'
      ],
      labs: ['Cisco thingQbator IoT Hub', 'AWS Cloud Computing Lab', 'High Performance AI Cluster', 'Algorithmic Simulation Lab'],
      credits: '160 Credits'
    },
    {
      id: 'applications',
      name: 'School of Computer Applications',
      shortName: 'Computer Applications',
      degrees: 'BCA · MCA (Master of Computer Applications)',
      tagline: 'Industry-Integrated Software Architecture',
      icon: Code2,
      accentColor: '#4338CA',
      badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      enrolled: '300+ Scholars Enrolled',
      description: 'Transforming computing graduates into senior software architects, DevOps specialists, and enterprise full-stack engineers with intensive coding bootcamps.',
      specializations: [
        'Enterprise Java & Spring Cloud Microservices',
        'Modern Python & Generative AI Pipelines',
        'Full-Stack Web Development (React / Next.js / Node.js)',
        'Mobile Application Engineering (Flutter / React Native)'
      ],
      labs: ['Advanced Software Engineering Lab', 'Mobile App Development Center', 'Open Source Contribution Hub'],
      credits: '120 Credits'
    },
    {
      id: 'engineering',
      name: 'School of Electrical & Electronics Engineering',
      shortName: 'Electronics & Electrical',
      degrees: 'B.Tech (ECE, EEE) · M.Tech (VLSI & Embedded)',
      tagline: 'Semiconductor Physics & Wireless 5G Networks',
      icon: Cpu,
      accentColor: '#BE123C',
      badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
      enrolled: '360+ Scholars Enrolled',
      description: 'Premier hardware engineering school training students across semiconductor fabrication, Cadence EDA design, embedded microcontrollers, and modern 5G RF communications.',
      specializations: [
        'VLSI Design & Digital ASIC Verification',
        'Embedded IoT Systems & Robotics Automation',
        'Wireless Sensor Networks & 5G Telemetry',
        'Power Electronics & Smart Grid Systems'
      ],
      labs: ['Cadence EDA Design Center', 'Texas Instruments Embedded Systems Lab', 'RF & Microwave Lab', 'Electric Vehicle Prototyping Hub'],
      credits: '162 Credits'
    },
    {
      id: 'biotech',
      name: 'School of Biotechnology & Applied Sciences',
      shortName: 'Biotechnology',
      degrees: 'B.Sc · M.Sc · Ph.D (Biotechnology)',
      tagline: 'Molecular Genetics & Bioinformatics',
      icon: Microscope,
      accentColor: '#047857',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      enrolled: '180+ Scholars Enrolled',
      description: 'Interdisciplinary research center fostering advancements in recombinant DNA technology, industrial bioprocess fermentation, and computational bioinformatics.',
      specializations: [
        'Genetic Engineering & Molecular Cloning',
        'Bioinformatics & Genomic Data Analytics',
        'Industrial Microbial Bioprocess Technology',
        'Plant Tissue Culture & Environmental Biotechnology'
      ],
      labs: ['Molecular Biology Cleanroom', 'Bioprocess & Fermentation Pilot Plant', 'Bioinformatics Computing Facility'],
      credits: '140 Credits'
    },
    {
      id: 'business',
      name: 'School of Business & Management',
      shortName: 'Business & Management',
      degrees: 'BBA · MBA (Master of Business Administration)',
      tagline: 'Strategic Corporate Leadership & Analytics',
      icon: Briefcase,
      accentColor: '#B45309',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
      enrolled: '240+ Scholars Enrolled',
      description: 'Industry-integrated management school preparing future executives with deep capabilities in financial analytics, digital marketing, and agile organizational leadership.',
      specializations: [
        'Financial Analytics & Algorithmic Banking',
        'Digital Marketing & Omnichannel Growth',
        'Human Capital Analytics & Talent Leadership',
        'Supply Chain Logistics & Global Operations'
      ],
      labs: ['Financial Modeling & Analytics Lab', 'Management Simulation Center', 'Corporate Executive Communication Suite'],
      credits: '104 Credits'
    },
    {
      id: 'humanities',
      name: 'School of Humanities & Foundational Sciences',
      shortName: 'Foundational Sciences',
      degrees: 'Foundational Engineering Sciences & Liberal Arts',
      tagline: 'Applied Mathematics, Physics & Professional Ethics',
      icon: BookOpen,
      accentColor: '#6B21A8',
      badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
      enrolled: 'Core Academic Division',
      description: 'Nurturing foundational analytical rigor, multivariate mathematics, quantum mechanics, and interpersonal executive communication across all undergraduate disciplines.',
      specializations: [
        'Applied Linear Algebra & Numerical Calculus',
        'Quantum Physics & Semiconductor Materials',
        'Engineering Chemistry & Environmental Science',
        'Corporate English & Professional Communication'
      ],
      labs: ['Language & Phonetics Multimedia Lab', 'Applied Physics Optics Lab', 'Environmental Engineering Lab'],
      credits: 'Foundational'
    }
  ];

  // Statutory Councils in Governance
  const governanceBodies = [
    {
      id: 'governing-body',
      title: 'Governing Body',
      subtitle: 'Apex Autonomous Administrative Council',
      icon: Landmark,
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
      description: 'Highest statutory policy-making body responsible for institutional governance, university affiliations, autonomous ordinances, annual capital budgets, and strategic growth.',
      composition: [
        'Chairman of the Trust / Foundation (Chairperson)',
        'Two Eminent Industrialists / Technologists nominated by Trust',
        'One Academician of Repute nominated by UGC New Delhi',
        'One Senior Academician nominated by BPUT University',
        'Director of Technical Education (Govt. of Odisha Nominee)',
        'Principal of the College (Member Secretary)'
      ],
      responsibilities: [
        'Formulation of institutional policies and annual strategic growth roadmaps',
        'Approval of annual capital expenditure, recurrent budgets, and staff audits',
        'Ratification of autonomous statutes, ordinances, and academic affiliations'
      ]
    },
    {
      id: 'academic-council',
      title: 'Academic Council',
      subtitle: 'Supreme Academic Decision Authority',
      icon: GraduationCap,
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-200',
      description: 'Supreme academic authority reviewing and sanctioning all curricula, course syllabi, examination ordinances, degree eligibility standards, and academic honors.',
      composition: [
        'Principal of the College (Chairperson)',
        'All Academic Deans & Heads of Departments',
        'Four External Academic Experts nominated by BPUT',
        'Three Representatives of Industry & Corporate R&D',
        'Controller of Examinations (Invited Member)',
        'Dean Academics (Member Secretary)'
      ],
      responsibilities: [
        'Scrutiny and final sanction of all syllabi formulated by Boards of Studies',
        'Approval of examination rules, evaluation procedures, and promotion criteria',
        'Conferral of academic medals, ranks, and degrees in annual convocation'
      ]
    },
    {
      id: 'board-of-studies',
      title: 'Board of Studies (BOS)',
      subtitle: 'Departmental Curriculum Committees',
      icon: BookOpen,
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      description: 'Discipline-specific curriculum boards designing modern course modules, prescribing lab experiments, selecting textbooks, and ratifying interdisciplinary electives.',
      composition: [
        'Head of the Department (Chairperson)',
        'All Professors and Associate Professors of the Dept',
        'Two Subject Matter Experts from IITs / NITs',
        'One Industry Professional from leading Tech Enterprise',
        'One Post-Graduate Meritorious Alumnus'
      ],
      responsibilities: [
        'Continuous restructuring of discipline curriculum to reflect industry advances',
        'Prescription of textbook editions, reference journals, and software tools',
        'Preparation of question paper banks and examiner panels for university approval'
      ]
    },
    {
      id: 'finance-committee',
      title: 'Finance Committee',
      subtitle: 'Statutory Budget & Audit Authority',
      icon: Briefcase,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
      description: 'Statutory financial oversight council reviewing annual institutional budgets, research grant disbursements, laboratory modernization funds, and scholarships.',
      composition: [
        'Principal of the College (Chairperson)',
        'Managing Trustee / Finance Officer of the Trust',
        'One Senior Teacher nominated by Principal',
        'Finance Officer nominated by Affiliating University (BPUT)',
        'Senior Chartered Accountant / External Auditor'
      ],
      responsibilities: [
        'Preparation of annual recurring and developmental institutional budget estimates',
        'Allocation of dedicated funds for faculty research grants and lab modernizations',
        'Audit of student fee collection, state scholarship disbursements, and endowments'
      ]
    }
  ];

  const activeSchool = schoolsData.find(s => s.id === activeSchoolId) || schoolsData[0];

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FAF8F5] text-stone-900">
      
      {/* =========================================================================
          HERO SECTION: Preserved 100% as requested by User
          ========================================================================= */}
      <section className="relative w-full h-screen min-h-[100dvh] bg-stone-950 overflow-hidden flex flex-col justify-between select-none">
        
        {/* Background Convocation Hero Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/academics_convocation_hero.jpg"
            alt="Academic Convocation & Graduating Scholars"
            className="w-full h-full object-cover object-center scale-102"
            onError={(e) => {
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

        {/* Hero Content Zone */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 w-full my-auto pb-6">
          <div className="max-w-2xl text-left">
            
            {/* Main Huge Serif Headline */}
            <h1 className="font-serif font-bold text-white text-5xl sm:text-6xl md:text-7xl lg:text-[78px] leading-[1.06] tracking-tight drop-shadow-md">
              Curricula &amp;<br />
              academic<br />
              excellence
            </h1>

            {/* Subtitle / Descriptive Text */}
            <p className="text-white/90 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl mt-5 drop-shadow-xs">
              Outcome-Based Technical Pedagogy approved by AICTE New Delhi and affiliated with Biju Patnaik University of Technology (TCT), Odisha. Fostering rigorous inquiry, state-of-the-art research centers, and global placement ecosystems.
            </p>

            {/* Action CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  const target = document.getElementById('schools-programs');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 sm:px-8 py-3.5 rounded-md bg-[#E03D2E] hover:bg-[#c93224] active:scale-98 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-red-950/40 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Schools &amp; Syllabi</span>
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
              <span>TCT Autonomous Regulations</span>
            </span>
            <span className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Choice Based Credit System (CBCS)</span>
            </span>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 1: OVERVIEW & RANKING RECOGNITION (Matching Reference Screenshot)
          ========================================================================= */}
      <section id="academic-overview" className="relative w-full pt-16 sm:pt-20 pb-16 bg-[#FAF8F5] border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Top Split Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6">
              <span className="text-xs font-mono font-bold tracking-widest text-[#1E3A8A] uppercase block mb-3">
                ACADEMIC PHILOSOPHY &amp; PEDAGOGY
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#0F172A] leading-[1.12] tracking-tight">
                Empowering Education,<br />
                <span className="text-[#1E3A8A] italic font-serif font-normal">Inspiring Innovation.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:pt-3">
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
                Trident Academy of Creative Technology is an autonomous institution of excellence affiliated with Biju Patnaik University of Technology (BPUT) and approved by AICTE. We integrate foundational scientific rigor with cutting-edge industry practice, nurturing global innovators, high-impact software architects, and visionary enterprise leaders through outcome-based pedagogy.
              </p>
            </div>
          </div>

          {/* Quick Sub-Navigation Strip (Direct Jump to Sections) */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-200/80 p-2 shadow-2xs">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1 px-1 text-xs font-medium text-stone-600">
              {navItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="px-3.5 py-2 rounded-xl hover:bg-stone-100 hover:text-stone-900 transition-colors whitespace-nowrap font-mono text-[11px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Ranking & Recognition Banner (Matching Golden Ribbon in Screenshot) */}
          <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D97706] via-[#B45309] to-[#92400E] text-white p-6 sm:p-8 lg:p-10 shadow-md relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-300/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
              <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-amber-400/30 pb-4 lg:pb-0 lg:pr-8">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-200 block mb-1">
                  AUTONOMOUS BENCHMARKS
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-tight">
                  Ranking &amp;<br />Recognition
                </h3>
              </div>
              <div className="lg:col-span-8 lg:pl-2 space-y-4">
                <p className="text-amber-50 text-xs sm:text-sm sm:leading-relaxed font-sans">
                  NAAC Grade &apos;A&apos; Accredited Autonomous Institution · NBA Tier-1 Accreditations for CSE &amp; ECE · Ranked among Top Engineering Colleges in Eastern India · Recognized by DSIR as Scientific &amp; Industrial Research Organization (SIRO) · 100% Outcome-Based Pedagogy under BPUT Autonomous Framework.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-amber-100">
                  <span className="inline-flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-full border border-amber-300/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                    <span>NAAC &apos;A&apos; Grade</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-full border border-amber-300/20">
                    <Award className="w-3.5 h-3.5 text-amber-300" />
                    <span>NBA Tier-1 Accredited</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-full border border-amber-300/20">
                    <Building2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>TCT Autonomous</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-full border border-amber-300/20">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>DSIR SIRO Recognized</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: OUR SCHOOLS & PROGRAMMES (Matching Reference Screenshot)
          ========================================================================= */}
      <section id="schools-programs" className="relative w-full py-20 sm:py-28 bg-[#FAF8F5] border-b border-stone-200/80 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section Heading */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-6">
              <span className="text-xs font-mono font-bold tracking-widest text-[#1E3A8A] uppercase block mb-2">
                ACADEMIC DISCIPLINES
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#0F172A] tracking-tight">
                Our Schools<br />
                <span className="text-[#1E3A8A] italic font-serif font-normal">&amp; Programmes</span>
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-stone-600 text-xs sm:text-sm sm:leading-relaxed font-sans max-w-xl">
                From foundational engineering rigors to post-graduate masteries and doctoral research, our academic schools blend theoretical depths with immersive hands-on laboratory experiences, maker hubs, and corporate co-innovation.
              </p>
            </div>
          </div>

          {/* 2-Column Schools Showcase (Matching Left Featured Image + Right Stacked Cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Vertical Featured Tech Card */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl min-h-[580px] flex flex-col justify-between p-8 text-white">
                {/* Background Tech Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="/assets/images/college_tech_lab_1793988185936.jpg"
                    alt="School of Computing & AI Systems"
                    className="w-full h-full object-cover object-center opacity-35 scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-[#0B1528]/80 to-transparent" />
                </div>

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                    FEATURED CURRICULUM
                  </span>
                  <span className="text-xs font-mono text-stone-400">
                    TCT 2026–27
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300">
                    <Laptop className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-blue-300 uppercase tracking-wider block mb-1">
                      {activeSchool.shortName}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-snug">
                      {activeSchool.name}
                    </h3>
                  </div>

                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                    {activeSchool.description}
                  </p>

                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex flex-wrap gap-2 text-[11px] font-mono text-stone-300">
                      <span className="px-2.5 py-1 rounded-md bg-white/10">{activeSchool.credits}</span>
                      <span className="px-2.5 py-1 rounded-md bg-white/10">{activeSchool.enrolled}</span>
                      <span className="px-2.5 py-1 rounded-md bg-white/10">{activeSchool.tagline}</span>
                    </div>

                    <button
                      onClick={() => setSelectedSchoolModal(activeSchool)}
                      className="w-full mt-3 py-3 rounded-xl bg-[#1E3A8A] hover:bg-blue-800 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>View Full Curriculum &amp; Syllabi</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Stack of 6 School Cards */}
            <div className="lg:col-span-7 space-y-4">
              {schoolsData.map((school) => {
                const IconComp = school.icon;
                const isSelected = activeSchoolId === school.id;

                return (
                  <div
                    key={school.id}
                    onClick={() => setActiveSchoolId(school.id)}
                    className={`rounded-2xl p-6 sm:p-7 transition-all duration-300 cursor-pointer border ${
                      isSelected
                        ? 'bg-white shadow-lg border-stone-300 ring-1 ring-blue-900/10 -translate-y-0.5'
                        : 'bg-white/70 hover:bg-white border-stone-200 shadow-2xs hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-[#1E3A8A] text-white shadow-xs' : 'bg-stone-100 text-stone-700'
                        }`}>
                          <IconComp className="w-6 h-6 stroke-[2]" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
                              {school.degrees}
                            </span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${school.badgeBg}`}>
                              {school.tagline}
                            </span>
                          </div>
                          <h4 className="text-lg sm:text-xl font-serif font-bold text-stone-900 tracking-tight">
                            {school.name}
                          </h4>
                          <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                            {school.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 pt-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                          isSelected ? 'bg-blue-100 text-blue-900 translate-x-1' : 'bg-stone-100 text-stone-400'
                        }`}>
                          <ChevronRight className="w-4 h-4 stroke-[2.2]" />
                        </div>
                      </div>
                    </div>

                    {/* Expanded details when card is active */}
                    {isSelected && (
                      <div className="mt-5 pt-5 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block mb-2">
                            Specializations &amp; Modules
                          </span>
                          <ul className="space-y-1 text-xs text-stone-700">
                            {school.specializations.map((spec, sIdx) => (
                              <li key={sIdx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]" />
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block mb-2">
                            Key Laboratories &amp; Hubs
                          </span>
                          <ul className="space-y-1 text-xs text-stone-700">
                            {school.labs.map((lab, lIdx) => (
                              <li key={lIdx} className="flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{lab}</span>
                              </li>
                            ))}
                          </ul>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSchoolModal(school);
                            }}
                            className="mt-4 text-xs font-mono font-bold text-[#1E3A8A] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Open Detailed Syllabus Outline</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: INSTITUTIONAL REGULATIONS / AUTONOMOUS ACADEMICS (Matching Screenshot)
          ========================================================================= */}
      <section id="autonomous-academics" className="relative w-full py-20 sm:py-28 bg-[#FAF8F5] border-b border-stone-200/80 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section Header */}
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-[#1E3A8A] uppercase block mb-2">
              INSTITUTIONAL REGULATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#0F172A] tracking-tight">
              Autonomous<br />
              <span className="text-[#1E3A8A] italic font-serif font-normal">Academics</span>
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-3 font-sans">
              Official regulatory gazettes, academic calendars, credit allocation frameworks, and examination schedules established under BPUT autonomous norms.
            </p>
          </div>

          {/* Alternating Showcase Cards */}
          <div className="space-y-14">
            
            {/* CARD 1: Text Left + Gazette Preview Document Right */}
            <div className="rounded-3xl bg-white border border-stone-200/90 shadow-sm p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E3A8A]">
                    ORDINANCE · TCT AUTONOMOUS GAZETTE
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                  Autonomous Academic Regulations (2026–27)
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-sans">
                  The autonomous framework defines credit requirements, elective baskets, semester registrations, and academic attendance norms mandated by Biju Patnaik University of Technology (BPUT).
                </p>

                <div className="space-y-2.5 text-xs text-stone-700 pt-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>160 Credits CBCS Framework:</strong> Choice-Based Credit System across 8 semesters with interdisciplinary open minors.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>75% Biometric Attendance:</strong> Mandatory 75% class and lab attendance required for end-semester exam clearance.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Continuous Internal Evaluation (CIE):</strong> 30% weightage allocated to mid-semester exams, quizzes, and micro-projects.</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => alert('Downloading Autonomous Academic Regulations Gazette 2026 PDF...')}
                    className="px-5 py-2.5 rounded-full bg-[#1E3A8A] hover:bg-blue-800 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Regulation Gazette PDF</span>
                  </button>
                </div>
              </div>

              {/* Right: Academic Gazette Preview Document Card */}
              <div className="lg:col-span-6 bg-stone-50 border border-stone-300/80 rounded-2xl p-6 sm:p-8 font-serif shadow-xs select-none">
                <div className="border-b-2 border-stone-800 pb-3 mb-4 text-center">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500 block">
                    BIJU PATNAIK UNIVERSITY OF TECHNOLOGY, ODISHA
                  </span>
                  <h4 className="text-base font-bold text-stone-900 tracking-tight mt-1">
                    AUTONOMOUS ACADEMIC REGULATIONS GAZETTE
                  </h4>
                  <span className="text-[10px] font-mono text-stone-400">Ref: TCT/ACA/2026/REG-01 · Effective Academic Year 2026-27</span>
                </div>

                <div className="space-y-3 text-[11px] text-stone-700 font-sans leading-relaxed">
                  <div className="bg-white p-3 rounded-lg border border-stone-200">
                    <span className="font-bold text-stone-900 block font-mono text-[10px] uppercase text-blue-900">Clause 3.1: Degree Credit Allocations</span>
                    <p className="mt-1 text-stone-600">Candidate shall qualify for B.Tech degree on successful completion of 160 earned academic credits across Core Engineering, Humanities, and Open Electives.</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-stone-200">
                    <span className="font-bold text-stone-900 block font-mono text-[10px] uppercase text-emerald-900">Clause 5.4: Assessment Ratio Structure</span>
                    <p className="mt-1 text-stone-600">End-Semester University Exam (50%) + Continuous Mid-Term Evaluation (30%) + Continuous Practical Lab Assessment (20%).</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-stone-200">
                    <span className="font-bold text-stone-900 block font-mono text-[10px] uppercase text-amber-900">Clause 8.2: Lateral Entry Exemptions</span>
                    <p className="mt-1 text-stone-600">Direct admission to 3rd semester for diploma holders with equivalent credit mapping in Basic Sciences.</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-[10px] font-mono text-stone-400">
                  <span>Authorized by Academic Council</span>
                  <span>Page 1 of 48 · Official Seal</span>
                </div>
              </div>
            </div>

            {/* CARD 2: Campus Visual Left + Academic Calendar & Exam Schedule Right */}
            <div className="rounded-3xl bg-white border border-stone-200/90 shadow-sm p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left: Campus Life / Academic Event Visual */}
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-md h-72 sm:h-96">
                <img
                  src="/assets/images/college_campus_hero_1793988186342.jpg"
                  alt="Trident Academic Events & Conclave"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-600 text-white uppercase tracking-wider inline-block mb-1">
                    ACADEMIC SESSION 2026–27
                  </span>
                  <h4 className="text-xl font-serif font-bold text-white">90 Instructional Days Guaranteed</h4>
                  <p className="text-xs text-stone-200 mt-1">Autonomous evaluation schedule published prior to term commencement</p>
                </div>
              </div>

              {/* Right: Text & Details */}
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#047857]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#047857]">
                    SEMESTER TIMETABLES · EVALUATION CYCLE
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                  Academic Calendar &amp; Examination Schedule
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-sans">
                  The Autonomous Examination Cell operates under the Controller of Examinations (COE) with guaranteed semester start dates, mid-term reviews, preparatory leaves, and timely publication of grades.
                </p>

                <div className="space-y-2.5 text-xs text-stone-700 pt-2">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Autumn Semester (Odd Terms):</strong> Commences mid-July, Mid-Term tests in September, End-Term exams in November-December.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Spring Semester (Even Terms):</strong> Commences early January, Mid-Term tests in March, End-Term exams in April-May.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Centralized Grade Publication:</strong> Results notified digitally within 30 days of last examination date with provision for answer script review.</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => alert('Downloading Official Academic Calendar 2026-27...')}
                    className="px-5 py-2.5 rounded-full bg-[#047857] hover:bg-emerald-800 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Calendar 2026–27 PDF</span>
                  </button>
                </div>
              </div>

            </div>

            {/* CARD 3: Text Left + 10-Point Grade Matrix Table Right */}
            <div className="rounded-3xl bg-white border border-stone-200/90 shadow-sm p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B45309]">
                    GRADING &amp; EVALUATION SCALE
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                  Choice-Based Credit System &amp; 10-Point Scale
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-sans">
                  The institution complies strictly with UGC and BPUT guidelines for 10-point absolute and relative grading scales, enabling seamless credit transfers and international equivalence.
                </p>

                <div className="space-y-2.5 text-xs text-stone-700 pt-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>SGPA &amp; CGPA Computation:</strong> Semester and cumulative grade point averages calculated automatically on credit weighted sums.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Lateral Entry Credit Mapping:</strong> OJEE diploma holders given full equivalence for freshman basic science credits.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Honours &amp; Minor Degrees:</strong> Option to earn B.Tech with Honours or Minor by acquiring 20 additional credits in emerging areas.</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => alert('Opening Autonomous Evaluation Guidelines...')}
                    className="px-5 py-2.5 rounded-full bg-[#B45309] hover:bg-amber-800 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>View Evaluation Guidelines</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right: Grade Table Matrix Preview */}
              <div className="lg:col-span-6 bg-stone-50 border border-stone-300/80 rounded-2xl p-6 font-mono text-xs shadow-xs overflow-x-auto">
                <div className="text-center font-serif pb-3 mb-3 border-b border-stone-200">
                  <h5 className="font-bold text-stone-900 text-sm">BPUT 10-Point Letter Grading Scale</h5>
                  <span className="text-[10px] text-stone-500">Autonomous Degree Evaluation Matrix</span>
                </div>
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-300 text-stone-500 font-bold uppercase text-[10px]">
                      <th className="py-2">Score Range</th>
                      <th className="py-2">Letter</th>
                      <th className="py-2">Points</th>
                      <th className="py-2">Qualitative</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-stone-700">
                    <tr><td className="py-1.5 font-bold text-stone-900">90% – 100%</td><td className="font-bold text-emerald-700">O</td><td>10</td><td>Outstanding</td></tr>
                    <tr><td className="py-1.5 font-bold text-stone-900">80% – 89%</td><td className="font-bold text-blue-700">E</td><td>9</td><td>Excellent</td></tr>
                    <tr><td className="py-1.5 font-bold text-stone-900">70% – 79%</td><td className="font-bold text-indigo-700">A</td><td>8</td><td>Very Good</td></tr>
                    <tr><td className="py-1.5 font-bold text-stone-900">60% – 69%</td><td className="font-bold text-purple-700">B</td><td>7</td><td>Good</td></tr>
                    <tr><td className="py-1.5 font-bold text-stone-900">50% – 59%</td><td className="font-bold text-amber-700">C</td><td>6</td><td>Fair</td></tr>
                    <tr><td className="py-1.5 font-bold text-stone-900">40% – 49%</td><td className="font-bold text-stone-700">D</td><td>5</td><td>Pass (Minimum)</td></tr>
                    <tr><td className="py-1.5 font-bold text-stone-900">&lt; 40%</td><td className="font-bold text-rose-700">F</td><td>0</td><td>Fail (Re-appear)</td></tr>
                  </tbody>
                </table>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: ACADEMIC GOVERNANCE & STATUTORY COUNCILS (Matching Screenshot)
          ========================================================================= */}
      <section id="academic-governance" className="relative w-full py-20 sm:py-28 bg-[#FAF8F5] border-b border-stone-200/80 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-6">
              <span className="text-xs font-mono font-bold tracking-widest text-[#1E3A8A] uppercase block mb-2">
                STATUTORY BODIES &amp; COUNCILS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#0F172A] tracking-tight">
                Academic<br />
                <span className="text-[#1E3A8A] italic font-serif font-normal">Governance</span>
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-stone-600 text-xs sm:text-sm sm:leading-relaxed font-sans max-w-xl">
                Statutory bodies and apex administrative councils established under autonomous statutes steering academic rigor, curricula upgrades, research directions, and institution-wide autonomous policies.
              </p>
            </div>
          </div>

          {/* 4 Statutory Councils (Horizontal Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {governanceBodies.map((gov) => {
              const IconComp = gov.icon;

              return (
                <div
                  key={gov.id}
                  className="rounded-2xl p-6 sm:p-7 bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-800 mb-5">
                      <IconComp className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block mb-1">
                      {gov.subtitle}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-stone-900 tracking-tight">
                      {gov.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                      {gov.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-stone-100">
                    <button
                      onClick={() => setSelectedGovModal(gov)}
                      className="text-xs font-mono font-bold text-[#1E3A8A] hover:underline flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View Composition &amp; Role</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dedicated Dark Container: Conferences, Seminars & Symposiums (Matching Screenshot) */}
          <div id="academic-conferences" className="rounded-3xl bg-[#0B1528] text-white p-8 sm:p-12 lg:p-14 relative overflow-hidden border border-slate-800 shadow-xl scroll-mt-20">
            {/* Background ambient lighting */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Text & List of Annual Events */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-blue-400 block mb-2">
                    GLOBAL ACADEMIC CONCLAVES
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                    Conferences, Seminars and Symposiums
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm mt-3 leading-relaxed max-w-xl font-sans">
                    Fostering international peer discourse, research paper proceedings, faculty development programs (FDPs), and technological symposiums co-sponsored by IEEE, AICTE, and DST.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-white">ICISSC: International Conference on Intelligent Systems</h5>
                      <p className="text-[11px] text-stone-400">Annual flagship conference indexed in IEEE Xplore Digital Library with global delegates.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-white">National Symposium on Semiconductor &amp; VLSI Advances</h5>
                      <p className="text-[11px] text-stone-400">Collaborative technical forum with Cadence, SemiX, and leading microelectronics labs.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-white">AICTE Sponsored Faculty Development Programs (FDPs)</h5>
                      <p className="text-[11px] text-stone-400">Two-week intensive pedagogical training on Generative AI, Cloud Security, and Quantum Logic.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => alert('Opening Call for Papers (CFP) for Upcoming ICISSC 2026 Conference...')}
                    className="px-6 py-3 rounded-full bg-white hover:bg-stone-100 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>View Conference Schedule &amp; CFP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Featured Auditorium Visual Card */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 h-80 sm:h-96">
                <img
                  src="/assets/images/college_lecture_hall_1793988205558.jpg"
                  alt="Trident Central Auditorium & Conference Hall"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider inline-block">
                    HYBRID CONCLAVE · DEC 2026
                  </span>
                  <h4 className="text-xl font-serif font-bold text-white">Central Academic Auditorium</h4>
                  <p className="text-xs text-stone-300">
                    800-seat acoustic air-conditioned auditorium equipped with 4K projection and live streaming studio.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: DIGITAL REPOSITORY & PUBLICATIONS (Matching Screenshot)
          ========================================================================= */}
      <section id="digital-repository" className="relative w-full py-20 sm:py-28 bg-[#FAF8F5] border-b border-stone-200/80 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-6">
              <span className="text-xs font-mono font-bold tracking-widest text-[#1E3A8A] uppercase block mb-2">
                RESEARCH DISSEMINATION
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#0F172A] tracking-tight">
                Digital Repository<br />
                <span className="text-[#1E3A8A] italic font-serif font-normal">&amp; Publications</span>
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-stone-600 text-xs sm:text-sm sm:leading-relaxed font-sans max-w-xl">
                Open-access digital repositories, peer-reviewed institutional journals, faculty monograph archives, and global research indexed across Scopus, IEEE Xplore, and Web of Science.
              </p>
            </div>
          </div>

          {/* Primary Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* CARD 1: Central E-Library & Digital Repository */}
            <div className="lg:col-span-6 rounded-3xl bg-white border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src="/assets/images/college_computer_lab_1793988224067.jpg"
                  alt="Digital Library & E-Resources"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-blue-900/90 text-white font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    OPEN ACCESS REPOSITORY
                  </span>
                </div>
              </div>

              <div className="p-7 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
                    Central E-Library &amp; Digital Resources
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-2 font-sans">
                    24/7 campus and remote VPN access to over 50,000+ e-journals, IEEE Xplore, ScienceDirect, SpringerLink, DELNET, and National Digital Library of India (NDLI).
                  </p>

                  <div className="mt-4 space-y-2 text-xs text-stone-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Remote EZproxy Authentication for faculty &amp; students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Turnitin &amp; DrillBit anti-plagiarism verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>DSpace institutional archive of M.Tech &amp; Ph.D dissertations</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-stone-500">NDLI Club Registered</span>
                  <button
                    onClick={() => alert('Accessing Central E-Library Portal...')}
                    className="text-xs font-mono font-bold text-[#1E3A8A] hover:underline flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Access E-Repository</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 2: Trident Journal of Engineering & Technology (TJET) */}
            <div className="lg:col-span-6 rounded-3xl bg-white border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src="/assets/images/college_library_hall_1793988204291.jpg"
                  alt="Trident Journal of Engineering & Technology"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-900/90 text-white font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    PEER-REVIEWED JOURNAL
                  </span>
                </div>
              </div>

              <div className="p-7 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
                    Trident Journal of Engg &amp; Tech (TJET)
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-2 font-sans">
                    Official biannual blind peer-reviewed institutional research journal publishing original breakthroughs, algorithm surveys, and experimental papers across science and engineering.
                  </p>

                  <div className="mt-4 space-y-2 text-xs text-stone-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>ISSN:</strong> 2321-4562 · Indexed in Google Scholar &amp; Copernicus</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Diamond Open Access · Zero Article Processing Charges (APC)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Rigorous double-blind peer-review with external editorial board</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-stone-500">Volume 14 · Issue 2</span>
                  <button
                    onClick={() => alert('Browsing TJET Current & Past Issues...')}
                    className="text-xs font-mono font-bold text-[#047857] hover:underline flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Browse Current Issue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Supporting Metric Cards (Matching Screenshot) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-2xl font-serif font-bold text-stone-900 block">450+</span>
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 mt-1">Scopus &amp; WoS Papers</h5>
              <p className="text-[11px] text-stone-500 mt-2">Indexed faculty publications with international co-authors</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-2xl font-serif font-bold text-stone-900 block">28+</span>
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 mt-1">Patents &amp; IPR Cell</h5>
              <p className="text-[11px] text-stone-500 mt-2">Published and granted national patents in IoT &amp; Robotics</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-2xl font-serif font-bold text-stone-900 block">65,000+</span>
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 mt-1">Physical Volumes</h5>
              <p className="text-[11px] text-stone-500 mt-2">Central library book bank with DELNET automated barcode search</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl font-serif font-bold text-stone-900 block">₹ 2.4 Cr</span>
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 mt-1">Funded Projects</h5>
              <p className="text-[11px] text-stone-500 mt-2">Sponsored grants from AICTE, DST SERB, and MSME Odisha</p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: PRE-FOOTER CTA (Matching Bottom Banner in Screenshot)
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/college_computer_lab_1793988224067.jpg"
            alt="Join Trident Academy"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase block">
              ADMISSIONS OPEN · 2026–27
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Begin your journey at Trident
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-sans">
              Choose an autonomous engineering, computing, or management pathway engineered for real-world impact, published innovations, and premier global placements.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('admissions')}
                className="px-8 py-3.5 rounded-full bg-[#E03D2E] hover:bg-[#c93224] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-red-950/40 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Apply Online Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => alert('Downloading Official Academic Brochure 2026...')}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Academic Brochure</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE MODAL: Detailed School Syllabus Outline
          ========================================================================= */}
      {selectedSchoolModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-stone-200">
            <button
              onClick={() => setSelectedSchoolModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center">
                <selectedSchoolModal.icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
                  {selectedSchoolModal.degrees}
                </span>
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  {selectedSchoolModal.name}
                </h3>
              </div>
            </div>

            <p className="text-xs text-stone-600 mt-3 leading-relaxed">
              {selectedSchoolModal.description}
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 mb-2">
                  Specialized Streams &amp; Core Disciplines
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedSchoolModal.specializations.map((spec: string, i: number) => (
                    <div key={i} className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs text-stone-800 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 mb-2">
                  Dedicated Laboratory Infrastructure
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedSchoolModal.labs.map((lab: string, i: number) => (
                    <div key={i} className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/60 text-xs text-emerald-900 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{lab}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs font-mono text-blue-900">
                <span>Credit Framework: {selectedSchoolModal.credits}</span>
                <span className="font-bold">{selectedSchoolModal.tagline}</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedSchoolModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedSchoolModal(null);
                  onNavigate('admissions');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-blue-800 text-white text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
              >
                Apply for this School
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          INTERACTIVE MODAL: Statutory Governance Body Details
          ========================================================================= */}
      {selectedGovModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-stone-200">
            <button
              onClick={() => setSelectedGovModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-900 flex items-center justify-center">
                <selectedGovModal.icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
                  {selectedGovModal.subtitle}
                </span>
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  {selectedGovModal.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-stone-600 mt-3 leading-relaxed">
              {selectedGovModal.description}
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 mb-2">
                  Statutory Constitution &amp; Members
                </h4>
                <ul className="space-y-2 text-xs text-stone-700">
                  {selectedGovModal.composition.map((member: string, i: number) => (
                    <li key={i} className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A] mt-1.5 shrink-0" />
                      <span>{member}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 mb-2">
                  Key Mandates &amp; Statutory Functions
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {selectedGovModal.responsibilities.map((resp: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-end">
              <button
                onClick={() => setSelectedGovModal(null)}
                className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};