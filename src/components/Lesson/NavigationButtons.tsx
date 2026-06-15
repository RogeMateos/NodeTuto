import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Module, Lesson } from '@/types/index';

interface NavButtonsProps {
  module: Module | undefined;
  currentLesson: Lesson | null;
  onNext?: () => void;
  onPrev?: () => void;
}

export const NavigationButtons = ({
  module,
  currentLesson,
  onNext,
  onPrev,
}: NavButtonsProps) => {
  const { t } = useTranslation();

  if (!module || !currentLesson || !module.lessons) return null;
  const currentIndex = module.lessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? module.lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < module.lessons.length - 1
      ? module.lessons[currentIndex + 1]
      : null;

  return (
    <div className="flex justify-between gap-4 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      {prevLesson ? (
        <Link
          to={`/lesson/${module.id}/${prevLesson.id}`}
          className="px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={onPrev}
        >
          ← {t('navigation.previousLesson')}
        </Link>
      ) : (
        <div />
      )}

      {nextLesson ? (
        <Link
          to={`/lesson/${module.id}/${nextLesson.id}`}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          onClick={onNext}
        >
          {t('navigation.nextLesson')} →
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};
