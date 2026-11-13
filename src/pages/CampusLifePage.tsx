import React, { useState, useEffect, useRef } from 'react';
import { 
  Landmark, 
  Compass, 
  Award, 
  Users, 
  BookOpen, 
  Music, 
  Sparkles, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Coffee, 
  Trophy, 
  ShieldCheck,
  ArrowRight,
  Cpu,
  Terminal,
  Layers,
  Code2,
  Briefcase,
  Binary
} from 'lucide-react';
import { gsap, ScrollTrigger } from '../utils/animations';
import { CAMPUS_FACILITIES } from '../data/collegeData';

export const CampusLifePage: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const [activeFacility, setActiveFacility] = useState<string>(CAMPUS_FACILITIES[0].id);
  const [activeClubIndex, setActiveClubIndex] = useState<number>(0);
  const clubsSectionRef = useRef<HTMLElement>(null);
  const clubCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 6 Student Technical Clubs & Societies ("From First Principles" 2-Col Interactive Architecture)
  const clubsData = [
    {
      id: '01',
      category: 'AUTONOMOUS SYSTEMS & HARDWARE',
      tabCategory: 'ROBOTICS & HARDWARE',
      tabTitle: 'TRDC Autonomous Systems & Drones',
      headerTag: 'ROBOTICS & EMBEDDED · TRDC',
      headerDotColor: 'bg-[#1E3A8A]',
      headerTextColor: 'text-[#1E3A8A]',
      name: 'Trident Robotics & Drone Club (TRDC)',
      members: 320,
      pillars: [
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Cpu,
          eyebrow: 'AUTONOMOUS UAVS & ROVERS',
          headline: 'Breadboards to Autonomous Flight',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Building autonomous UAV quadcopters, maze-solving rovers, computer-vision robotic arms, and agricultural field sensors with complete onboard telemetry.'
        },
        {
          badgeBg: 'bg-[#047857]',
          iconColor: 'text-white',
          icon: Terminal,
          eyebrow: 'ACTIVE ROBOTICS COMMUNITY',
          headline: '320+ Active Makers & Engineers',
          headlineColor: 'text-[#047857]',
          description:
            'Hands-on weekend build sprints in the maker lab, ROS2 simulations, Raspberry Pi / STM32 microcontroller programming, and Cadence PCB fabrication.'
        },
        {
          badgeBg: 'bg-[#926315]',
          iconColor: 'text-white',
          icon: Trophy,
          eyebrow: 'COMPETITIONS & RECOGNITION',
          headline: 'National Maker Champions',
          headlineColor: 'text-[#926315]',
          description:
            'Consistent podium finishes at IIT Bombay Techfest, e-Yantra Robotics, and national UAV speed rally marathons across India.'
        }
      ]
    },
    {
      id: '02',
      category: 'COMPETITIVE PROGRAMMING & AI',
      tabCategory: 'ALGORITHMS & AI',
      tabTitle: 'CodeNation & AI Developer Circle',
      headerTag: 'SOFTWARE & AI · CODENATION',
      headerDotColor: 'bg-[#047857]',
      headerTextColor: 'text-[#047857]',
      name: 'CodeNation & AI Developer Circle',
      members: 450,
      pillars: [
        {
          badgeBg: 'bg-[#047857]',
          iconColor: 'text-white',
          icon: Code2,
          eyebrow: 'ALGORITHMIC RIGOR & HACKATHONS',
          headline: 'LeetCode & Hackathon Sprints',
          headlineColor: 'text-[#047857]',
          description:
            'Weekly algorithm workshops, competitive coding sprints on LeetCode/CodeChef, and full-stack hackathon project teams building generative AI solutions.'
        },
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Layers,
          eyebrow: 'DEVELOPER ECOSYSTEM',
          headline: '450+ Active Programmers',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Mentorship circles pairing freshman coders with senior alumni placed at Google, Microsoft, Amazon, and premier high-frequency trading firms.'
        },
        {
          badgeBg: 'bg-[#926315]',
          iconColor: 'text-white',
          icon: Award,
          eyebrow: 'SMART INDIA HACKATHON',
          headline: 'National Hackathon Finalists',
          headlineColor: 'text-[#926315]',
          description:
            'Multiple teams qualifying annually for the Smart India Hackathon Grand Finale and international ICPC regional competitive programming rounds.'
        }
      ]
    },
    {
      id: '03',
      category: 'ENTREPRENEURSHIP & VENTURES',
      tabCategory: 'STARTUPS & VENTURES',
      tabTitle: 'E-Cell & Startup Incubation Forum',
      headerTag: 'INCUBATION & VENTURES · E-CELL',
      headerDotColor: 'bg-[#926315]',
      headerTextColor: 'text-[#926315]',
      name: 'E-Cell & Startup Incubation Forum',
      members: 280,
      pillars: [
        {
          badgeBg: 'bg-[#926315]',
          iconColor: 'text-white',
          icon: Briefcase,
          eyebrow: 'VENTURE INCUBATION & SEED GRANTS',
          headline: 'Ideas to Registered Enterprises',
          headlineColor: 'text-[#926315]',
          description:
            'Transforming student inventions into registered enterprises through seed pitching, mentor roundtables, IPR patent filings, and angel investment access.'
        },
        {
          badgeBg: 'bg-[#C41F3B]',
          iconColor: 'text-white',
          icon: Binary,
          eyebrow: 'STUDENT FOUNDER NETWORK',
          headline: '280+ Student Founders & Innovators',
          headlineColor: 'text-[#C41F3B]',
          description:
            'Dedicated on-campus incubation co-working suites, legal incorporation advisory, and quarterly investor demo days with Odisha VC ecosystems.'
        },
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Award,
          eyebrow: 'VENTURE PORTFOLIO',
          headline: '18+ Funded Student Startups',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Over 18+ startups successfully launched by undergraduate alumni across IoT agri-tech, fintech, edtech, and SaaS enterprise cloud services.'
        }
      ]
    },
    {
      id: '04',
      category: 'MUSIC, DANCE & DRAMA',
      tabCategory: 'CULTURAL ARTS',
      tabTitle: 'Srijan Cultural & Performing Arts',
      headerTag: 'CREATIVE ARTS · SRIJAN',
      headerDotColor: 'bg-[#C41F3B]',
      headerTextColor: 'text-[#C41F3B]',
      name: 'Srijan Cultural & Performing Arts Society',
      members: 220,
      pillars: [
        {
          badgeBg: 'bg-[#C41F3B]',
          iconColor: 'text-white',
          icon: Music,
          eyebrow: 'ACOUSTICS, THEATRE & CLASSICAL DANCE',
          headline: 'Creative Expression on Stage',
          headlineColor: 'text-[#C41F3B]',
          description:
            'Vibrant acoustic music bands, classical Odissi and Bharatnatyam ensembles, street drama productions, and inter-college cultural representations.'
        },
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Users,
          eyebrow: 'PERFORMING TALENT POOL',
          headline: '220+ Performing Artists',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Weekly acoustic jam sessions, theatrical drama rehearsals, script reading circles, and sound engineering workshops in the campus auditorium.'
        },
        {
          badgeBg: 'bg-[#047857]',
          iconColor: 'text-white',
          icon: Sparkles,
          eyebrow: 'ANNUAL CULTURAL EXTRAVAGANZA',
          headline: 'Flagship Srijan Annual Fest',
          headlineColor: 'text-[#047857]',
          description:
            'Organizing Eastern India beloved inter-college annual cultural festival with over 5,000+ visiting student delegates and celebrity musical concerts.'
        }
      ]
    },
    {
      id: '05',
      category: 'SPORTS & ATHLETICS',
      tabCategory: 'ATHLETICS & WELLNESS',
      tabTitle: 'Olympus Athletics & Sports Council',
      headerTag: 'ATHLETICS & FITNESS · OLYMPUS',
      headerDotColor: 'bg-[#0D9488]',
      headerTextColor: 'text-[#0D9488]',
      name: 'Olympus Athletics & Sports Council',
      members: 380,
      pillars: [
        {
          badgeBg: 'bg-[#0D9488]',
          iconColor: 'text-white',
          icon: Trophy,
          eyebrow: 'INTER-COLLEGE TOURNAMENTS',
          headline: 'Competitive League Sports',
          headlineColor: 'text-[#0D9488]',
          description:
            'Organizing premier inter-college cricket championships, basketball tournaments, badminton open trophies, and football leagues under floodlights.'
        },
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Users,
          eyebrow: 'ATHLETIC COUNCIL',
          headline: '380+ Student Athletes',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Daily training sessions overseen by university sports directors on modern turf grounds, synthetic badminton courts, and modern gym facilities.'
        },
        {
          badgeBg: 'bg-[#926315]',
          iconColor: 'text-white',
          icon: ShieldCheck,
          eyebrow: 'CHAMPIONSHIP HONORS',
          headline: 'BPUT Inter-University Trophies',
          headlineColor: 'text-[#926315]',
          description:
            'Multiple consecutive gold championships in BPUT inter-university athletics, volleyball, table tennis, and powerlifting tournaments.'
        }
      ]
    },
    {
      id: '06',
      category: 'SOCIAL RESPONSIBILITY & ECOLOGY',
      tabCategory: 'SOCIAL RESPONSIBILITY',
      tabTitle: 'Unnat Bharat & Green Eco Council',
      headerTag: 'COMMUNITY & ECOLOGY · UNNAT BHARAT',
      headerDotColor: 'bg-[#047857]',
      headerTextColor: 'text-[#047857]',
      name: 'Unnat Bharat & Green Eco Council',
      members: 190,
      pillars: [
        {
          badgeBg: 'bg-[#047857]',
          iconColor: 'text-white',
          icon: Landmark,
          eyebrow: 'VILLAGE ADOPTION & EMPOWERMENT',
          headline: 'Grassroots Technical Outreach',
          headlineColor: 'text-[#047857]',
          description:
            'Community development drives, rural school digital literacy programs, solar irrigation installations, and local technical empowerment.'
        },
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Users,
          eyebrow: 'COMMUNITY STEWARDS',
          headline: '190+ Active Volunteers',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Zero-plastic campus monitoring, campus botanical nursery upkeep, e-waste recycling drives, and annual blood donation camps with the Red Cross.'
        },
        {
          badgeBg: 'bg-[#C41F3B]',
          iconColor: 'text-white',
          icon: Sparkles,
          eyebrow: 'SUSTAINABILITY RECOGNITION',
          headline: 'Green Campus Benchmark',
          headlineColor: 'text-[#C41F3B]',
          description:
            'Recognized by state pollution authorities for maintaining 10+ acres of carbon-neutral green tree cover and rainwater harvesting infrastructure.'
        }
      ]
    }
  ];

  // ScrollTrigger: Smooth entrance for each card and sync active club with right sticky sidebar
  useEffect(() => {
    const ctx = gsap.context(() => {
      clubCardRefs.current.forEach((card, index) => {
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
          start: index === clubsData.length - 1 ? 'top 75%' : 'top 45%',
          end: index === clubsData.length - 1 ? 'bottom 15%' : 'bottom 45%',
          onEnter: () => setActiveClubIndex(index),
          onEnterBack: () => setActiveClubIndex(index)
        });
      });
    }, clubsSectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToClub = (index: number) => {
    setActiveClubIndex(index);
    const targetCard = clubCardRefs.current[index];
    if (targetCard) {
      const topOffset = targetCard.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  const currentFac = CAMPUS_FACILITIES.find((f) => f.id === activeFacility) || CAMPUS_FACILITIES[0];

  return (
    <div className="min-h-screen bg-[#FAF9F5] pb-24">
      
      {/* =========================================================================
          HERO SECTION: Equal size & exact gradient format as Landing & Academics Page
          ========================================================================= */}
      <section className="relative w-full h-screen min-h-[100dvh] bg-stone-950 overflow-hidden flex flex-col justify-between select-none">
        
        {/* Background Campus Life Hero Image (Uploaded by user) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/campus_life_hero.jpg"
            alt="Vibrant Student Campus Life & Community Walk"
            className="w-full h-full object-cover object-center scale-102"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/images/college_campus_hero_1793988186342.jpg';
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
              Vibrant campus<br />
              life &amp;<br />
              community
            </h1>

            {/* Subtitle / Descriptive Text */}
            <p className="text-white/90 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl mt-5 drop-shadow-xs">
              Experience life on our 10+ acres eco-friendly smart campus in Bhubaneswar. Beyond academics: 24/7 central digital library, innovation hubs, vibrant cultural festivals, sports leagues, and residential communities.
            </p>

            {/* Action CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  const target = document.getElementById('campus-facilities');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 sm:px-8 py-3.5 rounded-md bg-[#E03D2E] hover:bg-[#c93224] active:scale-98 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-red-950/40 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Facilities</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const target = document.getElementById('student-clubs');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3.5 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Student Clubs &amp; Societies</span>
                <ChevronRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>

          </div>
        </div>

        {/* Hero Bottom Strip: Key Highlights */}
        <div className="relative z-20 w-full px-4 sm:px-8 pb-7 sm:pb-9">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15 text-xs text-white/90">
            <span className="flex items-center gap-2 font-medium">
              <Landmark className="w-4 h-4 text-cyan-400" />
              <span>10+ Acres Eco-Friendly Smart Campus</span>
            </span>
            <span className="flex items-center gap-2 font-medium">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>24/7 Air-Conditioned Central Digital Library</span>
            </span>
            <span className="flex items-center gap-2 font-medium">
              <Trophy className="w-4 h-4 text-emerald-400" />
              <span>Multi-Sport Complex &amp; Gymnasium</span>
            </span>
            <span className="flex items-center gap-2 font-medium">
              <Users className="w-4 h-4 text-rose-400" />
              <span>25+ Technical &amp; Cultural Student Clubs</span>
            </span>
          </div>
        </div>

      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-16">
        {/* Interactive Campus Facilities Showcase */}
        <div id="campus-facilities" className="scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              World-Class Campus Infrastructure
            </h3>
            <p className="text-xs text-stone-500 mt-1">Select a facility to view detailed amenities and specifications</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {CAMPUS_FACILITIES.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFacility(f.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeFacility === f.id
                    ? 'bg-[#1b2a60] text-white shadow-md'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {f.title}
              </button>
            ))}
          </div>

          {/* Active Facility Card */}
          <div className="rounded-3xl bg-white border border-stone-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[360px]">
              <img
                src={currentFac.image}
                alt={currentFac.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-mono inline-block mb-1">
                  Featured Facility
                </span>
                <h4 className="text-xl font-bold font-serif">{currentFac.title}</h4>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-semibold text-blue-700 block mb-1">
                  {currentFac.tagline}
                </span>
                <h3 className="text-2xl font-bold font-serif text-slate-900">
                  {currentFac.title}
                </h3>
                <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                  {currentFac.desc}
                </p>

                <div className="mt-5 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                    Key Features &amp; Provisions
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {currentFac.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500 font-mono">10+ Acres Campus · Infocity</span>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-4 py-2 bg-[#1b2a60] hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Schedule Campus Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          Student Technical Clubs & Societies (Milestones-Style 2-Col Interactive Showcase)
          ========================================================================= */}
      <section 
        id="student-clubs"
        ref={clubsSectionRef}
        className="relative w-full pt-20 sm:pt-28 pb-32 sm:pb-44 bg-[#FAF8F5] select-none border-t border-b border-stone-200 scroll-mt-10"
      >
        {/* Background Pastel Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-12 -left-20 w-[460px] h-[460px] rounded-full bg-[#EADBEC]/65 blur-3xl" />
          <div className="absolute top-1/2 -right-24 w-[420px] h-[420px] rounded-full bg-[#E2EFE7]/70 blur-3xl" />
          <div className="absolute bottom-24 left-1/3 w-[380px] h-[380px] rounded-full bg-[#FBEFE3]/75 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* LEFT SIDE: 6 CLUBS IN SERIES FORMAT */}
            <div className="lg:col-span-7 space-y-16 sm:space-y-24 order-2 lg:order-1">
              {clubsData.map((club, cIdx) => {
                const isLastClub = cIdx === clubsData.length - 1;
                return (
                  <div
                    key={club.id}
                    ref={(el) => { clubCardRefs.current[cIdx] = el; }}
                    className={`club-card transition-all duration-300 ${
                      !isLastClub ? 'pb-16 sm:pb-20 border-b border-stone-200/80' : 'pb-24 sm:pb-36'
                    }`}
                  >
                    {/* Top Status Header Strip */}
                    <div className="flex items-center justify-between gap-4 pb-5 border-b border-stone-200/80 mb-8 sm:mb-10">
                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className={`w-2.5 h-2.5 rounded-full ${club.headerDotColor}`} />
                        <span className={`text-xs font-mono font-bold tracking-[0.2em] uppercase ${club.headerTextColor}`}>
                          {club.headerTag}
                        </span>
                      </div>
                      <div className="flex-1 h-px bg-stone-200/70 mx-3 hidden sm:block" />
                      <div className="flex items-center gap-3.5 shrink-0">
                        <span className="text-xs font-mono font-bold text-stone-400">
                          {club.id}
                        </span>
                        <button
                          onClick={() => onNavigate('contact')}
                          className="group px-4 py-1.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300/80 text-stone-800 text-[11px] font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-2xs hover:shadow-xs"
                        >
                          <span>JOIN CLUB</span>
                          <div className="w-4 h-4 rounded-full bg-stone-100 group-hover:bg-[#0D9488] group-hover:text-white flex items-center justify-center transition-colors">
                            <ArrowRight className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" />
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* 3 Stacked Pillars */}
                    <div className="space-y-8 sm:space-y-10">
                      {club.pillars.map((pillar, pIdx) => {
                        const IconComp = pillar.icon;
                        const isLastPillar = pIdx === club.pillars.length - 1;
                        return (
                          <div 
                            key={`${club.id}-${pIdx}`}
                            className={`flex items-start gap-4 sm:gap-6 ${
                              !isLastPillar ? 'pb-8 sm:pb-10 border-b border-stone-200/80' : ''
                            }`}
                          >
                            <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl shrink-0 flex items-center justify-center shadow-xs transition-transform duration-300 hover:scale-105 ${pillar.badgeBg} ${pillar.iconColor}`}>
                              <IconComp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.16em] uppercase text-stone-400 mb-1.5">
                                {pillar.eyebrow}
                              </div>
                              <h3 className={`text-2xl sm:text-3xl lg:text-[38px] font-serif font-bold tracking-tight leading-tight mb-2.5 ${pillar.headlineColor}`}>
                                {pillar.headline}
                              </h3>
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

            {/* RIGHT SIDE: STICKY COLUMN */}
            <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-20 xl:top-24 self-start max-h-[calc(100vh-5rem)] overflow-y-auto no-scrollbar">
              <div className="pr-2 sm:pr-4">
                <span className="text-xs font-mono font-bold tracking-widest text-[#0D9488] uppercase block mb-2">
                  STUDENT CLUBS &amp; SOCIETIES
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[38px] xl:text-[44px] font-serif font-bold text-[#111827] leading-[1.10] tracking-tight mb-3">
                  Student Technical<br />
                  Clubs &amp;<br />
                  <span className="italic font-serif text-[#0D9488] font-normal">Societies.</span>
                </h2>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 font-sans max-w-md">
                  Over 20+ active student-driven organizations, innovation councils, competitive coding circles, and cultural societies shaping talent outside classrooms.
                </p>

                {/* 6 Interactive Vertical Tabs */}
                <div className="space-y-2 max-w-md">
                  {clubsData.map((club, idx) => {
                    const isActive = activeClubIndex === idx;
                    return (
                      <button
                        key={club.id}
                        onClick={() => scrollToClub(idx)}
                        className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl text-left transition-all duration-300 flex items-center gap-3.5 cursor-pointer ${
                          isActive
                            ? 'bg-white text-stone-900 shadow-md border border-stone-200/90 ring-1 ring-black/5 translate-x-1.5'
                            : 'bg-transparent text-stone-800 hover:bg-white/50 border border-transparent'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                          isActive
                            ? 'border-2 border-stone-900 text-stone-900 bg-stone-50'
                            : 'border border-stone-300 text-stone-400 group-hover:border-stone-400'
                        }`}>
                          {club.id}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block leading-tight">
                            {club.tabCategory}
                          </span>
                          <h4 className="text-xs sm:text-[14px] font-serif font-bold text-stone-900 tracking-tight truncate leading-snug">
                            {club.tabTitle}
                          </h4>
                        </div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 space-y-16">
        {/* Residential Hostels & Life at Bhubaneswar */}
        <div className="p-8 sm:p-10 rounded-3xl bg-stone-100 border border-stone-200 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
              Residential Life &amp; Hostels
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Safe, Modern &amp; Comfortable On-Campus Living
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Separate residential hostels for boys and girls provide round-the-clock security, continuous power backup, high-speed Wi-Fi, hygienic dining facilities, common recreational rooms with indoor games, and in-house medical support.
            </p>
            <ul className="space-y-2 text-xs text-stone-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>24/7 CCTV surveillance, biometric access &amp; dedicated wardens</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Nutritious multi-cuisine mess serving North, South &amp; Odia delicacies</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>On-campus health dispensary with attending physicians and ambulance</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-md h-72 lg:h-80">
            <img
              src="/assets/images/college_campus_hero_1793988186342.jpg"
              alt="Campus hostels"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
