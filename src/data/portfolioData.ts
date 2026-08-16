import { Brand, Experience, Project, SkillGroup, TimelineItem } from '../types';
import { ModalType } from '../types';
export const MARCUS_PROFILE = {
  name: 'Marcus Wong',
  title: 'Multimedia Designer & Creative Developer',
  agency: 'Mainframe®',
  phone: '+852 64296249',
  email: 'marcus2000wong@yahoo.com',
  agencyEmail: 'hello@mainframe.co',
  location: 'Hong Kong / UK',
  behance: 'https://www.behance.net/marcuswong14',
  summary:
    'As a multimedia designer, I specialize in crafting visually engaging digital experiences—spanning web design, social media content, video production, and AI-driven creative workflows. With a keen eye for aesthetics and user-centric principles, I develop responsive websites, intuitive interfaces, dynamic videos, and social media campaigns that align with brand identities and drive audience engagement.',
  education: [
    {
      institution: 'Coventry University (UK)',
      degree: 'Graphic Design Degree',
      period: '2021 - 2023',
    },
    {
      institution: 'Shebbear College (UK)',
      degree: 'Secondary School (UK)',
      period: '2018 - 2020',
    },
  ],
};

export const PROJECTS: Project[] = [
  // UI/UX Projects
  {
    id: '1',
    title: 'HeartX®',
    category: 'UI/UX',
    subCategory: 'Brand Strategy & Product Design',
    description:
      'Designing and launching custom websites from the ground up for corporate, F&B, and education enterprise clients. Built with user-centric responsive layouts, polished interaction design, and high-performance frontend architecture.',
    tags: ['Figma', 'UI/UX', 'HTML/CSS/JS', 'Tailwind CSS', 'Responsive Web'],
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    year: '2026',
    client: 'AsiaPac Net Media Ltd',
    featured: true,
  },
  {
    id: '2',
    title: 'Swave®',
    category: 'UI/UX',
    subCategory: 'Web Design & Identity',
    description:
      'End-to-end UI/UX design and Bootstrap web architecture for smart home routers and IoT ecosystem. Created intuitive navigation systems, product configurators, and conversion-optimized checkout funnels.',
    tags: ['Figma', 'Bootstrap', 'Adobe XD', 'User Research', 'E-commerce'],
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    year: '2025',
    client: 'GL.iNet Technology LTD',
    featured: true,
  },
  {
    id: '3',
    title: 'Greenergy®',
    category: 'UI/UX',
    subCategory: 'Brand Strategy & Web Design',
    description:
      'Experimental dark-mode adaptive agency portal featuring mouse-driven video scrubbing, fluid micro-interactions, and conversational prompt design.',
    tags: ['React', 'TypeScript', 'Tailwind', 'AI Prompting', 'Figma'],
    image:
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    year: '2024',
    client: 'Mainframe® Labs',
  },
  {
    id: '10',
    title: 'Helix Gallery',
    category: 'UI/UX',
    subCategory: 'Interactive 3D Web Experience',
    description:
      'A continuous Three.js image gallery built as a curved 3D helix. The experience combines cylindrical mesh deformation, pointer-responsive camera movement, drag interaction, and wheel-driven momentum in a seamless looping showcase.',
    tags: ['Three.js', 'React', 'WebGL', '3D Interaction', 'Creative Development'],
    image: '/project-assets/helix-gallery-cover.jpg',
    hoverImage: '/project-assets/helix-gallery-hover.jpg',
    year: '2026',
    client: 'Marcus Wong — Experimental Web',
    featured: true,
    liveUrl: 'http://localhost:4186/',
  },

  // Printing Projects
  {
    id: '4',
    title: 'Lumina Editorial',
    category: 'Printing',
    subCategory: 'Print Production & Editorial Design',
    description:
      'Crafted high-end print collateral, restaurant menus, product box packaging, and promotional brochures. Managed color calibration, press-ready prepress files, and specialty foil finishing.',
    tags: ['Illustrator', 'InDesign', 'Photoshop', 'Print Production', 'Packaging'],
    image:
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80',
    year: '2023',
    client: 'As One Interactive LTD',
    featured: true,
  },
  {
    id: '5',
    title: 'AeroTech Expo',
    category: 'Printing',
    subCategory: 'Large Format & Trade Show Collateral',
    description:
      'Designed booth backdrops, large-format event banners, tech spec sheets, and physical product packaging for international hardware expos.',
    tags: ['Illustrator', 'Photoshop', 'Prepress', 'Large Format', 'Brand Guidelines'],
    image:
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1000&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
    year: '2024',
    client: 'GL.iNet Technology LTD',
  },

  // Social Media Projects
  {
    id: '6',
    title: 'Verve Studio',
    category: 'Social Media',
    subCategory: 'Social Strategy & Visual Identity',
    description:
      'Managing visual identities and multi-platform content creation for F&B and education clients. Developed cohesive grid layouts, reel templates, and campaign key visuals driving high engagement.',
    tags: ['Photoshop', 'Midjourney', 'Content Strategy', 'Social Banners', 'Canva'],
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    year: '2025',
    client: 'AsiaPac Net Media Ltd',
    featured: true,
  },
  {
    id: '7',
    title: 'Aura Glow',
    category: 'Social Media',
    subCategory: 'Visual Content & Creative Strategy',
    description:
      'Strategic social media campaign for F&B and skincare brands. Delivered aesthetic product photography compositions, ad creatives, and viral social stories.',
    tags: ['Midjourney', 'Photoshop', 'Social Ads', 'Copywriting', 'Brand Identity'],
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    year: '2023',
    client: 'As One Interactive LTD',
  },

  // Video Projects
  {
    id: '8',
    title: 'Kinetix 3D',
    category: 'Video',
    subCategory: '3D Motion Graphics & Commercials',
    description:
      'High-impact 3D product rendering, video editing, and motion graphics explaining complex networking hardware in compelling 30-second commercial spots.',
    tags: ['Blender', 'Keyshot', 'After Effects', 'Premiere Pro', 'Motion Design'],
    image:
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
    year: '2024',
    client: 'GL.iNet Technology LTD',
    featured: true,
  },
  {
    id: '9',
    title: 'CineCraft',
    category: 'Video',
    subCategory: 'Video Editing & Visual FX',
    description:
      'Full video production pipeline including storyboarding, footage editing, color grading, and sound design for corporate portfolio showcases and promotional reels.',
    tags: ['Premiere Pro', 'After Effects', 'Color Grading', 'Sound Design'],
    image:
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1000&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80',
    year: '2025',
    client: 'AsiaPac Net Media Ltd',
  },
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 't1',
    type: 'experience',
    title: 'Multimedia Designer',
    organization: 'AsiaPac Net Media Ltd',
    period: '2025/08 – Present',
    location: 'Hong Kong',
    description:
      'Managing social media and visual identities for F&B and education clients while designing and launching custom websites from the ground up. Handling the ongoing design, optimization, and maintenance of our corporate website portfolio.',
    highlights: [
      'Built and deployed responsive custom websites from scratch',
      'Managed visual branding & social media campaigns for F&B and education sector',
      'Leveraged AI-driven creative tools to accelerate video & graphics output',
    ],
    tags: ['Web Design', 'Social Strategy', 'Figma', 'Visual Identity', 'AI Workflows'],
  },
  {
    id: 't2',
    type: 'experience',
    title: 'Multimedia Designer',
    organization: 'GL.iNet Technology LTD',
    period: '2023/07 – 2025/07',
    location: 'Hong Kong',
    description:
      'E-commerce and social media specialist skilled in Bootstrap web design, high-impact motion graphics, and branding for smart home tech. Translated complex technical specs into clear, converting visual narratives.',
    highlights: [
      'Designed e-commerce UI/UX and web templates with Bootstrap',
      'Created 3D motion graphics and product renders using Blender & Keyshot',
      'Produced digital ad campaigns and print collateral for international expos',
    ],
    tags: ['Bootstrap', 'Motion Graphics', 'Blender', 'Keyshot', 'E-commerce'],
  },
  {
    id: 't3',
    type: 'experience',
    title: 'Graphic Designer',
    organization: 'As One Interactive LTD',
    period: '2023/01 – 2023/07',
    location: 'Hong Kong',
    description:
      'Hybrid digital specialist combining social media strategy and content creation for F&B and beauty brands with end-to-end UI/UX design and responsive web development.',
    highlights: [
      'Executed social strategy and content calendars for top beauty and F&B brands',
      'Designed end-to-end UI/UX wireframes and high-fidelity mockups',
      'Created print marketing packages, packaging, and digital ads',
    ],
    tags: ['UI/UX Design', 'Branding', 'Social Strategy', 'Print Production'],
  },
  {
    id: 't4',
    type: 'education',
    title: 'Graphic Design Degree (BA Hons)',
    organization: 'Coventry University',
    period: '2021 – 2023',
    location: 'United Kingdom',
    description:
      'Focused on typography, digital media, user interface design, visual identity systems, and multi-platform communication design.',
    highlights: [
      'Graduated with honors in Graphic Design',
      'Specialized in digital media interaction & brand communication',
      'Developed foundational mastery in Adobe Creative Cloud & web design',
    ],
    tags: ['Degree', 'Graphic Design', 'UK Higher Ed', 'Typography', 'UI/UX'],
  },
  {
    id: 't5',
    type: 'education',
    title: 'Secondary Education (A-Levels / GCSEs)',
    organization: 'Shebbear College',
    period: '2018 – 2020',
    location: 'United Kingdom',
    description:
      'Completed secondary education in the UK, specializing in Art & Design, Media Studies, and Information Technology.',
    highlights: [
      'Built early foundations in fine art, digital media, and computer graphics',
      'Active participation in creative arts and design exhibitions',
    ],
    tags: ['Secondary School', 'United Kingdom', 'Art & Design', 'IT'],
  },
];

