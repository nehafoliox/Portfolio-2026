import React, { useEffect, useRef, useState } from 'react';

/**
 * MarqueeSection — two rows of self-hosted WebP tiles scrolling with page scroll.
 * Images live in /public/marquee (Vercel edge-cached) — no more slow Drive fetches.
 * Rows only animate while the section is on screen (IntersectionObserver).
 */

// Row 1 — first 11, Row 2 — remaining 10
const ROW1 = Array.from({ length: 11 }, (_, i) => `/marquee/mq-${String(i + 1).padStart(2, '0')}.webp`);
const ROW2 = Array.from({ length: 10 }, (_, i) => `/marquee/mq-${String(i + 12).padStart(2, '0')}.webp`);

function Tile({ src, eager }: { src: string; eager?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="w-[220px] h-[140px] sm:w-[420px] sm:h-[270px] max-w-none rounded-xl sm:rounded-2xl overflow-hidden shrink-0 select-none bg-white/[0.06]">
      <img
        src={src}
        alt=""
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : 'low'}
        width={420}
        height={270}
        draggable={false}
        onLoad={() => setLoaded(true)}
        className="w-full h-full object-cover pointer-events-none transition-opacity duration-500"
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
}

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);

  // Track visibility — skip all scroll work while off screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { rootMargin: '200px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Direct DOM transforms (no React state) — zero re-renders on scroll.
  // Paused entirely when the section is off screen.
  useEffect(() => {
    let raf = 0;
    let ticking = false;
    const update = () => {
      ticking = false;
      if (!visibleRef.current) return;
      if (!sectionRef.current || !row1Ref.current || !row2Ref.current) return;
      const sectionTop =
        sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const offset =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      row1Ref.current.style.transform = `translate3d(${offset - 200}px,0,0)`;
      row2Ref.current.style.transform = `translate3d(${-(offset - 200)}px,0,0)`;
    };
    const onScroll = () => {
      if (ticking || !visibleRef.current) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Doubled for seamless width — 42 tiny edge-cached WebPs (~0.8MB total,
  // browser-cached after first view) instead of 42 slow Drive fetches.
  const renderRow = (images: string[], rowKey: string, eagerFirst: number) => {
    const doubled = [...images, ...images];
    return doubled.map((src, i) => (
      <Tile key={`${rowKey}-${i}`} src={src} eager={i < eagerFirst} />
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
      style={{ contentVisibility: 'auto' }}
    >
      <div className="flex flex-col gap-3">
        <div className="overflow-hidden">
          <div
            ref={row1Ref}
            className="flex gap-3 w-max"
            style={{ willChange: 'transform' }}
          >
            {renderRow(ROW1, 'row1', 3)}
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            ref={row2Ref}
            className="flex gap-3 w-max"
            style={{ willChange: 'transform' }}
          >
            {renderRow(ROW2, 'row2', 0)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
