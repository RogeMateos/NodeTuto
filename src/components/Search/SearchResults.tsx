import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useTutorialStore from '@/store/tutorialStore';
import { useTutorials } from '@/hooks/useTutorials';
import { useLanguage } from '@/hooks/useLanguage';
import { tutorialService } from '@/services/tutorialService';
import { LessonCard } from '@/components/Common/LessonCard';

export const SearchResults = () => {
  const { t } = useTranslation();
  const searchQuery = useTutorialStore((state) => state.searchQuery);
  const { tutorials } = useTutorials();
  const { current: language } = useLanguage();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const search = async () => {
      setLoading(true);
      const searchResults = await tutorialService.search(
        tutorials,
        searchQuery,
        language as 'es' | 'en'
      );
      setResults(searchResults);
      setLoading(false);
    };

    search();
  }, [searchQuery, tutorials, language]);

  if (!searchQuery) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
        {t('search.resultsFor')}: "{searchQuery}"
      </h1>

      {loading && <p className="text-gray-600">{t('common.loading')}</p>}

      {!loading && results.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400">
          {t('search.noResults')}
        </p>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((result) => {
            const module = tutorials.find((m) => m.id === result.moduleId);
            const lesson = module?.lessons?.find((l) => l.id === result.lessonId);

            if (!module || !lesson) return null;

            return (
              <LessonCard
                key={result.lessonId}
                lesson={lesson}
                module={module}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
