import React, { useState } from 'react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('nehapatel00471@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <footer
      id="contact"
      className="relative z-10 w-full min-h-[80vh] text-white px-6 sm:px-12 lg:px-20 py-20 sm:py-32 flex flex-col justify-between border-t border-white/10 scroll-mt-10 overflow-hidden"
      style={{ background: '#0C0C0C' }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-white/80" />
          <span className="text-xs uppercase tracking-[0.2em] text-white font-medium">
            Let’s Connect
          </span>
        </div>

        <h2
          className="rachel-serif font-light tracking-tight mb-8 text-balance"
          style={{
            fontSize: 'clamp(2rem, 8vw, 4.5rem)',
            lineHeight: 1.1,
          }}
        >
          Ready to make your product{' '}
          <span className="italic text-neutral-300">unforgettable</span>?
        </h2>

        <p className="text-base sm:text-lg text-neutral-400 max-w-xl mb-10 sm:mb-12">
          I’m currently available for freelance design projects, design system architecture, and full-time UI/UX opportunities.
        </p>

        {/* Contact actions — full-width tap targets on phones */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 mb-16 sm:mb-20">
          <a
            href="mailto:nehapatel00471@gmail.com"
            className="inline-flex items-center justify-center bg-white text-black px-7 py-3.5 rounded-full text-sm font-medium hover:bg-neutral-200 transition-colors w-full sm:w-auto"
          >
            Send an Email
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center justify-center border border-white/20 text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer w-full sm:w-auto break-all"
          >
            {copied ? 'Copied to Clipboard!' : 'Copy: nehapatel00471@gmail.com'}
          </button>

          <a
            href="/Neha_Patel_Resume.pdf"
            download="Neha_Patel_Resume.pdf"
            className="inline-flex items-center justify-center border border-white/20 text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-white/10 transition-colors w-full sm:w-auto"
          >
            Download Resume (PDF)
          </a>
        </div>

        {/* Social Links Grid — same layout, Rachel-style hover */}
        <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-sm text-neutral-400">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="https://www.linkedin.com/in/nehafolio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e65f2e] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.behance.net/nehafoliox"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e65f2e] transition-colors"
            >
              Behance
            </a>
            <a
              href="https://github.com/nehafoliox"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e65f2e] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://x.com/nehafolio?s=11"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e65f2e] transition-colors"
            >
              X
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500">
            <span className="font-bold">Designed + Coded with</span>
            <button
              type="button"
              onClick={() => setLiked((v) => !v)}
              aria-label="Like"
              aria-pressed={liked}
              className="inline-flex items-center justify-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill={liked ? '#e65f2e' : 'none'}
                stroke={liked ? '#e65f2e' : 'currentColor'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`heart-hover transition-all duration-300 ${
                  liked ? 'text-[#e65f2e]' : 'hover:text-[#e65f2e]'
                }`}
                aria-label="love"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>
            <span>by Neha</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactSection;
