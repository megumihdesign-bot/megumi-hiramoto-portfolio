import { motion, useReducedMotion } from 'motion/react';
import { ElementType, Fragment, PointerEvent, ReactNode, useEffect, useRef, useState } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

/**
 * Motion kit. Every primitive renders plain, fully visible content when the visitor prefers reduced motion,
 * and content is always present in the DOM (so it is readable by assistive tech and never gated behind animation).
 */

// Pointer-follow lift shared by `interactive` headings and <LiftWords>
const LIFT_PX = 9;
const LIFT_RADIUS = 170;

const liftWords = (root: HTMLElement | null, clientX: number, clientY: number) => {
  root?.querySelectorAll<HTMLElement>('[data-word]').forEach((w) => {
    const r = w.getBoundingClientRect();
    const dx = clientX - (r.left + r.width / 2);
    const dy = (clientY - (r.top + r.height / 2)) * 1.6; // vertical falloff is tighter
    const t = Math.max(0, 1 - Math.hypot(dx, dy) / LIFT_RADIUS);
    const eased = t * t * (3 - 2 * t); // smoothstep
    w.style.transform = `translate3d(0, ${-LIFT_PX * eased}px, 0)`;
  });
};

const dropWords = (root: HTMLElement | null) => {
  root?.querySelectorAll<HTMLElement>('[data-word]').forEach((w) => {
    w.style.transform = 'translate3d(0, 0, 0)';
  });
};

