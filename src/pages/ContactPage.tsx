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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-16">
        {/* Big 3 Joined Sharp Contact Information Boxes */}
        <div className="w-full bg-white border-2 border-stone-300 shadow-md rounded-none grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x-2 divide-stone-200">
          
          {/* Box 1: Campus Address */}
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between rounded-none hover:bg-stone-50/70 transition-colors">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-center shrink-0 rounded-none shadow-2xs">
                <MapPin className="w-7 h-7 text-blue-700" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-blue-900 block mb-1">
                  CAMPUS ADDRESS
                </span>
                <p className="text-sm sm:text-base text-slate-800 font-semibold leading-relaxed mt-1">
                  {COLLEGE_META.location}
                </p>
                <p className="text-xs font-mono font-medium text-blue-700 mt-2.5 bg-blue-50/80 px-2.5 py-1 border border-blue-200/60 inline-block rounded-none">
                  Infocity Tech Corridor · Odisha 751024
                </p>
              </div>
            </div>
          </div>

          {/* Box 2: Admissions Helplines */}
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between rounded-none hover:bg-stone-50/70 transition-colors">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-center shrink-0 rounded-none shadow-2xs">
                <Phone className="w-7 h-7 text-emerald-700" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-emerald-900 block mb-1">
                  ADMISSIONS HELPLINES
                </span>
                <p className="text-sm sm:text-base font-mono font-bold text-slate-900 mt-1">
                  {COLLEGE_META.phone} <span className="text-stone-400 font-normal">/</span> 274-0551
                </p>
                <p className="text-xs font-mono text-stone-600 mt-1">
                  Toll Free: 1800-345-7788
                </p>
                <p className="text-xs font-semibold text-emerald-800 mt-2.5 bg-emerald-50/80 px-2.5 py-1 border border-emerald-200/60 inline-block rounded-none">
                  Mon – Sat: 9:30 AM – 5:30 PM
                </p>
              </div>
            </div>
          </div>

          {/* Box 3: Official Inquiries */}
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between rounded-none hover:bg-stone-50/70 transition-colors">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-center shrink-0 rounded-none shadow-2xs">
                <Mail className="w-7 h-7 text-amber-700" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-amber-900 block mb-1">
                  OFFICIAL INQUIRIES
                </span>
                <p className="text-sm sm:text-base font-mono font-bold text-slate-900 mt-1 hover:text-amber-700 transition-colors">
                  {COLLEGE_META.email}
                </p>
                <p className="text-xs font-mono text-stone-600 mt-1 hover:text-amber-700 transition-colors">
                  {COLLEGE_META.admissionsEmail}
                </p>
                <p className="text-xs font-medium text-amber-900 mt-2.5 bg-amber-50/80 px-2.5 py-1 border border-amber-200/60 inline-block rounded-none">
                  Guaranteed reply within 24 hours
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 2-Col Layout: Inquiry Form (Left) & Departmental Directory (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm">
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-1">
              Submit an Official Inquiry
            </h3>
            <p className="text-xs text-stone-500 mb-6">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-blue-600 bg-stone-50"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-blue-600 bg-stone-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      Mobile Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-blue-600 bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      Department / Query Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-blue-600 bg-stone-50"
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
                    placeholder="e.g. Admission in B.Tech CSE (AI & ML) for Session 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-blue-600 bg-stone-50"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-blue-600 bg-stone-50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#E03D2E] hover:bg-[#c93224] text-white font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry to Admissions Desk</span>
                </button>
              </form>
            )}
          </div>

          {/* Departmental Directory List (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-serif font-bold text-slate-900">
              Departmental Offices
            </h3>

            {offices.map((off, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2 text-xs"
              >
                <h4 className="font-bold text-slate-900 text-sm">{off.department}</h4>
                <p className="text-blue-800 font-semibold text-[11px]">{off.inCharge} ({off.designation})</p>
                
                <div className="pt-2 border-t border-stone-100 space-y-1 text-stone-600">
                  <p className="flex items-center gap-2 font-mono text-[11px]">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    <span>{off.email}</span>
                  </p>
                  <p className="flex items-center gap-2 font-mono text-[11px]">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>{off.phone}</span>
                  </p>
                  <p className="flex items-center gap-2 text-[11px] text-stone-400">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{off.location}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reaching the Campus Guide */}
        <div className="p-8 rounded-3xl bg-stone-100 border border-stone-200">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h3 className="text-xl font-serif font-bold text-slate-900">
              Reaching TEKKZY College of Technology
            </h3>
            <p className="text-xs text-stone-500 mt-1">Located inside the prime Infocity IT and academic hub in Bhubaneswar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-700">
            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Plane className="w-4 h-4 text-blue-700" />
                <span>From Biju Patnaik Airport (BBI)</span>
              </div>
              <p className="leading-relaxed">
                Approx. 14 km (30 minutes drive) via Jayadev Vihar - Nandankanan road directly into Infocity Chandaka Estate.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Train className="w-4 h-4 text-emerald-700" />
                <span>From Bhubaneswar Railway Station (BBS)</span>
              </div>
              <p className="leading-relaxed">
                Approx. 12 km (25 minutes drive). MoBus routes 10, 11, and 23 operate directly from Master Canteen to Infocity.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Car className="w-4 h-4 text-amber-700" />
                <span>From Baramunda Inter-State Bus Stand</span>
              </div>
              <p className="leading-relaxed">
                Approx. 10 km via NH-16 and Patia square into Chandaka Industrial Estate. Ample visitor parking available at Gate 1.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
