import { useTranslation } from 'react-i18next';
import { useFavorites } from '@/hooks/useFavorites';
import { useTutorials } from '@/hooks/useTutorials';
import { LessonCard } from '@/components/Common/LessonCard';
import { motion } from 'framer-motion';

export const Favorites = () => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();
  const { tutorials } = useTutorials();

  const favoriteLesson = tutorials
    .flatMap((m) => m.lessons?.map((l) => ({ ...l, moduleId: m.id })) || [])
    .filter((l) => favorites.includes(l.id));

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-slate-900 dark:text-white mb-8"
      >
        {t('common.favorites')}
      </motion.h1>

      {favoriteLesson.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-center py-12">
          {t('search.noResults')}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favoriteLesson.map((lesson) => {
            const module = tutorials.find((m) => m.id === lesson.moduleId);
            if (!module) return null;

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <LessonCard lesson={lesson} module={module} />
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
