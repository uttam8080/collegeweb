import { Subject, LearningPath, Lesson, Testimonial } from '../types';

export const HERO_IMAGE = '/src/assets/images/college_campus_hero_1793988186342.jpg';

export const SUBJECTS: Subject[] = [
  {
    id: 'history',
    name: 'Indian History',
    slug: 'indian-history',
    category: 'History & Civilization',
    tagline: 'From the Bronze Age Indus Valley to the Golden Ages of Nalanda and Vijayanagara',
    description: 'Explore the profound epochs of the Indian subcontinent: advanced urban planning at Mohenjo-daro, maritime diplomacy of the Cholas, and the scholarly sanctuary of Takshashila.',
    image: '/src/assets/images/college_campus_quad_1793988224316.jpg',
    iconName: 'Landmark',
    lessonCount: 24,
    pathCount: 4,
    featured: true,
    topics: ['Indus Valley Urbanism', 'Vedic Era Social Structures', 'Maurya & Ashoka Edicts', 'Gupta Golden Age', 'Chola Maritime Trade', 'Vijayanagara Empire']
  },
  {
    id: 'science',
    name: 'Ancient Indian Science',
    slug: 'ancient-indian-science',
    category: 'Science & Mathematics',
    tagline: 'Pioneering mathematical astronomy, the zero system, metallurgy, and surgical treatises',
    description: 'Discover how Aryabhata, Brahmagupta, and Bhaskara mapped celestial orbits and algebraic polynomials, while Sushruta pioneered rhinoplasty and surgical reconstruction.',
    image: '/src/assets/images/college_tech_lab_1793988185936.jpg',
    iconName: 'Compass',
    lessonCount: 28,
    pathCount: 5,
    featured: true,
    topics: ['The Concept of Shunya (Zero)', 'Aryabhata Spherical Trigonometry', 'Sushruta Samhita Surgery', 'Charaka Ayurveda Fundamentals', 'Wootz Steel Metallurgy', 'Jantar Mantar Observatories']
  },
  {
    id: 'philosophy',
    name: 'Indian Philosophy',
    slug: 'indian-philosophy',
    category: 'Philosophy & Ethics',
    tagline: 'Six orthodox schools of thought, Upanishadic inquiries, and ethics of consciousness',
    description: 'Investigate the Six Darshanas (Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, Vedanta), exploring the nature of perception, causality, consciousness, and liberation.',
    image: '/src/assets/images/college_library_hall_1793988204291.jpg',
    iconName: 'Brain',
    lessonCount: 32,
    pathCount: 6,
    featured: true,
    topics: ['The Upanishads & Brahman', 'Nyaya Epistemology & Logic', 'Samkhya Dualism', 'Advaita Vedanta (Non-duality)', 'Bhagavad Gita Ethics', 'Jain Anekantavada & Ahimsa']
  },
  {
    id: 'art-architecture',
    name: 'Art and Architecture',
    slug: 'art-and-architecture',
    category: 'Arts & Architecture',
    tagline: 'Monolithic rock excavations, sacred Vastu geometry, and classical iconometry',
    description: 'Uncover the engineering marvel of Ellora’s top-down carved Kailasa temple, intricate Chola lost-wax bronzes, Khajuraho sculpture, and cool stepwell hydrology.',
    image: '/src/assets/images/college_lecture_hall_1793988205558.jpg',
    iconName: 'Palette',
    lessonCount: 22,
    pathCount: 3,
    featured: true,
    topics: ['Rock-Cut Architecture at Ellora', 'Nagara vs Dravida Styles', 'Vastu Purusha Mandala', 'Chola Bronze Casting Technique', 'Ajanta Fresco Composition', 'Subterranean Baolis (Stepwells)']
  },
  {
    id: 'literature',
    name: 'Literature and Languages',
    slug: 'literature-and-languages',
    category: 'Literature & Linguistics',
    tagline: 'Panini’s formal generative grammar, timeless epics, and classical poetry',
    description: 'Examine Panini’s Ashtadhyayi—the world’s earliest formal generative linguistic rule-machine—alongside the Ramayana, Mahabharata, and classical Sangam poetry.',
    image: '/src/assets/images/college_computer_lab_1793988224067.jpg',
    iconName: 'BookOpen',
    lessonCount: 26,
    pathCount: 4,
    featured: true,
    topics: ['Panini & Linguistic Automata', 'The Mahabharata Epic Structure', 'Kalidasa’s Classical Dramas', 'Sangam Tamil Anthologies', 'Panchatantra Fables', 'Bhartrihari’s Subhashitas']
  },
  {
    id: 'culture',
    name: 'Culture and Traditions',
    slug: 'culture-and-traditions',
    category: 'Culture & Living Heritage',
    tagline: 'The nine rasas of performing arts, sacred rhythm, culinary science, and ecological rites',
    description: 'Experience Bharata Muni’s Natyashastra, the science of micro-tones in Indian classical music, handloom weaving traditions, and the astronomical timing of seasonal festivals.',
    image: '/src/assets/images/college_convocation_1793988239815.jpg',
    iconName: 'Music',
    lessonCount: 20,
    pathCount: 3,
    featured: true,
    topics: ['Natyashastra & The 9 Rasas', 'Carnatic & Hindustani Ragas', 'Textile Weaving Heritage', 'Ayurvedic Seasonal Living (Ritucharya)', 'Temple Ritual Calendars', 'Folk Art Forms of India']
  }
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path-ancient-india',
    title: 'Discover Ancient India',
    slug: 'discover-ancient-india',
    subtitle: 'From Harappan Grid Cities to the Classical University of Nalanda',
    description: 'A comprehensive journey into the dawn of urban civil engineering, civic cleanliness, trade networks across Mesopotamia, and the intellectual revival of the Gupta Renaissance.',
    category: 'History & Civilization',
    level: 'Beginner',
    duration: '4.5 Hours',
    totalLessons: 6,
    image: '/src/assets/images/college_campus_quad_1793988224316.jpg',
    prerequisites: ['No prior knowledge required', 'Curiosity about civil engineering and world antiquity'],
    learningOutcomes: [
      'Understand the hydraulic and grid engineering of Harappa and Mohenjo-daro',
      'Analyze Ashoka’s Rock Edicts and early governance through moral duty (Dhamma)',
      'Trace the international student exchange system of Nalanda Mahavihara',
      'Appreciate how ancient maritime trade connected India with Rome and Southeast Asia'
    ],
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: The Urban Ingenuity of the Indus Valley',
        description: 'Standardized bricks, subterranean covered drains, and peaceful civic organization.',
        lessonIds: ['lesson-mohenjo-daro', 'lesson-harappan-trade']
      },
      {
        id: 'mod-2',
        title: 'Module 2: Maurya Statecraft and Moral Governance',
        description: 'Kautilya’s Arthashastra economic statecraft and Emperor Ashoka’s ethical edicts.',
        lessonIds: ['lesson-arthashastra', 'lesson-ashoka-edicts']
      },
      {
        id: 'mod-3',
        title: 'Module 3: The Golden Age of Nalanda and Gupta Culture',
        description: 'How Nalanda hosted 10,000 scholars from across Asia studying astronomy, logic, and medicine.',
        lessonIds: ['lesson-nalanda-university', 'lesson-gupta-renaissance']
      }
    ]
  },
  {
    id: 'path-indian-math',
    title: 'Explore Indian Mathematics & Astronomy',
    slug: 'explore-indian-mathematics',
    subtitle: 'The Architecture of Zero, Infinite Series, and Spherical Planetary Models',
    description: 'Trace the revolutionary breakthroughs of Indian mathematicians—from Pingala’s binary combinations and Aryabhata’s trigonometry to the Kerala School’s calculus proofs centuries before Europe.',
    category: 'Science & Mathematics',
    level: 'Intermediate',
    duration: '5.5 Hours',
    totalLessons: 6,
    image: '/src/assets/images/college_tech_lab_1793988185936.jpg',
    prerequisites: ['Basic high school algebra', 'Interest in the history of scientific thought'],
    learningOutcomes: [
      'Master the conceptual shift from counting tokens to the positional zero system',
      'Understand Aryabhata’s sine approximation formula and earth rotation model',
      'Examine Brahmagupta’s rules for arithmetic with negative numbers and zero',
      'Learn how Madhava of Sangamagrama calculated the infinite Leibniz series for Pi in the 14th century'
    ],
    modules: [
      {
        id: 'mod-math-1',
        title: 'Module 1: The Zero Revolution and Place-Value System',
        description: 'The Bakshali Manuscript, Brahmasphutasiddhanta, and the algebraic rules of nothingness.',
        lessonIds: ['lesson-aryabhata-zero', 'lesson-brahmagupta-algebra']
      },
      {
        id: 'mod-math-2',
        title: 'Module 2: Trigonometry and Planetary Motion',
        description: 'Calculating sine tables, predicting solar eclipses, and heliocentric intuition.',
        lessonIds: ['lesson-planetary-models', 'lesson-bhaskara-calculus']
      },
      {
        id: 'mod-math-3',
        title: 'Module 3: The Kerala School and Pre-Calculus Series',
        description: 'Madhava’s infinite expansions for sine, cosine, and arc-tangent.',
        lessonIds: ['lesson-kerala-school', 'lesson-ramanujan-legacy']
      }
    ]
  },
  {
    id: 'path-indian-philosophy',
    title: 'Understand Indian Philosophy & Ethics',
    slug: 'understand-indian-philosophy',
    subtitle: 'The Six Astika Darshanas, Upanishadic Inquiries, and the Science of Mind',
    description: 'An intellectually honest expedition into how ancient Indian thinkers examined epistemology, validity of testimony, quantum-like observer consciousness, and the art of right action.',
    category: 'Philosophy & Ethics',
    level: 'Intermediate',
    duration: '4.8 Hours',
    totalLessons: 6,
    image: '/src/assets/images/college_library_hall_1793988204291.jpg',
    prerequisites: ['Openness to contemplative inquiry', 'No religious background needed'],
    learningOutcomes: [
      'Distinguish between the 6 Orthodox Darshanas and heterodox Buddhist/Jain schools',
      'Grasp the core equation of Chandogya Upanishad: Tat Tvam Asi (Thou Art That)',
      'Analyze Patanjali’s eight-limbed Ashtanga Yoga as a system of cognitive psychology',
      'Apply the multi-faceted truth model (Anekantavada) to modern debate and empathy'
    ],
    modules: [
      {
        id: 'mod-phil-1',
        title: 'Module 1: The Upanishadic Seed & Non-Duality',
        description: 'Inquiry into the unchanging ground of experience and universal consciousness.',
        lessonIds: ['lesson-advaita-vedanta', 'lesson-upanishadic-dialogues']
      },
      {
        id: 'mod-phil-2',
        title: 'Module 2: Nyaya Logic and Epistemic Proof',
        description: 'The 4 Pramanas: Perception, Inference, Comparison, and Trustworthy Testimony.',
        lessonIds: ['lesson-nyaya-logic', 'lesson-samkhya-prakriti']
      },
      {
        id: 'mod-phil-3',
        title: 'Module 3: Ethics in Action: The Gita and Ahimsa',
        description: 'Nishkama Karma (selfless action without attachment to fruits) in daily modern living.',
        lessonIds: ['lesson-gita-ethics', 'lesson-jain-anekanta']
      }
    ]
  },
  {
    id: 'path-indian-art',
    title: 'Journey Through Indian Art & Architecture',
    slug: 'journey-through-indian-art',
    subtitle: 'Sacred Proportions, Monolithic Feats, and The Symphony of Rasas',
    description: 'Decode the metaphysical blueprints of Indian temples, the lost-wax casting technique of Chola bronzes, and the emotional resonance of the 9 Rasas in aesthetic experience.',
    category: 'Arts & Architecture',
    level: 'Beginner',
    duration: '3.8 Hours',
    totalLessons: 5,
    image: '/src/assets/images/college_lecture_hall_1793988205558.jpg',
    prerequisites: ['No art history background needed'],
    learningOutcomes: [
      'Deconstruct the Vastu Purusha Mandala layout inside Dravida and Nagara temples',
      'Understand how Ellora Cave 16 was carved top-to-bottom removing 200,000 tons of basalt',
      'Analyze the iconography of Shiva Nataraja as cosmic rhythm and entropy',
      'Experience how the 9 Rasas inform Indian dance, theatre, and visual storytelling'
    ],
    modules: [
      {
        id: 'mod-art-1',
        title: 'Module 1: Monolithic Feats & Sacred Geometry',
        description: 'The engineering marvels of Ellora, Konark, and Brihadisvara.',
        lessonIds: ['lesson-ellora-kailasa', 'lesson-konark-astronomy']
      },
      {
        id: 'mod-art-2',
        title: 'Module 2: Classical Bronze and Painting Traditions',
        description: 'Cire perdue casting in Thanjavur and Ajanta’s natural mineral fresco pigments.',
        lessonIds: ['lesson-chola-bronzes', 'lesson-ajanta-murals']
      },
      {
        id: 'mod-art-3',
        title: 'Module 3: Natyashastra and The Aesthetic Experience',
        description: 'The emotional science of Rasa-Bhava: how art evokes transcendent empathy.',
        lessonIds: ['lesson-natyashastra-rasas']
      }
    ]
  }
];

