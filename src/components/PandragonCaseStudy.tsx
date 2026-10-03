import React, { useEffect, useState } from 'react';
import { FadeIn } from './FadeIn';
import { scrollTo } from '../utils/scroll';

interface PandragonCaseStudyProps {
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
  'https://www.figma.com/proto/EL3E6lApC11Zs2bmIMwuXY/fashion?node-id=1-2966&p=f&viewport=-12588%2C-10553%2C0.53&t=MTKpqK2URl7pF2uX-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=1%3A2966&page-id=0%3A1';

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

export const PandragonCaseStudy: React.FC<PandragonCaseStudyProps> = ({ onBack }) => {
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
              Pandragon • Shipped 06/2026 – 09/2026
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} y={20}>
          <h1
            className="rachel-serif mt-4 text-balance font-light tracking-tight text-white"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', lineHeight: 1.08 }}
          >
            Designing an e-commerce experience people could{' '}
            <em className="italic">actually trust</em>
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
                June 2026 – September 2026
                <br />
                (3 months, Internship)
              </dd>
            </div>
            <div>
              <dt className="rachel-mono text-xs uppercase tracking-[0.2em] text-neutral-500">Team</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-neutral-200">
                Founders / Stakeholders
                <br />
                Dev team (handoff)
                <br />
                1 Designer (me!)
              </dd>
            </div>
            <div>
              <dt className="rachel-mono text-xs uppercase tracking-[0.2em] text-neutral-500">Tools</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-neutral-200">Figma</dd>
            </div>
            <div className="col-span-2 md:col-span-4">
              <dt className="rachel-mono text-xs uppercase tracking-[0.2em] text-neutral-500">Skills</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-neutral-200">
                UI/UX Design · Wireframing · Design Systems · User Research · Visual Design
                (from scratch — no existing brand identity)
              </dd>
            </div>
          </dl>
        </FadeIn>

        <VideoFigure
          src="/pandragon/pandragon-card.mp4"
          caption="Pandragon — project teaser"
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
              What if a new clothing brand could earn enough trust online that people bought
              directly from <em className="italic">them</em> — not from Amazon or Flipkart?
            </SectionTitle>
          </FadeIn>
          <FadeIn delay={0.06} y={20}>
            <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-neutral-300">
              <p>
                Pandragon is a startup clothing brand. When I joined as their solo UI/UX
                design intern, they had no existing design system — no color palette, no
                typography, no components, nothing. I was building the entire visual
                identity and product experience from a blank canvas, at the same time as
                designing the actual e-commerce site.
              </p>
              <p>
                I took this internship specifically to get real, hands-on experience in the
                UI/UX field — and Pandragon gave me a rare kind of ownership: end-to-end
                design responsibility on a real product, for a real company, solo.
              </p>
            </div>
          </FadeIn>
        </section>

        <section id="solution" className="scroll-mt-24 pt-16">
          <FadeIn y={20}>
            <Eyebrow>Solution</Eyebrow>
            <SectionTitle>
              A clean, minimal fashion e-commerce site — designed to feel trustworthy enough
              to buy from directly.
            </SectionTitle>
          </FadeIn>
          <FadeIn delay={0.06} y={20}>
            <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-neutral-300">
              <p>
                The core of the experience is a browsing and checkout flow built around one
                idea: reduce how much a user has to <em className="italic">search</em> for
                what they want, and reduce how much they have to{' '}
                <em className="italic">think</em> about whether it&apos;s safe to buy.
              </p>
            </div>
          </FadeIn>
          <Figure
            src="/pandragon/product-detail.webp"
            alt="Pandragon product detail page with reviews, offers and size selection"
            caption="Product detail page with a simplified filtering experience"
          />
          <Figure
            src="/pandragon/category.webp"
            alt="Pandragon category and filter system"
            caption="Category browsing with the simplified filter system"
          />
        </section>

        <section id="outcomes" className="scroll-mt-24 pt-16">
          <FadeIn y={20}>
            <Eyebrow>Outcomes</Eyebrow>
            <blockquote
              className="rachel-serif mt-4 border-l-2 border-[#e65f2e] pl-6 text-balance font-light text-white"
              style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', lineHeight: 1.25 }}
            >
              Pandragon shipped the design to their development team, and the company loved
              the result — enough that they want to bring me back to work with them again
              in the future.
            </blockquote>
          </FadeIn>
          <FadeIn delay={0.06} y={20}>
            <p className="mt-6 text-[16px] leading-relaxed text-neutral-300">
              For a first internship, that was the validation I needed that the process
              actually worked.
            </p>
          </FadeIn>
        </section>

