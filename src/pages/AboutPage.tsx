import React, { useState, useRef } from 'react';
import { usePageTextAnimations } from '../utils/animations';
import { 
  Award, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Building2, 
  Compass, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  Calendar,
  FileCheck,
  TrendingUp,
  GraduationCap
} from 'lucide-react';
import { COLLEGE_META, AT_A_GLANCE } from '../data/collegeData';

interface AboutPageProps {
  onNavigate?: (tab: string) => void;
}

type AboutTab = 
  | 'core-values' 
  | 'legacy' 
  | 'vision' 
  | 'journey' 
  | 'recognitions' 
  | 'leadership' 
  | 'success' 
  | 'compliance';

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<AboutTab>('legacy');
  const pageRef = useRef<HTMLDivElement>(null);
  usePageTextAnimations(pageRef, [activeTab]);

  const navTabs: { id: AboutTab; label: string }[] = [
    { id: 'core-values', label: 'CORE VALUES' },
    { id: 'legacy', label: 'LEGACY' },
    { id: 'vision', label: 'VISION' },
    { id: 'journey', label: 'JOURNEY' },
    { id: 'recognitions', label: 'RECOGNITIONS' },
    { id: 'leadership', label: 'LEADERSHIP' },
    { id: 'success', label: 'SUCCESS' },
    { id: 'compliance', label: 'COMPLIANCE' },
  ];

  const handleTabClick = (id: AboutTab) => {
    setActiveTab(id);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const milestones = [
    {
      year: '2005',
      title: 'Foundation under The DF Group',
      desc: 'TEKKZY College of Technology was founded in the Infocity tech corridor of Bhubaneswar with AICTE approval, dedicated to technical rigor and holistic mentorship.',
    },
    {
      year: '2009',
      title: 'First Graduating Batch & 100% Placement Milestone',
      desc: 'The inaugural engineering cohort recorded marquee placements across leading multinational software vendors and engineering consulting corporations.',
    },
    {
      year: '2014',
      title: 'Tier-1 National Board of Accreditation (NBA)',
      desc: 'Accredited by NBA under Tier-1 outcome-based education parameters, benchmarked against Washington Accord international pedagogical guidelines.',
    },
    {
      year: '2017',
      title: 'NAAC Accreditation & Campus Modernization',
      desc: 'Received institutional NAAC accreditation recognizing state-of-the-art computational infrastructure, faculty research output, and high student retention.',
    },
    {
      year: '2019',
      title: 'DSIR-SIRO Research Organization Status',
      desc: 'Conferred Scientific and Industrial Research Organisation (SIRO) certification by DSIR, Ministry of Science & Technology, Government of India.',
    },
    {
      year: '2021',
      title: 'Flagship CISCO thingQbator Center of Excellence',
      desc: 'Partnered with CISCO to launch Eastern India’s premiere IoT, AI prototyping, and hardware makerspace incubator for student inventors.',
    },
    {
      year: '2026',
      title: 'Autonomous Academic Ordinances & 20 Years of Impact',
      desc: 'Celebrating over two decades of engineering excellence with 5,000+ alumni driving breakthrough technologies across global research labs and Fortune 500 firms.',
    },
  ];

  const coreValues = [
    {
      title: 'Holistic Academic Excellence',
      desc: 'Uncompromising pedagogical rigor, active laboratory experimentation, and research-led outcome-based technical education.',
      icon: <Award className="w-5 h-5 text-[#E8BD63]" />,
    },
    {
      title: 'Character & Ethical Sanskars',
      desc: 'Nurturing deep moral integrity, civic responsibility, and transparent governance rooted in timeless Indian societal ethics.',
      icon: <ShieldCheck className="w-5 h-5 text-[#E8BD63]" />,
    },
    {
      title: 'Out-of-the-Box Innovation',
      desc: 'Instilling aggressive positive ideation, creative experimentation, and rapid hardware-software prototyping through thingQbator.',
      icon: <Sparkles className="w-5 h-5 text-[#E8BD63]" />,
    },
    {
      title: 'Student-Centric Empowerment',
      desc: '24/7 digital academic repositories, individual faculty mentoring, and personalized skill trajectories for global career readiness.',
      icon: <Users className="w-5 h-5 text-[#E8BD63]" />,
    },
    {
      title: 'Sustainable Nation-Building',
      desc: 'Active community engagement through Unnat Bharat Abhiyan, rural clean-energy tech deployments, and environmental stewardship.',
      icon: <Building2 className="w-5 h-5 text-[#E8BD63]" />,
    },
  ];

  const leadershipTeam = [
    {
      name: 'Prof. (Dr.) Mukund Shastri',
      title: 'Vice Chancellor & Academic Patron',
      credentials: 'Ph.D (IIT Kharagpur) · Fellow IEI',
      desc: 'Four decades of distinguished leadership across premier technical universities, steering TEKKZY’s academic ordinances and autonomous curriculum.',
      image: '/assets/images/Vice Chancellor in Academic Regalia.png',
    },
    {
      name: 'Dr. Debasis Panda',
      title: 'Director, R&D & thingQbator Hub',
      credentials: 'Ph.D (IISc Bangalore) · Senior IEEE Member',
      desc: 'Spearheading industrial collaboration, patent filings, and multidisciplinary research projects in Embedded IoT and Applied AI.',
      image: '/assets/images/college_scholar_man_1_1793988498266.jpg',
    },
    {
      name: 'Prof. S. R. Chidambaram',
      title: 'Dean, Academic Affairs & Secretariat',
      credentials: 'M.Tech, Ph.D · Former AICTE Advisory Council',
      desc: 'Overseeing institutional NBA/NAAC compliance, semester curriculum audits, and outcome-based pedagogical assessments.',
      image: '/assets/images/college_scholar_woman_1_1793988497967.jpg',
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FAF8F5] text-[#1E293B] antialiased selection:bg-[#E8BD63]/30 selection:text-[#1E293B]">
      
      {/* =========================================================================
          SUB-NAVBAR / EDITORIAL SECTION TAB STRIP
          Sticky bar beneath top navigation with 4px grid rhythm and flat design
          ========================================================================= */}
      <div className="sticky top-16 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-[1521px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar py-3 gap-6 sm:gap-8 lg:gap-10">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase whitespace-nowrap transition-all pb-1 relative cursor-pointer ${
                    isActive 
                      ? 'text-[#1E293B]' 
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E8BD63] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* =========================================================================
          MAIN EDITORIAL HERO SECTION: "A Legacy of Excellence."
          Matched with screenshot: VR Lab Photo (Left) + Editorial Drop-Cap (Right)
          With faint "LEGACY" watermark in background
          ========================================================================= */}
      <section id="legacy" className="relative overflow-hidden py-12 sm:py-16 lg:py-20 border-b border-stone-200/70">
        
        {/* Subtle Faint Background Watermark: "LEGACY" */}
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-16 pointer-events-none select-none text-[120px] sm:text-[180px] md:text-[230px] lg:text-[280px] font-serif font-black tracking-widest text-[#1E293B]/[0.03] leading-none z-0"
          aria-hidden="true"
        >
          LEGACY
        </div>

        <div className="relative z-10 max-w-[1521px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left Column: Student VR Tech Lab Photo (Exact match from reference) */}
            <div className="lg:col-span-5 xl:col-span-5">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-200 shadow-xs aspect-[4/5] max-w-md mx-auto lg:max-w-none group">
                <img
                  src="/assets/images/about_students_vr_lab.jpg"
                  alt="Tekkzy College Students in Virtual Reality & Advanced Computing Lab"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    // Fallback to high-res campus tech lab
                    (e.target as HTMLImageElement).src = '/assets/images/college_tech_lab_1793988185936.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Subtle Inset Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/95 text-[11px] font-mono backdrop-blur-md bg-black/40 px-3 py-2 rounded-xl border border-white/10">
                  <span className="font-semibold tracking-wide">CISCO thingQbator Lab</span>
                  <span className="text-amber-300">ESTD 2005</span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Headline & Drop-Cap Story */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-6">
              
              {/* Main Headline: "A Legacy of Excellence." */}
              <div className="space-y-1">
                <h1 className="font-serif font-black text-[#1E293B] text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] leading-[0.98] tracking-[-2px]">
                  A Legacy of
                </h1>
                <h2 className="font-serif italic font-normal text-[#2c3a8c] text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] leading-[0.98] tracking-[-2px]">
                  Excellence.
                </h2>
              </div>

              {/* Editorial Narrative with Drop-Cap "E" */}
              <div className="text-stone-700 text-base sm:text-lg leading-[1.65] font-normal pt-2">
                <p className="text-justify">
                  <span className="float-left text-6xl sm:text-7xl font-serif font-black text-[#2c3a8c] leading-[0.8] mr-3.5 mt-1 select-none">
                    E
                  </span>
                  stablished in 2005, Tekkzy College of Technology has rapidly become one of the most respected names in technical education in Odisha and India — a reputation built not on marketing, but on measurable outcomes and unwavering commitment to quality. Our campus thrives on intellectual curiosity, collaborative energy, and a belief that the most powerful education lives at the intersection of rigorous academics and genuine passion. What truly sets Tekkzy apart is our holistic approach: we nurture character alongside competence, shaping graduates who carry strong values and sanskars alongside technical expertise — producing not just industry-ready professionals, but compassionate, principled leaders prepared to drive the global technological revolution.
                </p>
              </div>

              {/* Key Metric Highlights Strip */}
              <div className="pt-6 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-xl bg-white border border-stone-200/70 shadow-2xs">
                  <span className="block text-2xl font-serif font-bold text-[#1E293B]">20+</span>
                  <span className="block text-[11px] font-mono uppercase text-stone-500 tracking-wider mt-0.5">Years of Legacy</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-stone-200/70 shadow-2xs">
                  <span className="block text-2xl font-serif font-bold text-[#2c3a8c]">5,000+</span>
                  <span className="block text-[11px] font-mono uppercase text-stone-500 tracking-wider mt-0.5">Alumni Worldwide</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-stone-200/70 shadow-2xs">
                  <span className="block text-2xl font-serif font-bold text-[#1E293B]">Tier-1</span>
                  <span className="block text-[11px] font-mono uppercase text-stone-500 tracking-wider mt-0.5">NBA Accredited</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-stone-200/70 shadow-2xs">
                  <span className="block text-2xl font-serif font-bold text-[#E8BD63]">SIRO</span>
                  <span className="block text-[11px] font-mono uppercase text-stone-500 tracking-wider mt-0.5">DSIR Govt of India</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          CORE VALUES SECTION: Modern Balanced Flat Cards with #1E293B & #E8BD63
          ========================================================================= */}
      <section id="core-values" className="py-16 sm:py-20 bg-[#0F172A] text-white">
        <div className="max-w-[1521px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-[#E8BD63] text-xs font-mono font-semibold tracking-wider uppercase mb-3 border border-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-[#E8BD63]" />
              <span>Ethical Foundation &amp; Ethos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white">
              Institutional Core Values
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
              The moral compass and philosophical guiding principles that define every classroom interaction, administrative policy, and laboratory benchmark.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => (
              <div 
                key={idx} 
                className="p-6 sm:p-7 rounded-2xl bg-[#1E293B] border border-slate-700/60 transition-all duration-300 hover:border-[#E8BD63]/50 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:scale-105 transition-transform">
                    {val.icon}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#E8BD63] transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          VISION & MISSION SECTION: Editorial Contrast
          ========================================================================= */}
      <section id="vision" className="py-16 sm:py-20 bg-[#FAF8F5] border-b border-stone-200/80">
        <div className="max-w-[1521px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#2c3a8c] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Strategic Trajectory
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1E293B] tracking-tight">
              Vision &amp; Institutional Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Vision Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/90 shadow-2xs space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-100">
                  <Compass className="w-6 h-6 text-[#E8BD63]" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">
                  Our Vision
                </h3>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed italic border-l-2 border-[#E8BD63] pl-4">
                  "To foster holistic excellence in the new generation of students, instilling in them the power of aggressive positive thinking, insatiable desire for information and knowledge, a penchant for out-of-the-box ideation, and the capacity of execution."
                </p>
              </div>
              <p className="text-[11px] font-mono text-stone-400 pt-4 border-t border-stone-100">
                Ratified by the Academic Council &amp; Governing Body of TEKKZY College of Technology.
              </p>
            </div>

            {/* Mission Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/90 shadow-2xs space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2c3a8c] flex items-center justify-center border border-blue-100">
                <Award className="w-6 h-6 text-[#2c3a8c]" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Our Mission Directives
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#2c3a8c] shrink-0 mt-0.5" />
                  <span>Deliver rigorous outcome-based engineering education benchmarked to AICTE model curricula and NBA Washington Accord rubrics.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#2c3a8c] shrink-0 mt-0.5" />
                  <span>Foster applied research through industry-funded CoEs like CISCO thingQbator, filing indigenous hardware and software patents.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#2c3a8c] shrink-0 mt-0.5" />
                  <span>Cultivate lifelong ethical discipline, cultural sanskars, and empathetic leadership capable of solving pressing national challenges.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          JOURNEY SECTION: 2005 - 2026 Historical Milestones Timeline
          ========================================================================= */}
      <section id="journey" className="py-16 sm:py-20 bg-white border-b border-stone-200/80">
        <div className="max-w-[1521px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#2c3a8c] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Historical Timeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1E293B] tracking-tight mt-2">
              Two Decades of Milestones
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Tracing our growth from inception in 2005 into Eastern India's acclaimed center for engineering education.
            </p>
          </div>

          <div className="space-y-4">
            {milestones.map((m, idx) => (
              <div 
                key={idx} 
                className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:bg-white hover:border-[#2c3a8c]/30 hover:shadow-sm transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="sm:w-32 shrink-0">
                  <span className="text-base sm:text-lg font-mono font-bold text-[#1E293B] px-3.5 py-1.5 rounded-xl bg-white border border-stone-200 inline-block shadow-2xs">
                    {m.year}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-bold text-[#1E293B]">{m.title}</h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          LEADERSHIP SECTION: Key Institutional Governance
          ========================================================================= */}
      <section id="leadership" className="py-16 sm:py-20 bg-[#FAF8F5] border-b border-stone-200/80">
        <div className="max-w-[1521px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#2c3a8c] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Institutional Governance
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1E293B] tracking-tight">
              University Leadership
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Eminent academicians, researchers, and administrators guiding TEKKZY College of Technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipTeam.map((leader, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="w-full h-56 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif font-bold text-[#1E293B]">{leader.name}</h4>
                    <p className="text-xs font-mono font-bold text-[#2c3a8c] mt-0.5">{leader.title}</p>
                    <p className="text-[11px] font-mono text-stone-500 mt-0.5">{leader.credentials}</p>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">{leader.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          RECOGNITIONS & COMPLIANCE: Statutory Accreditations Strip
          ========================================================================= */}
      <section id="compliance" className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1521px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Statutory Approvals
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Accreditations, Affiliations &amp; Governance
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Full compliance with regulatory authorities ensuring nationally recognized engineering qualifications.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { title: 'AICTE Approved', sub: 'New Delhi Norms' },
              { title: 'TCT Affiliated', sub: 'State Tech University' },
              { title: 'NAAC Accredited', sub: 'Institutional Grade' },
              { title: 'NBA Tier-1', sub: 'Outcome-Based Curricula' },
              { title: 'DSIR-SIRO', sub: 'Govt Research Body' },
              { title: 'CISCO Certified', sub: 'thingQbator Makerspace' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 shadow-2xs">
                <span className="block text-xs font-bold text-[#1E293B]">{item.title}</span>
                <span className="block text-[10px] font-mono text-stone-500 mt-1">{item.sub}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
