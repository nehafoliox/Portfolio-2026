import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import FadeIn from './FadeIn';
import Magnet from './Magnet';

type Service = {
  id: string;
  name: string;
  description: string;
  img: string;
  fallback: string;
  tags: string[];
  tools: string;
};

const SERVICES: Service[] = [
  {
    id: '01',
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop',
    fallback: '/marquee/mq-01.webp',
    tags: ['Landing Pages', 'Marketing Sites', 'Design Systems', 'Responsive'],
    tools: 'Figma · Webflow · Framer',
  },
  {
    id: '02',
    name: 'UI/UX Design',
    description:
      'Designing intuitive interfaces and experiences that are easy and enjoyable to use.',
    img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=800&auto=format&fit=crop',
    fallback: '/marquee/mq-06.webp',
    tags: ['Mobile Apps', 'Dashboards', 'Wireframes', 'Prototypes'],
    tools: 'Figma · Principle · Maze',
  },
  {
    id: '03',
    name: 'UX Research',
    description:
      'Understanding users, their needs, and their problems to create better design decisions.',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
    fallback: '/marquee/mq-11.webp',
    tags: ['User Interviews', 'Usability Tests', 'Personas', 'Journey Maps'],
    tools: 'Notion · Maze · Hotjar',
  },
  {
    id: '04',
    name: 'Design Engineering',
    description:
      'Taking designs from Figma to functional, responsive websites with clean implementation.',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    fallback: '/marquee/mq-16.webp',
    tags: ['React Builds', 'Animations', 'Handoff', 'Design Tokens'],
    tools: 'React · Tailwind · Framer Motion',
  },
  {
    id: '05',
    name: 'AI-Assisted Development',
    description:
      'Using modern AI-powered workflows to turn designs into functional digital experiences faster.',
    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    fallback: '/marquee/mq-21.webp',
    tags: ['Rapid Prototypes', 'Prompt Systems', 'Automation', 'MVPs'],
    tools: 'AI Workflows · Vibe Coding · APIs',
  },
];

/* Image with a self-hosted backup if the remote photo ever fails. */function SafeImg({
  src,
  fallback,
  className,
  eager = false,
}: {
  src: string;
  fallback: string;
  className?: string;
  eager?: boolean;
}) {
  const [err, setErr] = useState(false);
  return (
    <img
      src={err ? fallback : src}
      onError={() => setErr(true)}
      alt=""
      aria-hidden="true"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      className={className}
    />
  );
}

/* One-row-at-a-time scroll entrance: each card fires only when a good
   chunk of itself rolls into view, so they reveal in sequence as you
   scroll instead of all popping together. */
function RowReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 72, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export const ServicesSection: React.FC = () => {  const secRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null); // hovered (desktop preview)
  const [open, setOpen] = useState<number | null>(null); // tapped (accordion)

  // Cursor follower with spring lag for the floating preview.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 220, damping: 26, mass: 0.6 });

  // Preload previews so hover swaps are instant.
  useEffect(() => {
    SERVICES.forEach((s) => {
      const im = new Image();
      im.src = s.img;
    });
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    const r = secRef.current?.getBoundingClientRect();
    if (!r) return;
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
  };

  // Ghost number mirrors whatever card you're on.
  const spotlight = active ?? open ?? 0;

  return (
    <section
      id="services"
      ref={secRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setActive(null)}
      className="relative w-full bg-[#FFFFFF] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 scroll-mt-10 overflow-hidden"
    >
      {/* Dotted texture so the white never feels empty */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(12,12,12,0.10) 1px, transparent 1.4px)',
          backgroundSize: '26px 26px',
        }}
      />

      {/* Floating cursor preview (desktop only) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
        style={{ x: sx, y: sy }}
      >
        <div style={{ transform: 'translate(28px, -50%) rotate(4deg)' }}>
          <AnimatePresence mode="wait">
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.75, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="overflow-hidden rounded-2xl border-2 border-[#0C0C0C] shadow-[0_24px_70px_rgba(12,12,12,0.35)]"
              >
                <SafeImg
                  src={SERVICES[active].img}
                  fallback={SERVICES[active].fallback}
                  eager
                  className="h-52 w-72 object-cover"
                />
                <p className="bg-[#0C0C0C] px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-white/80 font-medium">
                  {SERVICES[active].name}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="relative max-w-6xl mx-auto grid gap-10 lg:gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Sticky intro panel — fills the left void on desktop */}
        <div className="lg:sticky lg:top-28 self-start text-center lg:text-left">
          <FadeIn>
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#0C0C0C]/50 font-medium mb-4">
              What I do (05)
            </p>
            <h2
              className="text-[#0C0C0C] font-black uppercase leading-[0.95] tracking-tight text-balance"
              style={{ fontSize: 'clamp(2.75rem, 8vw, 5.5rem)' }}
            >
              Services
            </h2>
            <p className="text-sm sm:text-base text-[#0C0C0C]/55 mt-5 font-light max-w-sm mx-auto lg:mx-0 leading-relaxed">
              From first interview to final deploy — strategy, pixels and code from one pair of hands.
            </p>
            <p className="text-xs sm:text-sm text-[#0C0C0C]/40 mt-3 font-medium">
              <span className="hidden lg:inline">Hover a card to preview — click to expand</span>
              <span className="lg:hidden">Tap a card to expand</span>
            </p>
          </FadeIn>

          {/* Ghost number reacts to the card you're on */}
          <FadeIn delay={0.1} className="hidden lg:block">
            <div className="relative mt-8 h-44 overflow-hidden" aria-hidden="true">
              <AnimatePresence mode="wait">
                <motion.span
                  key={spotlight}
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -34 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="font-black leading-none tabular-nums block"
                  style={{
                    fontSize: '11rem',
                    color: 'transparent',
                    WebkitTextStroke: '2px rgba(12,12,12,0.22)',
                  }}
                >
                  {SERVICES[spotlight].id}
                </motion.span>
              </AnimatePresence>
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#0C0C0C]/45 font-medium -mt-2">
              Now viewing — {SERVICES[spotlight].name}
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-8 hidden lg:block">
            <Magnet strength={3} padding={40}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#0C0C0C] text-white px-8 py-3 text-sm font-medium hover:gap-3.5 transition-all duration-200"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                Have something else in mind? Let's talk
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Magnet>
          </FadeIn>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {SERVICES.map((service, i) => {
            const hot = active === i || open === i;
            return (
            <RowReveal key={service.id}>
              <div
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setOpen((prev) => (prev === i ? null : i))}
                  aria-expanded={open === i}
                  className={`group cursor-pointer rounded-3xl border p-5 sm:p-6 transition-all duration-300 ${
                    hot
                      ? 'bg-[#0C0C0C] border-[#0C0C0C] shadow-[0_20px_60px_rgba(12,12,12,0.3)] sm:-translate-y-0.5'
                      : 'bg-white border-[#0C0C0C]/10 hover:border-[#0C0C0C]/30'
                  }`}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span
                      className="font-black leading-none shrink-0 tabular-nums transition-all duration-300"
                      style={{
                        fontSize: 'clamp(2.25rem, 8vw, 84px)',
                        color: hot ? 'transparent' : '#0C0C0C',
                        WebkitTextStroke: hot ? '1.5px rgba(255,255,255,0.85)' : '0px transparent',
                      }}
                    >
                      {service.id}
                    </span>
                    <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                      <h3
                        className={`font-medium uppercase leading-tight transition-colors duration-300 ${
                          hot ? 'text-white' : 'text-[#0C0C0C]'
                        }`}
                        style={{ fontSize: 'clamp(1rem, 2.2vw, 1.7rem)' }}
                      >
                        {service.name}
                      </h3>
                      <p
                        className="font-light leading-relaxed max-w-2xl transition-colors duration-300"
                        style={{
                          fontSize: 'clamp(0.85rem, 1.6vw, 1rem)',
                          color: hot ? 'rgba(255,255,255,0.6)' : 'rgba(12,12,12,0.6)',
                        }}
                      >
                        {service.description}
                      </p>
                    </div>
                    <span
                      className={`hidden sm:flex items-center justify-center h-11 w-11 rounded-full border shrink-0 transition-all duration-300 ${
                        hot
                          ? 'bg-white text-black border-white rotate-45'
                          : 'border-[#0C0C0C]/20 text-[#0C0C0C] group-hover:bg-[#0C0C0C] group-hover:text-white'
                      }`}
                    >
                      <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {/* Mobile thumb */}
                    <SafeImg
                      src={service.img}
                      fallback={service.fallback}
                      className="lg:hidden h-16 w-16 rounded-2xl object-cover shrink-0 border border-[#0C0C0C]/10"
                    />
                  </div>

                  {/* Expandable deliverables */}
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        key="details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5 flex flex-col gap-3">
                          <div className="flex flex-wrap gap-2">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-full bg-white text-black border border-black/10 px-3.5 py-1 text-xs sm:text-[13px] font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs sm:text-sm tracking-wide" style={{ color: 'rgba(255,255,255,0.55)' }}>
                            <span className="uppercase tracking-[0.2em] text-[#A78BFA] font-medium">Tools — </span>
                            {service.tools}
                          </p>
                          {/* Mobile gets a big preview since there's no cursor follower */}
                          <SafeImg
                            src={service.img}
                            fallback={service.fallback}
                            className="lg:hidden mt-1 h-44 w-full rounded-2xl object-cover border border-white/15"
                          />
                        </div>
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            </RowReveal>
            );
          })}

          {/* Mobile CTA (desktop lives in the sticky panel) */}
          <FadeIn delay={0.1} className="flex justify-center mt-6 lg:hidden">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#0C0C0C] text-white px-8 py-3 text-sm font-medium"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              Have something else in mind? Let's talk
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
