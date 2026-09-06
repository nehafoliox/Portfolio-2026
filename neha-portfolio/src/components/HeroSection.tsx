"use client";

export default function HeroSection() {
  const marqueeText =
    "UI DESIGNER • AHMEDABAD • MAKES SCREENS PRETTY • PRODUCT THINKER • PIXEL PERFECTIONIST • DESIGN OBSESSED • VISUAL STORYTELLER • ";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden pb-12 md:pb-20"
    >
      {/* Marquee Strip — behind the character, vertically centered */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 overflow-hidden pointer-events-none select-none z-[1]">
        <div
          className="animate-marquee whitespace-nowrap flex"
          aria-hidden="true"
        >
          <span className="text-[clamp(7rem,18vw,16rem)] font-extrabold text-foreground/[0.03] leading-none tracking-[-0.03em]">
            {marqueeText}
          </span>
          <span className="text-[clamp(7rem,18vw,16rem)] font-extrabold text-foreground/[0.03] leading-none tracking-[-0.03em]">
            {marqueeText}
          </span>
        </div>
      </div>

      {/* Character Placeholder — sits in front of marquee */}
      <div className="absolute right-[5%] md:right-[8%] lg:right-[12%] bottom-0 z-[5] hidden md:flex items-end justify-center">
        <div className="relative w-[240px] lg:w-[320px] xl:w-[380px]">
          {/* Placeholder silhouette */}
          <div className="w-full aspect-[3/4.5] rounded-t-[50%] bg-gradient-to-b from-foreground/[0.06] to-transparent flex flex-col items-center justify-center">
            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-accent/20 flex items-center justify-center mb-3">
              <span className="text-[2rem] lg:text-[2.5rem] font-extrabold text-accent-dark">
                N
              </span>
            </div>
            <p className="text-meta text-foreground-muted/60 text-center leading-relaxed">
              CHARACTER ART
              <br />
              COMING SOON
            </p>
          </div>
        </div>
      </div>

      {/* Main Content — bottom-aligned like reference */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full relative z-10">
        {/* Small intro line */}
        <div className="mb-6 md:mb-8 flex items-center gap-3">
          <span className="w-10 h-[1px] bg-foreground/30" />
          <span className="text-meta text-foreground-muted">
            UI / PRODUCT DESIGNER
          </span>
        </div>

        {/* Big Name */}
        <h1 className="text-hero font-extrabold leading-[0.85] tracking-[-0.05em] mb-6 md:mb-8">
          Neha
        </h1>

        {/* Tagline — like reference's "6 years of asking Why?" */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-12 mb-8">
          <p className="text-body-lg text-foreground-muted max-w-md leading-relaxed">
            Crafting thoughtful digital experiences with obsessive
            attention to every pixel — from Ahmedabad, India.
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-meta text-foreground-muted">
              AVAILABLE FOR WORK
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
        <span className="text-meta text-foreground-muted/50 text-[0.6rem]">
          SCROLL
        </span>
        <div className="animate-bounce-down">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-foreground-muted/40"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-divider" />
    </section>
  );
}
