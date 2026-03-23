import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FloatingDots } from '../components/FloatingDots';

const PRESS_ITEMS = [
  { 
    id: 1, 
    name: 'Haute Living', 
    quote: 'Hiramoto’s wisdom and lessons for others include the importance of empathy in design, the dual nature of design as both creative and technical, and the necessity of accessibility and inclusivity.', 
    shape: 'square', 
    color: 'bg-cobalt', 
    textColor: 'text-stone', 
    gridClass: 'aspect-square',
    url: 'https://hauteliving.com/2023/05/designing-accessibility-megumi-hiramotos-mission-change-dynamics-design-project-management/729696/'
  },
  { 
    id: 2, 
    name: 'SF Weekly', 
    quote: 'By emphasizing the importance of storytelling through design, she ensures that educational technology not only meets the diverse needs of its users but also inspires and engages them through meaningful visual experiences.', 
    shape: 'circle', 
    color: 'bg-stone', 
    textColor: 'text-cobalt', 
    gridClass: 'aspect-square',
    url: 'https://www.sfweekly.com/our_partners/storytelling-through-design-megumi-hiramotos-vision-for-meaningful-and-practical-edtech-solutions/article_661f89f4-e86f-11ed-b77c-5b5a75659632.html'
  },
  { 
    id: 3, 
    name: 'FLAUNT', 
    quote: 'Her focus on balancing creativity with technical know-how is a reminder that design is both an art and a science.', 
    shape: 'square', 
    color: '#97B4DE', 
    textColor: 'text-cobalt', 
    gridClass: 'aspect-square',
    url: 'https://www.flaunt.com/post/megumi-hiramotos'
  },
  { 
    id: 4, 
    name: 'LA Weekly', 
    quote: 'As she continues to lead her design team and advocate for accessibility in design, Megumi is a shining example of what it means to be a designer with empathy.', 
    shape: 'square-rounded', 
    color: '#DCD0BE', 
    textColor: 'text-cobalt', 
    gridClass: 'aspect-square',
    url: 'https://www.laweekly.com/championing-dei-in-edtech-design-megumi-hiramotos-fight-for-visual-representation-and-inclusivity/'
  },
  { 
    id: 5, 
    name: 'GRAZIA', 
    quote: 'Designing with empathy is at the core of her philosophy, ensuring that her creations always remain both inclusive and impactful.', 
    shape: 'square-rounded', 
    color: 'bg-sky', 
    textColor: 'text-cobalt', 
    gridClass: 'aspect-square',
    url: 'https://graziamagazine.com/us/articles/megumi-hiramoto-blending-tokyos-urban-design-aesthetics-with-a-passion-for-social-impact/'
  },
  { 
    id: 6, 
    name: 'Digital Journal', 
    quote: 'Hiramoto’s accessible design work helps ensure the fundamental accessible requirements for state or school adoptions and implementation.', 
    shape: 'circle', 
    color: 'bg-cobalt', 
    textColor: 'text-stone', 
    gridClass: 'aspect-square',
    url: 'https://www.digitaljournal.com/tech-science/megumi-hiramoto-is-leading-empathetic-and-accessible-design-in-edtech/article'
  },
];

const PressBlock = ({ item, delay }: { item: any, delay: number }) => {
  const getShapeClass = (shape: string) => {
    switch (shape) {
      case 'circle': return 'rounded-full';
      case 'rounded-large': return 'rounded-[80px] md:rounded-[120px]';
      case 'square-rounded': return 'rounded-3xl md:rounded-[40px]';
      case 'pill': return 'rounded-full';
      default: return 'rounded-none';
    }
  };

  const isHexColor = item.color.startsWith('#');

  return (
    <div className="relative pt-8">
      {/* Peg/String Visual */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
        <div className="w-2 h-2 rounded-full bg-ink/20" />
        <div className="w-[1px] h-8 bg-ink/10" />
      </div>

      <motion.a
        href={item.url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex items-center justify-center p-8 transition-all duration-500 ${!isHexColor ? item.color : ''} ${item.gridClass} ${getShapeClass(item.shape)} animate-dangling hover:animate-dangling-hover`}
        style={{ 
          animationDelay: `${-delay}s`,
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor: isHexColor ? item.color : undefined
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-4">
          <motion.span 
            className={`font-serif text-2xl md:text-3xl ${item.textColor} transition-all duration-500 ease-portfolio group-hover:opacity-0 absolute`}
          >
            {item.name}
          </motion.span>

          <motion.p 
            className={`font-sans text-sm md:text-base ${item.textColor} opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-portfolio max-w-[90%] translate-y-4 group-hover:translate-y-2`}
          >
            "{item.quote}"
          </motion.p>
        </div>
      </motion.a>
    </div>
  );
};

export const Press = () => {
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
          Press
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 items-start">
        {/* Row 1 */}
        <PressBlock item={PRESS_ITEMS[0]} delay={0} />
        <PressBlock item={PRESS_ITEMS[1]} delay={0.5} />
        <PressBlock item={PRESS_ITEMS[4]} delay={1.5} />

        {/* Row 2 */}
        <PressBlock item={PRESS_ITEMS[3]} delay={0.8} />
        <PressBlock item={PRESS_ITEMS[2]} delay={1.2} />
        <PressBlock item={PRESS_ITEMS[5]} delay={2} />
      </div>
    </main>
  );
};
