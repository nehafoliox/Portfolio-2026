import React, { useEffect, useState } from 'react';
import { FadeIn } from './FadeIn';
import { scrollTo } from '../utils/scroll';

interface LunexisCaseStudyProps {
  onBack: () => void;
}

const NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'solution', label: 'Solution' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'problem', label: 'Problem' },
  { id: 'research', label: 'Research' },
  { id: 'process', label: 'Process' },
  { id: 'final', label: 'Final Designs' },
  { id: 'reflection', label: 'Reflection' },
];

const FIGMA_PROTO_URL =
  'https://www.figma.com/proto/LhzT0N2A1wepJEGBxoQui1/Lunexis-studios?node-id=189-79&p=f&viewport=700%2C741%2C0.03&t=ftPXVIOtEzUlMPxd-1&scaling=contain&content-scaling=fixed&starting-point-node-id=189%3A79&page-id=0%3A1';

const FIGMA_EMBED_URL = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(FIGMA_PROTO_URL)}`;

function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <path d="M15 3h6v6" />
      <path d="M9 21H3v-6" />
      <path d="M21 3l-7 7" />
      <path d="M3 21l7-7" />
    </svg>
  );
}

function VideoFigure({
  src,
  poster,
  caption,
}: {
  src: string;
  poster?: string;
  caption?: string;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(v);

    return () => observer.disconnect();
  }, []);

  return (
    <FadeIn y={24} duration={0.8} className="my-8 sm:my-10">
      <figure>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            className="block h-auto w-full"
          />
        </div>
        {caption ? (
          <figcaption className="rachel-mono mt-3 text-center text-xs uppercase tracking-[0.12em] text-neutral-500">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    </FadeIn>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="rachel-mono mb-4 text-xs uppercase tracking-[0.2em] text-neutral-400">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="rachel-serif text-balance font-light tracking-tight text-white"
      style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.6rem)', lineHeight: 1.15 }}
    >
      {children}
    </h2>
  );
}

export const LunexisCaseStudy: React.FC<LunexisCaseStudyProps> = ({ onBack }) => {
  const [active, setActive] = useState<string>(NAV[0].id);
  const [lightbox, setLightbox] = useState<{ src: string[]; caption?: string } | null>(null);

  // Scroll-spy: highlight the nav link for the section currently in view.
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        });
        if (visible.size > 0) {
          const top = [...visible.entries()].sort((a, b) => b[1] - a[1])[0][0];
          setActive(top);
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lightbox: ESC to close + lock page scroll while open.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox]);

  // Thumbs are tiny top-crop previews (fast scroll); lightbox loads the full file on demand.
  const thumbFor = (s: string) =>
    s.endsWith('.webp') ? s.replace('.webp', '-thumb.webp') : s;

  // Compact preview box — click opens the full design in an overlay frame.
  const Figure = ({ src, alt, caption }: { src: string | string[]; alt: string; caption?: string }) => {
    const imgs = Array.isArray(src) ? src : [src];
    const thumbs = imgs.map(thumbFor);
    return (
      <FadeIn y={24} duration={0.8} className="my-8 sm:my-10">
        <figure>
          <button
            type="button"
            onClick={() => setLightbox({ src: imgs, caption })}
            data-cursor="expand"
            aria-label={`Expand screenshot: ${alt}`}
            className="group relative block h-72 w-full cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] text-left sm:h-96"
          >
            {thumbs.length > 1 ? (
              <div className="flex h-full w-full">
                {thumbs.map((s) => (
                  <img
                    key={s}
                    src={s}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="h-full w-1/2 object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                ))}
              </div>
            ) : (
              <img
                src={thumbs[0]}
                alt={alt}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            )}
            <span className="rachel-mono absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[#e65f2e] px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-white">
              <ExpandIcon /> Expand
            </span>
          </button>
          {caption ? (
            <figcaption className="rachel-mono mt-3 text-center text-xs uppercase tracking-[0.12em] text-neutral-500">
              {caption}
            </figcaption>
          ) : null}
        </figure>
      </FadeIn>
    );
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActive(id);
    scrollTo(`#${id}`, { offset: -90 });
  };

  return (
    <article className="relative w-full" style={{ background: '#0C0C0C' }}>
      <div className="mx-auto w-full max-w-3xl px-6 pt-24 sm:px-8 sm:pt-28">
        <FadeIn delay={0.04} y={16}>
          <div className="mt-10 flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="rachel-mono shrink-0 cursor-pointer text-xs uppercase tracking-[0.2em] text-neutral-400 transition-colors hover:text-[#e65f2e]"
            >
              ← Back to work
            </button>
            <p className="rachel-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
              Lunexis Studios • Personal Project 2026
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} y={20}>
          <h1
            className="rachel-serif mt-4 text-balance font-light tracking-tight text-white"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', lineHeight: 1.08 }}
          >
            Designing a Behance —{' '}
            <em className="italic">for video editors, not designers</em>
          </h1>
        </FadeIn>

        {/* Meta — Role / Timeline / Team / Tools, Skills full row */}
        <FadeIn delay={0.12} y={22}>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-white/10 py-8 md:grid-cols-4">
            <div>
              <dt className="rachel-mono text-xs uppercase tracking-[0.2em] text-neutral-500">Role</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-neutral-200">
                UI/UX Designer
                <br />
                (Solo Design)
              </dd>
            </div>
            <div>
              <dt className="rachel-mono text-xs uppercase tracking-[0.2em] text-neutral-500">Timeline</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-neutral-200">
                1 month
                <br />
                (Personal project)
              </dd>
            </div>
            <div>
              <dt className="rachel-mono text-xs uppercase tracking-[0.2em] text-neutral-500">Team</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-neutral-200">
                Solo
                <br />
                (friend&apos;s platform idea)
              </dd>
            </div>
            <div>
              <dt className="rachel-mono text-xs uppercase tracking-[0.2em] text-neutral-500">Tools</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-neutral-200">Figma</dd>
            </div>
            <div className="col-span-2 md:col-span-4">
              <dt className="rachel-mono text-xs uppercase tracking-[0.2em] text-neutral-500">Skills</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-neutral-200">
                UI Design · Visual/Brand Direction · Hand-Drawn Wireframing · Information
                Architecture · Trust-Driven Hierarchy (homepage only)
              </dd>
            </div>
          </dl>
        </FadeIn>

        <VideoFigure
          src="/Lunexis/teaser.mp4"
          poster="/Lunexis/hero.webp"
          caption="Lunexis Studios — project teaser"
        />
      </div>

      {/* Sticky section nav — horizontal chips on mobile */}
      <div className="sticky top-0 z-20 border-y border-white/10 bg-[#0C0C0C]/90 backdrop-blur-md lg:hidden">
        <nav
          aria-label="Case study sections"
          className="mx-auto flex w-full max-w-3xl gap-6 overflow-x-auto px-6 py-3 sm:px-8"
        >
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => handleNavClick(e, n.id)}
              aria-current={active === n.id ? 'location' : undefined}
              className={`rachel-mono shrink-0 text-xs uppercase tracking-[0.15em] transition-colors hover:text-[#e65f2e] ${
                active === n.id ? 'text-[#e65f2e]' : 'text-neutral-400'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div className="justify-center gap-12 lg:flex">
          {/* Left sticky nav — Rachel style, Back above the links */}
          <aside className="hidden w-52 shrink-0 lg:block">
            <div className="sticky top-28">
              <button
                type="button"
                onClick={onBack}
                className="rachel-mono cursor-pointer text-xs uppercase tracking-[0.2em] text-neutral-400 transition-colors hover:text-[#e65f2e]"
              >
                ← Back to work
              </button>
              <nav
                aria-label="Case study sections"
                className="mt-6 flex flex-col gap-1 border-l border-white/10 pl-5"
              >
                {NAV.map((n) => (
                  <a
                    key={n.id}
                    href={`#${n.id}`}
                    onClick={(e) => handleNavClick(e, n.id)}
                    aria-current={active === n.id ? 'location' : undefined}
                    className={`rachel-mono py-1.5 text-xs uppercase tracking-[0.15em] transition-colors hover:text-[#e65f2e] ${
                      active === n.id ? 'text-[#e65f2e]' : 'text-neutral-400'
                    }`}
                  >
                    {n.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
          <div className="w-full max-w-3xl pb-24">
        <section id="overview" className="scroll-mt-24 pt-12">
          <FadeIn y={20}>
            <Eyebrow>Overview</Eyebrow>
            <SectionTitle>
              What if video editors had their own Behance —{' '}
              <em className="italic">a place built specifically for them to get discovered?</em>
            </SectionTitle>
          </FadeIn>
          <FadeIn delay={0.06} y={20}>
            <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-neutral-300">
              <p>
                A friend of mine had an idea: video editors — the people behind gaming
                montages, AMVs, lyrical music videos, cinematic edits — don&apos;t really
                have a dedicated platform to showcase their work and get found by clients.
                Everything built for creative portfolios (Behance, Dribbble) is designed
                around static visual design work, not editors. He wanted to bring that idea
                to life, so I designed Lunexis Studios to turn his concept into something
                real and visual — a personal project where I got to build an entire platform
                identity from just an idea in conversation.
              </p>
            </div>
          </FadeIn>
        </section>

        <section id="solution" className="scroll-mt-24 pt-16">
          <FadeIn y={20}>
            <Eyebrow>Solution</Eyebrow>
            <SectionTitle>
              A dark, glowing, cyberpunk-styled platform{' '}
              <em className="italic">where editors showcase work and clients come to find them.</em>
            </SectionTitle>
          </FadeIn>
          <Figure
            src="/Lunexis/hero.webp"
            alt="Lunexis Studios hero section with hand-drawn line details"
            caption="Hero section with hand-drawn line details and bold distorted typography"
          />
          <Figure
            src="/Lunexis/categories.webp"
            alt="Lunexis trending edits, submission flow and footer"
            caption="Trending edits feed, Submit Your Work form, and closing footer"
          />
        </section>

        <section id="outcomes" className="scroll-mt-24 pt-16">
          <FadeIn y={20}>
            <Eyebrow>Outcomes</Eyebrow>
            <blockquote
              className="rachel-serif mt-4 border-l-2 border-[#e65f2e] pl-6 text-balance font-light text-white"
              style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', lineHeight: 1.25 }}
            >
              I showed the finished design to my friend, and he genuinely liked the
              direction — enough that he wants this built into a real, functioning platform
              in the future.
            </blockquote>
          </FadeIn>
          <FadeIn delay={0.06} y={20}>
            <p className="mt-6 text-[16px] leading-relaxed text-neutral-300">
              For now, it lives as a flagship piece in my own portfolio.
            </p>
          </FadeIn>
        </section>

        <section id="problem" className="scroll-mt-24 pt-16">
          <FadeIn y={20}>
            <Eyebrow>The Problem</Eyebrow>
            <SectionTitle>
              Editors have nowhere dedicated to be discovered —{' '}
              <em className="italic">clients have nowhere dedicated to look.</em>
            </SectionTitle>
          </FadeIn>
          <FadeIn delay={0.06} y={20}>
            <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-neutral-300">
              <p>
                Video editing has exploded alongside gaming, anime, and short-form content —
                but the people doing that work (gaming montage editors, AMV creators,
                cinematic editors) don&apos;t have a platform built around{' '}
                <em className="italic">their</em> medium. Existing portfolio platforms are
                built for designers, not editors.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08} y={20}>
            <h3 className="rachel-mono mt-10 text-sm uppercase tracking-[0.2em] text-neutral-200">
              Target Users
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-neutral-300">
              This platform serves creators specifically — editors looking to showcase their
              work and get discovered. Clients reach editors directly through DMs, similar
              to Instagram, rather than through a built-in messaging system.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} y={20}>
            <h3 className="rachel-mono mt-10 text-sm uppercase tracking-[0.2em] text-neutral-200">
              The Core Goal
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-neutral-300">
              The “About” moment on this homepage exists to directly tell potential clients
              what Lunexis does:{' '}
              <strong className="font-semibold text-white">
                submit your work, we&apos;ll showcase it like we have for others here — and
                we&apos;ll also feature it on our Instagram page.
              </strong>{' '}
              The whole homepage is built to earn a client&apos;s trust fast enough that
              they&apos;d actually consider hiring someone through it.
            </p>
          </FadeIn>
        </section>

        <section id="research" className="scroll-mt-24 pt-16">
          <FadeIn y={20}>
            <Eyebrow>Research</Eyebrow>
            <SectionTitle>
              I drew on platforms I already study closely{' '}
              <em className="italic">for my own design work.</em>
            </SectionTitle>
            <p className="mt-6 text-[16px] leading-relaxed text-neutral-300">
              Since I actively use{' '}
              <strong className="font-semibold text-white">Behance</strong> to showcase my
              own design work, I already had a strong working knowledge of how
              creative-showcase platforms build trust and structure discovery. I leaned on
              that experience, along with patterns from{' '}
              <strong className="font-semibold text-white">Upwork and Fiverr,</strong> to
              shape a hierarchy specifically meant to build a client&apos;s trust in an
              editor&apos;s skill before ever asking them to act.
            </p>
          </FadeIn>
        </section>

        <section id="process" className="scroll-mt-24 pt-16">
          <FadeIn y={20}>
            <Eyebrow>Design Process</Eyebrow>
            <SectionTitle>I designed this around trust, in a specific order.</SectionTitle>
            <p className="mt-6 text-[16px] leading-relaxed text-neutral-300">
              Editors, as an audience, tend to gravitate toward dark-themed interfaces — so
              I leaned fully into a glowing, dark cyberpunk aesthetic. To add a creative,
              human touch against all the bold typography, I added hand-drawn line details
              that visually act like a path guiding the user down the page, along with
              hand-drawn circles used to highlight key words.{' '}
              <strong className="font-semibold text-white">
                I deliberately did not add interactive components — the focus was entirely on
                nailing visual direction and page hierarchy.
              </strong>
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <FadeIn delay={0.04} y={20}>
              <div>
                <h3 className="rachel-mono text-sm uppercase tracking-[0.2em] text-neutral-200">
                  Entry
                </h3>
                <ul className="mt-3 space-y-1.5 text-[15px] text-neutral-300">
                  {['Hero Section (video-first intent)', 'About Lunexis (glimpse)'].map(
                    (p) => (
                      <li key={p} className="flex gap-2">
                        <span className="text-[#e65f2e]">→</span> {p}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.08} y={20}>
              <div>
                <h3 className="rachel-mono text-sm uppercase tracking-[0.2em] text-neutral-200">
                  Discovery
                </h3>
                <ul className="mt-3 space-y-1.5 text-[15px] text-neutral-300">
                  {['Our Projects (real quality proof)', 'Top Creators leaderboard + hire'].map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-[#e65f2e]">→</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.12} y={20}>
              <div>
                <h3 className="rachel-mono text-sm uppercase tracking-[0.2em] text-neutral-200">
                  Trust
                </h3>
                <ul className="mt-3 space-y-1.5 text-[15px] text-neutral-300">
                  {['Mobile Mockup / We’ll Publish You', 'Trending Videos (daily feed)'].map(
                    (p) => (
                      <li key={p} className="flex gap-2">
                        <span className="text-[#e65f2e]">→</span> {p}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.16} y={20}>
              <div>
                <h3 className="rachel-mono text-sm uppercase tracking-[0.2em] text-neutral-200">
                  Close
                </h3>
                <ul className="mt-3 space-y-1.5 text-[15px] text-neutral-300">
                  {[
                    'Submit Your Work (name / email / drive link)',
                    'Footer → Socials / Email contact',
                  ].map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-[#e65f2e]">→</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
          <Figure
            src="/Lunexis/sections.webp"
            alt="Lunexis projects and top creators sections"
            caption="Personal project showcase by category, and the Top Creators leaderboard with hire access"
          />
        </section>

        <section id="final" className="scroll-mt-24 pt-16">
          <FadeIn y={20}>
            <Eyebrow>Final Designs</Eyebrow>
            <SectionTitle>
              I built this from hand-drawn wireframes first —{' '}
              <em className="italic">a new process for me.</em>
            </SectionTitle>
            <p className="mt-6 text-[16px] leading-relaxed text-neutral-300">
              This was genuinely my first real hands-on project where I started with
              hand-drawn wireframes before touching Figma, mapping out the “path” I wanted
              the user to travel down the page before committing to any visual style. That
              process is part of why the hand-drawn line and circle details made it into
              the final design — they came directly from how I was already sketching the
              flow.
            </p>
          </FadeIn>
          <FadeIn y={20} className="my-8 sm:my-10">
            <div>
              <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
                <iframe
                  src={FIGMA_EMBED_URL}
                  title="Lunexis Studios — live Figma prototype"
                  loading="lazy"
                  allowFullScreen
                  className="block h-[500px] w-full sm:h-[600px]"
                />
              </div>
              <p className="rachel-mono mt-3 text-center text-xs uppercase tracking-[0.12em] text-neutral-500">
                Live Figma prototype — click through the real flow
              </p>
              <div className="mt-4 text-center">
                <a
                  href={FIGMA_PROTO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rachel-mono inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-white transition-colors hover:border-[#e65f2e] hover:text-[#e65f2e]"
                >
                  Open live prototype ↗
                </a>
              </div>
            </div>
          </FadeIn>
        </section>

        <section id="reflection" className="scroll-mt-24 pt-16">
          <FadeIn y={20}>
            <Eyebrow>Reflection</Eyebrow>
            <SectionTitle>What I learned</SectionTitle>
          </FadeIn>
          <div className="mt-8 space-y-8">
            <FadeIn delay={0.04} y={20}>
              <div>
                <h3 className="rachel-serif text-2xl font-light text-white">
                  This is where I started finding my own style.
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-neutral-300">
                  Lunexis was my first real hands-on project in a true sense — starting from
                  hand-drawn wireframes, mapping out a path for the user, and then
                  translating that into a finished visual direction. Somewhere in that
                  process, I found a style that felt genuinely mine, rather than borrowed
                  from a reference.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.08} y={20}>
              <div>
                <h3 className="rachel-serif text-2xl font-light text-white">
                  Designing from someone else&apos;s idea is a different skill.
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-neutral-300">
                  This wasn&apos;t my own concept — it came from a friend&apos;s idea for a
                  real platform. Translating someone else&apos;s vision into a visual
                  identity and structure pushed me to think more about trust and clarity
                  than personal taste.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.12} y={20}>
              <div>
                <h3 className="rachel-serif text-2xl font-light text-white">
                  I enjoyed the process more than I expected.
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-neutral-300">
                  Between the dark cyberpunk direction, the hand-drawn details, and figuring
                  out an entirely new hierarchy built around trust, this was the most
                  creatively enjoyable project of the three — and it showed me I want more
                  projects like this going forward.
                </p>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.06} y={15}>
            <p className="rachel-mono mt-16 text-center text-xs uppercase tracking-[0.2em] text-neutral-500">
              Designed in Figma by Neha
            </p>
          </FadeIn>
        </section>
          </div>
        </div>
      </div>

      {/* Full-design overlay — scroll inside the frame, page stays put */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.caption ?? 'Design preview'}
        >
          <button
            type="button"
            aria-label="Close preview"
            onClick={() => setLightbox(null)}
            className="absolute inset-0 cursor-pointer bg-black/85"
          />
          <div className="relative flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#111]">
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
              <p className="rachel-mono truncate text-xs uppercase tracking-[0.15em] text-neutral-300">
                {lightbox.caption ?? 'Design preview'}
              </p>
              <button
                type="button"
                autoFocus
                onClick={() => setLightbox(null)}
                className="rachel-mono shrink-0 cursor-pointer rounded-full border border-white/20 px-4 py-1.5 text-xs uppercase tracking-[0.15em] text-white transition-colors hover:border-[#e65f2e] hover:text-[#e65f2e]"
              >
                ✕ Close
              </button>
            </div>
            <div data-lenis-prevent className="overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {lightbox.src.map((s) => (
                <img
                  key={s}
                  src={s}
                  alt={lightbox.caption ?? 'Full design screenshot'}
                  draggable={false}
                  loading="eager"
                  decoding="async"
                  className="block h-auto w-full [content-visibility:auto]"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default LunexisCaseStudy;