/** Splits text into word spans that respond to the pointer, with no mask/reveal of their own. */
export const LiftWords = ({
  segments,
  className = '',
  as = 'span',
}: {
  /** ordered text runs; each can carry its own classes (e.g. weight) */
  segments: { text: string; className?: string }[];
  className?: string;
  as?: ElementType;
}) => {
  const Tag = as as any;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  if (reduce) {
    return (
      <Tag className={className}>
        {segments.map((seg, i) => (
          <span key={i} className={seg.className}>
            {i > 0 ? ' ' : ''}
            {seg.text}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={className}
      onPointerMove={(e: PointerEvent<HTMLElement>) => {
        if (e.pointerType !== 'mouse') return;
        liftWords(ref.current, e.clientX, e.clientY);
      }}
      onPointerLeave={() => dropWords(ref.current)}
    >
      {segments.map((seg, si) => {
        const words = seg.text.split(' ');
        return (
          <Fragment key={si}>
            {si > 0 && ' '}
            <span className={seg.className}>
              {words.map((w, i) => (
                <Fragment key={i}>
                  <span data-word="" className="rh-word">
                    {w}
                  </span>
                  {i < words.length - 1 && ' '}
                </Fragment>
              ))}
            </span>
          </Fragment>
        );
      })}
    </Tag>
  );
};

/** Heading whose words slide up out of a mask. Pass a plain string. `onLoad` animates on mount instead of on scroll. */
export const RevealHeading = ({
  as = 'h2',
  className = '',
  wrapperClassName = '',
  children,
  delay = 0,
  stagger = 0.07,
  onLoad = false,
  interactive = false,
}: {
  as?: ElementType;
  className?: string;
  /** classes for the wrapper (e.g. grid placement) */
  wrapperClassName?: string;
  children: string;
  delay?: number;
  stagger?: number;
  onLoad?: boolean;
  /** words lift gently as a mouse pointer passes over them (ignored for touch / reduced motion) */
  interactive?: boolean;
}) => {
  const Tag = as as any;
  const reduce = useReducedMotion();
  const headingRef = useRef<HTMLElement>(null);

  const moveWords = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    liftWords(headingRef.current, e.clientX, e.clientY);
  };

  const resetWords = () => dropWords(headingRef.current);

  if (reduce) {
    return (
      <div className={wrapperClassName}>
        <Tag className={className}>{children}</Tag>
      </div>
    );
  }

  const words = children.split(' ');
  const trigger = onLoad
    ? { animate: 'visible' }
    : { whileInView: 'visible', viewport: { once: true, amount: 0.6 } };

  return (
    <div className={wrapperClassName}>
      <Tag
        ref={headingRef}
        className={className}
        onPointerMove={interactive ? moveWords : undefined}
        onPointerLeave={interactive ? resetWords : undefined}
      >
        <motion.span
          className="inline"
          initial="hidden"
          {...trigger}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
        >
          {words.map((w, i) => (
            <Fragment key={i}>
              {/* data-word wrapper carries the pointer lift, so the mask travels with it and never clips */}
              <span data-word={interactive ? '' : undefined} className={interactive ? 'rh-word' : 'inline-block'}>
                {/* clip-path with negative insets masks the slide without clipping ascenders/descenders */}
                <span className="inline-block" style={{ clipPath: 'inset(-0.15em -0.1em -0.4em -0.1em)' }}>
                  <motion.span
                    className="inline-block"
                    variants={{ hidden: { y: '160%' }, visible: { y: '0%', transition: { duration: 0.95, ease: EASE } } }}
                  >
                    {w}
                  </motion.span>
                </span>
              </span>
              {i < words.length - 1 && ' '}
            </Fragment>
          ))}
        </motion.span>
      </Tag>
    </div>
  );
};

/** Soft fade + rise for a block of text or any element. */
export const Reveal = ({
  className = '',
  children,
  delay = 0,
  y = 20,
}: {
  className?: string;
  children: ReactNode;
  delay?: number;
  y?: number;
}) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ y, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
};

/** Paragraph variant of Reveal (keeps <p> semantics). */
export const RevealText = ({ className = '', children, delay = 0.15 }: { className?: string; children: ReactNode; delay?: number }) => {
  const reduce = useReducedMotion();
  if (reduce) return <p className={className}>{children}</p>;
  return (
    <motion.p
      className={className}
      initial={{ y: 14, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.p>
  );
};

/** Paragraph that settles in word by word — quick, for longer copy. */
export const RevealWords = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.014,
  bounceBold = false,
}: {
  /** plain text, or runs of text where some are emphasised */
  text: string | { text: string; bold?: boolean; className?: string }[];
  className?: string;
  delay?: number;
  stagger?: number;
  /** once the reveal finishes, an emphasised run keeps a soft continuous bounce */
  bounceBold?: boolean;
}) => {
  const reduce = useReducedMotion();
  const [settled, setSettled] = useState(false);
  const runs = typeof text === 'string' ? [{ text, bold: false }] : text;

  if (reduce)
    return (
      <p className={className}>
        {runs.map((r, i) => (
          <span key={i} className={r.className ?? (r.bold ? 'font-semibold' : undefined)}>
            {r.text}
          </span>
        ))}
      </p>
    );

  // `bounceAt` gives a word its own phase and pace, so the sentence drifts rather than pulsing as a block
  const word = (w: string, key: string, bounceAt?: number) => (
    <motion.span
      key={key}
      className="inline-block"
      variants={{
        hidden: { y: '0.45em', opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: EASE } },
      }}
    >
      {bounceAt === undefined ? (
        w
      ) : (
        <span
          className="bounce-soft"
          style={{
            animationDelay: `${-(bounceAt * 0.41).toFixed(2)}s`,
            animationDuration: `${2.3 + (bounceAt % 3) * 0.35}s`,
          }}
        >
          {w}
        </span>
      )}
    </motion.span>
  );

  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      onAnimationComplete={() => setSettled(true)}
    >
      {runs.map((run, ri) => {
        // split keeps the original spacing intact
        const parts = run.text.split(/(\s+)/);
        const bounces = !!run.bold && bounceBold && settled;
        let wi = 0;
        const nodes = parts.map((part, i) =>
          /^\s+$/.test(part) || part === '' ? (
            <Fragment key={`${ri}-${i}`}>{part}</Fragment>
          ) : (
            word(part, `${ri}-${i}`, bounces ? wi++ : undefined)
          )
        );
        if (!run.bold) return <Fragment key={ri}>{nodes}</Fragment>;
        return (
          <span key={ri} className={run.className ?? 'font-semibold'}>
            {nodes}
          </span>
        );
      })}
    </motion.p>
  );
};

