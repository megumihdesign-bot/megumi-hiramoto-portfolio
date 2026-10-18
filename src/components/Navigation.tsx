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
  ];

  // Work stays active on individual project pages
  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname === path || location.pathname.startsWith(path + '/');

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
      <header className={`fixed top-0 left-0 w-full px-8 py-6 md:px-16 flex justify-between items-center transition-all duration-500 ${
        isMenuOpen ? 'z-[120] bg-transparent' : 'z-[100] bg-bg/95 backdrop-blur-sm'
      }`}>
        <div className="flex items-center gap-[clamp(3rem,5.5vw,6rem)]">
        <Link
          to="/"
          onClick={closeMenu}
          aria-label="Megumi Hiramoto, home"
          data-cursor="logo"
          className="relative z-[130] block"
        >
          <img src="/M-cobalt.svg" alt="" aria-hidden="true" className="h-[13px] w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8 items-center">
          {navItems.filter(item => !item.isExternal).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isActive(item.path) ? 'page' : undefined}
              className="link-wipe nav-underline text-[15px] font-normal text-cobalt hover:text-accent"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden text-[15px] font-sans text-cobalt hover:text-accent transition-colors duration-300 relative z-[130] min-w-[4rem] text-right flex justify-end overflow-hidden"
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
          className="link-wipe hidden lg:block text-[15px] text-cobalt hover:text-accent transition-colors duration-300"
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
                const active = isActive(item.path);
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
                        className="text-4xl md:text-5xl font-sans text-cobalt hover:text-accent transition-colors duration-300 relative group flex items-center justify-center"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={closeMenu}
                        aria-current={active ? 'page' : undefined}
                        className={`link-wipe nav-underline -mb-1 text-4xl md:text-5xl font-sans relative group flex items-center justify-center ${
                          active ? 'text-cobalt' : 'text-cobalt hover:text-accent'
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
    <footer className={`w-full mt-auto ${isHome ? 'pt-0' : 'pt-24 md:pt-32'}`}>
      {/* Divider spans the full viewport width */}
      <div className="border-t border-cobalt">
        <div className="page-x py-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-cobalt">
            © 2026 Megumi Hiramoto. All Rights Reserved.
          </p>

          <div className="flex gap-6 items-center">
            <a href="https://www.instagram.com/megumihdesign/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-cobalt hover:text-accent transition-colors">
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a href="https://www.linkedin.com/in/megumi-hiramoto-design" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-cobalt hover:text-accent transition-colors">
              <Linkedin size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
