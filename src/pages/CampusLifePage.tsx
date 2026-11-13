import React, { useState, useEffect, useRef } from 'react';
import { 
  Landmark, 
  Compass, 
  Award, 
  Users, 
  BookOpen, 
  Music, 
  Sparkles, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Coffee, 
  Trophy, 
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Terminal,
  Layers,
  Code2,
  Briefcase,
  Binary,
  X
} from 'lucide-react';
import { gsap, ScrollTrigger, usePageTextAnimations } from '../utils/animations';

export const CampusLifePage: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  usePageTextAnimations(pageRef);
  const [activeFacilityIndex, setActiveFacilityIndex] = useState<number>(0);
  const facilitiesSectionRef = useRef<HTMLElement>(null);
  const facilityRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeClubIndex, setActiveClubIndex] = useState<number>(0);
  const clubsSectionRef = useRef<HTMLElement>(null);
  const clubsHeaderRef = useRef<HTMLDivElement>(null);
  const clubsTrackContainerRef = useRef<HTMLDivElement>(null);
  const clubCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // State for horizontal cards carousel & interactive detail modal
  const [selectedClub, setSelectedClub] = useState<any | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const clubsScrollRef = useRef<HTMLDivElement>(null);
  const clubsTriggerRef = useRef<any>(null);
  const statsRef = useRef<HTMLElement>(null);
  const [stats, setStats] = useState({ clubs: 0, members: 0, events: 0, trophies: 0 });
  const [statsAnimated, setStatsAnimated] = useState(false);

  const checkScrollButtons = () => {
    if (!clubsScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = clubsScrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollClubs = (direction: 'left' | 'right') => {
    const st = clubsTriggerRef.current;
    if (st) {
      const totalDistance = st.end - st.start;
      const step = totalDistance / 6;
      const currentY = window.scrollY;
      let targetY: number;

      if (direction === 'right') {
        if (currentY < st.start) {
          targetY = st.start + step;
        } else {
          targetY = Math.min(st.end, currentY + step);
        }
      } else {
        if (currentY > st.end) {
          targetY = st.end - step;
        } else {
          targetY = Math.max(st.start, currentY - step);
        }
      }

      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    } else if (clubsScrollRef.current) {
      const scrollAmount = 380;
      clubsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // 9 World-Class Campus Infrastructure Facilities showcasing all campus spaces
  const campusFacilitiesData = [
    {
      id: '01',
      title: 'Central Digital Library',
      motto: 'KNOWLEDGE SANCTUARY & 24/7 E-RESOURCE HUB',
      description:
        'Spanning multiple architectural levels, our central library houses over 100,000 print volumes, 12,000+ subscribed e-journals (IEEE, ScienceDirect, ACM, Springer), dedicated doctoral research cubicles, and a round-the-clock air-conditioned digital reading hall.',
      badge: {
        eyebrow: 'DIGITAL REPOSITORY & ACCESS',
        title: '100,000+ Volumes · IEEE & ACM Access'
      },
      image: '/assets/images/college_library_hall_1793988204291.jpg',
      imageAlt: 'Central Digital Library Concourse',
      snapshots: ['100,000+ Print Volumes', 'IEEE & ACM Digital Portal', '24/7 Air-Conditioned Concourse', 'RFID Self-Checkout Kiosks'],
      categories: [
        {
          name: '1. Print Collections & Digital Hubs',
          items: [
            '100,000+ Print Volumes & Bound Journal Archives',
            'Subscribed IEEE Xplore, ScienceDirect & SpringerLink',
            'Automated RFID Self-Checkout & Book Drop Kiosks',
            'National Digital Library of India (NDLI) Institutional Portal'
          ]
        },
        {
          name: '2. Research Spaces & Scholar Amenities',
          items: [
            '24/7 Air-Conditioned Central Reading Concourse (500+ Seating)',
            '80 Private Individual Doctoral & Faculty Research Carrels',
            'High-Speed Digital Browsing Terminal Pavilion with 1 Gbps Fiber',
            'Turnitin Plagiarism Detection & Grammatical Research Suite'
          ]
        }
      ]
    },
    {
      id: '02',
      title: 'Advanced Computing Labs',
      motto: 'HIGH-PERFORMANCE COMPUTE & GENERATIVE AI LABS',
      description:
        'Engineered for intensive deep learning, cyber defense simulations, and cloud virtualization, the computing center features NVIDIA GPU clusters, 1,200+ high-end workstations, and enterprise cloud testbeds.',
      badge: {
        eyebrow: 'ENTERPRISE TECH ECOSYSTEM',
        title: '1,200+ High-End Nodes · NVIDIA GPU Clusters'
      },
      image: '/assets/images/college_computer_lab_1793988224067.jpg',
      imageAlt: 'Advanced Computing and AI Laboratory',
      snapshots: ['NVIDIA AI GPU Clusters', '1,200+ Workstations', 'DevOps Cloud Sandbox', '10 Gbps Optical Backbone'],
      categories: [
        {
          name: '1. Compute Architecture & Systems',
          items: [
            'NVIDIA A100 & RTX High-Performance GPU AI Clusters',
            '1,200+ Intel Core i7 / i9 High-Speed Workstations',
            'Dedicated Cloud Sandbox on AWS & Google Cloud Infrastructure',
            'Redundant 10 Gbps Tier-3 Optical Fiber Campus Backbone'
          ]
        },
        {
          name: '2. Specialized Domain Labs',
          items: [
            'Generative AI & Deep Learning Research Foundry',
            'Cyber Security, Ethical Hacking & Digital Forensics Lab',
            'Full-Stack Cloud Engineering & DevOps Deployment Lab',
            'Big Data Analytics & Apache Spark Parallel Processing Arena'
          ]
        }
      ]
    },
    {
      id: '03',
      title: 'Robotics & Maker FabLab',
      motto: 'HARDWARE INNOVATION & AUTONOMOUS UAV FABLAB',
      description:
        'A state-of-the-art maker haven equipped with rapid 3D prototyping printers, precision CNC mills, Cadence PCB fabrication, and autonomous drone flight testing cages for student inventors.',
      badge: {
        eyebrow: 'HARDWARE PROTOTYPING & PATENTS',
        title: 'Texas Instruments & ARM Partner Lab'
      },
      image: '/assets/images/college_drone_lab_hero.jpg',
      imageAlt: 'Robotics and Drone Prototyping FabLab',
      snapshots: ['Industrial 3D Printers', 'Drone Testing Cage', 'Cadence PCB Studio', 'ARM Embedded Telemetry'],
      categories: [
        {
          name: '1. Fabrication & Prototyping Equipment',
          items: [
            'Industrial Dual-Extrusion 3D Printers & Laser Cutters',
            'Cadence Allegro PCB Design & Surface Mount Soldering Stations',
            'Precision CNC Milling, Lathe & Mechanical Fabrication Shop',
            'Digital Storage Oscilloscopes & Spectrum RF Analyzers'
          ]
        },
        {
          name: '2. Autonomous Systems & Robotics',
          items: [
            'ROS2 Autonomous Rover Navigation & Obstacle Traversal Arenas',
            'Quadcopter Drone Indoor Testing Flight Enclosure',
            'Industrial Robotic Arm Kinematics & Vision Inspection Stations',
            'Embedded IoT Sensor Networks & Telemetry Testbeds'
          ]
        }
      ]
    },
    {
      id: '04',
      title: 'Smart Lecture Theatres',
      motto: 'ACOUSTIC ARCHITECTURE & 4K DIGITAL LECTURE THEATRES',
      description:
        'Acoustically engineered amphitheaters and tiered lecture auditoriums equipped with high-lumen 4K laser projection, Echo360 automated lecture capture, and individual scholar power docks for interactive discourse.',
      badge: {
        eyebrow: 'DIGITAL AUDITORIUMS & AV',
        title: '180+ Seating Tiered Auditoriums · Dolby Audio'
      },
      image: '/assets/images/college_lecture_hall_1793988205558.jpg',
      imageAlt: 'Smart Tiered Lecture Auditorium and AV Theatre',
      snapshots: ['4K Interactive Displays', 'Echo360 Automated Capture', 'Dolby Spatial Acoustics', 'Tiered 180+ Seating'],
      categories: [
        {
          name: '1. AV & Digital Classroom Technology',
          items: [
            'High-Lumen 4K Dual Laser Projection & Digital Smart Boards',
            'Echo360 Automated Multi-Camera Lecture Capture & Cloud Archive',
            'Wireless Scholar Screen Sharing & Interactive Presentation Podiums',
            'Ceiling Microphone Array with Intelligent Acoustic Beamforming'
          ]
        },
        {
          name: '2. Ergonomics & Acoustic Architecture',
          items: [
            'Tiered Stadium Seating Architecture for 180+ Scholars per Hall',
            'Calibrated Acoustic Baffles & Soundproofing Wall Treatment',
            'Individual Ergonomic Leatherette Desks with Charging Consoles',
            'Central High-Efficiency Climate Control with Dual Filtered Air'
          ]
        }
      ]
    },
    {
      id: '05',
      title: 'Engineering Workshops',
      motto: 'HEAVY FABRICATION & ADVANCED MATERIALS WORKSHOPS',
      description:
        'Industrial-grade mechanical, civil, and electrical engineering workshops housing 5-axis CNC machining centers, metallurgical casting furnaces, universal tensile testers, and electrical transformer testing rigs.',
      badge: {
        eyebrow: 'INDUSTRIAL WORKSHOP ECOSYSTEM',
        title: '5-Axis CNC Centers · Heavy Tensile Rigs'
      },
      image: '/assets/images/college_tech_lab_1793988185936.jpg',
      imageAlt: 'Mechanical Engineering and Tech Workshop Floor',
      snapshots: ['5-Axis CNC Milling', 'Tensile Material Rigs', 'High-Voltage Transformer Bay', 'Industrial PLC Racks'],
      categories: [
        {
          name: '1. Precision Machining & Material Testing',
          items: [
            '5-Axis CNC Vertical Machining Centers & Industrial Lathes',
            'Computerized Universal Tensile & Compression Testing Machines',
            'Metallurgical Microscopes & Rockwell Hardness Testers',
            'Gas Metal Arc & TIG Robotic Welding Simulation Stations'
          ]
        },
        {
          name: '2. Electrical Drives & Fluid Machinery',
          items: [
            'Pelton & Francis Turbine Hydrodynamics Flow Flumes',
            'High-Voltage AC/DC Machine Testbeds & Transformer Calibration',
            'Industrial Automation Racks with Siemens & Schneider PLCs',
            'Thermal Heat Exchanger & Refrigeration Demonstration Rigs'
          ]
        }
      ]
    },
    {
      id: '06',
      title: 'AR/VR Simulation Studio',
      motto: 'IMMERSIVE SPATIAL COMPUTING & XR FOUNDRY',
      description:
        'A dedicated extended-reality studio equipped with HTC Vive Pro, Meta Quest headsets, spatial 3D audio chambers, and motion tracking sensors for aerospace, surgical training, and architectural prototyping.',
      badge: {
        eyebrow: 'SPATIAL COMPUTING & SIMULATION',
        title: 'Meta Quest 3 & HTC Vive Pro XR Suites'
      },
      image: '/assets/images/about_students_vr_lab.jpg',
      imageAlt: 'Students Collaborating in Virtual Reality Simulation Studio',
      snapshots: ['Meta Quest 3 Stations', 'HTC Vive Pro XR Suites', 'Unreal Engine 5 Foundry', 'Spatial Audio Chambers'],
      categories: [
        {
          name: '1. Extended Reality Hardware Rigs',
          items: [
            'HTC Vive Pro 2 & Meta Quest 3 Spatial Headsets with Hand Tracking',
            '360-Degree Omni-Directional Locomotion VR Treadmill Platforms',
            'Sub-Millimeter Optical Motion Capture Infrared Camera Rigs',
            'Spatial Dolby Atmos Sound Chambers with Haptic Vest Feedback'
          ]
        },
        {
          name: '2. Spatial Engines & Simulation Software',
          items: [
            'Unreal Engine 5 & Unity Photorealistic Medical XR Simulators',
            'CAD 3D BIM Model Virtual Walkthrough & Structural Inspection',
            'Virtual Flight Simulator with Dual Pilot HOTAS Controls',
            'Collaborative Multi-User Metaverse Research Workstations'
          ]
        }
      ]
    },
    {
      id: '07',
      title: 'Cafeteria & Dining Court',
      motto: 'HYGIENIC DINING & VIBRANT STUDENT SOCIAL HUB',
      description:
        'Our modern cafeteria concourse seats over 650 students across indoor air-conditioned and open-air terrace pavilions, offering wholesome multi-cuisine culinary options prepared to strict HACCP food safety standards.',
      badge: {
        eyebrow: 'CULINARY EXCELLENCE & NUTRITION',
        title: '650+ Seating Capacity · HACCP Certified'
      },
      image: '/assets/images/college_campus_hero_1793988186342.jpg',
      imageAlt: 'Multi-Cuisine Student Cafeteria',
      snapshots: ['HACCP Certified Kitchen', '650+ Seating Concourse', 'Multi-Cuisine Counters', 'Industrial RO Plant'],
      categories: [
        {
          name: '1. Food Standards & Dining Amenities',
          items: [
            'HACCP & FSSAI Certified Hygienic Food Preparation Standards',
            'North Indian, South Indian, Continental & Odia Cuisines',
            'Fresh Fruit Juice Bar, Espresso Coffee Lounge & Bakery Counter',
            'Multi-Stage Industrial RO Water Purification Plants'
          ]
        },
        {
          name: '2. Student Dining Experience',
          items: [
            '650+ Indoor Air-Conditioned & Al-Fresco Terrace Seating',
            'Subsidized Monthly Student Meal Passes & Cashless Digital Billing',
            'Special Dietary Vegetarian & Protein Fitness Meal Options',
            'Extended Night Concourse Hours During Examination Weeks'
          ]
        }
      ]
    },
    {
      id: '08',
      title: 'Sports & Athletics Arena',
      motto: 'PHYSICAL VITALITY & CHAMPIONSHIP ATHLETICS',
      description:
        'A comprehensive multi-sport stadium ecosystem featuring floodlit basketball courts, FIFA-standard turf football grounds, cricket training nets, indoor badminton pavilions, and a modern air-conditioned gym.',
      badge: {
        eyebrow: 'PHYSICAL WELLNESS & TROPHIES',
        title: 'Multi-Sport Complex · Certified Fitness Trainers'
      },
      image: '/assets/images/college_convocation_1793988239815.jpg',
      imageAlt: 'College Athletics and Sports Arena',
      snapshots: ['FIFA Football Turf', 'Floodlit Basketball Arena', 'BWF Badminton Courts', 'Air-Conditioned Gym'],
      categories: [
        {
          name: '1. Outdoor Grounds & Tournaments',
          items: [
            'FIFA-Standard Natural Turf Football & Athletic Running Track',
            'Dual Floodlit Polyurethane Basketball & Volleyball Courts',
            'Full-Size Cricket Field with Professional Turf Practice Nets',
            'Annual Inter-Collegiate Olympus Sports Championship'
          ]
        },
        {
          name: '2. Indoor Pavilion & Fitness Center',
          items: [
            'Four BWF-Grade Synthetic Badminton Indoor Courts',
            'Air-Conditioned Gym with TechnoGym Cardio & Strength Equipment',
            'Indoor Table Tennis, Billiards & Chess Tournament Lounge',
            'Dedicated Yoga, Meditation & Martial Arts Dojo Pavilion'
          ]
        }
      ]
    },
    {
      id: '09',
      title: 'Smart Eco-Hostels & Campus',
      motto: 'HOME AWAY FROM HOME · 10+ ACRES GREEN LIVING',
      description:
        'Secure, vibrant on-campus student residences surrounded by 10+ acres of manicured botanical greens in Infocity. Features Wi-Fi enabled wings, 24/7 solar backup power, and dedicated warden care.',
      badge: {
        eyebrow: 'RESIDENTIAL LIVING & SECURITY',
        title: '10+ Acres Green Living · 24/7 Security'
      },
      image: '/assets/images/college_campus_quad_1793988224316.jpg',
      imageAlt: 'Green Campus Quadrangle & Student Hostels',
      snapshots: ['Furnished AC Suites', '100% Solar Rooftop', '24/7 RFID Security', '10+ Acres Greenery'],
      categories: [
        {
          name: '1. Residential Accommodations',
          items: [
            'Furnished Double & Triple Occupancy AC & Non-AC Rooms',
            'Ergonomic Work Desks, High-Speed Wi-Fi & Wardrobe Storage',
            'Common Lounges with Satellite TV, Indoor Games & Library Nooks',
            'On-Campus Automated Laundromat & Housekeeping Services'
          ]
        },
        {
          name: '2. Safety, Health & Sustainability',
          items: [
            '24/7 Biometric RFID Access Control & CCTV Surveillance',
            'Dedicated On-Campus Medical Health Dispensary & Ambulance',
            '100% Solar-Powered Rooftop Clean Energy Generation',
            'Zero-Discharge Eco-Friendly Rainwater Harvesting Systems'
          ]
        }
      ]
    }
  ];

  // 6 Student Technical Clubs & Societies (Cinematic Card Carousel & Impact Data)
  const clubsData = [
    {
      id: '01',
      category: 'AUTONOMOUS SYSTEMS & HARDWARE',
      tabCategory: 'ROBOTICS & HARDWARE',
      tabTitle: 'TRDC Autonomous Systems & Drones',
      headerTag: 'ROBOTICS & EMBEDDED · TRDC',
      headerDotColor: 'bg-[#1E3A8A]',
      headerTextColor: 'text-[#1E3A8A]',
      name: 'Trident Robotics & Drone Club (TRDC)',
      image: '/campus-clubs/trdc_robotics_drones.jpg',
      accentGradient: 'from-blue-950/95 via-slate-900/80 to-slate-950/95',
      badgeText: '320+ Makers · 12 UAVs',
      members: 320,
      pillars: [
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Cpu,
          eyebrow: 'AUTONOMOUS UAVS & ROVERS',
          headline: 'Breadboards to Autonomous Flight',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Building autonomous UAV quadcopters, maze-solving rovers, computer-vision robotic arms, and agricultural field sensors with complete onboard telemetry.'
        },
        {
          badgeBg: 'bg-[#047857]',
          iconColor: 'text-white',
          icon: Terminal,
          eyebrow: 'ACTIVE ROBOTICS COMMUNITY',
          headline: '320+ Active Makers & Engineers',
          headlineColor: 'text-[#047857]',
          description:
            'Hands-on weekend build sprints in the maker lab, ROS2 simulations, Raspberry Pi / STM32 microcontroller programming, and Cadence PCB fabrication.'
        },
        {
          badgeBg: 'bg-[#926315]',
          iconColor: 'text-white',
          icon: Trophy,
          eyebrow: 'COMPETITIONS & RECOGNITION',
          headline: 'National Maker Champions',
          headlineColor: 'text-[#926315]',
          description:
            'Consistent podium finishes at IIT Bombay Techfest, e-Yantra Robotics, and national UAV speed rally marathons across India.'
        }
      ]
    },
    {
      id: '02',
      category: 'COMPETITIVE PROGRAMMING & AI',
      tabCategory: 'ALGORITHMS & AI',
      tabTitle: 'CodeNation & AI Developer Circle',
      headerTag: 'SOFTWARE & AI · CODENATION',
      headerDotColor: 'bg-[#047857]',
      headerTextColor: 'text-[#047857]',
      name: 'CodeNation & AI Developer Circle',
      image: '/campus-clubs/codenation_ai_hackathons.jpg',
      accentGradient: 'from-emerald-950/95 via-slate-900/80 to-slate-950/95',
      badgeText: '450+ Coders · SIH Finalists',
      members: 450,
      pillars: [
        {
          badgeBg: 'bg-[#047857]',
          iconColor: 'text-white',
          icon: Code2,
          eyebrow: 'ALGORITHMIC RIGOR & HACKATHONS',
          headline: 'LeetCode & Hackathon Sprints',
          headlineColor: 'text-[#047857]',
          description:
            'Weekly algorithm workshops, competitive coding sprints on LeetCode/CodeChef, and full-stack hackathon project teams building generative AI solutions.'
        },
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Layers,
          eyebrow: 'DEVELOPER ECOSYSTEM',
          headline: '450+ Active Programmers',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Mentorship circles pairing freshman coders with senior alumni placed at Google, Microsoft, Amazon, and premier high-frequency trading firms.'
        },
        {
          badgeBg: 'bg-[#926315]',
          iconColor: 'text-white',
          icon: Award,
          eyebrow: 'SMART INDIA HACKATHON',
          headline: 'National Hackathon Finalists',
          headlineColor: 'text-[#926315]',
          description:
            'Multiple teams qualifying annually for the Smart India Hackathon Grand Finale and international ICPC regional competitive programming rounds.'
        }
      ]
    },
    {
      id: '03',
      category: 'ENTREPRENEURSHIP & VENTURES',
      tabCategory: 'STARTUPS & VENTURES',
      tabTitle: 'E-Cell & Startup Incubation Forum',
      headerTag: 'INCUBATION & VENTURES · E-CELL',
      headerDotColor: 'bg-[#926315]',
      headerTextColor: 'text-[#926315]',
      name: 'E-Cell & Startup Incubation Forum',
      image: '/campus-clubs/ecell_startup_incubation.jpg',
      accentGradient: 'from-amber-950/95 via-slate-900/80 to-slate-950/95',
      badgeText: '280+ Founders · 18 Startups',
      members: 280,
      pillars: [
        {
          badgeBg: 'bg-[#926315]',
          iconColor: 'text-white',
          icon: Briefcase,
          eyebrow: 'VENTURE INCUBATION & SEED GRANTS',
          headline: 'Ideas to Registered Enterprises',
          headlineColor: 'text-[#926315]',
          description:
            'Transforming student inventions into registered enterprises through seed pitching, mentor roundtables, IPR patent filings, and angel investment access.'
        },
        {
          badgeBg: 'bg-[#C41F3B]',
          iconColor: 'text-white',
          icon: Binary,
          eyebrow: 'STUDENT FOUNDER NETWORK',
          headline: '280+ Student Founders & Innovators',
          headlineColor: 'text-[#C41F3B]',
          description:
            'Dedicated on-campus incubation co-working suites, legal incorporation advisory, and quarterly investor demo days with Odisha VC ecosystems.'
        },
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Award,
          eyebrow: 'VENTURE PORTFOLIO',
          headline: '18+ Funded Student Startups',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Over 18+ startups successfully launched by undergraduate alumni across IoT agri-tech, fintech, edtech, and SaaS enterprise cloud services.'
        }
      ]
    },
    {
      id: '04',
      category: 'MUSIC, DANCE & DRAMA',
      tabCategory: 'CULTURAL ARTS',
      tabTitle: 'Srijan Cultural & Performing Arts',
      headerTag: 'CREATIVE ARTS · SRIJAN',
      headerDotColor: 'bg-[#C41F3B]',
      headerTextColor: 'text-[#C41F3B]',
      name: 'Srijan Cultural & Performing Arts Society',
      image: '/campus-clubs/srijan_cultural_arts.jpg',
      accentGradient: 'from-rose-950/95 via-slate-900/80 to-slate-950/95',
      badgeText: '220+ Artists · Annual Fest',
      members: 220,
      pillars: [
        {
          badgeBg: 'bg-[#C41F3B]',
          iconColor: 'text-white',
          icon: Music,
          eyebrow: 'ACOUSTICS, THEATRE & CLASSICAL DANCE',
          headline: 'Creative Expression on Stage',
          headlineColor: 'text-[#C41F3B]',
          description:
            'Vibrant acoustic music bands, classical Odissi and Bharatnatyam ensembles, street drama productions, and inter-college cultural representations.'
        },
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Users,
          eyebrow: 'PERFORMING TALENT POOL',
          headline: '220+ Performing Artists',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Weekly acoustic jam sessions, theatrical drama rehearsals, script reading circles, and sound engineering workshops in the campus auditorium.'
        },
        {
          badgeBg: 'bg-[#047857]',
          iconColor: 'text-white',
          icon: Sparkles,
          eyebrow: 'ANNUAL CULTURAL EXTRAVAGANZA',
          headline: 'Flagship Srijan Annual Fest',
          headlineColor: 'text-[#047857]',
          description:
            'Organizing Eastern India beloved inter-college annual cultural festival with over 5,000+ visiting student delegates and celebrity musical concerts.'
        }
      ]
    },
    {
      id: '05',
      category: 'SPORTS & ATHLETICS',
      tabCategory: 'ATHLETICS & WELLNESS',
      tabTitle: 'Olympus Athletics & Sports Council',
      headerTag: 'ATHLETICS & FITNESS · OLYMPUS',
      headerDotColor: 'bg-[#0D9488]',
      headerTextColor: 'text-[#0D9488]',
      name: 'Olympus Athletics & Sports Council',
      image: '/campus-clubs/olympus_athletics_sports.jpg',
      accentGradient: 'from-teal-950/95 via-slate-900/80 to-slate-950/95',
      badgeText: '380+ Athletes · 14 Sports',
      members: 380,
      pillars: [
        {
          badgeBg: 'bg-[#0D9488]',
          iconColor: 'text-white',
          icon: Trophy,
          eyebrow: 'INTER-COLLEGE TOURNAMENTS',
          headline: 'Competitive League Sports',
          headlineColor: 'text-[#0D9488]',
          description:
            'Organizing premier inter-college cricket championships, basketball tournaments, badminton open trophies, and football leagues under floodlights.'
        },
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Users,
          eyebrow: 'ATHLETIC COUNCIL',
          headline: '380+ Student Athletes',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Daily training sessions overseen by university sports directors on modern turf grounds, synthetic badminton courts, and modern gym facilities.'
        },
        {
          badgeBg: 'bg-[#926315]',
          iconColor: 'text-white',
          icon: ShieldCheck,
          eyebrow: 'CHAMPIONSHIP HONORS',
          headline: 'TCT Inter-University Trophies',
          headlineColor: 'text-[#926315]',
          description:
            'Multiple consecutive gold championships in BPUT inter-university athletics, volleyball, table tennis, and powerlifting tournaments.'
        }
      ]
    },
    {
      id: '06',
      category: 'SOCIAL RESPONSIBILITY & ECOLOGY',
      tabCategory: 'SOCIAL RESPONSIBILITY',
      tabTitle: 'Unnat Bharat & Green Eco Council',
      headerTag: 'COMMUNITY & ECOLOGY · UNNAT BHARAT',
      headerDotColor: 'bg-[#047857]',
      headerTextColor: 'text-[#047857]',
      name: 'Unnat Bharat & Green Eco Council',
      image: '/campus-clubs/unnat_bharat_eco_council.jpg',
      accentGradient: 'from-green-950/95 via-slate-900/80 to-slate-950/95',
      badgeText: '190+ Volunteers · 15 Villages',
      members: 190,
      pillars: [
        {
          badgeBg: 'bg-[#047857]',
          iconColor: 'text-white',
          icon: Landmark,
          eyebrow: 'VILLAGE ADOPTION & EMPOWERMENT',
          headline: 'Grassroots Technical Outreach',
          headlineColor: 'text-[#047857]',
          description:
            'Community development drives, rural school digital literacy programs, solar irrigation installations, and local technical empowerment.'
        },
        {
          badgeBg: 'bg-[#1E3A8A]',
          iconColor: 'text-white',
          icon: Users,
          eyebrow: 'COMMUNITY STEWARDS',
          headline: '190+ Active Volunteers',
          headlineColor: 'text-[#1E3A8A]',
          description:
            'Zero-plastic campus monitoring, campus botanical nursery upkeep, e-waste recycling drives, and annual blood donation camps with the Red Cross.'
        },
        {
          badgeBg: 'bg-[#C41F3B]',
          iconColor: 'text-white',
          icon: Sparkles,
          eyebrow: 'SUSTAINABILITY RECOGNITION',
          headline: 'Green Campus Benchmark',
          headlineColor: 'text-[#C41F3B]',
          description:
            'Recognized by state pollution authorities for maintaining 10+ acres of carbon-neutral green tree cover and rainwater harvesting infrastructure.'
        }
      ]
    }
  ];
  // Pinned Horizontal Scroll with GSAP ScrollTrigger: locks section, smoothly moves heading upward, and scrubs cards
  useEffect(() => {
    const section = clubsSectionRef.current;
    const track = clubsScrollRef.current;
    const header = clubsHeaderRef.current;
    const trackContainer = clubsTrackContainerRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        // Desktop / Laptop: Pin the section, move heading upward to maximize view, and scrub cards
        const getDistance = () => {
          return track.scrollWidth - window.innerWidth + 140;
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: 'top 70px',
            end: () => `+=${Math.max(1100, getDistance() + 450)}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
              setCanScrollLeft(self.progress > 0.02);
              setCanScrollRight(self.progress < 0.98);
            }
          }
        });

        // 1. As user begins scrolling: heading moves UPWARD and fades out cleanly
        if (header) {
          tl.to(header, {
            y: -240,
            opacity: 0,
            ease: 'power1.out',
            duration: 0.18,
          }, 0);
        }

        // 2. Simultaneously: cards track container moves UPWARD so the full cards fit the viewport
        if (trackContainer) {
          tl.to(trackContainer, {
            y: -200,
            ease: 'power1.out',
            duration: 0.18,
          }, 0);
        }

        // 3. Scrub cards track horizontally across the screen
        tl.to(track, {
          x: () => -Math.max(0, getDistance()),
          ease: 'none',
          duration: 0.94,
        }, 0.06);

        clubsTriggerRef.current = tl.scrollTrigger;

        return () => {
          tl.kill();
        };
      });

      mm.add('(max-width: 767px)', () => {
        // Mobile / Small screen: reset x and y so standard touch swipe works
        gsap.set(track, { x: 0 });
        if (header) gsap.set(header, { y: 0, opacity: 1 });
        if (trackContainer) gsap.set(trackContainer, { y: 0 });
        clubsTriggerRef.current = null;
      });
    }, section);

    // Trackpad horizontal swipe listener: smoothly maps horizontal deltaX to vertical window scroll when pinned
    const onTrackpadWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
        const st = clubsTriggerRef.current;
        if (st && window.scrollY >= st.start && window.scrollY <= st.end) {
          e.preventDefault();
          window.scrollBy({ top: e.deltaX * 1.2 });
        }
      }
    };

    window.addEventListener('wheel', onTrackpadWheel, { passive: false });

    // Refresh ScrollTrigger once images/fonts are fully rendered
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);

    return () => {
      window.removeEventListener('wheel', onTrackpadWheel);
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // Scroll-triggered text entrance and synchronized 2-second count-up animation
  useEffect(() => {
    const section = statsRef.current;
    if (!section) return;

    let animFrame: number;
    let hasAnimated = false;

    const ctx = gsap.context(() => {
      // 1. Text elements coming out smoothly on scroll with stagger
      gsap.fromTo(
        '.stat-text-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none none',
          }
        }
      );

      // 2. Division cards coming out smoothly on scroll with stagger
      gsap.fromTo(
        '.stat-card-reveal',
        { opacity: 0, y: 55, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            toggleActions: 'play none none none',
            onEnter: () => {
              if (hasAnimated) return;
              hasAnimated = true;

              // Exact 2-second synchronized count-up: all numbers finish at the exact same millisecond
              const targets = { clubs: 20, members: 2500, events: 50, trophies: 14 };
              const startTime = performance.now();
              const duration = 2000; // exactly 2 seconds

              const update = (now: number) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Unified smooth cubic ease-out
                const ease = 1 - Math.pow(1 - progress, 3);

                setStats({
                  clubs: Math.round(targets.clubs * ease),
                  members: Math.round(targets.members * ease),
                  events: Math.round(targets.events * ease),
                  trophies: Math.round(targets.trophies * ease)
                });

                if (progress < 1) {
                  animFrame = requestAnimationFrame(update);
                } else {
                  // Guarantee all numbers reach their final values simultaneously at 2.0s
                  setStats(targets);
                }
              };

              animFrame = requestAnimationFrame(update);
            }
          }
        }
      );
    }, section);

    return () => {
      ctx.revert();
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, []);

  // ScrollTrigger: Facilities sticky left showcase syncing & entrance animations
  useEffect(() => {
    const section = facilitiesSectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      campusFacilitiesData.forEach((facility, index) => {
        const facEl = facilityRefs.current[index];
        if (!facEl) return;

        const header = facEl.querySelector('.facility-header-reveal');
        const motto = facEl.querySelector('.facility-motto-reveal');
        const desc = facEl.querySelector('.facility-desc-reveal');
        const badge = facEl.querySelector('.facility-badge-reveal');
        const snapshots = facEl.querySelector('.facility-snapshots-reveal');
        const catHeaders = facEl.querySelectorAll('.facility-cat-reveal');
        const rows = facEl.querySelectorAll('.facility-row-reveal');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: facEl,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        });

        if (header) {
          tl.fromTo(header, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' });
        }
        if (motto) {
          tl.fromTo(motto, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3');
        }
        if (desc) {
          tl.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');
        }
        if (badge) {
          tl.fromTo(badge, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.2');
        }
        if (snapshots) {
          tl.fromTo(snapshots, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');
        }
        if (catHeaders.length) {
          tl.fromTo(catHeaders, { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, '-=0.2');
        }
        if (rows.length) {
          tl.fromTo(
            rows,
            { opacity: 0, x: -20, scale: 0.97 },
            { opacity: 1, x: 0, scale: 1, duration: 0.45, stagger: 0.04, ease: 'back.out(1.2)' },
            '-=0.3'
          );
        }

        ScrollTrigger.create({
          trigger: facEl,
          start: index === 0 ? 'top 70%' : 'top 45%',
          end: index === campusFacilitiesData.length - 1 ? 'bottom 20%' : 'bottom 45%',
          onEnter: () => setActiveFacilityIndex(index),
          onEnterBack: () => setActiveFacilityIndex(index)
        });
      });
    }, facilitiesSectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FAF9F5] pb-24">
      
      {/* =========================================================================
          HERO SECTION: Equal size & exact gradient format as Landing & Academics Page
          ========================================================================= */}
      <section className="relative w-full h-screen min-h-[100dvh] bg-stone-950 overflow-hidden flex flex-col justify-between">
        
        {/* Background Campus Life Hero Image (Uploaded by user) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/campus_life_hero.jpg"
            alt="Vibrant Student Campus Life & Community Walk"
            className="w-full h-full object-cover object-center scale-102"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/images/college_campus_hero_1793988186342.jpg';
            }}
          />
        </div>

        {/* Soft black gradient on the left side: Exactly matching landing page */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.94) 0%, rgba(0, 0, 0, 0.86) 28%, rgba(0, 0, 0, 0.65) 48%, rgba(0, 0, 0, 0.3) 68%, rgba(0, 0, 0, 0.08) 84%, transparent 100%)'
          }}
        />

        {/* Top subtle gradient for header legibility */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.3) 18%, transparent 35%)'
          }}
        />

        {/* Bottom subtle gradient for bottom strip */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.45) 16%, transparent 34%)'
          }}
        />

        {/* Top Spacer to preserve perfect headline spacing when navbar is fixed */}
        <div className="w-full h-24 sm:h-28 pointer-events-none select-none" aria-hidden="true" />

        {/* Hero Content Zone: Matching landing page serif headline and typography */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 w-full my-auto pb-6">
          <div className="max-w-2xl text-left">
            
            {/* Main Huge Serif Headline (Matching landing page typography) */}
            <h1 className="font-serif font-bold text-white text-5xl sm:text-6xl md:text-7xl lg:text-[78px] leading-[1.06] tracking-tight drop-shadow-md">
              Vibrant campus<br />
              life &amp;<br />
              community
            </h1>

            {/* Subtitle / Descriptive Text */}
            <p className="text-white/90 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl mt-5 drop-shadow-xs">
              Experience life on our 10+ acres eco-friendly smart campus in Bhubaneswar. Beyond academics: 24/7 central digital library, innovation hubs, vibrant cultural festivals, sports leagues, and residential communities.
            </p>

            {/* Action CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  const target = document.getElementById('campus-facilities');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 sm:px-8 py-3.5 rounded-md bg-[#E03D2E] hover:bg-[#c93224] active:scale-98 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-red-950/40 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Facilities</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const target = document.getElementById('student-clubs');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3.5 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Student Clubs &amp; Societies</span>
                <ChevronRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>

          </div>
        </div>

        {/* Hero Bottom Strip: Key Highlights */}
        <div className="relative z-20 w-full px-4 sm:px-8 pb-7 sm:pb-9">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15 text-xs text-white/90">
            <span className="flex items-center gap-2 font-medium">
              <Landmark className="w-4 h-4 text-cyan-400" />
              <span>10+ Acres Eco-Friendly Smart Campus</span>
            </span>
            <span className="flex items-center gap-2 font-medium">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>24/7 Air-Conditioned Central Digital Library</span>
            </span>
            <span className="flex items-center gap-2 font-medium">
              <Trophy className="w-4 h-4 text-emerald-400" />
              <span>Multi-Sport Complex &amp; Gymnasium</span>
            </span>
            <span className="flex items-center gap-2 font-medium">
              <Users className="w-4 h-4 text-rose-400" />
              <span>25+ Technical &amp; Cultural Student Clubs</span>
            </span>
          </div>
        </div>

      </section>

      {/* =========================================================================
          WORLD-CLASS CAMPUS INFRASTRUCTURE (50/50 SPLIT CINEMATIC SECTION)
          - Headings: Playfair Display font (font-playfair font-bold)
          - 9 Premier Campus Facilities showcasing all campus spaces & images
          - Divider: The image container itself is curved (S-curve clipPath) - NOT curved lines drawn on top!
          - Background: 2D multi-colored flowing wavy background matching reference image
          ========================================================================= */}
      <section
        id="campus-facilities"
        ref={facilitiesSectionRef}
        className="relative w-full bg-[#FAF7F2] border-t border-b border-stone-200 scroll-mt-10 overflow-hidden"
      >
        {/* SVG Curved Divider ClipPath Definition (The boundary itself is an S-curve, no drawn lines) */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <clipPath id="curved-divider-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0,0 L 0.94,0 C 1.02,0.28 0.86,0.72 0.94,1 L 0,1 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* PART A: FULL-WIDTH HEADER STRIP */}
        <div className="w-full bg-white/95 border-b border-stone-200/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
                  <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-[#0D9488] uppercase">
                    CAMPUS LIFE &amp; INFRASTRUCTURE
                  </span>
                </div>
                {/* Grand Larger Heading in Playfair Display */}
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-[#111827] leading-[1.05] tracking-tight mb-4">
                  World-Class Campus{' '}
                  <span className="italic font-playfair font-normal text-[#0D9488] block sm:inline">
                    Infrastructure.
                  </span>
                </h2>
                <p className="text-stone-700 text-sm sm:text-base lg:text-lg sm:leading-relaxed font-sans max-w-2xl">
                  Explore our modern 10+ acre campus ecosystem featuring 24/7 digital libraries, AI supercomputing labs, robotics maker fablabs, lecture amphitheaters, engineering workshops, AR/VR studios, dining courts, and Olympic athletic pavilions.
                </p>
              </div>

              {/* Quality Badges Strip */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono shrink-0">
                <span className="px-4 py-2 rounded-full bg-white/95 border border-stone-300/80 shadow-xs text-stone-800 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  10+ Acres Smart Campus
                </span>
                <span className="px-4 py-2 rounded-full bg-white/95 border border-stone-300/80 shadow-xs text-stone-800 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  9 Specialized Spaces
                </span>
                <span className="px-4 py-2 rounded-full bg-white/95 border border-stone-300/80 shadow-xs text-stone-800 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  NBA Tier-1 &amp; NAAC A+
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PART B: 50/50 SPLIT SHOWCASE WITH CURVED BOUNDARY */}
        <div className="w-full relative overflow-hidden bg-[#FAF7F2]">
          <div className="w-full flex flex-col lg:flex-row items-start relative">

            {/* LEFT COLUMN: 50% WIDTH STICKY SHOWCASE WITH CURVED RIGHT EDGE (THE DIVIDER IS THE CURVE) */}
            <div className="w-full lg:w-[52%] lg:sticky lg:top-0 h-[480px] sm:h-[600px] lg:h-screen self-start overflow-hidden bg-stone-950 z-20 lg:[clip-path:url(#curved-divider-clip)] lg:[filter:drop-shadow(10px_0_24px_rgba(0,0,0,0.22))]">
              {campusFacilitiesData.map((facility, fIdx) => {
                const isActive = activeFacilityIndex === fIdx;

                return (
                  <div
                    key={facility.id}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isActive
                        ? 'opacity-100 scale-100 z-10'
                        : 'opacity-0 scale-105 z-0 pointer-events-none'
                    }`}
                  >
                    {/* Full 50% width facility photo */}
                    <img
                      src={facility.image}
                      alt={facility.imageAlt}
                      className="w-full h-full object-cover"
                    />

                    {/* Smooth Cinematic Gradient Overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.6) 24%, rgba(15, 23, 42, 0.2) 44%, transparent 70%)'
                      }}
                    />

                    {/* Facility Title in Playfair Display Font & Motto at Bottom Left */}
                    <div className="absolute bottom-8 sm:bottom-12 inset-x-8 sm:inset-x-12 z-20 space-y-2 pointer-events-none">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 inline-block mb-1">
                        Facility {facility.id} of 09
                      </span>
                      <h3 className="font-playfair font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight drop-shadow-md">
                        {facility.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-stone-200 font-bold drop-shadow-sm">
                        {facility.motto}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: 50% WIDTH SCROLLING CONTENT WITH 2D MULTI-COLORED WAVY REFERENCE BACKGROUND */}
            <div className="w-full lg:w-[50%] lg:-ml-[2%] relative bg-[#FAF7F2]">
              {/* STICKY REFERENCE 2D MULTI-COLORED WAVY BACKGROUND (DESKTOP) */}
              <div className="hidden lg:block sticky top-0 h-screen w-full -mb-[100vh] pointer-events-none z-0 overflow-hidden">
                <img
                  src="/campus-facilities/wavy-2d-colored-bg.jpg"
                  alt=""
                  className="w-full h-full object-cover object-center opacity-85"
                />
              </div>

              {/* MOBILE BACKGROUND */}
              <div className="lg:hidden absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <img
                  src="/campus-facilities/wavy-2d-colored-bg.jpg"
                  alt=""
                  className="w-full h-full object-cover object-center opacity-85"
                />
              </div>

              {/* Scrolling Content */}
              <div className="relative z-10 px-8 sm:px-12 lg:pl-16 lg:pr-12 xl:pl-20 xl:pr-16 py-16 sm:py-24 space-y-24 sm:space-y-32">
                {campusFacilitiesData.map((facility, fIdx) => {
                  return (
                    <div
                      key={facility.id}
                      ref={(el) => { facilityRefs.current[fIdx] = el; }}
                      className="facility-section relative"
                    >
                      {/* Header Row: Facility Title in Playfair Display Font + Circular Action Button */}
                      <div className="facility-header-reveal flex items-start justify-between gap-4 mb-2">
                        <div>
                          <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#0D9488] block mb-1">
                            CAMPUS INFRASTRUCTURE · {facility.id}
                          </span>
                          <h3 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-[42px] text-stone-900 tracking-tight leading-[1.2]">
                            {facility.title}
                          </h3>
                        </div>

                        <button
                          onClick={() => onNavigate('contact')}
                          aria-label={`Schedule visit for ${facility.title}`}
                          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-stone-800 hover:bg-[#0D9488] text-white flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm hover:scale-105 cursor-pointer mt-1"
                        >
                          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                      </div>

                      {/* Motto */}
                      <p className="facility-motto-reveal text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase text-stone-600 mb-4">
                        {facility.motto}
                      </p>

                      {/* Editorial Description */}
                      <p className="facility-desc-reveal text-stone-700 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mb-6">
                        {facility.description}
                      </p>

                      {/* Optional Badge */}
                      {facility.badge && (
                        <div className="facility-badge-reveal mb-6 inline-block px-5 py-3 rounded-xl bg-white/90 backdrop-blur-xs border border-stone-200/90 shadow-2xs">
                          <span className="text-[10px] font-mono font-bold tracking-widest text-[#0D9488] uppercase block">
                            {facility.badge.eyebrow}
                          </span>
                          <span className="text-base font-bold text-stone-900 block mt-0.5">
                            {facility.badge.title}
                          </span>
                        </div>
                      )}

                      {/* Key Snapshots & Visual Provisions Strip */}
                      <div className="facility-snapshots-reveal mb-8">
                        <span className="text-[10px] font-mono font-bold tracking-wider text-stone-500 uppercase block mb-2.5">
                          KEY INFRASTRUCTURE HIGHLIGHTS
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {facility.snapshots.map((snap, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-xs border border-stone-300/80 text-xs font-mono font-semibold text-stone-800 shadow-2xs flex items-center gap-1.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
                              {snap}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Categories and Divided Specification Rows */}
                      <div className="space-y-6">
                        {facility.categories.map((category, cIdx) => (
                          <div key={cIdx} className="space-y-1">
                            {/* Category Header in Playfair Display */}
                            <h4 className="facility-cat-reveal font-playfair font-bold text-base sm:text-lg tracking-tight text-stone-900 pt-4 pb-2 border-b border-stone-300/60">
                              {category.name}
                            </h4>

                            {/* Amenity / Spec rows with horizontal dividing lines and right arrows */}
                            <div className="space-y-0">
                              {category.items.map((item, iIdx) => (
                                <div
                                  key={iIdx}
                                  onClick={() => onNavigate('contact')}
                                  className="facility-row-reveal group flex items-center justify-between py-3.5 sm:py-4 border-b border-stone-300/70 hover:border-[#0D9488] cursor-pointer transition-colors"
                                >
                                  <span className="text-stone-800 text-sm sm:text-base font-medium group-hover:text-[#0D9488] transition-colors pr-4">
                                    {item}
                                  </span>
                                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#0D9488] group-hover:translate-x-1 transition-all shrink-0" />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          Student Technical Clubs & Societies (Pinned Horizontal Scrub & Screen Recording Style)
          ========================================================================= */}
      <section 
        id="student-clubs"
        ref={clubsSectionRef}
        className="relative w-full pt-8 sm:pt-12 pb-10 sm:pb-14 bg-[#FAF8F5] border-t border-b border-stone-200 scroll-mt-10 overflow-hidden"
      >
        {/* Subtle Background Pastel Ambience */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-10 -left-20 w-[500px] h-[500px] rounded-full bg-[#EADBEC]/50 blur-3xl" />
          <div className="absolute top-1/2 -right-24 w-[460px] h-[460px] rounded-full bg-[#E2EFE7]/60 blur-3xl" />
          <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] rounded-full bg-[#FBEFE3]/60 blur-3xl" />
        </div>

        <div ref={clubsHeaderRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 will-change-transform">
          {/* Header Row */}
          <div className="max-w-3xl mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#0D9488] uppercase">
                STUDENT CLUBS &amp; SOCIETIES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#111827] leading-[1.1] tracking-tight mb-2">
              Student Technical<br />
              Clubs &amp; <span className="italic font-serif text-[#0D9488] font-normal">Societies.</span>
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm sm:leading-relaxed font-sans max-w-2xl">
              Over 20+ active student-driven organizations, innovation councils, competitive coding circles, and cultural societies shaping talent outside classrooms.
            </p>
          </div>
        </div>

        {/* HORIZONTAL CARDS TRACK WRAPPER (Smoothly moves upward during scroll to fill viewport perfectly) */}
        <div ref={clubsTrackContainerRef} className="relative w-full overflow-hidden z-10 will-change-transform">
          <div 
            ref={clubsScrollRef}
            className="flex gap-6 sm:gap-8 pb-6 pt-2 px-4 sm:px-8 lg:px-12 xl:px-16 will-change-transform md:overflow-visible overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
          >
            {clubsData.map((club) => (
              <div
                key={club.id}
                onClick={() => setSelectedClub(club)}
                style={{ transform: 'skewX(-6deg)' }}
                className="w-[295px] sm:w-[325px] md:w-[345px] h-[430px] sm:h-[455px] lg:h-[470px] shrink-0 rounded-3xl overflow-hidden relative shadow-xl hover:shadow-2xl transition-all duration-500 group snap-start cursor-pointer border border-stone-200/90 bg-stone-900 flex flex-col justify-between p-5 sm:p-6"
              >
                {/* Clear Background Image (scale-115 to seamlessly fill the 6-deg slanted box without clipping gaps) */}
                <img
                  src={club.image}
                  alt={club.name}
                  className="absolute inset-0 w-full h-full object-cover scale-115 transition-transform duration-700 ease-out group-hover:scale-120"
                />

                {/* Gradient: Upper part is 100% CLEAR, lower part has a smooth faded black gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 via-45% to-transparent pointer-events-none" />

                {/* Card Top Row: Category Pill only (No Numbering) - Unskewed for crisp text */}
                <div 
                  style={{ transform: 'skewX(6deg)' }}
                  className="relative z-10 flex items-center justify-between"
                >
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-stone-900 text-[10px] font-mono font-bold tracking-wider uppercase shadow-xs">
                    {club.tabCategory}
                  </span>
                </div>

                {/* Card Bottom Container: Unskewed for crystal-clear readability */}
                <div 
                  style={{ transform: 'skewX(6deg)' }}
                  className="relative z-10 space-y-2.5 pt-4"
                >
                  {/* Eyebrow Tagline */}
                  <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-cyan-300 block drop-shadow-sm">
                    {club.pillars[0]?.eyebrow || club.category}
                  </span>

                  {/* Club Title */}
                  <h3 className="text-xl sm:text-[23px] font-serif font-bold text-white tracking-tight leading-snug drop-shadow-md group-hover:text-emerald-300 transition-colors">
                    {club.name}
                  </h3>

                  {/* Headline Summary */}
                  <p className="text-xs text-stone-200 font-sans line-clamp-2 leading-relaxed drop-shadow-sm">
                    {club.pillars[0]?.headline} · {club.pillars[0]?.description}
                  </p>

                  {/* Bottom Stats & Action Button Row */}
                  <div className="pt-2 flex items-center justify-between border-t border-white/20">
                    <span className="text-xs font-mono font-semibold text-stone-200">
                      {club.badgeText}
                    </span>

                    {/* Circular Action Button with ↗ (Diagonal Arrow) */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:bg-[#0D9488] group-hover:border-[#0D9488] group-hover:text-white transition-all duration-300 shadow-md group-hover:scale-110">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* CARD 7: EXPLORE MORE CARD (Slanted Bended Box matching video blue card, No Numbering) */}
            <div
              onClick={() => onNavigate('contact')}
              style={{ transform: 'skewX(-6deg)' }}
              className="w-[295px] sm:w-[325px] md:w-[345px] h-[430px] sm:h-[455px] lg:h-[470px] shrink-0 rounded-3xl overflow-hidden relative shadow-xl hover:shadow-2xl transition-all duration-500 group snap-start cursor-pointer border border-blue-400/40 bg-gradient-to-br from-[#1E3A8A] via-[#1D4ED8] to-[#0F172A] flex flex-col justify-between p-6 text-white"
            >
              {/* Subtle Dotted Pattern Overlay */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                  backgroundSize: '16px 16px'
                }}
              />

              {/* Top Row: Unskewed */}
              <div 
                style={{ transform: 'skewX(6deg)' }}
                className="relative z-10 flex items-center justify-between"
              >
                <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider uppercase border border-white/30">
                  20+ CHAPTERS
                </span>
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              </div>

              {/* Center Content: Unskewed */}
              <div 
                style={{ transform: 'skewX(6deg)' }}
                className="relative z-10 my-auto text-center space-y-4 px-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto text-amber-300">
                  <Trophy className="w-7 h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-tight">
                  Discover Your Passion Beyond The Classroom.
                </h3>
                <p className="text-xs text-blue-100/90 leading-relaxed max-w-xs mx-auto">
                  From autonomous robotics to classical Odissi arts, find your circle and build leadership that lasts a lifetime.
                </p>

                {/* Center Explore More Pill Button (Yellow/Gold hover from video) */}
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#FACC15] hover:bg-[#FDE047] text-stone-950 font-bold text-xs uppercase tracking-wider font-mono shadow-xl transition-all group-hover:scale-105">
                    <span>EXPLORE ALL CLUBS</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>

              {/* Bottom Row: Unskewed */}
              <div 
                style={{ transform: 'skewX(6deg)' }}
                className="relative z-10 pt-4 border-t border-white/20 text-center"
              >
                <span className="text-[11px] font-mono text-blue-200">
                  Open to all engineering &amp; management branches
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS STATS SECTION: Spatial Gradient Background & Full-Width 4-Division Layout */}
      <section 
        ref={statsRef}
        className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#020617] overflow-hidden border-y border-cyan-500/20"
      >
        {/* Spatial Cosmic & Nebula Gradient Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.18),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#071328] via-50% to-[#020617] pointer-events-none" />
        
        {/* Spatial Glowing Nebula Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/20 blur-[130px] pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] rounded-full bg-indigo-600/20 blur-[150px] pointer-events-none" />
        <div className="absolute -bottom-32 left-1/3 w-[26rem] h-[26rem] rounded-full bg-teal-500/15 blur-[140px] pointer-events-none" />
        <div className="absolute top-1/4 left-2/3 w-80 h-80 rounded-full bg-purple-600/15 blur-[140px] pointer-events-none" />

        {/* Spatial Grid Texture */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />

        {/* Subtle Cosmic Light Horizon Lines */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />

        <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Section Header with Scroll-Triggered Text Reveal */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <div className="stat-text-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              CAMPUS IMPACT &amp; LEADERSHIP
            </div>
            
            <h2 className="stat-text-reveal text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white mb-4">
              Student Life, <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-sky-300 bg-clip-text text-transparent">At a Glance.</span>
            </h2>

            <p className="stat-text-reveal text-sm sm:text-base text-slate-300/90 font-sans max-w-2xl mx-auto leading-relaxed">
              Empowering technical mastery, entrepreneurial ventures, and artistic distinction across an expansive, student-governed ecosystem.
            </p>
          </div>

          {/* 4 Expansive Divisions Spanning Across Entire Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 w-full">
            {/* Division 1: Active Societies */}
            <div className="stat-card-reveal group relative flex flex-col justify-between p-7 sm:p-8 lg:p-9 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-emerald-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.2)] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 opacity-80 group-hover:h-1.5 transition-all duration-300" />
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/25 transition-all duration-500 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300">
                    Division 01
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-white tabular-nums mb-2.5">
                  {stats.clubs}<span className="text-emerald-400">+</span>
                </div>

                <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-emerald-300 font-bold mb-2">
                  Active Societies
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  Technical, coding, robotic, cultural &amp; social councils driving student autonomy.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Council Governance</span>
                <span className="text-emerald-400 font-semibold">100% Student-Led</span>
              </div>
            </div>

            {/* Division 2: Student Members */}
            <div className="stat-card-reveal group relative flex flex-col justify-between p-7 sm:p-8 lg:p-9 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(6,182,212,0.2)] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 opacity-80 group-hover:h-1.5 transition-all duration-300" />
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-cyan-500/10 blur-2xl group-hover:bg-cyan-500/25 transition-all duration-500 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
                    Division 02
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-white tabular-nums mb-2.5">
                  {stats.members.toLocaleString()}<span className="text-cyan-400">+</span>
                </div>

                <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-cyan-300 font-bold mb-2">
                  Student Members
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  Active makers, coders, startup founders, performing artists and community leads.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Community Footprint</span>
                <span className="text-cyan-400 font-semibold">Across 4 Batches</span>
              </div>
            </div>

            {/* Division 3: Annual Events */}
            <div className="stat-card-reveal group relative flex flex-col justify-between p-7 sm:p-8 lg:p-9 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-amber-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.2)] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 opacity-80 group-hover:h-1.5 transition-all duration-300" />
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-amber-500/10 blur-2xl group-hover:bg-amber-500/25 transition-all duration-500 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/30 text-amber-300">
                    Division 03
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-white tabular-nums mb-2.5">
                  {stats.events}<span className="text-amber-400">+</span>
                </div>

                <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-amber-300 font-bold mb-2">
                  Annual Events
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  Round-the-clock hackathons, national cultural fests, athletic meets and speaker summits.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Festive Engagement</span>
                <span className="text-amber-400 font-semibold">Year-Round Calendar</span>
              </div>
            </div>

            {/* Division 4: National Trophies */}
            <div className="stat-card-reveal group relative flex flex-col justify-between p-7 sm:p-8 lg:p-9 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-purple-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.2)] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-500 opacity-80 group-hover:h-1.5 transition-all duration-300" />
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-purple-500/10 blur-2xl group-hover:bg-purple-500/25 transition-all duration-500 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300">
                    Division 04
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300">
                    <Trophy className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-white tabular-nums mb-2.5">
                  {stats.trophies}
                </div>

                <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-purple-300 font-bold mb-2">
                  National Trophies
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  Championship wins at IIT Bombay Mood Indigo, Smart India Hackathon, BPUT &amp; National Leagues.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Podium Honors</span>
                <span className="text-purple-400 font-semibold">Tier-1 Circuit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* CLUB DETAILS MODAL (When any card is clicked) */}
        {selectedClub && (
          <div 
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
            onClick={() => setSelectedClub(null)}
          >
            <div 
              className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 my-8 flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header with Club Image Banner */}
              <div className="relative h-48 sm:h-56 bg-stone-900 shrink-0">
                <img
                  src={selectedClub.image}
                  alt={selectedClub.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${selectedClub.accentGradient}`} />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedClub(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Banner Content */}
                <div className="absolute bottom-5 inset-x-6 z-10 text-white">
                  <span className="px-3 py-1 rounded-full bg-white/90 text-stone-900 font-mono text-[10px] font-bold uppercase tracking-wider mb-2 inline-block shadow-xs">
                    {selectedClub.tabCategory}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                    {selectedClub.name}
                  </h3>
                  <p className="text-xs font-mono text-cyan-300 mt-1">
                    {selectedClub.members}+ Active Student Members · Infocity Campus Chapter
                  </p>
                </div>
              </div>

              {/* Modal Body with 3 Pillars */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D9488] mb-1">
                    PILLARS &amp; INITIATIVES
                  </h4>
                  <p className="text-xs text-stone-500">
                    Comprehensive activities, competitions, and hands-on laboratory immersion offered by this society.
                  </p>
                </div>

                <div className="space-y-4">
                  {selectedClub.pillars.map((pillar: any, pIdx: number) => {
                    const IconComponent = pillar.icon;
                    return (
                      <div 
                        key={pIdx}
                        className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-4"
                      >
                        <div className={`w-10 h-10 rounded-xl ${pillar.badgeBg} text-white flex items-center justify-center shrink-0 shadow-xs`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-stone-400 block mb-0.5">
                            {pillar.eyebrow}
                          </span>
                          <h5 className="text-base sm:text-lg font-serif font-bold text-stone-900 mb-1">
                            {pillar.headline}
                          </h5>
                          <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-sans">
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-4 shrink-0">
                <span className="text-xs font-mono text-stone-500">
                  {selectedClub.id} of 06 Premier Technical Societies
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedClub(null)}
                    className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-mono font-semibold transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setSelectedClub(null);
                      onNavigate('contact');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-mono font-bold tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>JOIN THIS CLUB</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 space-y-16">
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