export const EXPERIENCES: Experience[] = TIMELINE_ITEMS.filter(
  (t) => t.type === 'experience'
).map((t) => ({
  company: t.organization,
  role: t.title,
  period: t.period,
  description: t.description,
  tags: t.tags,
}));

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'UI/UX & Web Design',
    skills: [
      { name: 'Figma', level: 95 },
      { name: 'Adobe XD', level: 90 },
      { name: 'HTML5 / CSS3', level: 95 },
      { name: 'Tailwind / Bootstrap', level: 92 },
      { name: 'JavaScript / TypeScript', level: 88 },
    ],
  },
  {
    category: '3D & Motion Video',
    skills: [
      { name: 'Blender / Keyshot', level: 88 },
      { name: 'After Effects', level: 90 },
      { name: 'Premiere Pro', level: 92 },
      { name: 'Spline 3D', level: 85 },
    ],
  },
  {
    category: 'Graphic & Print Production',
    skills: [
      { name: 'Photoshop', level: 95 },
      { name: 'Illustrator', level: 92 },
      { name: 'InDesign & Prepress', level: 88 },
      { name: 'Brand Identity', level: 92 },
    ],
  },
  {
    category: 'Social & AI Workflows',
    skills: [
      { name: 'Midjourney AI', level: 92 },
      { name: 'Social Content Strategy', level: 90 },
      { name: 'AI Creative Automation', level: 90 },
      { name: 'VS Code Workflow', level: 95 },
    ],
  },
];


