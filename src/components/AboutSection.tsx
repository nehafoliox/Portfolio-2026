import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';
import Magnet from './Magnet';

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

const SKILLS = [
  'Web Design',
  'UI/UX',
  'UX Research',
  'Design Systems',
  'Prototyping',
  'Design Engineering',
  'AI Workflows',
  'Motion',
];

const STATS = [
  { value: 4, suffix: '+', label: 'Years of experience' },
  { value: 30, suffix: '+', label: 'Screens designed' },
  { value: 100, suffix: '+', label: 'Components built' },
  { value: 5, suffix: '', label: 'Featured projects' },
];

/* Floats children with the cursor at a given depth (px at full deflection). */
function Float({
  nx,
  ny,
  depth,
  className,
  children,
}: {
  nx: MotionValue<number>;
  ny: MotionValue<number>;
  depth: number;
  className?: string;
  children: React.ReactNode;
}) {
  const x = useTransform(nx, (v) => v * depth);
  const y = useTransform(ny, (v) => v * depth);
  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}

function Stat({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    // Stagger so the numbers roll left → right.
    const delay = window.setTimeout(() => {
      const start = performance.now();
      const dur = 1300;
      const tick = (now: number) => {
        const t = Math.min((now - start) / dur, 1);
        setN(Math.round((1 - Math.pow(1 - t, 3)) * value));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, index * 140);
    return () => {
      window.clearTimeout(delay);
      cancelAnimationFrame(raf);
    };
  }, [inView, value, index]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5 px-4 py-6 sm:py-8 text-center">
      <span className="font-black tabular-nums leading-none text-white" style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}>
        {n}
        <span className="text-[#A78BFA]">{suffix}</span>
      </span>
      <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-white/50 font-medium">
        {label}
      </span>
    </div>
  );
}

export const AboutSection: React.FC = () => {
  const secRef = useRef<HTMLElement>(null);
  // Cursor spotlight (px) + normalized drift (-0.5 … 0.5) for parallax.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(167,139,250,0.13), transparent 70%)`;

  const { scrollYProgress } = useScroll({ target: secRef, offset: ['start end', 'end start'] });
  const markX = useTransform(scrollYProgress, [0, 1], ['4%', '-24%']);

  const onMouseMove = (e: React.MouseEvent) => {
    const r = secRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
    nx.set((e.clientX - r.left) / r.width - 0.5);
    ny.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="about"
      ref={secRef}
      onMouseMove={onMouseMove}
      className="relative w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-24 sm:py-32 flex flex-col items-center justify-center overflow-hidden scroll-mt-20"
    >
      {/* Giant scrolling watermark */}
      <div aria-hidden="true" className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
        <motion.div
          style={{ x: markX, WebkitTextStroke: '1px rgba(255,255,255,0.08)', color: 'transparent' }}
          className="font-black uppercase whitespace-nowrap leading-none select-none"
        >
          <span style={{ fontSize: '24vw' }}>Neha&thinsp;•&thinsp;Neha&thinsp;•&thinsp;</span>
        </motion.div>
      </div>

      {/* Cursor spotlight */}
      <motion.div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: glow }} />

      {/* Deco corners — entrance + cursor parallax at different depths */}
      <FadeIn
        delay={0.1}
        duration={0.9}
        x={-80}
        y={0}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none opacity-60 sm:opacity-100"
      >
        <Float nx={nx} ny={ny} depth={44}>
          <img
            src={DECO.moon}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-[72px] sm:w-[120px] lg:w-[210px] h-auto object-contain select-none"
            draggable={false}
          />
        </Float>
      </FadeIn>

      <FadeIn
        delay={0.25}
        duration={0.9}
        x={-80}
        y={0}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none opacity-60 sm:opacity-100"
      >
        <Float nx={nx} ny={ny} depth={-28}>
          <img
            src={DECO.object}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-[64px] sm:w-[110px] lg:w-[180px] h-auto object-contain select-none"
            draggable={false}
          />
        </Float>
      </FadeIn>

      <FadeIn
        delay={0.15}
        duration={0.9}
        x={80}
        y={0}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none opacity-60 sm:opacity-100"
      >
        <Float nx={nx} ny={ny} depth={-36}>
          <img
            src={DECO.lego}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-[72px] sm:w-[120px] lg:w-[210px] h-auto object-contain select-none"
            draggable={false}
          />
        </Float>
      </FadeIn>

      <FadeIn
        delay={0.3}
        duration={0.9}
        x={80}
        y={0}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none opacity-60 sm:opacity-100"
      >
        <Float nx={nx} ny={ny} depth={24}>
          <img
            src={DECO.group}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-[80px] sm:w-[130px] lg:w-[220px] h-auto object-contain select-none"
            draggable={false}
          />
        </Float>
      </FadeIn>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 max-w-4xl mx-auto text-center px-2 w-full">
        {/* Availability pill */}
        <FadeIn delay={0} y={20}>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-white/70 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for freelance
          </span>
        </FadeIn>

        <FadeIn delay={0.05} y={40} className="relative text-center">
          <h2
            className="font-black uppercase leading-[0.95] tracking-tight text-center text-white text-balance break-words"
            style={{ fontSize: 'clamp(2.75rem, 14vw, 160px)' }}
          >
            About me
          </h2>
          {/* Spinning badge — jumps to contact */}
          <Magnet strength={4} padding={30} className="hidden lg:block absolute -right-36 top-1/2 -translate-y-1/2">
            <a
              href="#contact"
              aria-label="Go to contact"
              className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] hover:border-[#A78BFA]/60 hover:bg-[#A78BFA]/10 transition-colors"
            >
              <svg viewBox="0 0 120 120" className="about-spin absolute inset-0 h-full w-full" aria-hidden="true">
                <defs>
                  <path id="about-circle" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
                </defs>
                <text fontSize="10.5" letterSpacing="2.6" fill="rgba(255,255,255,0.7)" style={{ fontFamily: "'Kanit', sans-serif" }}>
                  <textPath href="#about-circle">OPEN FOR PROJECTS • LET'S TALK •</textPath>
                </text>
              </svg>
              <ArrowDown className="h-6 w-6 text-white/80" aria-hidden="true" />
            </a>
          </Magnet>
        </FadeIn>

        <AnimatedText
          text={ABOUT_TEXT}
          className="font-normal text-center leading-relaxed max-w-[560px]"
          style={{
            color: '#FFFFFF',
            fontSize: 'clamp(1rem, 2vw, 1.35rem)',
            fontFamily: "'Kanit', sans-serif",
          }}
        />

        {/* Count-up stats */}
        <FadeIn delay={0.05} className="w-full max-w-3xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
            {STATS.map((s, i) => (
              <div key={s.label} className="bg-[#0C0C0C] hover:bg-white/[0.03] transition-colors">
                <Stat value={s.value} suffix={s.suffix} label={s.label} index={i} />
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Magnetic skill chips */}
        <FadeIn delay={0.05} className="flex flex-col items-center gap-4">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-white/40 font-medium">
            Things I obsess over
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-2xl">
            {SKILLS.map((skill) => (
              <Magnet key={skill} strength={5} padding={20}>
                <span className="inline-flex cursor-default items-center rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[13px] sm:text-sm text-white/75 hover:border-[#A78BFA]/60 hover:bg-[#A78BFA]/10 hover:text-white hover:-rotate-2 transition-all duration-200 select-none">
                  {skill}
                </span>
              </Magnet>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Magnet strength={3} padding={40}>
            <ContactButton />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutSection;
