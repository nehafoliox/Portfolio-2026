import React, { useState } from 'react';
import { FadeIn } from './FadeIn';

type WorkProject = {
  slug: string;
  title: string;
  meta: string;
  image: string;
  aspect: string;
};

const WORK_PROJECTS: WorkProject[] = [
  {
    slug: 'pandragon-internship',
    title: 'Pandragon',
    meta: 'Fashion E-commerce Site • Internship 2026',
    image: '/portfolio images/PR-1_COL2.webp',
    aspect: 'aspect-[16/9]',
  },
  {
    slug: 'aniart',
    title: 'AniArt',
    meta: 'Anime Merch Store • Personal Project 2025',
    image: '/portfolio images/PR-2_COL2.webp',
    aspect: 'aspect-[8/5]',
  },
  {
    slug: 'lunexis-studio',
    title: 'Lunexis Studio',
    meta: 'Creative Studio Platform • Personal Project 2025',
    image: '/Lunexis/hero.webp',
    aspect: 'aspect-[10/7]',
  },
];

function WorkCard({ project, onOpen }: { project: WorkProject; onOpen?: () => void }) {
  const [err, setErr] = useState(false);
  return (
    <article
      id={project.slug}
      data-cursor="view-case-study"
      onClick={onOpen}
      onKeyDown={
        onOpen
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpen();
              }
            }
          : undefined
      }
      tabIndex={onOpen ? 0 : undefined}
      role={onOpen ? 'link' : undefined}
      aria-label={onOpen ? `View ${project.title} case study` : undefined}
      className="group block transition-all duration-300 ease-in-out cursor-pointer"
    >
      <div className="flex flex-col gap-2">
        <div
          className={`relative w-full ${project.aspect} rounded-none border-0 overflow-hidden box-border transition-all duration-300 ease-in-out`}
        >
          <div className="relative w-full h-full overflow-hidden" role="img" aria-label={project.title}>
            {project.slug === 'pandragon-internship' ? (
              <video
                src="/pandragon/pandragon-card.mp4"
                poster={project.image}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                tabIndex={-1}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            ) : project.slug === 'aniart' ? (
              <video
                src="/AniArt/aniart-card.mp4"
                poster="/AniArt/hero.webp"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                tabIndex={-1}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            ) : project.slug === 'lunexis-studio' ? (
              <video
                src="/Lunexis/lunexis-card.mp4"
                poster="/Lunexis/hero.webp"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                tabIndex={-1}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            ) : project.image !== '' && !err ? (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                draggable={false}
                onError={() => setErr(true)}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            ) : project.image !== '' ? (
              <div className="h-full w-full bg-white/5" aria-hidden="true" />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-[#141414]" aria-hidden="true">
                <span
                  className="rachel-serif italic text-white/80 transition-transform duration-500 ease-out group-hover:scale-110"
                  style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1 }}
                >
                  {project.title.charAt(0)}
                </span>
              </div>
            )}
          </div>
          {/* Rachel hover overlay */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 ease-in-out group-hover:bg-black/40" />
        </div>
        <div className="flex flex-col justify-between gap-0.5 mt-1 transition-colors duration-300 ease-in-out lg:flex-row">
          <h3
            className="rachel-serif text-white overflow-hidden"
            style={{
              fontSize: '17px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {project.title}
          </h3>
          <h4
            className="rachel-mono text-neutral-400 overflow-hidden transition-colors duration-300 ease-in-out group-hover:text-[#e65f2e]"
            style={{
              fontSize: '15px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {project.meta}
          </h4>
        </div>
      </div>
    </article>
  );
}

export const WorkSection: React.FC<{ onOpenCaseStudy?: (slug: string) => void }> = ({
  onOpenCaseStudy,
}) => {
  const left = [WORK_PROJECTS[0], WORK_PROJECTS[2]];
  const right = [WORK_PROJECTS[1]];
  return (
    <section
      id="project"
      className="relative w-full scroll-mt-24 px-6 sm:px-8 md:px-10 pt-12 sm:pt-16 md:pt-20 pb-16"
      style={{ background: '#0C0C0C' }}
    >
      <div className="max-w-[1800px] mx-auto w-full">
        {/* Overlapping stagger — layout itself follows the stepped shape from
            the reference (left higher, smooth drop to lower right). No stroke. */}
        <div className="grid grid-cols-1 gap-6 transition-all duration-300 ease-in-out lg:grid-cols-2 lg:gap-5">
          <div className="flex flex-col gap-6">
            {left.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 0.12} y={48}>
                <WorkCard
                  project={p}
                  onOpen={
                    p.slug === 'pandragon-internship' || p.slug === 'lunexis-studio'
                      ? () => onOpenCaseStudy?.(p.slug)
                      : undefined
                  }
                />
              </FadeIn>
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {right.map((p, i) => (
              <FadeIn key={p.slug} delay={(i + 1) * 0.12} y={48}>
                <WorkCard key={p.slug} project={p} onOpen={() => onOpenCaseStudy?.(p.slug)} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
