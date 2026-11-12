import React, { useState } from 'react';
import { X, Award, GraduationCap, Quote } from 'lucide-react';
import vcRegaliaImg from '../assets/images/Vice Chancellor in Academic Regalia.png';
import caLecturerImg from '../assets/images/CA Lecturer with Accounting Textbook.png';

interface LeaderModalData {
  role: string;
  prefix?: string;
  name: string;
  designation: string;
  image: string;
  bio: string;
  qualifications: string[];
  achievements: string[];
  message: string;
}

interface UniversityLeadershipSectionProps {
  onNavigate?: (tab: string) => void;
}

export const UniversityLeadershipSection: React.FC<UniversityLeadershipSectionProps> = ({ onNavigate }) => {
  const [selectedLeader, setSelectedLeader] = useState<LeaderModalData | null>(null);

  const leaders = [
    {
      id: 'chancellor',
      role: 'Chancellor',
      prefix: 'Eminent Academician & Senior Fellow,',
      name: 'Prof. (CA) Rohan K. Mohanty, Ph.D',
      designation: 'Chancellor\'s Nominee & Dean of Commerce & Management, BPUT Odisha',
      image: caLecturerImg,
      socials: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com'
      },
      modal: {
        role: 'Chancellor',
        prefix: 'Eminent Academician & Senior Fellow,',
        name: 'Prof. (CA) Rohan K. Mohanty, Ph.D',
        designation: 'Chancellor\'s Nominee & Dean of Commerce & Management, BPUT Odisha',
        image: caLecturerImg,
        bio: 'Distinguished Chartered Accountant, researcher, and corporate financial strategist serving on the Chancellor\'s Higher Education Council at BPUT. Spearheading fintech curriculum integration, enterprise incubators, and modern forensic accounting labs across affiliated colleges.',
        qualifications: [
          'Ph.D in Financial Economics & Computational Auditing',
          'Fellow Chartered Accountant (FCA), ICAI New Delhi',
          'Senior Fellow, Indian Institute of Advanced Financial Studies'
        ],
        achievements: [
          'Authored 4 widely cited university textbooks on Corporate Financial Reporting & Advanced Auditing',
          'Established Odisha State Fintech & Business Analytics Incubation Network',
          'Recipient of the National Award for Pedagogical Innovation in Commerce & Management Education'
        ],
        message: 'True education transforms technical competence into ethical leadership. Our graduates must combine analytical rigor with integrity to build transparent, resilient financial architectures for modern society.'
      }
    },
    {
      id: 'vice-chancellor',
      role: 'Vice Chancellor',
      prefix: 'Distinguished Academic Leader & Computing Scientist,',
      name: 'Prof. (Dr.) Amiya Kumar Rath,',
      designation: 'Vice Chancellor, BPUT Odisha',
      image: vcRegaliaImg,
      socials: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com'
      },
      modal: {
        role: 'Vice Chancellor',
        prefix: 'Distinguished Academic Leader & Computing Scientist,',
        name: 'Prof. (Dr.) Amiya Kumar Rath',
        designation: 'Vice Chancellor, BPUT Odisha',
        image: vcRegaliaImg,
        bio: 'Eminent professor, computing scientist, and academic administrator serving as the Vice Chancellor of Biju Patnaik University of Technology (BPUT). Leading comprehensive curricular revisions, SIRO research centers, and global placement ecosystems.',
        qualifications: [
          'Ph.D. in Computer Science & Engineering',
          'Senior Member, IEEE & Life Fellow of Computer Society of India',
          'Over 3 decades of teaching, research, and institutional administrative experience'
        ],
        achievements: [
          'Published 120+ peer-reviewed research papers in international journals and conference proceedings',
          'Spearheaded University Management System (UMS) digital reforms for seamless student examination services',
          'Expanded industry-academia collaborations connecting affiliated colleges with global enterprise leaders'
        ],
        message: 'At BPUT, our mission is to create fearless problem-solvers and ethical technocrats who excel in multidisciplinary engineering and build impactful technologies for the future.'
      }
    }
  ];

  return (
    <section 
      className="relative w-full overflow-hidden select-none py-20 sm:py-28 lg:py-32 bg-fixed bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/college-campus-bg1.jpg')",
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      {/* "Curve" Section Divider between Milestones Roadmap and Leadership */}
      <div className="absolute top-0 inset-x-0 overflow-hidden leading-none z-20 pointer-events-none" aria-hidden="true">
        <svg 
          viewBox="0 0 1440 64" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 lg:h-16 block text-[#FAF8F5]"
        >
          <path 
            d="M0,0 Q720,64 1440,0 L1440,0 L0,0 Z" 
            fill="currentColor" 
          />
          <path 
            d="M0,0 Q720,64 1440,0" 
            stroke="rgba(214, 211, 209, 0.6)" 
            strokeWidth="1.5" 
            fill="none"
          />
        </svg>
      </div>
      
      {/* Dark Vignette & Gradient Overlays so background is static while text & cards pop vividly */}
      <div className="absolute inset-0 bg-[#0B1322]/55 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1322]/85 via-transparent to-[#0A1322]/85 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Two Leadership Cards Grid (Chancellor & Vice Chancellor) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 sm:gap-24 lg:gap-14 items-end">
          {leaders.map((leader) => (
            <div key={leader.id} className="relative pt-24 sm:pt-32 md:pt-36">
              
              {/* Bold Golden Role Headline Above Card (Aligned cleanly with text) */}
              <div className="text-center sm:text-left sm:pl-56 md:pl-64 lg:pl-72 mb-3">
                <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#E5A93C] tracking-wide drop-shadow-md font-sans">
                  {leader.role}
                </h3>
              </div>

              {/* White Box Container - Flush with Bottom of Cutout */}
              <div className="relative bg-white/95 backdrop-blur-md rounded-3xl sm:rounded-[36px] shadow-2xl border border-white/90 p-6 sm:p-8 sm:pl-56 md:pl-64 lg:pl-72 min-h-[175px] sm:min-h-[195px] flex flex-col justify-center transition-all duration-300 hover:shadow-amber-500/15 hover:-translate-y-1">
                
                {/* Enlarge Cutout Person: TOUCHES THE BOTTOM OF THE WHITE CARD (bottom-0) & EXTENDS HIGH ABOVE */}
                <div className="absolute bottom-0 left-0 sm:left-2 md:left-4 w-44 sm:w-56 md:w-64 lg:w-72 h-[300px] sm:h-[370px] md:h-[420px] pointer-events-none z-20 flex items-end justify-center">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-contain object-bottom drop-shadow-[0_16px_30px_rgba(0,0,0,0.38)]"
                  />
                </div>

                {/* Content Inside White Box - 100% Clear, Readable, and Completely Unobstructed */}
                <div className="relative z-10 pl-36 sm:pl-0">
                  {leader.prefix && (
                    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500 leading-tight mb-1">
                      {leader.prefix}
                    </p>
                  )}
                  <h4 className="text-lg sm:text-xl lg:text-[22px] font-serif font-bold text-stone-900 tracking-tight leading-snug">
                    {leader.name}
                  </h4>
                  <p className="text-xs sm:text-[13px] font-medium text-stone-600 mt-1 mb-4 leading-snug">
                    {leader.designation}
                  </p>

                  {/* Social Icons & View Profile Action */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-0.5">
                    
                    {/* Facebook Icon */}
                    <a
                      href={leader.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[#0F766E] hover:text-[#065F46] hover:bg-teal-50 transition-colors"
                      title="Facebook"
                      aria-label="Facebook"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>

                    {/* X (Twitter) Icon */}
                    <a
                      href={leader.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[#0F766E] hover:text-[#065F46] hover:bg-teal-50 transition-colors"
                      title="X (Twitter)"
                      aria-label="X (Twitter)"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>

                    {/* LinkedIn Icon */}
                    <a
                      href={leader.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[#0F766E] hover:text-[#065F46] hover:bg-teal-50 transition-colors"
                      title="LinkedIn"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>

                    {/* Instagram Icon */}
                    <a
                      href={leader.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[#0F766E] hover:text-[#065F46] hover:bg-teal-50 transition-colors"
                      title="Instagram"
                      aria-label="Instagram"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>

                    {/* Blue Pill "View Profile" Button */}
                    <button
                      onClick={() => setSelectedLeader(leader.modal)}
                      className="inline-flex items-center gap-1 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#1b2a60] hover:bg-[#131e45] text-white text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow cursor-pointer ml-1"
                    >
                      <span>View Profile</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* "Curve" Section Divider between Leadership and Notice Board */}
      <div className="absolute bottom-0 inset-x-0 overflow-hidden leading-none z-20 pointer-events-none" aria-hidden="true">
        <svg 
          viewBox="0 0 1440 64" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 lg:h-16 block"
        >
          <path 
            d="M0,0 Q720,64 1440,0 L1440,64 L0,64 Z" 
            fill="#FAF9F5" 
          />
          <path 
            d="M0,0 Q720,64 1440,0" 
            stroke="rgba(214, 211, 209, 0.6)" 
            strokeWidth="1.5" 
            fill="none" 
          />
        </svg>
      </div>

      {/* Interactive Leader Profile Modal */}
      {selectedLeader && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedLeader(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#0A1322] text-white p-6 sm:p-8 relative">
              <button
                onClick={() => setSelectedLeader(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close profile"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 sm:gap-6">
                <img
                  src={selectedLeader.image}
                  alt={selectedLeader.name}
                  className="w-20 h-24 sm:w-26 sm:h-32 object-contain object-top rounded-2xl border-2 border-[#E5A93C] shadow-lg shrink-0 bg-stone-900/60"
                />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E5A93C] block mb-1">
                    {selectedLeader.role}
                  </span>
                  {selectedLeader.prefix && (
                    <p className="text-xs text-slate-300 font-medium">
                      {selectedLeader.prefix}
                    </p>
                  )}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                    {selectedLeader.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    {selectedLeader.designation}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
              {/* Bio */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Academic & Leadership Profile
                </h4>
                <p className="text-stone-700 text-sm leading-relaxed">
                  {selectedLeader.bio}
                </p>
              </div>

              {/* Leader Quote */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border-l-4 border-[#E5A93C] flex items-start gap-3">
                <Quote className="w-5 h-5 text-[#E5A93C] shrink-0 mt-0.5" />
                <p className="text-stone-800 text-xs sm:text-sm italic leading-relaxed font-serif">
                  "{selectedLeader.message}"
                </p>
              </div>

              {/* Qualifications */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-blue-900" />
                  Credentials & Education
                </h4>
                <ul className="space-y-1.5">
                  {selectedLeader.qualifications.map((q, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-stone-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-900 shrink-0" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#E5A93C]" />
                  Key Institutional Milestones
                </h4>
                <ul className="space-y-1.5">
                  {selectedLeader.achievements.map((ach, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-stone-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-stone-50 px-6 sm:px-8 py-4 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedLeader(null)}
                className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
