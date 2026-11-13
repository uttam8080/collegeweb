import React from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Download, 
  Award, 
  BookOpen, 
  Clock, 
  Building2, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2 
} from 'lucide-react';

interface AcademicProgramsPageProps {
  onNavigate: (tab: string) => void;
}

export const AcademicProgramsPage: React.FC<AcademicProgramsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* =========================================================================
          HERO SECTION: Equal size & exact gradient format as the Landing Page Hero
          ========================================================================= */}
      <section className="relative w-full h-screen min-h-[100dvh] bg-stone-950 overflow-hidden flex flex-col justify-between select-none">
        
        {/* Background Convocation Hero Image (Uploaded by user) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/academics_convocation_hero.jpg"
            alt="Academic Convocation & Graduating Scholars"
            className="w-full h-full object-cover object-center scale-102"
            onError={(e) => {
              // Fallback if needed
              (e.target as HTMLImageElement).src = '/assets/images/college_convocation_1793988239815.jpg';
            }}
          />
        </div>

        {/* Soft black gradient on the left side: Exactly matching landing page */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.94) 0%, rgba(0, 0, 0, 0.86) 28%, rgba(0, 0, 0, 0.65) 48%, rgba(0, 0, 0, 0.3) 68%, rgba(0, 0, 0, 0.08) 84%, transparent 100%)'
          }}
        />

        {/* Top subtle gradient for header legibility */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.3) 18%, transparent 35%)'
          }}
        />

        {/* Bottom subtle gradient for bottom strip */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.45) 16%, transparent 34%)'
          }}
        />

        {/* Top Spacer to preserve perfect headline spacing when navbar is fixed */}
        <div className="w-full h-24 sm:h-28 pointer-events-none select-none" aria-hidden="true" />

        {/* Hero Content Zone: Matching landing page serif headline and typography */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 w-full my-auto pb-6">
          <div className="max-w-2xl text-left">
            
            {/* Main Huge Serif Headline (Matching landing page typography) */}
            <h1 className="font-serif font-bold text-white text-5xl sm:text-6xl md:text-7xl lg:text-[78px] leading-[1.06] tracking-tight drop-shadow-md">
              Curricula &amp;<br />
              academic<br />
              excellence
            </h1>

            {/* Subtitle / Descriptive Text */}
            <p className="text-white/90 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl mt-5 drop-shadow-xs">
              Outcome-Based Technical Pedagogy approved by AICTE New Delhi and affiliated with Biju Patnaik University of Technology (BPUT), Odisha. Fostering rigorous inquiry, state-of-the-art research centers, and global placement ecosystems.
            </p>

            {/* Action CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  const target = document.getElementById('academic-regulations');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 sm:px-8 py-3.5 rounded-md bg-[#E03D2E] hover:bg-[#c93224] active:scale-98 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-red-950/40 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Syllabi</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('admissions')}
                className="px-6 py-3.5 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Admission Guidelines</span>
                <ChevronRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>

          </div>
        </div>

        {/* Hero Bottom Strip: Key Accreditations & Standards */}
        <div className="relative z-20 w-full px-4 sm:px-8 pb-7 sm:pb-9">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15 text-xs text-white/90">
            <span className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>AICTE Model Curriculum 2026</span>
            </span>
            <span className="flex items-center gap-2 font-medium">
              <Award className="w-4 h-4 text-amber-400" />
              <span>NBA Tier-1 Accredited Disciplines</span>
            </span>
            <span className="flex items-center gap-2 font-medium">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>BPUT Autonomous Regulations</span>
            </span>
            <span className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Choice Based Credit System (CBCS)</span>
            </span>
          </div>
        </div>

      </section>

      {/* =========================================================================
          Academic Regulations & Downloads Strip
          ========================================================================= */}
      <div id="academic-regulations" className="bg-white border-t border-stone-200 py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-900 block">
              Institutional Regulations
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Autonomous Academic Ordinances &amp; Syllabi
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Official regulatory gazettes, academic calendars, and syllabus frameworks established under BPUT norms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Regulation Card 1 */}
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow">
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
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow">
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
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow">
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
