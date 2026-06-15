import { useTranslation } from 'react-i18next';
import useTutorialStore from '@/store/tutorialStore';
import { cn } from '@/utils/cn';

interface SearchBarProps {
  className?: string;
  autoFocus?: boolean;
}

export const SearchBar = ({ className, autoFocus = false }: SearchBarProps) => {
  const { t } = useTranslation();
  const searchQuery = useTutorialStore((state) => state.searchQuery);
  const setSearchQuery = useTutorialStore((state) => state.setSearchQuery);

  return (
    <input
      type="text"
      placeholder={t('search.placeholder')}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      autoFocus={autoFocus}
      className={cn(
        'w-full px-4 py-3 rounded-lg border',
        'border-gray-300 dark:border-gray-700',
        'bg-white dark:bg-slate-800',
        'text-slate-900 dark:text-white',
        'placeholder-gray-500 dark:placeholder-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-blue-500',
        'transition-colors',
        className
      )}
    />
  );
};