export const LESSONS: Lesson[] = [
  {
    id: 'lesson-aryabhata-zero',
    title: 'The Decimal System, Zero, and Aryabhata’s Spherical Astronomy',
    slug: 'decimal-system-zero-aryabhata',
    subjectId: 'science',
    pathId: 'path-indian-math',
    summary: 'How ancient Indian mathematicians formulated the concept of zero as both a symbol and an operational number, calculated Earth’s circumference within 0.2% error, and proposed diurnal planetary rotation in 499 CE.',
    readTime: '12 min read',
    difficulty: 'Intermediate',
    coverImage: '/src/assets/images/college_tech_lab_1793988185936.jpg',
    author: {
      name: 'Dr. Radhika Sen',
      title: 'Professor of Classical Mathematics & Astronomy',
      institution: 'Nalanda International University'
    },
    sections: [
      {
        id: 'sec-1',
        title: '1. The Leap from Counting Beads to Shunya (Zero)',
        content: [
          'In early human civilizations, numbers were physical counters: tick marks on bone, pebbles in grooves, or abacus beads. When an empty column was reached, many cultures left a physical gap. If a scribe copied quickly, a blank space between symbols could blur or vanish.',
          'The Indian intellectual breakthrough, documented earliest in the Bakshali Manuscript (carbon-dated to circa 3rd century CE) and codified in Brahmagupta’s Brahmasphutasiddhanta (628 CE), was recognizing that "Nothingness" (Shunya) is not merely an absence of quantity—it is an independent mathematical entity with distinct algebraic properties.',
          'Brahmagupta established fundamental laws: "When zero is added to a number, or subtracted from a number, the number remains unchanged. A number multiplied by zero becomes zero."'
        ],
        quote: {
          text: 'India gave us the ingenious method of expressing all numbers by means of ten symbols, each symbol receiving a value of position as well as an absolute value... A profound and important idea which appears so simple now that we ignore its true merit.',
          author: 'Pierre-Simon Laplace (1749–1827)'
        }
      },
      {
        id: 'sec-2',
        title: '2. Aryabhata’s Aryabhatiya (499 CE): A 23-Year-Old Genius',
        content: [
          'At the age of only 23, in the ancient scholarly capital of Kusumapura (modern Patna), Aryabhata composed the Aryabhatiya—a concise Sanskrit verse treatise on mathematics and astronomy.',
          'Aryabhata revolutionized mathematical astronomy by proposing that the apparent daily motion of the stars from east to west is an optical illusion caused by the Earth’s own axial rotation from west to east. He used the famous boat analogy: "Just as a man in a boat moving forward sees stationary objects on the bank moving backward, so people at the equator see the stationary constellations moving westward."',
          'He calculated the length of the sidereal year to 365 days, 6 hours, 12 minutes, and 30 seconds—an error of only 3 minutes and 20 seconds compared to modern atomic clocks!'
        ],
        diagram: {
          type: 'astronomy-sphere',
          title: 'Aryabhata’s Khagola (Celestial Sphere) & Axial Rotation',
          caption: 'Interactive model illustrating Aryabhata’s concept of the diurnal rotation of the Earth on its axis relative to stationary stars.'
        }
      },
      {
        id: 'sec-3',
        title: '3. Calculating Pi and Trigonometric Sines (Jya)',
        content: [
          'In verse 10 of the Ganitapada, Aryabhata gives the ratio of circumference to diameter: "Add 4 to 100, multiply by 8, and then add 62,000. By this rule the circumference of a circle with a diameter of 20,000 can be approached."',
          'Working out the arithmetic: (104 × 8 + 62000) / 20000 = 62832 / 20000 = 3.1416! Crucially, Aryabhata used the word "asanna" (approaching/approximate), recognizing that the ratio is incommensurable (irrational)—a mathematical realization achieved in Europe more than a millennium later by Johann Heinrich Lambert in 1761.',
          'He also devised the first table of half-chords, known in Sanskrit as "Ardha-Jya" (later shortened to "Jya"). When translated into Arabic as "Jiba" and subsequently into Latin by Gerard of Cremona as "Sinus" (bay/fold), it gave birth to our modern trigonometric term: Sine.'
        ]
      }
    ],
    keyInsights: [
      'Zero was treated as an operational numerical concept with distinct algebraic axioms by Brahmagupta in 628 CE.',
      'Aryabhata deduced Earth’s axial rotation in 499 CE using the relative motion analogy of a boat.',
      'Aryabhata approximated Pi to 3.1416 and explicitly documented it as an approximation (asanna).',
      'Modern trigonometry terms like Sine originated from Sanskrit "Ardha-Jya" via Arabic translation.'
    ],
    shloka: {
      sanskrit: 'चतुरधिकं शतमष्टगुणं द्वाषष्टिस्तथा सहस्राणाम् ।\nअयुतद्वयविष्कम्भस्यासन्नो वृत्तपरिणाहः ॥',
      transliteration: 'chaturadhikam shatamashtagunam dvashashtistatha sahasranam |\nayutadvayavishkambhasyasanno vrittaparinahah ||',
      translation: 'Add 4 to 100, multiply by 8, and add 62,000. This is the approximate circumference of a circle with a diameter of 20,000.',
      source: 'Aryabhatiya, Ganitapada (Verse 10)',
      philosophicalContext: 'The explicit use of "asanna" (approximate) shows deep philosophical humility and an early mathematical recognition of the irrationality of Pi.'
    },
    quiz: [
      {
        id: 'q1',
        question: 'What metaphor did Aryabhata use to explain why stars appear to move across the sky?',
        options: [
          'A bird flying through clouds',
          'A person in a moving boat seeing stationary banks move backward',
          'A potter’s spinning wheel throwing clay',
          'A chariot wheel rolling along a dusty path'
        ],
        correctIndex: 1,
        explanation: 'Aryabhata explained relative motion: just as a passenger in a boat traveling forward observes the trees on the riverbank moving backward, an observer on Earth sees stationary stars rotating westward because the Earth is spinning eastward on its axis.'
      },
      {
        id: 'q2',
        question: 'Which Sanskrit mathematical term for half-chord evolved through Arabic into the modern word "Sine"?',
        options: ['Shunya', 'Kalan', 'Ardha-Jya', 'Rekha'],
        correctIndex: 2,
        explanation: 'Ardha-Jya (half-chord) was shortened to Jya, transliterated into Arabic as Jiba, misread as Jayb (fold/pocket), and translated into Latin as Sinus, giving us Sine.'
      },
      {
        id: 'q3',
        question: 'What was revolutionary about Aryabhata’s statement regarding the ratio Pi (3.1416)?',
        options: [
          'He claimed it was an exact whole integer',
          'He recognized it was an approximation ("asanna"), hinting at irrationality',
          'He declared it had no practical utility in architecture',
          'He deduced it using a wooden astrolabe'
        ],
        correctIndex: 1,
        explanation: 'By explicitly using the Sanskrit word "asanna" (approaching/approximate), Aryabhata noted that the true ratio cannot be expressed as an exact finite fraction.'
      }
    ],
    relatedLessonIds: ['lesson-mohenjo-daro', 'lesson-ellora-kailasa']
  },
  {
    id: 'lesson-mohenjo-daro',
    title: 'Mohenjo-daro & Harappa: Ancient Urban Planning and Hydrology',
    slug: 'mohenjo-daro-harappa-urban-hydrology',
    subjectId: 'history',
    pathId: 'path-ancient-india',
    summary: 'Step inside the bronze age cities that flourished 4,500 years ago along the Ghaggar-Hakra and Indus river basins, featuring standardized baked bricks, covered municipal drains, and egalitarian civic layouts.',
    readTime: '10 min read',
    difficulty: 'Beginner',
    coverImage: '/src/assets/images/college_campus_quad_1793988224316.jpg',
    author: {
      name: 'Prof. Arvind Namboodiri',
      title: 'Archaeological Historian & Urbanist',
      institution: 'Archaeological Survey of India & IIT Gandhinagar'
    },
    sections: [
      {
        id: 'sec-m1',
        title: '1. The Orthogonal Grid and Standardized Metrology',
        content: [
          'Long before the planned cities of Hellenistic Greece or imperial Rome, the Harappan civilization constructed cities with meticulous rectilinear grid layouts oriented cardinal north-south and east-west.',
          'Streets were designed with standardized widths: broad avenues 9 meters wide intersecting right-angle alleys 3 meters wide. Even more astonishing is their brick metrology: across hundreds of settlements spanning modern Gujarat, Rajasthan, Punjab, and Sindh, baked bricks conformed strictly to the universal ratio of 1:2:4 (thickness : width : length).',
          'This standardized ratio enabled the "English bond" style of masonry, distributing seismic load effectively across walls.'
        ]
      },
      {
        id: 'sec-m2',
        title: '2. The World’s Earliest Covered Sanitation System',
        content: [
          'What distinguishes the Indus Valley civilization from its contemporaries in Egypt and Mesopotamia is not monumental royal palaces or colossal tombs, but a profound civic dedication to public health, sanitation, and water access.',
          'Almost every domestic house had a private bathing area and terracotta vertical pipes running through exterior walls. Waste water flowed into covered street sewers made of finely fitted bricks, equipped with removable inspection slabs for periodic silt clearance by municipal workers.'
        ],
        diagram: {
          type: 'indus-drainage',
          title: 'Harappan Domestic Water & Subterranean Drainage Architecture',
          caption: 'Cross-section of domestic soak pits and gravity-fed brick sewer networks.'
        }
      },
      {
        id: 'sec-m3',
        title: '3. The Great Bath: Waterproofing with Natural Bitumen',
        content: [
          'At Mohenjo-daro stands the iconic "Great Bath", an enormous public water tank measuring 12 by 7 meters with a depth of 2.4 meters. Two wide staircases lead down to the floor, flanked by brick dressing chambers.',
          'To make the basin completely watertight, Harappan builders applied a thick layer of natural bitumen (asphalt) between the inner brick face and the outer retaining wall—one of the earliest documented uses of bitumen waterproofing in world civil engineering.'
        ]
      }
    ],
    keyInsights: [
      'Harappan bricks adhered to a uniform 1:2:4 ratio across thousands of square kilometers.',
      'Domestic houses contained private bathing rooms connected to covered municipal drainage networks.',
      'The Great Bath utilized natural bitumen (tar) waterproofing between double brick linings.',
      'Civic life prioritized sanitation, fresh well-water, and trade over monumental warlord tombs.'
    ],
    quiz: [
      {
        id: 'qm1',
        question: 'What universal dimension ratio was maintained by Harappan baked bricks across settlements?',
        options: ['1:1:2', '1:2:4', '1:3:5', '2:3:6'],
        correctIndex: 1,
        explanation: 'Harappan baked and sun-dried bricks conformed strictly to the 1:2:4 ratio (thickness:width:length), maximizing structural bonding.'
      },
      {
        id: 'qm2',
        question: 'What natural material did Harappan engineers use to waterproof the Great Bath at Mohenjo-daro?',
        options: ['Limestone paste', 'Natural bitumen (asphalt)', 'Beeswax and pine resin', 'Molten copper sheeting'],
        correctIndex: 1,
        explanation: 'Harappans layered natural bitumen (asphalt) behind brick courses to create an impervious seal.'
      }
    ],
    relatedLessonIds: ['lesson-aryabhata-zero', 'lesson-ellora-kailasa']
  },
  {
    id: 'lesson-natyashastra-rasas',
    title: 'The 9 Rasas of Natyashastra: The Classical Grammar of Emotion',
    slug: 'natyashastra-nine-rasas',
    subjectId: 'culture',
    pathId: 'path-indian-art',
    summary: 'Explore Bharata Muni’s ancient treatise on theatrical aesthetics, where emotion is transformed into spiritual delight (Ananda) through the interplay of Bhavas and the 9 fundamental Rasas.',
    readTime: '11 min read',
    difficulty: 'Beginner',
    coverImage: '/src/assets/images/college_convocation_1793988239815.jpg',
    author: {
      name: 'Padmashri Geeta Kalyani',
      title: 'Classical Exponent & Cultural Theorist',
      institution: 'Sangeet Natak Akademi'
    },
    sections: [
      {
        id: 'sec-r1',
        title: '1. What is Rasa? The Culinary Metaphor of Art',
        content: [
          'In the 6th chapter of the Natyashastra (circa 200 BCE – 200 CE), sage-theorist Bharata Muni asks the fundamental question of aesthetics: "Na hi rasad rite kashchid arthah pravartate" (No meaningful expression in art proceeds without Rasa).',
          'The Sanskrit word "Rasa" literally translates to taste, flavor, juice, or essence. Bharata draws an intuitive culinary metaphor: just as a master chef combines spices, herbs, vegetables, and oils so that a diner savors a transcendent unified taste, so the artist combines bodily gestures (Angika), vocal intonation (Vachika), and emotional states (Sattvika) to produce an aesthetic savor in the spectator (Sahrdaya).'
        ]
      },
      {
        id: 'sec-r2',
        title: '2. The Spectrum of the Navarasas (The Nine Essences)',
        content: [
          '1. Shringara (Erotic / Love / Beauty): The crown rasa, evoked by romance, blooming flowers, and sweet melodies.',
          '2. Hasya (Comic / Mirth): Evoked through incongruity, gentle satire, and joyful laughter.',
          '3. Karuna (Pathos / Compassion): Evoked by sorrow, separation, and deep empathy for suffering.',
          '4. Raudra (Fury / Anger): Evoked by injustice, insult, and righteous outrage.',
          '5. Vira (Heroism / Courage): Evoked by noble valor, generosity, and unwavering determination.',
          '6. Bhayanaka (Terror / Fear): Evoked by darkness, mortal threat, and uncanny dread.',
          '7. Bibhatsa (Disgust / Aversion): Evoked by foulness, corruption, and decay, sparking renunciation.',
          '8. Adbhuta (Wonder / Awe): Evoked by miraculous sights, celestial realms, and immense vistas.',
          '9. Shanta (Peace / Equanimity): Added by later Kashmiri philosopher Abhinavagupta, representing the transcendent stillness that remains when all transient emotions dissolve.'
        ],
        diagram: {
          type: 'nine-rasas',
          title: 'The Navarasa Mandalam: Primary Emotions & Corresponding Colors',
          caption: 'Interactive wheel mapping the 9 Rasas, dominant deities, and traditional visual pigments.'
        }
      }
    ],
    keyInsights: [
      'Rasa represents aesthetic flavor or essence, transforming personal emotion into universal contemplation.',
      'The Natyashastra outlines 8 original rasas, with the 9th (Shanta - Tranquility) added by Abhinavagupta.',
      'Art is successful only when the audience member (Sahrdaya - one of similar heart) experiences emotional catharsis.'
    ],
    shloka: {
      sanskrit: 'विभावानुभावव्यभिचारिसंयोगाद्रसनिष्पत्तिः ॥',
      transliteration: 'vibhavanubhavavyabhicharisamyogad rasanishpattih ||',
      translation: 'Rasa arises from the harmonious combination of the stimulant (Vibhava), the involuntary reaction (Anubhava), and the transitory emotions (Vyabhichari Bhava).',
      source: 'Natyashastra, Chapter 6 (Rasa Sutra)',
      philosophicalContext: 'Known as the Rasa Sutra, this single aphorism is the cornerstone of classical Indian literary and dramatic criticism.'
    },
    quiz: [
      {
        id: 'qr1',
        question: 'Which Kashmiri philosopher famously championed "Shanta" (Peace/Tranquility) as the foundational 9th Rasa?',
        options: ['Panini', 'Abhinavagupta', 'Kalidasa', 'Chanakya'],
        correctIndex: 1,
        explanation: 'In his commentary Abhinavabharati, the 10th-century aesthetician Abhinavagupta argued that Shanta is the baseline tranquility out of which all other Rasas emerge.'
      }
    ],
    relatedLessonIds: ['lesson-ellora-kailasa', 'lesson-advaita-vedanta']
  },
  {
    id: 'lesson-advaita-vedanta',
    title: 'The Core of Advaita Vedanta: Self, Cosmos, and Consciousness',
    slug: 'core-of-advaita-vedanta',
    subjectId: 'philosophy',
    pathId: 'path-indian-philosophy',
    summary: 'Deconstruct Adi Shankara’s philosophy of non-dualism, exploring how the individual observer (Atman) and universal ground of reality (Brahman) are fundamentally non-different.',
    readTime: '14 min read',
    difficulty: 'Advanced',
    coverImage: '/src/assets/images/college_library_hall_1793988204291.jpg',
    author: {
      name: 'Acharya V. Subramanian',
      title: 'Senior Fellow in Indic Epistemology',
      institution: 'Sringeri Sharada Peetham Heritage Center'
    },
    sections: [
      {
        id: 'sec-a1',
        title: '1. What Does "Advaita" Mean?',
        content: [
          '"Advaita" literally translates to "Not Two" (A = non, Dvaita = dual). Rather than positing God as an external watchmaker separate from the creation, Advaita asserts that the observer, the observed, and the act of observation are all modulations of a single boundless field of Pure Awareness (Brahman).',
          'Adi Shankara (circa 8th century CE) summarized this in a famous single couplet: "Brahma satyam jagan mithya, jivo brahmaiva naparah" (Brahman alone is real; the changing world is an apparent manifestation; the individual self is nothing other than Brahman).'
        ],
        quote: {
          text: 'In the whole world there is no study so beneficial and so elevating as that of the Upanishads. It has been the solace of my life, it will be the solace of my death.',
          author: 'Arthur Schopenhauer (1788–1860)'
        }
      },
      {
        id: 'sec-a2',
        title: '2. The Rope and the Snake Metaphor (Adhyasa)',
        content: [
          'To explain how delusion occurs without destroying the underlying reality, Shankara used the famous analogy of mistaking a coiled rope for a venomous snake in the twilight.',
          'When you walk into a dim room, your mind projects the fear and characteristics of a serpent onto the rope. The snake was never actually born, yet the fear you experienced was psychologically real. The moment someone turns on a lantern, the illusion vanishes instantly. The rope was never damaged by the snake, nor did it turn into a snake.',
          'In this analogy, the rope is Brahman, the lantern is discriminatory knowledge (Jnana), and the imaginary snake is the transient, fragmented ego.'
        ]
      }
    ],
    keyInsights: [
      'Advaita posits non-duality: the experiential observer is identical with the cosmic substratum.',
      'Maya is not absolute non-existence, but apparent change superimposed on the changeless (Adhyasa).',
      'Direct experiential realization (Anubhuti), not intellectual belief alone, constitutes liberation (Moksha).'
    ],
    shloka: {
      sanskrit: 'ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥',
      transliteration: 'om asato ma sadgamaya | tamaso ma jyotirgamaya | mrityorma amritam gamaya ||',
      translation: 'Lead me from the unreal to the real. Lead me from darkness to light. Lead me from death to immortality.',
      source: 'Brihadaranyaka Upanishad (1.3.28)',
      philosophicalContext: 'The universal Vedic aspiration for cognitive clarity and transcendence over transient fear.'
    },
    quiz: [
      {
        id: 'qa1',
        question: 'What is the literal translation of the Sanskrit word "Advaita"?',
        options: ['Monotheism', 'Not Two (Non-dual)', 'Ascetic renunciation', 'Sacred sound'],
        correctIndex: 1,
        explanation: 'Advaita translates literally to "Not Two", pointing to the undivided nature of reality and consciousness.'
      }
    ],
    relatedLessonIds: ['lesson-aryabhata-zero', 'lesson-natyashastra-rasas']
  },
  {
    id: 'lesson-ellora-kailasa',
    title: 'Kailasa Temple at Ellora: The Monolithic Marvel Carved from Top to Bottom',
    slug: 'ellora-kailasa-temple-architecture',
    subjectId: 'art-architecture',
    pathId: 'path-indian-art',
    summary: 'How Rashtrakuta masons in the 8th century carved an entire multi-story Dravidian cathedral out of a single living basalt cliffside, without any scaffolding or assembled joints.',
    readTime: '13 min read',
    difficulty: 'Intermediate',
    coverImage: '/src/assets/images/college_lecture_hall_1793988205558.jpg',
    author: {
      name: 'Dr. Suniti Deshmukh',
      title: 'Architectural Historian of Ancient Monoliths',
      institution: 'Deccan College Post-Graduate and Research Institute'
    },
    sections: [
      {
        id: 'sec-e1',
        title: '1. The Reverse Engineering of Rock-Cut Architecture',
        content: [
          'Conventional buildings are assembled from the ground up: foundations are laid, columns erected, beams positioned, and ceilings closed. If an artisan drops a chisel or cracks a lintel, a replacement block is fetched from the quarry.',
          'At Cave 16 of Ellora (Maharashtra), commissioned under Rashtrakuta king Krishna I in the 8th century CE, the builders did the exact opposite: they excavated vertically downwards from the cliff summit into the basalt hill.',
          'Over an estimated two to three decades, master stonemasons removed between 200,000 and 400,000 tons of hard volcanic trap rock using only iron hammers, chisels, and wooden wedges soaked in water to split rock seams.'
        ]
      },
      {
        id: 'sec-e2',
        title: '2. Zero Margin for Error: Sculpting in Negative Space',
        content: [
          'Because the temple is a monolithic subtractive sculpture rather than an assembly of stones, there was zero margin for error. If a mason fractured the stone leg of a life-size elephant frieze or carved a sanctum column too thin, it could never be glued back or swapped.',
          'The entire structure—spanning 90 meters long, 50 meters wide, and reaching 30 meters high (twice the footprint of the Parthenon in Athens)—was pre-visualized in complete three-dimensional coordinate detail before a single strike of the chisel.'
        ],
        diagram: {
          type: 'temple-architecture',
          title: 'Architectural Section: The Monolithic Dravidian Vimana of Kailasa',
          caption: 'Interactive vertical cross-section showing the Shikhara, Mandapa, Nandi pavilion, and courtyard galleries.'
        }
      }
    ],
    keyInsights: [
      'Kailasa Temple is the largest monolithic rock-cut structure on Earth.',
      'It was excavated vertically downwards from the crown of the cliff, removing ~200,000 tons of solid basalt.',
      'Master craftsmen carved multi-story colonnades, life-size elephants, and soaring spires in negative space with zero error tolerance.'
    ],
    quiz: [
      {
        id: 'qe1',
        question: 'Under which prominent royal dynasty was the monolithic Kailasa Temple at Ellora primarily excavated?',
        options: ['Chola Dynasty', 'Rashtrakuta Dynasty', 'Mughal Dynasty', 'Gupta Dynasty'],
        correctIndex: 1,
        explanation: 'Kailasa Temple (Cave 16) was commissioned under King Krishna I of the Rashtrakuta dynasty during the 8th century CE.'
      }
    ],
    relatedLessonIds: ['lesson-mohenjo-daro', 'lesson-natyashastra-rasas']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Ananya Deshmukh',
    role: 'History Undergraduate',
    institution: 'St. Stephen’s College, Delhi',
    location: 'New Delhi, India',
    quote: 'BharatGyan has completely transformed how I understand Indian intellectual history. The interactive astronomy diagrams for Aryabhata make concepts that felt abstract in textbooks crystal clear and awe-inspiring.',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Dr. Michael Chen',
    role: 'Visiting Scholar of World Civilizations',
    institution: 'University of Edinburgh',
    location: 'Edinburgh, UK',
    quote: 'The scholarly accuracy and lack of hyperbole is refreshing. Seeing the exact Sanskrit shlokas, English translations, and architectural cross-sections of Ellora in one place makes BharatGyan an invaluable global resource.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Venkatesh Iyer',
    role: 'Civil Engineering Graduate',
    institution: 'IIT Madras',
    location: 'Chennai, India',
    quote: 'The lesson on Harappan hydrology and underground drainage design provided engineering insights you simply don’t get anywhere else. The progress tracking and modular quizzes kept me deeply engaged.',
    rating: 5
  }
];
