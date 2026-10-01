export interface Project {
  id: number;
  slug: string;
  name: string;
  services: string;
  category: string;
  year: string;
  discipline: string;
  tools: string;
  industry: string;
  description: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'pandragon-internship',
    name: 'Pandragon',
    services: 'Fashion E-commerce Site · Internship 2026',
    category: 'Internship',
    year: '2026',
    discipline: 'Product Design',
    tools: 'Figma · Prototyping',
    industry: 'Fashion E-commerce',
    description:
      'Internship project — case study coming soon.',
  },
  {
    id: 2,
    slug: 'aniart',
    name: 'AniArt',
    services: 'Anime Merch Store · Personal Project 2025',
    category: 'Personal Project',
    year: '2025',
    discipline: 'UI/UX Design',
    tools: 'Figma · Design System',
    industry: 'E-Commerce',
    description:
      'Concept anime merch store — case study coming soon.',
  },
  {
    id: 3,
    slug: 'lunexis-studio',
    name: 'Lunexis Studio',
    services: 'Creative Studio Platform · Personal Project 2025',
    category: 'Personal Project',
    year: '2025',
    discipline: 'Product Design',
    tools: 'Figma · Prototyping',
    industry: 'Studio',
    description:
      'Concept studio platform for video editors — full case study live.',
  },
];
