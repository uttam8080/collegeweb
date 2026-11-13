import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  GraduationCap, 
  ArrowRight, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Quote, 
  Briefcase,
  ChevronRight,
  ExternalLink,
  Award,
  BookOpen
} from 'lucide-react';

interface CollegeSuccessStory {
  id: string;
  name: string;
  batch: string;
  degree: string;
  role: string;
  company: string;
  location: string;
  image: string;
  packageOffer: string;
  placementType: string;
  campusAchievement: string;
  collegeStory: string;
  collegeTestimonial: string;
  adviceForStudents: string;
  colIndex: number; // 0 to 6 (left to right placement)
  verticalOffset?: string;
  tilt?: string;
}

interface SuccessStoriesSectionProps {
  onNavigate?: (tab: string) => void;
}

export const SuccessStoriesSection: React.FC<SuccessStoriesSectionProps> = ({ onNavigate }) => {
  const [activeLeader, setActiveLeader] = useState<CollegeSuccessStory | null>(null);
  const [hoveredLeader, setHoveredLeader] = useState<CollegeSuccessStory | null>(null);
  const [showFullGalleryModal, setShowFullGalleryModal] = useState(false);

  // 11 Authentic College Success Stories Arranged in the Curved Arch Pattern (Matching Screenshot)
  const stories: CollegeSuccessStory[] = [
    // Column 1 (Far Left)
    {
      id: 'story-1',
      colIndex: 0,
      verticalOffset: 'translate-y-8',
      name: 'Sandip Patnaik',
      batch: 'Class of 2019',
      degree: 'B.Tech in Electronics & Telecommunication',
      role: 'Manager, Corporate Relations',
      company: 'Amgen India',
      location: 'Mumbai, India',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      packageOffer: '₹14.5 LPA Career Ascent',
      placementType: 'On-Campus Corporate Consortia',
      campusAchievement: 'President of TEKKZY Student Council & Convener of National Tech Fest TEKKLENSE',
      collegeStory: 'Joined TEKKZY as an aspiring engineer and leveraged the multidisciplinary curriculum, leadership societies, and pre-placement communication bootcamps to transition into strategic pharmaceutical corporate relations.',
      collegeTestimonial: 'The college placement training and soft-skills finishing school gave me the polish to present complex ideas clearly to C-suite executives at global biotechnology conglomerates.',
      adviceForStudents: 'Engineers who combine technical proficiency with outstanding communication and leadership stand out immediately in campus interviews.',
    },
    {
      id: 'story-2',
      colIndex: 0,
      verticalOffset: 'translate-y-24',
      name: 'Priyanka Mishra',
      batch: 'Class of 2023',
      degree: 'B.Tech in Computer Science & AI',
      role: 'AI / Machine Learning Engineer',
      company: 'Microsoft',
      location: 'Hyderabad, India',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
      packageOffer: '₹42.5 LPA Campus Offer',
      placementType: 'Microsoft University Campus Select',
      campusAchievement: '1st Prize at Smart Odisha AI Hackathon & Creator of Automated Campus Face-Recognition Attendance System',
      collegeStory: 'Spent nights training deep learning neural nets in the college high-performance GPU lab. Her open-source project caught the attention of Microsoft campus interviewers during 7th-semester recruitment.',
      collegeTestimonial: 'TEKKZY’s round-the-clock incubation labs and faculty mentors gave me the hardware compute and freedom to build real production-ready computer vision prototypes.',
      adviceForStudents: 'Do not just memorize algorithms for interviews. Build real AI projects, publish your code on GitHub, and participate in campus hackathons.',
    },

    // Column 2 (Mid-Left)
    {
      id: 'story-3',
      colIndex: 1,
      verticalOffset: 'translate-y-2',
      name: 'Rakesh Mohapatra',
      batch: 'Class of 2021',
      degree: 'B.Tech in Information Technology',
      role: 'Principal Cloud Architect',
      company: 'Amazon Web Services (AWS)',
      location: 'Bengaluru, India',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
      packageOffer: '₹32.0 LPA Day-1 Selection',
      placementType: 'AWS On-Campus Cloud Hiring',
      campusAchievement: 'AWS Certified Solutions Architect while in 6th semester & College Cloud Infrastructure Lead',
      collegeStory: 'Built the university’s internal cloud server architecture as his final-year capstone project. His practical server clustering knowledge impressed Amazon’s technical interview panel.',
      collegeTestimonial: 'The hands-on networking and Linux server testbeds at TEKKZY taught me how real internet-scale systems fail and recover. That intuition was my biggest advantage in interviews.',
      adviceForStudents: 'Take laboratory sessions seriously. Hands-on terminal experience and command-line comfort will separate you from thousands of applicants.',
    },
    {
      id: 'story-4',
      colIndex: 1,
      verticalOffset: 'translate-y-16',
      name: 'Tripada Dash',
      batch: 'Class of 2022',
      degree: 'B.Tech in Computer Science',
      role: 'Cyber Security Manager',
      company: 'Accenture Strategy',
      location: 'Gurugram, India',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
      packageOffer: '₹14.0 LPA Day-1 Placement',
      placementType: 'Accenture On-Campus Super-Dream Drive',
      campusAchievement: 'Founder of Campus Ethical Hacking Circle & Certified Ethical Hacker (CEH)',
      collegeStory: 'Formed a student cybersecurity club on campus that regularly competed in national Capture-The-Flag (CTF) contests. Secured an immediate leadership track placement offer on Day 1.',
      collegeTestimonial: 'TEKKZY encouraged student-led technical clubs and gave us budget for cloud security labs. That practical exposure made technical interviews feel like everyday club discussions.',
      adviceForStudents: 'Form study circles with motivated batchmates. Peer learning in coding and system design is five times faster than studying alone.',
    },

    // Column 3 (Left-Center Curved High)
    {
      id: 'story-5',
      colIndex: 2,
      verticalOffset: '-translate-y-4',
      name: 'Ashish Kumar Gupta',
      batch: 'Class of 2020',
      degree: 'B.Tech in Computer Science & Engineering',
      role: 'Engineering Manager',
      company: 'Creditsafe Technology',
      location: 'Cardiff / London, UK',
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400&auto=format&fit=crop',
      packageOffer: 'Global Relocation & Leadership',
      placementType: 'On-Campus Multi-Stage Technical Drive',
      campusAchievement: 'Lead Developer for TEKKZY Digital Campus Portal & BPUT Merit Scholar',
      collegeStory: 'Started as a curious first-year student building web apps in the hostel room. Selected by Creditsafe during campus placement drives and rapidly ascended to Engineering Manager leading global teams in the UK.',
      collegeTestimonial: 'The rigorous curriculum combined with competitive coding hackathons at TEKKZY formed the foundation of my engineering career in the UK.',
      adviceForStudents: 'Focus on mastering fundamentals: operating systems, network protocols, databases, and clean architecture. Trends change, but fundamentals stay forever.',
    },

    // Column 4 (Peak Center of Arch)
    {
      id: 'story-6',
      colIndex: 3,
      verticalOffset: '-translate-y-8',
      name: 'Subhrajyoti Pani',
      batch: 'Class of 2020',
      degree: 'B.Tech in Electrical Engineering',
      role: 'Head of Operations',
      company: 'Tata Power',
      location: 'Bhubaneswar, India',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
      packageOffer: 'Direct Campus GET Appointment',
      placementType: 'Tata Power Core Engineering Campus Drive',
      campusAchievement: 'Designed Solar Smart-Grid Prototype on College Academic Block & Gold Medalist',
      collegeStory: 'Turned the college electrical machinery lab into a testing ground for automated power relays. Recruited as Graduate Engineer Trainee (GET) during on-campus recruitment and now manages regional power infrastructure.',
      collegeTestimonial: 'TEKKZY’s state-of-the-art electrical labs and industry-experienced professors gave us authentic practical knowledge that made core engineering placement easy.',
      adviceForStudents: 'Core engineering disciplines are undergoing a massive renewable energy and smart-grid revolution. Build hands-on electrical modeling skills.',
    },

    // Column 5 (Right-Center Curved High)
    {
      id: 'story-7',
      colIndex: 4,
      verticalOffset: '-translate-y-4',
      name: 'Ankita Singh',
      batch: 'Class of 2024',
      degree: 'B.Tech in Computer Science & Engineering',
      role: 'Senior Software Engineer',
      company: 'Fidelity Investments',
      location: 'Bengaluru, India',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
      packageOffer: '₹24.0 LPA Day-1 Selection',
      placementType: 'Fidelity On-Campus FinTech Challenge',
      campusAchievement: 'Top 3 in National Smart India Hackathon & President of TEKKZY Coding League',
      collegeStory: 'Developed an automated fraud-detection transaction model during the TEKKZY 36-hour hackathon. The Fidelity campus recruitment panel selected her on the spot for their mission-critical asset management systems.',
      collegeTestimonial: 'TEKKZY’s algorithmic culture and round-the-clock incubation labs gave me the confidence to write scalable, production-grade microservices under high pressure.',
      adviceForStudents: 'Write code every single day. Great software engineering is not about memorizing syntax; it is about problem deconstruction and relentless curiosity.',
    },

    // Column 6 (Mid-Right)
    {
      id: 'story-8',
      colIndex: 5,
      verticalOffset: 'translate-y-2',
      name: 'Sudipta Bhanja',
      batch: 'Class of 2019',
      degree: 'B.Tech in Information Technology',
      role: 'Technical Lead',
      company: 'BFSI Canada, TCS',
      location: 'Toronto, Canada',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      packageOffer: 'TCS Digital Elite Campus Select',
      placementType: 'TCS National Qualifier Test (NQT) On-Campus',
      campusAchievement: 'Captain of University Technical Quiz Team & 2-Time Inter-College Coding Champion',
      collegeStory: 'Secured the premium TCS Digital offer through campus placement, and was fast-tracked to lead banking cloud modernizations for top Canadian financial institutions in Toronto.',
      collegeTestimonial: 'The faculty’s mentorship and mock technical interviews at TEKKZY prepared me for both Indian and North American corporate engineering cultures.',
      adviceForStudents: 'Learn to explain complex technical designs in simple terms. Engineering leadership requires both coding excellence and clear collaborative communication.',
    },
    {
      id: 'story-9',
      colIndex: 5,
      verticalOffset: 'translate-y-16',
      tilt: 'transform -rotate-2',
      name: 'Jayadeep Dash',
      batch: 'Class of 2020',
      degree: 'B.Tech in Mechanical Engineering',
      role: 'Content Operations Lead',
      company: 'DAZN Sports Media',
      location: 'London, UK',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop',
      packageOffer: 'International Media Tech Ascent',
      placementType: 'Off-Campus Mentored by TEKKZY Alumni Network',
      campusAchievement: 'Chief Editor of TEKKZY College Chronicle & Campus Robotics Team Lead',
      collegeStory: 'Leveraged the college’s interdisciplinary coding electives to transition from mechanical design into sports OTT streaming telemetry, moving to DAZN’s European headquarters in London.',
      collegeTestimonial: 'TEKKZY never restricts you to just your syllabus. The encouragement to take electives across computing and multimedia opened a global media tech career for me.',
      adviceForStudents: 'Your degree gives you analytical training. How you apply that analytical thinking across new industries is entirely up to your imagination.',
    },

    // Column 7 (Far Right with slight 3D angle)
    {
      id: 'story-10',
      colIndex: 6,
      verticalOffset: 'translate-y-8',
      name: 'Bibekananda Sahu',
      batch: 'Class of 2021',
      degree: 'B.Tech in Mechanical Engineering',
      role: 'Manager, Metallurgy & Quality',
      company: 'MIDHANI (Ministry of Defence)',
      location: 'Hyderabad, India',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
      packageOffer: 'Defence PSU Gazetted Placement',
      placementType: 'GATE Campus Coaching & PSU Selection',
      campusAchievement: 'Fabricated Custom Formula Student Racing Chassis in College Workshops',
      collegeStory: 'Trained extensively in the college metallurgy and material testing laboratories. Cleared the national defense technical examinations with All-India Rank, supported by college preparatory classes.',
      collegeTestimonial: 'TEKKZY’s advanced CNC machine shops and materials testing equipment gave me practical knowledge that surpassed many central universities.',
      adviceForStudents: 'Take pride in core engineering. India’s defense, space, and manufacturing industries need brilliant engineers who understand real materials.',
    },
    {
      id: 'story-11',
      colIndex: 6,
      verticalOffset: 'translate-y-24',
      name: 'Smaranika Das',
      batch: 'Class of 2022',
      degree: 'B.Tech in Computer Science',
      role: 'Staffing Operations Lead',
      company: 'Google',
      location: 'Bengaluru, India',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
      packageOffer: '₹44.0 LPA Record Package',
      placementType: 'Google Direct Campus Selection',
      campusAchievement: 'Published IEEE Research Paper on Distributed Graph Algorithms & Student Placement Coordinator',
      collegeStory: 'Joined TEKKZY from a small town in Odisha and utilized the round-the-clock digital library and coding mentoring to secure the college’s record ₹44.0 LPA placement offer with Google.',
      collegeTestimonial: 'The culture of excellence, peer hackathons, and relentless support from the Training & Placement cell made my dream of joining Google a reality.',
      adviceForStudents: 'Never underestimate yourself based on where you come from. Your consistency, curiosity, and hard work in college will take you to the best tech companies in the world.',
    },
  ];

  return (
    <section className="relative w-full bg-[#FAF9F6] pt-16 sm:pt-24 pb-20 sm:pb-28 border-b border-stone-200 overflow-hidden">
      
      {/* Background Architectural Ceiling Guidelines (Subtle lines extending from top, matching screenshot) */}
      <div 
        className="absolute top-0 inset-x-0 h-48 opacity-[0.04] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            TOP HALF: THE FLOATING PORTRAIT MOSAIC ARCH (Matching Screenshot)
            ========================================================================= */}
        <div className="relative w-full max-w-5xl mx-auto mb-10 sm:mb-14">
          
          {/* Subtle Vertical Hanging Hairlines (Drop lines from top down to photos) */}
          <div className="absolute top-0 inset-x-0 h-32 flex justify-between pointer-events-none px-6 opacity-35" aria-hidden="true">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-px h-full bg-gradient-to-b from-stone-300 via-stone-200 to-transparent" />
            ))}
          </div>

          {/* Grid Layout of the 7 Columns forming the Arch */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 sm:gap-4 items-center">
            
            {/* Column 1 (Far Left) */}
            <div className="flex flex-col gap-3.5 pt-6 sm:pt-8">
              {[stories[0], stories[1]].map((story) => (
                <div
                  key={story.id}
                  onClick={() => setActiveLeader(story)}
                  onMouseEnter={() => setHoveredLeader(story)}
                  onMouseLeave={() => setHoveredLeader(null)}
                  className="group relative aspect-4/5 rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer border border-stone-300/80"
                >
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Subtle Gradient Overlay on Hover with College Placement Badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 sm:p-2.5 text-white">
                    <span className="text-[8px] font-extrabold uppercase text-amber-300 tracking-wider">
                      {story.batch}
                    </span>
                    <p className="text-[11px] font-bold leading-tight line-clamp-1">{story.name}</p>
                    <p className="text-[9px] text-cyan-300 font-medium line-clamp-1">{story.company}</p>
                    <span className="text-[8px] text-emerald-300 font-semibold mt-0.5 line-clamp-1">
                      {story.packageOffer}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 (Mid-Left) */}
            <div className="flex flex-col gap-3.5 pt-2 sm:pt-4">
              {[stories[2], stories[3]].map((story) => (
                <div
                  key={story.id}
                  onClick={() => setActiveLeader(story)}
                  onMouseEnter={() => setHoveredLeader(story)}
                  onMouseLeave={() => setHoveredLeader(null)}
                  className="group relative aspect-4/5 rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer border border-stone-300/80"
                >
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 sm:p-2.5 text-white">
                    <span className="text-[8px] font-extrabold uppercase text-amber-300 tracking-wider">
                      {story.batch}
                    </span>
                    <p className="text-[11px] font-bold leading-tight line-clamp-1">{story.name}</p>
                    <p className="text-[9px] text-cyan-300 font-medium line-clamp-1">{story.company}</p>
                    <span className="text-[8px] text-emerald-300 font-semibold mt-0.5 line-clamp-1">
                      {story.packageOffer}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 3 (Left-Center Curved Up) */}
            <div className="flex flex-col gap-3.5 -translate-y-2 sm:-translate-y-4">
              <div
                onClick={() => setActiveLeader(stories[4])}
                onMouseEnter={() => setHoveredLeader(stories[4])}
                onMouseLeave={() => setHoveredLeader(null)}
                className="group relative aspect-4/5 rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer border border-stone-300/80"
              >
                <img
                  src={stories[4].image}
                  alt={stories[4].name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 sm:p-2.5 text-white">
                  <span className="text-[8px] font-extrabold uppercase text-amber-300 tracking-wider">
                    {stories[4].batch}
                  </span>
                  <p className="text-[11px] font-bold leading-tight line-clamp-1">{stories[4].name}</p>
                  <p className="text-[9px] text-cyan-300 font-medium line-clamp-1">{stories[4].company}</p>
                  <span className="text-[8px] text-emerald-300 font-semibold mt-0.5 line-clamp-1">
                    {stories[4].packageOffer}
                  </span>
                </div>
              </div>
            </div>

            {/* Column 4 (Peak Center of Arch) */}
            <div className="flex flex-col gap-3.5 -translate-y-4 sm:-translate-y-8">
              <div
                onClick={() => setActiveLeader(stories[5])}
                onMouseEnter={() => setHoveredLeader(stories[5])}
                onMouseLeave={() => setHoveredLeader(null)}
                className="group relative aspect-4/5 rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer border border-stone-300/80 ring-2 ring-stone-900/15"
              >
                <img
                  src={stories[5].image}
                  alt={stories[5].name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 sm:p-2.5 text-white">
                  <span className="text-[8px] font-extrabold uppercase text-amber-300 tracking-wider">
                    {stories[5].batch}
                  </span>
                  <p className="text-[11px] font-bold leading-tight line-clamp-1">{stories[5].name}</p>
                  <p className="text-[9px] text-cyan-300 font-medium line-clamp-1">{stories[5].company}</p>
                  <span className="text-[8px] text-emerald-300 font-semibold mt-0.5 line-clamp-1">
                    {stories[5].packageOffer}
                  </span>
                </div>
              </div>
            </div>

            {/* Column 5 (Right-Center Curved Up) */}
            <div className="flex flex-col gap-3.5 -translate-y-2 sm:-translate-y-4">
              <div
                onClick={() => setActiveLeader(stories[6])}
                onMouseEnter={() => setHoveredLeader(stories[6])}
                onMouseLeave={() => setHoveredLeader(null)}
                className="group relative aspect-4/5 rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer border border-stone-300/80"
              >
                <img
                  src={stories[6].image}
                  alt={stories[6].name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 sm:p-2.5 text-white">
                  <span className="text-[8px] font-extrabold uppercase text-amber-300 tracking-wider">
                    {stories[6].batch}
                  </span>
                  <p className="text-[11px] font-bold leading-tight line-clamp-1">{stories[6].name}</p>
                  <p className="text-[9px] text-cyan-300 font-medium line-clamp-1">{stories[6].company}</p>
                  <span className="text-[8px] text-emerald-300 font-semibold mt-0.5 line-clamp-1">
                    {stories[6].packageOffer}
                  </span>
                </div>
              </div>
            </div>

            {/* Column 6 (Mid-Right) */}
            <div className="flex flex-col gap-3.5 pt-2 sm:pt-4">
              {[stories[7], stories[8]].map((story) => (
                <div
                  key={story.id}
                  onClick={() => setActiveLeader(story)}
                  onMouseEnter={() => setHoveredLeader(story)}
                  onMouseLeave={() => setHoveredLeader(null)}
                  className="group relative aspect-4/5 rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer border border-stone-300/80"
                >
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 sm:p-2.5 text-white">
                    <span className="text-[8px] font-extrabold uppercase text-amber-300 tracking-wider">
                      {story.batch}
                    </span>
                    <p className="text-[11px] font-bold leading-tight line-clamp-1">{story.name}</p>
                    <p className="text-[9px] text-cyan-300 font-medium line-clamp-1">{story.company}</p>
                    <span className="text-[8px] text-emerald-300 font-semibold mt-0.5 line-clamp-1">
                      {story.packageOffer}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 7 (Far Right with slight 3D angle) */}
            <div className="flex flex-col gap-3.5 pt-6 sm:pt-8">
              {[stories[9], stories[10]].map((story) => (
                <div
                  key={story.id}
                  onClick={() => setActiveLeader(story)}
                  onMouseEnter={() => setHoveredLeader(story)}
                  onMouseLeave={() => setHoveredLeader(null)}
                  className="group relative aspect-4/5 rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer border border-stone-300/80"
                >
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 sm:p-2.5 text-white">
                    <span className="text-[8px] font-extrabold uppercase text-amber-300 tracking-wider">
                      {story.batch}
                    </span>
                    <p className="text-[11px] font-bold leading-tight line-clamp-1">{story.name}</p>
                    <p className="text-[9px] text-cyan-300 font-medium line-clamp-1">{story.company}</p>
                    <span className="text-[8px] text-emerald-300 font-semibold mt-0.5 line-clamp-1">
                      {story.packageOffer}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* =========================================================================
            CENTER CONTENT ZONE (Matching Screenshot: Exact Text & Typography)
            ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          
          {/* Main Headline (Requested Exact Match: Bold Black + Muted Grey) */}
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#111827] leading-[1.15]">
            Trusted by leaders<br />
            <span className="text-[#9CA3AF] font-bold">from various industries</span>
          </h2>

          {/* Subtitle (Requested Exact Match) */}
          <p className="text-stone-500 text-sm sm:text-base mt-4 leading-relaxed max-w-lg">
            Learn why professionals and global enterprises trust our engineering graduates to architect solutions and lead technical innovation.
          </p>

          {/* CTA Pill Button (Requested Exact Match: Black Pill with Arrow) */}
          <div className="mt-7">
            <button
              onClick={() => setShowFullGalleryModal(true)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-black hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-black/15 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <span>Read Success Stories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Hover Callout Pill (Reveals College Success Story highlight) */}
          {hoveredLeader && (
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-300 shadow-md text-xs text-stone-700 animate-in fade-in duration-150">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-stone-900">{hoveredLeader.name}</span>
              <span className="text-stone-400">({hoveredLeader.batch})</span>
              <span className="text-stone-300">·</span>
              <span className="text-stone-600">{hoveredLeader.role}</span>
              <span className="text-stone-300">·</span>
              <span className="font-semibold text-blue-900">{hoveredLeader.company}</span>
              <span className="text-stone-300">·</span>
              <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {hoveredLeader.packageOffer}
              </span>
            </div>
          )}
        </div>

      </div>

      {/* =========================================================================
          INDIVIDUAL COLLEGE SUCCESS STORY POPUP MODAL (When clicking any portrait)
          ========================================================================= */}
      {activeLeader && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-text"
          onClick={() => setActiveLeader(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveLeader(null)}
              className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Profile Header with Placement Highlight */}
            <div className="flex items-start gap-4 sm:gap-5 mb-5">
              <img
                src={activeLeader.image}
                alt={activeLeader.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-stone-300 shadow-md shrink-0"
              />

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-blue-900 border border-blue-200">
                    {activeLeader.batch}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {activeLeader.packageOffer}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
                  {activeLeader.name}
                </h3>
                <p className="text-sm font-semibold text-blue-800 mt-0.5">
                  {activeLeader.role} at {activeLeader.company}
                </p>
                <p className="text-xs text-stone-500 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{activeLeader.location}</span>
                  <span className="text-stone-300">·</span>
                  <span className="text-stone-600 font-medium">{activeLeader.placementType}</span>
                </p>
              </div>
            </div>

            {/* College Story & Campus Breakthrough */}
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1 mb-1">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>College Placement &amp; Campus Breakthrough</span>
                </span>
                <p className="text-stone-800 leading-relaxed font-medium">
                  {activeLeader.collegeStory}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200 text-stone-700 italic leading-relaxed border-l-4 border-l-blue-900">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 not-italic block mb-1">
                  College Testimonial
                </span>
                <p>"{activeLeader.collegeTestimonial}"</p>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-0.5">
                  Campus Achievements &amp; Projects
                </span>
                <p className="text-stone-800 font-medium">{activeLeader.campusAchievement}</p>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-0.5">
                  Alumni Advice for Current Students
                </span>
                <p className="text-stone-700 italic">"{activeLeader.adviceForStudents}"</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-400 font-mono">
                TEKKZY College of Technology Alumni
              </span>

              <button
                onClick={() => setActiveLeader(null)}
                className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-black text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          FULL COLLEGE SUCCESS STORIES DIRECTORY MODAL
          ========================================================================= */}
      {showFullGalleryModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 select-text"
          onClick={() => setShowFullGalleryModal(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-900">
                  TEKKZY College Placement &amp; Alumni Stories
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  College Success Stories from Campus to Global Careers
                </h3>
              </div>

              <button
                onClick={() => setShowFullGalleryModal(false)}
                className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Leader Grid with College Placement Context */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 overflow-y-auto pr-1">
              {stories.map((story) => (
                <div
                  key={story.id}
                  onClick={() => {
                    setActiveLeader(story);
                    setShowFullGalleryModal(false);
                  }}
                  className="p-4 rounded-2xl bg-stone-50 hover:bg-stone-100/90 border border-stone-200 transition-all cursor-pointer flex items-center gap-4 group"
                >
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-300"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] text-stone-500 font-mono">
                      <span className="font-bold text-blue-900">{story.batch}</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold">{story.packageOffer}</span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900 group-hover:text-blue-900 transition-colors truncate">
                      {story.name}
                    </h4>
                    <p className="text-xs text-stone-600 truncate">{story.role}</p>
                    <p className="text-xs font-semibold text-blue-900 flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3 h-3 text-stone-400" />
                      <span className="truncate">{story.company}</span>
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 group-hover:text-blue-900 transition-all" />
                </div>
              ))}
            </div>

            {/* Modal Bottom Action */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-500">
                12,000+ Alumni placed in leading global enterprises.
              </span>
              <button
                onClick={() => {
                  setShowFullGalleryModal(false);
                  if (onNavigate) onNavigate('placements');
                }}
                className="px-5 py-2.5 rounded-full bg-blue-900 hover:bg-blue-950 text-white font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Explore Placements Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
