export interface AcademicSchool {
  id: string;
  name: string;
  degreeTypes: string;
  duration: string;
  description: string;
  programs: string[];
  image: string;
  gradient: string;
  stats: { label: string; value: string }[];
  curriculumHighlights: string[];
}

export interface DegreeProgram {
  id: string;
  level: 'ug' | 'pg' | 'phd' | 'cert';
  levelLabel: string;
  degree: string;
  title: string;
  school: string;
  duration: string;
  credits: string;
  mode: string;
  department: string;
  overview: string;
  coreModules: string[];
  eligibility: string;
  careerProspects: string[];
  badgeColor: string;
  seatIntake: number;
}

export interface RndLab {
  id: string;
  shortName: string;
  name: string;
  focus: string;
  lead: string;
  leadTitle: string;
  stats: { metric: string; label: string }[];
  description: string;
  keyProjects: string[];
  equipment: string[];
  badgeColor: string;
}

export interface RecruiterCompany {
  name: string;
  category: 'Tech Giants & Product' | 'Consulting & IT Services' | 'Core Engineering & Infra' | 'FinTech & Analytics';
  location: string;
  rolesHired: string[];
  intakeAnnual: string;
  highestPackage: string;
  logoText: string;
}

export interface AlumniProfile {
  id: string;
  name: string;
  batch: string;
  program: string;
  currentRole: string;
  organization: string;
  location: string;
  quote: string;
  image: string;
  badge: string;
}

export interface CampusNotice {
  id: string;
  refNo: string;
  category: 'academic' | 'placement' | 'exam' | 'event' | 'administration';
  categoryLabel: string;
  date: { day: string; month: string; year: string };
  title: string;
  issuingAuthority: string;
  summary: string;
  fullBody: string;
  isImportant?: boolean;
}

// Institutional Core Metadata
export const COLLEGE_META = {
  name: 'TEKKZY College of Technology',
  shortName: 'TAT Bhubaneswar',
  tagline: 'Where Knowledge Meets Innovation',
  establishedYear: '2005',
  founderGroup: 'The DF Group',
  approvals: ['AICTE Approved', 'BPUT Affiliated', 'NAAC Accredited', 'NBA Accredited Programmes', 'DSIR-Certified SIRO'],
  location: 'F-2, Chandaka Industrial Estate, Infocity, Bhubaneswar, Odisha 751024',
  phone: '+91 674 274-0555 / 274-0551',
  email: 'info@tekkzy.com',
  admissionsEmail: 'admissions@tekkzy.com',
  placementsEmail: 'placements@tekkzy.com',
  campusSize: '10+ Acres Smart Green Campus',
};

// "At a Glance" Key Institutional Stats (From tat.tekkzy.com & IITD metrics)
export const AT_A_GLANCE = [
  { value: '4,200+', label: 'Students Enrolled', desc: 'Across B.Tech, M.Tech, MBA, MCA, BCA & Ph.D' },
  { value: '200+', label: 'Expert Faculty', desc: 'Over 65% holding Ph.D and industry research pedigrees' },
  { value: '94.8%', label: 'Placement Rate', desc: 'Consistent benchmark across graduating engineering cohorts' },
  { value: '120+', label: 'Recruiting Companies', desc: 'Global product giants, consulting firms and core industry' },
  { value: '₹44.0 LPA', label: 'Highest Package', desc: 'International and tier-1 product engineering offers' },
  { value: '₹7.8 LPA', label: 'Average Package', desc: 'Substantial year-on-year growth across all tech branches' },
  { value: '24+', label: 'Patents Filed', desc: 'Facilitated by CISCO thingQbator & R&D innovation cells' },
  { value: '5,000+', label: 'Alumni Network', desc: 'Innovating across Google, Microsoft, Accenture, Defence & PSUs' },
];

