import React from 'react';

interface Props {
  className?: string;
  variant?: 'light' | 'dark';
}

export const TridentLogo: React.FC<Props> = ({ className = '', variant = 'light' }) => {
  // 12 vibrant colored segments matching Trident Academy of Technology emblem
  const segmentColors = [
    '#E53E3E', '#DD6B20', '#D69E2E', '#38A169',
    '#319795', '#3182CE', '#00B4D8', '#4F46E5',
    '#805AD5', '#D53F8C', '#E53E3E', '#DD6B20'
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Trident Circular Emblem */}
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full shadow-md overflow-hidden bg-white p-0.5 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Outer ring segments */}
          {segmentColors.map((color, idx) => {
            const startAngle = (idx * 30 - 90) * (Math.PI / 180);
            const endAngle = ((idx + 1) * 30 - 90) * (Math.PI / 180);
            const rOuter = 48;
            const rInner = 30;

            const x1 = 50 + rOuter * Math.cos(startAngle);
            const y1 = 50 + rOuter * Math.sin(startAngle);
            const x2 = 50 + rOuter * Math.cos(endAngle);
            const y2 = 50 + rOuter * Math.sin(endAngle);
            const x3 = 50 + rInner * Math.cos(endAngle);
            const y3 = 50 + rInner * Math.sin(endAngle);
            const x4 = 50 + rInner * Math.cos(startAngle);
            const y4 = 50 + rInner * Math.sin(startAngle);

            const path = `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 0 0 ${x4} ${y4} Z`;

            return <path key={idx} d={path} fill={color} stroke="#ffffff" strokeWidth="1" />;
          })}

          {/* Inner White Ring */}
          <circle cx="50" cy="50" r="29" fill="#ffffff" />

          {/* Central Blue Wheel & Trident Monogram */}
          <circle cx="50" cy="50" r="24" fill="#1b2a60" />
          
          {/* Subtle Gear Teeth / Chakra Points */}
          <circle cx="50" cy="50" r="21" fill="none" stroke="#48BB78" strokeWidth="1.5" strokeDasharray="3 3" />
          
          {/* White 'T' / Trident Stylized Icon */}
          <path
            d="M 50 32 L 50 64 M 40 40 L 50 34 L 60 40 M 36 46 L 43 42 M 64 46 L 57 42"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left">
        <span
          className={`font-serif font-bold text-xl sm:text-2xl leading-none tracking-wider ${
            variant === 'light' ? 'text-white' : 'text-[#172554]'
          }`}
        >
          TRIDENT
        </span>
        <span
          className={`text-[8.5px] sm:text-[9.5px] font-sans font-semibold tracking-[0.24em] uppercase mt-1 leading-none ${
            variant === 'light' ? 'text-white/90' : 'text-stone-600'
          }`}
        >
          Academy of Technology
        </span>
      </div>
    </div>
  );
};

