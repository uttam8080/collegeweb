import React, { useState, useMemo } from 'react';
import { 
  Eye, 
  Search, 
  Calendar, 
  FileText, 
  Download, 
  X, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Bell
} from 'lucide-react';

interface NoticeItem {
  id: number;
  sn: number;
  publishDate: string; // DD/MM/YYYY
  title: string;
  isNew?: boolean;
  category: 'exam' | 'phd' | 'result' | 'circular';
  memoNo: string;
  authority: string;
  description: string;
  pdfUrl?: string;
}

const ALL_NOTICES: NoticeItem[] = [
  {
    id: 1,
    sn: 1,
    publishDate: '10/11/2026',
    title: 'Receiving of Degree Certificates (Duplicate, Name Correction)',
    isNew: true,
    category: 'exam',
    memoNo: 'TCT/EXAM/CERT/2026/10892',
    authority: 'Controller of Examinations, TCT & Academic Registrar, TEKKZY',
    description: 'All passed-out graduates who have applied for duplicate degree certificates or corrections in typographical nomenclature in their grade sheets and diplomas are hereby requested to collect the physical validated certificates from the Academic Directorate Counter or opt for speed-post dispatch upon verification of ID credentials.',
  },
  {
    id: 2,
    sn: 2,
    publishDate: '11/11/2026',
    title: 'Schedule & Centre for Entrance Examination for Admission to the Ph.D Program 2026-27 (2nd Phase)',
    isNew: true,
    category: 'phd',
    memoNo: 'TCT/RD/PHD-ENT/2026/4412',
    authority: 'Dean, Research & Development and Doctoral Affairs',
    description: 'The schedule and institutional examination centres for the 2nd Phase Written Entrance Test (PET-2026) for admission into Ph.D programs across Engineering disciplines (CSE, ECE, ME, Civil, EE) are officially notified. Eligible candidates can download their biometric hall tickets from the university portal starting from 14/11/2026.',
  },
  {
    id: 3,
    sn: 3,
    publishDate: '11/11/2026',
    title: 'Ph.D Open Defence Viva Voce of Mr. Shankha Shubhra Goswami, 20MED19701, Mechanical Engineering under Faculty of Engineering on 16.11.2026 at 11.00 A.M. at CUPGS, BPUT, Raurkela in Physical Mode',
    isNew: true,
    category: 'phd',
    memoNo: 'BPUT/CUPGS/VIVA/2026/7821',
    authority: 'Board of Examination for Doctoral Studies',
    description: 'The Open Defence Viva-Voce examination in respect of Ph.D research scholar Mr. Shankha Shubhra Goswami (Reg. No. 20MED19701) on the dissertation titled "Experimental Investigations on Hybrid Composite Materials for Aerospace Heat Exchangers" will be held on 16.11.2026 at 11:00 AM in physical mode.',
  },
  {
    id: 4,
    sn: 4,
    publishDate: '06/11/2026',
    title: 'Deposit / Submission of OMR Answer Booklets of 1st Phase Odd Semester (Regular, Back) Off-Line Examinations 2026-27 (for 9th, 7th, 5th and 3rd (PG) Semesters)',
    isNew: true,
    category: 'exam',
    memoNo: 'BPUT/EXAM/OMR-SUB/2026/9104',
    authority: 'Central Examination Cell & Confidential Dispatch Unit',
    description: 'Principals and Centre Superintendents of all constituent and affiliated colleges are directed to complete the sealed physical deposit and digital barcode scanning of OMR Answer Booklets for 1st Phase Odd Semester examinations at the designated nodal evaluation repository within 48 hours of examination conclusion.',
  },
  {
    id: 5,
    sn: 5,
    publishDate: '06/11/2026',
    title: 'Distribution of OMR Answer Booklets for 1st Phase Odd Semester (Reg, Back) Offline Examination 2026-27 (for 9th, 7th, 5th and 3rd (PG) Semesters)',
    isNew: true,
    category: 'exam',
    memoNo: 'BPUT/EXAM/OMR-DIST/2026/9098',
    authority: 'Examination Logistics & Confidential Storage Wing',
    description: 'Distribution of security-encoded OMR Answer Booklets and serial ledger sheets for upcoming Odd Semester offline examinations will commence from the Central Zonal Storehouse as per the detailed college roster.',
  },
  {
    id: 6,
    sn: 6,
    publishDate: '04/11/2026',
    title: 'Publication of Provisional Results of Even Semester (Regular / Back) Examinations 2025–26 (B.Tech, M.Tech, MCA & B.Arch)',
    isNew: false,
    category: 'result',
    memoNo: 'BPUT/RES/EVEN-SEM/2026/8420',
    authority: 'Controller of Examinations, TEKKZY Autonomous & BPUT',
    description: 'The provisional semester performance grade cards (SGPA & CGPA) for Even Semester (Regular & Backlog) examinations are now declared online. Students can verify subject-wise marks by entering their University Registration Number and Date of Birth.',
  },
  {
    id: 7,
    sn: 7,
    publishDate: '01/11/2026',
    title: 'Autonomous Semester Registration & Subject Enrollment Guidelines for B.Tech & M.Tech (Academic Year 2026–27)',
    isNew: false,
    category: 'circular',
    memoNo: 'TEKKZY/ACAD/REG/2026/301',
    authority: 'Dean, Academic Directorate, TEKKZY College of Technology',
    description: 'Guidelines governing academic pre-registration, choice of open electives under Choice Based Credit System (CBCS), and mandatory MOOCs credits under NPTEL/SWAYAM frameworks for the upcoming academic semester.',
  },
  {
    id: 8,
    sn: 8,
    publishDate: '28/10/2026',
    title: 'Notification for Re-checking and Photocopy of Evaluated Answer Scripts for Final Year B.Tech Examinees',
    isNew: false,
    category: 'result',
    memoNo: 'BPUT/EXAM/RECHECK/2026/7190',
    authority: 'Examination Verification Cell',
    description: 'Examinees who desire re-totaling, re-checking, or obtaining digitized photocopies of their evaluated answer scripts can submit online application forms through the official examination portal on or before 15/11/2026 with the prescribed fees.',
  },
  {
    id: 9,
    sn: 9,
    publishDate: '25/10/2026',
    title: 'Special Carryover Examination Timetable for 2022–2026 Batches (Lateral Entry & Regular)',
    isNew: false,
    category: 'exam',
    memoNo: 'BPUT/EXAM/SPECIAL/2026/6841',
    authority: 'Conduct of Examination Committee',
    description: 'Comprehensive schedule of Special Supplementary Examination for final year graduating students having single backlog courses to facilitate timely issuance of provisional passing certificates.',
  },
  {
    id: 10,
    sn: 10,
    publishDate: '20/10/2026',
    title: 'Guidelines for Centre Superintendents, Flying Squads, and Observers on Anti-Malpractice Protocols',
    isNew: false,
    category: 'circular',
    memoNo: 'BPUT/CONF/SQUAD/2026/5129',
    authority: 'Disciplinary Action & Malpractice Prevention Council',
    description: 'Institutional operating instructions regarding CCTV surveillance footage archiving, biometric attendance stamping, and prohibition of programmable calculators or smart wearables inside test venues.',
  },
  {
    id: 11,
    sn: 11,
    publishDate: '15/10/2026',
    title: 'Syllabus Amendment Notification: Inclusion of Generative AI & Cyber Physical Systems as Core Electives',
    isNew: false,
    category: 'circular',
    memoNo: 'TEKKZY/BOS/CSE/2026/114',
    authority: 'Board of Studies (CSE & IT), TEKKZY Autonomous',
    description: 'Revised B.Tech Computer Science and Information Technology syllabus for 6th and 7th semesters incorporating 4-credit coursework on Generative AI Architectures and Edge Computing.',
  },
  {
    id: 12,
    sn: 12,
    publishDate: '10/10/2026',
    title: 'Notice for Submission of Migration Certificates and Registration Card Rectifications (Fresh Batch 2026–27)',
    isNew: false,
    category: 'circular',
    memoNo: 'TEKKZY/REG/MIG/2026/089',
    authority: 'Student Academic Records Secretariat',
    description: 'All newly admitted B.Tech and MCA candidates for academic year 2026–27 must deposit original Council/Board Migration Certificates and verify mother/father spellings on the university ERP record before 30/11/2026.',
  },
];

