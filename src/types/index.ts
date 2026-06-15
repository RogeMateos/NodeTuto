// src/types/index.ts

export interface Section {
  type: 'introduction' | 'learning-goals' | 'explanation' | 'examples' | 'best-practices' | 'common-mistakes' | 'exercise' | 'solution' | 'summary' | 'resources' | 'questions';
  content: string;
}

export interface LessonContent {
  title: string;
  sections: Section[];
}

export interface Lesson {
  id: string;
  type: 'lesson' | 'exam';
  order: number;
  es: LessonContent;
  en: LessonContent;
}

export interface ModuleMeta {
  id: string;
  lessonCount: number;
}

export interface ModuleContent {
  title: string;
  description: string;
}

export interface Module {
  id: string;
  order: number;
  es: ModuleContent;
  en: ModuleContent;
  lessons?: Lesson[];
}

export interface ModulesData {
  modules: Module[];
}

export interface TutorialStore {
  // Data
  tutorials: Module[];
  language: 'es' | 'en';
  currentLesson: Lesson | null;
  searchQuery: string;

  // User state (persisted)
  progress: Record<string, boolean>;
  favorites: string[];

  // Actions
  setTutorials: (tutorials: Module[]) => void;
  setLanguage: (lang: 'es' | 'en') => void;
  setCurrentLesson: (lesson: Lesson | null) => void;
  setSearchQuery: (query: string) => void;
  toggleProgress: (lessonId: string) => void;
  toggleFavorite: (lessonId: string) => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

export interface SearchResult {
  lessonId: string;
  moduleId: string;
  title: string;
  preview: string;
  type: 'lesson' | 'exam';
}
