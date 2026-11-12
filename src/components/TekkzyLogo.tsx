import React from 'react';

interface Props {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const TekkzyLogo: React.FC<Props> = ({ 
  className = '', 
  variant = 'light',
  size = 'md' 
}) => {
  const isLight = variant === 'light';

  const sizeClasses = {
    sm: { icon: 'w-8 h-8', mainText: 'text-lg', subText: 'text-[7.5px]' },
    md: { icon: 'w-10 h-10 sm:w-11 sm:h-11', mainText: 'text-xl sm:text-2xl', subText: 'text-[8.5px] sm:text-[9.5px]' },
    lg: { icon: 'w-13 h-13', mainText: 'text-3xl', subText: 'text-[11px]' },
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Dynamic Modern Tech Emblem for TEKKZY */}
      <div className={`relative ${sizeClasses.icon} shrink-0 rounded-xl overflow-hidden shadow-md flex items-center justify-center p-0.5 bg-gradient-to-br from-cyan-500 via-indigo-600 to-violet-600`}>
        <div className="w-full h-full rounded-[10px] bg-slate-950/90 backdrop-blur-xs flex items-center justify-center p-1 relative overflow-hidden">
          {/* Subtle background tech grid glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/20 via-transparent to-transparent pointer-events-none" />
          
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full relative z-10" xmlns="http://www.w3.org/2000/svg">
            {/* Tech Hexagon / Circuit Frame */}
            <path
              d="M24 4L42 14.4V33.6L24 44L6 33.6V14.4L24 4Z"
              stroke="url(#tekkzy-grad-cyan)"
              strokeWidth="2"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
            />

            {/* Stylized Interlocked 'T' and 'Z' for TEKKZY */}
            {/* Top Bar of 'T' */}
            <path
              d="M14 16H34"
              stroke="#FFFFFF"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            
            {/* Stem of 'T' integrating into modern 'Z' lightning polygon */}
            <path
              d="M24 16V25L32 32H16"
              stroke="url(#tekkzy-grad-orange)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Central energy core node */}
            <circle cx="24" cy="20.5" r="2.2" fill="#06B6D4" />
            <circle cx="32" cy="32" r="1.8" fill="#F59E0B" />
            <circle cx="16" cy="32" r="1.8" fill="#38BDF8" />

            <defs>
              <linearGradient id="tekkzy-grad-cyan" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22D3EE" />
                <stop offset="0.5" stopColor="#6366F1" />
                <stop offset="1" stopColor="#A855F7" />
              </linearGradient>
              <linearGradient id="tekkzy-grad-orange" x1="16" y1="16" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38BDF8" />
                <stop offset="0.45" stopColor="#818CF8" />
                <stop offset="1" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-metro font-extrabold tracking-wider ${sizeClasses.mainText} ${
              isLight 
                ? 'text-white' 
                : 'text-[#0f172a]'
            }`}
          >
            TEKKZY
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        </div>
        <span
          className={`font-sans font-semibold tracking-[0.28em] uppercase mt-1 leading-none ${sizeClasses.subText} ${
            isLight ? 'text-cyan-300/90' : 'text-slate-600'
          }`}
        >
          College of Technology
        </span>
      </div>
    </div>
  );
};

