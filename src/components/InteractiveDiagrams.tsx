import React, { useState } from 'react';
import { DiagramData } from '../types';
import { Play, Pause, RotateCw, Info, Layers, Compass } from 'lucide-react';

interface Props {
  diagram: DiagramData;
}

export const InteractiveDiagram: React.FC<Props> = ({ diagram }) => {
  if (diagram.type === 'astronomy-sphere') {
    return <AryabhataSphereModel title={diagram.title} caption={diagram.caption} />;
  }

  if (diagram.type === 'nine-rasas') {
    return <NineRasasWheel title={diagram.title} caption={diagram.caption} />;
  }

  if (diagram.type === 'temple-architecture') {
    return <TempleArchitectureDiagram title={diagram.title} caption={diagram.caption} />;
  }

  if (diagram.type === 'indus-drainage') {
    return <IndusDrainageDiagram title={diagram.title} caption={diagram.caption} />;
  }

  return null;
};

// 1. Aryabhata Celestial Sphere & Diurnal Rotation Explorer
const AryabhataSphereModel: React.FC<{ title: string; caption: string }> = ({ title, caption }) => {
  const [rotationAngle, setRotationAngle] = useState(45);
  const [isPlaying, setIsPlaying] = useState(false);
  const [observerView, setObserverView] = useState<'earth' | 'space'>('earth');

  React.useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setRotationAngle((prev) => (prev + 1.5) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="my-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4 mb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">Interactive Scientific Visualizer</span>
          <h3 className="text-lg font-bold text-slate-900 mt-0.5">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-stone-100 p-1 rounded-lg text-xs font-medium text-slate-700">
            <button
              onClick={() => setObserverView('earth')}
              className={`px-3 py-1.5 rounded-md transition-colors ${observerView === 'earth' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Earth Observer
            </button>
            <button
              onClick={() => setObserverView('space')}
              className={`px-3 py-1.5 rounded-md transition-colors ${observerView === 'space' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Celestial Sphere
            </button>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF9933] text-white text-xs font-semibold rounded-lg hover:bg-[#ea8422] transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? 'Pause' : 'Rotate Earth'}
          </button>
        </div>
      </div>

      {/* Visual Canvas */}
      <div className="relative h-72 sm:h-80 w-full rounded-xl bg-[#0d1527] flex items-center justify-center overflow-hidden border border-slate-800">
        {/* Background stars */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Stationary Constellation Ring */}
        <div className="absolute w-60 h-60 sm:w-68 sm:h-68 rounded-full border border-dashed border-amber-400/30 flex items-center justify-center pointer-events-none">
          <span className="absolute top-2 text-[10px] font-mono text-amber-300 tracking-widest uppercase">Mesha (Aries)</span>
          <span className="absolute right-2 text-[10px] font-mono text-amber-300 tracking-widest uppercase">Karka (Cancer)</span>
          <span className="absolute bottom-2 text-[10px] font-mono text-amber-300 tracking-widest uppercase">Tula (Libra)</span>
          <span className="absolute left-2 text-[10px] font-mono text-amber-300 tracking-widest uppercase">Makara (Capricorn)</span>
        </div>

        {/* Central Earth Globe */}
        <div
          className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full border-2 border-emerald-400/60 shadow-2xl flex items-center justify-center transition-transform duration-75"
          style={{
            transform: `rotate(${rotationAngle}deg)`,
            background: 'radial-gradient(circle at 35% 35%, #059669 0%, #064e3b 70%, #022c22 100%)'
          }}
        >
          {/* North Axis Marker */}
          <div className="absolute -top-3 w-1 h-6 bg-amber-400 rounded-full" />
          <div className="absolute -bottom-3 w-1 h-6 bg-amber-400 rounded-full" />

          {/* Equator & Meridian Lines */}
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-white/20 -translate-y-1/2" />
          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white/20 -translate-x-1/2" />

          {/* Observer Pin */}
          <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-[#FF9933] border-2 border-white shadow-md flex items-center justify-center">
            <span className="sr-only">Observer</span>
          </div>

          <span className="text-[11px] font-semibold text-white/90 drop-shadow tracking-wide" style={{ transform: `rotate(${-rotationAngle}deg)` }}>
            Bhu-Gola
          </span>
        </div>

        {/* Rotation Directional Arrow */}
        <div className="absolute bottom-4 left-6 flex items-center gap-2 text-xs text-amber-300 bg-slate-900/80 px-3 py-1.5 rounded-md border border-slate-700">
          <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Axial Rotation: West → East ({Math.round(rotationAngle)}°)</span>
        </div>

        {/* Aryabhata Boat Analogy Box */}
        <div className="absolute top-4 right-4 hidden sm:block max-w-[210px] text-[11px] bg-slate-900/90 text-stone-300 p-2.5 rounded-lg border border-slate-700">
          <span className="text-amber-400 font-semibold block mb-0.5">Aryabhata’s Boat Principle:</span>
          "Moving forward in a boat, riverbanks seem to move backward. Likewise, Earth’s rotation makes stars seem to drift west."
        </div>
      </div>

      {/* Controls & Math Readout */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">Manual Rotation Dial</label>
          <input
            type="range"
            min="0"
            max="360"
            value={rotationAngle}
            onChange={(e) => setRotationAngle(Number(e.target.value))}
            className="w-full accent-[#FF9933] cursor-pointer"
          />
          <span className="text-[11px] text-stone-500 font-mono">Current Longitude Offset: {rotationAngle}°</span>
        </div>

        <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
          <span className="text-xs font-semibold text-slate-800 block">Aryabhata Sidereal Year</span>
          <span className="text-sm font-bold font-mono text-emerald-800">365d 6h 12m 30s</span>
          <span className="text-[11px] text-stone-500 block">Modern: 365d 6h 9m 10s (Δ 3m 20s)</span>
        </div>

        <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
          <span className="text-xs font-semibold text-slate-800 block">Aryabhata’s Pi (π) Ratio</span>
          <span className="text-sm font-bold font-mono text-amber-800">62,832 / 20,000 = 3.1416</span>
          <span className="text-[11px] text-stone-500 block">Identified as "asanna" (approximate)</span>
        </div>
      </div>

      <p className="mt-3 text-xs text-stone-500 italic">{caption}</p>
    </div>
  );
};

// 2. The Nine Rasas (Navarasa) Emotion & Aesthetics Matrix
const NineRasasWheel: React.FC<{ title: string; caption: string }> = ({ title, caption }) => {
  const [selectedRasaIndex, setSelectedRasaIndex] = useState(0);

  const rasas = [
    {
      name: 'Shringara',
      sanskrit: 'शृङ्गार',
      meaning: 'Love, Beauty & Devotion',
      color: '#10b981',
      colorName: 'Shyama (Dark Green)',
      deity: 'Vishnu',
      bhava: 'Rati (Delight/Love)',
      description: 'The queen of Rasas. Evoked through harmonious beauty, union of lovers, music, and divine aesthetic adoration.'
    },
    {
      name: 'Hasya',
      sanskrit: 'हास्य',
      meaning: 'Comic Joy, Wit & Mirth',
      color: '#f59e0b',
      colorName: 'Shveta (White)',
      deity: 'Pramatha',
      bhava: 'Hasa (Laughter)',
      description: 'Arises from playful incongruity, benevolent wit, eccentric behavior, and infectious lighthearted joy.'
    },
    {
      name: 'Karuna',
      sanskrit: 'करुणा',
      meaning: 'Compassion & Pathos',
      color: '#6b7280',
      colorName: 'Kapota (Dove Gray)',
      deity: 'Yama',
      bhava: 'Shoka (Grief)',
      description: 'Evoked by sorrow, parting, and profound tenderness for the suffering of all sentient beings.'
    },
    {
      name: 'Raudra',
      sanskrit: 'रौद्र',
      meaning: 'Righteous Fury & Intensity',
      color: '#ef4444',
      colorName: 'Rakta (Fiery Red)',
      deity: 'Rudra',
      bhava: 'Krodha (Anger)',
      description: 'Evoked by injustice, moral betrayal, and thunderous defensive energy against tyranny.'
    },
    {
      name: 'Vira',
      sanskrit: 'वीर',
      meaning: 'Heroism, Valor & Nobility',
      color: '#f97316',
      colorName: 'Gaura (Radiant Gold)',
      deity: 'Indra',
      bhava: 'Utsaha (Dynamic Energy)',
      description: 'The noble courage of the warrior, selfless charity (Dana-vira), and perseverance in the quest for truth.'
    },
    {
      name: 'Bhayanaka',
      sanskrit: 'भयानक',
      meaning: 'Awe, Dread & Vulnerability',
      color: '#1f2937',
      colorName: 'Krishna (Midnight Black)',
      deity: 'Kala',
      bhava: 'Bhaya (Fear)',
      description: 'Evoked by darkness, mortal finitude, impending danger, and cosmic solitude.'
    },
    {
      name: 'Bibhatsa',
      sanskrit: 'बीभत्स',
      meaning: 'Aversion, Disgust & Renunciation',
      color: '#7c3aed',
      colorName: 'Nila (Blue-Violet)',
      deity: 'Mahakala',
      bhava: 'Jugupsa (Aversion)',
      description: 'The visceral reaction to decay and moral rot that acts as an impulse toward spiritual purification.'
    },
    {
      name: 'Adbhuta',
      sanskrit: 'अद्भुत',
      meaning: 'Wonder, Mystery & Sublime Awe',
      color: '#eab308',
      colorName: 'Pita (Golden Yellow)',
      deity: 'Brahma',
      bhava: 'Vismaya (Astonishment)',
      description: 'The child-like gasp upon witnessing vast starfields, monumental architecture, and unexpected wisdom.'
    },
    {
      name: 'Shanta',
      sanskrit: 'शान्त',
      meaning: 'Transcendental Peace & Stillness',
      color: '#065f46',
      colorName: 'Kunda (Jasmine White)',
      deity: 'Narayana / Shiva',
      bhava: 'Sama (Equanimity)',
      description: 'The baseline silence into which all other 8 emotions resolve—the tranquil mind free from longing.'
    }
  ];

  const active = rasas[selectedRasaIndex];

  return (
    <div className="my-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="border-b border-stone-100 pb-4 mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">Aesthetic Theory Interactive Explorer</span>
        <h3 className="text-lg font-bold text-slate-900 mt-0.5">{title}</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Rasa Selector Grid */}
        <div className="lg:col-span-7 grid grid-cols-3 gap-2 sm:gap-2.5">
          {rasas.map((rasa, idx) => {
            const isSelected = selectedRasaIndex === idx;
            return (
              <button
                key={rasa.name}
                onClick={() => setSelectedRasaIndex(idx)}
                className={`p-3 text-left rounded-xl transition-all border ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/60 shadow-xs ring-2 ring-amber-400/20'
                    : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: rasa.color }} />
                  <span className="text-xs font-bold text-slate-900 truncate">{rasa.name}</span>
                </div>
                <span className="text-[11px] text-stone-500 block truncate">{rasa.sanskrit}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Rasa Display Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 to-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div>
              <span className="text-2xl font-serif text-amber-400">{active.sanskrit}</span>
              <h4 className="text-lg font-bold tracking-tight text-white">{active.name} Rasa</h4>
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-white/20 shadow-inner" style={{ backgroundColor: active.color }} />
          </div>

          <p className="text-xs text-amber-200/90 font-medium mb-3 italic">{active.meaning}</p>
          <p className="text-xs text-stone-300 leading-relaxed mb-4">{active.description}</p>

          <div className="space-y-1.5 text-[11px] border-t border-white/10 pt-3 text-stone-400">
            <div className="flex justify-between">
              <span className="text-stone-400">Root Bhava (Emotion):</span>
              <span className="text-white font-medium">{active.bhava}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Symbolic Color:</span>
              <span className="text-white font-medium">{active.colorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Presiding Archetype:</span>
              <span className="text-amber-300 font-medium">{active.deity}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-stone-500 italic">{caption}</p>
    </div>
  );
};

// 3. Kailasa Temple Monolithic Excavation Diagram
const TempleArchitectureDiagram: React.FC<{ title: string; caption: string }> = ({ title, caption }) => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'shikhara' | 'mandapa' | 'elephants'>('all');

  return (
    <div className="my-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4 mb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">Monolithic Engineering Blueprints</span>
          <h3 className="text-lg font-bold text-slate-900 mt-0.5">{title}</h3>
        </div>
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg text-xs font-medium text-slate-700">
          <button
            onClick={() => setActiveLayer('all')}
            className={`px-3 py-1.5 rounded-md transition-colors ${activeLayer === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Full Elevation
          </button>
          <button
            onClick={() => setActiveLayer('shikhara')}
            className={`px-3 py-1.5 rounded-md transition-colors ${activeLayer === 'shikhara' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Top Shikhara
          </button>
          <button
            onClick={() => setActiveLayer('mandapa')}
            className={`px-3 py-1.5 rounded-md transition-colors ${activeLayer === 'mandapa' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Columned Mandapa
          </button>
          <button
            onClick={() => setActiveLayer('elephants')}
            className={`px-3 py-1.5 rounded-md transition-colors ${activeLayer === 'elephants' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Plinth & Elephants
          </button>
        </div>
      </div>

      <div className="relative bg-[#1c1917] rounded-xl p-6 text-stone-200 border border-stone-800 overflow-hidden">
        {/* Basalt Cliff Cutout Representation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-3">
            {/* Layer 1: Mountain Cliff & Top Shikhara */}
            <div
              className={`p-3.5 rounded-xl border transition-all ${
                activeLayer === 'shikhara' || activeLayer === 'all'
                  ? 'bg-amber-950/40 border-amber-500/60 text-amber-200'
                  : 'bg-stone-900/40 border-stone-800 text-stone-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">1. Summit Vimana & Kalasha (32.6m Peak)</span>
                <span className="text-[10px] font-mono text-stone-400">Phase 1: 757–765 CE</span>
              </div>
              <p className="text-[11px] text-stone-300 mt-1">
                First strike of the chisel on the cliff brow. The octagonal dome and four Nandi statues were carved while the lower mountain was still solid basalt.
              </p>
            </div>

            {/* Layer 2: Main Mandapa & Courtyard Bridges */}
            <div
              className={`p-3.5 rounded-xl border transition-all ${
                activeLayer === 'mandapa' || activeLayer === 'all'
                  ? 'bg-amber-950/40 border-amber-500/60 text-amber-200'
                  : 'bg-stone-900/40 border-stone-800 text-stone-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">2. Hypostyle Hall (16 Monolithic Pillars)</span>
                <span className="text-[10px] font-mono text-stone-400">Phase 2: 765–775 CE</span>
              </div>
              <p className="text-[11px] text-stone-300 mt-1">
                Interior halls hollowed out through front porticoes. Two 17-meter soaring victory pillars (Dhvajastambhas) were left standing intact in the trench.
              </p>
            </div>

            {/* Layer 3: Life-Size Elephant Plinth */}
            <div
              className={`p-3.5 rounded-xl border transition-all ${
                activeLayer === 'elephants' || activeLayer === 'all'
                  ? 'bg-amber-950/40 border-amber-500/60 text-amber-200'
                  : 'bg-stone-900/40 border-stone-800 text-stone-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">3. Monumental Elephant Upapitha (Plinth Base)</span>
                <span className="text-[10px] font-mono text-stone-400">Phase 3: 775–783 CE</span>
              </div>
              <p className="text-[11px] text-stone-300 mt-1">
                Carved at the floor level of the 30-meter-deep excavation pit. Dozens of life-size elephants appear to bear the entire mountain on their backs.
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="bg-stone-900/90 p-4 rounded-xl border border-stone-800 text-xs space-y-3">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Excavated Basalt</span>
              <span className="text-base font-bold text-amber-400 font-mono">~200,000 Tons</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Excavation Depth</span>
              <span className="text-base font-bold text-white font-mono">32 Meters (107 ft)</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Construction Principle</span>
              <span className="text-xs font-semibold text-emerald-400">Subtractive Top-to-Bottom</span>
            </div>
            <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400 italic">
              "No bricks, no cement, no joined stone blocks. The entire structure is a single uninterrupted crystal of volcanic rock."
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-stone-500 italic">{caption}</p>
    </div>
  );
};

// 4. Indus Valley Drainage System Cross-Section
const IndusDrainageDiagram: React.FC<{ title: string; caption: string }> = ({ title, caption }) => {
  return (
    <div className="my-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="border-b border-stone-100 pb-4 mb-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">Hydraulic Engineering Schematic</span>
        <h3 className="text-lg font-bold text-slate-900 mt-0.5">{title}</h3>
      </div>

      <div className="bg-stone-900 text-stone-200 p-5 rounded-xl border border-stone-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-stone-800/80 p-3.5 rounded-lg border border-stone-700">
            <span className="text-xs font-bold text-amber-400 block mb-1">A. Domestic Chute & Soak Pit</span>
            <p className="text-[11px] text-stone-300">
              Vertical terracotta pipes embedded in courtyard bathroom walls dropped gray water into a ceramic sediment jar, catching heavy grit before water entered street drains.
            </p>
          </div>

          <div className="bg-stone-800/80 p-3.5 rounded-lg border border-stone-700">
            <span className="text-xs font-bold text-amber-400 block mb-1">B. Covered Street Brick Drain</span>
            <p className="text-[11px] text-stone-300">
              Corbelled brick drains running alongside main avenues at gentle 1.5% gravity gradients, topped with loose limestone flags that city workers lifted for regular desilting.
            </p>
          </div>

          <div className="bg-stone-800/80 p-3.5 rounded-lg border border-stone-700">
            <span className="text-xs font-bold text-amber-400 block mb-1">C. Outfall Outside City Walls</span>
            <p className="text-[11px] text-stone-300">
              Closed sewer culverts discharged wastewater safely away from drinking wells and residential quarters, maintaining high urban hygienic standards 4,500 years ago.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-stone-500 italic">{caption}</p>
    </div>
  );
};
