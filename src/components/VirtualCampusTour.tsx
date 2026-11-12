import React, { useState } from 'react';
import { Landmark, Compass, Eye, MapPin, Volume2, Info, ArrowRight, CheckCircle2, Building, BookOpen, Cpu, Coffee } from 'lucide-react';
import { CAMPUS_FACILITIES } from '../data/collegeData';

interface Sector {
  id: string;
  name: string;
  location: string;
  tagline: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  image: string;
}

interface Props {
  onNavigate?: (tab: string) => void;
}

export const VirtualCampusTour: React.FC<Props> = ({ onNavigate }) => {
  const [activeSectorId, setActiveSectorId] = useState<string>('sector-library');

  const sectors: Sector[] = [
    {
      id: 'sector-library',
      name: 'Central Digital Library & Research Concourse',
      location: 'Central Knowledge Precinct, Block A',
      tagline: '100,000+ Print Volumes, IEEE & ScienceDirect Digital Access',
      description: 'The academic heart of TEKKZY College of Technology. Spanning multiple air-conditioned levels with silent study cubicles, RFID automated borrowing, and continuous digital journal access.',
      highlights: [
        'Over 100,000 physical volumes covering core engineering, sciences, computing, and management',
        'Direct institutional subscription to IEEE Xplore, ACM Digital Library, and SpringerLink',
        '24/7 Scholar Reading Room with high-speed fiber internet and charging desks',
      ],
      specs: [
        { label: 'Print Volumes', value: '100,000+' },
        { label: 'E-Journals Access', value: '12,000+' },
        { label: 'Reading Capacity', value: '600+ Scholars' },
      ],
      image: '/assets/images/college_library_hall_1793988204291.jpg',
    },
    {
      id: 'sector-quad',
      name: 'Smart Green Campus & Central Quadrangle',
      location: 'Infocity Core, Bhubaneswar',
      tagline: '10+ Acres Sustainable Green Campus',
      description: 'A serene academic habitat blending sustainable green lawns with high-tech infrastructure, solar-powered grids, rainwater harvesting, and pedestrian promenades.',
      highlights: [
        '100% Wi-Fi enabled outdoor study benches and courtyard gazebos',
        'Solar rooftop generation supplying 40% of daytime campus power',
        'Lush landscaping with mature shade trees and manicured lawns',
      ],
      specs: [
        { label: 'Campus Area', value: '10+ Lush Acres' },
        { label: 'Wi-Fi Speeds', value: '1 Gbps Fiber Mesh' },
        { label: 'Green Rating', value: 'Eco-Certified' },
      ],
      image: '/assets/images/college_campus_quad_1793988224316.jpg',
    },
    {
      id: 'sector-labs',
      name: 'CISCO thingQbator & CoE Technology Labs',
      location: 'Technology Block B, Level 1 & 2',
      tagline: 'Makerspace, IoT Workshop & 3D Prototyping Suites',
      description: 'Established with CISCO, this hub houses SLA 3D printers, Tektronix mixed domain oscilloscopes, autonomous drone cages, and GPU computing nodes.',
      highlights: [
        'Dedicated maker marathons, hackathons and hardware build sprints',
        'Seed startup incubation with patent filing legal assistance',
        'Hands-on training in ROS2, ARM Cortex microcontrollers, and edge AI',
      ],
      specs: [
        { label: 'Patents Filed', value: '24 Filed' },
        { label: 'Prototypes Built', value: '320+ Units' },
        { label: 'Lab Footprint', value: '15,000 Sq.Ft' },
      ],
      image: '/assets/images/college_tech_lab_1793988185936.jpg',
    },
    {
      id: 'sector-amphitheater',
      name: 'Smart Lecture Amphitheaters & Auditorium',
      location: 'Academic Complex, Block C',
      tagline: 'Tiered Seating, 4K Smart Displays & Acoustic Design',
      description: 'Tiered amphitheaters engineered for optimal sightlines, crystal-clear acoustics, dual interactive smart projection, and hybrid broadcast capabilities.',
      highlights: [
        'Curved amphitheater tiered seating for 250+ students with individual power outlets',
        'Integrated hybrid live streaming and 4K automated lecture capture',
        'Central air conditioning with acoustic wall baffles for speech clarity',
      ],
      specs: [
        { label: 'Smart Theaters', value: '14 Amphitheaters' },
        { label: 'Main Auditorium', value: '1,200 Seater' },
        { label: 'Audio Quality', value: 'NC-25 Studio Rated' },
      ],
      image: '/assets/images/college_lecture_hall_1793988205558.jpg',
    },
  ];

  const currentSector = sectors.find((s) => s.id === activeSectorId) || sectors[0];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Landmark className="w-3.5 h-3.5 text-blue-700" />
            <span>Virtual Campus Exploration · Bhubaneswar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#172554] tracking-tight">
            10+ Acres Smart Green Campus
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-4 leading-relaxed">
            Take a virtual tour through our modern academic facilities, central digital library, high-tech engineering labs, and lush campus quadrangle.
          </p>

          {/* Sector Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {sectors.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSectorId(s.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeSectorId === s.id
                    ? 'bg-[#1b2a60] text-white shadow-md'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {s.name.split('&')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Tour Display */}
        <div className="rounded-3xl bg-stone-50 border border-stone-200 overflow-hidden shadow-md grid grid-cols-1 lg:grid-cols-12">
          {/* Photo Preview (7 Cols) */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[380px] overflow-hidden group">
            <img
              src={currentSector.image}
              alt={currentSector.name}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 block">
                {currentSector.location}
              </span>
              <h4 className="text-lg font-bold font-serif">{currentSector.name}</h4>
            </div>
          </div>

          {/* Details (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-semibold text-blue-700 block mb-1">
                {currentSector.tagline}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 leading-snug">
                {currentSector.name}
              </h3>
              <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                {currentSector.description}
              </p>

              {/* Highlights */}
              <div className="mt-5 space-y-2">
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                  Key Infrastructure Highlights
                </span>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {currentSector.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specs */}
              <div className="mt-5 grid grid-cols-3 gap-2 pt-4 border-t border-stone-200">
                {currentSector.specs.map((sp, i) => (
                  <div key={i} className="text-left">
                    <span className="text-[10px] text-stone-400 block font-mono">{sp.label}</span>
                    <span className="text-xs font-bold text-slate-800 block mt-0.5">{sp.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate && onNavigate('campus')}
              className="w-full py-3 rounded-xl bg-[#1b2a60] hover:bg-[#121c42] text-white text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Full Campus Facilities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
