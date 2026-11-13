import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building, 
  Compass, 
  FileText, 
  ShieldCheck, 
  HelpCircle,
  ExternalLink,
  MessageSquare,
  Train,
  Plane,
  Car
} from 'lucide-react';
import { COLLEGE_META } from '../data/collegeData';

interface OfficeContact {
  department: string;
  inCharge: string;
  designation: string;
  email: string;
  phone: string;
  officeHours: string;
  location: string;
}

export const ContactPage: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Admissions & Degree Enrollment');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const offices: OfficeContact[] = [
    {
      department: 'Office of Academic Admissions & Counseling',
      inCharge: 'Prof. S. R. Chidambaram',
      designation: 'Head of Admissions Secretariat',
      email: COLLEGE_META.admissionsEmail,
      phone: '+91 674 274-0551 / 274-0555',
      officeHours: 'Mon – Sat: 09:30 AM – 05:30 PM IST',
      location: 'Administrative Complex, Ground Floor, Academic Block A',
    },
    {
      department: 'Directorate of Training & Placement (T&P)',
      inCharge: 'Er. Sandip Patnaik',
      designation: 'Head, Corporate Relations & Placements',
      email: COLLEGE_META.placementsEmail,
      phone: '+91 674 274-0552',
      officeHours: 'Mon – Fri: 09:00 AM – 06:00 PM IST',
      location: 'Corporate Resource Center, Block B, Level 2',
    },
    {
      department: 'Controller of Examinations (CoE)',
      inCharge: 'Dr. Mukund Shastri, Ph.D',
      designation: 'Controller of Examinations',
      email: 'coe@tekkzy.com',
      phone: '+91 674 274-0558',
      officeHours: 'Mon – Fri: 10:00 AM – 04:30 PM IST',
      location: 'Examination Wing, Takshashila Complex',
    },
    {
      department: 'CISCO thingQbator & R&D Center of Excellence',
      inCharge: 'Dr. Debasis Panda, Ph.D',
      designation: 'Director, CoE & Innovation Hub',
      email: 'research@tekkzy.com',
      phone: '+91 674 274-0559',
      officeHours: 'Mon – Sat: 09:30 AM – 07:00 PM IST',
      location: 'thingQbator Technology Block C',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] pb-24">
      {/* Large Red Backdrop Div in the backside touching the navbar */}
      <div className="relative w-full bg-[#E03D2E] pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-red-700/40 shadow-inner overflow-hidden">
        {/* Subtle geometric grid texture for modern depth */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* 3 Joined Sharp Boxes with Left & Right side margins */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="w-full bg-white border-2 border-stone-900/10 shadow-2xl rounded-none grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x-2 divide-stone-200">
            
            {/* Box 1: Campus Address */}
            <div className="group p-8 sm:p-10 lg:p-12 rounded-none bg-white hover:bg-stone-50/90 transition-all duration-300 relative overflow-hidden flex flex-col justify-center min-h-[160px] sm:min-h-[190px]">
              {/* Animated Red Top Indicator Bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#E03D2E] -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-stone-500 group-hover:text-[#E03D2E] transition-colors block mb-2">
                CAMPUS ADDRESS
              </span>
              <p className="text-base sm:text-lg text-slate-900 font-bold leading-relaxed tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                {COLLEGE_META.location}
              </p>
            </div>

            {/* Box 2: Admissions Helplines */}
            <div className="group p-8 sm:p-10 lg:p-12 rounded-none bg-white hover:bg-stone-50/90 transition-all duration-300 relative overflow-hidden flex flex-col justify-center min-h-[160px] sm:min-h-[190px]">
              {/* Animated Red Top Indicator Bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#E03D2E] -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-stone-500 group-hover:text-[#E03D2E] transition-colors block mb-2">
                ADMISSIONS HELPLINES
              </span>
              <p className="text-base sm:text-lg font-mono font-bold text-slate-900 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                <a href="tel:+916742740555" className="hover:text-[#E03D2E] transition-colors">
                  {COLLEGE_META.phone}
                </a>
                <span className="text-stone-300 mx-2">/</span>
                <a href="tel:+916742740551" className="hover:text-[#E03D2E] transition-colors">
                  274-0551
                </a>
              </p>
            </div>

            {/* Box 3: Official Inquiries */}
            <div className="group p-8 sm:p-10 lg:p-12 rounded-none bg-white hover:bg-stone-50/90 transition-all duration-300 relative overflow-hidden flex flex-col justify-center min-h-[160px] sm:min-h-[190px]">
              {/* Animated Red Top Indicator Bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#E03D2E] -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-stone-500 group-hover:text-[#E03D2E] transition-colors block mb-2">
                OFFICIAL INQUIRIES
              </span>
              <div className="space-y-1 group-hover:translate-x-1 transition-transform duration-300">
                <p className="text-base sm:text-lg font-mono font-bold text-slate-900">
                  <a href={`mailto:${COLLEGE_META.email}`} className="hover:text-[#E03D2E] transition-colors">
                    {COLLEGE_META.email}
                  </a>
                </p>
                <p className="text-sm font-mono text-stone-600">
                  <a href={`mailto:${COLLEGE_META.admissionsEmail}`} className="hover:text-[#E03D2E] transition-colors">
                    {COLLEGE_META.admissionsEmail}
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 space-y-16">

        {/* 2-Col Layout: Left Side (Scrolls past) & Right Side (Form kept constant / sticky) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* =========================================================================
              LEFT SIDE CONTENT: Moves smoothly while scrolling
              ========================================================================= */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Departmental Directory Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#1b2a60] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                <Building className="w-3.5 h-3.5 text-[#1b2a60]" />
                <span>Administrative &amp; Academic Secretariats</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                Departmental Directory
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Direct contacts for admissions, academic governance, student welfare, examinations, and corporate relations.
              </p>
            </div>

            {/* Departmental Offices Cards */}
            <div className="space-y-4">
              {offices.map((off, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow space-y-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{off.department}</h4>
                      <p className="text-blue-900 font-semibold text-xs mt-0.5">
                        {off.inCharge} · <span className="text-stone-500 font-normal">{off.designation}</span>
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-stone-100 text-stone-600">
                      {off.officeHours}
                    </span>
                  </div>
                  
                  <div className="pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                    <p className="flex items-center gap-2 font-mono text-xs">
                      <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                      <a href={`mailto:${off.email}`} className="hover:text-[#E03D2E] transition-colors">{off.email}</a>
                    </p>
                    <p className="flex items-center gap-2 font-mono text-xs">
                      <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                      <a href={`tel:${off.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#E03D2E] transition-colors">{off.phone}</a>
                    </p>
                    <p className="sm:col-span-2 flex items-center gap-2 text-xs text-stone-500">
                      <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                      <span>{off.location}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reaching TEKKZY College of Technology Transit Guide */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-2xs space-y-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-900 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                  <Compass className="w-3.5 h-3.5 text-amber-700" />
                  <span>Transit &amp; Campus Access</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Reaching TEKKZY College of Technology
                </h3>
                <p className="text-xs text-stone-500 mt-1">Located inside the prime Infocity IT and academic corridor in Bhubaneswar</p>
              </div>

              <div className="space-y-3.5 text-xs text-stone-700">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Plane className="w-4 h-4 text-blue-700" />
                    <span>From Biju Patnaik International Airport (BBI)</span>
                  </div>
                  <p className="leading-relaxed text-stone-600">
                    Approx. 14 km (30 minutes drive) via Jayadev Vihar - Nandankanan road directly into Infocity Chandaka Estate. Pre-paid taxis and app-based cabs (Ola / Uber) are readily available.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Train className="w-4 h-4 text-emerald-700" />
                    <span>From Bhubaneswar Railway Station (BBS)</span>
                  </div>
                  <p className="leading-relaxed text-stone-600">
                    Approx. 12 km (25 minutes drive). MoBus routes 10, 11, and 23 operate directly from Master Canteen terminal to Infocity square every 10 minutes.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Car className="w-4 h-4 text-amber-700" />
                    <span>From Baramunda Inter-State Bus Terminal (ISBT)</span>
                  </div>
                  <p className="leading-relaxed text-stone-600">
                    Approx. 10 km via NH-16 and Patia square into Chandaka Industrial Estate. Dedicated visitor parking passes are issued upon entry at Gate 1.
                  </p>
                </div>
              </div>
            </div>

            {/* Campus Security & Visiting Protocol */}
            <div className="p-6 rounded-2xl bg-[#0E1726] text-white space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#22D3EE] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Security Control Room &amp; Campus Protocol</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                All campus visitors are required to carry a government-issued photo identity card (Aadhaar, Voter ID, Driving License, or Passport) for physical visitor entry passes at Gate 1 &amp; Gate 2 reception desks.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1.5 text-[11px] font-mono text-cyan-300">
                <span>Security Control: +91 674 274-0550</span>
                <span>•</span>
                <span>Emergency Desk: Ext. 100 / 108</span>
              </div>
            </div>

          </div>

          {/* =========================================================================
              RIGHT SIDE: Inquiry Form KEPT CONSTANT (Sticky on scroll)
              ========================================================================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xl shadow-stone-900/5">
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-1">
                Submit an Official Inquiry
              </h3>
              <p className="text-xs text-stone-500 mb-6 leading-relaxed">
                Complete the form below to connect directly with the admissions counselors or departmental heads.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-slate-900">Inquiry Transmitted Successfully</h4>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto">
                    Thank you, <strong className="text-slate-800">{name}</strong>. Your ticket has been logged and assigned to the relevant department.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ananya Das"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-blue-600 bg-stone-50/70 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-blue-600 bg-stone-50/70 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Mobile Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-blue-600 bg-stone-50/70 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Department / Query Category *
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-blue-600 bg-stone-50/70 focus:bg-white transition-colors"
                      >
                        <option>Admissions &amp; Degree Enrollment</option>
                        <option>Training &amp; Placement Cell (Corporate)</option>
                        <option>Examinations &amp; Transcript Verification</option>
                        <option>CISCO thingQbator &amp; Research Labs</option>
                        <option>Alumni Affairs &amp; Transcripts</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      Subject / Program Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Admission in B.Tech CSE (AI &amp; ML) for Session 2026"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-blue-600 bg-stone-50/70 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      Your Message / Specific Question *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please specify your query or campus visit request..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-blue-600 bg-stone-50/70 focus:bg-white transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#E03D2E] hover:bg-[#c93224] active:scale-98 text-white font-bold text-xs shadow-md shadow-red-950/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Inquiry to Admissions Desk</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
