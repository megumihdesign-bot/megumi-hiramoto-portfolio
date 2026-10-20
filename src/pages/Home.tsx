import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { RevealHeading, RevealText, RevealImage, Reveal } from '../components/Reveal';
import { WipeButton } from '../components/WipeButton';

const SERVICES = [
  { title: 'Brand Identity & Systems', text: 'Strategic, cohesive identities and systems that scale across every touchpoint.' },
  { title: 'Art Direction', text: 'Distinctive, story-led direction that brings every visual together into one clear vision.' },
  { title: 'Visual Design', text: 'From logos to layouts, refined design that makes marketing, social, and brands speak with intention and clarity.' },
  { title: 'Accessible Design', text: 'Inclusive, standards-driven design that meets WCAG, PDF/UA, and Section 508.' },
];

export const Home = () => {
  const reduce = useReducedMotion();
  const reelRef = useRef<HTMLDivElement>(null);
  // The reel grows slightly as it scrolls into place
  const { scrollYProgress } = useScroll({ target: reelRef, offset: ['start end', 'start 0.3'] });
  const reelScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <main className="overflow-x-clip">
      {/* Name and reel */}
      <section className="page-x pt-28 md:pt-36">
        <RevealHeading as="h1" onLoad className="type-page-title !text-[clamp(3.25rem,8.6vw,9rem)]">
          Megumi Hiramoto
        </RevealHeading>

        {/* Portfolio reel (rendered from the Remotion project in ~/Claude/Portfolio Reel) */}
        <div className="relative mt-10 md:mt-14">
          <motion.div ref={reelRef} style={reduce ? undefined : { scale: reelScale }} className="relative">
            <RevealImage delay={0.2}>
              <div data-slot="portfolio-reel" className="w-full aspect-video bg-white overflow-hidden">
                {reduce ? (
                  <img
                    src="/videos/reel-poster.jpg"
                    alt="Portfolio reel: brand identity, art direction and visual design work"
                    className="w-full h-full object-cover"
                    width={1920}
                    height={1080}
                  />
                ) : (
                  <video
                    src="/videos/reel.mp4"
                    poster="/videos/reel-poster.jpg"
                    className="w-full h-full object-cover"
                    aria-label="Portfolio reel: brand identity, art direction and visual design work"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                )}
              </div>
            </RevealImage>
          </motion.div>
        </div>
      </section>

      {/* Services and the works button */}
      <section className="page-x pt-20 md:pt-28 pb-20 md:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12">
        <div className="lg:col-start-4 lg:col-span-9 flex flex-col gap-12 md:gap-16 md:text-right">
          {SERVICES.map((s) => (
            <section key={s.title}>
              <RevealHeading interactive className="font-sans font-normal text-cobalt text-[clamp(1.75rem,3.75vw,3.85rem)] leading-[1.08]">
                {s.title}
              </RevealHeading>
              <RevealText className="mt-4 text-[1rem] md:text-[18px] leading-body text-cobalt">{s.text}</RevealText>
            </section>
          ))}
        </div>

        <Reveal className="lg:col-start-1 lg:col-span-3 lg:row-start-1 lg:self-end">
          <WipeButton to="/work">See selected works</WipeButton>
        </Reveal>
      </div>
      </section>
    </main>
  );
};
