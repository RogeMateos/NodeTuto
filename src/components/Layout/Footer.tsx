export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-950/50">
      <div className="max-w-screen-2xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[9px] font-bold"
            style={{ fontFamily: 'JetBrains Mono, monospace', background: 'linear-gradient(135deg, #339933, #4caf4c)' }}
          >
            N
          </div>
          <span
            className="text-sm font-bold text-slate-900 dark:text-white tracking-tight"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            NodeLearn
          </span>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-600">
          © {year} NodeLearn — Built for learning.
        </p>
      </div>
    </footer>
  );
};
