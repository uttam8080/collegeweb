import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Printer, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { COLLEGE_META } from '../data/collegeData';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onSelectSubject?: (subjectId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [logoSlide, setLogoSlide] = useState(0);

  // Accreditation & Regulatory Logos displayed in the top ribbon
  const accreditationLogos = [
    {
      id: 'naac',
      img: '/logo-naac.png',
      name: 'NAAC',
      subtitle: 'National Assessment and Accreditation Council',
      hindi: 'राष्ट्रीय मूल्यांकन एवं प्रत्यायन परिषद्',
    },
    {
      id: 'ugc',
      img: '/logo-ugc.png',
      name: 'UGC',
      subtitle: 'University Grants Commission',
      hindi: 'विश्वविद्यालय अनुदान आयोग',
      tagline: 'Quality higher education for all',
    },
    {
      id: 'pci',
      img: '/logo-pci.png',
      name: 'PCI',
      subtitle: 'Pharmacy Council of India',
      tagline: 'Statutory Body under Ministry of Health & Family Welfare',
    },
    {
      id: 'naac-2',
      img: '/logo-naac.png',
      name: 'NAAC A+ Grade',
      subtitle: 'Autonomous Institution of the UGC',
      hindi: 'राष्ट्रीय मूल्यांकन एवं प्रत्यायन परिषद्',
    },
    {
      id: 'aicte',
      img: '/logo-ugc.png',
      name: 'AICTE Approved',
      subtitle: 'All India Council for Technical Education',
      tagline: 'Statutory Body, Ministry of Education, Govt of India',
    },
  ];

  // Auto carousel rotation for regulatory logos
  useEffect(() => {
    const timer = setInterval(() => {
      setLogoSlide((prev) => (prev + 1) % accreditationLogos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [accreditationLogos.length]);

  const handlePrevLogo = () => {
    setLogoSlide((prev) => (prev === 0 ? accreditationLogos.length - 1 : prev - 1));
  };

  const handleNextLogo = () => {
    setLogoSlide((prev) => (prev + 1) % accreditationLogos.length);
  };

  // Quick Links sub-columns matching exact layout from screenshot
  const quickLinksLeft = [
    { label: 'Admissions Portal & Seat Matrix', action: 'admissions' },
    { label: 'List of Degree Programs & Courses', action: 'programs' },
    { label: 'Medium of Instructions & Syllabus', action: 'programs' },
    { label: 'Academic Regulations & Statutes', action: 'about' },
    { label: 'Autonomous Academic Ordinances', action: 'about' },
    { label: 'Anti Ragging Mandatory Cell', action: 'campus' },
    { label: 'Faculty Recruitment & Vacancies', action: 'notices' },
    { label: 'University Affiliation & Exam Portal', action: 'notices' },
    { label: 'MOOCs & Digital Learning Resources', action: 'research' },
  ];

  const quickLinksRight = [
    { label: 'CGPA to % Conversion Rule', action: 'notices' },
    { label: 'PAR Form & Faculty Evaluation', action: 'notices' },
    { label: 'UMS (University Management System)', action: 'notices' },
    { label: 'Semester Examination Results Archive', action: 'notices' },
    { label: 'Convocation & Degree Verification', action: 'about' },
    { label: 'TEQIP - III World Bank Archives', action: 'research' },
    { label: 'Student Grievance Redressal Cell', action: 'campus' },
    { label: 'Terms and Conditions for Online Payments', action: 'about' },
  ];

  return (
    <footer className="w-full select-none font-sans text-stone-100">
      
      {/* =========================================================================
          1. TOP ACCREDITATION & RECOGNITION LOGOS CAROUSEL (WHITE RIBBON)
          ========================================================================= */}
      <div className="relative w-full bg-white border-y border-stone-200/90 py-3.5 sm:py-4 px-4 sm:px-6 shadow-xs overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 relative">
          
          {/* Left Arrow Button */}
          <button
            onClick={handlePrevLogo}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center shrink-0 transition-colors cursor-pointer shadow-2xs"
            aria-label="Previous accreditation logo"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Logo Strip / Carousel Items */}
          <div className="flex-1 overflow-hidden py-1">
            <div className="hidden sm:flex items-center justify-around gap-6 lg:gap-12">
              {accreditationLogos.slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-center gap-3 shrink-0 group">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* Mobile Single Slide */}
            <div className="flex sm:hidden items-center justify-center">
              <img
                src={accreditationLogos[logoSlide].img}
                alt={accreditationLogos[logoSlide].name}
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNextLogo}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center shrink-0 transition-colors cursor-pointer shadow-2xs"
            aria-label="Next accreditation logo"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>

        </div>
      </div>

      {/* =========================================================================
          2. MAIN FOOTER BODY (OFFICIAL DEEP GREEN #046A38)
          ========================================================================= */}
      <div className="w-full bg-[#046A38] text-white py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ---------------------------------------------------------------------
              COLUMN 1 (Left): University Emblem & Contact Details (md:col-span-4)
              --------------------------------------------------------------------- */}
          <div className="md:col-span-4 space-y-4 text-center sm:text-left flex flex-col items-center sm:items-start">
            
            {/* College Logo / Badge */}
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white font-mono font-bold text-lg shadow-sm">
                TAT
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-emerald-200 block">
                  INSTITUTION OF EXCELLENCE
                </span>
                <span className="text-xs font-semibold text-white/90">
                  NAAC &amp; NBA Accredited
                </span>
              </div>
            </div>

            {/* College Title & Address */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                TAT · TEKKZY College of Technology
              </h3>
              <p className="text-xs text-emerald-100 font-serif italic mt-0.5 leading-relaxed">
                Trident Academy of Technology
              </p>
              <p className="text-[11px] text-emerald-200/90 mt-1 leading-relaxed">
                F-2, Chandaka Industrial Estate, Infocity, Patia, Bhubaneswar, Odisha - 751024
              </p>
              <p className="text-[10px] font-mono text-emerald-300/80 mt-0.5 uppercase tracking-wider">
                AICTE Approved · BPUT Affiliated · DSIR-Certified SIRO
              </p>
            </div>

            {/* Phone & Helpline Numbers */}
            <div className="text-xs text-white/95 space-y-1 font-mono pt-1">
              <p className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1">
                <span><strong>Phone:</strong> +91 674 274-0555</span>
                <span><strong>Office:</strong> +91 674 274-0551</span>
              </p>
            </div>

            {/* Highlighted Yellow Examination & Admissions Helpline */}
            <div className="pt-1">
              <p className="text-xs sm:text-[13px] font-semibold text-[#FDE047] drop-shadow-xs leading-relaxed">
                For Admissions &amp; Academic Enquiry call on <span className="underline decoration-[#FDE047]/60 underline-offset-2">+91 674 274-0555</span> or email <span className="underline decoration-[#FDE047]/60 underline-offset-2">info@tekkzy.com</span>
              </p>
            </div>

            {/* Circular Outlined Social Media Icons (Matching Screenshot) */}
            <div className="flex items-center gap-3 pt-2">
              
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/90 flex items-center justify-center text-white hover:bg-white hover:text-[#046A38] transition-all cursor-pointer shadow-xs"
                title="Facebook"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/90 flex items-center justify-center text-white hover:bg-white hover:text-[#046A38] transition-all cursor-pointer shadow-xs"
                title="X (Twitter)"
                aria-label="X (Twitter)"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/90 flex items-center justify-center text-white hover:bg-white hover:text-[#046A38] transition-all cursor-pointer shadow-xs"
                title="YouTube"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/90 flex items-center justify-center text-white hover:bg-white hover:text-[#046A38] transition-all cursor-pointer shadow-xs"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

            </div>

          </div>

          {/* ---------------------------------------------------------------------
              COLUMN 2 (Middle): Quick Links 2 Sub-Columns (md:col-span-5)
              --------------------------------------------------------------------- */}
          <div className="md:col-span-5 space-y-4">
            
            {/* Header: Quick Links (with Links highlighted in Amber #F59E0B) */}
            <div className="border-b border-emerald-500/40 pb-2">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-1.5 font-sans">
                <span>Quick</span>
                <span className="text-[#FBBF24]">Links</span>
              </h3>
            </div>

            {/* 2 Sub-columns with White Circular Arrow Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
              
              {/* Left Sub-Column */}
              <ul className="space-y-2.5">
                {quickLinksLeft.map((link, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => onNavigate(link.action)}
                      className="group flex items-start gap-2 text-left text-white/95 hover:text-amber-200 transition-colors cursor-pointer leading-tight"
                    >
                      <span className="w-4 h-4 rounded-full bg-white text-[#046A38] group-hover:bg-[#FBBF24] group-hover:text-stone-900 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 shadow-2xs transition-colors">
                        →
                      </span>
                      <span className="text-[12px] group-hover:underline underline-offset-2">
                        {link.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Right Sub-Column */}
              <ul className="space-y-2.5">
                {quickLinksRight.map((link, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => onNavigate(link.action)}
                      className="group flex items-start gap-2 text-left text-white/95 hover:text-amber-200 transition-colors cursor-pointer leading-tight"
                    >
                      <span className="w-4 h-4 rounded-full bg-white text-[#046A38] group-hover:bg-[#FBBF24] group-hover:text-stone-900 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 shadow-2xs transition-colors">
                        →
                      </span>
                      <span className="text-[12px] group-hover:underline underline-offset-2">
                        {link.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

            </div>

          </div>

          {/* ---------------------------------------------------------------------
              COLUMN 3 (Right): Location Card with Google Maps (md:col-span-3)
              --------------------------------------------------------------------- */}
          <div className="md:col-span-3 space-y-4">
            
            {/* Header: Location with Folded Map Icon */}
            <div className="border-b border-emerald-500/40 pb-2 flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                Location
              </h3>
              <span className="text-xl text-[#FBBF24]" role="img" aria-label="map">
                🗺️
              </span>
            </div>

            {/* Interactive Location Map Box */}
            <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-lg bg-stone-900 group">
              
              {/* Map Preview Image */}
              <img
                src="/footer-map-preview.jpg"
                alt="Map location of TAT Campus, Infocity, Patia, Bhubaneswar"
                className="w-full h-44 object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-300"
              />

              {/* "Open in Maps" Overlay Pill Badge on Top Left */}
              <a
                href="https://maps.google.com/?q=Trident+Academy+of+Technology+Infocity+Bhubaneswar"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2.5 left-2.5 bg-white/95 hover:bg-white text-blue-700 text-[11px] font-semibold px-2.5 py-1 rounded shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3 h-3 text-blue-700" />
              </a>

              {/* Campus Address Snippet on Map Hover/Base */}
              <div className="absolute bottom-0 inset-x-0 bg-stone-950/75 backdrop-blur-xs p-2 text-[10px] text-white text-center">
                <span>Infocity, Patia, Bhubaneswar, Odisha 751024</span>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* =========================================================================
          3. BOTTOM COPYRIGHT BAR (CORAL / TERRACOTTA ORANGE #F96E29)
          ========================================================================= */}
      <div className="w-full bg-[#F96E29] text-stone-900 py-3 px-4 sm:px-6 lg:px-8 border-t border-amber-600/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-medium">
          
          {/* Copyright Statement */}
          <p className="text-center sm:text-left text-stone-900/90 font-sans">
            Copyright © {new Date().getFullYear()} TAT · TEKKZY College of Technology (Trident Academy of Technology). All Rights Reserved.
          </p>

          {/* Powered By Tag */}
          <div className="flex items-center gap-1.5 text-stone-900/90 text-[11px]">
            <span>Powered By -</span>
            <span className="font-semibold text-stone-950 underline decoration-stone-900/40 underline-offset-2">
              Lumena Technologies
            </span>
          </div>

        </div>
      </div>

    </footer>
  );
};
