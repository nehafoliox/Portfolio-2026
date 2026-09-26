import React from 'react';
import { FunSection } from './FunSection';
import { ContactSection } from './ContactSection';

interface FunPageProps {
  onBack: () => void;
}

export const FunPage: React.FC<FunPageProps> = ({ onBack }) => {
  return (
    <div className="relative w-full min-h-screen" style={{ background: '#0C0C0C' }}>
      <div className="max-w-[1800px] mx-auto w-full px-6 sm:px-8 md:px-10 pt-24 sm:pt-28">
        <button
          type="button"
          onClick={onBack}
          className="rachel-mono text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-[#e65f2e] transition-colors cursor-pointer"
        >
          ← Back to work
        </button>
      </div>
      <FunSection />
      <ContactSection />
    </div>
  );
};

export default FunPage;
