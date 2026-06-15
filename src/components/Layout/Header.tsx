import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useTutorialStore from '@/store/tutorialStore';
import { useLanguage } from '@/hooks/useLanguage';

interface HeaderProps {
  onMenuClick?: () => void;
}

const MenuIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6"  x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const { change: changeLanguage } = useLanguage();
  const searchQuery = useTutorialStore((state) => state.searchQuery);
  const setSearchQuery = useTutorialStore((state) => state.setSearchQuery);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    changeLanguage(newLang as 'es' | 'en');
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200/70 dark:border-slate-800/60 bg-white/85 dark:bg-slate-950/92">
      {/* ── Main row ───────────────────────────────────────── */}
      <div className="h-14 md:h-16 flex items-center px-3 md:px-6 gap-2 md:gap-5 max-w-screen-2xl mx-auto w-full">

        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="md:hidden w-11 h-11 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all shrink-0"
          aria-label="Open navigation"
        >
          <MenuIcon />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold transition-shadow duration-200 group-hover:shadow-lg"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              background: 'linear-gradient(135deg, #339933, #4caf4c)',
            }}
          >
            N
          </div>
          <span
            className="text-[17px] font-bold tracking-tight text-slate-900 dark:text-white hidden sm:block"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            NodeLearn
          </span>
        </Link>

        {/* Desktop search */}
        <div className="flex-1 max-w-lg hidden md:block">
          <div className="relative group">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-[#339933] transition-colors pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-10 pr-4 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-[#339933] focus:ring-2 focus:ring-[#339933]/15 focus:bg-white dark:focus:bg-slate-800/80 transition-all"
            />
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-1.5 md:gap-2 ml-auto">
          {/* Mobile: search toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden w-11 h-11 rounded-xl flex items-center justify-center transition-all active:scale-95"
            style={{
              color: searchOpen ? '#339933' : undefined,
              background: searchOpen ? 'rgba(51,153,51,0.1)' : undefined,
            }}
            aria-label="Toggle search"
          >
            {searchOpen ? <XIcon /> : <SearchIcon />}
          </button>

          {/* Language — hidden on smallest screens */}
          <button
            onClick={toggleLanguage}
            className="hidden sm:flex items-center gap-1.5 h-9 px-3 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-all active:scale-95"
            title={t('common.language')}
          >
            <GlobeIcon />
            <span>{i18n.language.toUpperCase()}</span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-11 h-11 md:w-9 md:h-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-all active:scale-95"
            title={t('common.theme')}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>

      {/* ── Mobile search row ──────────────────────────────── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-200 ${
          searchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-3 pt-1">
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={searchOpen}
              className="w-full h-11 pl-10 pr-4 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-[#339933] focus:ring-2 focus:ring-[#339933]/15 transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
