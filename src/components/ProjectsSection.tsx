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
    col1Img1: '/portfolio images/PR-1_COL1_IMG1.png',
    col1Img2: '/portfolio images/PR-1_COL1_IMG2.png',
    col2Img: '/portfolio images/PR-1_COL2.png',
  },
  {
    id: '02',
    name: 'Anime Merch Store',
    category: 'Personal',
    col1Img1: '/portfolio images/PR-2_COL1_IMG1.png',
    col1Img2: '/portfolio images/PR-2_COL1_IMG2.png',
    col2Img: '/portfolio images/PR-2_COL2.png',
  },
  {
    id: '03',
    name: 'Lunexis Studio',
    category: 'Personal',
    col1Img1: '/portfolio images/PR-3_COL1_IMG1.png',
    // NOTE: actual file on disk is .jpg (PR-3_COL1_IMG2.png does not exist)
    col1Img2: '/portfolio images/PR-3_COL1_IMG2.jpg',
    col2Img: '/portfolio images/PR-3_COL2.png',
  },
  {
    id: '04',
    name: 'Personal Brand Website for a Gamer',
    category: 'Personal',
    col1Img1: '/portfolio images/PR-4_COL1_IMG1.png',
    col1Img2: '/portfolio images/PR-4_COL1_IMG2.png',
    col2Img: '/portfolio images/PR-4_COL2.png',
  },
  {
    id: '05',
    name: 'BOOK HAVEN',
    category: 'Personal',
    col1Img1: '/portfolio images/PR-5_COL1_IMG1.png',
    col1Img2: '/portfolio images/PR-5_COL1_IMG2.png',
    col2Img: '/portfolio images/PR-5_COL2.png',
  },
];

function ProjectImage({
  src,
  seed,
  className = '',
  style,
}: {
  src: string;
  seed: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [err, setErr] = useState(false);
  const fallback = `https://picsum.photos/seed/${seed}/800/600`;
  return (
    <div
      className={`overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] ${className}`}
      style={style}
    >
      <img
        src={err ? fallback : src}
        onError={() => setErr(true)}
        alt=""
        loading="lazy"
        draggable={false}
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
      className="sticky h-[85vh] w-full top-[calc(6rem_+_var(--stack-off))] md:top-[calc(8rem_+_var(--stack-off))] origin-top"
    >
      <div
        style={{ fontFamily: "'Kanit', sans-serif" }}
        className="group relative w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-white hover:shadow-[0_24px_90px_rgba(215,226,234,0.18)]"
      >
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            <span
              className="font-black leading-none text-[#D7E2EA] shrink-0 transition-colors duration-300 group-hover:text-white"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {project.id}
            </span>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[#D7E2EA]/60 uppercase tracking-widest font-medium text-xs sm:text-sm">
                {project.category}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA] leading-tight"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton />
        </div>

        {/* Bottom row: image grid 40% / 60% */}
        <div
          className="grid gap-3 sm:gap-4"
          style={{ gridTemplateColumns: '40% 60%' }}
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            <ProjectImage
              src={project.col1Img1}
              seed={`${project.id}-a`}
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <ProjectImage
              src={project.col1Img2}
              seed={`${project.id}-b`}
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>
          <div>
            <ProjectImage
              src={project.col2Img}
              seed={`${project.id}-c`}
              className="h-full min-h-full"
              style={{
                height:
                  'calc(clamp(130px, 16vw, 230px) + clamp(160px, 22vw, 340px) + 12px)',
                minHeight: '100%',
              }}
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
    <section id="project" className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 pt-12 sm:pt-16 md:pt-20 pb-10">
      <FadeIn className="text-center mb-8 sm:mb-10">
        <h2
          className="font-black uppercase leading-none tracking-tight text-white"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      {/* Single tall stacking container (~5 x 85vh of scrollable height).
          No fixed height, no overflow clipping — sticky cards need both. */}
      <div className="relative max-w-6xl mx-auto bg-[#0C0C0C]">
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
