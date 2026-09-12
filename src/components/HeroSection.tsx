import React, { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import Magnet from './Magnet';

const TYPEWRITER_TEXT =
  'hi! I’m Neha\ni basically make screens pretty to live.';

export const HeroSection: React.FC = () => {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT, 38, 600);
  const [showButtons, setShowButtons] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('nehapatel00471@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nehafolio' },
    { label: 'Behance', href: 'https://www.behance.net/nehafoliox' },
    { label: 'Instagram', href: 'https://www.instagram.com/nehafoliox/' },
  ];

  return (
    <section className="relative z-[1] w-full h-full min-h-[100svh] flex flex-col justify-end pb-[max(3rem,env(safe-area-inset-bottom))] md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden">
      {/* Bottom readability gradient — text stays legible without hiding
          the centered avatar above it on phones. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none md:hidden"
        style={{
          background:
            'linear-gradient(to top, rgba(12,12,12,0.75) 0%, rgba(12,12,12,0.25) 55%, transparent 100%)',
        }}
      />
      {/* Desktop: character is centered behind the copy, so wash the left
          edge for legibility without dimming the face. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[42%] pointer-events-none hidden md:block"
        style={{
          background:
            'linear-gradient(to right, rgba(12,12,12,0.55) 0%, rgba(12,12,12,0.2) 60%, transparent 100%)',
        }}
      />
      <div className="max-w-xl relative z-10 w-full">
        {/* 1. Typewriter text */}
        <p
          className="text-white mb-5 sm:mb-6 min-h-[76px] sm:min-h-[84px] whitespace-pre-line text-balance"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
          }}
        >
          {displayed}
          {!done && (
            <span
              className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] cursor-blink"
              aria-hidden="true"
            />
          )}
        </p>

        {/* 3. Action pill buttons */}
        <div
          className="flex flex-wrap gap-y-1 transition-all duration-400 ease-out"
          style={{
            opacity: showButtons ? 1 : 0,
            transform: showButtons ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {socialLinks.map((link) => (
            <Magnet key={link.label} strength={4} padding={24} className="mx-[0.2em] mb-[0.4em]">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            </Magnet>
          ))}

          <Magnet strength={4} padding={24} className="mx-[0.2em] mb-[0.4em] max-w-full">
          <button
            type="button"
            onClick={handleCopyEmail}
            title={copied ? 'Copied to clipboard!' : 'Click to copy email'}
            className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] max-w-full whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer group"
          >
            {/* Full email overflows 360px screens — short label on phones. */}
            <span className="sm:hidden">{copied ? 'Copied!' : 'Copy Email'}</span>
            <span className="hidden sm:inline">
              {copied ? (
                'Copied to clipboard!'
              ) : (
                <>
                  Reach us:{' '}
                  <span className="underline underline-offset-1">
                    nehapatel00471@gmail.com
                  </span>
                </>
              )}
            </span>
            {/* 12x12 copy icon (two overlapping rectangles) */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
              aria-hidden="true"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          </button>
          </Magnet>
        </div>
      </div>
    </section>
  );
};
