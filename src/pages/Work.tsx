import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { MediaRenderer } from '../components/MediaRenderer';
import { RevealHeading, RevealImage } from '../components/Reveal';

export const Work = () => {
  return (
    <main className="pt-28 md:pt-36 pb-0 page-x w-full">
      <RevealHeading as="h1" onLoad className="type-page-title" wrapperClassName="mb-12 md:mb-16 lg:mb-20">Work</RevealHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7 md:gap-y-8">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
          >
            <Link to={`/work/${project.id}`} className="group block">
              <div className="aspect-square overflow-hidden mb-3">
                <RevealImage className="h-full w-full">
                  <MediaRenderer
                    src={project.cover}
                    alt={project.cardTitle}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </RevealImage>
              </div>
              
              {/* Title and categories roll up out of a mask as the card arrives */}
              <div>
                <RevealHeading as="h3" delay={0.05} className="text-[25px] font-serif text-cobalt">
                  {project.cardTitle}
                </RevealHeading>
                {/* Rule draws itself under the title while the card is hovered */}
                {/* Rule sits centred in the gap between title and categories */}
                <div className="h-2 flex items-center" aria-hidden="true">
                  <div className="h-[1px] bg-cobalt w-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                </div>
              </div>

              <RevealHeading as="p" delay={0.18} className="text-[13px] text-cobalt leading-relaxed">
                {project.categories.join(' / ')}
              </RevealHeading>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
};
