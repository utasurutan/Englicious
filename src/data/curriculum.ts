import { SkillCategory } from '../types';

export interface PathNode {
  id: string;
  lessonId: string;
  title: string;
  category: SkillCategory;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'completed' | 'current' | 'locked';
  progress: number;
  xpReward: number;
  description: string;
  iconName: string;
}

export interface LevelCurriculum {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  cefr: string;
  title: string;
  subtitle: string;
  description: string;
  milestoneTitle: string;
  nodes: PathNode[];
}

export const CURRICULA: Record<'Beginner' | 'Intermediate' | 'Advanced', LevelCurriculum> = {
  Beginner: {
    level: 'Beginner',
    cefr: 'A1 - A2',
    title: 'Foundations & Everyday Fluency',
    subtitle: 'From zero to comfortable everyday interactions',
    description: 'Build core vocabulary, standard sentence patterns, question formation, and essential listening comprehension.',
    milestoneTitle: 'A2 Breakthrough Exam',
    nodes: [
      {
        id: 'node-b1',
        lessonId: 'lesson-vocab-foundations',
        title: 'Grammar Foundations',
        category: 'Grammar',
        level: 'Beginner',
        status: 'completed',
        progress: 100,
        xpReward: 65,
        description: 'Subject pronouns, the verb "to be", and simple present sentences.',
        iconName: 'BookOpen'
      },
      {
        id: 'node-b2',
        lessonId: 'lesson-vocab-foundations',
        title: 'Everyday Vocabulary',
        category: 'Vocabulary',
        level: 'Beginner',
        status: 'completed',
        progress: 100,
        xpReward: 70,
        description: 'Common foods, home items, family terms, and time expressions.',
        iconName: 'Sparkles'
      },
      {
        id: 'node-b3',
        lessonId: 'lesson-speaking-fluency',
        title: 'Basic Conversations',
        category: 'Speaking',
        level: 'Beginner',
        status: 'current',
        progress: 50,
        xpReward: 75,
        description: 'Introducing yourself, ordering at a cafe, asking for directions.',
        iconName: 'MessageCircle'
      },
      {
        id: 'node-b4',
        lessonId: 'lesson-listening-essentials',
        title: 'Listening Essentials',
        category: 'Listening',
        level: 'Beginner',
        status: 'locked',
        progress: 0,
        xpReward: 80,
        description: 'Understand numbers, dates, times, and short spoken instructions.',
        iconName: 'Headphones'
      },
      {
        id: 'node-b5',
        lessonId: 'lesson-reading-mastery',
        title: 'Reading Practice',
        category: 'Reading',
        level: 'Beginner',
        status: 'locked',
        progress: 0,
        xpReward: 85,
        description: 'Read signs, menus, simple emails, and short cultural stories.',
        iconName: 'FileText'
      },
      {
        id: 'node-b6',
        lessonId: 'lesson-checkpoint-b',
        title: 'A2 Mastery Checkpoint',
        category: 'Grammar',
        level: 'Beginner',
        status: 'locked',
        progress: 0,
        xpReward: 120,
        description: 'Test your foundation before advancing to Intermediate.',
        iconName: 'Award'
      }
    ]
  },
  Intermediate: {
    level: 'Intermediate',
    cefr: 'B1 - B2',
    title: 'Independence & Professional Confidence',
    subtitle: 'Express nuanced thoughts, work in English, and prep for exams',
    description: 'Bridge conversational English to professional fluency. Complex past & conditional tenses, academic reading, and test reasoning.',
    milestoneTitle: 'B2 Independent Speaker Test',
    nodes: [
      {
        id: 'node-i1',
        lessonId: 'lesson-past-tense',
        title: 'Past Tense Mastery',
        category: 'Grammar',
        level: 'Intermediate',
        status: 'current',
        progress: 72,
        xpReward: 80,
        description: 'Irregular verbs, past continuous vs past simple, narration.',
        iconName: 'Clock'
      },
      {
        id: 'node-i2',
        lessonId: 'lesson-listening-essentials',
        title: 'Fast Speech & Reductions',
        category: 'Listening',
        level: 'Intermediate',
        status: 'unlocked' as 'current',
        progress: 35,
        xpReward: 75,
        description: 'Gotta, gonna, wanna, elisions, and natural native rhythm.',
        iconName: 'Headphones'
      },
      {
        id: 'node-i3',
        lessonId: 'lesson-vocab-foundations',
        title: 'Collocations & Phrasal Verbs',
        category: 'Vocabulary',
        level: 'Intermediate',
        status: 'locked',
        progress: 0,
        xpReward: 85,
        description: 'Turn up, call off, take after, and natural collocations.',
        iconName: 'Layers'
      },
      {
        id: 'node-i4',
        lessonId: 'lesson-reading-mastery',
        title: 'Editorial & Opinion Reading',
        category: 'Reading',
        level: 'Intermediate',
        status: 'locked',
        progress: 0,
        xpReward: 90,
        description: 'Analyzing articles, author perspective, and implied inferences.',
        iconName: 'Compass'
      },
      {
        id: 'node-i5',
        lessonId: 'lesson-speaking-fluency',
        title: 'Debate & Persuasion',
        category: 'Speaking',
        level: 'Intermediate',
        status: 'locked',
        progress: 0,
        xpReward: 95,
        description: 'Structuring arguments, agreeing/disagreeing diplomatically.',
        iconName: 'Mic'
      },
      {
        id: 'node-i6',
        lessonId: 'lesson-checkpoint-i',
        title: 'IELTS / TOEFL Gateway Test',
        category: 'Grammar',
        level: 'Intermediate',
        status: 'locked',
        progress: 0,
        xpReward: 150,
        description: 'Comprehensive evaluation calibrated for B2 certification.',
        iconName: 'Trophy'
      }
    ]
  },
  Advanced: {
    level: 'Advanced',
    cefr: 'C1 - C2',
    title: 'Academic, Stylistic & Native-Level Mastery',
    subtitle: 'High-register vocabulary, rhetoric, and top exam percentiles',
    description: 'Command subtle nuances, idioms, academic research synthesis, and achieve top IELTS Band 8+ or TOEFL 110+ scores.',
    milestoneTitle: 'C1/C2 Native Proficiency Exam',
    nodes: [
      {
        id: 'node-a1',
        lessonId: 'lesson-reading-mastery',
        title: 'Academic Synthesis & Discourse',
        category: 'Reading',
        level: 'Advanced',
        status: 'current',
        progress: 20,
        xpReward: 90,
        description: 'Dense peer-reviewed scientific and historical texts.',
        iconName: 'BookOpen'
      },
      {
        id: 'node-a2',
        lessonId: 'lesson-speaking-fluency',
        title: 'Nuanced Rhetoric & Idioms',
        category: 'Speaking',
        level: 'Advanced',
        status: 'locked',
        progress: 0,
        xpReward: 100,
        description: 'Subtle ironies, cultural metaphors, and tone modulation.',
        iconName: 'Flame'
      },
      {
        id: 'node-a3',
        lessonId: 'lesson-listening-essentials',
        title: 'Academic Lectures & Debates',
        category: 'Listening',
        level: 'Advanced',
        status: 'locked',
        progress: 0,
        xpReward: 95,
        description: 'Complex multi-speaker discussions with varied global accents.',
        iconName: 'Volume2'
      },
      {
        id: 'node-a4',
        lessonId: 'lesson-past-tense',
        title: 'Inversion & Subjunctive Mood',
        category: 'Grammar',
        level: 'Advanced',
        status: 'locked',
        progress: 0,
        xpReward: 110,
        description: 'Hardly had I..., Were it not for..., and elevated prose.',
        iconName: 'Feather'
      },
      {
        id: 'node-a5',
        lessonId: 'lesson-checkpoint-a',
        title: 'TOEFL 115+ / IELTS 8.5 Master Challenge',
        category: 'Reading',
        level: 'Advanced',
        status: 'locked',
        progress: 0,
        xpReward: 200,
        description: 'The ultimate benchmark for total fluency.',
        iconName: 'Zap'
      }
    ]
  }
};

