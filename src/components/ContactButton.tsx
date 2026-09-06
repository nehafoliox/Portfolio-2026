import React from 'react';

type ContactButtonProps = {
  href?: string;
  label?: string;
  className?: string;
};

// Same pill treatment as the hero section buttons:
// white pill, black Kanit text, inverts on hover.
export const ContactButton: React.FC<ContactButtonProps> = ({
  href = '#contact',
  label = 'Contact Me',
  className = '',
}) => {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-sm sm:text-base px-8 sm:px-10 py-2.5 sm:py-3 whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer ${className}`}
      style={{ fontFamily: "'Kanit', sans-serif" }}
    >
      {label}
    </a>
  );
};

export default ContactButton;
