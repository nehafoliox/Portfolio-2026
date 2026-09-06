import React, { useState } from 'react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

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
      className="relative z-10 w-full min-h-[80vh] text-white px-6 sm:px-12 lg:px-20 py-24 sm:py-32 flex flex-col justify-between border-t border-white/10"
      style={{ background: '#0C0C0C' }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-white/80" />
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium">
            Let’s Connect
          </span>
        </div>

        <h2
          className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight mb-8"
          style={{ fontFamily: "'Kanit', sans-serif" }}
        >
          Ready to make your product{' '}
          <span className="italic text-neutral-300" style={{ fontFamily: "'Kanit', sans-serif" }}>unforgettable</span>?
        </h2>

        <p className="text-lg text-neutral-400 max-w-xl mb-12">
          I’m currently available for freelance design projects, design system architecture, and full-time UI/UX opportunities.
        </p>

        {/* Contact actions */}
        <div className="flex flex-wrap items-center gap-4 mb-20">
          <a
            href="mailto:nehapatel00471@gmail.com"
            className="inline-flex items-center justify-center bg-white text-black px-7 py-3.5 rounded-full text-sm font-medium hover:bg-neutral-200 transition-colors"
          >
            Send an Email
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center justify-center border border-white/20 text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer"
          >
            {copied ? 'Copied to Clipboard!' : 'Copy: nehapatel00471@gmail.com'}
          </button>

          <a
            href="/Neha_Patel_Resume.pdf"
            download="Neha_Patel_Resume.pdf"
            className="inline-flex items-center justify-center border border-white/20 text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Download Resume (PDF)
          </a>
        </div>

        {/* Social Links Grid */}
        <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-sm text-neutral-400">
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/nehafolio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.behance.net/nehafoliox"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Behance
            </a>
            <a
              href="https://www.instagram.com/nehafoliox/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>

          <div className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Neha Patel. Designed with intention.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactSection;
