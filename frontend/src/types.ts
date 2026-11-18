export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Subject {
  id: string;
  name: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  iconName: string;
  lessonCount: number;
  pathCount: number;
  featured: boolean;
  topics: string[];
}

export interface PathModule {
  id: string;
  title: string;
  description: string;
  lessonIds: string[];
}

export interface LearningPath {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  category: string;
  level: Difficulty;
  duration: string;
  totalLessons: number;
  image: string;
  prerequisites: string[];
  learningOutcomes: string[];
  modules: PathModule[];
}

export interface DiagramData {
  type: 'astronomy-sphere' | 'temple-architecture' | 'nine-rasas' | 'indus-drainage' | 'sushruta-tools';
  title: string;
  caption: string;
}

export interface ShlokaInsight {
  sanskrit: string;
  transliteration: string;
  translation: string;
  source: string;
  philosophicalContext: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string[];
  quote?: {
    text: string;
    author: string;
  };
  diagram?: DiagramData;
}

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  subjectId: string;
  pathId?: string;
  summary: string;
  readTime: string;
  difficulty: Difficulty;
  coverImage: string;
  author: {
    name: string;
    title: string;
    institution: string;
  };
  sections: LessonSection[];
  keyInsights: string[];
  shloka?: ShlokaInsight;
  quiz: QuizQuestion[];
  relatedLessonIds: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  institution: string;
  location: string;
  quote: string;
  rating: number;
}

export interface UserProgress {
  completedLessonIds: string[];
  enrolledPathIds: string[];
  bookmarkedLessonIds: string[];
  quizScores: Record<string, number>;
}
