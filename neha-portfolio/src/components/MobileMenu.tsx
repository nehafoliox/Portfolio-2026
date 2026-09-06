"use client";

import { useEffect } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[60] transition-all duration-500 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-[85%] max-w-[420px] bg-surface-dark text-white shadow-2xl transition-transform duration-600 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
      >
        <div className="flex flex-col h-full p-8 pt-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="self-end p-2 mb-16 text-white/60 hover:text-accent transition-colors duration-300"
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Links */}
          <div className="flex flex-col gap-6">
            {links.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={onClose}
                className="text-[clamp(2rem,8vw,3rem)] font-extrabold leading-tight hover:text-accent transition-colors duration-300"
                style={{
                  transform: isOpen ? "translateX(0)" : "translateX(40px)",
                  opacity: isOpen ? 1 : 0,
                  transition: `transform 0.6s var(--ease-out-expo) ${i * 80 + 100}ms, opacity 0.6s var(--ease-out-expo) ${i * 80 + 100}ms, color 0.3s`,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Bottom */}
          <div className="mt-auto space-y-6">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-wider px-5 py-2.5 bg-accent text-surface-dark rounded-full hover:bg-accent-light transition-colors duration-300"
            >
              Download Resume
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>

            <p className="text-meta text-white/20">
              © 2026 NEHA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
