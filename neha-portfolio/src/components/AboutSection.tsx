"use client";

import { useRef, useEffect, useState } from "react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const windowH = window.innerHeight;
        const progress = Math.max(
          0,
          Math.min(1, (windowH - rect.top) / (windowH + rect.height))
        );
        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const parallaxY1 = (scrollProgress - 0.5) * 80;
  const parallaxY2 = (scrollProgress - 0.5) * 40;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="dark-section relative bg-surface-dark text-white py-28 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Monogram Tab — right edge */}
      <div className="monogram-tab absolute right-0 top-1/2 -translate-y-1/2 bg-accent text-foreground px-2 py-5 text-[0.65rem] font-extrabold tracking-widest rounded-l-sm z-10">
        N.
      </div>

      {/* Large decorative letter */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none select-none"
        style={{
          transform: `translate3d(0, ${parallaxY2}px, 0)`,
          willChange: "transform",
        }}
      >
        <span className="absolute top-[5%] left-[3%] text-[clamp(18rem,35vw,30rem)] font-extrabold leading-none">
          A
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-[2]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Left — "About" heading (matching reference: large, bold, left) */}
          <div
            className="md:col-span-4 lg:col-span-3"
            style={{
              transform: `translate3d(0, ${parallaxY1}px, 0)`,
              willChange: "transform",
            }}
          >
            <h2 className="text-display font-extrabold leading-[0.85]">
              About
            </h2>
          </div>

          {/* Right — Bio + meta (matching reference layout) */}
          <div
            className="md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-6"
            style={{
              transform: `translate3d(0, ${parallaxY2}px, 0)`,
              willChange: "transform",
            }}
          >
            <p className="text-body-lg text-white/75 leading-[1.8] mb-6">
              <strong className="text-white font-semibold">Neha</strong>{" "}
              <span className="text-white/40 text-caption">(she/her)</span> is a
              nomad product and brand designer with a passion for art and
              technology. She uses Figma and other low-code tools to create
              stunning, one-of-a-kind pieces that come to life on the internet.
              Currently residing in the lush city of Ahmedabad, Neha is ready to
              take on any design challenge.
            </p>

            <p className="text-body-lg text-white/75 leading-[1.8] mb-10">
              With a keen eye for aesthetics and a deep understanding of user
              behavior, she bridges the gap between beautiful interfaces and
              meaningful experiences.
            </p>

            {/* Meta tagline — all-caps, letter-spaced, like reference */}
            <p className="text-meta text-white/30 mb-10 leading-relaxed">
              BUILDING PRODUCTS AT THE CROSSROADS OF AESTHETICS, FUNCTIONALITY
              <br className="hidden md:block" />
              &amp; USER EXPERIENCE — MAKING THE INTERNET A PRETTIER PLACE
            </p>

            {/* Role chip with badge — matching reference */}
            <div className="inline-flex items-center gap-3 bg-white/[0.04] border border-white/[0.06] rounded-full px-5 py-2.5">
              <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
                <span className="text-[0.6rem] font-extrabold text-surface-dark">
                  N
                </span>
              </div>
              <span className="text-caption text-white/60">
                Senior Design Studio
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
