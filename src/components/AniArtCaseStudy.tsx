import React, { useEffect, useState } from 'react';
import { FadeIn } from './FadeIn';
import { scrollTo } from '../utils/scroll';

interface AniArtCaseStudyProps {
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

export const AniArtCaseStudy: React.FC<AniArtCaseStudyProps> = ({ onBack }) => {
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
              Ani Art • Personal Project 2025
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} y={20}>
          <h1
            className="rachel-serif mt-4 text-balance font-light tracking-tight text-white"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', lineHeight: 1.08 }}
          >
            Designing a homepage that makes anime fans feel like they&apos;re{' '}
            <em className="italic">shopping inside the anime world</em>
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
                4–5 days
                <br />
                (Personal project)
              </dd>
            </div>
            <div>
              <dt className="rachel-mono text-xs uppercase tracking-[0.2em] text-neutral-500">Team</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-neutral-200">
                Solo
                <br />
                (personal project)
              </dd>
            </div>
            <div>
              <dt className="rachel-mono text-xs uppercase tracking-[0.2em] text-neutral-500">Tools</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-neutral-200">
                Figma (design)
                <br />
                Competitor sites (research)
              </dd>
            </div>
            <div className="col-span-2 md:col-span-4">
              <dt className="rachel-mono text-xs uppercase tracking-[0.2em] text-neutral-500">Skills</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-neutral-200">
                UI Design · Market/Competitor Research · Visual Design · Information Architecture
                (homepage only — UI + research exercise)
              </dd>
            </div>
          </dl>
        </FadeIn>

        <VideoFigure
          src="/AniArt/aniart-card.mp4"
          caption="Ani Art — project teaser"
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
              What if shopping for anime merch felt like stepping into the anime itself —{' '}
              <em className="italic">instead of browsing just another generic online store?</em>
            </SectionTitle>
          </FadeIn>
          <FadeIn delay={0.06} y={20}>
            <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-neutral-300">
              <p>
                I started Ani Art to sharpen my UI skills and build a strong portfolio
                piece. I&apos;d been noticing that most anime merchandise stores online
                function like standard e-commerce sites first, and “anime stores” second —
                they sell the right products, but the experience doesn&apos;t make a fan feel
                anything. I wanted to design a homepage that solved that: visually immersive,
                but still fast and easy to shop.
              </p>
            </div>
          </FadeIn>
        </section>

        <section id="solution" className="scroll-mt-24 pt-16">
          <FadeIn y={20}>
            <Eyebrow>Solution</Eyebrow>
            <SectionTitle>
              A homepage built around “shop by character, shop by anime” —{' '}
              <em className="italic">not endless generic categories.</em>
            </SectionTitle>
          </FadeIn>
          <Figure
            src="/AniArt/hero.webp"
            alt="Ani Art homepage hero section with rotating anime collections"
            caption="Hero banner featuring rotating popular anime collections, with quick-access product shortcuts"
          />
          <Figure
            src="/AniArt/categories.webp"
            alt="Ani Art shop by anime, stickers and best sellers"
            caption="Category browsing by anime / genre, sticker shop, and best-selling merchandise"
          />
        </section>

        <section id="outcomes" className="scroll-mt-24 pt-16">
          <FadeIn y={20}>
            <Eyebrow>Outcomes</Eyebrow>
            <blockquote
              className="rachel-serif mt-4 border-l-2 border-[#e65f2e] pl-6 text-balance font-light text-white"
              style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', lineHeight: 1.25 }}
            >
              Scoped intentionally as a UI + research exercise — homepage only, designed to
              sell a wide catalog without ever feeling cluttered.
            </blockquote>
          </FadeIn>
          <FadeIn delay={0.06} y={20}>
            <p className="mt-6 text-[16px] leading-relaxed text-neutral-300">
              No prototyping or further screens were built at this stage. The win was
              proving I could fit figures, cosplay, katanas, manga, stickers and apparel on
              one page while keeping it minimal and immersive — a foundation I plan to build
              into a fully functional site in the future.
            </p>
          </FadeIn>
        </section>

