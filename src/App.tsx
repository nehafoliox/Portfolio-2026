import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CustomCursor } from './components/CustomCursor';

// Below-the-fold sections are code-split so the initial bundle is just
// hero + nav (~faster FCP/LCP on Vercel). They load in parallel while
// the user reads the hero.
const WorkSection = lazy(() =>
  import('./components/WorkSection').then((m) => ({ default: m.WorkSection }))
);
const FunPage = lazy(() =>
  import('./components/FunPage').then((m) => ({ default: m.FunPage }))
);
const ContactSection = lazy(() =>
  import('./components/ContactSection').then((m) => ({ default: m.ContactSection }))
);

export const App: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [heroCovered, setHeroCovered] = useState(false);

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

  const [page, setPage] = useState<'home' | 'fun'>('home');

  useEffect(() => {
    document.title = page === 'fun' ? 'Fun — Neha Patel' : 'Neha Patel — Portfolio';
  }, [page]);

  // Scroll to a home-page section, retrying while lazy chunks mount.
  const scrollToId = (id: string) => {
    let tries = 0;
    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (tries < 6) {
        tries += 1;
        window.setTimeout(attempt, 250);
      }
    };
    attempt();
  };

  const goFun = () => {
    setPage('fun');
    window.scrollTo(0, 0);
  };

  const goHome = (anchor?: string) => {
    if (page !== 'home') {
      setPage('home');
      if (anchor) {
        window.setTimeout(() => scrollToId(anchor), 150);
      } else {
        window.scrollTo(0, 0);
      }
    } else if (anchor) {
      scrollToId(anchor);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative min-h-screen w-full text-white"
      style={{ background: '#0C0C0C', overflowX: 'clip' }}
    >
      {/* Fixed video behind everything */}
      <BackgroundVideo />

      {/* Custom cursor (Rachel-style) */}
      <CustomCursor />

      {/* Floating Scroll-Activated Navbar */}
      <Navbar
        page={page}
        onWork={() => goHome('project')}
        onFun={goFun}
        onContact={() => goHome('contact')}
        onHome={() => goHome()}
      />

      {/* Pinned Hero — header details stay fixed in place while scrolling.
          HeroSection itself is untouched; this sticky wrapper pins it so the
          black card below slides OVER it instead of pushing it away.
          100svh keeps the avatar framed under mobile browser chrome. */}
      {page === 'home' && (
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
        <HeroSection />
      </div>
      )}

      {/* Black card overlay — slides over the pinned hero on scroll.
          Rounded top + tall black lead-in matches the reference screenshot.
          NOTE: overflow: clip (NOT hidden) clips the rounded corners without
          creating a scroll container, so position: sticky inside (project
          deck) keeps sticking to the viewport. overflow:hidden would break it. */}
      <div
        ref={overlayRef}
        className={`relative overflow-clip ${page === 'home' ? 'rounded-t-[24px] sm:rounded-t-[32px] md:rounded-t-[40px]' : ''}`}
        style={{ zIndex: 10, background: '#0C0C0C' }}
      >
        <Suspense fallback={null}>
          {page === 'home' ? (
            <>
              <WorkSection />
              <ContactSection />
            </>
          ) : (
            <FunPage onBack={() => goHome()} />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default App;
