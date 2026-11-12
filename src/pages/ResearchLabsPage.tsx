import React, { useState } from 'react';
import { Cpu, Microscope, Compass, Code2, ArrowRight, Download, FileText, CheckCircle2, Award, Users, Search, ExternalLink, Sparkles, Send } from 'lucide-react';
import { R_AND_D_LABS } from '../data/collegeData';

interface Publication {
  id: string;
  year: string;
  journal: string;
  title: string;
  authors: string;
  abstract: string;
  discipline: string;
}

export const ResearchLabsPage: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const [activeLabTab, setActiveLabTab] = useState<string>('all');
  const [pubSearch, setPubSearch] = useState('');
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [proposalSubmitted, setProposalSubmitted] = useState(false);
  const [researcherName, setResearcherName] = useState('');
  const [researcherEmail, setResearcherEmail] = useState('');
  const [researchDomain, setResearchDomain] = useState('IoT & Embedded Systems');

  const publications: Publication[] = [
    {
      id: 'pub-1',
      year: '2026',
      journal: 'IEEE Transactions on Industrial Informatics',
      title: 'Edge-AI Multispectral UAV Autonomous Flight Controller for Precision Crop Health Diagnosis',
      authors: 'Prof. Sandip Patnaik, Dr. Debasis Panda, A. K. Ray',
      abstract: 'A deep neural network lightweight architecture deployed on ARM Cortex edge microcontrollers for real-time vegetative index calculation from 4K drone cameras under GPS-denied environments.',
      discipline: 'Robotics & UAVs',
    },
    {
      id: 'pub-2',
      year: '2025',
      journal: 'ACM Transactions on Cyber-Physical Systems',
      title: 'Energy-Harvesting Secure LoRaWAN Mesh Protocol for Smart Industrial Water Grids',
      authors: 'Dr. Ramnarayan Mohanty, S. S. Samal, Er. P. Patnaik',
      abstract: 'Novel low-power cryptographic key exchange protocol with ultra-low latency for industrial IoT telemetry over 10+ kilometer urban mesh networks.',
      discipline: 'IoT & Sensors',
    },
    {
      id: 'pub-3',
      year: '2025',
      journal: 'Elsevier Renewable Energy & Smart Grid Review',
      title: 'Decentralized Microgrid Dynamic Voltage Regulation via Reinforcement Learning Power Inverters',
      authors: 'Subhrajyoti Pani, Dr. Akash Bhoi, Satyajit Mohanty',
      abstract: 'Real-time adaptive inverter control for distributed solar rooftop installations mitigating intermittent cloud shading voltage sag in industrial manufacturing clusters.',
      discipline: 'Clean Energy & Power',
    },
    {
      id: 'pub-4',
      year: '2024',
      journal: 'IEEE Journal of Biomedical and Health Informatics',
      title: 'Self-Supervised Transformer Architecture for Automated Arrhythmia Classification in Wearable ECG',
      authors: 'Dr. Biswajeet Champaty, Dr. Sumit Kumar Das',
      abstract: 'A 12-lead transformer model achieving 99.4% F1-score across arrhythmia categories with ultra-low parameter footprint optimized for wearable medical IoT processors.',
      discipline: 'Healthcare AI & Biotech',
    },
  ];

  const filteredPubs = publications.filter(
    (p) =>
      p.title.toLowerCase().includes(pubSearch.toLowerCase()) ||
      p.authors.toLowerCase().includes(pubSearch.toLowerCase()) ||
      p.discipline.toLowerCase().includes(pubSearch.toLowerCase())
  );

  const submitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!researcherName || !researcherEmail) return;
    setProposalSubmitted(true);
    setTimeout(() => {
      setProposalSubmitted(false);
      setProposalModalOpen(false);
      setResearcherName('');
      setResearcherEmail('');
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EFE1] border-b border-stone-200 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 border border-cyan-300 text-cyan-900 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-4 h-4 text-cyan-700" />
            <span>Directorate of Research &amp; Innovation · DSIR-SIRO Approved</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#172554] tracking-tight leading-tight">
            Research Centers of Excellence &amp; Patents
          </h1>
          <p className="text-stone-600 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
            Housing the flagship CISCO thingQbator hub, Autonomous Drone Center, and AI Supercomputing cluster, facilitating over 24+ patent filings and 18+ student startups.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setProposalModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-[#1b2a60] hover:bg-[#121c42] text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
            >
              Submit Research Fellowship Proposal
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* Research Centers Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              Centers of Excellence &amp; Specialized Facilities
            </h3>
            <p className="text-xs text-stone-500 mt-1">Industrial testbeds, instrumentation and patent incubators</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {R_AND_D_LABS.map((lab) => (
              <div
                key={lab.id}
                className="rounded-3xl bg-white border border-stone-200 p-7 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-900 border border-cyan-200 inline-block mb-3 font-mono">
                    {lab.shortName}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 leading-snug">{lab.name}</h4>
                  <p className="text-xs text-blue-700 font-medium mt-1">Focus: {lab.focus}</p>
                  <p className="text-xs text-stone-600 mt-3 leading-relaxed">{lab.description}</p>

                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-stone-100">
                    {lab.stats.map((st, i) => (
                      <div key={i} className="p-2 rounded-lg bg-stone-50">
                        <span className="text-base font-extrabold text-[#172554] block">{st.metric}</span>
                        <span className="text-[10px] text-stone-500 block leading-tight">{st.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Flagship Work:</span>
                    <ul className="space-y-1 text-xs text-stone-700">
                      {lab.keyProjects.slice(0, 2).map((kp, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-mono text-[11px]">{lab.lead}</span>
                  <span className="text-cyan-700 font-bold">Inquire Lab →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peer-Reviewed Journal Publications */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Recent Peer-Reviewed Journal Publications
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">Faculty and doctoral scholars publishing in IEEE, ACM &amp; Elsevier</p>
            </div>

            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={pubSearch}
                onChange={(e) => setPubSearch(e.target.value)}
                placeholder="Search publications..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-stone-300 text-xs focus:outline-hidden focus:border-blue-700"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredPubs.map((pub) => (
              <div
                key={pub.id}
                className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-all space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-blue-900 font-mono">
                    {pub.journal} ({pub.year})
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                    {pub.discipline}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {pub.title}
                </h4>

                <p className="text-xs text-stone-500 font-mono">
                  Authors: {pub.authors}
                </p>

                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  {pub.abstract}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Research Proposal Modal */}
      {proposalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700">
                  Directorate of Research
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-900 mt-1">
                  Fellowship Inquiry
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  DSIR-SIRO Doctoral &amp; Postdoctoral Programs
                </p>
              </div>
              <button
                onClick={() => setProposalModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {proposalSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Proposal Abstract Received!</h4>
                <p className="text-xs text-stone-600 max-w-xs mx-auto">
                  The Dean of Research will review your credentials and contact you at <span className="font-semibold">{researcherEmail}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={submitProposal} className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Researcher / Scholar Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={researcherName}
                    onChange={(e) => setResearcherName(e.target.value)}
                    placeholder="Dr. / Er. / Scholar Name"
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
                    value={researcherEmail}
                    onChange={(e) => setResearcherEmail(e.target.value)}
                    placeholder="researcher@university.edu"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-blue-600 bg-stone-50"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Proposed Research Domain
                  </label>
                  <select
                    value={researchDomain}
                    onChange={(e) => setResearchDomain(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-blue-600 bg-stone-50"
                  >
                    <option>IoT, Robotics &amp; Autonomous Aerial Systems</option>
                    <option>Artificial Intelligence &amp; High-Performance Computing</option>
                    <option>Clean Energy, Smart Grids &amp; Power Electronics</option>
                    <option>Biotechnology &amp; Computational Genomics</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setProposalModalOpen(false)}
                    className="w-1/3 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 rounded-xl bg-[#1b2a60] hover:bg-blue-900 text-white text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Proposal</span>
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
