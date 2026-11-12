import React from 'react';
import { Landmark, Compass, Award, BookOpen, CheckCircle2, ShieldCheck, Users, Building2, TrendingUp, Sparkles, GraduationCap } from 'lucide-react';
import { COLLEGE_META, AT_A_GLANCE } from '../data/collegeData';

export const AboutPage: React.FC = () => {
  const milestones = [
    {
      year: '2005',
      title: 'Establishment under The DF Group',
      desc: 'TEKKZY College of Technology (Trident Academy of Technology) was established under The DF Group with AICTE approval in Bhubaneswar to deliver world-class technical education.',
    },
    {
      year: '2009',
      title: 'First Graduating Batch & Stellar Placements',
      desc: 'The inaugural cohort of engineering graduates achieved an unprecedented placement record with leading Indian IT and core engineering companies.',
    },
    {
      year: '2014',
      title: 'National Board of Accreditation (NBA)',
      desc: 'Multiple undergraduate engineering programs received Tier-1 NBA accreditation, validating high curricular rigor and outcome-based education.',
    },
    {
      year: '2017',
      title: 'NAAC Accreditation & Quality Milestones',
      desc: 'Awarded prestigious NAAC accreditation recognizing institutional governance, comprehensive student infrastructure, and scholarly output.',
    },
    {
      year: '2019',
      title: 'DSIR-SIRO Research Recognition',
      desc: 'Formally recognized as a Scientific and Industrial Research Organisation (SIRO) by the Department of Scientific and Industrial Research (DSIR), Ministry of Science & Tech, Govt of India.',
    },
    {
      year: '2021',
      title: 'CISCO thingQbator Innovation Hub Launch',
      desc: 'Inauguration of the flagship CISCO thingQbator IoT and Makerspace laboratory to foster student hardware startups, patent filings, and product prototyping.',
    },
    {
      year: '2026',
      title: 'Eastern India Premier Tech Destination',
      desc: 'Ranked consistently among the top private engineering institutions in Odisha with an active network of over 5,000 alumni across Google, Microsoft, Accenture, and Defence PSUs.',
    },
  ];

  const coreValues = [
    {
      title: 'Holistic Academic Excellence',
      desc: 'Pursuit of the highest standards in teaching, engineering pedagogy, experimental labs, and outcome-based curricula.',
      icon: <Award className="w-5 h-5 text-blue-700" />,
    },
    {
      title: 'Ethical Integrity & Governance',
      desc: 'Transparent administrative processes, merit-driven admissions under BPUT, and zero-tolerance ragging-free campus policies.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-700" />,
    },
    {
      title: 'Out-of-the-Box Innovation',
      desc: 'Fostering aggressive positive thinking, insatiable curiosity, and hands-on capacity of execution through thingQbator and research labs.',
      icon: <Sparkles className="w-5 h-5 text-amber-700" />,
    },
    {
      title: 'Student-Centric Empowerment',
      desc: 'Placing students at the heart of institutional decisions through 24/7 library access, mentorship, and intensive placement training.',
      icon: <Users className="w-5 h-5 text-cyan-700" />,
    },
    {
      title: 'Social & Sustainable Responsibility',
      desc: 'Contributing to national development and environmental sustainability through solar-powered infrastructure and Unnat Bharat Abhiyan.',
      icon: <Building2 className="w-5 h-5 text-rose-700" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-800">
            About {COLLEGE_META.name}
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#172554] tracking-tight">
            Two Decades of Engineering Excellence &amp; Innovation
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed pt-2">
            Established in 2005 under The DF Group, TEKKZY College of Technology (TAT), Bhubaneswar is a premier AICTE-approved, BPUT-affiliated, and NAAC/NBA accredited institution shaping future technology leaders.
          </p>
        </div>

        {/* Vision & Mission 2-Column Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5 text-blue-700" />
            </div>
            <h2 className="text-xl font-bold font-serif text-slate-900">
              Our Vision
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed italic">
              "To foster holistic excellence in the new generation of students, instilling in them the power of aggressive positive thinking, insatiable desire for information and knowledge, a penchant for out-of-the-box ideation, and the capacity of execution."
            </p>
            <p className="text-xs text-stone-500 pt-2 border-t border-stone-100">
              Validated by the Governing Body and Academic Senate.
            </p>
          </div>

          {/* Mission Details */}
          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <Award className="w-5 h-5 text-emerald-700" />
            </div>
            <h2 className="text-xl font-bold font-serif text-slate-900">
              Our Mission
            </h2>
            <ul className="space-y-2.5 text-xs text-stone-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>To provide students with state-of-the-art laboratory infrastructure, industry-guided curricula, and mentorship from renowned academicians.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>To contribute to society with honesty and integrity through innovative research in multidisciplinary areas of evolving technologies.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>To maintain a placement-driven culture connecting students with leading global software giants, consulting firms, and public sector undertakings.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* At A Glance 4-Col Grid */}
        <div className="p-8 rounded-3xl bg-[#1b2a60] text-white">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-serif font-bold">Institution At A Glance</h3>
            <p className="text-xs text-blue-200 mt-1">Key institutional metrics defining our impact</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {AT_A_GLANCE.slice(0, 4).map((s, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
                <span className="text-3xl sm:text-4xl font-extrabold text-cyan-300 block font-metro">
                  {s.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white mt-1 block">
                  {s.label}
                </span>
                <span className="text-[11px] text-stone-300 mt-1 block">
                  {s.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional Core Values */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              Core Principles &amp; Institutional Values
            </h3>
            <p className="text-xs text-stone-500 mt-1">The foundational pillars that guide our teaching and governance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
                  {val.icon}
                </div>
                <h4 className="text-base font-bold text-slate-900">{val.title}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Historical Timeline */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              Two Decades of Institutional Milestones
            </h3>
            <p className="text-xs text-stone-500 mt-1">Tracing our growth from inception in 2005 to an acclaimed technical hub</p>
          </div>

          <div className="space-y-4">
            {milestones.map((m, idx) => (
              <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="sm:w-28 shrink-0">
                  <span className="text-lg font-mono font-bold text-blue-900 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 inline-block">
                    {m.year}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-bold text-slate-900">{m.title}</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accreditations & Statutory Recognitions */}
        <div className="p-8 rounded-3xl bg-stone-100 border border-stone-200 text-center space-y-6">
          <h3 className="text-xl font-serif font-bold text-slate-900">
            Accreditations, Affiliations &amp; Statutory Approvals
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              'AICTE Approved',
              'BPUT Affiliated (State Tech University)',
              'NAAC Accredited Institution',
              'NBA Tier-1 Accredited B.Tech Programs',
              'DSIR-SIRO Recognized Research Org',
              'CISCO Certified thingQbator Center',
            ].map((acc, i) => (
              <span key={i} className="px-4 py-2 rounded-xl bg-white text-blue-900 text-xs font-bold border border-stone-300 shadow-2xs">
                {acc}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
