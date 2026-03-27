import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import { MediaRenderer } from '../components/MediaRenderer';
import { PasswordGate } from '../components/PasswordGate';

export const ProjectDetail = () => {
  const { id } = useParams();
  
  const projectData: Record<string, any> = {
    '1': {
      title: 'Traverse',
      subtitle: '2021–present',
      category: 'Accessible Design / Design Systems / Layout Design / Marketing Design / Visual Design',
      description: 'Traverse® is a comprehensive social studies curriculum designed to inspire curiosity and critical thinking. As a Senior Designer, I collaborated with directors to evolve a dynamic brand identity and create a wide range of on-brand design assets supporting the product, sales enablement, and marketing initiatives.',
      images: [
        '/images/Projects/1_Traverse/Traverse-1.webp',
        '/images/Projects/1_Traverse/Traverse-2.webp',
        '/images/Projects/1_Traverse/Traverse-3.webp',
        '/images/Projects/1_Traverse/Traverse-4.webp',
        '/images/Projects/1_Traverse/Traverse-5.webp',
        '/images/Projects/1_Traverse/Traverse-6.webp',
        '/images/Projects/1_Traverse/Traverse-7.webp',
        '/images/Projects/1_Traverse/Traverse-8.webp',
        '/images/Projects/1_Traverse/Traverse-9.webp',
      ]
    },
    '2': {
      title: 'Dragonfly',
      subtitle: '2024–present',
      category: 'Accessible Design / Design Systems / Layout Design / Marketing Design / Social Media Design / Visual Design',
      description: 'Dragonfly is a knowledge-rich, science-of-reading–aligned ELA curriculum. As a Senior Designer, I collaborated with directors to lead and execute visual design projects spanning product content, accessibility design strategy and production, and go-to-market campaigns.',
      images: [
        '/images/Projects/2_Dragonfly/Dragonfly-1.webp',
        '/images/Projects/2_Dragonfly/Dragonfly-2.webp',
        '/images/Projects/2_Dragonfly/Dragonfly-3.webp',
        '/images/Projects/2_Dragonfly/Dragonfly-4.webp',
        '/images/Projects/2_Dragonfly/Dragonfly-5.webp',
        '/images/Projects/2_Dragonfly/Dragonfly-6.webp',
        '/images/Projects/2_Dragonfly/Dragonfly-7.webp',
        '/images/Projects/2_Dragonfly/Dragonfly-8.webp',
      ]
    },
    '3': {
      title: 'VelocityAI',
      subtitle: '2025',
      category: 'UX/UI Design / Visual Design / Web Design',
      description: 'VelocityAI provides AI-driven coaching, real-time guidance, and automated workflows for sales teams. As a Creative Designer, I explored the visual direction of the marketing website and developed high-fidelity prototypes and frameworks in Figma and Webflow to support developer implementation.',
      images: [
        '/images/Projects/3_VelocityAI/VelocityAI-1.webp',
        '/images/Projects/3_VelocityAI/VelocityAI-2.webp',
        '/images/Projects/3_VelocityAI/VelocityAI-3.webp',
        '/images/Projects/3_VelocityAI/VelocityAI-4.webp',
        '/images/Projects/3_VelocityAI/VelocityAI-5.webp',
      ]
    },
    '4': {
      title: 'BeHome Catalog',
      subtitle: '2023',
      category: 'Editorial & Layout Design',
      description: 'BeHome is a San Pablo–based retail brand offering eco-friendly home and lifestyle products sourced globally. As a freelance designer, I refreshed the Spring 2024 catalog, creating dynamic layouts and a cohesive visual presentation for the seasonal collection.',
      images: [
        '/images/Projects/4_BeHome%20Catalog/BeHomeCatalog-1.webp',
        '/images/Projects/4_BeHome%20Catalog/BeHomeCatalog-2.webp',
        '/images/Projects/4_BeHome%20Catalog/BeHomeCatalog-3.webp',
        '/images/Projects/4_BeHome%20Catalog/BeHomeCatalog-4.webp',
        '/images/Projects/4_BeHome%20Catalog/BeHomeCatalog-5.webp',
      ]
    },
    '5': {
      title: 'StudySync',
      subtitle: '2021–present',
      category: 'Accessible Design / Design Systems / Layout Design / Marketing Design / Social Media Design / Visual Design',
      description: 'StudySync is a comprehensive English language arts curriculum designed to support daily learning and text-based knowledge building. As a Senior Designer, I partnered with directors to lead and execute visual design initiatives across product content, accessibility design strategy and production, and sales and marketing materials.',
      images: [
        '/images/Projects/5_StudySync/StudySync-1.webp',
        '/images/Projects/5_StudySync/StudySync-2.gif',
        '/images/Projects/5_StudySync/StudySync-3.webp',
        '/images/Projects/5_StudySync/StudySync-4.webp',
        '/images/Projects/5_StudySync/StudySync-5.webp',
        '/images/Projects/5_StudySync/StudySync-6.webp',
      ]
    },
    '6': {
      title: 'Accessibility Across Brands',
      subtitle: '2022–present',
      category: 'Accessible Design / Layout Design / Visual Design',
      description: 'Accessible content is required in many industries under the ADA and Sections 504 and 508 of the Rehabilitation Act. As a Senior Designer specializing in the WCAG and PDF/UA compliant accessible designs—especially graphics and PDF designs—at Imagine Learning, I strategize, lead, and execute accessibility initiatives across core products including StudySync, Traverse, and Dragonfly, collaborating with and guiding a team of designers and contractors.',
      images: [
        '/images/Projects/6_Accessibility%20Across%20Brands/Accessibility-1.webp',
        '/images/Projects/6_Accessibility%20Across%20Brands/Accessibility-2.webp',
        '/images/Projects/6_Accessibility%20Across%20Brands/Accessibility-3.webp',
        '/images/Projects/6_Accessibility%20Across%20Brands/Accessibility-4.webp',
        '/images/Projects/6_Accessibility%20Across%20Brands/Accessibility-5.webp',
        '/images/Projects/6_Accessibility%20Across%20Brands/Accessibility-6.webp',
        '/images/Projects/6_Accessibility%20Across%20Brands/Accessibility-7.webp',
      ]
    },
    '7': {
      title: 'Micuna Kitchen',
      subtitle: '2020',
      category: 'Design Systems / Social Media Design / Visual Design',
      description: 'Micuna Kitchen is a San Francisco–based provider of vegan dining options. As a freelance designer, I conceptualized and produced a series of brand materials including business cards, flyers, menus, and social media graphics.',
      images: [
        '/images/Projects/7_Micuna%20Kitchen/MicunaKitchen-1.webp',
        '/images/Projects/7_Micuna%20Kitchen/MicunaKitchen-2.webp',
        '/images/Projects/7_Micuna%20Kitchen/MicunaKitchen-3.webp',
        '/images/Projects/7_Micuna%20Kitchen/MicunaKitchen-4.webp',
        '/images/Projects/7_Micuna%20Kitchen/MicunaKitchen-5.webp',
      ]
    },
    '8': {
      title: 'Burn A Light Social Media Campaign',
      subtitle: '2024–present',
      category: 'Social Media Design',
      description: 'Burn A Light is a San Francisco–based social impact production studio founded by critically-acclaimed filmmaker Apo W. Bazidi. As a designer and creative consultant, I contributed to social media campaigns that supported brand positioning and film promotion.',
      images: [
        '/images/Projects/8_Burn%20A%20Light%20SocialMedia%20Campaign/BurnALight-1.webp',
        '/images/Projects/8_Burn%20A%20Light%20SocialMedia%20Campaign/BurnALight-2.webp',
        '/images/Projects/8_Burn%20A%20Light%20SocialMedia%20Campaign/BurnALight-3.webp',
        '/images/Projects/8_Burn%20A%20Light%20SocialMedia%20Campaign/BurnALight-4.webp',
      ]
    },
    '9': {
      title: 'American Industries',
      subtitle: '2020, Graduate School Project, Academy of Art University',
      category: 'Branding & Brand Design / Design Systems / Visual Design',
      description: 'In this academic rebranding project, students were tasked with reimagining a declining brand. Drawing on my background and interest in fashion media and journalism, I rebranded American Apparel as American Industries, developing a new identity system and visual language while preserving the brand's original spirit.',
      images: [
        '/images/Projects/9_American%20Industries/American%20Industries-1.webp',
        '/images/Projects/9_American%20Industries/American%20Industries-2.webp',
        '/images/Projects/9_American%20Industries/American%20Industries-3.webp',
        '/images/Projects/9_American%20Industries/American%20Industries-4.webp',
        '/images/Projects/9_American%20Industries/American%20Industries-5.webp',
        '/images/Projects/9_American%20Industries/American%20Industries-6.webp',
        '/images/Projects/9_American%20Industries/American%20Industries-7.webp',
        '/images/Projects/9_American%20Industries/American%20Industries-8.webp',
        '/images/Projects/9_American%20Industries/American%20Industries-9.webp',
        '/images/Projects/9_American%20Industries/American%20Industries-10.webp',
        '/images/Projects/9_American%20Industries/American%20Industries-11.webp',
      ]
    },
    'default': {
      title: 'Design Project',
      subtitle: 'Strategic Visual Communication & Brand Storytelling',
      category: 'Brand Design / Visual Design / Strategy',
      description: 'This project explores the intersection of strategic thinking and visual elegance. Through a deep focus on craft and user experience, we created a solution that resonates with the target audience and achieves business goals.',
      images: [
        'https://picsum.photos/seed/design1/1600/900',
        'https://picsum.photos/seed/design2/1600/900',
        'https://picsum.photos/seed/design3/1600/900',
      ]
    }
  };

  const project = projectData[id as string] || projectData.default;

  const protectedProjects = ['Traverse', 'Dragonfly', 'StudySync'];
  const isProtected = protectedProjects.includes(project.title);

  // Navigation Logic
  const currentIndex = PROJECTS.findIndex(p => p.id.toString() === id);
  const prevIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
  const nextIndex = (currentIndex + 1) % PROJECTS.length;
  
  const prevProject = PROJECTS[prevIndex];
  const nextProject = PROJECTS[nextIndex];

  return (
    <PasswordGate isProtected={isProtected}>
      <main className="pt-40 pb-0 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-8">
          <motion.h1 
            className="text-4xl md:text-7xl font-serif text-cobalt mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {project.title}
          </motion.h1>
          <motion.p 
            className="text-lg text-cobalt font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {project.subtitle}
          </motion.p>
        </div>

        <div className="border-t border-cobalt/20 pt-8 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-lg text-ink leading-relaxed">
              {project.category}
            </p>
          </div>
          <div className="lg:col-span-8">
            <p className="text-lg text-ink leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        <div className="space-y-12 mb-16">
          {project.images.map((img: string, idx: number) => (
            <motion.div
              key={idx}
              className="bg-stone/20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <MediaRenderer 
                src={img} 
                alt={`${project.title} visual ${idx + 1}`} 
                className="w-full h-auto block"
              />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-12">
          <Link to={`/work/${prevProject.id}`} className="flex items-center gap-2 text-cobalt hover:opacity-60 transition-opacity group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Previous Project</span>
          </Link>
          
          <Link to={`/work/${nextProject.id}`} className="flex items-center gap-2 text-cobalt hover:opacity-60 transition-opacity group">
            <span>Next Project</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </main>
    </PasswordGate>
  );
};
