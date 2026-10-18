import { useState, useEffect, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { AnimatePresence, MotionConfig, motion } from 'motion/react';

import { CustomCursor } from './components/CustomCursor';
import { Header, Footer } from './components/Navigation';
import { IntroSequence } from './components/IntroSequence';

import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { About } from './pages/About';
import { ProjectDetail } from './pages/ProjectDetail';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  
  return null;
};

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  // playing: content hidden behind the intro; exiting: the intro lifts away while the page animates in; done: intro unmounted
  const [introPhase, setIntroPhase] = useState<'playing' | 'exiting' | 'done'>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('introPlayed') ? 'done' : 'playing';
    }
    return 'playing';
  });
  const showIntro = introPhase === 'playing';

  const handleIntroComplete = () => {
    setIntroPhase('done');
    sessionStorage.setItem('introPlayed', 'true');
  };

  return (
    <Router>
     <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <CustomCursor />

      <motion.div
        initial={{ opacity: showIntro ? 0 : 1 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ pointerEvents: showIntro ? 'none' : 'auto' }}
      >
        <AppContent showIntro={showIntro} />
      </motion.div>

      <AnimatePresence>
        {introPhase !== 'done' && (
          <IntroSequence key="intro" onExitStart={() => setIntroPhase('exiting')} onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>
     </MotionConfig>
    </Router>
  );
}

const AppContent = ({ showIntro }: { showIntro: boolean }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<PageWrapper key={showIntro ? 'home-hidden' : 'home-visible'}><Home /></PageWrapper>} />
          <Route path="/work" element={<PageWrapper><Work /></PageWrapper>} />
          <Route path="/work/:id" element={<PageWrapper><ProjectDetail /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          {/* Press now lives on the About page */}
          <Route path="/press" element={<Navigate to="/about#press" replace />} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  );
};
