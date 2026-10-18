import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { MediaRenderer } from '../components/MediaRenderer';
import { PasswordGate } from '../components/PasswordGate';
import { RevealHeading, RevealText, RevealMedia, Reveal } from '../components/Reveal';
import { IMAGE_SIZES } from '../data/imageSizes';

// Data-driven template: all content comes from src/data/projects.ts
export const ProjectDetail = () => {
  const { id } = useParams();
  const reduce = useReducedMotion();
  const base = import.meta.env.BASE_URL;

  const currentIndex = PROJECTS.findIndex((p) => p.id.toString() === id);
  if (currentIndex < 0) return <Navigate to="/work" replace />;
  const project = PROJECTS[currentIndex];

  // Previous / Next navigation (wraps around)
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  // First image sits right under the title block; description follows, then the rest.
  // Projects without images get neutral placeholders.
  const slots: (string | null)[] = project.images.length ? project.images : [null, null, null, null];
  const [hero, ...rest] = slots;
  const chips = project.info.split(' / ');

  const renderSlot = (src: string | null, idx: number) => {
    // Intrinsic size reserves the space before the file loads, so nothing jumps and the
    // reveal observer measures real positions on first paint.
    const size = src ? IMAGE_SIZES[src.slice(base.length)] : undefined;
    return (
      // No hover scaling on project pages; the reveal is a fade with a small settle.
      <RevealMedia key={src ?? `ph-${idx}`} eager={idx === 0} delay={idx === 0 ? 0.2 : 0}>
        {src ? (
          <MediaRenderer
            src={src}
            alt={`${project.title} visual ${idx + 1}`}
            className="w-full h-auto block"
            width={size?.w}
            height={size?.h}
            loading={idx === 0 ? 'eager' : 'lazy'}
            fetchPriority={idx === 0 ? 'high' : undefined}
          />
        ) : (
          <div className="w-full aspect-[16/9] bg-[#D9D9D9]" aria-hidden="true" />
        )}
      </RevealMedia>
    );
  };

  return (
    <PasswordGate isProtected={!!project.isProtected}>
      <main className="pt-28 md:pt-36 pb-0 page-x overflow-x-clip">
        {/* Title block: long titles wrap naturally in the left column; subtitle sits right, centered on the divider */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] lg:gap-x-10 gap-y-5 lg:gap-y-8">
          <RevealHeading
            as="h1"
            onLoad
            wrapperClassName="lg:col-start-1 lg:row-start-1"
            className="type-project-title text-balance"
          >
            {project.title}
          </RevealHeading>

          <RevealText
            delay={0.5}
            className="lg:col-start-2 lg:row-start-2 self-center font-sans text-[clamp(1.25rem,1.9vw,1.9rem)] leading-[1.25] text-cobalt"
          >
            {project.subtitle}
          </RevealText>

          <div className="lg:col-start-1 lg:row-start-2 self-center" aria-hidden="true">
            <motion.div
              className="h-px bg-cobalt origin-left"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            />
          </div>

          <RevealText delay={0.6} className="lg:col-start-1 lg:row-start-3 -mt-4 lg:-mt-7 text-[14px] md:text-[16px] font-normal text-cobalt">
            {project.keywords.join(' / ')}
          </RevealText>
        </div>

        <div className="mt-12 md:mt-20 lg:mt-28 flex flex-col gap-6 md:gap-8">
          {renderSlot(hero, 0)}

          {/* Cobalt panel: starts ~21% in, bleeds off the right edge of the viewport */}
          <Reveal className="on-cobalt bg-cobalt text-cream -mr-8 md:-mr-16 pr-8 md:pr-[5.5rem] pl-6 md:pl-[4.5rem] py-12 md:py-20 lg:ml-[21%] my-4 md:my-8 lg:my-12">
            <ul aria-label="Role, organization, and date" className="flex flex-wrap gap-3 md:gap-4 mb-6">
              {chips.map((c, i) => (
                <li
                  key={c}
                  className={`text-[13px] md:text-[15px] px-5 py-2 border border-cream ${i === 0 ? 'text-cream' : 'bg-cream text-cobalt'}`}
                >
                  {c}
                </li>
              ))}
            </ul>
            <p className="text-[16px] md:text-[18px] font-normal leading-body text-cream">{project.description}</p>
          </Reveal>

          {rest.map((src, i) => renderSlot(src, i + 1))}
        </div>

        <div className="flex justify-between items-center pt-12 pb-4 mt-4">
          <Link to={`/work/${prevProject.id}`} className="flex items-center gap-2 text-cobalt hover:text-accent transition-colors duration-300 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="uw">Previous Project</span>
          </Link>

          <Link to={`/work/${nextProject.id}`} className="flex items-center gap-2 text-cobalt hover:text-accent transition-colors duration-300 group">
            <span className="uw uw-right">Next Project</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </main>
    </PasswordGate>
  );
};
