"use client";

import { useState, useCallback } from "react";
import Toast from "./Toast";

export default function Footer() {
  const [showToast, setShowToast] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("neha@example.com");
      setShowToast(true);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = "neha@example.com";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setShowToast(true);
    }
  }, []);

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      name: "Behance",
      url: "https://behance.net",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.5 11c1.93 0 3.5-1.57 3.5-3.5S9.43 4 7.5 4H2v7h5.5zm0-5.5c.83 0 1.5.67 1.5 1.5S8.33 8.5 7.5 8.5H4V5.5h3.5zM8 13H2v7h6c1.93 0 3.5-1.57 3.5-3.5S9.93 13 8 13zm0 5.5H4V15h4c.83 0 1.5.67 1.5 1.5S8.83 18.5 8 18.5zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5c1.52 0 2.87-.76 3.69-1.92l-1.53-1.03c-.49.64-1.27 1.05-2.16 1.05-1.38 0-2.5-1.12-2.5-2.5h6.5c.03-.18.04-.36.04-.55A4.52 4.52 0 0 0 17.5 13zm-2.5 3.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5h-5zM15 10h5V8.5h-5V10z" />
        </svg>
      ),
    },
    {
      name: "Dribbble",
      url: "https://dribbble.com",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
          <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
          <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      id="footer"
      className="dark-section bg-surface-dark text-white py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Big CTA Line */}
        <h2 className="text-display-sm md:text-display font-extrabold leading-[0.9] mb-16 md:mb-24">
          Let&apos;s build
          <br />
          something{" "}
          <span className="text-accent">pretty</span>{" "}
          <span className="inline-block ml-1 text-accent">→</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Social Links */}
          <div className="md:col-span-4">
            <p className="text-meta text-white/30 mb-5">CONNECT</p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="social-icon w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-surface-dark hover:bg-accent hover:border-accent"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="md:col-span-4 md:col-start-6">
            <p className="text-meta text-white/30 mb-5">GET IN TOUCH</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-accent text-surface-dark text-[0.75rem] font-bold uppercase tracking-wider rounded-full hover:bg-accent-light transition-colors duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Resume
              </a>
              <button
                onClick={copyEmail}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-white/15 text-white text-[0.75rem] font-bold uppercase tracking-wider rounded-full hover:bg-white/10 transition-colors duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy Email
              </button>
            </div>
          </div>

          {/* Location */}
          <div className="md:col-span-3 md:col-start-10">
            <p className="text-meta text-white/30 mb-5">BASED IN</p>
            <p className="text-caption text-white/60 leading-relaxed">
              Ahmedabad, India
              <br />
              Available Worldwide
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-6 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-meta text-white/20">
            © 2026 NEHA. ALL RIGHTS RESERVED.
          </p>
          <span className="text-[0.7rem] font-extrabold text-white/15 tracking-widest">
            NEHA.
          </span>
        </div>
      </div>

      <Toast
        message="Email copied to clipboard!"
        isVisible={showToast}
        onDismiss={() => setShowToast(false)}
      />
    </footer>
  );
}
