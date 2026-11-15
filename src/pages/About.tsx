import { Fragment, useRef, useState, MouseEvent } from 'react';
import { motion, useInView } from 'motion/react';
import { RevealHeading, Reveal, RevealWords, RevealImage, LiftWords, Typewriter } from '../components/Reveal';
import { WipeButton } from '../components/WipeButton';

const LEAD_1 = "Hi, I'm Megumi.";
const LEAD_2 = "I am a multidisciplinary designer based in San Francisco, CA.";

const INTRO: (string | { text: string; bold?: boolean; className?: string }[])[] = [
  "I blend strategy and storytelling to create clear, empathetic design across digital and print. My work spans brand systems, marketing, social, web, and editorial layout, always guided by modern simplicity. Pretty is fun, but pretty and useful is where I get excited.",
  "I also specialize in accessible design, from inclusive graphics to complex branded PDFs that meet WCAG, PDF/UA, and Section 508. To me, accessibility isn't an add-on. It makes design better for everyone.",
  "When I'm not designing, you'll find me salsa dancing, watching a film, or reading a good fiction novel.",
];

// Left column (headings) is narrower than the right (content) on large screens
const COLS = 'lg:grid-cols-[minmax(0,32fr)_minmax(0,68fr)]';

const RESUME_URL = 'https://drive.google.com/drive/folders/1m5jlyLvwV54RrQMjEzT15PeXZ1UFnBzG';

const EXPERIENCE = [
  { role: 'Senior Graphic Designer', org: 'Imagine Learning', date: 'May 2021–Present' },
  { role: 'Freelance Designer', org: 'Various Clients', date: 'January 2019–Present' },
  { role: 'Graphic Designer', org: 'Tappity', date: 'February 2021–May 2021' },
  { role: 'Editorial Assistant, Harper’s BAZAAR Japan', org: 'Hearst Fujingaho CO., Ltd.', date: 'January 2016–July 2016' },
];

const PRACTICE = [
  { title: 'Brand Identity & Systems', text: 'Strategic, cohesive identities and systems that scale across every touchpoint.' },
  { title: 'Art Direction', text: 'Distinctive, story-led direction that brings every visual together into one clear vision.' },
  { title: 'Visual Design', text: 'From logos to layouts, refined design that makes marketing, social, and brands speak with intention and clarity.' },
  { title: 'Accessible Design', text: 'Inclusive, standards-driven design that meets WCAG, PDF/UA, and Section 508.' },
];

const PRESS = [
  {
    name: 'Haute Living',
    stack: true, // tile title sits on two lines
    quote: '“Hiramoto’s wisdom and lessons for others include the importance of empathy in design, the dual nature of design as both creative and technical, and the necessity of accessibility and inclusivity.”',
    url: 'https://hauteliving.com/2023/05/designing-accessibility-megumi-hiramotos-mission-change-dynamics-design-project-management/729696/',
  },
  {
    name: 'SF Weekly',
    quote: '“By emphasizing the importance of storytelling through design, she ensures that educational technology not only meets the diverse needs of its users but also inspires and engages them through meaningful visual experiences.”',
    url: 'https://www.sfweekly.com/our_partners/storytelling-through-design-megumi-hiramotos-vision-for-meaningful-and-practical-edtech-solutions/article_661f89f4-e86f-11ed-b77c-5b5a75659632.html',
  },
  {
    name: 'FLAUNT',
    quote: '“Her focus on balancing creativity with technical know-how is a reminder that design is both an art and a science.”',
    url: 'https://www.flaunt.com/post/megumi-hiramotos',
  },
  {
    name: 'Digital Journal',
    // source text is missing the opening quotation mark; added for consistency with the other tiles
    quote: '“Hiramoto’s accessible design work helps ensure the fundamental accessible requirements for state or school adoptions and implementation.”',
    url: 'https://www.digitaljournal.com/tech-science/megumi-hiramoto-is-leading-empathetic-and-accessible-design-in-edtech/article',
  },
];

