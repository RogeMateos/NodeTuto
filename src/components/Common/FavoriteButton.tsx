import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/utils/cn';

interface FavoriteButtonProps {
  lessonId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className="w-3.5 h-3.5 transition-all"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const FavoriteButton = ({ lessonId, className }: FavoriteButtonProps) => {
  const { isFavorite, toggle } = useFavorites();
  const favorite = isFavorite(lessonId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(lessonId);
      }}
      className={cn(
        'p-1.5 rounded-lg transition-all duration-150',
        favorite
          ? 'text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-950/60'
          : 'text-slate-300 dark:text-slate-700 hover:text-rose-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30',
        className
      )}
      title={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <HeartIcon filled={favorite} />
    </button>
  );
};
