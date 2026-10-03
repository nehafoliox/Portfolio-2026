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
const PandragonCaseStudy = lazy(() =>
  import('./components/PandragonCaseStudy').then((m) => ({ default: m.PandragonCaseStudy }))
);
const AniArtCaseStudy = lazy(() =>
  import('./components/AniArtCaseStudy').then((m) => ({ default: m.AniArtCaseStudy }))
);
const LunexisCaseStudy = lazy(() =>
  import('./components/LunexisCaseStudy').then((m) => ({ default: m.LunexisCaseStudy }))
);

import { setLenis, scrollTo as smoothScrollTo, resizeLenis } from './utils/scroll';

export const App: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [heroCovered, setHeroCovered] = useState(false);

  // Buttery smooth scrolling (Lenis). Uses native scroll under the hood,
  // so position: sticky (pinned hero + stacking cards) keeps working.
  // Disabled for users who prefer reduced motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });
    setLenis(lenis);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
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

  const [page, setPage] = useState<'home' | 'fun' | 'case-study' | 'pandragon' | 'aniart' | 'lunexis'>('home');

  useEffect(() => {
    document.title =
      page === 'fun'
        ? 'Fun — Neha Patel'
        : page === 'aniart'
          ? 'AniArt — Neha Patel'
          : page === 'lunexis'
            ? 'Lunexis Studios — Neha Patel'
            : page === 'pandragon' || page === 'case-study'
              ? 'Pandragon — Neha Patel'
              : 'Neha Patel — Portfolio';
  }, [page]);

  // When changing pages, reset scroll to top immediately & recalculate Lenis layout
  useEffect(() => {
    smoothScrollTo(0, { immediate: true });
    const r1 = requestAnimationFrame(() => resizeLenis());
    const t1 = window.setTimeout(() => resizeLenis(), 150);
    const t2 = window.setTimeout(() => resizeLenis(), 600);
    return () => {
      cancelAnimationFrame(r1);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [page]);

  // Scroll to a home-page section, retrying while lazy chunks mount.
  const scrollToId = (id: string) => {
    let tries = 0;
    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        smoothScrollTo(el, { offset: -80 });
      } else if (tries < 6) {
        tries += 1;
        window.setTimeout(attempt, 250);
      }
    };
    attempt();
  };

  const goFun = () => {
    setPage('fun');
  };

  const openStudy = (slug?: string) => {
    if (slug === 'aniart') {
      setPage('aniart');
    } else if (slug === 'lunexis-studio' || slug === 'lunexis') {
      setPage('lunexis');
    } else {
      setPage('pandragon');
    }
  };

  const goHome = (anchor?: string) => {
    if (page !== 'home') {
      setPage('home');
      if (anchor) {
        window.setTimeout(() => scrollToId(anchor), 150);
      }
    } else if (anchor) {
      scrollToId(anchor);
    } else {
      smoothScrollTo(0);
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
        className={`relative overflow-clip ${page === 'fun' ? '' : 'rounded-t-[24px] sm:rounded-t-[32px] md:rounded-t-[40px]'}`}
        style={{ zIndex: 10, background: '#0C0C0C' }}
      >
        <Suspense fallback={null}>
          {page === 'home' ? (
            <>
              <WorkSection onOpenCaseStudy={openStudy} />
              <ContactSection />
            </>
          ) : page === 'fun' ? (
            <FunPage onBack={() => goHome()} />
          ) : page === 'aniart' ? (
            <>
              <AniArtCaseStudy onBack={() => goHome('project')} />
              <ContactSection />
            </>
          ) : page === 'lunexis' ? (
            <>
              <LunexisCaseStudy onBack={() => goHome('project')} />
              <ContactSection />
            </>
          ) : (
            <>
              <PandragonCaseStudy onBack={() => goHome('project')} />
              <ContactSection />
            </>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default App;
