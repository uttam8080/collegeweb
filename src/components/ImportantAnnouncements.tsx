import React, { useState } from 'react';
import { 
  FileText, 
  ExternalLink, 
  Download, 
  Calendar, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  GraduationCap,
  Sparkles
} from 'lucide-react';

interface AnnouncementItem {
  id: string;
  category: 'report' | 'admission' | 'placement' | 'research' | 'exam';
  categoryLabel: string;
  title: string;
  thumbnail?: string;
  reportSubtitle?: string;
  pdfSize?: string;
  content: string;
  subContent?: string;
  hasNewTag?: boolean;
  actionText?: string;
  actionTab?: string;
  date: string;
  refNo: string;
  signatory: string;
}

interface ImportantAnnouncementsProps {
  onNavigate?: (tab: string) => void;
}

export const ImportantAnnouncements: React.FC<ImportantAnnouncementsProps> = ({ onNavigate }) => {
  const [selectedItem, setSelectedItem] = useState<AnnouncementItem | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Stable Top Featured Report Card (Permanently anchored at top)
  const featuredReport: AnnouncementItem = {
    id: 'ann-report-stable',
    category: 'report',
    categoryLabel: 'OFFICIAL REPORT',
    title: 'TEKKZY Institutional Research Impact & Innovation Dossier (2025–26)',
    thumbnail: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=600&auto=format&fit=crop',
    reportSubtitle: 'Annual institutional compendium detailing DSIR-SIRO industrial patents, CISCO thingQbator IoT hardware prototypes, and 450+ Scopus/IEEE indexed faculty publications.',
    pdfSize: 'PDF (4.8 MB)',
    content: 'The Annual Research & Innovation Dossier captures the breakthrough technological achievements of TEKKZY College of Technology faculty, research scholars, and incubation cohorts across artificial intelligence, autonomous robotics, renewable materials, and IoT sensor arrays.',
    subContent: 'Includes NIRF academic disclosure data, BPUT university rankings, and corporate sponsored R&D grants worth ₹2.4 Crores.',
    hasNewTag: true,
    actionText: 'Download Dossier (PDF 4.8 MB)',
    actionTab: 'research',
    date: 'May 04, 2026',
    refNo: 'TEKKZY/RO/R&D/2026/088',
    signatory: 'Dean (Research & Industrial Consultancy)',
  };

  // 2. Remaining Below Announcement Boxes (Continuously animating upward)
  const scrollingAnnouncements: AnnouncementItem[] = [
    {
      id: 'ann-scroll-1',
      category: 'admission',
      categoryLabel: 'Admissions 2026',
      title: 'Correction Window for B.Tech & MCA Admissions 2026–27',
      content: 'The correction window for editing already submitted online applications for admission to the B.Tech (Computer Science, AI & ML, Robotics, ECE) and MCA Programmes for the Academic Year 2026–27 by national and state candidates is now open and will remain accessible until midnight on 15.05.2026.',
      subContent: '(Candidates may log in to their respective application portals using their registered Application ID and date of birth to update qualifying scores, domicile status, or program preferences).',
      hasNewTag: true,
      actionText: 'Open Admissions Portal',
      actionTab: 'programs',
      date: 'May 02, 2026',
      refNo: 'TEKKZY/ADM/2026/CIR-14',
      signatory: 'Chairman, Central Admissions Committee',
    },
    {
      id: 'ann-scroll-2',
      category: 'placement',
      categoryLabel: 'Placement Drive',
      title: 'Campus Recruitment Schedule: TCS Digital, Infosys & Cognizant Core',
      content: 'Kind Attention: Final Year B.Tech & MCA Students (Graduating Batch 2026): "The schedule for on-campus technical assessments and coding hackathons by TCS Digital (₹7.5 LPA Tier), Infosys SpringBoard, and Cognizant GenC Next has been finalized. Eligible registered candidates with aggregate CGPA ≥ 6.5 must verify their profiles and upload their updated resumes on the Training & Placement portal before 10.05.2026 midnight."',
      hasNewTag: true,
      actionText: 'Apply Now / View Drive Schedule',
      actionTab: 'placements',
      date: 'April 30, 2026',
      refNo: 'TEKKZY/T&P/DRIVE/2026/042',
      signatory: 'Head, Corporate Relations & Placements',
    },
    {
      id: 'ann-scroll-3',
      category: 'research',
      categoryLabel: 'Expression of Interest',
      title: 'Expression of Interest (EoI) - Autonomous Drone Firmware & Edge AI Swarm Node',
      content: 'Expression of Interest (EoI) - Design and Development of an Autonomous UAV Drone Firmware, Geospatial Edge AI Inference Orchestration Node, and Computer Vision Sensor Fusion Module for CISCO thingQbator Center of Excellence.',
      subContent: 'Proposals are invited from industry tech partners, research labs, and SIRO-registered defense prototyping firms. Detailed terms of reference are available for download.',
      hasNewTag: true,
      actionText: 'Download EoI Document (PDF)',
      actionTab: 'research',
      date: 'April 28, 2026',
      refNo: 'TEKKZY/CISCO-COE/EOI/2026/03',
      signatory: 'Principal Investigator, CISCO thingQbator Hub',
    },
    {
      id: 'ann-scroll-4',
      category: 'exam',
      categoryLabel: 'BPUT Examinations',
      title: 'BPUT Even Semester Regular & Back-Paper Examination Form Fill-up',
      content: 'Notice regarding online submission of Even Semester 2025–26 Regular and Back Examination forms for B.Tech, M.Tech, and MCA batches on the BPUT Examination Portal without late fine.',
      subContent: '(All bonafide students are advised to clear semester tuition fees and laboratory clearances on the AIS E-Governance portal prior to form generation).',
      hasNewTag: true,
      actionText: 'Check Examination Circular',
      actionTab: 'notices',
      date: 'April 25, 2026',
      refNo: 'BPUT/EXAM/TEKKZY/2026/910',
      signatory: 'Controller of Examinations',
    },
    {
      id: 'ann-scroll-5',
      category: 'admission',
      categoryLabel: 'Smart Odisha Hackathon',
      title: 'National Hackathon 2026: IoT & Smart Energy Innovation Sprint',
      content: 'Registrations are open for the 36-hour National Collegiate Hackathon hosted at TEKKZY Central Innovation Precinct in association with CISCO and Startup Odisha. Cash prizes worth ₹5 Lakhs and pre-placement interviews for winners.',
      subContent: '(Teams of 3 to 4 multidisciplinary engineering students can submit abstract proposals before 20.05.2026).',
      hasNewTag: true,
      actionText: 'Register Innovation Team',
      actionTab: 'programs',
      date: 'April 22, 2026',
      refNo: 'TEKKZY/INNOV/HACK/2026/07',
      signatory: 'Convener, Tech Innovation Cell',
    },
  ];

  return (
    <section className="w-full bg-[#FAFAFA] py-14 sm:py-20 border-b border-stone-200 select-none">
      {/* Embedded CSS Keyframes for GPU-Accelerated Smooth Vertical Upward Animation */}
      <style>{`
        @keyframes scrollNoticesUpward {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .notice-upward-stream {
          animation: scrollNoticesUpward 26s linear infinite;
        }
        .notice-upward-stream-paused {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            SECTION HEADER: Matching IIT Delhi Screenshot ("IMPORTANT ANNOUNCEMENTS")
            ========================================================================= */}
        <div className="text-center mb-9">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight uppercase">
            <span className="text-[#991B1B] font-extrabold">IMPORTANT</span>{' '}
            <span className="text-[#1E293B]">ANNOUNCEMENTS</span>
          </h2>

          {/* Centered Decorative Red Divider: —— • —— */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <span className="w-9 h-0.5 bg-[#991B1B]" />
            <span className="w-3.5 h-1.5 bg-[#991B1B] rounded-full" />
            <span className="w-9 h-0.5 bg-[#991B1B]" />
          </div>
        </div>

        {/* =========================================================================
            1. STABLE TOP FEATURED REPORT CARD (Permanently Fixed in Place)
            ========================================================================= */}
        <div className="mb-6">
          <div
            onClick={() => setSelectedItem(featuredReport)}
            className="group relative bg-[#FFF8F8] hover:bg-[#FFF5F5] border border-red-200/90 border-l-[6px] border-l-[#991B1B] rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
              {/* Left Publication Cover Thumbnail with Red Frame */}
              <div className="relative shrink-0 w-36 sm:w-44 h-24 sm:h-28 rounded-lg overflow-hidden border-2 border-[#991B1B] shadow-xs bg-white">
                <img
                  src={featuredReport.thumbnail}
                  alt={featuredReport.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex flex-col justify-end p-2 text-white">
                  <span className="text-[9px] font-black uppercase tracking-wider text-amber-300">
                    TEKKZY BULLETIN
                  </span>
                  <span className="text-[11px] font-bold leading-tight line-clamp-1">
                    Research Impact
                  </span>
                </div>
              </div>

              {/* Report Text & Actions */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#991B1B]">
                    {featuredReport.categoryLabel}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-[11px] text-stone-500 font-mono">
                    {featuredReport.date}
                  </span>
                  {featuredReport.hasNewTag && (
                    <span className="inline-flex items-center px-1.5 py-0.2 rounded-xs bg-[#991B1B] text-white text-[9px] font-black tracking-wider uppercase animate-pulse">
                      NEW
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#1E293B] group-hover:text-[#991B1B] transition-colors leading-snug">
                  {featuredReport.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
                  {featuredReport.reportSubtitle}
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onNavigate && featuredReport.actionTab) onNavigate(featuredReport.actionTab);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#991B1B] hover:text-red-900 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Dossier ({featuredReport.pdfSize})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. REMAINING BELOW BOXES: CONTINUOUSLY ANIMATE FROM BELOW TO UPWARD
            ========================================================================= */}
        <div className="relative">
          {/* Scrolling Viewport (Fixed height, hides overflow, smooth top/bottom gradient mask) */}
          <div 
            className="relative h-[380px] sm:h-[420px] overflow-hidden rounded-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Top and Bottom Gradient Fades for Smooth Fade-in and Fade-out */}
            <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

            {/* Continuous Upward Animated Track (Duplicated list for seamless infinite loop) */}
            <div 
              className={`space-y-4 notice-upward-stream will-change-transform ${
                isHovered ? 'notice-upward-stream-paused' : ''
              }`}
            >
              {[...scrollingAnnouncements, ...scrollingAnnouncements].map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  onClick={() => setSelectedItem(item)}
                  className="group relative bg-white hover:bg-stone-50/90 border border-stone-200 border-l-[6px] border-l-[#991B1B] rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="flex flex-col gap-2">
                    {/* Category & Reference Date Header */}
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold uppercase tracking-wider text-[#991B1B]">
                          {item.categoryLabel}
                        </span>
                        <span>•</span>
                        <span className="font-mono text-stone-400">{item.refNo}</span>
                      </div>
                      <span className="font-mono text-stone-400 hidden sm:inline">{item.date}</span>
                    </div>

                    {/* Announcement Content */}
                    <div className="text-[13px] sm:text-sm text-stone-800 leading-relaxed font-normal">
                      <span>{item.content}</span>

                      {item.hasNewTag && (
                        <span className="inline-flex items-center ml-2 px-1.5 py-0.2 rounded-xs bg-[#E03D2E] text-white text-[9px] font-black tracking-wider uppercase align-middle shadow-2xs animate-pulse">
                          NEW
                        </span>
                      )}
                    </div>

                    {/* Sub-content note if present */}
                    {item.subContent && (
                      <p className="text-xs text-stone-600 italic leading-normal">
                        {item.subContent}
                      </p>
                    )}

                    {/* Interactive Action Button */}
                    {item.actionText && (
                      <div className="mt-1 pt-2 flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onNavigate && item.actionTab) onNavigate(item.actionTab);
                          }}
                          className="text-xs font-bold text-[#991B1B] hover:text-red-800 hover:underline flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <span>{item.actionText}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ANNOUNCEMENT DETAIL MODAL
          ========================================================================= */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-t-6 border-[#991B1B] relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-[#991B1B] text-[10px] font-extrabold uppercase tracking-wider">
                {selectedItem.categoryLabel}
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {selectedItem.date}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-[#1E293B] leading-snug">
              {selectedItem.title}
            </h3>

            <div className="text-xs font-mono text-stone-500 mt-1 mb-4 pb-3 border-b border-stone-200">
              Official Gazette Reference: {selectedItem.refNo}
            </div>

            {/* Modal Body */}
            <div className="space-y-3 text-sm text-stone-700 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>{selectedItem.content}</p>
              {selectedItem.subContent && (
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-stone-700 text-xs italic">
                  {selectedItem.subContent}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-stone-500 font-medium text-left w-full sm:w-auto">
                Issued by: <span className="font-semibold text-stone-800">{selectedItem.signatory}</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 rounded-lg border border-stone-300 text-stone-600 hover:bg-stone-100 font-semibold cursor-pointer"
                >
                  Close
                </button>
                {selectedItem.actionTab && (
                  <button
                    onClick={() => {
                      if (onNavigate) onNavigate(selectedItem.actionTab!);
                      setSelectedItem(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-[#991B1B] hover:bg-red-800 text-white font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Proceed to Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
