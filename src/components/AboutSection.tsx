import React from 'react';
import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';

const ABOUT_TEXT =
  'With more than 4 years of experience in design, I focus on Web Design, User Experience, and UX Research. I truly enjoy working with businesses that aim to stand out and present their best image. Beyond design, I bring those ideas to life through Design Engineering and AI-Assisted Development, blending creativity with technology to build experiences from concept to reality.';

const DECO = {
  moon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
  object:
    'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
  lego: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
  group:
    'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
};

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 flex flex-col items-center justify-center overflow-hidden scroll-mt-20"
    >
      {/* Top-left: Moon */}
      <FadeIn
        delay={0.1}
        duration={0.9}
        x={-80}
        y={0}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none opacity-60 sm:opacity-100"
      >
        <img
          src={DECO.moon}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-[72px] sm:w-[120px] lg:w-[210px] h-auto object-contain select-none"
          draggable={false}
        />
      </FadeIn>

      {/* Bottom-left: 3D object */}
      <FadeIn
        delay={0.25}
        duration={0.9}
        x={-80}
        y={0}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none opacity-60 sm:opacity-100"
      >
        <img
          src={DECO.object}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-[64px] sm:w-[110px] lg:w-[180px] h-auto object-contain select-none"
          draggable={false}
        />
      </FadeIn>

      {/* Top-right: Lego */}
      <FadeIn
        delay={0.15}
        duration={0.9}
        x={80}
        y={0}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none opacity-60 sm:opacity-100"
      >
        <img
          src={DECO.lego}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-[72px] sm:w-[120px] lg:w-[210px] h-auto object-contain select-none"
          draggable={false}
        />
      </FadeIn>

      {/* Bottom-right: 3D group */}
      <FadeIn
        delay={0.3}
        duration={0.9}
        x={80}
        y={0}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none opacity-60 sm:opacity-100"
      >
        <img
          src={DECO.group}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-[80px] sm:w-[130px] lg:w-[220px] h-auto object-contain select-none"
          draggable={false}
        />
      </FadeIn>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-14 md:gap-16 max-w-4xl mx-auto text-center px-2">
        <FadeIn delay={0} y={40} className="text-center">
          <h2
            className="font-black uppercase leading-[0.95] tracking-tight text-center text-white text-balance break-words"
            style={{ fontSize: 'clamp(2.75rem, 14vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-10 sm:gap-20 md:gap-24">
          <AnimatedText
            text={ABOUT_TEXT}
            className="font-normal text-center leading-relaxed max-w-[560px]"
            style={{
              color: '#FFFFFF',
              fontSize: 'clamp(1rem, 2vw, 1.35rem)',
              fontFamily: "'Kanit', sans-serif",
            }}
          />
          <FadeIn delay={0.1}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
