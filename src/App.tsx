import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/utils/i18n';
import useTutorialStore from '@/store/tutorialStore';
import { Header } from '@/components/Layout/Header';
import { Sidebar } from '@/components/Layout/Sidebar';
import { Footer } from '@/components/Layout/Footer';
import { Home } from '@/pages/Home';
import { Tutorials } from '@/pages/Tutorials';
import { Lesson } from '@/pages/Lesson';
import { Search } from '@/pages/Search';
import { Favorites } from '@/pages/Favorites';

function AppContent() {
  const loadFromStorage = useTutorialStore((state) => state.loadFromStorage);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-[#0D1117] transition-colors duration-300">
      <Header onMenuClick={() => setDrawerOpen(true)} />

      <div className="flex flex-1 relative">
        {/* Mobile drawer overlay */}
        <div
          className={`fixed inset-0 bg-slate-950/60 z-30 md:hidden backdrop-blur-sm transition-opacity duration-300 ${
            drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />

        <Sidebar isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

        <main className="flex-1 min-w-0 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/lesson/:moduleId/:lessonId" element={<Lesson />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <AppContent />
      </Router>
    </I18nextProvider>
  );
}
