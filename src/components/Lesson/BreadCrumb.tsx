import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { Module, Lesson } from '@/types/index';

interface BreadCrumbProps {
  module: Module | undefined;
  lesson: Lesson | null;
}

export const BreadCrumb = ({ module, lesson }: BreadCrumbProps) => {
  const { t } = useTranslation();
  const { current: language } = useLanguage();

  if (!module || !lesson) return null;

  const lang = language as 'es' | 'en';

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
        {t('common.home')}
      </Link>
      <span>/</span>
      <Link
        to="/tutorials"
        className="hover:text-blue-600 dark:hover:text-blue-400"
      >
        {t('common.tutorials')}
      </Link>
      <span>/</span>
      <span>{module[lang].title}</span>
      <span>/</span>
      <span className="text-slate-900 dark:text-white font-medium">
        {lesson[lang].title}
      </span>
    </nav>
  );
};
