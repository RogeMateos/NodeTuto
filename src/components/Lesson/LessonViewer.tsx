import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useProgress } from '@/hooks/useProgress';
import { useFavorites } from '@/hooks/useFavorites';
import { useLanguage } from '@/hooks/useLanguage';
import { Lesson } from '@/types/index';

declare global {
  interface Window {
    Prism: { highlightAll: () => void };
  }
}

export const LessonViewer = ({ lesson }: { lesson: Lesson | null }) => {
  const { t } = useTranslation();
  const { current: language } = useLanguage();
  const { isCompleted, toggle: toggleProgress } = useProgress();
  const { isFavorite, toggle: toggleFavorite } = useFavorites();

  useEffect(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  }, [lesson, language]);

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500 dark:text-gray-400">{t('common.loading')}</p>
      </div>
    );
  }

  const lang = language as 'es' | 'en';
  const content = lesson[lang];
  const completed = isCompleted(lesson.id);
  const favorite = isFavorite(lesson.id);

  return (
    <article className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          {content.title}
        </h1>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => toggleProgress(lesson.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              completed
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-slate-900 dark:text-white'
            }`}
          >
            {completed ? '✓ ' : ''}
            {t('lesson.markAsComplete')}
          </button>

          <button
            onClick={() => toggleFavorite(lesson.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              favorite
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-slate-900 dark:text-white'
            }`}
          >
            {favorite ? '★ ' : '☆ '} {t('lesson.addToFavorites')}
          </button>
        </div>
      </div>

      {/* Content sections */}
      <div className="prose dark:prose-invert max-w-none">
        {content.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <div
              dangerouslySetInnerHTML={{ __html: section.content }}
              className="text-slate-700 dark:text-gray-300"
            />
          </div>
        ))}
      </div>
    </article>
  );
};
