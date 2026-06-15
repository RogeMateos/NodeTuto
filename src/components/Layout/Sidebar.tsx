import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTutorials } from '@/hooks/useTutorials';
import { useProgress } from '@/hooks/useProgress';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/utils/cn';
import { Module } from '@/types/index';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChevronDown = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const MODULE_COLORS = [
  'linear-gradient(135deg, #339933, #4caf4c)',
  'linear-gradient(135deg, #2563EB, #3b82f6)',
  'linear-gradient(135deg, #7C3AED, #8b5cf6)',
  'linear-gradient(135deg, #DC2626, #ef4444)',
  'linear-gradient(135deg, #D97706, #f59e0b)',
  'linear-gradient(135deg, #0891B2, #06b6d4)',
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { tutorials } = useTutorials();
  const { isCompleted } = useProgress();
  const { current: language } = useLanguage();
  const { moduleId, lessonId } = useParams();
  const [expandedModule, setExpandedModule] = useState<string | null>(moduleId || null);

  const toggleModule = (id: string) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  return (
    <aside
      className={cn(
        /* ── Mobile: fixed drawer ── */
        'fixed top-0 left-0 h-full w-[288px] z-40',
        'transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        /* ── Desktop: sticky sidebar ── */
        'md:sticky md:top-16 md:h-[calc(100vh-64px)] md:w-64 md:translate-x-0 md:z-auto',
        /* ── Appearance ── */
        'bg-white dark:bg-[#0D1117]',
        'md:bg-slate-50/50 md:dark:bg-[#0D1117]/60',
        'border-r border-slate-200/70 dark:border-slate-800/60',
        'overflow-y-auto flex flex-col shrink-0'
      )}
    >
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between px-4 py-4 border-b border-slate-200/70 dark:border-slate-800/60 shrink-0">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ fontFamily: 'JetBrains Mono, monospace', background: 'linear-gradient(135deg, #339933, #4caf4c)' }}
          >
            N
          </div>
          <span className="font-bold text-sm text-slate-900 dark:text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            Navigation
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all"
          aria-label="Close navigation"
        >
          <XIcon />
        </button>
      </div>

      {/* Nav */}
      <nav className="p-3 pt-4 flex-1">
        <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">
          Modules
        </p>

        <div className="space-y-0.5">
          {tutorials.map((module: Module, idx: number) => {
            const lang = language as 'es' | 'en';
            const content = module[lang];
            const isExpanded = expandedModule === module.id;
            const totalLessons = module.lessons?.length || 0;
            const completedLessons = module.lessons?.filter(l => isCompleted(l.id)).length || 0;
            const color = MODULE_COLORS[idx % MODULE_COLORS.length];

            return (
              <div key={module.id}>
                {/* Module button */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-3 py-3 md:py-2.5 rounded-xl text-left transition-all duration-150',
                    isExpanded
                      ? 'bg-slate-100 dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-white active:scale-[0.98]'
                  )}
                >
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ background: color }}
                  >
                    {idx + 1}
                  </div>
                  <span className="flex-1 text-sm font-semibold leading-tight line-clamp-1">
                    {content.title}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {completedLessons > 0 && (
                      <span className="text-[10px] font-semibold text-[#339933]">
                        {completedLessons}/{totalLessons}
                      </span>
                    )}
                    <span className="text-slate-400 dark:text-slate-500">
                      {isExpanded ? <ChevronDown /> : <ChevronRight />}
                    </span>
                  </div>
                </button>

                {/* Lessons */}
                {isExpanded && module.lessons && (
                  <div className="mt-1 mb-2 ml-3 pl-3 border-l-2 border-slate-200/70 dark:border-slate-800/70 space-y-0.5">
                    {module.lessons.map((lesson) => {
                      const lessonContent = lesson[lang];
                      const isActive = moduleId === module.id && lessonId === lesson.id;
                      const completed = isCompleted(lesson.id);

                      return (
                        <Link
                          key={lesson.id}
                          to={`/lesson/${module.id}/${lesson.id}`}
                          onClick={onClose}
                          className={cn(
                            'flex items-start gap-2 px-2.5 py-2.5 md:py-2 rounded-lg text-xs transition-all duration-150 active:scale-[0.98]',
                            isActive
                              ? 'bg-[#339933]/10 dark:bg-[#339933]/15 text-[#339933] dark:text-[#4caf4c] font-semibold'
                              : completed
                              ? 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900/60 hover:text-slate-600 dark:hover:text-slate-300'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-white'
                          )}
                        >
                          <span
                            className={cn(
                              'mt-0.5 w-3.5 h-3.5 rounded-full shrink-0 flex items-center justify-center',
                              completed
                                ? 'bg-[#339933] text-white'
                                : isActive
                                ? 'border-2 border-[#339933]'
                                : 'border-2 border-slate-300 dark:border-slate-700'
                            )}
                          >
                            {completed && <CheckIcon />}
                          </span>
                          <span className="leading-snug line-clamp-2">
                            {lessonContent.title}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};
