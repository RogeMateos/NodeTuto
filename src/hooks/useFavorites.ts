import { useCallback } from 'react';
import useTutorialStore from '@/store/tutorialStore';

export const useFavorites = () => {
  const favorites = useTutorialStore((state) => state.favorites);
  const toggleFavorite = useTutorialStore((state) => state.toggleFavorite);

  const isFavorite = useCallback(
    (lessonId: string) => favorites.includes(lessonId),
    [favorites]
  );

  return {
    favorites,
    isFavorite,
    toggle: toggleFavorite,
    count: favorites.length,
  };
};