/** Image / media that unveils with a wipe while its content settles from a slight zoom. */
export const RevealImage = ({
  className = '',
  children,
  delay = 0,
  scaleFrom = 1.18,
  rise = 0,
}: {
  className?: string;
  children: ReactNode;
  delay?: number;
  /** starting zoom of the inner content */
  scaleFrom?: number;
  /** px the whole frame drifts up as it unveils */
  rise?: number;
}) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  // The observed wrapper is never clipped itself (a clipped element reports no intersection).
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: { y: rise },
        visible: { y: 0, transition: { duration: 1.2, ease: EASE, delay } },
      }}
    >
      <motion.div
        className="h-full w-full"
        variants={{
          hidden: { clipPath: 'inset(0 0 100% 0)' },
          visible: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 1.1, ease: EASE_IN_OUT, delay } },
        }}
      >
        <motion.div
          className="h-full w-full"
          variants={{
            hidden: { scale: scaleFrom },
            visible: { scale: 1, transition: { duration: 1.5, ease: EASE, delay } },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/**
 * Media reveal for project pages: a soft fade with a small settle, no scaling.
 * Fails open — if the observer can't run, or motion is reduced, the media is simply visible.
 */
export const RevealMedia = ({
  children,
  className = '',
  /** first image: show straight away (it is in the opening viewport) */
  eager = false,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  eager?: boolean;
  delay?: number;
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (reduce) {
      setShown(true);
      return;
    }

    let cancelled = false;
    let cleanupMedia: (() => void) | undefined;

    // Fade in once the file itself is ready, so a frame never fades in empty.
    // Capped by a timer, so a slow or failed image can never stay hidden.
    const showWhenReady = () => {
      if (cancelled) return;
      const img = el?.querySelector('img');
      if (!img || img.complete) {
        setShown(true);
        return;
      }
      const done = () => !cancelled && setShown(true);
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
      const cap = setTimeout(done, 1500);
      cleanupMedia = () => {
        clearTimeout(cap);
        img.removeEventListener('load', done);
        img.removeEventListener('error', done);
      };
    };

    if (eager || !el || typeof IntersectionObserver === 'undefined') {
      showWhenReady(); // fail open rather than leaving media hidden
      return () => {
        cancelled = true;
        cleanupMedia?.();
      };
    }

    // Space is reserved before images load, so this measurement is reliable on first paint:
    // anything already in (or just below) the opening viewport shows without waiting for a scroll.
    if (el.getBoundingClientRect().top < window.innerHeight + 120) {
      showWhenReady();
      return () => {
        cancelled = true;
        cleanupMedia?.();
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          showWhenReady();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      cleanupMedia?.();
    };
  }, [reduce, eager]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={false}
        animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
        transition={{
          opacity: { duration: 0.85, ease: EASE, delay },
          y: { duration: 1.15, ease: EASE, delay },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * Types text in character by character. The characters are laid out from the start (only their
 * opacity animates), so nothing shifts while it plays, and the full string is always exposed to
 * assistive tech.
 */
export const Typewriter = ({
  text,
  play = true,
  startDelay = 0,
  charMs = 18,
  className = '',
}: {
  text: string;
  play?: boolean;
  startDelay?: number;
  charMs?: number;
  className?: string;
}) => {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {[...text].map((ch, i) => (
          <span
            key={i}
            className={play ? 'tw-char tw-play' : 'tw-char'}
            style={{ animationDelay: `${startDelay + i * charMs}ms` }}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </span>
    </span>
  );
};
