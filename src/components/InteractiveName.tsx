import { useEffect, useRef, useMemo } from 'react';

interface CharState {
  element: HTMLSpanElement | null;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  baseX: number;
  baseY: number;
  angle: number;
  speed: number;
  range: number;
}

export const InteractiveName = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<CharState[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const requestRef = useRef<number>(0);

  const words = useMemo(() => text.split(' '), [text]);

  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = performance.now();
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const animate = (currentTime: number) => {
      const isMobile = window.innerWidth < 768;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const mouse = mouseRef.current;
      const elapsed = currentTime - startTimeRef.current;

      charsRef.current.forEach((char, index) => {
        if (!char.element) return;

        // 1. Entrance Animation Logic
        const delay = index * 50; // 50ms per character
        const entranceDuration = 800;
        const entranceProgress = Math.max(0, Math.min(1, (elapsed - delay) / entranceDuration));
        
        // Cubic bezier ease out: [0.4, 0, 0.2, 1] approximation
        const easeOut = 1 - Math.pow(1 - entranceProgress, 3);
        
        const entranceY = (1 - easeOut) * 20;
        const entranceOpacity = easeOut;

        // 2. Ambient Floating (Always active, subtle)
        char.angle += char.speed;
        const floatX = Math.cos(char.angle) * (char.range * 0.1);
        const floatY = Math.sin(char.angle) * (char.range * 0.1);

        let targetX = floatX;
        let targetY = floatY;

        // 3. Interactive Displacement (Desktop only)
        if (!isMobile && !prefersReducedMotion && mouse.x !== -1000 && entranceProgress === 1) {
          const rect = char.element.getBoundingClientRect();
          const charCenterX = rect.left + rect.width / 2;
          const charCenterY = rect.top + rect.height / 2;

          const dx = charCenterX - mouse.x;
          const dy = charCenterY - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceRadius = 180;

          if (distance < forceRadius && distance > 0) {
            const force = (forceRadius - distance) / forceRadius;
            // Displacement vector away from mouse
            // Subtle: max 12px displacement
            const pushX = (dx / distance) * force * 12;
            const pushY = (dy / distance) * force * 12;
            
            targetX += pushX;
            targetY += pushY;
          }
        }

        // 4. Smooth Easing
        const ease = 0.08;
        char.x += (targetX - char.x) * ease;
        char.y += (targetY - char.y) * ease;

        // 5. Apply Transform & Opacity
        char.element.style.transform = `translate3d(${char.x}px, ${char.y + entranceY}px, 0)`;
        char.element.style.opacity = entranceOpacity.toString();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Initialize char states
  const setCharRef = (el: HTMLSpanElement | null, index: number) => {
    if (el && !charsRef.current[index]) {
      charsRef.current[index] = {
        element: el,
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        baseX: 0,
        baseY: 0,
        angle: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.01,
        range: 5 + Math.random() * 5,
      };
    }
  };

  let charGlobalIndex = 0;

  return (
    <div ref={containerRef} className="relative z-10 text-center">
      <h1 className="text-6xl md:text-9xl font-sans font-bold text-cobalt leading-tight tracking-tight flex flex-wrap justify-center select-none">
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className="whitespace-nowrap mx-4 flex">
            {word.split('').map((char, charIdx) => {
              const index = charGlobalIndex++;
              return (
                <span
                  key={charIdx}
                  ref={(el) => setCharRef(el, index)}
                  className="inline-block will-change-transform opacity-0"
                >
                  {char}
                </span>
              );
            })}
          </span>
        ))}
      </h1>
    </div>
  );
};
