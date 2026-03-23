import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FloatingDots } from '../components/FloatingDots';

const PRACTICES = [
  "Accessibility Design", "AI + Design", "Art Direction", "Branding & Brand Design",
  "Design Systems", "Editorial & Layout Design", "Logo Design", "Marketing Design",
  "UX/UI Design", "Web Design", "Visual Design", "Social Media Design"
];

export const About = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12 md:mb-16 lg:mb-24">
        <div className="lg:col-span-12">
          <h2 className="text-3xl md:text-4xl font-serif text-cobalt leading-tight mb-12 w-full">
            Hi, I’m Megumi. I am a multidisciplinary designer and strategic creative thinker based in San Francisco, CA.
          </h2>
        </div>
        
        <div className="lg:col-span-6 text-lg text-cobalt leading-relaxed space-y-6">
          <p>
            Passionate about design strategy and inclusive visual communication, I bring a strong background and skill set in creating empathetic, impactful designs with a touch of modernity and simplicity. My experience spans marketing, social media, layout design, web design, and brand design—blending strategy and visual storytelling across digital and print. I enjoy exploring AI tools to unlock new possibilities and enhance designers’ productivity and creative potential.
          </p>
        </div>
        
        <div className="lg:col-span-6 text-lg text-cobalt leading-relaxed space-y-6">
          <p>
            Beyond traditional creative design, I specialize in accessibility design—particularly contextual graphic design and complex, branded PDF design that meets the WCAG, PDF/UA, and Section 508 standards. Accessibility is not only for those who need it; it makes design more empathetic and user-friendly.
          </p>
          <p>
            When I’m not designing, you’ll find me salsa dancing, watching films, soaking up the sun, or cooking.
          </p>
        </div>
      </div>

      <div className="border-t border-cobalt/20 pt-12 md:pt-16 lg:pt-24 mb-12 md:mb-16 lg:mb-24 relative">
        <FloatingDots count={40} area="practice-support" />
        <h3 className="text-sm tracking-widest text-cobalt text-center mb-12 relative z-10">
          Area of Practice
        </h3>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto relative z-10">
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

      <div className="border-t border-cobalt/20 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <a href="mailto:megumihdesign@gmail.com" className="text-cobalt hover:opacity-60 transition-opacity text-lg">
          megumihdesign@gmail.com
        </a>
        <a 
          href="https://drive.google.com/drive/folders/1m5jlyLvwV54RrQMjEzT15PeXZ1UFnBzG?usp=sharing" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-cobalt hover:opacity-60 transition-opacity text-lg"
        >
          Download Resume
        </a>
        <span className="text-cobalt text-lg">Thank you!</span>
      </div>
    </main>
  );
};
