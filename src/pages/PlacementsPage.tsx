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

// Comprehensive roster of 43 leading global corporate recruiters visiting campus
const ALL_RECRUITERS_EXPANDED: RecruiterCompany[] = [
  // Tech Giants & Product
  {
    name: 'Google',
    category: 'Tech Giants & Product',
    location: 'Bengaluru / Hyderabad',
    rolesHired: ['Software Engineer', 'Cloud Engineer', 'Staffing Operations'],
    intakeAnnual: '12 Offers',
    highestPackage: '₹44.0 LPA',
    logoText: 'Google',
  },
  {
    name: 'Microsoft',
    category: 'Tech Giants & Product',
    location: 'Hyderabad / Noida',
    rolesHired: ['SDE-1', 'Cloud Solutions Architect', 'Security Analyst'],
    intakeAnnual: '10 Offers',
    highestPackage: '₹42.5 LPA',
    logoText: 'Microsoft',
  },
  {
    name: 'Amazon Web Services',
    category: 'Tech Giants & Product',
    location: 'Hyderabad / Bengaluru',
    rolesHired: ['Cloud Support Associate', 'Software Development Engineer'],
    intakeAnnual: '14 Offers',
    highestPackage: '₹38.5 LPA',
    logoText: 'Amazon',
  },
  {
    name: 'NVIDIA',
    category: 'Tech Giants & Product',
    location: 'Pune / Bengaluru',
    rolesHired: ['AI Systems Engineer', 'CUDA Developer', 'Deep Learning QA'],
    intakeAnnual: '8 Offers',
    highestPackage: '₹36.0 LPA',
    logoText: 'NVIDIA',
  },
  {
    name: 'Adobe',
    category: 'Tech Giants & Product',
    location: 'Noida / Bengaluru',
    rolesHired: ['Product Software Engineer', 'Creative Cloud Technologist'],
    intakeAnnual: '8 Offers',
    highestPackage: '₹34.0 LPA',
    logoText: 'Adobe',
  },
  {
    name: 'Cisco Systems',
    category: 'Tech Giants & Product',
    location: 'Bengaluru',
    rolesHired: ['Network Engineer', 'Firmware Engineer', 'Software Engineer'],
    intakeAnnual: '18 Offers',
    highestPackage: '₹32.0 LPA',
    logoText: 'Cisco',
  },
  {
    name: 'Salesforce',
    category: 'Tech Giants & Product',
    location: 'Hyderabad / Bengaluru',
    rolesHired: ['Platform Developer', 'Technical Consultant'],
    intakeAnnual: '10 Offers',
    highestPackage: '₹31.0 LPA',
    logoText: 'Salesforce',
  },
  {
    name: 'Qualcomm',
    category: 'Tech Giants & Product',
    location: 'Hyderabad / Chennai',
    rolesHired: ['Embedded Firmware Engineer', '5G Wireless Protocols', 'SoC Validation'],
    intakeAnnual: '12 Offers',
    highestPackage: '₹30.5 LPA',
    logoText: 'Qualcomm',
  },
  {
    name: 'Intel Corporation',
    category: 'Tech Giants & Product',
    location: 'Bengaluru',
    rolesHired: ['Silicon Design Engineer', 'Systems Software Engineer'],
    intakeAnnual: '12 Offers',
    highestPackage: '₹28.0 LPA',
    logoText: 'Intel',
  },
  {
    name: 'Oracle',
    category: 'Tech Giants & Product',
    location: 'Hyderabad / Bengaluru',
    rolesHired: ['Cloud Database Developer', 'Enterprise Server Engineer'],
    intakeAnnual: '22 Offers',
    highestPackage: '₹24.0 LPA',
    logoText: 'Oracle',
  },
  {
    name: 'Samsung R&D',
    category: 'Tech Giants & Product',
    location: 'Noida / Bengaluru',
    rolesHired: ['Mobile OS Engineer', 'Computer Vision Specialist'],
    intakeAnnual: '18 Offers',
    highestPackage: '₹22.5 LPA',
    logoText: 'Samsung',
  },
  {
    name: 'SAP Labs',
    category: 'Tech Giants & Product',
    location: 'Bengaluru',
    rolesHired: ['Enterprise Cloud Developer', 'DevOps Specialist'],
    intakeAnnual: '14 Offers',
    highestPackage: '₹20.0 LPA',
    logoText: 'SAP',
  },
  {
    name: 'IBM',
    category: 'Tech Giants & Product',
    location: 'Kolkata / Bengaluru',
    rolesHired: ['Cloud Architect Associate', 'AI & Quantum Developer'],
    intakeAnnual: '35 Offers',
    highestPackage: '₹18.0 LPA',
    logoText: 'IBM',
  },

];

