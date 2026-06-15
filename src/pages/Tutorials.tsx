import { useTutorials } from '@/hooks/useTutorials';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from 'react-i18next';
import { LessonCard } from '@/components/Common/LessonCard';
import { ProgressBar } from '@/components/Common/ProgressBar';
import { motion } from 'framer-motion';

const MODULE_COLORS = [
  'linear-gradient(135deg, #339933, #4caf4c)',
  'linear-gradient(135deg, #2563EB, #3b82f6)',
  'linear-gradient(135deg, #7C3AED, #8b5cf6)',
  'linear-gradient(135deg, #DC2626, #ef4444)',
  'linear-gradient(135deg, #D97706, #f59e0b)',
  'linear-gradient(135deg, #0891B2, #06b6d4)',
];

export const Tutorials = () => {
  const { t } = useTranslation();
  const { tutorials, totalLessons } = useTutorials();
  const { current: language } = useLanguage();

  const lang = language as 'es' | 'en';

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <h1
          className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {t('common.tutorials')}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
          {totalLessons} lessons across {tutorials.length} modules
        </p>
        <div className="max-w-xs">
          <ProgressBar total={totalLessons} showLabel />
        </div>
      </motion.div>

      {/* Modules */}
      <div className="space-y-14">
        {tutorials.map((module, i) => (
          <motion.section
            key={module.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            viewport={{ once: true }}
          >
            {/* Module header */}
            <div className="flex items-start justify-between mb-6 gap-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
                  style={{ background: MODULE_COLORS[i % MODULE_COLORS.length] }}
                >
                  {i + 1}
                </div>
                <div>
                  <h2
                    className="text-xl font-bold text-slate-900 dark:text-white mb-1"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {module[lang].title}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {module[lang].description}
                  </p>
                </div>
              </div>
              <span className="shrink-0 text-xs font-medium text-slate-400 dark:text-slate-500 mt-1 whitespace-nowrap">
                {module.lessons?.length || 0} lessons
              </span>
            </div>

            {/* Lessons grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {module.lessons?.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} module={module} />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
};
