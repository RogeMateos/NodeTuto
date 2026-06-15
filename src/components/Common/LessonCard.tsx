import { Link } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { useLanguage } from '@/hooks/useLanguage';
import { FavoriteButton } from './FavoriteButton';
import { Lesson, Module } from '@/types/index';
import { cn } from '@/utils/cn';

interface LessonCardProps {
  lesson: Lesson;
  module: Module;
}

const BookIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

const ExamIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

export const LessonCard = ({ lesson, module }: LessonCardProps) => {
  const { isCompleted } = useProgress();
  const { current: language } = useLanguage();
  const completed = isCompleted(lesson.id);
  const lang = language as 'es' | 'en';
  const content = lesson[lang];

  return (
    <Link
      to={`/lesson/${module.id}/${lesson.id}`}
      className={cn(
        'group relative block p-5 rounded-2xl border transition-all duration-200',
        'bg-white dark:bg-slate-900',
        completed
          ? 'border-[#339933]/25 dark:border-[#339933]/20'
          : 'border-slate-200 dark:border-slate-800',
        'hover:-translate-y-1',
        'hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-900/60',
        'hover:border-slate-300 dark:hover:border-slate-700'
      )}
    >
      {/* Completed top accent */}
      {completed && (
        <div
          className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
          style={{ background: 'linear-gradient(90deg, #339933, #4caf4c)' }}
        />
      )}

      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={cn(
          'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors',
          completed
            ? 'bg-[#339933]/10 dark:bg-[#339933]/15 text-[#339933]'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
        )}>
          {lesson.type === 'exam' ? <ExamIcon /> : <BookIcon />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Badges */}
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            {lesson.type === 'exam' && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200/70 dark:border-amber-800/50">
                Exam
              </span>
            )}
            {completed && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#339933]/10 dark:bg-[#339933]/15 text-[#339933] border border-[#339933]/20">
                ✓ Done
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug mb-1 group-hover:text-[#339933] dark:group-hover:text-[#4caf4c] transition-colors line-clamp-2">
            {content.title}
          </h3>

          {/* Module name */}
          <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
            {module[lang].title}
          </p>
        </div>

        {/* Favorite */}
        <FavoriteButton lessonId={lesson.id} className="shrink-0 mt-0.5" />
      </div>
    </Link>
  );
};