// Academic Schools (Extracted directly from tat.tekkzy.com Programs)
export const ACADEMIC_SCHOOLS: AcademicSchool[] = [
  {
    id: 'school-computing',
    name: 'School of Computing',
    degreeTypes: 'B.Tech · M.Tech · Ph.D',
    duration: '4 Years (UG) / 2 Years (PG)',
    description: 'Pioneering cutting-edge education in Computer Science & Engineering, Artificial Intelligence, Machine Learning, Data Science, and Cloud Systems.',
    programs: [
      'B.Tech in Computer Science & Engineering (CSE)',
      'B.Tech in CSE (Artificial Intelligence & Machine Learning)',
      'B.Tech in CSE (Data Science)',
      'M.Tech in Computer Science & Engineering',
      'Ph.D in Computer Science & Information Systems',
    ],
    image: '/src/assets/images/college_tech_lab_1793988185936.jpg',
    gradient: 'from-blue-900/90 to-indigo-950/95',
    stats: [
      { label: 'NBA Accredited', value: 'Tier 1' },
      { label: 'Supercomputing Nodes', value: '64 Units' },
      { label: 'Placement Rate', value: '96.2%' },
    ],
    curriculumHighlights: [
      'Full-Stack Cloud Native Development & Microservices',
      'Deep Learning, Neural Networks & Computer Vision',
      'Distributed Algorithms & Big Data Pipelines',
      'Cyber Security & Cryptographic Protocol Engineering',
    ],
  },
  {
    id: 'school-comp-app',
    name: 'School of Computer Applications',
    degreeTypes: 'BCA · MCA',
    duration: '3 Years (BCA) / 2 Years (MCA)',
    description: 'Empowering software practitioners with rigorous computational logic, software design, enterprise systems architecture, and mobile app ecosystems.',
    programs: [
      'BCA (Bachelor of Computer Applications)',
      'MCA (Master of Computer Applications - Cloud & DevOps)',
      'MCA (Full-Stack & Web Technologies)',
    ],
    image: '/src/assets/images/college_computer_lab_1793988224067.jpg',
    gradient: 'from-cyan-950/90 to-slate-900/95',
    stats: [
      { label: 'Industry Tie-ups', value: '18+' },
      { label: 'Coding Lab Seats', value: '240' },
      { label: 'Avg Package', value: '₹6.8 LPA' },
    ],
    curriculumHighlights: [
      'Enterprise Java, Spring Boot & React Ecosystems',
      'Cloud Architecture on AWS, Azure & Docker Swarms',
      'Database Optimization & NoSQL Distributed Stores',
      'Agile Product Engineering & DevOps Automation',
    ],
  },
  {
    id: 'school-engineering',
    name: 'School of Engineering',
    degreeTypes: 'B.Tech · M.Tech',
    duration: '4 Years (UG) / 2 Years (PG)',
    description: 'Engineering the physical and electronic world through Electronics & Communication, Electrical, Mechanical, and Civil Engineering with hands-on hardware innovation.',
    programs: [
      'B.Tech in Electronics & Communication Engineering (ECE)',
      'B.Tech in Electrical & Electronics Engineering (EEE)',
      'B.Tech in Mechanical Engineering & Robotics',
      'B.Tech in Civil & Environmental Engineering',
      'M.Tech in VLSI & Embedded Systems',
    ],
    image: '/src/assets/images/college_campus_quad_1793988224316.jpg',
    gradient: 'from-amber-950/90 to-stone-900/95',
    stats: [
      { label: 'Hardware Labs', value: '28 Labs' },
      { label: 'Research Grants', value: '₹3.8 Cr' },
      { label: 'Faculty with PhD', value: '72%' },
    ],
    curriculumHighlights: [
      'VLSI Chip Design, FPGA Synthesis & Cadence Tooling',
      'Robotics Kinematics, Autonomous UAVs & Mechatronics',
      'Smart Grid Automation & Renewable Energy Electronics',
      'Structural Mechanics & Eco-Friendly Green Building Materials',
    ],
  },
  {
    id: 'school-biotech',
    name: 'School of Biotechnology',
    degreeTypes: 'B.Sc · M.Sc · Ph.D',
    duration: '3 Years (UG) / 2 Years (PG)',
    description: 'Merging molecular biology, genetic engineering, bioinformatics computational tools, and pharmaceutical bioprocess technology.',
    programs: [
      'B.Sc in Biotechnology & Genomics',
      'M.Sc in Industrial Microbiology & Bioprocess',
      'Ph.D in Computational Biotechnology & Drug Discovery',
    ],
    image: '/src/assets/images/college_library_hall_1793988204291.jpg',
    gradient: 'from-emerald-950/90 to-slate-900/95',
    stats: [
      { label: 'Specialized Labs', value: '8 Labs' },
      { label: 'DSIR-SIRO Approved', value: 'Yes' },
      { label: 'Journal Papers', value: '180+' },
    ],
    curriculumHighlights: [
      'Recombinant DNA Technology & CRISPR Gene Editing',
      'Bioinformatics, Molecular Docking & PyMOL Modeling',
      'Fermentation Engineering & Industrial Enzymes',
      'Environmental Bioremediation & Nanobiotechnology',
    ],
  },
  {
    id: 'school-business',
    name: 'School of Business & Management',
    degreeTypes: 'BBA · MBA',
    duration: '3 Years (BBA) / 2 Years (MBA)',
    description: 'Forging business strategists equipped with technology management acumen, digital marketing frameworks, financial modeling, and operational agility.',
    programs: [
      'BBA (Bachelor of Business Administration)',
      'MBA in Technology & Systems Management',
      'MBA in Financial Engineering & Banking Analytics',
      'MBA in Human Resource Leadership & Talent Strategy',
    ],
    image: '/src/assets/images/college_lecture_hall_1793988205558.jpg',
    gradient: 'from-rose-950/90 to-slate-900/95',
    stats: [
      { label: 'Corporate Mentors', value: '45+' },
      { label: 'Live Case Studies', value: '120+' },
      { label: 'Highest Package', value: '₹22.5 LPA' },
    ],
    curriculumHighlights: [
      'Business Analytics, PowerBI & Quantitative Modeling',
      'Digital Marketing Strategy & E-Commerce Operations',
      'Fintech Disruption & Corporate Financial Valuations',
      'Supply Chain Logistics & Global Strategic Leadership',
    ],
  },
];

