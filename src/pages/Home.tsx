import { motion, useReducedMotion } from 'motion/react';
import { PROJECTS } from '../data/projects';
import { RevealHeading, RevealText, Reveal } from '../components/Reveal';
import { WipeButton } from '../components/WipeButton';

const SERVICES = [
  { title: 'Brand Identity & Systems', text: 'Strategic, cohesive identities and systems that scale across every touchpoint.' },
  { title: 'Art Direction', text: 'Distinctive, story-led direction that brings every visual together into one clear vision.' },
  { title: 'Visual Design', text: 'From logos to layouts, refined design that makes marketing, social, and brands speak with intention and clarity.' },
  { title: 'Accessible Design', text: 'Inclusive, standards-driven design that meets WCAG, PDF/UA, and Section 508.' },
];

/**
 * Hero collage: covers from Work laid out as an overlapping cluster (no links).
 * Positions are percentages of a 836 x 522 stage so the whole cluster scales with the viewport.
 * Each tile enters in turn, and tilts slightly when the pointer is over it (like the Readymag reference).
 */
const STAGE = { w: 836, h: 522 };
const TILE_W = 237;
// index into PROJECTS (cover order), position in stage px, native cover ratio, stacking, hover tilt (deg)
const COLLAGE = [
  { project: 5, x: 492, y: 40, ratio: '1080 / 1400', z: 1, tilt: 2.5 },   // Burn A Light (behind)
  { project: 1, x: 188, y: 0, ratio: '1 / 1', z: 2, tilt: -2.5 },        // Dragonfly
  { project: 0, x: 0, y: 133, ratio: '1080 / 1400', z: 3, tilt: -2 },    // Traverse
  { project: 2, x: 306, y: 215, ratio: '1080 / 1400', z: 4, tilt: 2 },   // VelocityAI
  { project: 3, x: 599, y: 229, ratio: '1 / 1', z: 5, tilt: -2.5 },      // StudySync (front)
];

const HeroCollage = () => {
  const reduce = useReducedMotion();
  return (
    <div className="relative w-full" style={{ aspectRatio: `${STAGE.w} / ${STAGE.h}` }} aria-hidden="true">
      {COLLAGE.map((t, i) => {
        const p = PROJECTS[t.project];
        return (
          <motion.div
            key={p.id}
            className="home-tile absolute"
            style={{
              left: `${(t.x / STAGE.w) * 100}%`,
              top: `${(t.y / STAGE.h) * 100}%`,
              width: `${(TILE_W / STAGE.w) * 100}%`,
              aspectRatio: t.ratio,
              zIndex: t.z,
              ['--tilt' as string]: `${t.tilt}deg`,
            }}
            initial={reduce ? false : { opacity: 0, y: 36, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Idle sway: each tile hangs and drifts on its own slow cycle (hover tilt lives on the layer inside) */}
            <motion.div
              className="h-full w-full"
              style={{ transformOrigin: '50% 0%' }}
              animate={reduce ? undefined : { rotate: [0, 1.8, 0, -1.8, 0] }}
              transition={{ duration: 4.2 + i * 0.45, repeat: Infinity, ease: 'easeInOut', delay: 1 + i * 0.15 }}
            >
              <div className="home-tile__inner h-full w-full overflow-hidden">
                <img src={p.cover} alt="" className="h-full w-full object-cover" draggable={false} loading="eager" />
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export const Home = () => {
  return (
    <main className="overflow-x-clip">
      {/* Name and work collage: fills the first viewport */}
      <section className="page-x min-h-[100svh] flex items-center pt-24 pb-12 md:pb-16">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-y-12 lg:gap-x-8">
          <div className="lg:col-span-5">
            <RevealHeading as="h1" onLoad className="type-page-title !text-[clamp(3.25rem,8.6vw,9rem)]">
              Megumi Hiramoto
            </RevealHeading>
          </div>
          <div className="lg:col-span-7">
            <HeroCollage />
          </div>
        </div>
      </section>

      {/* Disciplines and the works button, on cobalt */}
      <section className="on-cobalt bg-cobalt text-cream page-x pt-20 md:pt-28 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12">
          <div className="lg:col-start-4 lg:col-span-9 flex flex-col gap-12 md:gap-16 md:text-right">
            {SERVICES.map((s) => (
              <section key={s.title}>
                <RevealHeading interactive className="font-sans font-normal text-cream text-[clamp(1.75rem,3.75vw,3.85rem)] leading-[1.08]">
                  {s.title}
                </RevealHeading>
                <RevealText className="mt-4 text-[1rem] md:text-[18px] leading-body text-cream">{s.text}</RevealText>
              </section>
            ))}
          </div>

          <Reveal className="lg:col-start-1 lg:col-span-3 lg:row-start-1 lg:self-end">
            <WipeButton to="/work" variant="inverse" className="btn-round">
              <span>
                See
                <br />
                selected
                <br />
                works
              </span>
              <span className="btn-arrow" aria-hidden="true">
                <svg width="12" height="16" viewBox="0 0 12 16" fill="none" stroke="currentColor" strokeWidth="1.3" style={{ transform: 'rotate(-135deg)' }}>
                  <path d="M6 1v12M1.5 8.5L6 13l4.5-4.5" />
                </svg>
              </span>
            </WipeButton>
          </Reveal>
        </div>
      </section>
    </main>
  );
};
