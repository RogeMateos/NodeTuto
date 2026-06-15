import { useEffect, useState } from 'react';
import useTutorialStore from '@/store/tutorialStore';
import { tutorialService } from '@/services/tutorialService';

export const useTutorials = () => {
  const tutorials = useTutorialStore((state) => state.tutorials);
  const setTutorials = useTutorialStore((state) => state.setTutorials);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTutorials = async () => {
      try {
        setLoading(true);
        const modules = await tutorialService.loadModules();
        setTutorials(modules);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Failed to load tutorials:', err);
      } finally {
        setLoading(false);
      }
    };

    if (tutorials.length === 0) {
      loadTutorials();
    } else {
      setLoading(false);
    }
  }, []);

  return {
    tutorials,
    loading,
    error,
    totalLessons: tutorials.reduce((sum, m) => sum + (m.lessons?.length || 0), 0),
  };
};
