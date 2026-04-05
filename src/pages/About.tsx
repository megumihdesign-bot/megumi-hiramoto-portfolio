import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingDots } from '../components/FloatingDots';

const PRACTICES = [
  "Accessible Design", "AI + Design", "Art Direction", "Branding & Brand Design",
  "Design Systems", "Editorial & Layout Design", "Logo Design", "Marketing Design",
  "UX/UI Design", "Web Design", "Visual Design", "Social Media Design"
];

const EXPERIENCE_DATA = [
  {
    id: 'imagine',
    tabTitle: '01: Imagine Learning',
    date: 'May 2021–Present',
    role: 'Senior Graphic Designer',
    company: 'Imagine Learning',
    categories: 'Accessible Design / Branding & Brand Design / Design Systems / Editorial & Layout Design / Marketing Design / Social Media Design',
    description: [
      'Lead brand and visual design across digital, print, sales, and marketing for multiple product lines — owning projects from concept through delivery while managing and mentoring contractors.',
      'Build and evolve brand identities and style guides that elevate market presence and ensure visual consistency at scale.',
      'Deliver accessible design systems and PDFs compliant with WCAG and PDF/UA standards — directly supporting state adoption approvals and expanding the brands\' market reach.',
      'Collaborate cross-functionally to translate product strategy into high-impact visual communications.'
    ],
    bgColor: '#DCD0BE',
    textColor: '#263A99'
  },
  {
    id: 'various',
    tabTitle: '02: Various Clients',
    date: 'January 2019–Present',
    role: 'Freelance Designer',
    company: 'Various Clients',
    categories: 'Art Direction / Branding & Brand Design / Design Systems / Editorial & Layout Design / Logo Design / Marketing Design / Web Design / Visual Design / Social Media Design',
    description: [
      'Art direct brand vision and visual strategy for clients.',
      'Execute a range of design projects—such as logos, identity systems, marketing collateral, catalogs, and social media—for brands including BeHome, Burn A Light Productions, and VelocityAI.',
      'Provide strategic creative direction alongside execution, serving as both designer and visual partner for growing brands.'
    ],
    bgColor: '#FFFFFF',
    textColor: '#263A99'
  },
  {
    id: 'tappity',
    tabTitle: '03: Tappity',
    date: 'February 2021–May 2021',
    role: 'Graphic Designer',
    company: 'Tappity',
    categories: 'Art Direction / Design Systems / Visual Design',
    description: [
      'Designed UI graphics and visual assets supporting product development for a children\'s education app.',
      'Updated and maintained newsletter layouts to enhance readability and brand consistency.'
    ],
    bgColor: '#263A99',
    textColor: '#FFFFFF'
  },
  {
    id: 'harpers',
    tabTitle: "04: Harper's BAZAAR Japan",
    date: 'January 2016–July 2016',
    role: 'Editorial Assistant',
    company: "Harper's BAZAAR Japan, Hearst Fujingaho Co., Ltd.",
    categories: 'Project Management / Communication',
    description: [
      'Managed editorial projects, digital/physical assets, and schedules for a leading fashion publication.',
      'Supported photo shoots, client communications, and manuscript translations.'
    ],
    bgColor: '#97B4DE',
    textColor: '#263A99'
  }
];