// Comprehensive Degree Programs for AcademicProgramsPage
export const PROGRAMS_CATALOG: DegreeProgram[] = [
  {
    id: 'prog-cse-btech',
    level: 'ug',
    levelLabel: 'Undergraduate Program',
    degree: 'B.Tech',
    title: 'Computer Science & Engineering',
    school: 'School of Computing',
    duration: '4 Years (8 Semesters)',
    credits: '160 Credit Units',
    mode: 'Full-Time On-Campus Labs & Studio Projects',
    department: 'Department of Computer Science & Engineering',
    overview: 'Flagship engineering program focused on computing theory, modern algorithmic design, full-stack enterprise systems, cloud scalability, and cybersecurity.',
    coreModules: [
      'Data Structures & Advanced Algorithmic Design',
      'Object-Oriented Software Engineering & Design Patterns',
      'Operating Systems & Distributed Computing Systems',
      'Computer Networks & Cloud Architecture (AWS/Azure)',
      'Database Management Systems & Distributed Databases',
      'Machine Learning Foundations & Neural Networks',
    ],
    eligibility: '10+2 Higher Secondary with Mathematics & Physics with min 60% aggregate. Valid OJEE / JEE Main rank.',
    careerProspects: ['Software Development Engineer (SDE)', 'Cloud Systems Architect', 'Full-Stack Developer', 'Cybersecurity Specialist'],
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    seatIntake: 180,
  },
  {
    id: 'prog-aiml-btech',
    level: 'ug',
    levelLabel: 'Undergraduate Program',
    degree: 'B.Tech',
    title: 'CSE (Artificial Intelligence & Machine Learning)',
    school: 'School of Computing',
    duration: '4 Years (8 Semesters)',
    credits: '160 Credit Units',
    mode: 'Interactive AI Workstations & GPU Cluster Sessions',
    department: 'Department of AI & Data Science',
    overview: 'Specialized program delving deeply into generative AI models, natural language processing, computer vision, robotics perception, and automated reasoning.',
    coreModules: [
      'Applied Linear Algebra, Multivariate Calculus & Probability',
      'Supervised & Unsupervised Machine Learning Algorithms',
      'Deep Neural Networks (CNNs, RNNs, Transformers)',
      'Natural Language Processing & Large Language Models',
      'Computer Vision, Image Processing & OpenCV',
      'Reinforcement Learning & Autonomous Decision Systems',
    ],
    eligibility: '10+2 with Physics and Mathematics. Valid JEE Main / OJEE score.',
    careerProspects: ['AI/ML Engineer', 'Data Scientist', 'NLP Specialist', 'Computer Vision Researcher'],
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    seatIntake: 120,
  },
  {
    id: 'prog-ece-btech',
    level: 'ug',
    levelLabel: 'Undergraduate Program',
    degree: 'B.Tech',
    title: 'Electronics & Communication Engineering',
    school: 'School of Engineering',
    duration: '4 Years (8 Semesters)',
    credits: '160 Credit Units',
    mode: 'Embedded Hardware Labs & Cadence EDA Simulation',
    department: 'Department of Electronics & Communication',
    overview: 'NBA-accredited program combining semiconductor fundamentals, VLSI design, wireless 5G communications, IoT embedded microcontrollers, and signal processing.',
    coreModules: [
      'Semiconductor Physics & Microelectronic Circuits',
      'Digital Signal Processing & Fourier Transform Math',
      'VLSI Design & CMOS Circuit Layout in Cadence EDA',
      'Microcontrollers (ARM Cortex, ESP32, STM32) & IoT',
      'RF Microwave Engineering & 5G Cellular Networks',
      'Embedded Linux & Real-Time Operating Systems (RTOS)',
    ],
    eligibility: '10+2 with Physics, Mathematics, and Chemistry.',
    careerProspects: ['VLSI Design Engineer', 'Embedded Systems Firmware Developer', 'RF Communications Specialist', 'IoT Solutions Architect'],
    badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    seatIntake: 120,
  },
  {
    id: 'prog-mca-pg',
    level: 'pg',
    levelLabel: 'Postgraduate Program',
    degree: 'MCA',
    title: 'Master of Computer Applications',
    school: 'School of Computer Applications',
    duration: '2 Years (4 Semesters)',
    credits: '88 Credit Units',
    mode: 'Practical Industry Capstone & Internship',
    department: 'Department of Computer Applications',
    overview: 'Advanced postgraduate curriculum tailored for high-impact software careers in modern web frameworks, DevOps pipelines, cloud computing, and enterprise database systems.',
    coreModules: [
      'Advanced Java Enterprise Edition & Microservices',
      'Python Data Analytics & Machine Learning Applications',
      'DevOps CI/CD Pipelines, Docker Containers & Kubernetes',
      'Full-Stack Web (React, Node.js, Express, MongoDB)',
      'Cloud Solution Architecture & Serverless Computing',
      'Enterprise Software Testing & Quality Assurance',
    ],
    eligibility: 'BCA / B.Sc (Computer Science) / B.Sc with Mathematics with min 50% marks. Valid OJEE / National MCA entrance.',
    careerProspects: ['Senior Software Engineer', 'DevOps Specialist', 'Full-Stack Lead', 'Database Administrator'],
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    seatIntake: 60,
  },
  {
    id: 'prog-mba-pg',
    level: 'pg',
    levelLabel: 'Postgraduate Program',
    degree: 'MBA',
    title: 'Master of Business Administration',
    school: 'School of Business',
    duration: '2 Years (4 Semesters)',
    credits: '92 Credit Units',
    mode: 'Case Study Method, Industry Immersion & Live Projects',
    department: 'Department of Management Studies',
    overview: 'Premier business management program blending core managerial competencies with modern technological disruptions, financial analytics, and strategic leadership.',
    coreModules: [
      'Financial Management & Investment Banking Analytics',
      'Marketing Management & Digital Growth Hacking',
      'Human Resource Strategy & Organizational Dynamics',
      'Operations Research, Logistics & Supply Chain Systems',
      'Business Intelligence, Data Visualization & PowerBI',
      'Strategic Corporate Leadership & Tech Entrepreneurship',
    ],
    eligibility: 'Graduation in any discipline with min 50% marks. Valid CAT / MAT / XAT / OJEE score.',
    careerProspects: ['Management Consultant', 'Business Analyst', 'Product Marketing Manager', 'Operations Lead'],
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    seatIntake: 60,
  },
  {
    id: 'prog-cse-phd',
    level: 'phd',
    levelLabel: 'Doctoral Program',
    degree: 'Ph.D',
    title: 'Doctor of Philosophy in Computer Science & Engineering',
    school: 'School of Computing',
    duration: '3–5 Years',
    credits: 'Comprehensive Coursework + Doctoral Dissertation',
    mode: 'Research Fellowship with DSIR-SIRO Stipend Support',
    department: 'Directorate of Research & Innovation',
    overview: 'Rigorous doctoral research in distributed systems, quantum computing algorithms, explainable AI, computer vision, biomedical signal processing, and IoT security.',
    coreModules: [
      'Advanced Research Methodology & Statistical Modeling',
      'Doctoral Seminar in High-Impact Computer Science',
      'Patent Filing, IPR Laws & Academic Publication Ethics',
      'Independent Thesis Research & Dissertation Defense',
    ],
    eligibility: 'M.Tech / ME in relevant discipline with min 60% or CGPA 6.5. UGC-NET / GATE preferred.',
    careerProspects: ['University Professor', 'Principal Research Scientist', 'Industrial R&D Director', 'Government Scientific Officer'],
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    seatIntake: 15,
  },
];

