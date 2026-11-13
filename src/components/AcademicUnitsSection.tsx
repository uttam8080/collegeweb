import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AcademicUnitsSectionProps {
  onNavigate?: (tab: string) => void;
}

export const AcademicUnitsSection: React.FC<AcademicUnitsSectionProps> = ({ onNavigate }) => {
  const units = [
    {
      id: 'departments',
      label: 'Departments',
      icon: LandmarkIcon,
      targetTab: 'programs',
      iconAnimationClass: 'group-hover:-translate-y-1.5 group-hover:scale-110 transition-all duration-300',
    },
    {
      id: 'centres',
      label: 'Centres',
      icon: AtomIcon,
      targetTab: 'research',
      iconAnimationClass: 'group-hover:rotate-180 group-hover:scale-110 transition-all duration-700 ease-out',
    },
    {
      id: 'schools',
      label: 'Schools',
      icon: SchoolBuildingIcon,
      targetTab: 'programs',
      iconAnimationClass: 'group-hover:-translate-y-1.5 group-hover:scale-110 transition-all duration-300',
    },
    {
      id: 'coe',
      label: 'Centres of Excellence',
      icon: CoeNetworkIcon,
      targetTab: 'research',
      iconAnimationClass: 'group-hover:rotate-45 group-hover:scale-115 transition-all duration-500 ease-out',
    },
  ];

  const handleUnitClick = (targetTab: string) => {
    if (onNavigate) {
      onNavigate(targetTab);
    }
  };

  return (
    <section className="relative w-full pt-16 sm:pt-20 pb-20 sm:pb-28 select-none overflow-hidden bg-gradient-to-r from-[#0b6623] via-[#074626] to-[#04140c]">
      {/* Dark gradient overlay rolling in from the right side */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, rgba(2, 8, 5, 0.95) 0%, rgba(4, 24, 15, 0.82) 32%, rgba(6, 48, 28, 0.35) 65%, transparent 100%)'
        }}
      />

      {/* Subtle organic radial depth in the background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 15% 30%, rgba(52, 211, 153, 0.22) 0%, transparent 60%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            SECTION HEADER: Matching Screenshot ("ACADEMIC UNITS" + Accent Line)
            ========================================================================= */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight uppercase drop-shadow-md">
            <span className="text-white font-extrabold">ACADEMIC</span>{' '}
            <span className="text-[#34D399]">UNITS</span>
          </h2>

          {/* Centered Decorative Emerald Divider: —— • —— (Matching Screenshot Exactly) */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <span className="w-10 h-0.5 bg-[#34D399]" />
            <span className="w-3.5 h-1.5 bg-[#34D399] rounded-full" />
            <span className="w-10 h-0.5 bg-[#34D399]" />
          </div>
        </div>

        {/* =========================================================================
            THE 4 RECTANGULAR CARDS (With Rich Hover Lift & Micro-Animations)
            ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {units.map((unit) => {
            const Icon = unit.icon;

            return (
              <div
                key={unit.id}
                onClick={() => handleUnitClick(unit.targetTab)}
                className="group relative bg-white border border-stone-200 rounded-none sm:rounded-sm p-8 sm:p-11 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 shadow-2xs hover:shadow-xl hover:shadow-red-950/8 hover:border-[#991B1B] hover:-translate-y-2 hover:bg-gradient-to-b hover:from-red-50/20 hover:to-white overflow-hidden"
              >
                {/* Expanding Red Top Accent Bar on Hover */}
                <div 
                  className="absolute top-0 inset-x-0 h-1 bg-[#991B1B] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" 
                  aria-hidden="true"
                />

                {/* Animated Line Art Icon with Specific Micro-Animation */}
                <div className={`mb-5 text-stone-900 group-hover:text-[#991B1B] ${unit.iconAnimationClass}`}>
                  <Icon className="w-12 h-12 stroke-[1.4]" />
                </div>

                {/* Bold Red Label (Scales and Deepens on Hover) */}
                <h3 className="text-base sm:text-lg font-bold text-[#991B1B] tracking-tight group-hover:text-red-800 group-hover:scale-105 transition-all duration-300">
                  {unit.label}
                </h3>

                {/* Subtle "Explore →" Indicator that Slides Up on Hover */}
                <div className="h-5 flex items-center justify-center mt-2 overflow-hidden pointer-events-none">
                  <span className="text-xs font-bold text-[#991B1B] flex items-center gap-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

// =============================================================================
// ACCURATE ICONS MATCHING THE REFERENCE SCREENSHOT
// =============================================================================

// 1. Departments: University Building with Mortarboard/Cap on top
function LandmarkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" {...props}>
      {/* Mortarboard / Graduation cap on top */}
      <path d="M24 6L14 11L24 16L34 11L24 6Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 13.5V17.5C18 19.5 20.7 21 24 21C27.3 21 30 19.5 30 17.5V13.5" strokeWidth="2" strokeLinecap="round" />
      <path d="M34 11V18" strokeWidth="2" strokeLinecap="round" />
      {/* Building Body */}
      <path d="M12 24H36V42H12V24Z" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Roof pediment */}
      <path d="M10 24L24 18L38 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Columns */}
      <path d="M16 28V38" strokeWidth="2" strokeLinecap="round" />
      <path d="M21 28V38" strokeWidth="2" strokeLinecap="round" />
      <path d="M27 28V38" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 28V38" strokeWidth="2" strokeLinecap="round" />
      {/* Base steps */}
      <path d="M8 42H40" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// 2. Centres: Atom / Science Orbital Rings
function AtomIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" {...props}>
      {/* Center nucleus */}
      <circle cx="24" cy="24" r="3.5" fill="currentColor" />
      {/* Orbital ring 1 (Vertical) */}
      <ellipse cx="24" cy="24" rx="7" ry="18" strokeWidth="2.5" strokeLinecap="round" />
      {/* Orbital ring 2 (Rotated 60 deg) */}
      <ellipse cx="24" cy="24" rx="7" ry="18" transform="rotate(60 24 24)" strokeWidth="2.5" strokeLinecap="round" />
      {/* Orbital ring 3 (Rotated 120 deg) */}
      <ellipse cx="24" cy="24" rx="7" ry="18" transform="rotate(120 24 24)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// 3. Schools: School / University Multi-Floor Building
function SchoolBuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" {...props}>
      {/* Building Outline */}
      <rect x="14" y="10" width="20" height="32" rx="1.5" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Windows Grid (2x4) */}
      <rect x="18" y="14" width="4" height="4" strokeWidth="2" />
      <rect x="26" y="14" width="4" height="4" strokeWidth="2" />
      <rect x="18" y="21" width="4" height="4" strokeWidth="2" />
      <rect x="26" y="21" width="4" height="4" strokeWidth="2" />
      <rect x="18" y="28" width="4" height="4" strokeWidth="2" />
      <rect x="26" y="28" width="4" height="4" strokeWidth="2" />
      {/* Doorway */}
      <path d="M21 42V35H27V42" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Ground Line */}
      <path d="M8 42H40" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// 4. Centres of Excellence: Interconnected Node Network / Hub
function CoeNetworkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" {...props}>
      {/* Central Hub Node */}
      <circle cx="24" cy="24" r="5" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
      {/* Outer Nodes */}
      <circle cx="12" cy="14" r="3.5" fill="currentColor" />
      <circle cx="36" cy="14" r="3.5" fill="currentColor" />
      <circle cx="36" cy="34" r="3.5" fill="currentColor" />
      <circle cx="12" cy="34" r="3.5" fill="currentColor" />
      {/* Connecting Rods */}
      <line x1="14.5" y1="16.5" x2="20.5" y2="21" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="33.5" y1="16.5" x2="27.5" y2="21" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="33.5" y1="31.5" x2="27.5" y2="27" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14.5" y1="31.5" x2="20.5" y2="27" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
