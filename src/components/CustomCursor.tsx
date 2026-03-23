import { useEffect, useRef, useState } from 'react';
import { useReducedMotion, motion, AnimatePresence } from 'motion/react';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
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

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

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
        setTimeout(() => setIsPopping(false), 250);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mousedown', onMouseDown);
    
    rafId.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (shouldReduceMotion) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{
        display: isVisible ? 'block' : 'none',
        mixBlendMode: isHovering ? 'multiply' : 'normal',
      }}
    >
      <div className="relative flex items-center justify-center" style={{ marginLeft: '-10px', marginTop: '-10px' }}>
        {/* Main Cursor Circle */}
        <motion.div
          className="w-5 h-5 rounded-full"
          animate={{
            backgroundColor: isHovering ? '#FFBE00' : '#263A99',
            scale: isPopping ? 1.5 : 1,
            opacity: isPopping ? 0 : 1,
          }}
          transition={{
            backgroundColor: { duration: 0.2 },
            scale: { duration: 0.15, ease: "easeOut" },
            opacity: { duration: 0.15 }
          }}
        />

        {/* Pop Particles */}
        <AnimatePresence>
          {isPopping && (
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  animate={{
                    backgroundColor: isHovering ? '#FFBE00' : '#263A99',
                    x: Math.cos((i * 60) * (Math.PI / 180)) * 25,
                    y: Math.sin((i * 60) * (Math.PI / 180)) * 25,
                    opacity: 0,
                    scale: 0.5,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.25,
                    ease: "easeOut"
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