// R&D Centers of Excellence (Inspired by TAT Cisco thingQbator & IIT Delhi Research Clusters)
export const R_AND_D_LABS: RndLab[] = [
  {
    id: 'lab-thingqbator',
    shortName: 'CISCO thingQbator',
    name: 'CISCO thingQbator Innovation & IoT Hub',
    focus: 'IoT Prototyping, 3D Fabrication, Embedded Firmware & Startup Incubation',
    lead: 'Dr. Debasis Panda, Ph.D',
    leadTitle: 'Director, Centers of Excellence & Industry Co-Innovation',
    badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    stats: [
      { metric: '1,500+', label: 'Students Trained' },
      { metric: '320+', label: 'Working Prototypes Built' },
      { metric: '24', label: 'Patents Filed' },
      { metric: '18', label: 'Startups Incubated' },
    ],
    description: 'A global co-innovation maker space established in collaboration with CISCO. Provides industrial 3D printers, laser cutters, oscilloscope testbeds, IoT sensor kits, and end-to-end seed incubation support.',
    keyProjects: [
      'Autonomous Agricultural Drone with multispectral crop health detection',
      'Smart Industrial LoRaWAN Water Metering & Leakage Detection Array',
      'AI-Powered Assistive Exoskeleton for physical rehabilitation',
    ],
    equipment: [
      'Industrial-grade SLA and Dual-Extrusion 3D Printers',
      'Tektronix 4-Channel Mixed Domain Digital Oscilloscopes',
      'CISCO Catalyst Enterprise Switching & Security Racks',
      'PCB Milling & Automated SMD Soldering Workstations',
    ],
  },
  {
    id: 'lab-robotics-uav',
    shortName: 'Robotics & UAV Center',
    name: 'Center for Autonomous Robotics & Aerial Drone Systems',
    focus: 'Drone Avionics, Computer Vision SLAM, Mechatronics & Robot Kinematics',
    lead: 'Prof. Sandip Patnaik',
    leadTitle: 'Principal Investigator & Robotics Chair',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    stats: [
      { metric: '12', label: 'Autonomous Aerial Vehicles' },
      { metric: '₹1.8 Cr', label: 'Government Sponsored Grants' },
      { metric: '8', label: 'National Hackathon Trophies' },
    ],
    description: 'Dedicated to autonomous navigation, LiDAR SLAM mapping, carbon-fiber quadcopter drone engineering, and multi-robot coordination for industrial disaster management.',
    keyProjects: [
      'Autonomous GPS-denied indoor drone navigation using stereo depth vision',
      'Hexacopter heavy-payload parcel delivery system with parachute failsafe',
      '6-DOF robotic manipulator arm with AI gripper torque control',
    ],
    equipment: [
      'Velodyne LiDAR 16-Channel 3D Sensors',
      'Pixhawk 6X Open-Source Flight Controllers with RTK GPS',
      'Indoor Optical Motion Capture Flying Cage',
      'Carbon-Fiber Autoclave Curing Chamber',
    ],
  },
  {
    id: 'lab-ai-hpc',
    shortName: 'AI & HPC Cluster',
    name: 'Artificial Intelligence & Supercomputing Center',
    focus: 'Deep Neural Networks, Natural Language Processing & Edge Computing',
    lead: 'Dr. Ramnarayan Mohanty, Ph.D',
    leadTitle: 'Head of AI Research & Cloud Supercomputing',
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    stats: [
      { metric: '64', label: 'GPU Accelerated Compute Nodes' },
      { metric: '120 TB', label: 'High-Throughput NVMe Storage' },
      { metric: '42', label: 'IEEE Published Research Papers' },
    ],
    description: 'Equipped with multi-GPU clusters for training large-scale deep neural networks, processing satellite imagery, and developing Indic language translation models.',
    keyProjects: [
      'Real-time edge neural network for automated defect inspection in steel plants',
      'Multilingual Indic LLM fine-tuned for administrative and legal documents',
      'Deep learning mammogram early breast cancer screening system',
    ],
    equipment: [
      'NVIDIA A100 Tensor Core 80GB GPU Compute Servers',
      'High-Speed 100 Gbps InfiniBand Interconnect Fabric',
      'High-Density Liquid Cooling Workstation Racks',
    ],
  },
];