export const About = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(EXPERIENCE_DATA[0].id);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeExperience = EXPERIENCE_DATA.find(exp => exp.id === activeTab)!;

  return (
    <main className="pt-24 md:pt-32 lg:pt-40 pb-0 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="relative mb-12 md:mb-16 lg:mb-24">
        <FloatingDots
          count={20}
          area={isMobile ? 'header-cluster' : 'header'}
        />
        <h1 className="text-7xl md:text-9xl font-sans font-bold text-cobalt text-center relative z-10">
          About
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-12 mb-12 md:mb-16 lg:mb-24">
        <div className="lg:col-span-12">
          <h2 className="text-3xl md:text-4xl font-serif text-cobalt leading-tight mb-6 w-full">
            Hi, I'm Megumi. I am a multidisciplinary designer and strategic creative thinker based in San Francisco, CA.
          </h2>
        </div>

        <div className="lg:col-span-6 text-lg text-cobalt leading-relaxed space-y-6">
          <p>
            Passionate about design strategy and inclusive visual communication, I bring a strong background and skill set in creating empathetic, impactful designs with a touch of modernity and simplicity. My experience spans marketing, social media, layout design, web design, and brand design—blending strategy and visual storytelling across digital and print. I enjoy exploring AI tools to unlock new possibilities and enhance designers' productivity and creative potential.
          </p>
        </div>

        <div className="lg:col-span-6 text-lg text-cobalt leading-relaxed space-y-6">
          <p>
            Beyond traditional creative design, I specialize in accessibility design—particularly contextual graphic design and complex, branded PDF design that meets the WCAG, PDF/UA, and Section 508 standards. Accessibility is not only for those who need it; it makes design more empathetic and user-friendly.
          </p>
          <p>
            When I'm not designing, you'll find me salsa dancing, watching films, soaking up the sun, or cooking.
          </p>
        </div>
      </div>

      {/* Experience Section - Interactive Folder/Tab System */}
      <div className="mb-24 md:mb-32">
        <div className="w-full h-[1px] bg-cobalt/20 mb-24" />
        <h3 className="text-sm tracking-widest text-cobalt text-center mb-16 font-bold">Experience</h3>

        <div className="relative max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap lg:flex-nowrap justify-center gap-1 lg:gap-0 relative z-10 px-4 lg:px-12">
            {EXPERIENCE_DATA.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                className={`px-4 py-3 lg:px-0 lg:py-4 lg:w-48 text-[10px] lg:text-xs tracking-wider transition-all duration-300 rounded-t-xl lg:rounded-t-2xl border-t border-x border-cobalt/5 ${
                  activeTab === exp.id ? 'z-20 font-bold' : 'z-10 font-normal'
                }`}
                style={{
                  backgroundColor: exp.bgColor,
                  color: exp.textColor,
                  marginBottom: activeTab === exp.id ? '-1px' : '0'
                }}
              >
                <span className={activeTab === exp.id ? 'opacity-100' : 'opacity-60'}>
                  {isMobile ? exp.tabTitle.split(':')[0] : exp.tabTitle}
                </span>
              </button>
            ))}
          </div>

          {/* Panel */}
          <div
            className="relative z-0 p-8 md:p-12 lg:p-16 rounded-3xl border border-cobalt/5 shadow-sm min-h-[600px] md:min-h-[550px] lg:min-h-[480px] transition-colors duration-500"
            style={{
              backgroundColor: activeExperience.bgColor,
              color: activeExperience.textColor
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <span className="text-sm font-bold tracking-wider">{activeExperience.date}</span>
                  <h4 className="text-2xl md:text-3xl font-serif">
                    <span className="font-bold">{activeExperience.role}</span> – {activeExperience.company}
                  </h4>
                  <p className="text-xs md:text-sm font-normal tracking-wide leading-relaxed">
                    {activeExperience.categories}
                  </p>
                </div>

                <div className="w-full h-[1px]" style={{ backgroundColor: activeExperience.textColor }} />

                <ul className="space-y-5 list-none pt-4">
                  {activeExperience.description.map((item, i) => (
                    <li key={i} className="text-base md:text-lg leading-relaxed flex items-start gap-4">
                      <span className="flex items-center justify-center h-[1.625em] text-base md:text-xl">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="pt-12 md:pt-16 lg:pt-24 mb-12 md:mb-16 lg:mb-24 relative">
        <FloatingDots count={50} area="practice-support" />
        <h3 className="text-sm tracking-widest text-cobalt text-center mb-16 font-bold relative z-10">
          Area of Practice
        </h3>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-6 max-w-5xl mx-auto relative z-10">
          {PRACTICES.map((practice, idx) => (
            <motion.span
              key={practice}
              className="px-6 py-3 bg-cobalt text-stone rounded-full text-sm font-sans"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05, backgroundColor: 'var(--color-ink)' }}
            >
              {practice}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="pt-12 md:pt-16 lg:pt-24 mb-12 md:mb-16 lg:mb-24 text-center">
        <h3 className="text-sm tracking-widest text-cobalt mb-16 font-bold">Education</h3>
        <div className="space-y-16">
          <div className="space-y-3">
            <h4 className="text-2xl md:text-3xl font-serif text-cobalt font-bold">MA in Graphic Design & Digital Media</h4>
            <p className="text-lg text-cobalt">Academy Art of University, San Francisco CA</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-2xl md:text-3xl font-serif text-cobalt font-bold">BA in International Politics, Economics and Business</h4>
            <p className="text-lg text-cobalt">Aoyama Gakuin University, Tokyo Japan</p>
          </div>
        </div>
      </div>

      {/* Resume Button */}
      <div className="flex justify-center mb-32">
        <a
          href="https://drive.google.com/drive/folders/1m5jlyLvwV54RrQMjEzT15PeXZ1UFnBzG"
          target="_blank"
          rel="noopener noreferrer"
          className="px-12 py-5 bg-cobalt text-stone font-bold tracking-widest hover:bg-ink transition-colors duration-300 rounded-none text-sm"
        >
          Download Megumi's resume
        </a>
      </div>
    </main>
  );
};
