import React from 'react';
import FadeIn from './FadeIn';

const SERVICES = [
  {
    id: '01',
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
  {
    id: '02',
    name: 'UI/UX Design',
    description:
      'Designing intuitive interfaces and experiences that are easy and enjoyable to use.',
  },
  {
    id: '03',
    name: 'UX Research',
    description:
      'Understanding users, their needs, and their problems to create better design decisions.',
  },
  {
    id: '04',
    name: 'Design Engineering',
    description:
      'Taking designs from Figma to functional, responsive websites with clean implementation.',
  },
  {
    id: '05',
    name: 'AI-Assisted Development',
    description:
      'Using modern AI-powered workflows to turn designs into functional digital experiences faster.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative w-full bg-[#FFFFFF] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 scroll-mt-10"
    >
      <FadeIn>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-12 sm:mb-20 md:mb-28 leading-[0.95] tracking-tight text-balance break-words"
          style={{ fontSize: 'clamp(2.75rem, 14vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <FadeIn
            key={service.id}
            delay={i * 0.1}
            className="flex items-start sm:items-center gap-4 sm:gap-10 py-7 sm:py-10 md:py-12 border-t last:border-b"
            style={{ borderColor: 'rgba(12, 12, 12, 0.15)' }}
          >
            <span
              className="font-black text-[#0C0C0C] leading-none shrink-0"
              style={{ fontSize: 'clamp(2.5rem, 12vw, 140px)' }}
            >
              {service.id}
            </span>
            <div className="flex flex-col gap-2">
              <h3
                className="font-medium uppercase text-[#0C0C0C]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {service.name}
              </h3>
              <p
                className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]"
                style={{
                  fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                  opacity: 0.6,
                }}
              >
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
