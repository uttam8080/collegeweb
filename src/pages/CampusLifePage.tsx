import React, { useState } from 'react';
import { Landmark, Compass, Award, Users, BookOpen, Music, Sparkles, MapPin, Calendar, CheckCircle2, ChevronRight, Coffee, Trophy, ShieldCheck } from 'lucide-react';
import { CAMPUS_FACILITIES } from '../data/collegeData';

export const CampusLifePage: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const [activeFacility, setActiveFacility] = useState<string>(CAMPUS_FACILITIES[0].id);

  const clubs = [
    {
      name: 'Trident Robotics & Drone Club (TRDC)',
      category: 'Autonomous Systems & Hardware',
      desc: 'Building autonomous UAV quadcopters, maze-solving rovers, robot arms, and competing in national maker marathons.',
      members: 320,
    },
    {
      name: 'CodeNation & AI Developer Circle',
      category: 'Competitive Programming & AI',
      desc: 'Weekly algorithm workshops, competitive coding sprints on LeetCode/CodeChef, and full-stack hackathon project teams.',
      members: 450,
    },
    {
      name: 'E-Cell & Startup Incubation Forum',
      category: 'Entrepreneurship & Ventures',
      desc: 'Transforming student inventions into registered enterprises through seed pitching, mentor roundtables, and patent filing.',
      members: 280,
    },
    {
      name: 'Srijan Cultural & Performing Arts Society',
      category: 'Music, Dance & Drama',
      desc: 'Annual cultural fests, acoustic band performances, street plays, and classical dance representations.',
      members: 220,
    },
    {
      name: 'Olympus Athletics & Sports Council',
      category: 'Sports & Wellness',
      desc: 'Organizing inter-college cricket tournaments, basketball leagues, badminton championships, and yoga fitness sessions.',
      members: 380,
    },
    {
      name: 'Unnat Bharat & Green Eco Council',
      category: 'Social Responsibility & Ecology',
      desc: 'Community development drives, zero-plastic initiatives, tree planting on campus, and local technical empowerment.',
      members: 190,
    },
  ];

  const currentFac = CAMPUS_FACILITIES.find((f) => f.id === activeFacility) || CAMPUS_FACILITIES[0];

  return (
    <div className="min-h-screen bg-[#FAF9F5] pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EFE1] border-b border-stone-200 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-900 text-xs font-semibold uppercase tracking-wider mb-4">
            <Landmark className="w-4 h-4 text-blue-700" />
            <span>Campus Infrastructure &amp; Student Life · Bhubaneswar</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#172554] tracking-tight leading-tight">
            Vibrant Campus Ecosystem &amp; Community
          </h1>
          <p className="text-stone-600 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
            Experience life on our 10+ acres eco-friendly smart campus in Bhubaneswar, featuring 24/7 central digital library, high-tech labs, sports arenas, residential hostels, and active student clubs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* Interactive Campus Facilities Showcase */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              World-Class Campus Infrastructure
            </h3>
            <p className="text-xs text-stone-500 mt-1">Select a facility to view detailed amenities and specifications</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {CAMPUS_FACILITIES.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFacility(f.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeFacility === f.id
                    ? 'bg-[#1b2a60] text-white shadow-md'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {f.title}
              </button>
            ))}
          </div>

          {/* Active Facility Card */}
          <div className="rounded-3xl bg-white border border-stone-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[360px]">
              <img
                src={currentFac.image}
                alt={currentFac.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-mono inline-block mb-1">
                  Featured Facility
                </span>
                <h4 className="text-xl font-bold font-serif">{currentFac.title}</h4>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-semibold text-blue-700 block mb-1">
                  {currentFac.tagline}
                </span>
                <h3 className="text-2xl font-bold font-serif text-slate-900">
                  {currentFac.title}
                </h3>
                <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                  {currentFac.desc}
                </p>

                <div className="mt-5 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                    Key Features &amp; Provisions
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {currentFac.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500 font-mono">10+ Acres Campus · Infocity</span>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-4 py-2 bg-[#1b2a60] hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Schedule Campus Visit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Student Clubs & Societies Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              Student Technical Clubs &amp; Societies
            </h3>
            <p className="text-xs text-stone-500 mt-1">Over 20+ active student-driven organizations shaping talent outside classrooms</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((c, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 inline-block mb-3">
                    {c.category}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">{c.name}</h4>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">{c.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-mono text-stone-500">
                  <span>{c.members}+ Active Members</span>
                  <span className="text-blue-700 font-semibold cursor-pointer">Join Club →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Residential Hostels & Life at Bhubaneswar */}
        <div className="p-8 sm:p-10 rounded-3xl bg-stone-100 border border-stone-200 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
              Residential Life &amp; Hostels
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Safe, Modern &amp; Comfortable On-Campus Living
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Separate residential hostels for boys and girls provide round-the-clock security, continuous power backup, high-speed Wi-Fi, hygienic dining facilities, common recreational rooms with indoor games, and in-house medical support.
            </p>
            <ul className="space-y-2 text-xs text-stone-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>24/7 CCTV surveillance, biometric access &amp; dedicated wardens</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Nutritious multi-cuisine mess serving North, South &amp; Odia delicacies</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>On-campus health dispensary with attending physicians and ambulance</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-md h-72 lg:h-80">
            <img
              src="/assets/images/college_campus_hero_1793988186342.jpg"
              alt="Campus hostels"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
