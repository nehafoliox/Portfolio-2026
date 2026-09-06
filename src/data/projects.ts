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
    slug: 'cozzon-ecommerce',
    name: 'Cozzon',
    services: 'UI/UX Design · Design System · Mobile & Web',
    category: 'E-Commerce',
    year: '2026',
    discipline: 'UI/UX Design',
    tools: 'Figma · Prototyping',
    industry: 'Fashion & Retail',
    description:
      'Complete fashion e-commerce experience from scratch with 30+ screens and 100+ scalable design system components.',
  },
  {
    id: 2,
    slug: 'grotho-web-app',
    name: 'Grotho',
    services: 'Frontend Development · UI Design · Design System',
    category: 'Web Application',
    year: '2024',
    discipline: 'UI/UX & Frontend',
    tools: 'Figma · React · Tailwind CSS',
    industry: 'Technology',
    description:
      'Responsive websites and interactive components engineered for high performance and clean usability.',
  },
  {
    id: 3,
    slug: 'finflow-banking',
    name: 'FinFlow',
    services: 'Mobile App UI · Design System · Prototyping',
    category: 'Mobile App',
    year: '2024',
    discipline: 'Product Design',
    tools: 'Figma · Principle',
    industry: 'FinTech',
    description:
      'Next-generation banking experience with intuitive gesture navigation and elegant data visualization.',
  },
  {
    id: 4,
    slug: 'pulse-health-dashboard',
    name: 'Pulse',
    services: 'Dashboard Design · Data Viz · UX Research',
    category: 'SaaS Platform',
    year: '2023',
    discipline: 'UX/UI Design',
    tools: 'Figma · Design Systems',
    industry: 'Healthcare',
    description:
      'Priority-based analytics dashboard optimizing patient telemetry and clinical insights at a glance.',
  },
];
