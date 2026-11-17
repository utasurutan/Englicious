import { Lesson } from '../types';
import { BEGINNER_LESSONS } from './lessons/beginnerLessons';
import { INTERMEDIATE_LESSONS } from './lessons/intermediateLessons';
import { ADVANCED_LESSONS } from './lessons/advancedLessons';

export { BEGINNER_LESSONS } from './lessons/beginnerLessons';
export { INTERMEDIATE_LESSONS } from './lessons/intermediateLessons';
export { ADVANCED_LESSONS } from './lessons/advancedLessons';

export const SAMPLE_LESSONS: Lesson[] = [
  ...BEGINNER_LESSONS,
  ...INTERMEDIATE_LESSONS,
  ...ADVANCED_LESSONS
];
