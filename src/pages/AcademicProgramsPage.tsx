import React from 'react';
import { AcademicProgramsSection } from '../components/AcademicProgramsSection';
import { GraduationCap, ShieldCheck, Download, Award, BookOpen, Clock, Building2 } from 'lucide-react';

interface AcademicProgramsPageProps {
  onNavigate: (tab: string) => void;
}

export const AcademicProgramsPage: React.FC<AcademicProgramsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* Institutional Top Breadcrumb Header */}
      <div className="bg-[#0B1528] text-white py-12 sm:py-16 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-amber-300 text-xs font-mono font-semibold tracking-wider uppercase mb-4 shadow-2xs">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>Academic Directorate · Academic Session 2026–27</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
            Curricula &amp; Academic Programs
          </h1>
          <p className="text-stone-300 text-sm sm:text-base mt-3.5 leading-relaxed max-w-2xl mx-auto font-normal">
            Outcome-Based Technical Pedagogy approved by AICTE New Delhi and affiliated with Biju Patnaik University of Technology (BPUT), Odisha.
          </p>

          {/* Key Accreditation Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 text-xs text-stone-200">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>AICTE Model Curriculum 2026</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>NBA Tier-1 Accredited Disciplines</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>BPUT Autonomous Regulations</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Academic Schools & Degree Programs Component */}
      <div className="relative">
        <AcademicProgramsSection onNavigate={onNavigate} />
      </div>

      {/* Academic Regulations & Downloads Strip */}
      <div className="bg-white border-t border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Regulation Card 1 */}
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <BookOpen className="w-5 h-5 text-blue-900 mb-3" />
                <h3 className="text-sm font-bold text-stone-900 mb-1">
                  Autonomous Academic Regulations (2026–27)
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Rules governing credit allocation, grading scale (10-point SGPA/CGPA), and academic integrity standards.
                </p>
              </div>
              <button 
                onClick={() => alert('Downloading Autonomous Academic Regulations Gazette PDF (2026 Edition)...')}
                className="mt-4 text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Gazette PDF</span>
              </button>
            </div>

            {/* Regulation Card 2 */}
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <Clock className="w-5 h-5 text-amber-700 mb-3" />
                <h3 className="text-sm font-bold text-stone-900 mb-1">
                  Academic Calendar &amp; Examination Schedule
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Official semester term dates, mid-term evaluations, practical vivas, and BPUT centralized exam timelines.
                </p>
              </div>
              <button 
                onClick={() => alert('Downloading Official Academic Calendar 2026–27...')}
                className="mt-4 text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Calendar PDF</span>
              </button>
            </div>

            {/* Regulation Card 3 */}
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <Award className="w-5 h-5 text-rose-700 mb-3" />
                <h3 className="text-sm font-bold text-stone-900 mb-1">
                  Lateral Entry &amp; Credit Transfer Rules
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Policies for direct 2nd-year B.Tech admissions for diploma holders and B.Sc graduates via OJEE.
                </p>
              </div>
              <button 
                onClick={() => alert('Downloading Lateral Entry Credit Transfer Guidelines 2026...')}
                className="mt-4 text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>View Guidelines</span>
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
