import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  FileText, 
  GraduationCap, 
  Users, 
  ArrowDown, 
  Compass, 
  ArrowRight,
  Sparkles,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { TekkzyLogo } from './TekkzyLogo';

// College images for the 2-second right-to-left swapping hero slider
const SLIDES = [
  {
    id: 1,
    image: '/assets/images/college_campus_quad_1793988224316.jpg',
    tag: 'Main Campus Quad',
    caption: 'Lush central quadrangle, modern academic buildings & student walk'
  },
  {
    id: 2,
    image: '/assets/images/college_library_hall_1793988204291.jpg',
    tag: 'Central Digital Library',
    caption: 'Expansive multi-tier university library & research study concourse'
  },
  {
    id: 3,
    image: '/assets/images/college_lecture_hall_1793988205558.jpg',
    tag: 'Engineering Auditorium',
    caption: 'Tiered amphitheater lecture auditorium with smart presentation displays'
  },
  {
    id: 4,
    image: '/assets/images/college_convocation_1793988239815.jpg',
    tag: 'Annual Convocation',
    caption: 'Celebrating academic excellence, graduating engineers & alumni success'
  },
  {
    id: 5,
    image: '/assets/images/college_campus_hero_1793988186342.jpg',
    tag: 'Technology Precinct',
    caption: 'Modern college architectural complex and engineering faculties'
  }
];

interface Props {
  onStartLearning: () => void;
  onExploreCourses: () => void;
  onNavigate?: (tab: string) => void;
  onOpenSearch?: () => void;
  onOpenAuth?: (mode?: 'login' | 'signup') => void;
}

