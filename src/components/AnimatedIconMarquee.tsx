import React from 'react';
import { Icon } from '@iconify/react';
import { Check } from 'lucide-react';

interface BrandItem {
  id: string;
  name: string;
  iconifyId: string;
  svgBadge: React.ReactNode;
}

// 8 Brand Logos specified in design prompt
const BRANDS: BrandItem[] = [
  {
    id: 'slack',
    name: 'Slack',
    iconifyId: 'logos:slack-icon',
    svgBadge: (
      <svg viewBox="0 0 128 128" className="w-14 h-14 sm:w-16 sm:h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.4 78.4a13.9 13.9 0 1 1-13.9-13.9h13.9v13.9z" fill="#E01E5A"/>
        <path d="M35.4 78.4a13.9 13.9 0 0 1 27.8 0v34.8a13.9 13.9 0 1 1-27.8 0V78.4z" fill="#E01E5A"/>
        <path d="M49.6 28.4a13.9 13.9 0 1 1 13.9-13.9v13.9H49.6z" fill="#36C5F0"/>
        <path d="M49.6 35.4a13.9 13.9 0 0 1 0 27.8H14.8a13.9 13.9 0 1 1 0-27.8h34.8z" fill="#36C5F0"/>
        <path d="M99.6 49.6a13.9 13.9 0 1 1 13.9 13.9H99.6V49.6z" fill="#2EB67D"/>
        <path d="M92.6 49.6a13.9 13.9 0 0 1-27.8 0V14.8a13.9 13.9 0 1 1 27.8 0v34.8z" fill="#2EB67D"/>
        <path d="M78.4 99.6a13.9 13.9 0 1 1-13.9 13.9V99.6h13.9z" fill="#ECB22E"/>
        <path d="M78.4 92.6a13.9 13.9 0 0 1 0-27.8h34.8a13.9 13.9 0 1 1 0 27.8H78.4z" fill="#ECB22E"/>
      </svg>
    ),
  },
  {
    id: 'figma',
    name: 'Figma',
    iconifyId: 'logos:figma',
    svgBadge: (
      <svg viewBox="0 0 128 128" className="w-12 h-12 sm:w-14 sm:h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M42.7 128c11.8 0 21.3-9.5 21.3-21.3V85.3H42.7C30.9 85.3 21.3 94.9 21.3 106.7S30.9 128 42.7 128z" fill="#0ACF83"/>
        <path d="M21.3 64c0-11.8 9.6-21.3 21.4-21.3H64v42.6H42.7C30.9 85.3 21.3 75.8 21.3 64z" fill="#A259FF"/>
        <path d="M21.3 21.3C21.3 9.6 30.9 0 42.7 0H64v42.7H42.7C30.9 42.7 21.3 33.1 21.3 21.3z" fill="#F24E1E"/>
        <path d="M64 0h21.3c11.8 0 21.4 9.6 21.4 21.3s-9.6 21.4-21.4 21.4H64V0z" fill="#FF7262"/>
        <path d="M106.7 64c0 11.8-9.6 21.3-21.4 21.3S64 75.8 64 64s9.6-21.3 21.3-21.3 21.4 9.5 21.4 21.3z" fill="#1ABCFE"/>
      </svg>
    ),
  },
  {
    id: 'notion',
    name: 'Notion',
    iconifyId: 'logos:notion-icon',
    svgBadge: (
      <svg viewBox="0 0 128 128" className="w-13 h-13 sm:w-15 sm:h-15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.8 20.3L33.7 9c3.2-2.4 6.7-3.7 13.6-3.1l63 5c5.3.4 6.4 2.8 5.6 7.3L104.7 99c-.8 5.6-3.6 8.3-9.5 7.9L24.3 100c-6-.5-7.4-3.5-6.5-9.1l8.5-70.6c.9-4.8-.4-6.4-7.5-6.4V20.3z" fill="#000000"/>
        <path d="M38.8 25.4c-4.4 0-5.8 2.2-4.8 6.5l8.7 54.3c.9 4.3 3.5 5.8 8.7 6.2l48.6 3.6c5.2.4 7.4-1.8 6.5-6.1L98 35.6c-.9-4.3-3.9-6.5-8.7-6.9L38.8 25.4z" fill="#FFFFFF"/>
        <path d="M47.8 38.6c0-2.4 1.2-3.7 3.6-3.5l30.4 2.4c2.4.2 3.1 1.6 2.3 3.8L68.7 75.4l14.7 1.2c2.4.2 3.3 1.6 3.1 3.8 0 2.2-1.3 3.5-3.7 3.3L48.6 81.3c-2.4-.2-3.1-1.6-2.3-3.8l15.4-34.1-10.3-.8c-2.4-.2-3.6-1.6-3.6-4z" fill="#000000"/>
      </svg>
    ),
  },
  {
    id: 'discord',
    name: 'Discord',
    iconifyId: 'logos:discord-icon',
    svgBadge: (
      <svg viewBox="0 0 128 128" className="w-13 h-13 sm:w-15 sm:h-15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M107.7 22.9C99.6 19.1 91 16.3 82 14.8c-.3.5-.6 1.2-.9 1.8-9.8-1.5-19.6-1.5-29.3 0-.3-.6-.6-1.3-.9-1.8-9 1.5-17.6 4.3-25.7 8.1C9.1 47.1 4.7 70.8 7.3 94c10.8 8 21.2 12.9 31.5 16.1 2.5-3.4 4.7-7.1 6.6-11-3.7-1.4-7.2-3.2-10.6-5.3.9-.6 1.7-1.3 2.6-2 20.6 9.5 43 9.5 63.4 0 .9.7 1.8 1.4 2.6 2-3.4 2.1-7 3.9-10.7 5.3 1.9 3.8 4.1 7.5 6.6 11 10.3-3.2 20.8-8.1 31.6-16.1 3.1-26.9-5.3-50.3-23.2-71.1zM42.8 77.2c-6.2 0-11.4-5.7-11.4-12.7s5-12.7 11.4-12.7c6.5 0 11.6 5.8 11.4 12.7 0 7-5 12.7-11.4 12.7zm42.4 0c-6.2 0-11.4-5.7-11.4-12.7s5-12.7 11.4-12.7c6.5 0 11.6 5.8 11.4 12.7 0 7-5 12.7-11.4 12.7z" fill="#5865F2"/>
      </svg>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    iconifyId: 'logos:github-icon',
    svgBadge: (
      <svg viewBox="0 0 128 128" className="w-13 h-13 sm:w-15 sm:h-15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M64 5.3C28.7 5.3 0 34 0 69.4c0 28.3 18.4 52.3 43.8 60.8 3.2.6 4.4-1.4 4.4-3.1 0-1.5-.1-6.6-.1-11.9-17.8 3.9-21.6-7.6-21.6-7.6-2.9-7.4-7.1-9.4-7.1-9.4-5.8-4 .4-3.9.4-3.9 6.4.5 9.8 6.6 9.8 6.6 5.7 9.8 15 7 18.7 5.3.6-4.2 2.2-7 4.1-8.7-14.2-1.6-29.2-7.1-29.2-31.7 0-7 2.5-12.8 6.6-17.3-.7-1.6-2.9-8.2.6-17.1 0 0 5.4-1.7 17.7 6.6 5.1-1.4 10.7-2.2 16.1-2.2 5.5 0 11 0.7 16.1 2.2 12.3-8.3 17.7-6.6 17.7-6.6 3.5 8.9 1.3 15.5.6 17.1 4.1 4.5 6.6 10.2 6.6 17.3 0 24.7-15 30-29.3 31.6 2.3 2 4.4 5.9 4.4 11.9 0 8.6-.1 15.5-.1 17.7 0 1.7 1.2 3.7 4.4 3.1 25.5-8.5 43.8-32.5 43.8-60.8C128 34 99.3 5.3 64 5.3z" fill="#24292F"/>
      </svg>
    ),
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    iconifyId: 'logos:google-drive',
    svgBadge: (
      <svg viewBox="0 0 128 128" className="w-13 h-13 sm:w-15 sm:h-15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M43.7 20.3L86.3 94H128L85.3 20.3H43.7z" fill="#FFC107"/>
        <path d="M43.7 20.3L1.3 94l21.3 37 42.7-74-21.6-36.7z" fill="#0066DA"/>
        <path d="M42.7 94l21.3 37h85.3L128 94H42.7z" fill="#00AC47"/>
      </svg>
    ),
  },
  {
    id: 'zoom',
    name: 'Zoom',
    iconifyId: 'logos:zoom-icon',
    svgBadge: (
      <svg viewBox="0 0 128 128" className="w-13 h-13 sm:w-15 sm:h-15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="28" fill="#2D8CFF"/>
        <path d="M26 44.8C26 38.8 30.8 34 36.8 34h40.4c6 0 10.8 4.8 10.8 10.8v38.4c0 6-4.8 10.8-10.8 10.8H36.8C30.8 94 26 89.2 26 83.2V44.8z" fill="#FFFFFF"/>
        <path d="M88 56.4L102 44.8v38.4L88 71.6V56.4z" fill="#FFFFFF"/>
      </svg>
    ),
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    iconifyId: 'logos:dropbox',
    svgBadge: (
      <svg viewBox="0 0 128 128" className="w-13 h-13 sm:w-15 sm:h-15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 18.6L0 39.5l32 20.9 32-20.9L32 18.6z" fill="#0061FF"/>
        <path d="M96 18.6L64 39.5l32 20.9 32-20.9-32-20.9z" fill="#0061FF"/>
        <path d="M0 81.3l32 20.9 32-20.9L32 60.4 0 81.3z" fill="#0061FF"/>
        <path d="M128 81.3L96 60.4 64 81.3l32 20.9 32-20.9z" fill="#0061FF"/>
        <path d="M64 86.8L32 107.7l-9.1-5.9v7.6L64 128l41.1-18.6v-7.6l-9.1 5.9L64 86.8z" fill="#0061FF"/>
      </svg>
    ),
  },
];

// Helper Brand Badge renderer combining Iconify dynamic SVG with inline vector fallback
const DynamicBrandBadge: React.FC<{ brand: BrandItem }> = ({ brand }) => {
  return (
    <div className="w-full h-full flex items-center justify-center relative select-none">
      {/* Iconify Dynamic Icon */}
      <Icon 
        icon={brand.iconifyId} 
        className="w-14 h-14 sm:w-16 sm:h-16 hidden group-hover/iconify:inline-block" 
      />
      {/* Crisp Offline-Resilient Vector SVG Graphic */}
      <div className="w-full h-full flex items-center justify-center">
        {brand.svgBadge}
      </div>
    </div>
  );
};

export const AnimatedIconMarquee: React.FC = () => {
  // 3 duplicated sets guarantee a perfectly seamless infinite loop on any screen width up to 1440px+
  const marqueeSets = [0, 1, 2];

  return (
    <section 
      className="relative w-full min-h-screen py-20 sm:py-24 lg:py-28 bg-[#fafafa] flex flex-col justify-center items-center overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] selection:bg-indigo-500/20 selection:text-indigo-900"
    >
      {/* Centered Main Layout Container (1440px Max Width) */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center space-y-12 sm:space-y-16">
        
        {/* =========================================================================
            1. FEATURE HEADER
            Eyebrow label, headline with italic gradient accent span, and body text
            ========================================================================= */}
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Eyebrow: text-xs, uppercase, semibold, tracking-widest */}
          <span className="inline-block text-xs uppercase font-semibold tracking-widest text-slate-500 font-mono">
            ECOSYSTEM INTEGRATIONS
          </span>

          {/* Headline: text-4xl md:text-5xl, bold, with gradient accent span (italic) */}
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.14]">
            Connect seamlessly with your{' '}
            <span className="italic bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              modern workflow
            </span>
          </h2>

          {/* Body: text-lg, medium gray */}
          <p className="text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Supercharge collaboration and streamline productivity with deep, bi-directional integrations across the developer, design, and enterprise tools your team relies on daily.
          </p>
        </div>

        {/* =========================================================================
            2. HORIZONTAL INFINITE MARQUEE
            - 40-second smooth scroll cycle
            - CSS alpha mask: transparent at 0% → opaque at 15% → opaque at 85% → transparent at 100%
            - Duplicated content sets for seamless loop
            - Hover interaction: pauses animation on hover
            - Individual circle hover state: translateY(-8px), scale(1.05), enhanced shadow, border lightening
            ========================================================================= */}
        <div 
          className="relative w-full overflow-hidden group-marquee py-6"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          }}
        >
          {/* 40-Second CSS Scrolling Track */}
          <div className="animate-marquee-40s flex items-center gap-6 sm:gap-8 lg:gap-10">
            {marqueeSets.map((setIdx) => (
              <div 
                key={`marquee-set-${setIdx}`} 
                className="flex items-center gap-6 sm:gap-8 lg:gap-10 shrink-0"
                aria-hidden={setIdx > 0}
              >
                {BRANDS.map((brand) => (
                  <div
                    key={`${brand.id}-set-${setIdx}`}
                    title={brand.name}
                    className="
                      w-28 h-28 sm:w-32 sm:h-32 
                      rounded-full bg-white 
                      border border-slate-200/90 
                      shadow-sm 
                      flex items-center justify-center 
                      p-6 sm:p-7 
                      shrink-0 
                      cursor-pointer 
                      transition-all duration-300 ease-out
                      hover:-translate-y-2 hover:scale-105 hover:shadow-xl hover:border-slate-300
                      group/brand
                    "
                  >
                    <DynamicBrandBadge brand={brand} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            3. BOTTOM ROW: TRUST INDICATORS
            Checkmarks + text with accents (text-sm, light gray, semibold)
            ========================================================================= */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-4 text-sm text-slate-500 font-semibold">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/80">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span>Enterprise-grade security</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/80">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span>Real-time bidirectional sync</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/80">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span>Zero-config OAuth 2.0 setup</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/80">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span>99.99% API SLA uptime</span>
          </div>
        </div>

      </div>
    </section>
  );
};

