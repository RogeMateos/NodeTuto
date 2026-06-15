// src/store/tutorialStore.ts

import { create } from 'zustand';
import { TutorialStore, Module, Lesson } from '@/types/index';

const useTutorialStore = create<TutorialStore>((set, get) => ({
  // Initial state
  tutorials: [],
  language: 'es',
  currentLesson: null,
  searchQuery: '',
  progress: {},
  favorites: [],

  // Actions
  setTutorials: (tutorials: Module[]) => set({ tutorials }),

  setLanguage: (lang: 'es' | 'en') => {
    set({ language: lang });
    get().saveToStorage();
  },

  setCurrentLesson: (lesson: Lesson | null) => set({ currentLesson: lesson }),

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  toggleProgress: (lessonId: string) => {
    set((state) => ({
      progress: {
        ...state.progress,
        [lessonId]: !state.progress[lessonId],
      },
    }));
    get().saveToStorage();
  },

  toggleFavorite: (lessonId: string) => {
    set((state) => ({
      favorites: state.favorites.includes(lessonId)
        ? state.favorites.filter((id) => id !== lessonId)
        : [...state.favorites, lessonId],
    }));
    get().saveToStorage();
  },

  loadFromStorage: () => {
    try {
      const stored = localStorage.getItem('tutorialState');
      if (stored) {
        const { progress, favorites, language } = JSON.parse(stored);
        set({ progress, favorites, language });
      }
    } catch (error) {
      console.error('Failed to load from storage:', error);
    }
  },

  saveToStorage: () => {
    const state = get();
    try {
      localStorage.setItem(
        'tutorialState',
        JSON.stringify({
          progress: state.progress,
          favorites: state.favorites,
          language: state.language,
        })
      );
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  },
}));

export default useTutorialStore;