// Campus Facilities (Central Library, Smart Green Campus, Cafeteria, Athletics)
export const CAMPUS_FACILITIES = [
  {
    id: 'fac-library',
    title: 'Central Digital Library',
    tagline: 'Knowledge Sanctuary & E-Resource Hub',
    desc: 'Spanning multiple levels, the central library houses over 100,000 print volumes, 12,000+ national and international e-journals (IEEE, ScienceDirect, ACM, Springer), private study cubicles, and a 24/7 digital browsing center.',
    features: ['100,000+ Print Books & Bound Volumes', 'Access to IEEE Xplore, ACM & SpringerLink', 'Automated RFID Self-Checkout Kiosks', '24/7 Air-Conditioned Reading Concourse'],
    image: '/src/assets/images/college_library_hall_1793988204291.jpg',
  },
  {
    id: 'fac-green-campus',
    title: 'Smart Green Campus & Quadrangle',
    tagline: '10+ Acres of Lush Eco-Friendly Living',
    desc: 'Strategically located in Bhubaneswar’s Infocity tech hub, the campus features manicured lawns, solar power generation, rainwater harvesting, zero-emission battery buggies, and high-speed campus-wide fiber Wi-Fi.',
    features: ['100% Wi-Fi Enabled Academic Precinct', 'Solar Powered Roof-Grid System', 'Serene Student Walkways & Quadrangle', 'Safe Pedestrian-Only Central Zones'],
    image: '/src/assets/images/college_campus_quad_1793988224316.jpg',
  },
  {
    id: 'fac-dining',
    title: 'Cafeteria & Multi-Cuisine Food Court',
    tagline: 'Nutritious, Vibrant & Clean Dining',
    desc: 'A modern multi-cuisine cafeteria offering hygienic vegetarian and non-vegetarian meals, fresh fruit juice bar, bakery delights, and relaxed indoor and open-air seating for 600+ students.',
    features: ['HACCP Certified Food Preparation Standards', 'North & South Indian, Continental & Odia Cuisines', 'Café Lounge with High-Speed Charging Outlets', 'Affordable Subsidized Student Meal Plans'],
    image: '/src/assets/images/college_campus_hero_1793988186342.jpg',
  },
  {
    id: 'fac-athletics',
    title: 'Athletics, Gymnasium & Sports Arena',
    tagline: 'Physical Vitality & Championship Spirit',
    desc: 'Comprehensive outdoor and indoor sports facilities including a floodlit basketball court, volleyball ground, cricket nets, modern fitness gym with cardio stations, and indoor table tennis halls.',
    features: ['Modern Fitness Center & Certified Trainers', 'Floodlit Basketball & Volleyball Courts', 'Annual Inter-College Sports Fest (Olympus)', 'Indoor Badminton Courts & Yoga Pavilion'],
    image: '/src/assets/images/college_convocation_1793988239815.jpg',
  },
];

