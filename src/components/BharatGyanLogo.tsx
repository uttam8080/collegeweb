import React from 'react';

interface Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
  showSubtitle?: boolean;
}

export const BharatGyanLogo: React.FC<Props> = ({
  className = '',
  size = 'md',
  variant = 'dark',
  showSubtitle = true,
}) => {
  const isLight = variant === 'light';

  // Emblem icon dimension
  const iconSizeClass =
    size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';

  const titleSizeClass =
    size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  const subtitleSizeClass =
    size === 'sm' ? 'text-[8px]' : 'text-[9px]';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Sacred Padma & Surya Gyan Emblem */}
      <div
        className={`${iconSizeClass} shrink-0 rounded-xl flex items-center justify-center p-1.5 shadow-xs border transition-transform duration-300 group-hover:scale-105 ${
          isLight
            ? 'bg-gradient-to-br from-slate-900 via-[#172554] to-slate-900 border-amber-400/40 text-amber-300'
            : 'bg-gradient-to-br from-[#172554] via-[#1e3a8a] to-[#0f172a] border-amber-400/50 text-amber-400 shadow-amber-900/10'
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Outer Sun Rays / Radiance Points */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="#D4AF37"
            strokeWidth="2.5"
            strokeDasharray="4 3"
            opacity="0.8"
          />

          {/* Inner Golden Ring */}
          <circle
            cx="50"
            cy="50"
            r="38"
            stroke="url(#goldGrad)"
            strokeWidth="2"
            opacity="0.9"
          />

          {/* Central Radiant Sun Wheel (24 Rays / Ashoka Chakra homage) */}
          <g opacity="0.4" stroke="#FF9933" strokeWidth="1">
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="22"
                x2="50"
                y2="78"
                transform={`rotate(${i * 15} 50 50)`}
              />
            ))}
          </g>

          {/* Sacred Open Lotus Petals (Wisdom & Knowledge) */}
          {/* Center Petal (Flame of Wisdom / Jyoti) */}
          <path
            d="M50 16 C45 32 42 46 50 62 C58 46 55 32 50 16 Z"
            fill="url(#saffronGrad)"
          />

          {/* Left Inner Petal */}
          <path
            d="M50 62 C38 52 30 38 35 24 C44 34 47 48 50 62 Z"
            fill="url(#goldGrad)"
            opacity="0.95"
          />

          {/* Right Inner Petal */}
          <path
            d="M50 62 C62 52 70 38 65 24 C56 34 53 48 50 62 Z"
            fill="url(#goldGrad)"
            opacity="0.95"
          />

          {/* Left Outer Lotus Leaf */}
          <path
            d="M50 62 C32 58 18 48 22 34 C34 42 42 54 50 62 Z"
            fill="#FF9933"
            opacity="0.85"
          />

          {/* Right Outer Lotus Leaf */}
          <path
            d="M50 62 C68 58 82 48 78 34 C66 42 58 54 50 62 Z"
            fill="#FF9933"
            opacity="0.85"
          />

          {/* Open Knowledge Base Arc (Manuscript Page / Kundalini Seat) */}
          <path
            d="M24 64 C36 74 64 74 76 64 C66 78 34 78 24 64 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />

          {/* Central Bindu (Origin of Creation / Zero / Shunya) */}
          <circle cx="50" cy="50" r="4.5" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="2.5" fill="#172554" />

          {/* Gradients */}
          <defs>
            <linearGradient id="saffronGrad" x1="50" y1="16" x2="50" y2="62" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFB347" />
              <stop offset="0.6" stopColor="#FF9933" />
              <stop offset="1" stopColor="#D96800" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="30" y1="24" x2="70" y2="62" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF2A3" />
              <stop offset="0.5" stopColor="#D4AF37" />
              <stop offset="1" stopColor="#AA820A" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typographic Wordmark */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline">
          <span
            className={`${titleSizeClass} font-serif font-bold tracking-tight transition-colors ${
              isLight ? 'text-white' : 'text-[#172554] group-hover:text-amber-900'
            }`}
          >
            Bharat
          </span>
          <span className={`${titleSizeClass} font-serif font-bold tracking-tight text-[#FF9933] ml-0.5`}>
            Gyan
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] ml-1 mb-0.5" />
        </div>

        {showSubtitle && (
          <span
            className={`${subtitleSizeClass} font-semibold uppercase tracking-[0.22em] mt-0.5 ${
              isLight ? 'text-amber-300/80' : 'text-amber-800/80'
            }`}
          >
            Heritage · Vidya
          </span>
        )}
      </div>
    </div>
  );
};