export const BRANDS: Brand[] = [
  {
    id: 'b1',
    name: 'AsiaPac Net Media',
    category: 'Digital Agency / Corporate',
    logo: './public/logo/logo-01.png',
  },
  {
    id: 'b2',
    name: 'GL.iNet Technology',
    category: 'Smart Home & IoT Networking',
    logo: './public/logo/logo-02.png',
  },
  {
    id: 'b3',
    name: 'As One Interactive',
    category: 'F&B & Beauty Marketing',
    logo: './public/logo/logo-03.png',
  },
  {
    id: 'b4',
    name: 'Coventry University',
    category: 'Higher Education (UK)',
    logo: './public/logo/logo-04.png',
  },
  {
    id: 'b5',
    name: 'Mainframe® Labs',
    category: 'Creative Tech & AI Architecture',
    logo: './public/logo/logo-05.png',
  },
  {
    id: 'b6',
    name: 'F&B Enterprise Clients',
    category: 'Dining & Hospitality Brands',
    logo: './public/logo/logo-06.png',
  },
  {
    id: 'b7',
    name: 'Beauty & Skincare Brands',
    category: 'Lifestyle & Cosmetics',
    logo: './public/logo/logo-07.png',
  },
  {
    id: 'b8',
    name: 'Shebbear College',
    category: 'UK Academy',
    logo: './public/logo/logo-08.png',
  },
];