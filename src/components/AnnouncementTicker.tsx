import React, { useState, useEffect } from 'react';
import { Bell, ChevronRight, X, Sparkles, Volume2 } from 'lucide-react';

export const AnnouncementTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const announcements = [
    {
      badge: 'ADMISSIONS 2026',
      text: 'Admissions open for B.Tech (CSE, AI/ML, Data Science, ECE), MCA, MBA & Ph.D under BPUT norms.',
      linkText: 'Apply Online',
    },
    {
      badge: 'PLACEMENTS',
      text: 'Phase II Campus Recruitment Drive by TCS, Infosys & Wipro scheduled. 94.8% placement rate recorded.',
      linkText: 'View Report',
    },
    {
      badge: 'EXAMINATIONS',
      text: 'TCT End-Semester Examination timetable published. Admit card download active on student portal.',
      linkText: 'Download Timetable',
    },
    {
      badge: 'thingQbator INNOVATION',
      text: 'CISCO thingQbator Maker Marathon: 48-hour IoT & Drone prototype challenge registrations open.',
      linkText: 'Register Prototype',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (!isVisible) return null;

  const current = announcements[currentIndex];

  return (
    <div className="bg-[#101b42] text-white border-b border-cyan-500/20 text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Badge & Marquee */}
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E03D2E] text-white font-bold text-[10px] tracking-wider uppercase shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>FLASH UPDATE</span>
          </span>

          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="hidden sm:inline font-semibold text-cyan-300 shrink-0 font-mono text-[11px]">
              [{current.badge}]
            </span>
            <span className="truncate text-stone-200 text-xs font-medium">
              {current.text}
            </span>
            <span className="hidden md:inline-flex items-center text-cyan-300 font-semibold underline underline-offset-2 shrink-0 cursor-pointer hover:text-white">
              {current.linkText} <ChevronRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Right Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="text-stone-400 hover:text-white p-1 rounded-md transition-colors shrink-0 cursor-pointer"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