/**
 * Press tile. Default: publication name. Hover / keyboard focus / first tap: cobalt fill with cream outline and quote
 * (circle wipe from the pointer entry point). The whole tile is a link to the article; on touch devices the first
 * tap reveals the quote and the second tap opens the article.
 */
const PressTile = ({ item }: { item: (typeof PRESS)[number] }) => {
  const [active, setActive] = useState(false);

  const setOrigin = (e: { currentTarget: HTMLElement; clientX: number; clientY: number }) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const coarse = window.matchMedia('(hover: none)').matches;
    if (coarse && !active) {
      e.preventDefault();
      setActive(true);
    }
  };

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      data-active={active}
      onPointerEnter={setOrigin}
      onClick={onClick}
      onBlur={() => setActive(false)}
      className="press-tile relative block aspect-square bg-cream text-cobalt overflow-hidden"
    >
      <span className="press-tile__name absolute inset-0 p-5 md:p-6 font-sans text-[clamp(2.25rem,4.2vw,4.25rem)] leading-[1] break-words">
        {item.stack
          ? item.name.split(' ').map((w, i) => (
              <Fragment key={w}>
                {i > 0 && <br />}
                {w}
              </Fragment>
            ))
          : item.name}
      </span>
      <span className="press-tile__reveal absolute inset-0 bg-cobalt text-cream border border-cream flex flex-col justify-between p-5 md:p-8">
        <span className="press-tile__in font-normal text-[clamp(0.95rem,1.35vw,1.25rem)] leading-[1.75]">{item.quote}</span>
        <span className="press-tile__in flex items-center justify-between font-medium text-[clamp(0.95rem,1.3vw,1.125rem)]">
          {item.name}
          <span className="press-tile__arrow" aria-hidden="true">↗</span>
        </span>
      </span>
      <span className="sr-only"> (opens article in a new tab)</span>
    </a>
  );
};

