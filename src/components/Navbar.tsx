import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar only after user scrolls down past 40px
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Project', href: '#project' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      aria-label="Main Navigation"
      className={`fixed top-5 sm:top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
        isScrolled
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="inline-flex items-center gap-4 sm:gap-7 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-[#141414]/90 backdrop-blur-md border border-white/[0.14] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
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
        <div className="flex items-center gap-4 sm:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] sm:text-[14px] text-[#e0e0e0] hover:text-white font-medium transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}

          {/* Resume download button */}
          <a
            href="/Neha_Patel_Resume.pdf"
            download="Neha_Patel_Resume.pdf"
            className="text-[13px] sm:text-[14px] text-[#e0e0e0] hover:text-white font-medium transition-colors cursor-pointer"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
