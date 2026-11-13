import React, { useState, useMemo } from 'react';
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
  Sparkles,
  Search,
  LayoutGrid,
  ListFilter,
  X,
  MapPin,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { ALUMNI_SPOTLIGHT, RecruiterCompany } from '../data/collegeData';
import { RecruiterLogo } from '../components/RecruiterLogo';

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

  // Consulting & IT Services
  {
    name: 'Accenture',
    category: 'Consulting & IT Services',
    location: 'Pan India',
    rolesHired: ['Associate Software Engineer', 'Cyber Security Analyst', 'Data Analyst'],
    intakeAnnual: '120+ Offers',
    highestPackage: '₹14.0 LPA',
    logoText: 'Accenture',
  },
  {
    name: 'Tata Consultancy Services (TCS)',
    category: 'Consulting & IT Services',
    location: 'Bhubaneswar / Kolkata / Pune',
    rolesHired: ['TCS Digital', 'TCS Prime', 'TCS Ninja Developer'],
    intakeAnnual: '180+ Offers',
    highestPackage: '₹11.5 LPA',
    logoText: 'TCS',
  },
  {
    name: 'Persistent Systems',
    category: 'Consulting & IT Services',
    location: 'Pune / Hyderabad',
    rolesHired: ['Full Stack Engineer', 'Cloud Product Trainee'],
    intakeAnnual: '32 Offers',
    highestPackage: '₹11.0 LPA',
    logoText: 'Persistent',
  },
  {
    name: 'Infosys',
    category: 'Consulting & IT Services',
    location: 'Bhubaneswar / Bengaluru / Pune',
    rolesHired: ['Specialist Programmer (SP)', 'Digital Specialist (DSE)', 'System Engineer'],
    intakeAnnual: '150+ Offers',
    highestPackage: '₹10.5 LPA',
    logoText: 'Infosys',
  },
  {
    name: 'LTIMindtree',
    category: 'Consulting & IT Services',
    location: 'Bengaluru / Mumbai',
    rolesHired: ['Digital Solutions Engineer', 'Cloud Integration Lead'],
    intakeAnnual: '75+ Offers',
    highestPackage: '₹10.0 LPA',
    logoText: 'LTIMindtree',
  },
  {
    name: 'HCLTech',
    category: 'Consulting & IT Services',
    location: 'Noida / Chennai',
    rolesHired: ['Software Engineer Trainee', 'Enterprise Infra Specialist'],
    intakeAnnual: '85+ Offers',
    highestPackage: '₹9.5 LPA',
    logoText: 'HCLTech',
  },
  {
    name: 'Cognizant',
    category: 'Consulting & IT Services',
    location: 'Bhubaneswar / Kolkata',
    rolesHired: ['GenC Next Developer', 'GenC Elevate Engineer'],
    intakeAnnual: '110+ Offers',
    highestPackage: '₹9.2 LPA',
    logoText: 'Cognizant',
  },
  {
    name: 'Wipro',
    category: 'Consulting & IT Services',
    location: 'Bengaluru / Hyderabad',
    rolesHired: ['Turbo Developer', 'Project Engineer', 'Cloud Developer'],
    intakeAnnual: '90+ Offers',
    highestPackage: '₹9.0 LPA',
    logoText: 'Wipro',
  },
  {
    name: 'KPIT Technologies',
    category: 'Consulting & IT Services',
    location: 'Pune / Bengaluru',
    rolesHired: ['Autonomous Vehicle Software', 'Automotive Embedded Systems'],
    intakeAnnual: '35 Offers',
    highestPackage: '₹9.0 LPA',
    logoText: 'KPIT',
  },
  {
    name: 'Capgemini',
    category: 'Consulting & IT Services',
    location: 'Kolkata / Pune',
    rolesHired: ['Senior Software Analyst', 'Software Engineer'],
    intakeAnnual: '95+ Offers',
    highestPackage: '₹8.5 LPA',
    logoText: 'Capgemini',
  },
  {
    name: 'Hexaware Technologies',
    category: 'Consulting & IT Services',
    location: 'Chennai / Mumbai',
    rolesHired: ['Associate Software Engineer', 'Automation Test Engineer'],
    intakeAnnual: '45 Offers',
    highestPackage: '₹8.5 LPA',
    logoText: 'Hexaware',
  },
  {
    name: 'Tech Mahindra',
    category: 'Consulting & IT Services',
    location: 'Bhubaneswar / Pune',
    rolesHired: ['Telecom Systems Engineer', 'AI Associate Engineer'],
    intakeAnnual: '65+ Offers',
    highestPackage: '₹8.0 LPA',
    logoText: 'Tech Mahindra',
  },
  {
    name: 'Dell Technologies',
    category: 'Consulting & IT Services',
    location: 'Bengaluru',
    rolesHired: ['Systems Software Engineer', 'Data Storage Associate'],
    intakeAnnual: '18 Offers',
    highestPackage: '₹16.0 LPA',
    logoText: 'Dell',
  },
  {
    name: 'HP (Hewlett-Packard)',
    category: 'Consulting & IT Services',
    location: 'Bengaluru',
    rolesHired: ['Software Engineer', 'Hardware Firmware Diagnostics'],
    intakeAnnual: '15 Offers',
    highestPackage: '₹14.5 LPA',
    logoText: 'HP',
  },

  // Core Engineering & Infra
  {
    name: 'Philips Healthcare',
    category: 'Core Engineering & Infra',
    location: 'Bengaluru',
    rolesHired: ['Biomedical Software Engineer', 'Embedded C++ Developer'],
    intakeAnnual: '12 Offers',
    highestPackage: '₹15.0 LPA',
    logoText: 'Philips',
  },
  {
    name: 'Honeywell',
    category: 'Core Engineering & Infra',
    location: 'Bengaluru / Hyderabad',
    rolesHired: ['Avionics Software Engineer', 'Industrial Automation Specialist'],
    intakeAnnual: '20 Offers',
    highestPackage: '₹14.0 LPA',
    logoText: 'Honeywell',
  },
  {
    name: 'Robert Bosch',
    category: 'Core Engineering & Infra',
    location: 'Bengaluru / Coimbatore',
    rolesHired: ['Embedded Automotive Systems', 'Mobility IoT Engineer'],
    intakeAnnual: '22 Offers',
    highestPackage: '₹13.5 LPA',
    logoText: 'Bosch',
  },
  {
    name: 'Siemens',
    category: 'Core Engineering & Infra',
    location: 'Bengaluru / Mumbai',
    rolesHired: ['Industrial Automation Engineer', 'Smart Grid Systems Trainee'],
    intakeAnnual: '14 Offers',
    highestPackage: '₹12.0 LPA',
    logoText: 'Siemens',
  },
  {
    name: 'MIDHANI (Ministry of Defence)',
    category: 'Core Engineering & Infra',
    location: 'Hyderabad',
    rolesHired: ['Assistant Manager', 'Materials & Quality Metallurgist'],
    intakeAnnual: '8 Offers',
    highestPackage: '₹12.0 LPA',
    logoText: 'MIDHANI',
  },
  {
    name: 'Schneider Electric',
    category: 'Core Engineering & Infra',
    location: 'Bengaluru / Gurugram',
    rolesHired: ['Energy Automation Associate', 'PLC Hardware Systems'],
    intakeAnnual: '16 Offers',
    highestPackage: '₹10.5 LPA',
    logoText: 'Schneider',
  },
  {
    name: 'Tata Power',
    category: 'Core Engineering & Infra',
    location: 'Odisha / Mumbai / Jamshedpur',
    rolesHired: ['Graduate Engineer Trainee (GET)', 'Power Transmission Systems'],
    intakeAnnual: '28 Offers',
    highestPackage: '₹8.5 LPA',
    logoText: 'Tata Power',
  },
  {
    name: 'Larsen & Toubro (L&T)',
    category: 'Core Engineering & Infra',
    location: 'Mumbai / Chennai',
    rolesHired: ['Graduate Engineer Trainee (GET)', 'Heavy Civil & Electrical'],
    intakeAnnual: '20 Offers',
    highestPackage: '₹7.5 LPA',
    logoText: 'L&T',
  },

  // FinTech & Analytics
  {
    name: 'Goldman Sachs',
    category: 'FinTech & Analytics',
    location: 'Bengaluru',
    rolesHired: ['Quantitative Financial Analyst', 'Risk Technology Developer'],
    intakeAnnual: '6 Offers',
    highestPackage: '₹32.0 LPA',
    logoText: 'Goldman',
  },
  {
    name: 'Morgan Stanley',
    category: 'FinTech & Analytics',
    location: 'Mumbai / Bengaluru',
    rolesHired: ['Financial Technologist', 'Algorithmic Execution Developer'],
    intakeAnnual: '8 Offers',
    highestPackage: '₹29.0 LPA',
    logoText: 'Morgan Stanley',
  },
  {
    name: 'Deloitte',
    category: 'FinTech & Analytics',
    location: 'Hyderabad / Bengaluru',
    rolesHired: ['Associate Analyst', 'Technology Risk Consultant'],
    intakeAnnual: '24 Offers',
    highestPackage: '₹12.5 LPA',
    logoText: 'Deloitte',
  },
  {
    name: 'Reliance Jio',
    category: 'FinTech & Analytics',
    location: 'Mumbai / Navi Mumbai',
    rolesHired: ['5G Core Network Engineer', 'AI Analytics Trainee'],
    intakeAnnual: '45 Offers',
    highestPackage: '₹12.0 LPA',
    logoText: 'Jio',
  },
  {
    name: 'PwC',
    category: 'FinTech & Analytics',
    location: 'Kolkata / Mumbai',
    rolesHired: ['Technology Consulting Associate', 'Risk Assurance Analyst'],
    intakeAnnual: '24 Offers',
    highestPackage: '₹11.5 LPA',
    logoText: 'PwC',
  },
  {
    name: 'Ernst & Young (EY)',
    category: 'FinTech & Analytics',
    location: 'Gurugram / Bengaluru',
    rolesHired: ['Cybersecurity Advisory Consultant', 'Data Analytics Specialist'],
    intakeAnnual: '28 Offers',
    highestPackage: '₹11.0 LPA',
    logoText: 'EY',
  },
  {
    name: 'KPMG',
    category: 'FinTech & Analytics',
    location: 'Bengaluru / Gurugram',
    rolesHired: ['IT Advisory Associate', 'Forensic & Financial Analytics'],
    intakeAnnual: '20 Offers',
    highestPackage: '₹10.5 LPA',
    logoText: 'KPMG',
  },
  {
    name: 'Adani Group',
    category: 'FinTech & Analytics',
    location: 'Ahmedabad / Bhubaneswar',
    rolesHired: ['Energy Analytics Trainee', 'Enterprise ERP Technologist'],
    intakeAnnual: '25 Offers',
    highestPackage: '₹9.5 LPA',
    logoText: 'Adani',
  },
];

