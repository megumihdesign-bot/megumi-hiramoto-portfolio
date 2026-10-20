// Single source of truth for Works cards and project pages.
// Copy comes from Portfolio_v2.txt. Add/replace entries in `images` to change a project's image sequence.
const base = import.meta.env.BASE_URL;

export interface Project {
  id: number;
  /** H1 on the project page */
  title: string;
  /** Title on the Works grid card */
  cardTitle: string;
  /** Categories on the Works grid card */
  categories: string[];
  /** Short line shown beside the divider on the project page */
  subtitle: string;
  /** Keywords on the project page (right-aligned) */
  keywords: string[];
  /** Role / organization / date label below the divider */
  info: string;
  description: string;
  /** Works card thumbnail */
  cover: string;
  /** Vertical image sequence on the project page */
  images: string[];
  /** Requires the project password (existing behavior) */
  isProtected?: boolean;
}

/** Builds `${dir}/${name}-1.ext … -n.ext`; `overrides` swaps individual extensions. */
const seq = (dir: string, name: string, count: number, overrides: Record<number, string> = {}) =>
  Array.from({ length: count }, (_, i) => `${base}images/Projects/${dir}/${name}-${i + 1}.${overrides[i + 1] ?? 'webp'}`);

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Traverse Brand Systems',
    cardTitle: 'Traverse Brand Systems',
    subtitle: 'Building a brand system designed to grow with every new edition.',
    categories: ['Accessible Design', 'Brand Systems', 'Visual Design'],
    keywords: ['Accessible Design', 'Brand Systems', 'Visual Design', 'Sales & Marketing'],
    info: 'Senior Designer / Imagine Learning / 2021–2025',
    description: 'Traverse® is a social studies curriculum built to spark curiosity and critical thinking. Partnering with creative directors, I evolved its brand identity into a system that scales across product, sales, and marketing. The work supported two state adoptions, followed by the expansion of the Spanish edition. Beyond core design execution, I project-managed a team of freelance designers for interactive media assets, establishing SOPs and documentation to streamline future production.',
    cover: `${base}images/Hero/Project_1.webp`,
    images: seq('1_Traverse', 'Traverse', 11),
    isProtected: true,
  },
  {
    id: 2,
    title: 'Dragonfly Product Launch',
    cardTitle: 'Dragonfly Product Launch',
    subtitle: 'Shaping a new brand’s identity through its launch.',
    categories: ['Accessible Design', 'Brand Identity & Systems', 'Visual Design'],
    keywords: ['Accessible Design', 'Brand Identity & Systems', 'Visual Design', 'Go-To-Market', 'Sales & Marketing'],
    info: 'Senior Designer / Imagine Learning / 2024–2025',
    description: 'Dragonfly is a science-of-reading–aligned ELA curriculum. I led visual design for its launch, covering print and digital product content, accessibility strategy, and the go-to-market campaign. With no finalized brand guidelines in place, I iterated on the visual direction piece by piece, executing each project while shaping the brand’s identity and foundation.',
    cover: `${base}images/Hero/Project_2.webp`,
    images: seq('2_Dragonfly', 'Dragonfly', 9),
    isProtected: true,
  },
  {
    id: 3,
    title: 'VelocityAI Website',
    cardTitle: 'VelocityAI Website',
    subtitle: 'Setting the visual pace for AI-powered sales.',
    categories: ['Art Direction', 'Web Design', 'UX/UI Design'],
    keywords: ['Art Direction', 'Web Design', 'UX/UI Design'],
    info: 'Creative Designer / VelocityAI / 2025',
    description: 'VelocityAI gives sales teams AI coaching, real-time guidance, and automated workflows. I explored the marketing site’s visual direction and built high-fidelity Figma and Webflow prototypes for developers to build from.',
    cover: `${base}images/Hero/Project_3.webp`,
    images: seq('3_VelocityAI', 'VelocityAI', 5),
  },
  {
    id: 4,
    title: 'BeHome Catalog',
    cardTitle: 'BeHome Catalog',
    subtitle: 'Breaking the grid to bring a spring collection to life.',
    categories: ['Visual Design'],
    keywords: ['Visual Design', 'Editorial Design'],
    info: 'Freelance Designer / BeHome / 2024',
    description: 'BeHome is a San Pablo retailer of sustainably sourced home goods. Tasked with breaking away from a repetitive look and feel, I approached the Spring 2024 catalog with dynamic layouts that present the season’s collection as one cohesive story. The refreshed catalog gave the collection a stronger presence and helped drive traffic to seasonal sales.',
    cover: `${base}images/Hero/Project_4.webp`,
    images: seq('4_BeHome%20Catalog', 'BeHomeCatalog', 5),
  },
  {
    id: 5,
    title: 'StudySync',
    cardTitle: 'StudySync',
    subtitle: 'Accessible, adaptable design that travels from state to state.',
    categories: ['Accessible Design', 'Brand Systems', 'Visual Design'],
    keywords: ['Accessible Design', 'Brand Systems', 'Visual Design', 'Sales & Marketing', 'Implementation'],
    info: 'Senior Designer / Imagine Learning / 2021–Present',
    description: 'StudySync is an ELA curriculum built around daily, text-based learning. I worked on visual design across product content, accessibility, and sales and marketing materials—especially for National 2027 and California 2028 editions. As a designer with both accessibility expertise and cross-functional knowledge, I bring accessibility solutions that go beyond design. I build reusable templates that scale to new state adoptions and customized state editions.',
    cover: `${base}images/Hero/Project_5.webp`,
    images: seq('5_StudySync', 'StudySync', 10, { 5: 'gif' }),
    isProtected: true,
  },
  {
    id: 6,
    title: 'Accessibility Across Brands',
    cardTitle: 'Accessibility Across Brands',
    subtitle: 'Making inclusion the standard across three curricula.',
    categories: ['Accessible Design', 'Visual Design'],
    keywords: ['Accessible Design', 'Visual Design', 'WCAG & PDF/UA'],
    info: 'Senior Designer & Accessibility Lead / Imagine Learning / 2023–Present',
    description: 'At Imagine Learning, I lead accessibility for StudySync, Traverse, and Dragonfly. As one of only a few designers with accessibility expertise, working with limited resources, I set strategy, consult, and guide the team and vendors through delivery. For complex layouts and content, I take projects on from start to finish, applying hands-on experience and testing. This work directly supports new adoptions and continuation of customer subscriptions in major states such as California, Florida, and Texas, where accessibility standards are higher.',
    cover: `${base}images/Hero/Project_6.webp`,
    images: seq('6_Accessibility%20Across%20Brands', 'Accessibility', 7),
  },
  {
    id: 7,
    title: 'Micuna Kitchen Toolkit',
    cardTitle: 'Micuna Kitchen Toolkit',
    subtitle: 'From a single logo to a full plant-based brand kit.',
    categories: ['Art Direction', 'Visual Design'],
    keywords: ['Art Direction', 'Visual Design', 'Print & Social Materials'],
    info: 'Freelance Designer / Micuna Kitchen / 2020',
    description: 'Micuna Kitchen serves vegan food in San Francisco. With only a logo to work from, I built its everyday brand materials, including business cards, menus, flyers, and social graphics, into one consistent system.',
    cover: `${base}images/Hero/Project_7.webp`,
    images: seq('7_Micuna%20Kitchen', 'MicunaKitchen', 6),
  },
  {
    id: 8,
    title: 'Burn A Light Social Media Campaign',
    cardTitle: 'Burn A Light Social Campaign',
    subtitle: 'Social storytelling that amplifies films with purpose.',
    categories: ['Art Direction', 'Visual Design'],
    keywords: ['Art Direction', 'Visual Design', 'Social Materials'],
    info: 'Freelance Designer & Creative Consultant / Burn A Light Production / 2023–2025',
    description: 'Burn A Light Production is a San Francisco social-impact studio founded by filmmaker Apo W. Bazidi. As designer and creative consultant, I shaped social campaigns that strengthened the brand and promoted its films.',
    cover: `${base}images/Hero/Project_8.webp`,
    images: seq('8_Burn%20A%20Light%20SocialMedia%20Campaign', 'BurnALight', 4),
  },
  {
    id: 9,
    title: 'Reimagining American Apparel',
    cardTitle: 'Reimagining American Apparel',
    subtitle: 'Reviving a fallen fashion icon for a new era.',
    categories: ['Art Direction', 'Brand Identity & Systems', 'Visual Design'],
    keywords: ['Art Direction', 'Brand Identity & Systems', 'Visual Design'],
    info: 'Academic Project / Academy of Art University (MA) / 2020',
    description: 'The brief for this academic project was to rebrand a declining company. Drawing on my love of fashion media, I reimagined American Apparel as American Industries: a new identity system that brings back the original brand’s spirit—bold and ethical.',
    cover: `${base}images/Hero/Project_9.webp`,
    images: seq('9_American%20Industries', 'American%20Industries', 11),
  },
];
