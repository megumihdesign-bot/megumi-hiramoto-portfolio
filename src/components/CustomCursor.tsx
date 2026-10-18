import { useEffect, useRef, useState } from 'react';
import { useReducedMotion, motion, AnimatePresence } from 'motion/react';

// Click sparkle: an irregular but balanced burst. Angles step by the golden angle so the
// distribution never reads as a ring, with distance, size, colour and pace varied per particle.
const SPARK_COLORS = ['#A8324A', '#263A99', '#A8324A', '#263A99', '#7BC9EA'];
const SPARKS = Array.from({ length: 16 }, (_, i) => {
  const angle = (i * 137.508 + (i % 3) * 13) * (Math.PI / 180);
  const distance = 24 + ((i * 29) % 26); // 24–49px
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    size: i % 5 === 0 ? 7 : i % 3 === 0 ? 4 : 5.5,
    color: SPARK_COLORS[i % SPARK_COLORS.length],
    duration: 0.3 + (i % 4) * 0.04,
  };
});

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [onCobalt, setOnCobalt] = useState(false); // over a cobalt-filled section
  const [onLogo, setOnLogo] = useState(false); // over the M. logo: cherry outline, no fill
  const shouldReduceMotion = useReducedMotion();
  
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    // Ensure system cursor is visible
    document.body.style.cursor = 'auto';

    const updatePosition = () => {
      // Smooth trailing effect - minimal easing for responsiveness
      const lerp = 0.25;
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * lerp;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(updatePosition);
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Initialize cursorPos on first move to prevent jump from (0,0)
      if (!isVisible) {
        cursorPos.current = { x: e.clientX, y: e.clientY };
        setIsVisible(true);
      }
    };

    // Walks up to the nearest painted background to find out whether we are over a cobalt section
    const isCobaltAt = (el: Element | null) => {
      while (el) {
        const bg = window.getComputedStyle(el).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg === 'rgb(38, 58, 153)';
        el = el.parentElement;
      }
      return false;
    };

    // Sections move under a stationary pointer while scrolling, so re-check then too
    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        const el = document.elementFromPoint(mousePos.current.x, mousePos.current.y);
        if (el) setOnCobalt(isCobaltAt(el));
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      setOnCobalt(isCobaltAt(target));
      setOnLogo(!!target.closest('[data-cursor="logo"]'));

      const style = window.getComputedStyle(target);
      
      // 1. Interactive Elements & Pointer
      const isPointer = style.cursor === 'pointer';
      const isInteractive = target.closest('a, button, [role="button"], .clickable');
      
      // 2. Images
      const isImage = target.tagName === 'IMG' || target.closest('img');
      
      // 3. Visible Text Elements (p, h1-h6, span, navigation text, etc.)
      const textTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'LI', 'LABEL', 'A', 'SMALL', 'STRONG', 'EM', 'B', 'I', 'NAV', 'MENU'];
      const isTextTag = textTags.includes(target.tagName);
      
      // Check for direct text nodes to catch text in generic containers
      const hasDirectText = Array.from(target.childNodes).some(
        node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim().length! > 0
      );

      if (isPointer || isInteractive || isImage || isTextTag || hasDirectText) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        setIsPopping(true);
        setTimeout(() => setIsPopping(false), 420);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('scroll', onScroll, { passive: true });
    
    rafId.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (shouldReduceMotion) return null;

  // Default state over cobalt: a hollow cream ring. Multiply would erase cream on cobalt,
  // so this one state blends normally; every other state keeps the multiply treatment.
  const hollow = !isHovering && onCobalt;
  const ring = hollow || onLogo; // outlined, unfilled states
  const dotColor = isHovering ? '#A8324A' : '#263A99';

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{
        display: isVisible ? 'block' : 'none',
        mixBlendMode: hollow ? 'normal' : 'multiply',
      }}
    >
      <div className="relative flex items-center justify-center" style={{ marginLeft: '-10px', marginTop: '-10px' }}>
        {/* Main Cursor Circle */}
        <motion.div
          className="w-5 h-5 rounded-full border-solid box-border"
          animate={{
            backgroundColor: onLogo ? 'rgba(168, 50, 74, 0)' : hollow ? 'rgba(239, 233, 220, 0)' : dotColor,
            borderColor: onLogo ? '#A8324A' : '#EFE9DC',
            // Over the logo the ring doubles to frame it; 1px at 2x keeps the stroke a true 2px
            borderWidth: onLogo ? 1 : ring ? 2 : 0,
            scale: (onLogo ? 2 : 1) * (isPopping ? 1.5 : 1),
            opacity: isPopping ? 0 : 1,
          }}
          transition={{
            backgroundColor: { duration: 0.2 },
            scale: isPopping ? { duration: 0.15, ease: "easeOut" } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.15 }
          }}
        />

        {/* Pop Particles */}
        <AnimatePresence>
          {isPopping && (
            <div className="absolute inset-0 flex items-center justify-center">
              {SPARKS.map((sp, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{ width: sp.size, height: sp.size }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    backgroundColor: hollow ? '#EFE9DC' : sp.color,
                    x: sp.x,
                    y: sp.y,
                    // Stay at full colour for most of the flight; fade only at the very end
                    opacity: [1, 1, 0],
                    scale: 0.45,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: sp.duration,
                    ease: 'easeOut',
                    opacity: { duration: sp.duration, times: [0, 0.7, 1], ease: 'linear' },
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

