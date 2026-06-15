import { useCallback } from 'react';
import useTutorialStore from '@/store/tutorialStore';

export const useProgress = () => {
  const progress = useTutorialStore((state) => state.progress);
  const toggleProgress = useTutorialStore((state) => state.toggleProgress);

  const isCompleted = useCallback(
    (lessonId: string) => !!progress[lessonId],
    [progress]
  );

  const completedCount = useCallback(
    () => Object.values(progress).filter(Boolean).length,
    [progress]
  );

  const completionPercentage = useCallback(
    (total: number) => {
      if (total === 0) return 0;
      return Math.round((completedCount() / total) * 100);
    },
    [completedCount]
  );

  return {
    progress,
    isCompleted,
    toggle: toggleProgress,
    completedCount,
    completionPercentage,
  };
};
