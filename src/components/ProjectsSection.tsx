import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';

type Project = {
  id: string;
  name: string;
  category: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
};

const PROJECTS: Project[] = [
  {
    id: '01',
    name: 'pendragon',
    category: 'Client',
    col1Img1: '/portfolio images/PR-1_COL1_IMG1.webp',
    col1Img2: '/portfolio images/PR-1_COL1_IMG2.webp',
    col2Img: '/portfolio images/PR-1_COL2.webp',
  },
  {
    id: '02',
    name: 'Anime Merch Store',
    category: 'Personal',
    col1Img1: '/portfolio images/PR-2_COL1_IMG1.webp',
    col1Img2: '/portfolio images/PR-2_COL1_IMG2.webp',
    col2Img: '/portfolio images/PR-2_COL2.webp',
  },
  {
    id: '03',
    name: 'Lunexis Studio',
    category: 'Personal',
    col1Img1: '/portfolio images/PR-3_COL1_IMG1.webp',
    col1Img2: '/portfolio images/PR-3_COL1_IMG2.webp',
    col2Img: '/portfolio images/PR-3_COL2.webp',
  },
  {
    id: '04',
    name: 'Personal Brand Website for a Gamer',
    category: 'Personal',
    col1Img1: '/portfolio images/PR-4_COL1_IMG1.webp',
    col1Img2: '/portfolio images/PR-4_COL1_IMG2.webp',
    col2Img: '/portfolio images/PR-4_COL2.webp',
  },
  {
    id: '05',
    name: 'BOOK HAVEN',
    category: 'Personal',
    col1Img1: '/portfolio images/PR-5_COL1_IMG1.webp',
    col1Img2: '/portfolio images/PR-5_COL1_IMG2.webp',
    col2Img: '/portfolio images/PR-5_COL2.webp',
  },
];

function ProjectImage({
  src,
  seed,
  className = '',
  style,
  eager = false,
}: {
  src: string;
  seed: string;
  className?: string;
  style?: React.CSSProperties;
  eager?: boolean;
}) {
  const [err, setErr] = useState(false);
  const fallback = `https://picsum.photos/seed/${seed}/800/600`;
  return (
    <div
      className={`overflow-hidden rounded-3xl sm:rounded-[50px] md:rounded-[60px] ${className}`}
      style={{ ...style, contentVisibility: 'auto' as const }}
    >
      <img
        src={err ? fallback : src}
        onError={() => setErr(true)}
        alt=""
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : 'low'}
        draggable={false}
        width={800}
        height={600}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </div>
  );
}

function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  // Stacking deck: each card pins and scales down as the next slides over
  // (same animation on all screens — svh keeps it framed under mobile
  // browser chrome).
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <motion.div
      ref={cardRef}
      style={
        {
          scale,
          zIndex: index + 1,
          transformOrigin: 'top center',
          '--stack-off': `${index * 28}px`,
        } as unknown as React.CSSProperties
      }
      // Pinned stacking card — slides under the next card while scaling
      // down slightly. svh (with vh fallback) keeps 85% sizing correct
      // under mobile browser chrome.
      className="stack-card sticky h-[85vh] supports-[height:100svh]:h-[85svh] w-full top-[calc(6rem_+_var(--stack-off))] md:top-[calc(8rem_+_var(--stack-off))] origin-top mb-2 sm:mb-0"
    >
      <div
        style={{ fontFamily: "'Kanit', sans-serif" }}
        className="group relative w-full rounded-3xl sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-white hover:shadow-[0_24px_90px_rgba(215,226,234,0.18)]"
      >
        {/* Top row — stacks on phones so the CTA never squeezes the title */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <span
              className="font-black leading-none text-[#D7E2EA] shrink-0 transition-colors duration-300 group-hover:text-white"
              style={{ fontSize: 'clamp(2.5rem, 14vw, 140px)' }}
            >
              {project.id}
            </span>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[#D7E2EA]/60 uppercase tracking-widest font-medium text-xs sm:text-sm">
                {project.category}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA] leading-tight text-balance break-words"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          <div className="shrink-0 self-start sm:self-auto">
            <LiveProjectButton />
          </div>
        </div>

        {/* Image grid: large preview full-width on top for phones,
            classic 40/60 split on sm+ */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-[40%_60%]">
          <div className="col-span-2 order-1 sm:order-2 sm:col-span-1">
            <ProjectImage
              src={project.col2Img}
              seed={`${project.id}-c`}
              eager={index === 0}
              className="proj-img-lg"
            />
          </div>
          <div className="col-span-2 order-2 sm:order-1 sm:col-span-1 grid grid-cols-2 gap-3 sm:gap-4 sm:flex sm:flex-col">
            <ProjectImage
              src={project.col1Img1}
              seed={`${project.id}-a`}
              eager={index === 0}
              className="proj-img-sm1"
            />
            <ProjectImage
              src={project.col1Img2}
              seed={`${project.id}-b`}
              eager={index === 0}
              className="proj-img-sm2"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const ProjectsSection: React.FC = () => {
  const total = PROJECTS.length;

  return (
    <section id="project" className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 pt-12 sm:pt-16 md:pt-20 pb-10 scroll-mt-20">
      <FadeIn className="text-center mb-8 sm:mb-10">
        <h2
          className="font-black uppercase leading-[0.95] tracking-tight text-white text-balance break-words"
          style={{ fontSize: 'clamp(2.75rem, 14vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      {/* Stacking deck on sm+ (sticky cards); plain vertical stack on phones
          where 85vh pinned cards clip under browser chrome. */}
      <div className="relative max-w-6xl mx-auto bg-[#0C0C0C] flex flex-col sm:block">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            total={total}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