export const PlacementsPage: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'wall' | 'cards'>('wall');
  const [selectedCompany, setSelectedCompany] = useState<RecruiterCompany | null>(null);

  const [recruiterFormOpen, setRecruiterFormOpen] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const stats = [
    { label: 'Overall Placement Rate', value: '94.8%', change: 'Highest across Eastern India', icon: TrendingUp },
    { label: 'Highest Salary Package', value: '₹44.0 LPA', change: 'International Product Giants', icon: Award },
    { label: 'Average Branch Package', value: '₹7.8 LPA', change: '+18.2% Year-on-Year Growth', icon: Briefcase },
    { label: 'Recruiting Companies', value: '120+', change: 'Fortune 500 & Tech Leaders', icon: Globe },
  ];

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      All: ALL_RECRUITERS_EXPANDED.length,
      'Tech Giants': ALL_RECRUITERS_EXPANDED.filter(r => r.category.includes('Tech Giants')).length,
      Consulting: ALL_RECRUITERS_EXPANDED.filter(r => r.category.includes('Consulting')).length,
      'Core Engineering': ALL_RECRUITERS_EXPANDED.filter(r => r.category.includes('Core Engineering')).length,
      FinTech: ALL_RECRUITERS_EXPANDED.filter(r => r.category.includes('FinTech')).length,
    };
  }, []);

  // Filtered recruiters based on category & search query
  const filteredRecruiters = useMemo(() => {
    return ALL_RECRUITERS_EXPANDED.filter((r) => {
      const matchesCategory =
        activeCategory === 'All' ||
        r.category.toLowerCase().includes(activeCategory.toLowerCase());

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        r.name.toLowerCase().includes(query) ||
        r.location.toLowerCase().includes(query) ||
        r.logoText.toLowerCase().includes(query) ||
        r.rolesHired.some((role) => role.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

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

  return (
    <div className="min-h-screen bg-[#FAF9F5] pb-24 text-slate-900 selection:bg-[#0D9488]/20 selection:text-[#0f766e]">
      
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* Placement Key Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl sm:text-4xl font-metro font-extrabold text-[#172554]">
                    {s.value}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-900 block font-metro">
                  {s.label}
                </span>
                <span className="text-[11px] text-[#0D9488] font-semibold mt-1 block">
                  {s.change}
                </span>
              </div>
            );
          })}
        </div>

        {/* T&P 4-Step Career Preparation Framework */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#1b2a60] text-white shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-300 uppercase block mb-1">
              SYSTEMATIC TALENT INCUBATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">The T&amp;P Career Acceleration Model</h3>
            <p className="text-xs text-blue-200 mt-1">Four rigorous stages preparing students from year 1 to final placement day</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                step: '01',
                title: 'Coding & Algorithmic Bootcamps',
                desc: 'Intensive practice in Data Structures, Algorithms in C++, Java, and Python on platforms like LeetCode and HackerRank.',
              },
              {
                step: '02',
                title: 'Full-Stack & Cloud Projects',
                desc: 'Building working production prototypes, microservices, and IoT systems verified by industry mentors.',
              },
              {
                step: '03',
                title: 'Mock Technical & HR Panels',
                desc: 'Simulated interview rounds conducted by senior alumni and corporate leaders from Google, TCS, and Accenture.',
              },
              {
                step: '04',
                title: 'On-Campus Placement Drives',
                desc: 'Direct recruitment drives, pre-placement talks (PPT), and offer negotiations facilitating 94.8% placement conversion.',
              },
            ].map((st, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs">
                <span className="text-2xl font-extrabold text-cyan-300 font-mono block mb-2">{st.step}</span>
                <h4 className="text-sm font-bold text-white mb-1.5">{st.title}</h4>
                <p className="text-xs text-blue-100 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

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

          {/* Interactive Toolbar: Search Bar, Category Filters & View Toggle */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-2xs space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              
              {/* Live Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search company (e.g. Amazon, Google, L&T, TCS, Deloitte)..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-800 placeholder-stone-400 focus:outline-hidden focus:border-[#0D9488] focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* View Switch: Full Coverage Logo Wall vs Detailed Cards */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 border border-stone-200/80 self-end md:self-auto shrink-0">
                <button
                  onClick={() => setViewMode('wall')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'wall'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-stone-600 hover:text-slate-900'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-[#0D9488]" />
                  <span>Logo Wall (Full Div)</span>
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'cards'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-stone-600 hover:text-slate-900'
                  }`}
                >
                  <ListFilter className="w-3.5 h-3.5 text-[#0D9488]" />
                  <span>Detailed Cards</span>
                </button>
              </div>

            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
              {[
                { label: 'All', key: 'All', count: categoryCounts.All },
                { label: 'Tech Giants & Product', key: 'Tech Giants', count: categoryCounts['Tech Giants'] },
                { label: 'Consulting & IT Services', key: 'Consulting', count: categoryCounts.Consulting },
                { label: 'Core Engineering & Infra', key: 'Core Engineering', count: categoryCounts['Core Engineering'] },
                { label: 'FinTech & Analytics', key: 'FinTech', count: categoryCounts.FinTech },
              ].map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#1b2a60] text-white shadow-xs'
                        : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200/80'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
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
                <span>Showing <strong>{filteredRecruiters.length}</strong> verified corporate partners</span>
              </span>
              <span className="text-[11px] text-stone-400">Click any partner card to view package &amp; eligibility specs</span>
            </div>

            {/* 1. LOGO WALL VIEW (Default: Covers the entire div wall-to-wall) */}
            {viewMode === 'wall' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 w-full">
                {filteredRecruiters.map((company) => (
                  <div
                    key={company.name}
                    onClick={() => setSelectedCompany(company)}
                    className="group relative p-3 sm:p-4 rounded-2xl bg-[#FAF9F5] hover:bg-white border border-stone-200/80 hover:border-[#0D9488] shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between items-center h-32 sm:h-36 cursor-pointer hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Top Row: Category tag + Highest Package Pill */}
                    <div className="w-full flex items-center justify-between gap-1">
                      <span className="text-[9px] uppercase tracking-wider text-stone-400 font-mono truncate max-w-[55%]">
                        {company.category.split('&')[0]}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded-full shrink-0">
                        {company.highestPackage}
                      </span>
                    </div>

                    {/* Authentic Logo Container - Scaled to fill & cover the viewing area */}
                    <div className="w-full flex-1 flex items-center justify-center p-2">
                      <RecruiterLogo
                        name={company.name}
                        logoText={company.logoText}
                        className="w-full max-h-12 object-contain transition-transform duration-300 group-hover:scale-108"
                      />
                    </div>

                    {/* Bottom Metadata: Name & Intake */}
                    <div className="w-full pt-1.5 border-t border-stone-200/60 flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-800 truncate" title={company.name}>
                        {company.name}
                      </span>
                      <span className="text-[10px] text-stone-500 font-mono shrink-0 ml-1 font-semibold">
                        {company.intakeAnnual.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 2. DETAILED CARDS VIEW (Expanded role pills, packages & location) */}
            {viewMode === 'cards' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                {filteredRecruiters.map((r) => (
                  <div
                    key={r.name}
                    onClick={() => setSelectedCompany(r)}
                    className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-lg hover:border-[#0D9488] transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      {/* Top Logo Container covering the top header div */}
                      <div className="w-full h-18 bg-[#FAF9F5] rounded-xl p-3 flex items-center justify-center border border-stone-200/70 group-hover:border-[#0D9488]/40 transition-colors mb-3 relative">
                        <RecruiterLogo 
                          name={r.name} 
                          logoText={r.logoText} 
                          className="max-h-11 max-w-[85%] object-contain transition-transform group-hover:scale-105" 
                        />
                        <span className="absolute top-2 right-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {r.highestPackage}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0D9488] transition-colors">
                        {r.name}
                      </h4>
                      <p className="text-[11px] text-stone-400 font-mono mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span>{r.location}</span>
                      </p>

                      <div className="mt-3 pt-3 border-t border-stone-100">
                        <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                          Key Roles Recruited:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {r.rolesHired.map((role, i) => (
                            <span 
                              key={i} 
                              className="text-[10px] bg-stone-100 group-hover:bg-teal-50 group-hover:text-teal-900 text-stone-700 px-2 py-0.5 rounded-md transition-colors"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-[#0D9488] font-bold">
                      <span>Annual Intake: {r.intakeAnnual}</span>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 group-hover:text-[#0D9488] transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Zero Results Feedback */}
            {filteredRecruiters.length === 0 && (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800">No recruiting partner found</h4>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  No companies matched "{searchQuery}". Try searching for other product giants like Google, Amazon, Cisco, L&amp;T, or reset your filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Bottom Placement Cell Trust & Invitation Banner */}
            <div className="mt-8 pt-6 border-t border-stone-200/80 bg-gradient-to-r from-slate-900 via-[#1b2a60] to-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
              <div className="space-y-1.5 text-center md:text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-bold block">
                  CORPORATE ENGAGEMENT CELL
                </span>
                <h4 className="text-lg sm:text-xl font-bold font-serif">
                  Looking to hire top technical &amp; engineering talent?
                </h4>
                <p className="text-xs text-blue-100 max-w-xl">
                  Host an on-campus or virtual placement drive at Trident. Over 4,200+ students across Computer Science, AI, Mechanical, Civil, Electrical, MBA &amp; MCA ready for corporate onboarding.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => setRecruiterFormOpen(true)}
                  className="px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-bold shadow-md cursor-pointer transition-all flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Placement Invite</span>
                </button>
                <a
                  href="mailto:placements@tekkzy.com"
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold cursor-pointer transition-all"
                >
                  Contact T&amp;P Head
                </a>
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

            {/* Top Logo Banner */}
            <div className="w-full h-24 bg-[#FAF9F5] rounded-2xl p-4 flex items-center justify-center border border-stone-200/80 mb-5">
              <RecruiterLogo
                name={selectedCompany.name}
                logoText={selectedCompany.logoText}
                className="max-h-14 max-w-[80%] object-contain"
              />
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#0D9488] uppercase block">
                  {selectedCompany.category}
                </span>
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
