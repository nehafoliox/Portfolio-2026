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
  previewImage: string;
  featured: boolean;
  description: string;
  challenge: string;
  solution: string;
  process: string[];
  results: string[];
  gallery: string[];
  nextProject?: string;
  prevProject?: string;
  externalUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "finflow-banking-app",
    name: "FinFlow",
    services: "UI Design · Prototyping · Design System",
    category: "Mobile App",
    year: "2024",
    discipline: "Product Design",
    tools: "Figma · Principle",
    industry: "FinTech",
    previewImage: "/images/project-1.jpg",
    featured: true,
    description:
      "A next-gen mobile banking app designed to simplify complex financial tasks for Gen Z users. Clean visual hierarchy meets powerful functionality.",
    challenge:
      "Traditional banking apps overwhelm younger users with dense information architecture and legacy UI patterns that feel dated and intimidating.",
    solution:
      "Created a gesture-driven interface with progressive disclosure, ensuring complex features like investment tracking and budgeting feel intuitive without sacrificing depth.",
    process: [
      "User research & competitive analysis",
      "Information architecture mapping",
      "Low-fi wireframes & user flows",
      "High-fidelity UI design in Figma",
      "Interactive prototyping in Principle",
      "Usability testing with 25 participants",
      "Design system documentation",
    ],
    results: [
      "40% reduction in task completion time",
      "92% user satisfaction score in testing",
      "Design system with 120+ components",
    ],
    gallery: [
      "/images/project-1-gallery-1.jpg",
      "/images/project-1-gallery-2.jpg",
      "/images/project-1-gallery-3.jpg",
    ],
  },
  {
    id: 2,
    slug: "artisan-ecommerce",
    name: "Artisan",
    services: "Web Design · Branding · Motion",
    category: "E-Commerce",
    year: "2024",
    discipline: "Brand & Web Design",
    tools: "Figma · After Effects",
    industry: "Retail",
    previewImage: "/images/project-2.jpg",
    featured: false,
    description:
      "A premium e-commerce platform for handcrafted goods, blending editorial aesthetics with seamless shopping UX.",
    challenge:
      "Artisan makers needed a digital storefront that conveyed the craft and quality of handmade products without feeling like a generic marketplace.",
    solution:
      "Designed an editorial-style layout with rich photography, story-driven product pages, and a checkout flow that feels as curated as the products themselves.",
    process: [
      "Brand identity & moodboard creation",
      "Competitor & market research",
      "Wireframing & user journey mapping",
      "Visual design with micro-interactions",
      "Motion design for page transitions",
      "Responsive design across breakpoints",
    ],
    results: [
      "3x increase in average session duration",
      "28% boost in conversion rate",
      "Featured on Awwwards Honorable Mention",
    ],
    gallery: [
      "/images/project-2-gallery-1.jpg",
      "/images/project-2-gallery-2.jpg",
      "/images/project-2-gallery-3.jpg",
    ],
  },
  {
    id: 3,
    slug: "pulse-health-dashboard",
    name: "Pulse",
    services: "Dashboard Design · Data Viz · UX Research",
    category: "SaaS",
    year: "2023",
    discipline: "UX/UI Design",
    tools: "Figma · D3.js Prototypes",
    industry: "Healthcare",
    previewImage: "/images/project-3.jpg",
    featured: false,
    description:
      "An analytics dashboard for healthcare professionals to monitor patient vitals and trends with clarity and speed.",
    challenge:
      "Doctors and nurses needed to interpret complex medical data at a glance during high-pressure situations, but existing tools were cluttered and slow.",
    solution:
      "Developed a dashboard with a priority-based information hierarchy, real-time data visualization, and customizable alert thresholds — all optimized for speed and scannability.",
    process: [
      "Contextual inquiry with 15 clinicians",
      "Task analysis & workflow mapping",
      "Data visualization exploration",
      "Iterative prototyping & testing",
      "Accessibility audit (WCAG 2.1 AA)",
      "Design handoff with engineering",
    ],
    results: [
      "60% faster critical data identification",
      "Used across 12 hospital networks",
      "WCAG 2.1 AA compliant",
    ],
    gallery: [
      "/images/project-3-gallery-1.jpg",
      "/images/project-3-gallery-2.jpg",
      "/images/project-3-gallery-3.jpg",
    ],
  },
  {
    id: 4,
    slug: "nomad-travel-platform",
    name: "Nomad",
    services: "Product Design · Interaction Design",
    category: "Platform",
    year: "2023",
    discipline: "Product Design",
    tools: "Figma · Framer",
    industry: "Travel",
    previewImage: "/images/project-4.jpg",
    featured: false,
    description:
      "A travel planning platform that turns trip research into a visual, collaborative experience — Pinterest meets Google Maps for wanderers.",
    challenge:
      "Trip planning is fragmented across dozens of tabs, apps, and spreadsheets. Travelers needed a single space to dream, plan, and book together.",
    solution:
      "Built a spatial interface where users can pin destinations on a visual map, create mood boards for trips, collaborate with friends in real-time, and seamlessly transition from inspiration to booking.",
    process: [
      "Discovery workshops with frequent travelers",
      "Concept ideation & storyboarding",
      "Spatial UI pattern exploration",
      "Collaborative feature prototyping",
      "Beta testing with 200 users",
      "Iteration based on feedback data",
    ],
    results: [
      "85% of beta users replaced their existing planning tools",
      "4.8/5 average user rating",
      "Featured on Product Hunt (#3 of the day)",
    ],
    gallery: [
      "/images/project-4-gallery-1.jpg",
      "/images/project-4-gallery-2.jpg",
      "/images/project-4-gallery-3.jpg",
    ],
  },
  {
    id: 5,
    slug: "echo-music-app",
    name: "Echo",
    services: "UI Design · Motion Design · Branding",
    category: "Mobile App",
    year: "2022",
    discipline: "Visual Design",
    tools: "Figma · After Effects · Lottie",
    industry: "Entertainment",
    previewImage: "/images/project-5.jpg",
    featured: false,
    description:
      "A music streaming app concept with an immersive, album-art-driven UI and fluid motion design that makes listening feel cinematic.",
    challenge:
      "Music apps had converged on near-identical interfaces — playlists, grids, tiny album art. There was an opportunity to reimagine what a music player could feel like.",
    solution:
      "Designed a full-bleed, album-art-centric interface with fluid transitions between tracks, ambient color extraction from cover art, and gestural playback controls.",
    process: [
      "Visual research & art direction",
      "Motion language development",
      "High-fidelity screen design",
      "Micro-interaction animation in After Effects",
      "Lottie export for dev handoff",
      "User testing with music enthusiasts",
    ],
    results: [
      "500K+ Dribbble impressions",
      "Concept acquired by a music startup",
      "Featured in Muzli Weekly Digest",
    ],
    gallery: [
      "/images/project-5-gallery-1.jpg",
      "/images/project-5-gallery-2.jpg",
      "/images/project-5-gallery-3.jpg",
    ],
  },
];

// Helper to get a project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

// Helper to get adjacent projects for navigation
export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? projects[index - 1] : projects[projects.length - 1],
    next: index < projects.length - 1 ? projects[index + 1] : projects[0],
  };
}
