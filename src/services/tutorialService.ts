// src/services/tutorialService.ts

import { Module, Lesson } from '@/types/index';

export const tutorialService = {
  // Load all modules metadata with lessons
  loadModules: async (): Promise<Module[]> => {
    try {
      const response = await import('@/data/tutorials/modules.json');
      const modules: Module[] = response.modules ?? [];

      // Load lessons for each module
      for (const module of modules) {
        try {
          module.lessons = await tutorialService.loadLessons(module.id);
        } catch (error) {
          console.error(`Failed to load lessons for module ${module.id}:`, error);
          module.lessons = [];
        }
      }

      return modules;
    } catch (error) {
      console.error('Failed to load modules:', error);
      return [];
    }
  },

  // Load lessons for a specific module
  loadLessons: async (moduleId: string): Promise<Lesson[]> => {
    try {
      const lessonsContext = import.meta.glob(
        '@/data/tutorials/modules/*/lessons/*.json',
        { eager: true }
      );

      const lessons = Object.entries(lessonsContext)
        .filter(([path]) => path.includes(`modules/${moduleId}/lessons/`))
        .map(([, content]: [string, any]) => content.default || content);

      return lessons as Lesson[];
    } catch (error) {
      console.error(`Failed to load lessons for module ${moduleId}:`, error);
      return [];
    }
  },

  // Load a single lesson
  loadLesson: async (
    moduleId: string,
    lessonId: string
  ): Promise<Lesson | null> => {
    try {
      const module = await import(
        `@/data/tutorials/modules/${moduleId}/lessons/${lessonId}.json`
      );
      return module.default || module;
    } catch (error) {
      console.error(
        `Failed to load lesson ${lessonId} from module ${moduleId}:`,
        error
      );
      return null;
    }
  },

  // Search lessons by query (simple text search)
  search: async (
    modules: Module[],
    query: string,
    language: 'es' | 'en'
  ): Promise<any[]> => {
    const lowerQuery = query.toLowerCase();
    const results = [];

    for (const module of modules) {
      const lessons = await tutorialService.loadLessons(module.id);
      for (const lesson of lessons) {
        const content = lesson[language];
        if (
          content.title.toLowerCase().includes(lowerQuery) ||
          content.sections.some((s) =>
            s.content.toLowerCase().includes(lowerQuery)
          )
        ) {
          results.push({
            lessonId: lesson.id,
            moduleId: module.id,
            title: content.title,
            type: lesson.type,
          });
        }
      }
    }

    return results;
  },
};
