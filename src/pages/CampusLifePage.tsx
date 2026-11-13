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
  ChevronLeft,
  Coffee, 
  Trophy, 
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Terminal,
  Layers,
  Code2,
  Briefcase,
  Binary,
  X
} from 'lucide-react';
import { gsap, ScrollTrigger } from '../utils/animations';
import { CAMPUS_FACILITIES } from '../data/collegeData';

export const CampusLifePage: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const [activeFacility, setActiveFacility] = useState<string>(CAMPUS_FACILITIES[0].id);
  const [activeClubIndex, setActiveClubIndex] = useState<number>(0);
  const clubsSectionRef = useRef<HTMLElement>(null);
  const clubsHeaderRef = useRef<HTMLDivElement>(null);
  const clubsTrackContainerRef = useRef<HTMLDivElement>(null);
  const clubCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // State for horizontal cards carousel & interactive detail modal
  const [selectedClub, setSelectedClub] = useState<any | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const clubsScrollRef = useRef<HTMLDivElement>(null);
  const clubsTriggerRef = useRef<any>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({ clubs: 0, members: 0, events: 0, trophies: 0 });
  const [statsAnimated, setStatsAnimated] = useState(false);

  const checkScrollButtons = () => {
    if (!clubsScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = clubsScrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollClubs = (direction: 'left' | 'right') => {
    const st = clubsTriggerRef.current;
    if (st) {
      const totalDistance = st.end - st.start;
      const step = totalDistance / 6;
      const currentY = window.scrollY;
      let targetY: number;

      if (direction === 'right') {
        if (currentY < st.start) {
          targetY = st.start + step;
        } else {
          targetY = Math.min(st.end, currentY + step);
        }
      } else {
        if (currentY > st.end) {
          targetY = st.end - step;
        } else {
          targetY = Math.max(st.start, currentY - step);
        }
      }

      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    } else if (clubsScrollRef.current) {
      const scrollAmount = 380;
      clubsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // 6 Student Technical Clubs & Societies (Cinematic Card Carousel & Impact Data)
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
      image: '/campus-clubs/trdc_robotics_drones.jpg',
      accentGradient: 'from-blue-950/95 via-slate-900/80 to-slate-950/95',
      badgeText: '320+ Makers · 12 UAVs',
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
      image: '/campus-clubs/codenation_ai_hackathons.jpg',
      accentGradient: 'from-emerald-950/95 via-slate-900/80 to-slate-950/95',
      badgeText: '450+ Coders · SIH Finalists',
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
      image: '/campus-clubs/ecell_startup_incubation.jpg',
      accentGradient: 'from-amber-950/95 via-slate-900/80 to-slate-950/95',
      badgeText: '280+ Founders · 18 Startups',
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
      image: '/campus-clubs/srijan_cultural_arts.jpg',
      accentGradient: 'from-rose-950/95 via-slate-900/80 to-slate-950/95',
      badgeText: '220+ Artists · Annual Fest',
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
      image: '/campus-clubs/olympus_athletics_sports.jpg',
      accentGradient: 'from-teal-950/95 via-slate-900/80 to-slate-950/95',
      badgeText: '380+ Athletes · 14 Sports',
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
      image: '/campus-clubs/unnat_bharat_eco_council.jpg',
      accentGradient: 'from-green-950/95 via-slate-900/80 to-slate-950/95',
      badgeText: '190+ Volunteers · 15 Villages',
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
  // Pinned Horizontal Scroll with GSAP ScrollTrigger: locks section, smoothly moves heading upward, and scrubs cards
  useEffect(() => {
    const section = clubsSectionRef.current;
    const track = clubsScrollRef.current;
    const header = clubsHeaderRef.current;
    const trackContainer = clubsTrackContainerRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        // Desktop / Laptop: Pin the section, move heading upward to maximize view, and scrub cards
        const getDistance = () => {
          return track.scrollWidth - window.innerWidth + 140;
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: 'top 70px',
            end: () => `+=${Math.max(1100, getDistance() + 450)}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
              setCanScrollLeft(self.progress > 0.02);
              setCanScrollRight(self.progress < 0.98);
            }
          }
        });

        // 1. As user begins scrolling: heading moves UPWARD and fades out cleanly
        if (header) {
          tl.to(header, {
            y: -240,
            opacity: 0,
            ease: 'power1.out',
            duration: 0.18,
          }, 0);
        }

        // 2. Simultaneously: cards track container moves UPWARD so the full cards fit the viewport
        if (trackContainer) {
          tl.to(trackContainer, {
            y: -200,
            ease: 'power1.out',
            duration: 0.18,
          }, 0);
        }

        // 3. Scrub cards track horizontally across the screen
        tl.to(track, {
          x: () => -Math.max(0, getDistance()),
          ease: 'none',
          duration: 0.94,
        }, 0.06);

        clubsTriggerRef.current = tl.scrollTrigger;

        return () => {
          tl.kill();
        };
      });

      mm.add('(max-width: 767px)', () => {
        // Mobile / Small screen: reset x and y so standard touch swipe works
        gsap.set(track, { x: 0 });
        if (header) gsap.set(header, { y: 0, opacity: 1 });
        if (trackContainer) gsap.set(trackContainer, { y: 0 });
        clubsTriggerRef.current = null;
      });
    }, section);

    // Trackpad horizontal swipe listener: smoothly maps horizontal deltaX to vertical window scroll when pinned
    const onTrackpadWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
        const st = clubsTriggerRef.current;
        if (st && window.scrollY >= st.start && window.scrollY <= st.end) {
          e.preventDefault();
          window.scrollBy({ top: e.deltaX * 1.2 });
        }
      }
    };

    window.addEventListener('wheel', onTrackpadWheel, { passive: false });

    // Refresh ScrollTrigger once images/fonts are fully rendered
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);

    return () => {
      window.removeEventListener('wheel', onTrackpadWheel);
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // Count-up animation for Campus Life Highlights stats (screen recording style)
  useEffect(() => {
    if (!statsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true);
            const targets = { clubs: 20, members: 2500, events: 50, trophies: 14 };
            const startTime = performance.now();
            const duration = 1800;

            const update = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 4);

              setStats({
                clubs: Math.round(targets.clubs * ease),
                members: Math.round(targets.members * ease),
                events: Math.round(targets.events * ease),
                trophies: Math.round(targets.trophies * ease)
              });

              if (progress < 1) {
                requestAnimationFrame(update);
              }
            };
            requestAnimationFrame(update);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [statsAnimated]);
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
          Student Technical Clubs & Societies (Pinned Horizontal Scrub & Screen Recording Style)
          ========================================================================= */}
      <section 
        id="student-clubs"
        ref={clubsSectionRef}
        className="relative w-full pt-8 sm:pt-12 pb-10 sm:pb-14 bg-[#FAF8F5] select-none border-t border-b border-stone-200 scroll-mt-10 overflow-hidden"
      >
        {/* Subtle Background Pastel Ambience */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-10 -left-20 w-[500px] h-[500px] rounded-full bg-[#EADBEC]/50 blur-3xl" />
          <div className="absolute top-1/2 -right-24 w-[460px] h-[460px] rounded-full bg-[#E2EFE7]/60 blur-3xl" />
          <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] rounded-full bg-[#FBEFE3]/60 blur-3xl" />
        </div>

        <div ref={clubsHeaderRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 will-change-transform">
          {/* Header Row */}
          <div className="max-w-3xl mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#0D9488] uppercase">
                STUDENT CLUBS &amp; SOCIETIES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#111827] leading-[1.1] tracking-tight mb-2">
              Student Technical<br />
              Clubs &amp; <span className="italic font-serif text-[#0D9488] font-normal">Societies.</span>
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm sm:leading-relaxed font-sans max-w-2xl">
              Over 20+ active student-driven organizations, innovation councils, competitive coding circles, and cultural societies shaping talent outside classrooms.
            </p>
          </div>
        </div>

        {/* HORIZONTAL CARDS TRACK WRAPPER (Smoothly moves upward during scroll to fill viewport perfectly) */}
        <div ref={clubsTrackContainerRef} className="relative w-full overflow-hidden z-10 will-change-transform">
          <div 
            ref={clubsScrollRef}
            className="flex gap-6 sm:gap-8 pb-6 pt-2 px-4 sm:px-8 lg:px-12 xl:px-16 will-change-transform md:overflow-visible overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
          >
            {clubsData.map((club) => (
              <div
                key={club.id}
                onClick={() => setSelectedClub(club)}
                style={{ transform: 'skewX(-6deg)' }}
                className="w-[295px] sm:w-[325px] md:w-[345px] h-[430px] sm:h-[455px] lg:h-[470px] shrink-0 rounded-3xl overflow-hidden relative shadow-xl hover:shadow-2xl transition-all duration-500 group snap-start cursor-pointer border border-stone-200/90 bg-stone-900 flex flex-col justify-between p-5 sm:p-6"
              >
                {/* Clear Background Image (scale-115 to seamlessly fill the 6-deg slanted box without clipping gaps) */}
                <img
                  src={club.image}
                  alt={club.name}
                  className="absolute inset-0 w-full h-full object-cover scale-115 transition-transform duration-700 ease-out group-hover:scale-120"
                />

                {/* Gradient: Upper part is 100% CLEAR, lower part has a smooth faded black gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 via-45% to-transparent pointer-events-none" />

                {/* Card Top Row: Category Pill only (No Numbering) - Unskewed for crisp text */}
                <div 
                  style={{ transform: 'skewX(6deg)' }}
                  className="relative z-10 flex items-center justify-between"
                >
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-stone-900 text-[10px] font-mono font-bold tracking-wider uppercase shadow-xs">
                    {club.tabCategory}
                  </span>
                </div>

                {/* Card Bottom Container: Unskewed for crystal-clear readability */}
                <div 
                  style={{ transform: 'skewX(6deg)' }}
                  className="relative z-10 space-y-2.5 pt-4"
                >
                  {/* Eyebrow Tagline */}
                  <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-cyan-300 block drop-shadow-sm">
                    {club.pillars[0]?.eyebrow || club.category}
                  </span>

                  {/* Club Title */}
                  <h3 className="text-xl sm:text-[23px] font-serif font-bold text-white tracking-tight leading-snug drop-shadow-md group-hover:text-emerald-300 transition-colors">
                    {club.name}
                  </h3>

                  {/* Headline Summary */}
                  <p className="text-xs text-stone-200 font-sans line-clamp-2 leading-relaxed drop-shadow-sm">
                    {club.pillars[0]?.headline} · {club.pillars[0]?.description}
                  </p>

                  {/* Bottom Stats & Action Button Row */}
                  <div className="pt-2 flex items-center justify-between border-t border-white/20">
                    <span className="text-xs font-mono font-semibold text-stone-200">
                      {club.badgeText}
                    </span>

                    {/* Circular Action Button with ↗ (Diagonal Arrow) */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:bg-[#0D9488] group-hover:border-[#0D9488] group-hover:text-white transition-all duration-300 shadow-md group-hover:scale-110">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* CARD 7: EXPLORE MORE CARD (Slanted Bended Box matching video blue card, No Numbering) */}
            <div
              onClick={() => onNavigate('contact')}
              style={{ transform: 'skewX(-6deg)' }}
              className="w-[295px] sm:w-[325px] md:w-[345px] h-[430px] sm:h-[455px] lg:h-[470px] shrink-0 rounded-3xl overflow-hidden relative shadow-xl hover:shadow-2xl transition-all duration-500 group snap-start cursor-pointer border border-blue-400/40 bg-gradient-to-br from-[#1E3A8A] via-[#1D4ED8] to-[#0F172A] flex flex-col justify-between p-6 text-white"
            >
              {/* Subtle Dotted Pattern Overlay */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                  backgroundSize: '16px 16px'
                }}
              />

              {/* Top Row: Unskewed */}
              <div 
                style={{ transform: 'skewX(6deg)' }}
                className="relative z-10 flex items-center justify-between"
              >
                <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider uppercase border border-white/30">
                  20+ CHAPTERS
                </span>
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              </div>

              {/* Center Content: Unskewed */}
              <div 
                style={{ transform: 'skewX(6deg)' }}
                className="relative z-10 my-auto text-center space-y-4 px-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto text-amber-300">
                  <Trophy className="w-7 h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-tight">
                  Discover Your Passion Beyond The Classroom.
                </h3>
                <p className="text-xs text-blue-100/90 leading-relaxed max-w-xs mx-auto">
                  From autonomous robotics to classical Odissi arts, find your circle and build leadership that lasts a lifetime.
                </p>

                {/* Center Explore More Pill Button (Yellow/Gold hover from video) */}
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#FACC15] hover:bg-[#FDE047] text-stone-950 font-bold text-xs uppercase tracking-wider font-mono shadow-xl transition-all group-hover:scale-105">
                    <span>EXPLORE ALL CLUBS</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>

              {/* Bottom Row: Unskewed */}
              <div 
                style={{ transform: 'skewX(6deg)' }}
                className="relative z-10 pt-4 border-t border-white/20 text-center"
              >
                <span className="text-[11px] font-mono text-blue-200">
                  Open to all engineering &amp; management branches
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS STATS BANNER (Animated Growing Numbers from the Screen Recording) */}
      <section className="relative w-full py-12 sm:py-16 bg-[#FAF8F5] border-b border-stone-200 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={statsRef}
            className="rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white p-8 sm:p-10 border border-slate-700/60 shadow-xl relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#0D9488]/15 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#2DD4BF] uppercase block mb-2">
                  CAMPUS IMPACT &amp; LEADERSHIP
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
                  Student Life, At a Glance.
                </h3>
              </div>

              {/* 4 Growing Numbers in Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-white tracking-tight tabular-nums">
                    {stats.clubs}+
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    Active Societies
                  </div>
                  <div className="text-[11px] text-slate-400 hidden sm:block">
                    Technical &amp; cultural councils
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-white tracking-tight tabular-nums">
                    {stats.members.toLocaleString()}+
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-teal-300 font-bold">
                    Student Members
                  </div>
                  <div className="text-[11px] text-slate-400 hidden sm:block">
                    Active makers &amp; artists
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-white tracking-tight tabular-nums">
                    {stats.events}+
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                    Annual Events
                  </div>
                  <div className="text-[11px] text-slate-400 hidden sm:block">
                    Hackathons &amp; fests
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-white tracking-tight tabular-nums">
                    {stats.trophies}
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                    National Trophies
                  </div>
                  <div className="text-[11px] text-slate-400 hidden sm:block">
                    IIT Bombay, SIH &amp; BPUT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* CLUB DETAILS MODAL (When any card is clicked) */}
        {selectedClub && (
          <div 
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
            onClick={() => setSelectedClub(null)}
          >
            <div 
              className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 my-8 flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header with Club Image Banner */}
              <div className="relative h-48 sm:h-56 bg-stone-900 shrink-0">
                <img
                  src={selectedClub.image}
                  alt={selectedClub.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${selectedClub.accentGradient}`} />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedClub(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Banner Content */}
                <div className="absolute bottom-5 inset-x-6 z-10 text-white">
                  <span className="px-3 py-1 rounded-full bg-white/90 text-stone-900 font-mono text-[10px] font-bold uppercase tracking-wider mb-2 inline-block shadow-xs">
                    {selectedClub.tabCategory}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                    {selectedClub.name}
                  </h3>
                  <p className="text-xs font-mono text-cyan-300 mt-1">
                    {selectedClub.members}+ Active Student Members · Infocity Campus Chapter
                  </p>
                </div>
              </div>

              {/* Modal Body with 3 Pillars */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D9488] mb-1">
                    PILLARS &amp; INITIATIVES
                  </h4>
                  <p className="text-xs text-stone-500">
                    Comprehensive activities, competitions, and hands-on laboratory immersion offered by this society.
                  </p>
                </div>

                <div className="space-y-4">
                  {selectedClub.pillars.map((pillar: any, pIdx: number) => {
                    const IconComponent = pillar.icon;
                    return (
                      <div 
                        key={pIdx}
                        className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-4"
                      >
                        <div className={`w-10 h-10 rounded-xl ${pillar.badgeBg} text-white flex items-center justify-center shrink-0 shadow-xs`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-stone-400 block mb-0.5">
                            {pillar.eyebrow}
                          </span>
                          <h5 className="text-base sm:text-lg font-serif font-bold text-stone-900 mb-1">
                            {pillar.headline}
                          </h5>
                          <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-sans">
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-4 shrink-0">
                <span className="text-xs font-mono text-stone-500">
                  {selectedClub.id} of 06 Premier Technical Societies
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedClub(null)}
                    className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-mono font-semibold transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setSelectedClub(null);
                      onNavigate('contact');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-mono font-bold tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>JOIN THIS CLUB</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
