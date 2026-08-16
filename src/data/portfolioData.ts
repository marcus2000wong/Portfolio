import { Brand, Experience, Project, SkillGroup, TimelineItem } from '../types';


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
    title: 'Elyze Web Design',
    category: 'UI/UX',
    subCategory: 'Design & Development',
    description:
      'A premium, technology-driven website designed for the medical aesthetics industry. The visual direction combines clean editorial layouts, modern typography, clinical information and high-impact imagery to create a sophisticated yet approachable digital experience.The website focuses on clear content hierarchy, responsive design and conversion-driven user journeys, presenting complex A.I. body-shaping technology in a simple and visually engaging way.',

    tags: ['Figma', 'Photoshop', 'HTML', 'CSS'],

    // Image shown BEFORE clicking the project
    image: '/cover/cover-01.jpg',

    // The image area BECOMES this iframe after clicking
    media: {
      type: 'iframe',
      src: 'https://www.elyze.com.hk/',
    },

    year: '2023',
    client: 'As One Interactive LTD',
    featured: true,
    liveUrl: 'https://www.elyze.com.hk/',
  },
  {
    id: '2',
    title: 'AsiaPac Website Revamp',
    category: 'UI/UX',
    subCategory: 'Design & Development',
    description:
      'A modern corporate website designed for a technology-driven digital marketing company. The visual direction combines structured layouts, bold typography and technology-focused graphics to communicate innovation, expertise and global capabilities. The website uses clear content hierarchy, service-focused navigation and case-study presentation to organize complex information while maintaining a professional and engaging digital experience.',

    tags: ['Figma', 'Photoshop', 'HTML', 'CSS', 'JS'],

    // Image shown BEFORE clicking the project
    image: '/cover/cover-02.jpg',

    // The image area BECOMES this iframe after clicking
    media: {
      type: 'iframe',
      src: 'https://www.asiapacdigital.com/',
    },

    year: '2026',
    client: 'AsiaPac Net Media Ltd',
    featured: true,
    liveUrl: 'https://www.asiapacdigital.com/',
  },
  {
    id: '3',
    title: 'ZA Bank Web Design',
    category: 'UI/UX',
    subCategory: 'Design & Development(Front End Only)',
    description:
      'A modern FinTech website designed for a digital-first banking experience. The visual direction combines bold branding, clean layouts and technology-focused visuals to create an approachable and innovative alternative to traditional banking. The website uses clear information hierarchy, product-focused sections and intuitive navigation to simplify complex financial services while maintaining a trustworthy and user-friendly digital experience.',

    tags: ['Figma', 'Photoshop', 'HTML', 'CSS', 'JS'],

    // Image shown BEFORE clicking the project
    image: '/cover/cover-03.jpg',

    // The image area BECOMES this iframe after clicking
    media: {
      type: 'image',
      src: '/portfolio/za.jpg',
    },

    year: '2026',
    client: 'AsiaPac Net Media Ltd',
    featured: true,
    liveUrl: 'https://bank.za.group/',
  },
  {
    id: '4',
    title: 'Friso Signature Web Design',
    category: 'UI/UX',
    subCategory: 'Design & Development',
    description:
      'A premium, science-led product website designed for the infant nutrition market. The visual direction combines sophisticated lifestyle imagery, clean layouts and educational content to create a trustworthy and reassuring brand experience.The website uses visual storytelling, structured product information and interactive content sections to communicate complex nutritional benefits in a clear, engaging and consumer-friendly way.',

    tags: ['Figma', 'Photoshop', 'HTML', 'CSS', 'JS'],

    // Image shown BEFORE clicking the project
    image: '/cover/cover-04.jpg',

    // The image area BECOMES this iframe after clicking
    media: {
      type: 'image',
      src: '/portfolio/friso.jpg',
    },

    year: '2023',
    client: 'AsiaPac Net Media Ltd',
    featured: true,
    liveUrl: 'https://www.friso.com.hk/friso-signature',
  },

  {
    id: '5',
    title: 'New User Benefits Web Design',
    category: 'UI/UX',
    subCategory: 'Design & Development',
    description:
      'A playful and conversion-focused e-commerce landing page designed to introduce new users to GL.iNet’s membership benefits. The visual direction combines bold typography, vibrant colours, playful graphics and product-focused layouts to create an energetic and approachable technology experience. The page uses step-by-step storytelling, promotional benefits and curated product recommendations to guide users from account creation to product discovery and purchase.',

    tags: ['Figma', 'Illustration', 'HTML', 'CSS', 'JS'],

    // Image shown BEFORE clicking the project
    image: '/cover/cover-05.jpg',

    // The image area BECOMES this iframe after clicking
    media: {
      type: 'image',
      src: '/portfolio/glinet-new-user-benefit.jpg',
    },

    year: '2024',
    client: 'GL.iNet Technology LTD',
    featured: true,
    liveUrl: 'https://www.gl-inet.com/en-de/pages/new-user-benefits?utm_source=google&utm_medium=cpc&utm_campaign=24114848821&utm_term=&gad_source=1&gad_campaignid=24114874927&gbraid=0AAAAA9rKFBZgD00GUP2TOPfj0iOOT7g31&gclid=Cj0KCQjwv4XUBhDBARIsAE6bQUSh7AUNgeUKWj8FXM4wz-Sj3LGoFy9l0vSafbpLLauYszflYRfaEJQaAps3EALw_wcB',
  },



  {
    id: '6',
    title: 'Flint 4 Web Design',
    category: 'UI/UX',
    subCategory: 'Design & Development',
    description:
      'A premium, technology-driven product website designed to showcase a high-performance Wi-Fi 7 router. The visual direction combines cinematic product imagery, dark futuristic interfaces and dynamic technical graphics to create a powerful flagship product experience. The website uses immersive product storytelling, feature-focused sections and technical visualisations to communicate complex networking technology in an engaging and accessible way, guiding users from product discovery through performance, security and detailed specifications.',

    tags: ['Figma', 'Photoshop', 'HTML', 'CSS', 'JS'],

    // Image shown BEFORE clicking the project
    image: '/cover/cover-06.jpg',

    // The image area BECOMES this iframe after clicking
    media: {
      type: 'image',
      src: '/portfolio/be1400.jpg',
    },

    year: '2024',
    client: 'GL.iNet Technology LTD',
    featured: true,
    liveUrl: 'https://www.gl-inet.com/products/gl-be14000',
  },
   {
    id: '7',
    title: 'RM10 Web Design',
    category: 'UI/UX',
    subCategory: 'Design & Development',
    description:
      'A modern minimalist technology aesthetic combining clean white space, bold typography and premium product imagery. Modular layouts, subtle colour accents and interface-focused visuals create a polished, professional and highly functional digital experience.',

    tags: ['Figma', 'Photoshop', 'HTML', 'CSS', 'JS'],

    // Image shown BEFORE clicking the project
    image: '/cover/cover-07.jpg',

    // The image area BECOMES this iframe after clicking
    media: {
      type: 'image',
      src: '/portfolio/rm10.jpg',
    },

    year: '2024',
    client: 'GL.iNet Technology LTD',
    featured: true,
    liveUrl: 'https://www.gl-inet.com/products/gl-rm10',
  },
  {
    id: '8',
    title: 'GL.iNet About Us Page',
    category: 'UI/UX',
    subCategory: 'Design & Development',
    description:
      'A modern corporate technology website combining minimalist layouts, clean typography and structured visual storytelling. The design uses generous white space, modular cards, brand-focused imagery and subtle colour accents to create a professional, trustworthy and contemporary brand experience. Company milestones, global presence, leadership and achievements are presented through engaging visual sections, transforming traditional corporate information into a clear and approachable digital story.',

    tags: ['Figma', 'Photoshop', 'HTML', 'CSS', 'JS'],

    // Image shown BEFORE clicking the project
    image: '/cover/cover-08.jpg',

    // The image area BECOMES this iframe after clicking
    media: {
      type: 'image',
      src: '/portfolio/about-us.jpg',
    },

    year: '2024',
    client: 'GL.iNet Technology LTD',
    featured: true,
    liveUrl: 'https://www.gl-inet.com/about-us',
  },
  {
    id: '9',
    title: 'Magiclean Web Design',
    category: 'UI/UX',
    subCategory: 'Design & Development',
    description:
      'A clean and approachable consumer-brand website designed for the household cleaning market. The visual direction combines bright layouts, lifestyle imagery, strong brand colours and product-focused graphics to create a friendly and trustworthy digital experience. The structured catalogue-style layout allows users to explore cleaning solutions by household area and product category, making a large product range simple, accessible and easy to navigate.',

    tags: ['Figma', 'Photoshop', 'HTML', 'CSS', 'JS'],

    // Image shown BEFORE clicking the project
    image: '/cover/cover-09.jpg',

    // The image area BECOMES this iframe after clicking
    media: {
      type: 'image',
      src: '/portfolio/magic-clean.jpg',
    },

    year: '2023',
    client: 'As One Interactive LTD',
    featured: true,
    liveUrl: 'https://web.kao.com/hk/magiclean/',
  },









  // Video Projects
  {
      id: '9',
      title: 'Magiclean Web Design',
      category: 'Video',
      subCategory: 'Design & Development',
      description:
        'A clean and approachable consumer-brand website designed for the household cleaning market. The visual direction combines bright layouts, lifestyle imagery, strong brand colours and product-focused graphics to create a friendly and trustworthy digital experience. The structured catalogue-style layout allows users to explore cleaning solutions by household area and product category, making a large product range simple, accessible and easy to navigate.',

      tags: ['Figma', 'Photoshop', 'HTML', 'CSS', 'JS'],

      // Image shown BEFORE clicking the project
      image: '/cover/cover-09.jpg',

      // The image area BECOMES this iframe after clicking
      media: {
        type: 'video',
        src: '/portfolio/1.mp4',
      },

      year: '2023',
      client: 'As One Interactive LTD',
      featured: true,
      liveUrl: 'https://web.kao.com/hk/magiclean/',
    },
   {
      id: '10',
      title: 'Magiclean Web Design',
      category: 'Video',
      subCategory: 'Design & Development',
      description:
        'A clean and approachable consumer-brand website designed for the household cleaning market. The visual direction combines bright layouts, lifestyle imagery, strong brand colours and product-focused graphics to create a friendly and trustworthy digital experience. The structured catalogue-style layout allows users to explore cleaning solutions by household area and product category, making a large product range simple, accessible and easy to navigate.',

      tags: ['Figma', 'Photoshop', 'HTML', 'CSS', 'JS'],

      // Image shown BEFORE clicking the project
      image: '/cover/cover-09.jpg',

      // The image area BECOMES this iframe after clicking
      media: {
        type: 'video',
        src: '/portfolio/2.mp4',
      },

      year: '2023',
      client: 'As One Interactive LTD',
      featured: true,
      liveUrl: 'https://web.kao.com/hk/magiclean/',
    },
    {
      id: '11',
      title: 'Magiclean Web Design',
      category: 'Video',
      subCategory: 'Design & Development',
      description:
        'A clean and approachable consumer-brand website designed for the household cleaning market. The visual direction combines bright layouts, lifestyle imagery, strong brand colours and product-focused graphics to create a friendly and trustworthy digital experience. The structured catalogue-style layout allows users to explore cleaning solutions by household area and product category, making a large product range simple, accessible and easy to navigate.',

      tags: ['Figma', 'Photoshop', 'HTML', 'CSS', 'JS'],

      // Image shown BEFORE clicking the project
      image: '/cover/cover-09.jpg',

      // The image area BECOMES this iframe after clicking
      media: {
        type: 'video',
        src: '/portfolio/3.mp4',
      },

      year: '2023',
      client: 'As One Interactive LTD',
      featured: true,
      liveUrl: 'https://web.kao.com/hk/magiclean/',
    },
    {
      id: '12',
      title: 'Magiclean Web Design',
      category: 'Video',
      subCategory: 'Design & Development',
      description:
        'A clean and approachable consumer-brand website designed for the household cleaning market. The visual direction combines bright layouts, lifestyle imagery, strong brand colours and product-focused graphics to create a friendly and trustworthy digital experience. The structured catalogue-style layout allows users to explore cleaning solutions by household area and product category, making a large product range simple, accessible and easy to navigate.',

      tags: ['Figma', 'Photoshop', 'HTML', 'CSS', 'JS'],

      // Image shown BEFORE clicking the project
      image: '/cover/cover-09.jpg',

      // The image area BECOMES this iframe after clicking
      media: {
        type: 'video',
        src: '/portfolio/4.mp4',
      },

      year: '2023',
      client: 'As One Interactive LTD',
      featured: true,
      liveUrl: 'https://web.kao.com/hk/magiclean/',
    },
    {
      id: '13',
      title: 'Magiclean Web Design',
      category: 'Video',
      subCategory: 'Design & Development',
      description:
        'A clean and approachable consumer-brand website designed for the household cleaning market. The visual direction combines bright layouts, lifestyle imagery, strong brand colours and product-focused graphics to create a friendly and trustworthy digital experience. The structured catalogue-style layout allows users to explore cleaning solutions by household area and product category, making a large product range simple, accessible and easy to navigate.',

      tags: ['Figma', 'Photoshop', 'HTML', 'CSS', 'JS'],

      // Image shown BEFORE clicking the project
      image: '/cover/cover-09.jpg',

      // The image area BECOMES this iframe after clicking
      media: {
        type: 'video',
        src: '/portfolio/5.mp4',
      },

      year: '2023',
      client: 'As One Interactive LTD',
      featured: true,
      liveUrl: 'https://web.kao.com/hk/magiclean/',
    },
    {
      id: '14',
      title: 'Magiclean Web Design',
      category: 'Video',
      subCategory: 'Design & Development',
      description:
        'A clean and approachable consumer-brand website designed for the household cleaning market. The visual direction combines bright layouts, lifestyle imagery, strong brand colours and product-focused graphics to create a friendly and trustworthy digital experience. The structured catalogue-style layout allows users to explore cleaning solutions by household area and product category, making a large product range simple, accessible and easy to navigate.',

      tags: ['Figma', 'Photoshop', 'HTML', 'CSS', 'JS'],

      // Image shown BEFORE clicking the project
      image: '/cover/cover-09.jpg',

      // The image area BECOMES this iframe after clicking
      media: {
        type: 'video',
        src: '/portfolio/6.mp4',
      },

      year: '2023',
      client: 'As One Interactive LTD',
      featured: true,
      liveUrl: 'https://web.kao.com/hk/magiclean/',
    },
    {
      id: '15',
      title: 'Magiclean Web Design',
      category: 'Videos',
      subCategory: 'Design & Development',
      description:
        'A clean and approachable consumer-brand website designed for the household cleaning market. The visual direction combines bright layouts, lifestyle imagery, strong brand colours and product-focused graphics to create a friendly and trustworthy digital experience. The structured catalogue-style layout allows users to explore cleaning solutions by household area and product category, making a large product range simple, accessible and easy to navigate.',

      tags: ['Figma', 'Photoshop', 'HTML', 'CSS', 'JS'],

      // Image shown BEFORE clicking the project
      image: '/cover/cover-09.jpg',

      // The image area BECOMES this iframe after clicking
      media: {
        type: 'video',
        src: '/portfolio/7.mp4',
      },

      year: '2023',
      client: 'As One Interactive LTD',
      featured: true,
      liveUrl: 'https://web.kao.com/hk/magiclean/',
    },






  


  // Printing Projects
  {
    id: '10',
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
    id: '11',
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
    id: '12',
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
    id: '13',
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
    logo: '/logo/logo-01.png',
  },
  {
    id: 'b2',
    name: 'GL.iNet Technology',
    category: 'Smart Home & IoT Networking',
    logo: '/logo/logo-02.png',
  },
  {
    id: 'b3',
    name: 'As One Interactive',
    category: 'F&B & Beauty Marketing',
    logo: '/logo/logo-03.png',
  },
  {
    id: 'b4',
    name: 'Coventry University',
    category: 'Higher Education (UK)',
    logo: '/logo/logo-04.png',
  },
  {
    id: 'b5',
    name: 'Mainframe® Labs',
    category: 'Creative Tech & AI Architecture',
    logo: '/logo/logo-05.png',
  },
  {
    id: 'b6',
    name: 'F&B Enterprise Clients',
    category: 'Dining & Hospitality Brands',
    logo: '/logo/logo-06.png',
  },
  {
    id: 'b7',
    name: 'Beauty & Skincare Brands',
    category: 'Lifestyle & Cosmetics',
    logo: '/logo/logo-07.png',
  },
  {
    id: 'b8',
    name: 'Shebbear College',
    category: 'UK Academy',
    logo: '/logo/logo-08.png',
  },
];