        <section id="problem" className="scroll-mt-24 pt-16">
          <FadeIn y={20}>
            <Eyebrow>The Problem</Eyebrow>
            <SectionTitle>
              People were buying Pandragon&apos;s t-shirts — just not from Pandragon.
            </SectionTitle>
          </FadeIn>
          <FadeIn delay={0.06} y={20}>
            <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-neutral-300">
              <p>
                Before this redesign, Pandragon already had a site — but almost nobody used
                it. Customers were instead finding and buying their products through Amazon
                and Flipkart. That meant Pandragon was:
              </p>
              <ul className="list-disc space-y-2 pl-6 marker:text-[#e65f2e]">
                <li>Giving up margin to third-party platforms</li>
                <li>Paying platform / listing fees on every sale</li>
                <li>Never owning the customer relationship</li>
              </ul>
              <p>
                Their ask to me was direct:{' '}
                <strong className="font-semibold text-white">
                  build a site people can trust enough to buy directly from.
                </strong>
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08} y={20}>
            <h3 className="rachel-mono mt-10 text-sm uppercase tracking-[0.2em] text-neutral-200">
              Target Users
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-neutral-300">
              Teenagers through adults, both male and female shoppers — a broad but
              style-conscious audience, since Pandragon&apos;s catalog spans men&apos;s and
              women&apos;s hoodies, t-shirts, shirts, and oversized tees (with jeans and
              accessories planned for later). I had to design an information architecture
              that could hold three categories today and scale to many more without needing
              a redesign later.
            </p>
          </FadeIn>
        </section>

        <section id="research" className="scroll-mt-24 pt-16">
          <FadeIn y={20}>
            <Eyebrow>Research</Eyebrow>
            <SectionTitle>
              I studied how people actually shop for clothes online — and why they trust
              some sites and abandon others.
            </SectionTitle>
            <p className="mt-6 text-[16px] leading-relaxed text-neutral-300">
              I didn&apos;t have access to a research budget or a user panel, so I did this
              the direct way: I went through the buying process — start to finish — on
              every major fashion e-commerce site I could get my hands on, including{' '}
              <strong className="font-semibold text-white">
                Levi&apos;s, H&amp;M, Savana, and The Souled Store.
              </strong>{' '}
              I wasn&apos;t just looking at visual style — I was tracking the entire
              journey: how filtering worked, how navigation felt, how checkout was
              structured, and where I personally felt <em className="italic">hesitant</em>{' '}
              to trust a site with my money.
            </p>
          </FadeIn>
          <FadeIn delay={0.05} y={20}>
            <h3 className="rachel-mono mt-10 text-sm uppercase tracking-[0.2em] text-neutral-200">
              Pain Points I Found
            </h3>
          </FadeIn>
          <div className="mt-5 space-y-6">
            <FadeIn delay={0.04} y={20}>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h4 className="rachel-serif text-xl text-white">
                  1. Filtering was needlessly buried
                </h4>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-300">
                  Almost every fashion site&apos;s most-used filters are simply
                  &ldquo;Men&rdquo; and &ldquo;Women&rdquo; — but most sites hide that
                  behind a search bar or a secondary menu instead of putting it where users
                  actually look first. I made the decision early to put Men / Women / Shop
                  by Style directly into the main navbar, not buried in a dropdown or
                  search flow.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.08} y={20}>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h4 className="rachel-serif text-xl text-white">
                  2. Minimal design often meant confusing design
                </h4>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-300">
                  Sites like H&amp;M looked clean and aesthetically strong, but
                  functionally, going &ldquo;back&rdquo; to a previously viewed product or
                  retracing your steps was confusing and easy to lose track of.
                  Good-looking isn&apos;t the same as easy-to-use — and I wanted Pandragon
                  to be both.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.12} y={20}>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h4 className="rachel-serif text-xl text-white">
                  3. Inconsistent experiences across web and mobile
                </h4>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-300">
                  A surprising number of the sites I tested weren&apos;t actually
                  responsive — they had visibly different, separately-built experiences for
                  web and mobile, which made the brand feel disjointed depending on how you
                  shopped.
                </p>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.06} y={20}>
            <div className="mt-8 rounded-xl border border-[#e65f2e]/30 bg-[#e65f2e]/[0.06] p-6">
              <h4 className="rachel-mono text-xs uppercase tracking-[0.2em] text-[#e65f2e]">
                A personal note on the process
              </h4>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-300">
                Starting from a completely blank slate — no brand, no colors, no fonts, no
                existing components — was the hardest part of this project to begin with.
                But once I got into it, I found myself genuinely chasing perfection in the
                details rather than finding it exhausting. That shift is part of what made
                me want to keep pushing further into UI/UX as a field.
              </p>
            </div>
          </FadeIn>
        </section>

        <section id="process" className="scroll-mt-24 pt-16">
          <FadeIn y={20}>
            <Eyebrow>Design Process</Eyebrow>
            <SectionTitle>From wireframe to a 100+ component design system, solo.</SectionTitle>
            <p className="mt-6 text-[16px] leading-relaxed text-neutral-300">
              I started with low-fidelity wireframes to lock down structure and flow before
              touching any visual design — layout, hierarchy, and navigation logic first.
              Once the core flows felt right, I moved into high-fidelity design in Figma,
              building out a full style guide and component library from scratch: colors,
              typography, buttons, cards, form states, and navigation elements —{' '}
              <strong className="font-semibold text-white">more than 100 components</strong>
              , all built for a brand that had none of this defined before I started.
            </p>
          </FadeIn>
          <Figure
            src="/pandragon/wireframes.webp"
            alt="Pandragon low-fidelity wireframes"
            caption="Low-fidelity wireframes — structure and flow first"
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <FadeIn delay={0.04} y={20}>
              <div>
                <h3 className="rachel-mono text-sm uppercase tracking-[0.2em] text-neutral-200">
                  Core Pages
                </h3>
                <ul className="mt-3 space-y-1.5 text-[15px] text-neutral-300">
                  {['Men', 'Women', 'Shop Categories', 'Product Page', 'Hamburger Menu', 'Google Login'].map(
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
                  Account &amp; Wishlist
                </h3>
                <ul className="mt-3 space-y-1.5 text-[15px] text-neutral-300">
                  {['Wishlist (empty state)', 'Wishlist (logged-in)', 'Account Details'].map((p) => (
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
                  Cart &amp; Checkout
                </h3>
                <ul className="mt-3 space-y-1.5 text-[15px] text-neutral-300">
                  {['Cart', 'Cart (empty state)', 'Cart (logged-in)', 'Shipping', 'Shipping / Address', 'Shipping / Edit Address'].map(
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
                  Navigation System
                </h3>
                <ul className="mt-3 space-y-1.5 text-[15px] text-neutral-300">
                  {[
                    'Navbar → Men / Women / Shop by Style / Featured / Filters',
                    'Hamburger → Newsletter / Customer Service',
                    'Footer → About / Contact / Returns / FAQ / Shop',
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
            src="/pandragon/components.webp"
            alt="Pandragon component library snapshot"
            caption="A snapshot of the 100+ component library in Figma"
          />
        </section>

        <section id="final" className="scroll-mt-24 pt-16">
          <FadeIn y={20}>
            <Eyebrow>Final Designs</Eyebrow>
            <SectionTitle>
              I designed for one core principle: users should never have to search hard for
              what they want.
            </SectionTitle>
            <p className="mt-6 text-[16px] leading-relaxed text-neutral-300">
              The decision I&apos;m proudest of across this entire project is how minimal
              and navigable the final experience feels. Every flow — from browsing by
              category, to filtering, to checkout — was built so a user can get to what
              they&apos;re looking for with as few steps and as little friction as
              possible, without the interface feeling stripped-down or incomplete.
            </p>
          </FadeIn>
          <Figure
            src="/pandragon/shop-categories.webp"
            alt="Pandragon shop categories page"
            caption="Shop Categories — the full catalog, one tap from the navbar"
          />
          <FadeIn y={20} className="my-8 sm:my-10">
            <div>
              <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
                <iframe
                  src={FIGMA_EMBED_URL}
                  title="Pandragon — live Figma prototype"
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
                  Managing real workload pressure is its own skill.
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-neutral-300">
                  Early on, the scope of this project — designing an entire brand and
                  product from nothing, solo, in three months — genuinely felt heavy,
                  especially as my first internship. Over time, I built up the capacity to
                  handle more pressure and more workload than I thought I could when I
                  started.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.08} y={20}>
              <div>
                <h3 className="rachel-serif text-2xl font-light text-white">
                  Speed and organization compound.
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-neutral-300">
                  I learned to prototype faster and more efficiently as the project went on,
                  and — for the first time — I started actually organizing my Figma files
                  properly instead of letting them sprawl. That habit has stuck with me
                  since.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.12} y={20}>
              <div>
                <h3 className="rachel-serif text-2xl font-light text-white">
                  Ownership is the best way to learn.
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-neutral-300">
                  Being handed a blank slate with zero existing brand assets forced me to
                  make (and own) every design decision — from color palette to checkout
                  flow. That pressure is exactly what turned this into the most formative
                  project of my early design career.
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

export default PandragonCaseStudy;
