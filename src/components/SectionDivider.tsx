import React from 'react';

interface Props {
  variant?: 'lotus' | 'chakra' | 'diamond' | 'wave';
  className?: string;
  subtle?: boolean;
}

export const SectionDivider: React.FC<Props> = ({
  variant = 'lotus',
  className = '',
  subtle = false,
}) => {
  return (
    <div
      className={`relative w-full py-8 sm:py-10 flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Left Hairline Gradient */}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400/35 to-amber-500/70" />

      {/* Center Ornamental Crest Motif */}
      <div className="px-4 sm:px-6 flex items-center gap-2 text-amber-600/80">
        {/* Left flourish accent */}
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
        <span className="w-1 h-1 rounded-full bg-amber-300/60" />

        {variant === 'lotus' && (
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-amber-50/80 border border-amber-300/50 shadow-2xs">
            <svg
              viewBox="0 0 40 40"
              className="w-5 h-5 text-amber-600"
              fill="none"
              stroke="currentColor"
            >
              {/* Central Lotus Petals */}
              <path
                d="M20 8 C18 16 16 22 20 28 C24 22 22 16 20 8 Z"
                fill="#FF9933"
                opacity="0.9"
              />
              <path
                d="M20 28 C14 24 10 18 12 12 C16 17 18 22 20 28 Z"
                fill="#D4AF37"
                opacity="0.8"
              />
              <path
                d="M20 28 C26 24 30 18 28 12 C24 17 22 22 20 28 Z"
                fill="#D4AF37"
                opacity="0.8"
              />
              {/* Base Leaf Arc */}
              <path
                d="M10 27 C15 32 25 32 30 27 C26 33 14 33 10 27 Z"
                fill="#138808"
                opacity="0.75"
              />
              {/* Central Bindu */}
              <circle cx="20" cy="22" r="1.5" fill="#172554" />
            </svg>
          </div>
        )}

        {variant === 'chakra' && (
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-amber-50/80 border border-amber-300/50 shadow-2xs">
            <svg
              viewBox="0 0 40 40"
              className="w-5 h-5 text-amber-700"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="20" cy="20" r="13" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="2 1.5" />
              <circle cx="20" cy="20" r="4" fill="#FF9933" opacity="0.3" stroke="#FF9933" strokeWidth="1" />
              <circle cx="20" cy="20" r="1.5" fill="#172554" />
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1="20"
                  y1="10"
                  x2="20"
                  y2="30"
                  stroke="#D4AF37"
                  strokeWidth="0.8"
                  transform={`rotate(${i * 22.5} 20 20)`}
                  opacity="0.8"
                />
              ))}
            </svg>
          </div>
        )}

        {variant === 'diamond' && (
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rotate-45 border border-amber-400 bg-amber-100" />
            <span className="w-3 h-3 rotate-45 bg-gradient-to-tr from-[#172554] to-[#FF9933] shadow-xs" />
            <span className="w-2 h-2 rotate-45 border border-amber-400 bg-amber-100" />
          </div>
        )}

        {variant === 'wave' && (
          <div className="px-2">
            <svg width="48" height="12" viewBox="0 0 48 12" fill="none" className="text-amber-500">
              <path
                d="M0 6 C8 0 16 12 24 6 C32 0 40 12 48 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        )}

        {/* Right flourish accent */}
        <span className="w-1 h-1 rounded-full bg-amber-300/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
      </div>

      {/* Right Hairline Gradient */}
      <div className="flex-1 h-px bg-gradient-to-r from-amber-500/70 via-amber-400/35 to-transparent" />
    </div>
  );
};
