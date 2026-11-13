import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, LogOut, ChevronDown, ChevronRight } from 'lucide-react';
import { TekkzyLogo } from './TekkzyLogo';
import { gsap } from '../utils/animations';

interface SubMenuItem {
  label: string;
  tab: string;
  sectionId?: string;
  desc?: string;
}

interface NavLinkItem {
  label: string;
  tab: string;
  dropdown?: SubMenuItem[];
}

interface Props {
  currentTab: string;
  onNavigate: (tab: string, sectionId?: string) => void;
  onOpenAuth?: (mode?: 'login' | 'signup') => void;
  user?: { name: string; email: string } | null;
  onLogout?: () => void;
  completedLessonsCount?: number;
}

// Module-level guard ensuring the intro animation runs strictly ONCE across the entire session
let globalLogoIntroDone = false;

export const Header: React.FC<Props> = ({
  currentTab,
  onNavigate,
  onOpenAuth,
  user,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Initial center-to-corner logo entrance animation
  const targetLogoRef = useRef<HTMLButtonElement>(null);
  const flyingLogoRef = useRef<HTMLDivElement>(null);
  const overlayBackdropRef = useRef<HTMLDivElement>(null);
  const [showIntroAnimation, setShowIntroAnimation] = useState(() => !globalLogoIntroDone);

  // Play initial logo animation: large in center -> hold 1s -> move to top-left corner
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (globalLogoIntroDone) {
      setShowIntroAnimation(false);
      if (targetLogoRef.current) {
        gsap.set(targetLogoRef.current, { opacity: 1 });
      }
      return;
    }
    globalLogoIntroDone = true;

    const timeout = setTimeout(() => {
      const targetEl = targetLogoRef.current;
      const flyingEl = flyingLogoRef.current;
      const backdrop = overlayBackdropRef.current;

      if (!targetEl || !flyingEl) {
        setShowIntroAnimation(false);
        return;
      }

      // Hide target logo in navbar before animation starts
      gsap.set(targetEl, { opacity: 0 });

      // Large logo initially hidden in the center of the screen
      gsap.set(flyingEl, {
        opacity: 0,
        scale: 1.4,
        x: 0,
        y: 0,
      });

      const tl = gsap.timeline();

      // 1. First, large logo is shown in the middle
      tl.to(flyingEl, {
        opacity: 1,
        scale: 2.2,
        duration: 0.7,
        ease: 'power3.out',
      })
      // 2. Stay 1 second in the center
      .to({}, { duration: 1.0 })
      // 3. Move smoothly to top-left corner
      .add(() => {
        const targetRect = targetEl.getBoundingClientRect();
        const flyingRect = flyingEl.getBoundingClientRect();

        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;
        const flyingCenterX = flyingRect.left + flyingRect.width / 2;
        const flyingCenterY = flyingRect.top + flyingRect.height / 2;

        const deltaX = targetCenterX - flyingCenterX;
        const deltaY = targetCenterY - flyingCenterY;
        const scaleRatio = targetRect.height / (flyingRect.height || 1);

        gsap.to(flyingEl, {
          x: deltaX,
          y: deltaY,
          scale: scaleRatio || 0.45,
          duration: 1.15,
          ease: 'power3.inOut',
          onComplete: () => {
            // Target logo becomes permanently visible in navbar
            gsap.set(targetEl, { opacity: 1 });
            setShowIntroAnimation(false);
          },
        });

        if (backdrop) {
          gsap.to(backdrop, {
            opacity: 0,
            duration: 0.95,
            ease: 'power2.out',
          });
        }
      });
    }, 60);

    return () => clearTimeout(timeout);
  }, []);

  const isHome = currentTab === 'home';
  const isHeroTransparent = currentTab === 'home' || currentTab === 'programs' || currentTab === 'campus' || currentTab === 'admissions';

  // Monitor scroll position to adapt navbar background on hero pages
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentTab]);

  // Navigation items with custom dropdowns as requested
  const navLinks: NavLinkItem[] = [
    { 
      label: 'ABOUT', 
      tab: 'about',
      dropdown: [
        { label: 'History', tab: 'about', sectionId: 'legacy', desc: 'Two decades of technological heritage' },
        { label: 'Regulation', tab: 'about', sectionId: 'compliance', desc: 'Statutory approvals & governance' },
        { label: 'Vision', tab: 'about', sectionId: 'vision', desc: 'Institutional roadmap & philosophy' },
        { label: 'Mission', tab: 'about', sectionId: 'vision', desc: 'Pedagogical pillars & core directives' },
        { label: 'Journey of Tekkzy College', tab: 'about', sectionId: 'journey', desc: '2005 – 2026 milestone timeline' },
      ]
    },
    { 
      label: 'ADMISSIONS', 
      tab: 'admissions',
      dropdown: [
        { label: 'U.G. (Undergraduate)', tab: 'admissions', sectionId: 'admissions-programs', desc: 'B.Tech Engineering in 7 disciplines' },
        { label: 'P.G. (Postgraduate)', tab: 'admissions', sectionId: 'admissions-programs', desc: 'M.Tech & MCA Master programs' },
        { label: 'Ph.D. (Doctoral Research)', tab: 'admissions', sectionId: 'admissions-programs', desc: 'Doctoral research fellowships' },
      ]
    },
    { 
      label: 'ACADEMICS', 
      tab: 'programs',
      dropdown: [
        { label: 'Academic Calendar', tab: 'programs', sectionId: 'academic-regulations', desc: 'Session schedules, terms & exams' },
        { label: 'Syllabus', tab: 'programs', sectionId: 'autonomous-academics', desc: 'Autonomous curricula & CBCS rubrics' },
      ]
    },
    { label: 'CAMPUS LIFE', tab: 'campus' },
    { label: 'PLACEMENT', tab: 'placements' },
    { label: 'NOTICES', tab: 'notices' },
    { label: 'CONTACT US', tab: 'contact' },
  ];

  const isLinkActive = (linkTab: string) => {
    if (isHome) return false;
    if (linkTab === 'admissions') return currentTab === 'admissions';
    if (linkTab === 'programs') return currentTab === 'programs';
    return currentTab === linkTab;
  };

  const handleApplyClick = () => {
    onNavigate('admissions');
  };

  const handleItemClick = (tab: string, sectionId?: string) => {
    onNavigate(tab, sectionId);
    setMobileMenuOpen(false);
  };

  const toggleMobileExpanded = (label: string) => {
    setMobileExpanded((prev) => (prev === label ? null : label));
  };

  return (
    <header
      className={`${
        isHeroTransparent ? 'fixed' : 'sticky'
      } top-0 inset-x-0 z-50 transition-all duration-300`}
    >
      {/* Main Navigation Bar */}
      <div
        className={`px-4 sm:px-8 transition-all duration-300 ${
          isHeroTransparent && !isScrolled
            ? 'bg-transparent py-3.5'
            : 'bg-[#1b2a60]/95 backdrop-blur-md shadow-xl border-b border-white/15 py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo (invisible before animation, reveals when logo lands in corner) */}
          <button
            ref={targetLogoRef}
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="group cursor-pointer focus:outline-hidden transition-opacity duration-200"
            style={{ opacity: showIntroAnimation ? 0 : 1 }}
            aria-label="TEKKZY College of Technology"
          >
            <TekkzyLogo variant="light" />
          </button>

          {/* Center Navigation Links with Interactive Dropdowns */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 2xl:gap-8">
            {navLinks.map((link) => {
              const active = isLinkActive(link.tab);
              const hasDropdown = Boolean(link.dropdown && link.dropdown.length > 0);

              return (
                <div key={link.label} className="relative group py-2">
                  <button
                    onClick={() => handleItemClick(link.tab)}
                    className={`text-[13px] font-bold tracking-wider uppercase transition-colors py-1 relative flex items-center gap-1 cursor-pointer ${
                      active ? 'text-[#FF9933]' : 'text-white hover:text-[#FF9933]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-70 group-hover:opacity-100" />
                    )}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-[#FF9933] transition-all duration-300 ${
                        active ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu Container - Simple & Borderless */}
                  {hasDropdown && link.dropdown && (
                    <div className="absolute top-full left-0 mt-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all duration-150 pointer-events-none group-hover:pointer-events-auto z-50">
                      <div className="w-56 rounded-xl bg-[#132047] shadow-2xl py-2 px-1.5 overflow-hidden">
                        {link.dropdown.map((subItem) => (
                          <button
                            key={subItem.label}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleItemClick(subItem.tab, subItem.sectionId);
                            }}
                            className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-stone-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer block"
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right: APPLY NOW Red CTA Button & User / Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleApplyClick}
              className="bg-[#E03D2E] hover:bg-[#c93224] active:scale-98 text-white font-bold text-xs sm:text-sm tracking-wider uppercase px-4 sm:px-6 py-2 sm:py-2.5 rounded-md shadow-lg shadow-red-950/30 transition-all cursor-pointer flex items-center gap-2 shrink-0"
            >
              <span>APPLY NOW</span>
            </button>

            {/* Authenticated user badge if signed in */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md transition-colors text-xs font-semibold text-white cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-[#FF9933] text-[#172554] flex items-center justify-center text-[10px] font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate">{user.name}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#132047] rounded-xl shadow-2xl py-2 z-50 text-xs text-white">
                    <div className="px-4 py-2">
                      <p className="font-semibold text-white">{user.name}</p>
                      <p className="text-[11px] text-stone-300 truncate">{user.email}</p>
                    </div>

                    {onLogout && (
                      <button
                        onClick={() => {
                          onLogout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-white/10 text-rose-300 flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-amber-300 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer with Accordion Dropdowns */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1b2a60]/98 backdrop-blur-xl border-b border-white/20 px-6 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const active = isLinkActive(link.tab);
              const hasDropdown = Boolean(link.dropdown && link.dropdown.length > 0);
              const isExpanded = mobileExpanded === link.label;

              return (
                <div key={link.label} className="py-1">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleItemClick(link.tab)}
                      className={`text-left text-sm font-bold tracking-wider uppercase py-2 transition-colors flex-1 ${
                        active ? 'text-[#FF9933]' : 'text-white hover:text-[#FF9933]'
                      }`}
                    >
                      {link.label}
                    </button>

                    {hasDropdown && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMobileExpanded(link.label);
                        }}
                        className="p-2 text-stone-300 hover:text-white"
                        aria-label={`Toggle ${link.label} Submenu`}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#FF9933]' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Submenu on mobile */}
                  {hasDropdown && isExpanded && link.dropdown && (
                    <div className="pl-3 pb-2 space-y-1 animate-in slide-in-from-top-1 duration-150">
                      {link.dropdown.map((subItem) => (
                        <button
                          key={subItem.label}
                          onClick={() => handleItemClick(subItem.tab, subItem.sectionId)}
                          className="w-full text-left text-xs font-semibold py-1.5 px-2 rounded-lg text-stone-300 hover:text-[#FF9933] hover:bg-white/5 transition-colors flex items-center justify-between"
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-[#FF9933] text-[10px]">▸</span>
                            <span>{subItem.label}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={() => {
                handleApplyClick();
                setMobileMenuOpen(false);
              }}
              className="mt-4 w-full bg-[#E03D2E] hover:bg-[#c93224] text-white font-bold text-xs sm:text-sm tracking-wider uppercase py-3 rounded-md shadow-md text-center transition-all cursor-pointer"
            >
              APPLY NOW
            </button>
          </nav>
        </div>
      )}

      {/* Initial Center-to-Corner Logo Entrance Animation */}
      {showIntroAnimation && (
        <div className="fixed inset-0 z-[100000] pointer-events-none flex items-center justify-center overflow-hidden">
          {/* Subtle cinematic backdrop that fades out smoothly as logo flies */}
          <div 
            ref={overlayBackdropRef} 
            className="absolute inset-0 bg-[#07130b]/85 backdrop-blur-md" 
          />
          {/* Large Logo centered initially, stays 1s, then glides to top-left corner */}
          <div
            ref={flyingLogoRef}
            className="relative z-10 flex items-center justify-center will-change-transform filter drop-shadow-[0_12px_40px_rgba(6,182,212,0.4)]"
            style={{ opacity: 0 }}
          >
            <TekkzyLogo variant="light" size="xl" />
          </div>
        </div>
      )}
    </header>
  );
};
