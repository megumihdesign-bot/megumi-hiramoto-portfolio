import { motion, useReducedMotion } from 'motion/react';
import { FC, useEffect, useRef, useState } from 'react';

const PHRASES = [
  "Brand Identity & Systems",
  "Art Direction",
  "Visual Design",
  "Accessible Design"
];

// Reveal pacing is unchanged: one phrase every 0.9s, 0.6s each.
const STEP = 0.9;
const REVEAL = 0.6;
const HOLD_MS = 700; // pause after the last phrase lands (was 2000)
const EXIT_MS = 900; // curtain lift

export const IntroSequence: FC<{ onExitStart: () => void; onComplete: () => void }> = ({ onExitStart, onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);
  // Latest callbacks, so parent re-renders never restart the timers
  const startRef = useRef(onExitStart);
  const doneRef = useRef(onComplete);
  startRef.current = onExitStart;
  doneRef.current = onComplete;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Accessibility: no stagger, hold 1s, then a plain fade (400ms)
    const exitAt = shouldReduceMotion ? 1000 : (STEP * (PHRASES.length - 1) + REVEAL) * 1000 + HOLD_MS;
    const exitFor = shouldReduceMotion ? 400 : EXIT_MS;

    const t1 = setTimeout(() => {
      setIsExiting(true);
      startRef.current();
    }, exitAt);
    const t2 = setTimeout(() => {
      document.body.style.overflow = '';
      doneRef.current();
    }, exitAt + exitFor);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = '';
    };
  }, [shouldReduceMotion]);

  return (
    // Exit: the cobalt panel closes in on itself as a circle — the same wipe the Press cards use,
    // played in reverse — while the lines drift up and fade, revealing the home page underneath.
    <motion.div
      className="fixed inset-0 z-[10000] bg-cobalt flex items-center justify-center h-dvh overflow-hidden"
      initial={{ opacity: 1, clipPath: 'circle(140% at 50% 45%)' }}
      animate={
        isExiting
          ? shouldReduceMotion
            ? { opacity: 0 }
            : { clipPath: 'circle(0% at 50% 45%)' }
          : { opacity: 1, clipPath: 'circle(140% at 50% 45%)' }
      }
      transition={{ duration: shouldReduceMotion ? 0.4 : EXIT_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex flex-col gap-4 md:gap-8 lg:gap-10 text-center">
        {PHRASES.map((phrase, idx) => (
          <motion.h1
            key={phrase}
            className="text-cream font-serif font-normal leading-tight text-balance px-6 text-[clamp(2.5rem,7.5vw,7rem)]"
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={isExiting && !shouldReduceMotion ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
            transition={
              isExiting
                ? { duration: 0.55, delay: idx * 0.06, ease: [0.4, 0, 0.2, 1] }
                : { duration: REVEAL, delay: shouldReduceMotion ? 0 : idx * STEP, ease: [0.4, 0, 0.2, 1] }
            }
          >
            {phrase}
          </motion.h1>
        ))}
      </div>
    </motion.div>
  );
};