// Placements & Top Recruiters (From tat.tekkzy.com)
export const RECRUITERS: RecruiterCompany[] = [
  {
    name: 'Google',
    category: 'Tech Giants & Product',
    location: 'Bengaluru / Hyderabad',
    rolesHired: ['Software Engineer', 'Staffing Operations', 'Cloud Engineer'],
    intakeAnnual: '8-12 Offers',
    highestPackage: '₹44.0 LPA',
    logoText: 'Google',
  },
  {
    name: 'Microsoft',
    category: 'Tech Giants & Product',
    location: 'Hyderabad / Noida',
    rolesHired: ['SDE-1', 'Support Engineer', 'Security Analyst'],
    intakeAnnual: '6-10 Offers',
    highestPackage: '₹42.5 LPA',
    logoText: 'Microsoft',
  },
  {
    name: 'Accenture',
    category: 'Consulting & IT Services',
    location: 'Pan India',
    rolesHired: ['Associate Software Engineer', 'Cyber Security Analyst', 'Data Analyst'],
    intakeAnnual: '120+ Offers',
    highestPackage: '₹14.0 LPA',
    logoText: 'Accenture',
  },
  {
    name: 'Tata Consultancy Services (TCS)',
    category: 'Consulting & IT Services',
    location: 'Bhubaneswar / Kolkata / Pune',
    rolesHired: ['TCS Digital', 'TCS Prime', 'TCS Ninja Developer'],
    intakeAnnual: '180+ Offers',
    highestPackage: '₹11.5 LPA',
    logoText: 'TCS',
  },
  {
    name: 'Infosys',
    category: 'Consulting & IT Services',
    location: 'Bhubaneswar / Bengaluru / Pune',
    rolesHired: ['Specialist Programmer (SP)', 'Digital Specialist Engineer (DSE)', 'System Engineer'],
    intakeAnnual: '150+ Offers',
    highestPackage: '₹10.5 LPA',
    logoText: 'Infosys',
  },
  {
    name: 'Wipro',
    category: 'Consulting & IT Services',
    location: 'Bengaluru / Hyderabad',
    rolesHired: ['Turbo Developer', 'Project Engineer', 'Cloud Developer'],
    intakeAnnual: '90+ Offers',
    highestPackage: '₹9.0 LPA',
    logoText: 'Wipro',
  },
  {
    name: 'Tata Power',
    category: 'Core Engineering & Infra',
    location: 'Odisha / Mumbai / Jamshedpur',
    rolesHired: ['Graduate Engineer Trainee (GET)', 'Power Systems Engineer'],
    intakeAnnual: '25+ Offers',
    highestPackage: '₹8.5 LPA',
    logoText: 'Tata Power',
  },
  {
    name: 'MIDHANI (Ministry of Defence)',
    category: 'Core Engineering & Infra',
    location: 'Hyderabad',
    rolesHired: ['Assistant Manager', 'Materials & Quality Engineer'],
    intakeAnnual: '6-8 Offers',
    highestPackage: '₹12.0 LPA',
    logoText: 'MIDHANI',
  },
];

