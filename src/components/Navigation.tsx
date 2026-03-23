import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Instagram, Linkedin } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { FloatingDots } from './FloatingDots';

export const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const navItems: { name: string; path: string; isExternal?: boolean }[] = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Press', path: '/press' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Handle ESC key and Focus Trap
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
      
      if (e.key === 'Tab' && isMenuOpen) {
        const focusableElements = document.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isMenuOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full px-8 py-6 md:px-16 flex justify-between items-baseline transition-all duration-500 ${
        isMenuOpen ? 'z-[120] bg-transparent' : 'z-[100] bg-bg/95 backdrop-blur-sm'
      }`}>
        <Link 
          to="/" 
          onClick={closeMenu}
          className="text-cobalt font-normal text-sm tracking-tight relative z-[130]"
        >
          Megumi Hiramoto
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
          {navItems.filter(item => !item.isExternal).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm tracking-widest transition-colors duration-300 hover:text-sky ${
                location.pathname === item.path ? 'text-cobalt font-bold' : 'text-cobalt'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Trigger */}
        <button
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden text-sm font-sans text-cobalt hover:text-sky transition-colors duration-300 relative z-[130] min-w-[4rem] text-right flex justify-end overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={isMenuOpen ? 'close' : 'menu'}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {isMenuOpen ? 'Close' : 'Menu'}
            </motion.span>
          </AnimatePresence>
        </button>

        <a 
          href="mailto:megumihdesign@gmail.com" 
          className="hidden lg:block text-sm text-cobalt"
        >
          megumihdesign@gmail.com
        </a>
      </header>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[105] bg-bg flex flex-col items-center justify-center"
          >
            <FloatingDots count={30} area="menu" />
            <nav className="flex flex-col items-center gap-8 relative z-10">
              {navItems.map((item, idx) => {
                const isActive = location.pathname === item.path;
                const isExternal = item.isExternal;
                
                return (
                  <motion.div
                    key={item.path}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: shouldReduceMotion ? 0 : 0.1 + idx * 0.08,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    {isExternal ? (
                      <a
                        href={item.path}
                        className="text-4xl md:text-5xl font-sans text-cobalt hover:text-sky transition-colors duration-300 relative group flex items-center justify-center"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={closeMenu}
                        className={`text-4xl md:text-5xl font-sans transition-colors duration-300 relative group flex items-center justify-center ${
                          isActive 
                            ? 'text-cobalt font-bold' 
                            : 'text-cobalt hover:text-sky'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            {/* Mobile Menu Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 relative z-10"
            >
              {/* No email or social icons per latest request */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Footer = ({ isHome = false }: { isHome?: boolean }) => {
  return (
    <footer className={`w-full px-8 pb-12 md:px-16 mt-auto ${isHome ? 'pt-0' : 'pt-24 md:pt-32'}`}>
      <div className="border-t border-cobalt pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-cobalt">
          © 2026 Megumi Hiramoto. All Rights Reserved.
        </p>
        
        <div className="flex gap-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-cobalt hover:opacity-60 transition-opacity">
            <Instagram size={20} strokeWidth={1.5} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-cobalt hover:opacity-60 transition-opacity">
            <Linkedin size={20} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
};
