import { useEffect, useRef, useMemo, useState } from 'react';

const DOT_COLORS = [
  '#7FA2ED', '#2D412D', '#B9E2DC', '#96BCAD', '#FB5B1B', 
  '#320809', '#E67AAD', '#FAFAEF', '#A00E16', '#FFBE00', 
  '#00725F', '#917704', '#263A99'
];

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  color: string;
  size: number;
  angle: number;
  speed: number;
  range: number;
}

export const FloatingDots = ({ 
  count = 30, 
  area = 'hero',
  colors = DOT_COLORS
}: { 
  count?: number, 
  area?: 'hero' | 'full' | 'header' | 'header-cluster' | 'cluster' | 'footer-spread' | 'peripheral' | 'practice-support' | 'menu',
  colors?: string[]
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const dotsRef = useRef<Dot[]>([]);
  const requestRef = useRef<number>(0);
  const [isSmallScreen, setIsSmallScreen] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize dots
  useEffect(() => {
    const dots: Dot[] = [];
    // Shuffle colors for balanced distribution
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
    
    // Responsive adjustments
    const effectiveCount = (isSmallScreen && area !== 'menu') ? Math.max(5, Math.floor(count * 0.45)) : count;
    const minDistance = isSmallScreen ? 8 : 4; // Increased minDistance for mobile/tablet to prevent clumping

    for (let i = 0; i < effectiveCount; i++) {
      let x = 0, y = 0;
      let attempts = 0;
      const maxAttempts = 100;
      
      const xMin = isSmallScreen ? 15 : 5;
      const xMax = isSmallScreen ? 85 : 95;
      const xRange = xMax - xMin;

      do {
        attempts++;
        // Distribution logic with protection zones
        if (area === 'hero') {
          // Home page: Expanded coverage, dots allowed behind text
          const heroXMin = isSmallScreen ? 10 : 5;
          const heroXMax = isSmallScreen ? 90 : 95;
          const heroXRange = heroXMax - heroXMin;
          
          x = heroXMin + Math.random() * heroXRange;
          
          if (isSmallScreen) {
            // Tablet/Mobile: Avoid top navigation bar (top 15%), cover bottom (up to 98%)
            y = 15 + Math.random() * 83;
          } else {
            y = 10 + Math.random() * 80;
          }
          
          // Check collision with existing dots
          let tooClose = false;
          for (const d of dots) {
            const dx = x - d.baseX;
            const dy = y - d.baseY;
            if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
              tooClose = true;
              break;
            }
          }

          if (!tooClose) break;
        } else if (area === 'header-cluster' || area === 'header' || area === 'practice-support') {
          // Internal Headers & Support: Prevent dots behind text, cluster around it
          const isCluster = area === 'header-cluster';
          const isSupport = area === 'practice-support';
          
          // Define the text exclusion zone (center of the header area)
          const exclusionLeft = 30;
          const exclusionRight = 70;
          const exclusionTop = isSupport ? 45 : 40;
          const exclusionBottom = isSupport ? 65 : 60;

          // Spawn in a wider area but respect margins on mobile
          const areaXMin = isSmallScreen ? 15 : (isCluster ? 20 : 10);
          const areaXMax = isSmallScreen ? 85 : (isCluster ? 80 : 90);
          
          x = areaXMin + Math.random() * (areaXMax - areaXMin);
          y = isCluster ? (25 + Math.random() * 50) : (15 + Math.random() * 70);

          // Exclusion Zone Check
          const inExclusionZone = x > exclusionLeft && x < exclusionRight && y > exclusionTop && y < exclusionBottom;
          
          if (inExclusionZone) {
            // If in exclusion zone, push it to the nearest edge to "cluster"
            const distToLeft = x - exclusionLeft;
            const distToRight = exclusionRight - x;
            const distToTop = y - exclusionTop;
            const distToBottom = exclusionBottom - y;
            
            const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
            
            const pushOffset = 8; // Increased push for cleaner framing
            if (minDist === distToLeft) x = exclusionLeft - (Math.random() * pushOffset);
            else if (minDist === distToRight) x = exclusionRight + (Math.random() * pushOffset);
            else if (minDist === distToTop) y = exclusionTop - (Math.random() * pushOffset);
            else y = exclusionBottom + (Math.random() * pushOffset);
          }

          let tooClose = false;
          for (const d of dots) {
            const dx = x - d.baseX;
            const dy = y - d.baseY;
            if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
              tooClose = true;
              break;
            }
          }

          if (!tooClose) break;
        } else if (area === 'menu') {
          // Mobile Menu: Avoid top navigation bar area
          x = 5 + Math.random() * 90;
          y = 5 + Math.random() * 90;
          
          const inHeaderZone = y < 15;
          
          if (inHeaderZone) continue;
          
          // Collision check
          let tooClose = false;
          for (const d of dots) {
            const dx = x - d.baseX;
            const dy = y - d.baseY;
            if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
              tooClose = true;
              break;
            }
          }
          if (!tooClose) break;
        } else {
          x = xMin + Math.random() * xRange;
          y = Math.random() * 100;
          break;
        }
      } while (attempts < maxAttempts);

      dots.push({
        x: 0,
        y: 0,
        baseX: x,
        baseY: y,
        color: shuffledColors[i % shuffledColors.length],
        size: 12, // Fixed 12px globally
        angle: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.01, // Slower, calmer movement
        range: 8 + Math.random() * 12,
      });
    }
    dotsRef.current = dots;
  }, [count, area, colors, isSmallScreen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const { width, height } = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Update dot pixel positions based on percentages
      dotsRef.current.forEach(dot => {
        dot.x = (dot.baseX / 100) * width;
        dot.y = (dot.baseY / 100) * height;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const animate = (time: number) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      
      ctx.clearRect(0, 0, width, height);
      
      const mouse = mouseRef.current;
      const isMobile = window.innerWidth < 768;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      dotsRef.current.forEach(dot => {
        const targetX = (dot.baseX / 100) * width;
        const targetY = (dot.baseY / 100) * height;

        // 1. Subtle floating animation (Ambient)
        dot.angle += dot.speed;
        const floatX = Math.cos(dot.angle) * (dot.range * 0.15);
        const floatY = Math.sin(dot.angle) * (dot.range * 0.15);

        let finalTargetX = targetX + floatX;
        let finalTargetY = targetY + floatY;

        // 2. Interactive Magnetic Push (Desktop only, no reduced motion)
        if (!isMobile && !prefersReducedMotion) {
          const dx = dot.x - mouse.x;
          const dy = dot.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceRadius = 180; // Slightly larger radius for gentler feel

          if (distance < forceRadius && distance > 0) {
            const force = (forceRadius - distance) / forceRadius;
            // Gentle repel effect
            finalTargetX += (dx / distance) * force * 40;
            finalTargetY += (dy / distance) * force * 40;
          }
        }

        // 3. Smooth Easing to target (Smooth return)
        const ease = 0.04; // Even softer easing for calmer motion
        dot.x += (finalTargetX - dot.x) * ease;
        dot.y += (finalTargetY - dot.y) * ease;

        // 4. Draw
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    handleResize();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ touchAction: 'none' }}
    />
  );
};
