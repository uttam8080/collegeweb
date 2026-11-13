import React from 'react';
import logoBadge from '../assets/images/Tekkzy College Tech Badge.png';

interface Props {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const TekkzyLogo: React.FC<Props> = ({ 
  className = '', 
  variant = 'light',
  size = 'md',
  showText = true
}) => {
  const isLight = variant === 'light';

  const sizeClasses = {
    sm: { icon: 'w-8 h-8 sm:w-9 sm:h-9', mainText: 'text-lg', subText: 'text-[7.5px]' },
    md: { icon: 'w-10 h-10 sm:w-11 sm:h-11', mainText: 'text-xl sm:text-2xl', subText: 'text-[8.5px] sm:text-[9.5px]' },
    lg: { icon: 'w-16 h-16 sm:w-20 sm:h-20', mainText: 'text-3xl', subText: 'text-[11px]' },
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Circular Tech Badge Emblem */}
      <div className={`relative ${sizeClasses.icon} shrink-0 rounded-full overflow-hidden shadow-md shadow-blue-950/20 filter drop-shadow-[0_2px_8px_rgba(6,182,212,0.45)] transition-transform duration-300 group-hover:scale-105`}>
        <img
          src={logoBadge}
          alt="Tekkzy College of Technology Logo"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Brand Typography */}
      {showText && (
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
      )}
    </div>
  );
};