// Authentic Alumni Profiles (From alumniData-D8Z1iFq-.js)
export const ALUMNI_SPOTLIGHT: AlumniProfile[] = [
  {
    id: 'alum-1',
    name: 'Smaranika Das',
    batch: 'Class of 2016',
    program: 'B.Tech in Computer Science',
    currentRole: 'Staffing Operations Lead',
    organization: 'Google',
    location: 'Bengaluru, India',
    quote: 'TEKKZY gave me the foundation I needed to crack into top global tech companies. The faculty mentorship and coding culture here are truly unmatched.',
    image: '/src/assets/images/college_scholar_woman_1_1793988497967.jpg',
    badge: 'Google Tech Lead',
  },
  {
    id: 'alum-2',
    name: 'Tripada Dash',
    batch: 'Class of 2017',
    program: 'B.Tech in Computer Science',
    currentRole: 'Cyber Security Manager',
    organization: 'Accenture',
    location: 'Gurugram, India',
    quote: 'The practical approach to learning and modern lab projects helped me stand out in technical interviews and accelerate in enterprise security.',
    image: '/src/assets/images/college_scholar_man_1_1793988498266.jpg',
    badge: 'Security Pioneer',
  },
  {
    id: 'alum-3',
    name: 'Subhrajyoti Pani',
    batch: 'Class of 2014',
    program: 'B.Tech in Electrical Engineering',
    currentRole: 'Head of Group, Operations',
    organization: 'Tata Power Northern Odisha',
    location: 'Bhubaneswar, India',
    quote: 'The research-oriented approach encouraged me to pursue complex industrial systems. The recognition speaks volumes about the institution’s commitment.',
    image: '/src/assets/images/college_scholar_man_1_1793988498266.jpg',
    badge: 'Power Executive',
  },
  {
    id: 'alum-4',
    name: 'Bibekananda Sahu',
    batch: 'Class of 2015',
    program: 'B.Tech in Mechanical Engineering',
    currentRole: 'Manager',
    organization: 'MIDHANI (Ministry of Defence)',
    location: 'Hyderabad, India',
    quote: 'The state-of-the-art labs and industry tie-ups gave me a competitive edge. The placement training was thorough and gave me immense confidence.',
    image: '/src/assets/images/college_scholar_man_1_1793988498266.jpg',
    badge: 'Defence Scientist',
  },
];

// Why Choose TEKKZY Pillars (From WhyChooseTrident-B7YISg0s.js)
export const WHY_TEKKZY_PILLARS = [
  {
    title: 'Academic Excellence',
    stat: 'Top-Ranked',
    label: 'Premier Technical Institution',
    desc: 'Consistently recognized as a leading engineering and technology destination in Eastern India with NBA Tier-1 accredited degree syllabi.',
  },
  {
    title: 'Career Ascendancy',
    stat: '94.8%',
    label: 'Consistent Placement Rate',
    desc: 'Empowering over 5,000 graduates to join leading global conglomerates like Google, Microsoft, Accenture, TCS, Infosys, and Defence PSUs.',
  },
  {
    title: 'Vibrant Innovation Hub',
    stat: '24+ Patents',
    label: 'CISCO thingQbator Center',
    desc: 'Full-fledged IoT, 3D printing and startup incubation maker labs turning student prototypes into commercialized ventures.',
  },
  {
    title: 'Distinguished Faculty',
    stat: '200+',
    label: 'Expert Faculty Members',
    desc: 'Guided by dedicated professors and industry practitioners pushing the boundaries of teaching and scientific discovery.',
  },
  {
    title: 'Eco-Smart Infrastructure',
    stat: '10+ Acres',
    label: 'Smart Green Campus',
    desc: 'A sprawling, high-speed Wi-Fi enabled sustainable campus located in the academic heart of Bhubaneswar’s Infocity.',
  },
  {
    title: 'National Accreditations',
    stat: 'NAAC & NBA',
    label: 'Validated Standards',
    desc: 'Accredited by NAAC and NBA, approved by AICTE, affiliated with BPUT, and recognized as a SIRO by DSIR, Govt. of India.',
  },
];

