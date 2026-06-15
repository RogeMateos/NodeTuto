import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTutorials } from '@/hooks/useTutorials';
import { useProgress } from '@/hooks/useProgress';
import { useFavorites } from '@/hooks/useFavorites';
import { useLanguage } from '@/hooks/useLanguage';
import { SearchBar } from '@/components/Search/SearchBar';
import { ProgressBar } from '@/components/Common/ProgressBar';
import { motion } from 'framer-motion';

const ArrowRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const BookOpenIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
  </svg>
);

const MODULE_COLORS = [
  'linear-gradient(135deg, #339933, #4caf4c)',
  'linear-gradient(135deg, #2563EB, #3b82f6)',
  'linear-gradient(135deg, #7C3AED, #8b5cf6)',
  'linear-gradient(135deg, #DC2626, #ef4444)',
];

export const Home = () => {
  const { t } = useTranslation();
  const { tutorials, totalLessons } = useTutorials();
  const { completedCount, completionPercentage } = useProgress();
  const { count: favoriteCount } = useFavorites();
  const { current: language } = useLanguage();

  const lang = language as 'es' | 'en';
  const featuredModules = tutorials.slice(0, 4);
  const completed = completedCount();
  const overallProgress = completionPercentage(totalLessons);

  const title = t('home.title');
  const titleParts = title.includes('Node.js') ? title.split('Node.js') : null;

  return (
    <div className="flex flex-col">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 py-14 sm:py-20 px-4 sm:px-6">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-24 left-1/4 w-72 sm:w-125 h-72 sm:h-125 rounded-full opacity-[0.12] blur-[60px] sm:blur-[80px]"
            style={{ background: '#339933' }}
          />
          <div
            className="absolute -bottom-16 right-1/4 w-64 sm:w-100 h-64 sm:h-100 rounded-full opacity-[0.08] blur-[60px] sm:blur-[80px]"
            style={{ background: '#2563EB' }}
          />
        </div>

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#339933]/30 bg-[#339933]/10 text-[#4caf4c] text-xs font-semibold mb-6 sm:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#339933] animate-pulse-dot" />
            {totalLessons} lessons available
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6 leading-[1.08] tracking-tight"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {titleParts ? (
              <>
                {titleParts[0]}
                <span style={{ color: '#339933' }}>Node.js</span>
                {titleParts[1]}
              </>
            ) : title}
          </h1>

          <p className="text-base sm:text-lg text-slate-400 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed px-2">
            {t('home.subtitle')}
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto mb-6 sm:mb-8 hidden md:block">
            <SearchBar />
          </div>

          {/* CTA */}
          <Link
            to="/tutorials"
            className="inline-flex items-center gap-2 px-7 py-4 sm:py-3.5 rounded-2xl sm:rounded-xl text-sm font-bold text-white transition-all duration-200 hover:gap-3 hover:-translate-y-0.5 active:scale-[0.97] min-h-12"
            style={{
              background: 'linear-gradient(135deg, #339933, #4caf4c)',
              boxShadow: '0 4px 20px rgba(51,153,51,0.3)',
            }}
          >
            {t('home.startLearning')}
            <ArrowRight />
          </Link>
        </motion.div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-800">

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 px-3 sm:px-6 first:pl-0 last:pr-0 text-center sm:text-left"
          >
            <div
              className="w-10 h-10 rounded-2xl items-center justify-center shrink-0 text-[#339933] hidden sm:flex"
              style={{ background: 'rgba(51,153,51,0.1)' }}
            >
              <BookOpenIcon />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                {completed}
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                {t('home.lessonsCompleted')}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 px-3 sm:px-6 text-center sm:text-left"
          >
            <div
              className="w-10 h-10 rounded-2xl items-center justify-center shrink-0 text-rose-500 dark:text-rose-400 hidden sm:flex"
              style={{ background: 'rgba(239,68,68,0.08)' }}
            >
              <HeartIcon />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                {favoriteCount}
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                {t('home.yourFavorites')}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 px-3 sm:px-6 last:pr-0 text-center sm:text-left"
          >
            <div
              className="w-10 h-10 rounded-2xl items-center justify-center shrink-0 text-amber-500 dark:text-amber-400 hidden sm:flex"
              style={{ background: 'rgba(245,158,11,0.08)' }}
            >
              <TrophyIcon />
            </div>
            <div className="w-full">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                {overallProgress}%
              </div>
              <div className="hidden sm:block mt-1 w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${overallProgress}%`, background: 'linear-gradient(90deg, #339933, #4caf4c)' }}
                />
              </div>
              <p className="text-[10px] sm:hidden text-slate-500 dark:text-slate-400 mt-0.5">Overall</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Featured Modules ─────────────────────────────── */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 flex-1 bg-slate-50/60 dark:bg-slate-950/60">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end justify-between mb-6 sm:mb-10">
            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {t('home.seeAll')}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {tutorials.length} modules · {totalLessons} lessons
              </p>
            </div>
            <Link
              to="/tutorials"
              className="flex items-center gap-1.5 text-sm font-semibold text-[#339933] transition-all active:opacity-70 min-h-11 pl-2"
            >
              View all
              <ArrowRight />
            </Link>
          </div>

          {/* Module cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredModules.map((module, i) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/tutorials?module=${module.id}`}
                  className="group block p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#339933]/30 dark:hover:border-[#339933]/25 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50 md:hover:-translate-y-1 transition-all duration-200 active:scale-[0.98]"
                >
                  <div className="flex items-start justify-between mb-4 sm:mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: MODULE_COLORS[i % MODULE_COLORS.length] }}
                    >
                      {i + 1}
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">
                      {module.lessons?.length || 0} lessons
                    </span>
                  </div>

                  <h3
                    className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#339933] dark:group-hover:text-[#4caf4c] transition-colors"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {module[lang].title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 sm:mb-5 line-clamp-2 leading-relaxed">
                    {module[lang].description}
                  </p>

                  <ProgressBar total={module.lessons?.length || 0} showLabel={false} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