interface Props {
  onNavigate?: (tab: string) => void;
}

export const NoticeAndEventsSection: React.FC<Props> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'exam' | 'phd' | 'result' | 'circular'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  const itemsPerPage = 6;

  // Filter notices
  const filteredNotices = useMemo(() => {
    return ALL_NOTICES.filter((notice) => {
      const matchesSearch = 
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.memoNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.publishDate.includes(searchTerm);
      
      const matchesCat = selectedCategory === 'all' || notice.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  const totalRecords = 2021; // Total institutional historical gazettes as in BPUT portal
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);

  const currentRecords = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredNotices.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredNotices, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= Math.max(totalPages, 1)) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="w-full bg-[#FAF9F5] border-b border-stone-200/90 select-none">
      
      {/* =========================================================================
          TOP UNIVERSITY PANORAMIC BANNER (Matched with BPUT image header)
          Left: Red entrance gate · Center: University emblem & crest · Right: Clock tower quad
          ========================================================================= */}
      <div className="w-full bg-stone-900 border-b border-stone-300 overflow-hidden shadow-xs">
        <div className="max-w-[1521px] mx-auto relative aspect-[1024/137] max-h-[160px] w-full">
          <img
            src="/assets/images/bput_examination_banner.jpg"
            alt="Biju Patnaik University of Technology (BPUT) - A Pride of Odisha & TEKKZY Autonomous Campus"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              // Fallback responsive banner with pure CSS styling if image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* =========================================================================
          ORANGE BREADCRUMB ACCENT STRIP (Exact match from screenshot)
          "Home >> Examination Info"
          ========================================================================= */}
      <div className="w-full bg-[#EE5922] text-white py-2 px-4 sm:px-8 border-y border-[#d44815] shadow-xs">
        <div className="max-w-[1521px] mx-auto flex items-center justify-between text-xs sm:text-[13px] font-sans font-semibold tracking-wide">
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => onNavigate && onNavigate('home')} 
              className="hover:underline opacity-95 hover:opacity-100 cursor-pointer"
            >
              Home
            </button>
            <span className="text-white/80 font-mono">»</span>
            <span className="text-white font-bold underline underline-offset-2">Examination Info</span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-xs text-white/90 font-mono">
            <span>Affiliated Autonomous Portal: TEKKZY College of Technology</span>
            <span>•</span>
            <span>Academic Session 2026–27</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN EXAMINATION INFO SECTION
          ========================================================================= */}
      <div className="max-w-[1521px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        
        {/* Section Heading: "Examination Info" (Centered dark blue heading) */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#0A2540] tracking-tight">
            Examination Info
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-2xl mx-auto">
            Official BPUT statutory circulars, end-semester evaluation timetables, Ph.D defense proceedings, and autonomous gazettes.
          </p>
        </div>

        {/* =========================================================================
            META TOOLBAR: Showing Record count (Left) & Pagination controls (Right)
            ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pb-1">
          {/* Left: Record status indicator */}
          <div className="text-xs sm:text-sm font-sans font-semibold text-slate-800">
            Showing Record <span className="font-bold text-[#0B6623]">1 - {currentRecords.length}</span> out of <span className="font-bold">{totalRecords}</span>
          </div>

          {/* Right: Functional Pagination Controls matching screenshot: « 1 2 3 4 5 6 7 ... 40 41 » */}
          <div className="flex items-center gap-1 text-xs font-mono">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded-sm border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              title="Previous Page"
            >
              «
            </button>

            {[1, 2, 3, 4, 5, 6, 7].map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`px-2.5 py-1 rounded-sm border text-xs font-bold transition-all cursor-pointer ${
                  currentPage === p
                    ? 'bg-[#0B6623] text-white border-[#0B6623] shadow-xs'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                {p}
              </button>
            ))}

            <span className="px-1.5 py-1 text-stone-400">...</span>

            <button
              onClick={() => handlePageChange(40)}
              className="hidden md:inline-block px-2.5 py-1 rounded-sm border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 cursor-pointer"
            >
              40
            </button>

            <button
              onClick={() => handlePageChange(41)}
              className="px-2.5 py-1 rounded-sm border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 cursor-pointer"
            >
              41
            </button>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 rounded-sm border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              title="Next Page"
            >
              »
            </button>
          </div>
        </div>

        {/* Quick Filter & Keyword Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200/90 shadow-2xs">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Gazettes' },
              { id: 'exam', label: 'Examinations' },
              { id: 'phd', label: 'Ph.D & Doctoral' },
              { id: 'result', label: 'Results' },
              { id: 'circular', label: 'Regulations' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id as any);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-md text-[11px] font-mono font-bold uppercase transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0B6623] text-white shadow-2xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by title, date, or memo..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-stone-50/60 focus:bg-white focus:outline-hidden focus:border-[#0B6623]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
            NOTICE BOARD TABLE (Matched exactly with green header and columns)
            Columns: S.N. | Publish Date | Title (with New badge) | Browse (Eye icon)
            ========================================================================= */}
        <div className="w-full overflow-hidden border border-stone-300 rounded-lg shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              
              {/* Forest Green Table Header */}
              <thead>
                <tr className="bg-[#0B6623] text-white text-xs sm:text-sm font-bold">
                  <th scope="col" className="py-3 px-4 text-center w-16 sm:w-20 border-r border-emerald-800/40">
                    S.N.
                  </th>
                  <th scope="col" className="py-3 px-5 w-36 sm:w-44 border-r border-emerald-800/40">
                    Publish Date
                  </th>
                  <th scope="col" className="py-3 px-5 border-r border-emerald-800/40">
                    Title
                  </th>
                  <th scope="col" className="py-3 px-4 text-center w-24 sm:w-28">
                    Browse
                  </th>
                </tr>
              </thead>

              {/* Table Body Rows */}
              <tbody className="divide-y divide-stone-200 text-xs sm:text-[13px] text-stone-800">
                {currentRecords.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-stone-500 font-sans">
                      No official gazettes match your search criteria.
                    </td>
                  </tr>
                ) : (
                  currentRecords.map((item, idx) => (
                    <tr 
                      key={item.id}
                      className={`hover:bg-emerald-50/50 transition-colors group ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/40'
                      }`}
                    >
                      {/* S.N. Column */}
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-stone-700 border-r border-stone-200/80">
                        {item.sn}
                      </td>

                      {/* Publish Date Column */}
                      <td className="py-3.5 px-5 font-mono text-stone-700 whitespace-nowrap border-r border-stone-200/80">
                        {item.publishDate}
                      </td>

                      {/* Title Column (with New Badge) */}
                      <td className="py-3.5 px-5 border-r border-stone-200/80 leading-relaxed font-medium">
                        <button
                          onClick={() => setSelectedNotice(item)}
                          className="text-left text-blue-900 hover:text-[#EE5922] hover:underline transition-colors cursor-pointer group-hover:text-blue-950 inline"
                        >
                          {item.title}
                        </button>
                        
                        {item.isNew && (
                          <span className="inline-block ml-2 px-2 py-0.5 rounded-full text-[10px] font-sans font-bold bg-[#EE5922] text-white shadow-2xs select-none">
                            New
                          </span>
                        )}
                      </td>

                      {/* Browse Column (Green Eye Icon Button) */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => setSelectedNotice(item)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full text-[#0B6623] hover:text-emerald-800 hover:bg-emerald-100/60 active:scale-95 transition-all cursor-pointer shadow-2xs"
                          aria-label={`Browse notice: ${item.title}`}
                          title="View Official Circular"
                        >
                          <Eye className="w-5 h-5 stroke-[2.2]" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>

        {/* Bottom Pagination Strip & Direct Link to Full Archive */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="font-mono">
            BPUT Statutory Gazette Reference: <span className="font-bold text-slate-700">OD/BPUT/EXAM/TEKKZY-AUTO-2026</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate && onNavigate('notices')}
              className="inline-flex items-center gap-1.5 font-bold text-[#0B6623] hover:text-emerald-800 hover:underline cursor-pointer"
            >
              <span>View Complete Institutional Archive (2021 Records)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* =========================================================================
          OFFICIAL GAZETTE MODAL DIALOG
          Opens when user clicks "Browse" (Eye icon) or Notice Title
          ========================================================================= */}
      {selectedNotice && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedNotice(null)}
        >
          <div 
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-300 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#0B6623] text-white p-5 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>Official University Gazette · Ref #{selectedNotice.sn}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold font-serif leading-snug">
                  {selectedNotice.title}
                </h3>
              </div>
              
              <button
                onClick={() => setSelectedNotice(null)}
                className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Metadata Strip */}
            <div className="bg-stone-50 px-6 py-3 border-b border-stone-200 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-stone-400 block font-mono text-[10px] uppercase">Publish Date</span>
                <span className="font-bold text-stone-800 font-mono">{selectedNotice.publishDate}</span>
              </div>
              <div>
                <span className="text-stone-400 block font-mono text-[10px] uppercase">Dispatch Memo</span>
                <span className="font-bold text-stone-800 font-mono text-[11px] truncate block">{selectedNotice.memoNo}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-stone-400 block font-mono text-[10px] uppercase">Status</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approved &amp; Live</span>
                </span>
              </div>
            </div>

            {/* Modal Gazette Content */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
                  Issuing Directorate / Wing
                </span>
                <p className="text-xs font-mono font-semibold text-blue-900 bg-blue-50 p-2.5 rounded-lg border border-blue-100">
                  {selectedNotice.authority}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
                  Gazette Notification Text
                </span>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50/70 p-4 rounded-xl border border-stone-200">
                  {selectedNotice.description}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between gap-3">
              <span className="text-[11px] text-stone-500 font-mono hidden sm:inline">
                Digitally Authenticated by Controller of Examinations
              </span>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => alert(`Downloading official PDF Gazette for Memo: ${selectedNotice.memoNo}`)}
                  className="px-4 py-2 rounded-lg bg-[#0B6623] hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Circular</span>
                </button>

                <button
                  onClick={() => setSelectedNotice(null)}
                  className="px-4 py-2 rounded-lg bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
