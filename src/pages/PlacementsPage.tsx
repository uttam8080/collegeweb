import React, { useState, useMemo, useRef, useEffect } from 'react';
import { usePageTextAnimations } from '../utils/animations';
import { 
  Briefcase, 
  TrendingUp, 
  Award, 
  Building2, 
  GraduationCap, 
  Download, 
  CheckCircle2, 
  ChevronRight, 
  Users, 
  Globe, 
  BookOpen, 
  Calendar, 
  FileSpreadsheet, 
  Send,
  Building,
  Target,
  X,
  MapPin,
  ArrowRight,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { ALUMNI_SPOTLIGHT, RecruiterCompany } from '../data/collegeData';
import { RecruiterLogo } from '../components/RecruiterLogo';
import { gsap } from '../utils/animations';
import { PlacementHighlightsBanner } from '../components/PlacementHighlightsBanner';

// Comprehensive roster of 24 leading global corporate recruiters visiting campus with varied sizes
interface MasonryRecruiterCompany extends RecruiterCompany {
  size: 'big' | 'medium' | 'small';
  marqueeBadge?: string;
  highlightPill?: string;
}

const ALL_RECRUITERS_MASONRY: MasonryRecruiterCompany[] = [
  // Column 1 target group
  {
    name: 'Google',
    category: 'Tech Giants & Product',
    size: 'big',
    marqueeBadge: 'TIER-1 LEADER',
    highlightPill: '12 Offers • ₹44.0 LPA Super-Dream CTC with Mountain View & Bengaluru Labs',
    location: 'Bengaluru / Hyderabad',
    rolesHired: ['Software Engineer', 'Cloud Engineer', 'Staffing Operations'],
    intakeAnnual: '12 Offers',
    highestPackage: '₹44.0 LPA',
    logoText: 'Google',
  },
  {
    name: 'Adobe',
    category: 'Tech Giants & Product',
    size: 'medium',
    marqueeBadge: 'PRODUCT LEADER',
    location: 'Noida / Bengaluru',
    rolesHired: ['Product Software Engineer', 'Creative Cloud Technologist'],
    intakeAnnual: '8 Offers',
    highestPackage: '₹34.0 LPA',
    logoText: 'Adobe',
  },
  {
    name: 'Infosys',
    category: 'Consulting & IT Services',
    size: 'small',
    location: 'Bhubaneswar / Pune',
    rolesHired: ['Power Programmer (Specialist)', 'Systems Engineer'],
    intakeAnnual: '185 Offers',
    highestPackage: '₹9.5 LPA',
    logoText: 'Infosys',
  },
  {
    name: 'Oracle',
    category: 'Tech Giants & Product',
    size: 'medium',
    marqueeBadge: 'CLOUD INFRA',
    location: 'Hyderabad / Bengaluru',
    rolesHired: ['Cloud Database Developer', 'Enterprise Server Engineer'],
    intakeAnnual: '22 Offers',
    highestPackage: '₹24.0 LPA',
    logoText: 'Oracle',
  },
  {
    name: 'Tech Mahindra',
    category: 'Consulting & IT Services',
    size: 'small',
    location: 'Noida / Pune',
    rolesHired: ['Associate Software Engineer', 'Telecom Systems'],
    intakeAnnual: '80 Offers',
    highestPackage: '₹7.5 LPA',
    logoText: 'Tech Mahindra',
  },
  {
    name: 'Samsung R&D',
    category: 'Tech Giants & Product',
    size: 'medium',
    marqueeBadge: 'AI & VISION',
    location: 'Noida / Bengaluru',
    rolesHired: ['Mobile OS Engineer', 'Computer Vision Specialist'],
    intakeAnnual: '18 Offers',
    highestPackage: '₹22.5 LPA',
    logoText: 'Samsung',
  },

  // Column 2 target group
  {
    name: 'Cisco Systems',
    category: 'Tech Giants & Product',
    size: 'medium',
    marqueeBadge: 'NETWORKING LEADER',
    location: 'Bengaluru',
    rolesHired: ['Network Engineer', 'Firmware Engineer', 'Software Engineer'],
    intakeAnnual: '18 Offers',
    highestPackage: '₹32.0 LPA',
    logoText: 'Cisco',
  },
  {
    name: 'Microsoft',
    category: 'Tech Giants & Product',
    size: 'big',
    marqueeBadge: 'GLOBAL PRODUCT',
    highlightPill: '10 Offers • Campus Innovation Partner with IDC Noida & Hyderabad Centers',
    location: 'Hyderabad / Noida',
    rolesHired: ['SDE-1', 'Cloud Solutions Architect', 'Security Analyst'],
    intakeAnnual: '10 Offers',
    highestPackage: '₹42.5 LPA',
    logoText: 'Microsoft',
  },
  {
    name: 'Wipro',
    category: 'Consulting & IT Services',
    size: 'small',
    location: 'Bengaluru / Hyderabad',
    rolesHired: ['Turbo Developer', 'Elite ASE'],
    intakeAnnual: '140 Offers',
    highestPackage: '₹8.5 LPA',
    logoText: 'Wipro',
  },
  {
    name: 'SAP Labs',
    category: 'Tech Giants & Product',
    size: 'small',
    location: 'Bengaluru',
    rolesHired: ['Enterprise Cloud Developer', 'DevOps Specialist'],
    intakeAnnual: '14 Offers',
    highestPackage: '₹20.0 LPA',
    logoText: 'SAP',
  },
  {
    name: 'Tata Consultancy Services (TCS)',
    category: 'Consulting & IT Services',
    size: 'big',
    marqueeBadge: 'MASS RECRUITER',
    highlightPill: '210+ Total Offers • Prime (₹11.5 LPA), Digital (₹7.5 LPA) & Ninja Tracks',
    location: 'Bhubaneswar / Pan-India',
    rolesHired: ['TCS Prime SDE', 'Digital Developer', 'Innovator'],
    intakeAnnual: '210 Offers',
    highestPackage: '₹11.5 LPA',
    logoText: 'TCS',
  },
  {
    name: 'Tata Power',
    category: 'Core Engineering & Infra',
    size: 'small',
    location: 'Mumbai / Jamshedpur',
    rolesHired: ['Graduate Engineer Trainee', 'Smart Grid Operations'],
    intakeAnnual: '35 Offers',
    highestPackage: '₹8.4 LPA',
    logoText: 'Tata Power',
  },

  // Column 3 target group
  {
    name: 'Amazon Web Services',
    category: 'Tech Giants & Product',
    size: 'big',
    marqueeBadge: 'CLOUD ECOSYSTEM',
    highlightPill: '14 Offers • Dedicated AWS Cloud Academy Track with Certifications',
    location: 'Hyderabad / Bengaluru',
    rolesHired: ['Cloud Support Associate', 'Software Development Engineer', 'DevOps Specialist'],
    intakeAnnual: '14 Offers',
    highestPackage: '₹38.5 LPA',
    logoText: 'Amazon',
  },
  {
    name: 'IBM',
    category: 'Tech Giants & Product',
    size: 'small',
    location: 'Kolkata / Bengaluru',
    rolesHired: ['Cloud Architect Associate', 'AI & Quantum Developer'],
    intakeAnnual: '35 Offers',
    highestPackage: '₹18.0 LPA',
    logoText: 'IBM',
  },
  {
    name: 'Salesforce',
    category: 'Tech Giants & Product',
    size: 'medium',
    marqueeBadge: 'ENTERPRISE SAAS',
    location: 'Hyderabad / Bengaluru',
    rolesHired: ['Platform Developer', 'Technical Consultant'],
    intakeAnnual: '10 Offers',
    highestPackage: '₹31.0 LPA',
    logoText: 'Salesforce',
  },
  {
    name: 'Cognizant',
    category: 'Consulting & IT Services',
    size: 'small',
    location: 'Kolkata / Chennai',
    rolesHired: ['GenC Next', 'GenC Elevate SDE'],
    intakeAnnual: '165 Offers',
    highestPackage: '₹9.25 LPA',
    logoText: 'Cognizant',
  },
  {
    name: 'Goldman Sachs',
    category: 'FinTech & Analytics',
    size: 'big',
    marqueeBadge: 'FINTECH & QUANT',
    highlightPill: '8 Offers • High-Frequency Quantitative Engineering & Global Markets Tech',
    location: 'Bengaluru',
    rolesHired: ['Financial Analyst', 'Quant Developer', 'Risk Tech SDE'],
    intakeAnnual: '8 Offers',
    highestPackage: '₹26.0 LPA',
    logoText: 'Goldman Sachs',
  },
  {
    name: 'Accenture',
    category: 'Consulting & IT Services',
    size: 'medium',
    marqueeBadge: 'GLOBAL TECH',
    location: 'Bengaluru / Kolkata',
    rolesHired: ['Advanced Application Engineering', 'Cloud First Trainee'],
    intakeAnnual: '130 Offers',
    highestPackage: '₹12.0 LPA',
    logoText: 'Accenture',
  },

  // Column 4 target group
  {
    name: 'Qualcomm',
    category: 'Tech Giants & Product',
    size: 'medium',
    marqueeBadge: 'SEMICONDUCTOR & 5G',
    location: 'Hyderabad / Chennai',
    rolesHired: ['Embedded Firmware Engineer', '5G Wireless Protocols', 'SoC Validation'],
    intakeAnnual: '12 Offers',
    highestPackage: '₹30.5 LPA',
    logoText: 'Qualcomm',
  },
  {
    name: 'Capgemini',
    category: 'Consulting & IT Services',
    size: 'small',
    location: 'Kolkata / Pune',
    rolesHired: ['Senior Analyst', 'Cloud Engineer'],
    intakeAnnual: '95 Offers',
    highestPackage: '₹8.0 LPA',
    logoText: 'Capgemini',
  },
  {
    name: 'NVIDIA',
    category: 'Tech Giants & Product',
    size: 'big',
    marqueeBadge: 'AI & GPU SYSTEMS',
    highlightPill: '8 Offers • CUDA Acceleration & Accelerated Deep Learning QA Track',
    location: 'Pune / Bengaluru',
    rolesHired: ['AI Systems Engineer', 'CUDA Developer', 'Deep Learning QA'],
    intakeAnnual: '8 Offers',
    highestPackage: '₹36.0 LPA',
    logoText: 'NVIDIA',
  },
  {
    name: 'Intel Corporation',
    category: 'Tech Giants & Product',
    size: 'medium',
    marqueeBadge: 'SILICON DESIGN',
    location: 'Bengaluru',
    rolesHired: ['Silicon Design Engineer', 'Systems Software Engineer'],
    intakeAnnual: '12 Offers',
    highestPackage: '₹28.0 LPA',
    logoText: 'Intel',
  },
  {
    name: 'Larsen & Toubro',
    category: 'Core Engineering & Infra',
    size: 'small',
    location: 'Chennai / Vadodara',
    rolesHired: ['Graduate Engineer Trainee', 'Heavy Civil Design'],
    intakeAnnual: '28 Offers',
    highestPackage: '₹9.0 LPA',
    logoText: 'Larsen & Toubro',
  },
  {
    name: 'MIDHANI (Ministry of Defence)',
    category: 'Core Engineering & Infra',
    size: 'small',
    location: 'Hyderabad',
    rolesHired: ['Management Trainee (Technical)', 'Defence Metallurgy'],
    intakeAnnual: '15 Offers',
    highestPackage: '₹11.0 LPA',
    logoText: 'MIDHANI',
  },
];

const CATEGORY_TABS = [
  { id: 'All', label: 'All Partners (24)' },
  { id: 'Tech Giants', label: 'Tech Giants & Product (10)' },
  { id: 'Consulting', label: 'Consulting & IT (7)' },
  { id: 'Core', label: 'Core Engineering & PSUs (4)' },
  { id: 'FinTech', label: 'FinTech & Analytics (3)' },
];

export const PlacementsPage: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  usePageTextAnimations(pageRef);
  const [galleryKey, setGalleryKey] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedCompany, setSelectedCompany] = useState<RecruiterCompany | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [recruiterFormOpen, setRecruiterFormOpen] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const displayedRecruiters = useMemo(() => {
    if (activeCategory === 'All') return ALL_RECRUITERS_MASONRY;
    return ALL_RECRUITERS_MASONRY.filter(r =>
      r.category.toLowerCase().includes(activeCategory.toLowerCase().split(' ')[0])
    );
  }, [activeCategory]);

  // GSAP Entrance animation for cards
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.recruiter-card');
    if (cards.length) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, [galleryKey, activeCategory]);

  const submitRecruiterInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !contactEmail) return;
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setRecruiterFormOpen(false);
      setOrgName('');
      setContactPerson('');
      setContactEmail('');
    }, 2800);
  };

  // Helper for category-tailored modern gradient cards and accents
  const getCategoryGradient = (category?: string) => {
    if (category?.includes('Tech Giants') || category?.includes('Product')) {
      return {
        cardBg: 'bg-white/85 hover:bg-white/95',
        borderColor: 'border-blue-200/70 hover:border-blue-400/90',
        accentBar: 'bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600',
        badgeBg: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white',
        textAccent: 'text-blue-700',
        shadowGlow: 'hover:shadow-blue-500/10',
      };
    }
    if (category?.includes('FinTech') || category?.includes('Analytics')) {
      return {
        cardBg: 'bg-white/85 hover:bg-white/95',
        borderColor: 'border-purple-200/70 hover:border-purple-400/90',
        accentBar: 'bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600',
        badgeBg: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
        textAccent: 'text-purple-700',
        shadowGlow: 'hover:shadow-purple-500/10',
      };
    }
    if (category?.includes('Core')) {
      return {
        cardBg: 'bg-white/85 hover:bg-white/95',
        borderColor: 'border-amber-200/70 hover:border-amber-400/90',
        accentBar: 'bg-gradient-to-r from-amber-600 via-orange-500 to-red-500',
        badgeBg: 'bg-gradient-to-r from-amber-600 to-orange-600 text-white',
        textAccent: 'text-amber-700',
        shadowGlow: 'hover:shadow-amber-500/10',
      };
    }
    // Default / Consulting & IT
    return {
      cardBg: 'bg-white/85 hover:bg-white/95',
      borderColor: 'border-teal-200/70 hover:border-teal-400/90',
      accentBar: 'bg-gradient-to-r from-teal-600 via-emerald-500 to-cyan-600',
      badgeBg: 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white',
      textAccent: 'text-teal-700',
      shadowGlow: 'hover:shadow-teal-500/10',
    };
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FAF9F5] pb-24 text-slate-900 selection:bg-[#0D9488]/20 selection:text-[#0f766e]">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EFE1] border-b border-stone-200 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <span className="text-xs font-mono font-bold tracking-widest text-[#0D9488] uppercase block mb-3">
            DIRECTORATE OF TRAINING &amp; PLACEMENT
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#172554] tracking-tight leading-tight">
            Career Ascendancy &amp; Corporate Placements
          </h1>
          <p className="text-stone-600 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
            Consistently achieving a 94.8% placement record across graduating cohorts through intensive coding bootcamps, soft-skills training, and 120+ global hiring partners.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setRecruiterFormOpen(true)}
              className="px-6 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-bold shadow-md shadow-teal-950/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Invite Trident for Campus Placement</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('recruiting-partners-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-slate-800 text-xs font-bold shadow-2xs transition-all cursor-pointer flex items-center gap-2"
            >
              <Globe className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>View All 120+ Recruiters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Placement Highlights Section (Full-Width Spatial Gradient Background & Expansive 4-Division Layout) */}
      <PlacementHighlightsBanner />

      {/* =========================================================================
          SECTION: ANNUAL CAMPUS RECRUITERS DIRECTORY (MASONRY GALLERY)
          - Full-width section; not placed inside a box
          - Sticky reference 3D geometric background
          - Small, medium, and big divisions with ZERO blank space
          ========================================================================= */}
      <section id="recruiting-partners-section" className="relative w-full py-16 sm:py-24 overflow-visible">
        {/* STICKY REFERENCE GEOMETRIC 3D BACKGROUND */}
        <div className="sticky top-0 h-screen w-full -mb-[100vh] pointer-events-none z-0 overflow-hidden">
          <img
            src="/placements/recruiters-geometric-bg.png"
            alt="Reference Geometric 3D Background"
            className="w-full h-full object-cover object-center opacity-85"
          />
          {/* Subtle gradient overlays to ensure seamless top/bottom transitions into page */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F5] via-white/10 to-[#FAF9F5] pointer-events-none" />
        </div>

        {/* SECTION CONTENT: Relative z-10 so it scrolls smoothly over the sticky background */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Section Header with Stats Callout & Invite CTA */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-300/60">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#0D9488] uppercase">
                  ANNUAL CAMPUS RECRUITERS DIRECTORY
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                120+ Global Recruiting Partners
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
                Global Fortune 500 corporations, product unicorns, defense PSUs, and technology innovators recruiting graduating engineers, MCA, and MBA candidates from Trident.
              </p>
            </div>

            {/* Quick Metrics Strip & Host Drive Action */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-2xs text-left">
                <span className="text-[10px] text-stone-400 font-mono uppercase block font-semibold">Highest Package</span>
                <span className="text-base font-extrabold text-[#0D9488] font-mono">₹44.0 LPA</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-2xs text-left">
                <span className="text-[10px] text-stone-400 font-mono uppercase block font-semibold">Annual Intake</span>
                <span className="text-base font-extrabold text-[#172554] font-mono">450+ Offers</span>
              </div>
              <button
                onClick={() => setRecruiterFormOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Invite to Campus Drive</span>
              </button>
            </div>
          </div>

          {/* Controls Strip (Floating, Not In A Box) */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-1 font-mono">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORY_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategory(tab.id);
                    setGalleryKey(k => k + 1);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#0D9488] text-white shadow-xs'
                      : 'bg-white/85 hover:bg-white text-stone-600 border border-stone-200/80 backdrop-blur-xs'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Gallery Info & Re-animate */}
            <div className="flex items-center gap-3 text-xs text-stone-500">
              <span className="text-[11px] text-stone-500 hidden md:inline">
                Showing <strong>{displayedRecruiters.length}</strong> partners • Click any card for package specs
              </span>
              <button
                onClick={() => setGalleryKey(prev => prev + 1)}
                title="Re-animate Masonry Gallery"
                className="p-1.5 rounded-lg bg-white/85 backdrop-blur-xs border border-stone-200 text-stone-500 hover:text-slate-900 hover:bg-white transition-all cursor-pointer group shadow-2xs"
              >
                <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>
          </div>

          {/* =========================================================================
              MASONRY GALLERY (NO BOX CONTAINER, 100% GAP-FREE MULTI-COLUMN FLOW)
              Cards float over the sticky reference background; variable heights
              ========================================================================= */}
          <div 
            key={galleryKey}
            ref={gridRef}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:_balance] w-full"
          >
            {displayedRecruiters.map((company) => {
              const grad = getCategoryGradient(company.category);

              if (company.size === 'big') {
                return (
                  <div
                    key={company.name}
                    onClick={() => setSelectedCompany(company)}
                    className={`recruiter-card break-inside-avoid inline-block w-full mb-6 rounded-3xl ${grad.cardBg} border ${grad.borderColor} shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgb(13,148,136,0.22)] ${grad.shadowGlow} transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden group hover:-translate-y-1.5 p-6 sm:p-7 backdrop-blur-md`}
                  >
                    <div className={`absolute top-0 inset-x-0 h-1.5 ${grad.accentBar}`} />

                    <div className="space-y-4">
                      {/* Eyebrow */}
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50/90 border border-emerald-200/90 text-emerald-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {company.marqueeBadge || 'TIER-1 RECRUITER'}
                        </span>
                        <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xs shrink-0">
                          {company.highestPackage}
                        </span>
                      </div>

                      {/* Scaled Logo Well */}
                      <div className="w-full h-26 sm:h-28 rounded-2xl bg-gradient-to-b from-white/95 to-slate-50/90 p-4 flex items-center justify-center border border-white shadow-2xs group-hover:shadow-md group-hover:from-white group-hover:to-teal-50/50 transition-all">
                        <RecruiterLogo
                          name={company.name}
                          logoText={company.logoText}
                          className="w-full max-h-16 sm:max-h-20 object-contain transition-transform duration-300 group-hover:scale-108"
                        />
                      </div>

                      {/* Highlight Feature Strip */}
                      {company.highlightPill && (
                        <div className="p-3 rounded-xl bg-teal-50/80 border border-teal-100/90 text-teal-900 text-[11px] leading-relaxed font-medium">
                          <span className="font-bold text-[#0D9488]">Track Highlight: </span>
                          {company.highlightPill}
                        </div>
                      )}

                      {/* Roles Hired Badges */}
                      {company.rolesHired && company.rolesHired.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">Key Hiring Roles</span>
                          <div className="flex flex-wrap gap-1.5">
                            {company.rolesHired.slice(0, 3).map((role, rIdx) => (
                              <span
                                key={rIdx}
                                className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/90 border border-stone-200/80 text-stone-700 font-medium shadow-2xs"
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Details Row */}
                    <div className="w-full pt-4 mt-4 border-t border-slate-200/70 flex items-center justify-between text-xs">
                      <div className="truncate mr-2">
                        <span className="font-bold text-slate-900 group-hover:text-[#0D9488] transition-colors block truncate text-base">
                          {company.name}
                        </span>
                        <span className="text-[11px] text-stone-500 font-mono truncate flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                          {company.location.split('/')[0]}
                        </span>
                      </div>
                      <div className="flex flex-col items-end shrink-0">
                        <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-slate-800 shadow-2xs">
                          {company.intakeAnnual}
                        </span>
                        <span className="text-[10px] font-mono text-[#0D9488] font-bold mt-1 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                          Specs <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="color-overlay absolute inset-0 bg-gradient-to-tr from-[#0D9488]/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
                  </div>
                );
              }

              if (company.size === 'medium') {
                return (
                  <div
                    key={company.name}
                    onClick={() => setSelectedCompany(company)}
                    className={`recruiter-card break-inside-avoid inline-block w-full mb-6 rounded-3xl ${grad.cardBg} border ${grad.borderColor} shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgb(13,148,136,0.18)] ${grad.shadowGlow} transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden group hover:-translate-y-1 p-5 sm:p-6 backdrop-blur-md`}
                  >
                    <div className={`absolute top-0 inset-x-0 h-1 ${grad.accentBar}`} />

                    <div className="space-y-3.5">
                      {/* Eyebrow */}
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold truncate">
                          {company.marqueeBadge || company.category.toUpperCase().split('&')[0].trim()}
                        </span>
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-white shadow-xs shrink-0">
                          {company.highestPackage}
                        </span>
                      </div>

                      {/* Logo Well */}
                      <div className="w-full h-22 sm:h-24 rounded-2xl bg-gradient-to-b from-white/95 to-slate-50/80 p-3.5 flex items-center justify-center border border-white shadow-2xs group-hover:shadow-md group-hover:from-white group-hover:to-teal-50/40 transition-all">
                        <RecruiterLogo
                          name={company.name}
                          logoText={company.logoText}
                          className="w-full max-h-14 sm:max-h-16 object-contain transition-transform duration-300 group-hover:scale-106"
                        />
                      </div>

                      {/* Roles Hired Badges */}
                      {company.rolesHired && company.rolesHired.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {company.rolesHired.slice(0, 2).map((role, rIdx) => (
                            <span
                              key={rIdx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/85 border border-stone-200/70 text-stone-700 truncate"
                            >
                              {role}
                            </span>
                          ))}
                          {company.rolesHired.length > 2 && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/60 text-stone-400">
                              +{company.rolesHired.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Details Row */}
                    <div className="w-full pt-3.5 mt-3 border-t border-slate-200/70 flex items-center justify-between text-xs">
                      <div className="truncate mr-2">
                        <span className="font-bold text-slate-900 group-hover:text-[#0D9488] transition-colors block truncate text-sm">
                          {company.name}
                        </span>
                        <span className="text-[11px] text-stone-500 font-mono truncate block">
                          {company.location.split('/')[0]}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono font-semibold px-2 py-1 rounded-lg bg-white/90 border border-stone-200/70 text-slate-700 shrink-0">
                        {company.intakeAnnual}
                      </span>
                    </div>

                    <div className="color-overlay absolute inset-0 bg-gradient-to-tr from-[#0D9488]/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
                  </div>
                );
              }

              // Small Card
              return (
                <div
                  key={company.name}
                  onClick={() => setSelectedCompany(company)}
                  className={`recruiter-card break-inside-avoid inline-block w-full mb-6 rounded-2xl ${grad.cardBg} border ${grad.borderColor} shadow-[0_2px_10px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgb(13,148,136,0.16)] ${grad.shadowGlow} transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden group hover:-translate-y-1 p-4 sm:p-4.5 backdrop-blur-md`}
                >
                  <div className={`absolute top-0 inset-x-0 h-1 bg-stone-200 group-hover:${grad.accentBar} transition-colors`} />

                  <div className="space-y-2.5">
                    {/* Top Row: Category + Package */}
                    <div className="flex items-center justify-between gap-1.5 pt-0.5">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-stone-400 font-bold truncate">
                        {company.category.split('&')[0].trim()}
                      </span>
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-white border border-stone-200 text-emerald-800 shrink-0 shadow-2xs">
                        {company.highestPackage}
                      </span>
                    </div>

                    {/* Compact Logo Well */}
                    <div className="w-full h-16 sm:h-18 rounded-xl bg-gradient-to-b from-white to-stone-50/70 p-2.5 flex items-center justify-center border border-white shadow-2xs group-hover:shadow-xs group-hover:from-white group-hover:to-teal-50/30 transition-all">
                      <RecruiterLogo
                        name={company.name}
                        logoText={company.logoText}
                        className="w-full max-h-10 sm:max-h-12 object-contain transition-transform duration-300 group-hover:scale-106"
                      />
                    </div>
                  </div>

                  {/* Bottom Row: Name + Intake */}
                  <div className="w-full pt-2.5 mt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <div className="truncate mr-2">
                      <span className="font-bold text-slate-900 group-hover:text-[#0D9488] transition-colors block truncate text-xs">
                        {company.name}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono truncate block">
                        {company.location.split('/')[0]}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-md bg-white border border-stone-200 text-stone-600">
                        {company.intakeAnnual.split(' ')[0]}
                      </span>
                      <ArrowRight className="w-3 h-3 text-stone-300 group-hover:text-[#0D9488] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>

                  <div className="color-overlay absolute inset-0 bg-gradient-to-tr from-[#0D9488]/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
                </div>
              );
            })}
          </div>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-16">
        {/* Alumni Spotlight */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#0D9488] uppercase block mb-1">
              GLOBAL FOOTPRINT
            </span>
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              Alumni Success Stories Worldwide
            </h3>
            <p className="text-xs text-stone-500 mt-1">Meet our distinguished graduates leading global technology teams</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ALUMNI_SPOTLIGHT.map((alum) => (
              <div
                key={alum.id}
                className="p-7 rounded-2xl bg-white border border-stone-200 shadow-2xs flex flex-col justify-between relative"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={alum.image}
                        alt={alum.name}
                        className="w-13 h-13 rounded-full object-cover border-2 border-[#0D9488]"
                      />
                      <div>
                        <h4 className="text-base font-bold text-slate-900">{alum.name}</h4>
                        <p className="text-xs text-[#0D9488] font-semibold">{alum.currentRole}</p>
                        <p className="text-xs text-stone-500 font-medium">{alum.organization}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-50 text-teal-900 border border-teal-200">
                      {alum.badge}
                    </span>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed italic">
                    "{alum.quote}"
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 text-[11px] text-stone-400 font-mono flex items-center justify-between">
                  <span>{alum.program}</span>
                  <span>{alum.batch}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recruiter Details Modal (When any logo card is clicked) */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedCompany(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Top Logo Banner in Gradient Format */}
            <div className="w-full h-32 bg-gradient-to-b from-white via-slate-50 to-teal-50/50 rounded-2xl p-5 flex items-center justify-center border border-stone-200/80 mb-5 shadow-xs">
              <RecruiterLogo
                name={selectedCompany.name}
                logoText={selectedCompany.logoText}
                className="max-h-20 max-w-[85%] object-contain"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mt-0.5">
                  {selectedCompany.name}
                </h3>
                <p className="text-xs text-stone-500 font-mono flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>Primary Placement Hubs: {selectedCompany.location}</span>
                </p>
              </div>

              {/* Package & Intake Metric Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200/70">
                  <span className="text-[10px] font-mono uppercase text-teal-800 font-bold block">
                    Highest CTC Offered
                  </span>
                  <span className="text-xl font-extrabold text-[#0D9488] font-mono">
                    {selectedCompany.highestPackage}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/70">
                  <span className="text-[10px] font-mono uppercase text-blue-800 font-bold block">
                    Annual Placement Intake
                  </span>
                  <span className="text-xl font-extrabold text-[#172554] font-mono">
                    {selectedCompany.intakeAnnual}
                  </span>
                </div>
              </div>

              {/* Roles Hired */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-2">
                  Campus Recruitment Profiles &amp; Designations:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCompany.rolesHired.map((role, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-stone-100 border border-stone-200/80 text-xs font-medium text-slate-800"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedCompany(null);
                    setRecruiterFormOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span>Connect with Placement Cell</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Corporate Recruiter Invitation Modal */}
      {recruiterFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D9488]">
                  T&amp;P Corporate Cell
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-900 mt-1">
                  Invite for Campus Recruitment
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Connect with graduating B.Tech, M.Tech, MCA &amp; MBA talent
                </p>
              </div>
              <button
                onClick={() => setRecruiterFormOpen(false)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {inquirySubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Placement Drive Request Received!</h4>
                <p className="text-xs text-stone-600 max-w-xs mx-auto">
                  Our Head of Placements will reach out to schedule your recruitment slot and pre-placement talk.
                </p>
              </div>
            ) : (
              <form onSubmit={submitRecruiterInquiry} className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Company / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Google, Accenture, Tata Power"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-[#0D9488] bg-stone-50"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="HR Lead / Talent Acquisition Head"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-[#0D9488] bg-stone-50"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Corporate Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="recruiter@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-[#0D9488] bg-stone-50"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setRecruiterFormOpen(false)}
                    className="w-1/3 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Invitation</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
