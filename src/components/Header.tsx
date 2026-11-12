import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { TekkzyLogo } from './TekkzyLogo';

interface Props {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenAuth?: (mode?: 'login' | 'signup') => void;
  user?: { name: string; email: string } | null;
  onLogout?: () => void;
  completedLessonsCount?: number;
}

export const Header: React.FC<Props> = ({
  currentTab,
  onNavigate,
  onOpenAuth,
  user,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = currentTab === 'home';

  // Monitor scroll position to adapt home navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentTab]);

  // Navigation items matching exactly the home section navigation
  const navLinks = [
    { label: 'ABOUT', tab: 'about' },
    { label: 'ADMISSIONS', tab: 'admissions' },
    { label: 'ACADEMICS', tab: 'programs' },
    { label: 'CAMPUS LIFE', tab: 'campus' },
    { label: 'PLACEMENT', tab: 'placements' },
    { label: 'CONTACT US', tab: 'contact' },
  ];

  const isLinkActive = (linkTab: string) => {
    if (isHome) return false;
    if (linkTab === 'admissions') return currentTab === 'admissions';
    if (linkTab === 'programs') return currentTab === 'programs';
    return currentTab === linkTab;
  };

  const handleApplyClick = () => {
    if (onOpenAuth) {
      onOpenAuth('signup');
    } else {
      onNavigate('admissions');
    }
  };

  return (
    <header
      className={`${
        isHome ? 'fixed' : 'sticky'
      } top-0 inset-x-0 z-50 transition-all duration-300`}
    >
      {/* Main Navigation Bar (Translucent over Hero on Home, Frosted Solid Navy on scroll down and across all other sections) */}
      <div
        className={`px-4 sm:px-8 transition-all duration-300 ${
          isHome && !isScrolled
            ? 'bg-transparent py-3.5'
            : 'bg-[#1b2a60]/95 backdrop-blur-md shadow-xl border-b border-white/15 py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="group cursor-pointer focus:outline-hidden"
            aria-label="TEKKZY College of Technology"
          >
            <TekkzyLogo variant="light" />
          </button>

          {/* Center Navigation Links (Matching Home Section: ABOUT | ADMISSIONS | ACADEMICS | CAMPUS LIFE | PLACEMENT | CONTACT US) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 2xl:gap-8">
            {navLinks.map((link) => {
              const active = isLinkActive(link.tab);
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    onNavigate(link.tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-[13px] font-bold tracking-wider uppercase transition-colors py-1 relative group cursor-pointer ${
                    active ? 'text-[#FF9933]' : 'text-white hover:text-[#FF9933]'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#FF9933] transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
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
                  <div className="absolute right-0 mt-2 w-56 bg-[#0f172a] border border-white/15 rounded-xl shadow-2xl py-2 z-50 text-xs text-white">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="font-semibold text-white">{user.name}</p>
                      <p className="text-[11px] text-stone-400 truncate">{user.email}</p>
                    </div>
                    {onLogout && (
                      <button
                        onClick={() => {
                          onLogout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-rose-900/40 text-rose-400 flex items-center gap-2 cursor-pointer transition-colors"
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

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1b2a60]/98 backdrop-blur-xl border-b border-white/20 px-6 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const active = isLinkActive(link.tab);
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    onNavigate(link.tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-sm font-bold tracking-wider uppercase py-2.5 border-b border-white/10 transition-colors flex items-center justify-between ${
                    active ? 'text-[#FF9933]' : 'text-white hover:text-[#FF9933]'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-[#FF9933]" />}
                </button>
              );
            })}
            <button
              onClick={() => {
                handleApplyClick();
                setMobileMenuOpen(false);
              }}
              className="mt-3 w-full bg-[#E03D2E] hover:bg-[#c93224] text-white font-bold text-xs sm:text-sm tracking-wider uppercase py-3 rounded-md shadow-md text-center transition-all cursor-pointer"
            >
              APPLY NOW
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
