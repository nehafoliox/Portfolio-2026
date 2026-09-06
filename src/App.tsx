import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';

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
    });
    let raf = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
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

      {/* Floating Scroll-Activated Navbar */}
      <Navbar />

      {/* Pinned Hero — header details stay fixed in place while scrolling.
          HeroSection itself is untouched; this sticky wrapper pins it so the
          black card below slides OVER it instead of pushing it away. */}
      <div
        aria-hidden={heroCovered}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 1,
          overflow: 'hidden',
          visibility: heroCovered ? 'hidden' : 'visible',
        }}
      >
        <HeroSection />
      </div>

      {/* Black card overlay — slides over the pinned hero on scroll.
          NOTE: overflow: clip (NOT hidden) clips the rounded corners without
          creating a scroll container, so position: sticky inside (project
          deck) keeps sticking to the viewport. overflow:hidden would break it. */}
      <div
        ref={overlayRef}
        className="relative rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] overflow-clip"
        style={{ zIndex: 10, background: '#0C0C0C' }}
      >
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default App;
