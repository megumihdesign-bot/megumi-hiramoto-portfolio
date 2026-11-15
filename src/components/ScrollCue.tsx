import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Subtle hint, bottom right on Home and Work, that there is more to scroll.
 * It shows on arrival and leaves as soon as the page is scrolled; it comes back at the top.
 */
export const ScrollCue = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const active = pathname === '/' || pathname === '/work';

  useEffect(() => {
    if (!active) return;
    const update = () => {
      const more = document.documentElement.scrollHeight - window.innerHeight > 120;
      setShow(more && window.scrollY < 60);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const t = window.setTimeout(update, 1500); // content (images) may still be settling
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.clearTimeout(t);
    };
  }, [active, pathname]);

  if (!active) return null;
  return (
    <div className="scroll-cue scroll-cue--circle" data-show={show} aria-hidden="true">
      <svg width="12" height="16" viewBox="0 0 12 16" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M6 1v12M1.5 8.5L6 13l4.5-4.5" />
      </svg>
    </div>
  );
};
