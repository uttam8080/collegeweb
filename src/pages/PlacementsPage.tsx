import React, { useState, useRef } from 'react';
import { usePageTextAnimations } from '../utils/animations';
import { 
  Briefcase, 
  TrendingUp, 
  Award, 
  Building2, 
  GraduationCap, 
  Download, 
  CheckCircle2, 
  ChevronRight, 
  Users, 
  Globe, 
  BookOpen, 
  Calendar, 
  FileSpreadsheet, 
  Send,
  Building,
  Target,
  Sparkles
} from 'lucide-react';
import { RECRUITERS, ALUMNI_SPOTLIGHT, RecruiterCompany } from '../data/collegeData';

export const PlacementsPage: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  usePageTextAnimations(pageRef);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [recruiterFormOpen, setRecruiterFormOpen] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [roleType, setRoleType] = useState('Software Engineering Trainee');
  const [vacancies, setVacancies] = useState('10-25');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const stats = [
    { label: 'Overall Placement Rate', value: '94.8%', change: 'Highest across Eastern India', icon: TrendingUp },
    { label: 'Highest Salary Package', value: '₹44.0 LPA', change: 'International Product Giants', icon: Award },
    { label: 'Average Branch Package', value: '₹7.8 LPA', change: '+18.2% Year-on-Year Growth', icon: Briefcase },
    { label: 'Recruiting Companies', value: '120+', change: 'Fortune 500 & Tech Leaders', icon: Globe },
  ];

  const fullRecruitersList: RecruiterCompany[] = [
    ...RECRUITERS,
    {
      name: 'Amazon Web Services',
      category: 'Tech Giants & Product',
      location: 'Hyderabad',
      rolesHired: ['Cloud Support Associate', 'Software Development Engineer'],
      intakeAnnual: '12 Offers',
      highestPackage: '₹38.5 LPA',
      logoText: 'Amazon',
    },
    {
      name: 'Capgemini',
      category: 'Consulting & IT Services',
      location: 'Kolkata / Pune',
      rolesHired: ['Senior Software Analyst', 'Software Engineer'],
      intakeAnnual: '95+ Offers',
      highestPackage: '₹8.5 LPA',
      logoText: 'Capgemini',
    },
    {
      name: 'Cognizant',
      category: 'Consulting & IT Services',
      location: 'Bhubaneswar / Kolkata',
      rolesHired: ['GenC Next Developer', 'GenC Elevate'],
      intakeAnnual: '110+ Offers',
      highestPackage: '₹9.2 LPA',
      logoText: 'Cognizant',
    },
    {
      name: 'Larsen & Toubro (L&T)',
      category: 'Core Engineering & Infra',
      location: 'Mumbai / Chennai',
      rolesHired: ['Graduate Engineer Trainee (GET)'],
      intakeAnnual: '18 Offers',
      highestPackage: '₹7.5 LPA',
      logoText: 'L&T',
    },
    {
      name: 'Deloitte',
      category: 'FinTech & Analytics',
      location: 'Hyderabad / Bengaluru',
      rolesHired: ['Associate Analyst', 'Technology Consultant'],
      intakeAnnual: '22 Offers',
      highestPackage: '₹12.5 LPA',
      logoText: 'Deloitte',
    },
  ];

  const filteredRecruiters = activeCategory === 'All'
    ? fullRecruitersList
    : fullRecruitersList.filter((r) => r.category.includes(activeCategory));

  const submitRecruiterInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !contactEmail) return;
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setRecruiterFormOpen(false);
      setOrgName('');
      setContactPerson('');
      setContactEmail('');
    }, 2800);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FAF9F5] pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EFE1] border-b border-stone-200 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#172554] tracking-tight leading-tight">
            Career Ascendancy &amp; Corporate Placements
          </h1>
          <p className="text-stone-600 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
            Consistently achieving a 94.8% placement record across graduating cohorts through intensive coding bootcamps, soft-skills training, and 120+ global hiring partners.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setRecruiterFormOpen(true)}
              className="px-6 py-3 rounded-xl bg-[#E03D2E] hover:bg-[#c93224] text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
            >
              Invite TEKKZY for Campus Placement
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* Placement Key Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl sm:text-4xl font-metro font-extrabold text-[#172554]">
                    {s.value}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-900 block font-metro">
                  {s.label}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
                  {s.change}
                </span>
              </div>
            );
          })}
        </div>

        {/* T&P 4-Step Career Preparation Framework */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#1b2a60] text-white">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-serif font-bold">The T&amp;P Career Acceleration Model</h3>
            <p className="text-xs text-blue-200 mt-1">Four rigorous stages preparing students from year 1 to final placement day</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                step: '01',
                title: 'Coding & Algorithmic Bootcamps',
                desc: 'Intensive practice in Data Structures, Algorithms in C++, Java, and Python on platforms like LeetCode and HackerRank.',
              },
              {
                step: '02',
                title: 'Full-Stack & Cloud Projects',
                desc: 'Building working production prototypes, microservices, and IoT systems verified by industry mentors.',
              },
              {
                step: '03',
                title: 'Mock Technical & HR Panels',
                desc: 'Simulated interview rounds conducted by senior alumni and corporate leaders from Google, TCS, and Accenture.',
              },
              {
                step: '04',
                title: 'On-Campus Placement Drives',
                desc: 'Direct recruitment drives, pre-placement talks (PPT), and offer negotiations facilitating 94.8% placement conversion.',
              },
            ].map((st, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs">
                <span className="text-2xl font-extrabold text-cyan-300 font-mono block mb-2">{st.step}</span>
                <h4 className="text-sm font-bold text-white mb-1.5">{st.title}</h4>
                <p className="text-xs text-blue-100 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recruiter Companies Directory */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                120+ Global Recruiting Partners
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">Filter by industry domain</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Tech Giants', 'Consulting', 'Core Engineering', 'FinTech'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#1b2a60] text-white shadow-xs'
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredRecruiters.map((r, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-lg font-extrabold text-slate-900">{r.logoText}</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {r.highestPackage}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-stone-700">{r.name}</h4>
                  <p className="text-[11px] text-stone-400 font-mono mt-0.5">{r.location}</p>

                  <div className="mt-3 pt-3 border-t border-stone-100">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Roles Hired:</span>
                    <div className="flex flex-wrap gap-1">
                      {r.rolesHired.map((role, i) => (
                        <span key={i} className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-emerald-700 font-semibold">
                  <span>Intake: {r.intakeAnnual}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alumni Spotlight */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              Alumni Success Stories Worldwide
            </h3>
            <p className="text-xs text-stone-500 mt-1">Meet our distinguished graduates leading global technology teams</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ALUMNI_SPOTLIGHT.map((alum) => (
              <div
                key={alum.id}
                className="p-7 rounded-2xl bg-white border border-stone-200 shadow-2xs flex flex-col justify-between relative"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={alum.image}
                        alt={alum.name}
                        className="w-13 h-13 rounded-full object-cover border-2 border-emerald-400"
                      />
                      <div>
                        <h4 className="text-base font-bold text-slate-900">{alum.name}</h4>
                        <p className="text-xs text-emerald-700 font-semibold">{alum.currentRole}</p>
                        <p className="text-xs text-stone-500 font-medium">{alum.organization}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                      {alum.badge}
                    </span>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed italic">
                    "{alum.quote}"
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 text-[11px] text-stone-400 font-mono flex items-center justify-between">
                  <span>{alum.program}</span>
                  <span>{alum.batch}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corporate Recruiter Invitation Modal */}
      {recruiterFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  T&amp;P Corporate Cell
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-900 mt-1">
                  Invite for Campus Recruitment
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Connect with graduating B.Tech, M.Tech, MCA &amp; MBA talent
                </p>
              </div>
              <button
                onClick={() => setRecruiterFormOpen(false)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {inquirySubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Placement Drive Request Received!</h4>
                <p className="text-xs text-stone-600 max-w-xs mx-auto">
                  Our Head of Placements will reach out to schedule your recruitment slot and pre-placement talk.
                </p>
              </div>
            ) : (
              <form onSubmit={submitRecruiterInquiry} className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Company / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Google, Accenture, Tata Power"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-blue-600 bg-stone-50"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="HR Lead / Talent Acquisition Head"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-blue-600 bg-stone-50"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Corporate Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="recruiter@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-blue-600 bg-stone-50"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setRecruiterFormOpen(false)}
                    className="w-1/3 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 rounded-xl bg-[#E03D2E] hover:bg-[#c93224] text-white text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Invitation</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