        <section id="problem" className="scroll-mt-24 pt-16">
          <FadeIn y={20}>
            <Eyebrow>The Problem</Eyebrow>
            <SectionTitle>
              Anime merch stores sell everything —{' '}
              <em className="italic">but hide it like they&apos;re ashamed of it.</em>
            </SectionTitle>
          </FadeIn>
          <FadeIn delay={0.06} y={20}>
            <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-neutral-300">
              <p>
                The anime industry is growing fast, and fans want to buy{' '}
                <em className="italic">everything</em> tied to their favorite series —
                figures, cosplay pieces, katanas, manga, stickers, apparel. But most stores
                selling this kind of merch are built like generic e-commerce templates with
                an anime skin on top. They don&apos;t reflect how a fan actually shops.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08} y={20}>
            <h3 className="rachel-mono mt-10 text-sm uppercase tracking-[0.2em] text-neutral-200">
              Target Users
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-neutral-300">
              Anime fans, cosplayers, collectors, and manga readers — a fast-growing
              audience that doesn&apos;t just want <em className="italic">a</em> product,
              they want everything connected to a specific character or series, in one place.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} y={20}>
            <h3 className="rachel-mono mt-10 text-sm uppercase tracking-[0.2em] text-neutral-200">
              The Core Goal
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-neutral-300">
              If I&apos;m a Demon Slayer fan — specifically a Zenitsu fan — I don&apos;t want
              to search four different category pages to find his merch. I want to land on a
              site, find “Demon Slayer,” then “Zenitsu,” and immediately see his cosplay
              outfit, wig, katana, action figure, and manga volumes together.{' '}
              <strong className="font-semibold text-white">
                Shop by character, shop by anime, shop by your taste — without clutter, and
                without wasting the user&apos;s time.
              </strong>
            </p>
          </FadeIn>
        </section>

        <section id="research" className="scroll-mt-24 pt-16">
          <FadeIn y={20}>
            <Eyebrow>Research</Eyebrow>
            <SectionTitle>
              I studied the one real competitor in this space —{' '}
              <em className="italic">and found a confusing, AI-generated experience.</em>
            </SectionTitle>
            <p className="mt-6 text-[16px] leading-relaxed text-neutral-300">
              Since this is a niche category, there&apos;s really only one major player fans
              currently use:{' '}
              <strong className="font-semibold text-white">OtakuIsland.</strong> I went
              through their site in depth and found serious usability issues — confusing to
              navigate, with no clear path for a fan who already knows exactly what anime or
              character they&apos;re looking for.
            </p>
          </FadeIn>
          <Figure
            src="/AniArt/competitor.webp"
            alt="OtakuIsland competitor site navbar"
            caption="OtakuIsland's navbar only lists a handful of anime names despite carrying a larger collection"
          />
          <FadeIn delay={0.05} y={20}>
            <h3 className="rachel-mono mt-10 text-sm uppercase tracking-[0.2em] text-neutral-200">
              Pain Points I Found in the Competitor Site
            </h3>
          </FadeIn>
          <div className="mt-5 space-y-6">
            <FadeIn delay={0.04} y={20}>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h4 className="rachel-serif text-xl text-white">
                  1. The navigation undersells the catalog
                </h4>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-300">
                  OtakuIsland&apos;s navbar only shows a few anime titles, even though their
                  actual collection is much larger. A user who doesn&apos;t see their favorite
                  anime listed will assume the store doesn&apos;t carry it — and leave
                  immediately. If their anime isn&apos;t visible up front, the site loses
                  them in seconds.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.08} y={20}>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h4 className="rachel-serif text-xl text-white">
                  2. The hierarchy buries what they actually sell
                </h4>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-300">
                  On a second interface I reviewed, the first heading a user sees is “Buy
                  Stickers” — making the site look like it only sells stickers. It&apos;s
                  only after scrolling for a while that you realize they sell a much wider
                  range of products. If you sell everything, the homepage needs to say so
                  immediately, not several scrolls in.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.12} y={20}>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h4 className="rachel-serif text-xl text-white">
                  3. It feels AI-generated and generic
                </h4>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-300">
                  The overall experience lacked intentional UX thinking — confusing to
                  navigate, with no clear path for a fan who already knows exactly what
                  they&apos;re looking for.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section id="process" className="scroll-mt-24 pt-16">
          <FadeIn y={20}>
            <Eyebrow>Design Process</Eyebrow>
            <SectionTitle>I designed the hierarchy around how a fan actually thinks.</SectionTitle>
            <p className="mt-6 text-[16px] leading-relaxed text-neutral-300">
              Since this was a UI + research-focused project, I didn&apos;t build wireframes
              or prototypes — I moved directly into high-fidelity design in Figma, making
              deliberate hierarchy decisions at each section based on what I&apos;d just
              learned from competitor research. I deliberately avoided stacking sections in a
              way that felt cluttered —{' '}
              <strong className="font-semibold text-white">
                selling a large, varied catalog without it ever feeling like “too much.”
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
                  {['Hero Banner (rotating series + shortcuts)', 'Top Manga by Popularity'].map(
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
                  Trust &amp; Discovery
                </h3>
                <ul className="mt-3 space-y-1.5 text-[15px] text-neutral-300">
                  {['Collector’s Hub / Brand Trust', 'Trending Products'].map((p) => (
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
                  Browse Paths
                </h3>
                <ul className="mt-3 space-y-1.5 text-[15px] text-neutral-300">
                  {['Shop by Anime / Genre', 'Stickers Shop'].map(
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
                    'Best Sellers (social proof)',
                    'Footer → Brand / Support / Newsletter',
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
            src="/AniArt/full-page.webp"
            alt="Ani Art full homepage structure"
            caption="Full homepage structure — eight sections ordered by fan intent, not template order"
          />
        </section>

        <section id="final" className="scroll-mt-24 pt-16">
          <FadeIn y={20}>
            <Eyebrow>Final Designs</Eyebrow>
            <SectionTitle>
              I&apos;m most proud of how minimal this feels,{' '}
              <em className="italic">considering how much it&apos;s actually selling.</em>
            </SectionTitle>
            <p className="mt-6 text-[16px] leading-relaxed text-neutral-300">
              The hardest part was fitting a genuinely wide product range — figures, cosplay
              items, katanas, manga, stickers, apparel — onto a single homepage without it
              feeling cluttered or overwhelming. Keeping the UI minimal while still making it
              feel immersive and “anime-coded” (rather than like a generic store) took real
              thought.
            </p>
          </FadeIn>
          <VideoFigure
            src="/AniArt/final.mp4"
            caption="Full homepage walkthrough — hero to best sellers"
          />
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
                  Selling a lot doesn&apos;t mean showing a lot.
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-neutral-300">
                  A site can sell dozens of product types without looking busy — it just
                  requires being intentional about hierarchy and what earns space above the
                  fold versus further down.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.08} y={20}>
              <div>
                <h3 className="rachel-serif text-2xl font-light text-white">
                  Competitor research is most useful when it&apos;s specific.
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-neutral-300">
                  Rather than just looking at anime stores broadly, breaking down{' '}
                  <em className="italic">exactly</em> where OtakuIsland&apos;s navigation and
                  hierarchy failed gave me a much clearer, more defensible set of design
                  decisions for my own homepage.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.12} y={20}>
              <div>
                <h3 className="rachel-serif text-2xl font-light text-white">
                  This is early — and that&apos;s okay.
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-neutral-300">
                  This is one of the earlier projects in my design journey, and I can already
                  see how much clearer my thinking around hierarchy and clutter has gotten
                  because of it. I plan to come back and build this into a fully functional
                  site in the future.
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

export default AniArtCaseStudy;
