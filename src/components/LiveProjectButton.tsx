import React from 'react';

type LiveProjectButtonProps = {
  href?: string;
  label?: string;
  className?: string;
};

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  href = '#',
  label = 'Live Project',
  className = '',
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-5 py-2 text-xs sm:px-10 sm:py-3.5 sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-200 whitespace-nowrap ${className}`}
    >
      {label}
    </a>
  );
};

export default LiveProjectButton;