export const Hero: React.FC<Props> = ({ 
  onStartLearning, 
  onExploreCourses, 
  onNavigate,
  onOpenSearch,
  onOpenAuth
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState<'right-to-left' | 'left-to-right'>('right-to-left');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Monitor scroll position to keep navbar sticky on downward scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preload carousel images for instantaneous rendering
  useEffect(() => {
    SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Transition to next slide (strictly right to left)
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('right-to-left');
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  }, [currentIndex, isTransitioning]);

  // Transition to previous slide
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('left-to-right');
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  }, [currentIndex, isTransitioning]);

  // Jump to specific slide
  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setDirection(index > currentIndex ? 'right-to-left' : 'left-to-right');
    setPrevIndex(currentIndex);
    setCurrentIndex(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  // Swapping images from right to left every 2 seconds (2000ms)
  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      nextSlide();
    }, 2000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [nextSlide]);

  const handleNavClick = (tabId: string) => {
    if (onNavigate) {
      onNavigate(tabId);
    }
  };

  const handleApplyClick = () => {
    if (onOpenAuth) {
      onOpenAuth('signup');
    } else if (onNavigate) {
      onNavigate('programs');
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[100dvh] bg-stone-950 overflow-hidden flex flex-col justify-between select-none">
      {/* =========================================================================
          BACKGROUND CAROUSEL: Images swap from right to left every 2 seconds
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {SLIDES.map((slide, idx) => {
          let transformClass = 'translate-x-full opacity-0 pointer-events-none';

          if (idx === currentIndex) {
            // Active slide currently visible
            transformClass = 'translate-x-0 opacity-100 z-2';
          } else if (idx === prevIndex && isTransitioning) {
            // Exiting slide sliding out to the left
            transformClass = direction === 'right-to-left' 
              ? '-translate-x-full opacity-100 z-1' 
              : 'translate-x-full opacity-100 z-1';
          }

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform ${transformClass}`}
            >
              <img
                src={slide.image}
                alt={slide.caption}
                className="w-full h-full object-cover object-center scale-102"
              />
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          SOFT BLACK GRADIENT ON THE LEFT SIDE:
          Guarantees maximum text legibility while keeping the right side vibrant
          ========================================================================= */}
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

      {/* Bottom subtle gradient for controls */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.45) 16%, transparent 34%)'
        }}
      />

      {/* =========================================================================
          TOP INSTITUTIONAL HEADER & NAVIGATION BAR (Sticky/Fixed on downward scroll)
          ========================================================================= */}
      <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
        {/* Main Navigation Bar (Translucent over Hero, Frosted Solid Navy on scroll down) */}
        <div 
          className={`px-4 sm:px-8 transition-all duration-300 ${
            isScrolled 
              ? 'bg-[#1b2a60]/95 backdrop-blur-md shadow-xl border-b border-white/15 py-2.5' 
              : 'bg-transparent py-3.5'
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Logo */}
            <button 
              onClick={() => handleNavClick('home')}
              className="group cursor-pointer focus:outline-hidden"
              aria-label="TEKKZY College of Technology"
            >
              <TekkzyLogo variant="light" />
            </button>

            {/* Center Navigation Links (Research removed as requested) */}
            <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
              {[
                { label: 'ABOUT', tab: 'about' },
                { label: 'ADMISSIONS', tab: 'programs' },
                { label: 'ACADEMICS', tab: 'programs' },
                { label: 'CAMPUS LIFE', tab: 'campus' },
                { label: 'PLACEMENT', tab: 'placements' },
                { label: 'CONTACT US', tab: 'contact' },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.tab)}
                  className="text-white hover:text-[#FF9933] text-[13px] font-bold tracking-wider uppercase transition-colors py-1 relative group cursor-pointer"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF9933] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Right: APPLY NOW Red CTA Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleApplyClick}
                className="bg-[#E03D2E] hover:bg-[#c93224] active:scale-98 text-white font-bold text-xs sm:text-sm tracking-wider uppercase px-4 sm:px-6 py-2 sm:py-2.5 rounded-md shadow-lg shadow-red-950/30 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>APPLY NOW</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 text-white hover:text-amber-300 transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#1b2a60]/98 backdrop-blur-xl border-b border-white/20 px-6 py-6 shadow-2xl">
            <nav className="flex flex-col gap-4">
              {[
                { label: 'ABOUT', tab: 'about' },
                { label: 'ADMISSIONS', tab: 'programs' },
                { label: 'ACADEMICS', tab: 'programs' },
                { label: 'CAMPUS LIFE', tab: 'campus' },
                { label: 'PLACEMENT', tab: 'placements' },
                { label: 'CONTACT US', tab: 'contact' },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    handleNavClick(link.tab);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-white hover:text-[#FF9933] text-sm font-bold tracking-wider uppercase py-2 border-b border-white/10"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Top Spacer to preserve perfect headline spacing when navbar is fixed */}
      <div className="w-full h-24 sm:h-28 pointer-events-none select-none" aria-hidden="true" />

      {/* =========================================================================
          HERO CONTENT ZONE: "Where knowledge meets innovation"
          ========================================================================= */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 w-full my-auto pb-6">
        <div className="max-w-2xl text-left">
          {/* Main Huge Serif Headline (Matching screenshot typography) */}
          <h1 className="font-serif font-bold text-white text-5xl sm:text-6xl md:text-7xl lg:text-[78px] leading-[1.06] tracking-tight drop-shadow-md">
            Where knowledge<br />
            meets<br />
            innovation
          </h1>

          {/* Subtitle / Descriptive Text */}
          <p className="text-white/90 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl mt-5 drop-shadow-xs">
            Immerse yourself in Odisha's premier technical ecosystem. Rigorous academics meet world-class innovation labs to forge the leaders of tomorrow.
          </p>
        </div>
      </div>

      {/* =========================================================================
          HERO BOTTOM UTILITIES: Pagination dashes, Scroll cue, and Navigation arrows
          ========================================================================= */}
      <div className="relative z-20 w-full px-4 sm:px-8 pb-7 sm:pb-9">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Pagination Dash Bars and Slide Badge */}
          <div className="flex items-center gap-3">
            {/* Dashes */}
            <div className="flex items-center gap-1.5">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-300 cursor-pointer rounded-full ${
                    idx === currentIndex 
                      ? 'w-8 h-1 bg-white shadow-xs' 
                      : 'w-4 h-0.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Slide Index Badge (e.g. 01 / 04) with miniature photo thumbnail */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/40 border border-white/15 backdrop-blur-xs text-white text-[11px] font-mono">
              <img 
                src={SLIDES[currentIndex].image} 
                alt="thumbnail" 
                className="w-4 h-4 rounded-full object-cover border border-white/40"
              />
              <span className="font-semibold">{`0${currentIndex + 1} / 0${SLIDES.length}`}</span>
            </div>
          </div>

          {/* Center: SCROLL indicator */}
          <div className="hidden sm:flex flex-col items-center gap-1 text-white/50 hover:text-white/80 transition-colors cursor-pointer">
            <span className="text-[10px] tracking-[0.28em] font-medium uppercase font-sans">
              SCROLL
            </span>
            <div className="w-0.5 h-3 bg-white/40 rounded-full animate-bounce" />
          </div>

          {/* Right: Prev & Next Circular Glass Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
