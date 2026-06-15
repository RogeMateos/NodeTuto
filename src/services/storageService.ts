// src/services/storageService.ts

const STORAGE_KEY = 'tutorialState';

export interface StorageState {
  progress: Record<string, boolean>;
  favorites: string[];
  language: 'es' | 'en';
}

export const storageService = {
  load: (): Partial<StorageState> => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load from storage:', error);
      return {};
    }
  },

  save: (state: StorageState): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  },

  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  },
};
