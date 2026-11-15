import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { MediaRenderer } from '../components/MediaRenderer';
import { RevealHeading, RevealImage } from '../components/Reveal';

/**
 * Work page: four columns of covers at their native ratios (square or 1080x1400), rows top-aligned.
 * Hover / keyboard focus: the image steps down and tilts slightly counter-clockwise, a cobalt overlay comes in
 * over it, and the project title rolls up in the space above.
 */

// Native cover sizes (public/images/Hero). Anything not listed is treated as square.
const COVER_SIZE: Record<string, { w: number; h: number }> = {
  'Project_1.webp': { w: 1080, h: 1400 },
  'Project_2.webp': { w: 1080, h: 1080 },
  'Project_3.webp': { w: 1080, h: 1400 },
  'Project_4.webp': { w: 1080, h: 1080 },
  'Project_5.webp': { w: 1080, h: 1080 },
  'Project_6.webp': { w: 1080, h: 1400 },
  'Project_7.webp': { w: 1080, h: 1080 },
  'Project_8.webp': { w: 1080, h: 1400 },
};
const coverSize = (src: string) => COVER_SIZE[src.split('/').pop() ?? ''] ?? { w: 1, h: 1 };

export const Work = () => {
  return (
    <main className="pt-28 md:pt-36 pb-0 page-x w-full">
      <RevealHeading as="h1" onLoad className="type-page-title" wrapperClassName="mb-12 md:mb-16 lg:mb-20">Work</RevealHeading>

      {/* 4 columns on desktop, 3 / 2 / 1 as the screen narrows. Rows are top-aligned: each row starts on the same line. */}
      <div className="work-grid grid grid-cols-1 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1200px]:grid-cols-4 items-start gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-20">
        {PROJECTS.map((project, idx) => {
          const { w, h } = coverSize(project.cover);
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (idx % 4) * 0.1 }}
            >
              <Link to={`/work/${project.id}`} className="work-card group relative block outline-none">
                <span className="work-text">
                  <span className="wc-line"><span>{project.cardTitle}</span></span>
                </span>
                <div className="work-card-media relative overflow-hidden" style={{ aspectRatio: `${w} / ${h}` }}>
                  <RevealImage className="h-full w-full">
                    <MediaRenderer
                      src={project.cover}
                      alt={project.cardTitle}
                      width={w}
                      height={h}
                      loading={idx < 4 ? 'eager' : 'lazy'}
                    />
                  </RevealImage>
                  {/* Brand cobalt wash on hover (opacity set in index.css). A real element so the custom cursor reads it as cobalt. */}
                  <span aria-hidden="true" className="work-overlay absolute inset-0 bg-cobalt" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
};
