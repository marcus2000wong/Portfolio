export type ModalType = 'labs' | 'studio' | 'openings' | 'contact' | 'pitch' | null;

export type CategoryFilter = 'All' | 'UI/UX' | 'Printing' | 'Social Media' | 'Video';

export interface Project {
  id: string;
  title: string;
  category: CategoryFilter;
  subCategory?: string;
  description: string;
  tags: string[];
  image: string;
  hoverImage?: string;
  year: string;
  client?: string;
  featured?: boolean;
  gallery?: string[];
  liveUrl?: string;
}

export interface TimelineItem {
  id: string;
  type: 'experience' | 'education';
  title: string;
  organization: string;
  period: string;
  location?: string;
  description: string;
  highlights?: string[];
  tags: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number }[];
}

export interface Brand {
  id: string;
  name: string;
  category: string;
  logoText: string;
}
