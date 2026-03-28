import { useState, useEffect, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';

import { CustomCursor } from './components/CustomCursor';
import { Header, Footer } from './components/Navigation';
import { IntroSequence } from './components/IntroSequence';

import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { About } from './pages/About';
import { Press } from './pages/Press';
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const contentKey = showIntro ? 'hidden' : 'visible';

  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />

      <AppContent contentKey={contentKey} />

      <AnimatePresence>
        {showIntro && (
          <IntroSequence key="intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>
    </Router>
  );
}

const AppContent = ({ contentKey }: { contentKey: string }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<PageWrapper key={contentKey}><Home /></PageWrapper>} />
          <Route path="/work" element={<PageWrapper><Work /></PageWrapper>} />
          <Route path="/work/:id" element={<PageWrapper><ProjectDetail /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/press" element={<PageWrapper><Press /></PageWrapper>} />
        </Routes>
      </AnimatePresence>

      <div className={isHomePage ? "hidden lg:block fixed bottom-0 left-0 w-full z-[110]" : ""}>
        <Footer isHome={isHomePage} />
      </div>
    </div>
  );
};
