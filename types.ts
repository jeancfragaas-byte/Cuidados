
export enum View {
  HOME = 'home',
  EXERCISES = 'exercises',
  LIBRARY = 'library',
  SETTINGS = 'settings',
  CONTENT_DETAIL = 'content_detail',
  BREATHING = 'breathing',
  TRAILS = 'trails'
}

export interface ContentItem {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullContent: string;
  readTime: string;
}

export interface ExerciseItem {
  id: string;
  title: string;
  duration: number; // in minutes
  type: 'breathing' | 'stretch' | 'mindfulness';
  description: string;
}

export interface Trail {
  id: string;
  title: string;
  description: string;
  steps: string[]; // Content IDs or Exercise IDs
}
