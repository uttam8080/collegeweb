import React, { useRef } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  PhoneCall, 
  AlertTriangle, 
  Clock, 
  Users, 
  Camera, 
  MapPin, 
  CheckCircle2, 
  FileText,
  BadgeAlert,
  ArrowRight
} from 'lucide-react';
import { usePageTextAnimations } from '../utils/animations';

interface StaffSecurityPageProps {
  onNavigate: (tab: string, sectionId?: string) => void;
}

export const StaffSecurityPage: React.FC<StaffSecurityPageProps> = ({ onNavigate }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  usePageTextAnimations(pageRef);

  const securityOfficials = [
    {
      role: 'Administrative Officer & Head of Security',
      name: 'Mr. Biswa Ranjan Nanda',
      phone: '+91 674 274-0551 (Ext 102)',
      email: 'security.admin@tekkzy.ac.in',
      timing: '24x7 On-Call Campus Vigilance'
    },
    {
      role: 'Chief Security Officer (Trace-Out Security)',
      name: 'Capt. S. K. Mohapatra',
      phone: '+91 94370 12345',
      email: 'cso.patrol@tekkzy.ac.in',
      timing: 'Main Gate & Perimeter Command'
    },
    {
      role: 'Hostel Security In-Charge (Boys Hostels)',
      name: 'Mr. P. K. Swain',
      phone: '+91 98610 54321',
      email: 'hostel.security@tekkzy.ac.in',
      timing: 'Hostel Block A, B & C 24x7 Desk'
    },
    {
      role: 'Hostel Security In-Charge (Girls Hostels)',
      name: 'Ms. M. Pattnaik',
      phone: '+91 94380 98765',
      email: 'women.safety@tekkzy.ac.in',
      timing: 'Maa Saraswati Girls Hostel Desk'
    }
  ];

  const protocols = [
    {
      icon: Camera,
      title: '24x7 CCTV Campus Surveillance',
      desc: 'Over 280 high-definition IP cameras cover every institutional building, academic corridor, parking perimeter, laboratory entrances, and campus gates.'
    },
    {
      icon: Users,
      title: 'Trace-Out Security Deployment',
      desc: 'Outsourced to certified premier security personnel. 15 guards during working hours and 12 guards during night hours with roving vehicle patrols.'
    },
    {
      icon: Lock,
      title: 'Biometric & Smart RFID Access',
      desc: 'Hostels, research laboratories, server rooms, and academic blocks require authorized RFID card tap and biometric verification.'
    },
    {
      icon: BadgeAlert,
      title: 'Zero Tolerance Anti-Ragging Cell',
      desc: 'Immediate disciplinary squad monitoring 24x7. CCTV-equipped emergency call points throughout hostels and campus thoroughfares.'
    }
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-[#07130b] text-stone-100 font-sans pb-20 selection:bg-emerald-500/30">
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#0b2917] via-[#081f12] to-[#07130b] border-b border-emerald-900/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-6">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            TAT Campus Vigilance & Safety Division
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-serif max-w-4xl mx-auto leading-tight">
            Campus Staff & Security <span className="text-[#FBBF24]">Operations Portal</span>
          </h1>
          
          <p className="mt-6 text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
            Round-the-clock physical security, Trace-Out security squad patrols, biometric gate access, and emergency vigilance protocols ensuring a secure academic sanctuary for all scholars, faculty, and staff.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 text-white font-semibold text-sm shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Back to Campus Home</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact', 'campus-security-section')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-md transition-all cursor-pointer flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Emergency Security Helpline</span>
            </button>
          </div>
        </div>
      </section>

      {/* Protocols Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
            Institutional Safeguards
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Vigilance & Surveillance Network
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {protocols.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-[#0b1f13] border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-emerald-100/70 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Key Contacts Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-[#0b1f13] border border-emerald-500/20 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/20 pb-6 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Key Campus Security Officials & Contact Roster
              </h3>
              <p className="text-xs text-emerald-200/70 mt-1">
                Direct lines for 24x7 gate security, warden supervision, and emergency patrol.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-lg text-amber-300 text-xs font-mono">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Campus Control Room: +91 674 274-0555</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityOfficials.map((officer, idx) => (
              <div 
                key={idx}
                className="bg-[#07170e] border border-emerald-500/15 rounded-xl p-5 hover:border-emerald-400/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-emerald-400 block uppercase">
                      {officer.role}
                    </span>
                    <h4 className="text-base font-bold text-white mt-0.5">{officer.name}</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active
                  </span>
                </div>
                <div className="mt-4 space-y-1.5 text-xs text-emerald-100/80 font-mono">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                    <span>{officer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{officer.timing}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