export const About = () => {
  const contactRef = useRef<HTMLElement>(null);
  const playContact = useInView(contactRef, { once: true, amount: 0.4 });

  return (
    <main>
      {/* Introduction */}
      <section className="bg-cream page-x pt-28 md:pt-36 pb-16 md:pb-24">
        <RevealHeading as="h1" onLoad className="type-page-title">About</RevealHeading>
        <div className={`mt-14 md:mt-20 grid grid-cols-1 ${COLS} gap-y-10 items-start`}>
          {/* Left column: photo with an offset cobalt square behind it. On desktop it starts one lead-line below the top
              so the first line of the lead sits above it and the second line runs across its top-right corner */}
          <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:pr-20 max-lg:max-w-[22rem] max-lg:mb-6 lg:mt-[calc(1.18*clamp(2.25rem,3.06vw,3.25rem))]">
            <div className="relative" style={{ width: 'calc(100% / 1.075)', marginLeft: 'calc(100% - 100% / 1.075)' }}>
              <motion.span
                aria-hidden="true"
                className="absolute z-0 bg-cobalt"
                style={{ left: '-7.5%', bottom: '-8%', width: '68%', aspectRatio: '1 / 1' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <RevealImage delay={0.15} className="relative z-10">
                <img
                  src="/images/Megumi-H.jpg"
                  alt="Portrait of Megumi Hiramoto"
                  width={1080}
                  height={1080}
                  className="block w-full aspect-square object-cover"
                />
              </RevealImage>
            </div>
          </div>
          {/* Lead: two lines, starting about three quarters of the way across the photo and overlapping its top-right corner */}
          <div className="relative z-20 lg:col-start-1 lg:row-start-1 lg:[margin-left:calc((100%-5rem)*0.758)] lg:whitespace-nowrap">
            <RevealWords text={LEAD_1} delay={0.1} stagger={0.02} className="type-lead-serif text-cobalt" />
            <RevealWords text={LEAD_2} delay={0.22} stagger={0.02} className="type-lead-serif text-cobalt" />
          </div>
          {/* Paragraphs share the right-column edge used by the sections below */}
          <div className="lg:col-start-2 lg:row-start-2 lg:mt-4 flex flex-col gap-5 md:gap-6 type-intro text-cobalt">
            {INTRO.map((p, i) => (
              <RevealWords key={i} text={p} delay={0.35 + i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="bg-cream text-cobalt page-x py-16 md:py-24 scroll-mt-20 border-y border-cobalt">
        <div className={`grid grid-cols-1 ${COLS} gap-y-10`}>
          {/* Below lg the wrapper dissolves so the button drops to the end of the list, with no second copy in the DOM */}
          <div className="flex flex-col justify-between gap-10 max-lg:contents">
            <RevealHeading className="type-section-heading max-lg:order-1" wrapperClassName="max-lg:order-1">Experience</RevealHeading>
            <WipeButton href={RESUME_URL} className="self-start max-lg:justify-self-start max-lg:order-3">
              Download resume
            </WipeButton>
          </div>
          <ul className="flex flex-col gap-8 md:gap-10 max-lg:order-2">
            {EXPERIENCE.map((job, i) => (
              <li key={job.role}>
                <Reveal delay={0.15 + i * 0.12}>
                  <LiftWords
                    as="h3"
                    className="type-item-title"
                    segments={[{ text: job.role }, { text: `/ ${job.org}`, className: 'font-normal' }]}
                  />
                  <p className="mt-2 type-support">{job.date}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Area of Practice */}
      <section id="practice" className="bg-cream text-cobalt page-x py-16 md:py-24 scroll-mt-20">
        <div className={`grid grid-cols-1 ${COLS} gap-y-10`}>
          <RevealHeading className="type-section-heading">Area of Practice</RevealHeading>
          <ul className="flex flex-col gap-8 md:gap-10">
            {PRACTICE.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={0.15 + i * 0.12}>
                  <LiftWords as="h3" className="type-item-title" segments={[{ text: item.title }]} />
                  <p className="mt-2 type-support">{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Press */}
      <section id="press" className="on-cobalt bg-cobalt text-cream page-x py-16 md:py-24 scroll-mt-20">
        <div className={`grid grid-cols-1 ${COLS} gap-y-10`}>
          <RevealHeading className="type-section-heading">Press Article</RevealHeading>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {PRESS.map((item, i) => (
              <li key={item.name}>
                <Reveal y={48} delay={(i % 2) * 0.12 + Math.floor(i / 2) * 0.05}>
                  <PressTile item={item} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        ref={contactRef}
        className="bg-cream text-cobalt page-x min-h-[22rem] lg:min-h-[calc(100svh-270px)] lg:pt-[270px] lg:pb-0 py-16 flex flex-col justify-center"
      >
        {/* One sequence: question, address, line, sign-off. Each starts when the previous has finished */}
        <p className="text-[13px] md:text-[15px]">
          <Typewriter text="Ready to build something together?" play={playContact} startDelay={120} />
        </p>
        <div className="mt-2 flex items-center gap-3 md:gap-6">
          <a
            href="mailto:megumihdesign@gmail.com"
            className="link-wipe shrink-0 whitespace-nowrap text-lg md:text-xl font-medium hover:text-accent"
          >
            <Typewriter text="megumihdesign@gmail.com" play={playContact} startDelay={760} />
          </a>
          <span
            aria-hidden="true"
            className={`h-px min-w-4 flex-1 bg-cobalt origin-left transition-transform duration-[700ms] ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none motion-reduce:scale-x-100 ${playContact ? 'scale-x-100' : 'scale-x-0'}`}
            style={{ transitionDelay: '1220ms' }}
          />
          <p className="shrink-0 whitespace-nowrap text-[13px] md:text-[15px]">
            <Typewriter text="Let’s chat!" play={playContact} startDelay={1780} />
          </p>
        </div>
      </section>
    </main>
  );
};
