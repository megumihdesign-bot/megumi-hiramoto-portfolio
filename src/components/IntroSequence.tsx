import { motion, useReducedMotion } from 'motion/react';
import { FC, useEffect, useState } from 'react';

const PHRASES = [
  "Visual Design",
  "Brand Design",
  "Accessibility Design"
];

export const IntroSequence: FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    if (shouldReduceMotion) {
      // Accessibility: Skip stagger, hold for 1s, then fade out (400ms)
      const timer = setTimeout(() => {
        setIsExiting(true);
      }, 1000);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }

    // Standard: Sequential reveal (0, 900, 1800) + hold (2000) = 4400ms
    // Then fade out (400ms)
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 4400);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete, shouldReduceMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-cobalt flex items-center justify-center h-dvh overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      onAnimationComplete={() => {
        if (isExiting) {
          document.body.style.overflow = '';
          onComplete();
        }
      }}
    >
      <div className="flex flex-col gap-4 md:gap-8 lg:gap-10 text-center">
        {PHRASES.map((phrase, idx) => (
          <motion.h1
            key={phrase}
            className="text-stone text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-sans font-bold leading-tight"
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: shouldReduceMotion ? 0 : idx * 0.9,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {phrase}
          </motion.h1>
        ))}
      </div>
    </motion.div>
  );
};
