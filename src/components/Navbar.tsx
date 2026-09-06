import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar only after user scrolls down past 40px
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy: highlight the link for the section currently in view.
  // Sections are lazy-loaded, so re-query until all three exist.
  useEffect(() => {
    const ids = ['about', 'project', 'contact'];
    let observer: IntersectionObserver | null = null;
    let tries = 0;

    const observe = () => {
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      if (sections.length === ids.length || tries >= 20) {
        if (sections.length === 0) return;
        const visible = new Map<string, number>();
        observer = new IntersectionObserver(
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
            } else if (window.scrollY < 200) {
              setActive(null);
            }
          },
          { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5] }
        );
        sections.forEach((s) => observer!.observe(s));
        return;
      }
      tries += 1;
      window.setTimeout(observe, 500);
    };

    observe();
    return () => observer?.disconnect();
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Project', href: '#project', id: 'project' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <nav
      aria-label="Main Navigation"
      className={`fixed top-5 sm:top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out max-w-[calc(100vw-1.5rem)] ${
        isScrolled
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="inline-flex items-center gap-2 sm:gap-7 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-[#141414]/90 backdrop-blur-md border border-white/[0.14] shadow-[0_8px_32px_rgba(0,0,0,0.6)] max-w-full overflow-x-auto">
        {/* Monogram Badge (left) */}
        <a
          href="#"
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-black rounded-lg border border-white/10 hover:border-white/30 transition-colors flex-shrink-0"
          aria-label="Home"
        >
          <span
            className="font-bold text-white text-[15px] sm:text-[16px] tracking-tight select-none leading-none"
            style={{ fontFamily: "'Kanit', sans-serif" }}
          >
            NP
          </span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                className={`text-[13px] sm:text-[14px] font-medium transition-all duration-200 cursor-pointer rounded-full px-2.5 sm:px-3 py-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-[#e0e0e0] hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            );
          })}

          {/* Resume download button */}
          <a
            href="/Neha_Patel_Resume.pdf"
            download="Neha_Patel_Resume.pdf"
            className="text-[13px] sm:text-[14px] text-[#e0e0e0] hover:text-white font-medium transition-colors cursor-pointer rounded-full px-2.5 sm:px-3 py-1.5 hover:bg-white/10 whitespace-nowrap"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
