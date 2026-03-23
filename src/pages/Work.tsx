import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { FloatingDots } from '../components/FloatingDots';
import { PROJECTS } from '../constants';
import { MediaRenderer } from '../components/MediaRenderer';

export const Work = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main className="pt-24 md:pt-32 lg:pt-40 pb-0 px-8 md:px-16 w-full">
      <div className="relative mb-12 md:mb-16 lg:mb-24">
        <FloatingDots 
          count={20} 
          area={isMobile ? 'header-cluster' : 'header'} 
        />
        <h1 className="text-7xl md:text-9xl font-sans font-bold text-cobalt text-center relative z-10">
          Works
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
          >
            <Link to={`/work/${project.id}`} className="group block">
              <div className="aspect-square overflow-hidden bg-stone/30 mb-4">
                <MediaRenderer
                  src={project.image}
                  alt={project.title}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
              
              <div className="relative overflow-hidden mb-2">
                <h3 className="text-xl font-serif text-cobalt inline-block">
                  {project.title}
                </h3>
                <motion.div 
                  className="h-[1px] bg-cobalt w-full origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              
              <p className="text-xs text-ink tracking-wider leading-relaxed">
                {project.category}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
};