export const PlacementsPage: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  usePageTextAnimations(pageRef);
  const [galleryKey, setGalleryKey] = useState<number>(0);
  const [selectedCompany, setSelectedCompany] = useState<RecruiterCompany | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [recruiterFormOpen, setRecruiterFormOpen] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // GSAP Entrance animation for cards
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.recruiter-card');
    if (cards.length) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.03,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, [galleryKey]);

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
  const getCategoryGradient = (_category?: string) => {
    return {
      cardBg: 'bg-gradient-to-br from-blue-50/90 via-white to-cyan-50/70 hover:from-blue-100/90 hover:via-white hover:to-cyan-100/80',
      borderColor: 'border-blue-200/80 hover:border-blue-400',
      accentBar: 'bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600',
      badgeBg: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white',
      textAccent: 'text-blue-700',
      shadowGlow: 'hover:shadow-cyan-900/15',
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-16">
        {/* =========================================================================
            SECTION: 120+ GLOBAL RECRUITING PARTNERS
            All companies logos covering the whole div with full responsive coverage
            ========================================================================= */}
        <section id="recruiting-partners-section" className="space-y-6">
          
          {/* Section Header with Stats Callout */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-stone-200/80">
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
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                Global Fortune 500 corporations, product unicorns, defense PSUs, and technology innovators recruiting graduating engineers, MCA, and MBA candidates from Trident.
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-2 rounded-xl bg-white border border-stone-200 shadow-2xs text-left">
                <span className="text-[10px] text-stone-400 font-mono uppercase block font-semibold">Highest Package</span>
                <span className="text-base font-extrabold text-[#0D9488] font-mono">₹44.0 LPA</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white border border-stone-200 shadow-2xs text-left">
                <span className="text-[10px] text-stone-400 font-mono uppercase block font-semibold">Annual Intake</span>
                <span className="text-base font-extrabold text-[#172554] font-mono">450+ Offers</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              MAIN FULL-DIV CONTAINER: HOUSES THE FULL LOGO GRID WALL
              Completely covers the whole div with corporate company logos
              ========================================================================= */}
          <div className="w-full bg-white rounded-3xl border border-stone-200/90 shadow-sm p-5 sm:p-7 lg:p-9 space-y-6">
            
            {/* Top Container Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 pb-3 border-b border-stone-100 font-mono">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Showing <strong>{ALL_RECRUITERS_EXPANDED.length}</strong> premier tech &amp; product recruiting partners</span>
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-stone-400 hidden sm:inline">Click any partner card to view package &amp; eligibility specs</span>
                <button
                  onClick={() => setGalleryKey(prev => prev + 1)}
                  title="Re-animate Gallery (GSAP Entrance)"
                  className="p-1 rounded-md text-stone-400 hover:text-slate-900 hover:bg-stone-100 transition-all cursor-pointer group"
                >
                  <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </div>
            </div>

            {/* CLEAN EQUAL-HEIGHT CORPORATE PARTNERS GRID */}
            <div 
              key={galleryKey}
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 w-full"
            >
              {ALL_RECRUITERS_EXPANDED.map((company) => {
                const grad = getCategoryGradient(company.category);

                return (
                  <div
                    key={company.name}
                    onClick={() => setSelectedCompany(company)}
                    className={`recruiter-card w-full h-[360px] p-5 sm:p-6 rounded-3xl ${grad.cardBg} border ${grad.borderColor} shadow-xs hover:shadow-2xl ${grad.shadowGlow} transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden group hover:-translate-y-1`}
                  >
                    {/* Top Accent Gradient Line */}
                    <div className={`absolute top-0 inset-x-0 h-1.5 ${grad.accentBar}`} />

                    <div>
                      {/* Header Row: Category Eyebrow + Highest Package Badge */}
                      <div className="w-full flex items-center justify-between mb-3 pt-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold">
                          TECH GIANTS
                        </span>
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xs shrink-0">
                          {company.highestPackage}
                        </span>
                      </div>

                      {/* Prominent Scaled Logo Well in Gradient Format */}
                      <div className="w-full h-24 sm:h-26 rounded-2xl bg-gradient-to-b from-white/95 to-slate-50/80 p-4 flex items-center justify-center border border-white shadow-2xs group-hover:shadow-md group-hover:from-white group-hover:to-teal-50/40 transition-all">
                        <RecruiterLogo
                          name={company.name}
                          logoText={company.logoText}
                          className="w-full max-h-16 sm:max-h-18 object-contain transition-transform duration-300 group-hover:scale-108"
                        />
                      </div>

                      {/* Roles Hired Badges */}
                      {company.rolesHired && company.rolesHired.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3.5">
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

                    {/* Bottom Details Row: Full Company Name & Intake */}
                    <div className="w-full pt-3.5 mt-2 border-t border-slate-200/70 flex items-center justify-between text-xs">
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

                    {/* Fluid Color Shift Overlay on Hover */}
                    <div className="color-overlay absolute inset-0 bg-gradient-to-tr from-[#0D9488]/15 via-blue-500/10 to-indigo-500/15 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
                  </div>
                );
              })}

              {/* ROW 4 SPANNING FEATURE CARD: Seamlessly fills the remaining 3 columns with zero blank space */}
              <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3 rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-6 sm:p-7 text-white flex flex-col justify-between border border-slate-700/80 shadow-md relative overflow-hidden h-[360px]">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#0D9488]/15 blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-bold">
                      CORPORATE ENGAGEMENT CELL · RECRUITMENT PARTNER
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold font-serif leading-snug">
                    Looking to hire premier engineering &amp; management talent?
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-xl">
                    Host an on-campus or virtual recruitment drive at Trident. Access 4,200+ pre-vetted engineers and leaders across Computer Science, AI, Mechanical, Civil, Electrical, MBA &amp; MCA.
                  </p>
                </div>

                <div className="relative z-10 pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setRecruiterFormOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0D9488] to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>INVITE TO CAMPUS DRIVE</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="mailto:placements@tekkzy.com"
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>CONTACT T&amp;P HEAD</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

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