// Institutional Notices (From NoticeBoard-CRYNruPx.js)
export const INSTITUTIONAL_NOTICES: CampusNotice[] = [
  {
    id: 'not-exam-final',
    refNo: 'TAT/EXAM/2026/108',
    category: 'exam',
    categoryLabel: 'Examination Timetable',
    date: { day: '15', month: 'MAY', year: '2026' },
    title: 'Semester Examinations Scheduled for B.Tech, M.Tech, MCA & MBA',
    issuingAuthority: 'Controller of Examinations',
    summary: 'The final semester examinations for all undergraduate and postgraduate branches will commence from June 1st. Detailed timetable published.',
    fullBody: 'All regular and back-paper students are hereby informed that the End-Semester Examination timetable for the 2025-26 academic session has been published on the student e-governance portal. Practical lab viva and capstone presentations will be conducted from May 25th to May 30th. Admit cards must be downloaded by May 22nd.',
    isImportant: true,
  },
  {
    id: 'not-place-tcs',
    refNo: 'TAT/TNP/2026/084',
    category: 'placement',
    categoryLabel: 'Campus Recruitment',
    date: { day: '12', month: 'MAY', year: '2026' },
    title: 'Phase II Campus Recruitment Drive by TCS, Infosys & Wipro',
    issuingAuthority: 'Training & Placement Directorate',
    summary: 'TCS and Infosys will be visiting the campus for the Phase II recruitment drive. Eligible final year B.Tech and MCA students must register by May 20th.',
    fullBody: 'The Training and Placement Cell is organizing the Phase II On-Campus Drive for 2026 graduating students. Packages range from ₹6.5 LPA to ₹11.5 LPA for digital specialist and development roles. Mock aptitude and coding assessment sessions will be conducted in the central computer labs this weekend.',
    isImportant: true,
  },
  {
    id: 'not-tech-symp',
    refNo: 'TAT/EVT/2026/042',
    category: 'event',
    categoryLabel: 'Technical Symposium',
    date: { day: '08', month: 'MAY', year: '2026' },
    title: 'Annual Tech Symposium & Hackathon Series 2026: Call for Abstracts',
    issuingAuthority: 'Dean of Student Affairs & Innovation Council',
    summary: 'Registrations are now open for the annual Tech Symposium. Submit your hardware and software project abstracts before the deadline.',
    fullBody: 'The Innovation & Entrepreneurship Council invites student teams to participate in the National Tech Symposium 2026. Themes include IoT for Smart Cities, Autonomous Drone Navigation, Healthcare AI, and Clean Energy Microgrids. Cash prizes worth ₹2,50,000 will be awarded to top prototypes.',
    isImportant: false,
  },
  {
    id: 'not-lib-clearance',
    refNo: 'TAT/LIB/2026/029',
    category: 'academic',
    categoryLabel: 'Library Clearance',
    date: { day: '05', month: 'MAY', year: '2026' },
    title: 'Central Digital Library Book Clearance & Digital Access Notice',
    issuingAuthority: 'Chief Librarian',
    summary: 'All issued books must be returned to the central library before the commencement of the end-semester exams to receive no-dues clearance.',
    fullBody: 'Students are advised to settle their book borrowing records and fine dues before May 24th. The digital library terminals and IEEE Xplore access will remain open 24/7 throughout the examination preparation period.',
    isImportant: false,
  },
  {
    id: 'not-hostel-allotment',
    refNo: 'TAT/ADMIN/2026/019',
    category: 'administration',
    categoryLabel: 'Hostel Administration',
    date: { day: '01', month: 'MAY', year: '2026' },
    title: 'Campus Hostel Room Allotment List Published for Upcoming Semester',
    issuingAuthority: 'Chief Hostel Warden',
    summary: 'The hostel room allotment list for the upcoming academic year has been published on the notice board and student portal.',
    fullBody: 'Separate room allotments for Boys Hostels (Aryabhata & Takshashila Halls) and Girls Hostels (Kalyani Hall) have been finalized based on academic seniority. Students must complete mess fee payments before room keys are issued on June 5th.',
    isImportant: false,
  },
];

