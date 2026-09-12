import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { Loader } from './components/Loader';

// Below-the-fold sections are code-split so the initial bundle is just
// hero + nav (~faster FCP/LCP on Vercel). They load in parallel while
// the user reads the hero.
const MarqueeSection = lazy(() =>
  import('./components/MarqueeSection').then((m) => ({ default: m.MarqueeSection }))
);
const AboutSection = lazy(() =>
  import('./components/AboutSection').then((m) => ({ default: m.AboutSection }))
);
const ServicesSection = lazy(() =>
  import('./components/ServicesSection').then((m) => ({ default: m.ServicesSection }))
);
const ProjectsSection = lazy(() =>
  import('./components/ProjectsSection').then((m) => ({ default: m.ProjectsSection }))
);
const ContactSection = lazy(() =>
  import('./components/ContactSection').then((m) => ({ default: m.ContactSection }))
);

export const App: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [heroCovered, setHeroCovered] = useState(false);
  const [loading, setLoading] = useState(true);

  // Lock scroll while the loader is on screen so the 000->100
  // sequence reads cleanly and the hero can't peek early.
  useEffect(() => {
    if (!loading) return;
    const prevOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [loading]);

  // Buttery smooth scrolling (Lenis). Uses native scroll under the hood,
  // so position: sticky (pinned hero + stacking cards) keeps working.
  // Disabled for users who prefer reduced motion. Deferred until idle
  // so it never blocks First Paint.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let lenis: Lenis | null = null;
    let raf = 0;
    const start = () => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };
    let cleanupIdle: (() => void) | undefined;
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback!(start, { timeout: 2000 });
      cleanupIdle = () => w.cancelIdleCallback?.(id);
    } else {
      const t = window.setTimeout(start, 800);
      cleanupIdle = () => window.clearTimeout(t);
    }
    return () => {
      cleanupIdle?.();
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  // Once the black overlay card has fully slid over the pinned hero,
  // hide the hero layer entirely. This guarantees the hero (video + text)
  // can never peek/bleed through while scrolling projects & contact,
  // and saves GPU. Scrolling back up restores it instantly.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!overlayRef.current) return;
        setHeroCovered(overlayRef.current.getBoundingClientRect().top <= 0);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen w-full text-white"
      style={{ background: '#0C0C0C', overflowX: 'clip' }}
    >
      {/* Fixed video behind everything */}
      <BackgroundVideo />

      {/* Loader — black intro with Design/Create/Inspire + 000-100.
          Hero gets a fresh key after load so the typewriter restarts
          only once the loader has slid away. */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* Floating Scroll-Activated Navbar */}
      <Navbar />

      {/* Pinned Hero — header details stay fixed in place while scrolling.
          HeroSection itself is untouched; this sticky wrapper pins it so the
          black card below slides OVER it instead of pushing it away.
          100svh keeps the avatar framed under mobile browser chrome. */}
      <div
        aria-hidden={heroCovered || undefined}
        className="h-screen supports-[height:100svh]:h-[100svh]"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          overflow: 'hidden',
          visibility: heroCovered ? 'hidden' : 'visible',
        }}
      >
        <HeroSection key={loading ? 'loading' : 'ready'} />
      </div>

      {/* Black card overlay — slides over the pinned hero on scroll.
          NOTE: overflow: clip (NOT hidden) clips the rounded corners without
          creating a scroll container, so position: sticky inside (project
          deck) keeps sticking to the viewport. overflow:hidden would break it. */}
      <div
        ref={overlayRef}
        className="relative rounded-t-[28px] sm:rounded-t-[50px] md:rounded-t-[60px] overflow-clip"
        style={{ zIndex: 10, background: '#0C0C0C' }}
      >
        <Suspense fallback={null}>
          <MarqueeSection />
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <ContactSection />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
