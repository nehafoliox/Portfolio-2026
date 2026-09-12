import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const DURATION_MS = 2400;

type LoaderProps = {
  onComplete: () => void;
};

/* ---------- Purple-haired chaser (echoes Neha's character) ---------- */
function Girl({ celebrating }: { celebrating: boolean }) {
  return (
    <svg
      viewBox="0 0 120 150"
      className="h-auto w-full"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      {/* back hair mass */}
      <ellipse cx="58" cy="50" rx="34" ry="38" fill="#4E3E63" />
      {/* legs */}
      <g
        className="loader-anim"
        style={{
          transformBox: 'fill-box',
          transformOrigin: 'top center',
          animation: celebrating ? 'none' : 'loader-leg-a 0.45s ease-in-out infinite',
        }}
      >
        <line x1="54" y1="106" x2="46" y2="132" stroke="#33303E" strokeWidth="11" strokeLinecap="round" />
        <ellipse cx="44" cy="134" rx="9" ry="5" fill="#232228" />
      </g>
      <g
        className="loader-anim"
        style={{
          transformBox: 'fill-box',
          transformOrigin: 'top center',
          animation: celebrating ? 'none' : 'loader-leg-b 0.45s ease-in-out infinite',
        }}
      >
        <line x1="68" y1="106" x2="78" y2="130" stroke="#3D3A4A" strokeWidth="11" strokeLinecap="round" />
        <ellipse cx="80" cy="132" rx="9" ry="5" fill="#232228" />
      </g>
      {/* arms — reaching forward while running, thrown up in celebration */}
      {celebrating ? (
        <g stroke="#9B6AC0" strokeWidth="10" strokeLinecap="round">
          <line x1="46" y1="86" x2="30" y2="56" />
          <line x1="78" y1="86" x2="94" y2="56" />
        </g>
      ) : (
        <g
          className="loader-anim"
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'left center',
            animation: 'loader-arm 0.45s ease-in-out infinite',
          }}
        >
          <line x1="50" y1="86" x2="30" y2="96" stroke="#9B6AC0" strokeWidth="10" strokeLinecap="round" />
          <line x1="72" y1="86" x2="102" y2="78" stroke="#9B6AC0" strokeWidth="10" strokeLinecap="round" />
          <circle cx="104" cy="78" r="6" fill="#F7C9A3" />
        </g>
      )}
      {celebrating && (
        <g fill="#F7C9A3">
          <circle cx="29" cy="53" r="6" />
          <circle cx="95" cy="53" r="6" />
        </g>
      )}
      {/* jacket body */}
      <rect x="42" y="76" width="40" height="34" rx="11" fill="#9B6AC0" />
      <line x1="62" y1="80" x2="62" y2="108" stroke="#7A53A3" strokeWidth="3" />
      {/* head */}
      <circle cx="62" cy="52" r="21" fill="#F7C9A3" />
      {/* fringe + side lock */}
      <path
        d="M41 50 Q44 28 62 26 Q82 26 84 48 Q76 38 69 43 Q63 34 56 43 Q47 40 41 50 Z"
        fill="#5B4A73"
      />
      <path d="M82 44 Q88 62 84 78 L76 78 Q80 62 78 48 Z" fill="#5B4A73" />
      {/* headphone band */}
      <path d="M38 44 Q60 10 86 42" stroke="#232228" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* cat ears */}
      <polygon points="42,28 36,8 54,20" fill="#3A3348" stroke="#B9A7F2" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="38,22 42,12 49,19" fill="#CBB8FF" />
      <polygon points="82,26 90,6 72,18" fill="#3A3348" stroke="#B9A7F2" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="84,20 86,11 77,17" fill="#CBB8FF" />
      {/* face */}
      <ellipse cx="69" cy="55" rx="3" ry="4" fill="#2A2233" />
      <ellipse cx="80" cy="55" rx="3" ry="4" fill="#2A2233" />
      <circle cx="70" cy="54" r="1" fill="#fff" />
      <circle cx="81" cy="54" r="1" fill="#fff" />
      <ellipse cx="88" cy="62" rx="4" ry="2.5" fill="#F08A8A" opacity="0.55" />
      <ellipse cx="54" cy="62" rx="4" ry="2.5" fill="#F08A8A" opacity="0.45" />
      <path d="M68 66 Q73 69 78 66" stroke="#B06A4A" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- The cat being chased ---------- */
function Cat({ celebrating }: { celebrating: boolean }) {
  return (
    <svg
      viewBox="0 0 90 64"
      className="h-auto w-full"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      {/* tail */}
      <g
        className="loader-anim"
        style={{
          transformBox: 'fill-box',
          transformOrigin: 'bottom right',
          animation: 'loader-tail 0.5s ease-in-out infinite',
        }}
      >
        <path d="M20 46 Q4 40 8 22" stroke="#EDEDF2" strokeWidth="7" fill="none" strokeLinecap="round" />
      </g>
      {/* legs */}
      <g
        className="loader-anim"
        stroke="#D9D9E2"
        strokeWidth="6"
        strokeLinecap="round"
        style={{
          transformBox: 'fill-box',
          transformOrigin: 'top center',
          animation: celebrating ? 'none' : 'loader-leg-a 0.4s ease-in-out infinite',
        }}
      >
        <line x1="36" y1="48" x2="32" y2="60" />
        <line x1="56" y1="48" x2="60" y2="60" />
      </g>
      {/* body */}
      <ellipse cx="46" cy="42" rx="24" ry="14" fill="#EDEDF2" />
      <path d="M34 32 Q36 36 34 40" stroke="#C6C6D2" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M42 30 Q44 34 42 38" stroke="#C6C6D2" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* collar + bell */}
      <path d="M58 38 L60 50" stroke="#A78BFA" strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="52" r="3.5" fill="#E8B84B" />
      {/* head */}
      <circle cx="68" cy="28" r="14" fill="#EDEDF2" />
      <polygon points="58,20 55,5 66,14" fill="#EDEDF2" />
      <polygon points="78,20 81,5 70,14" fill="#EDEDF2" />
      <polygon points="59,15 58,9 63,13" fill="#F2A0C4" />
      <polygon points="77,15 78,9 73,13" fill="#F2A0C4" />
      {celebrating ? (
        <g stroke="#2A2233" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M60 28 Q63 31 66 28" />
          <path d="M70 28 Q73 31 76 28" />
        </g>
      ) : (
        <g fill="#2A2233">
          <circle cx="63" cy="28" r="2.2" />
          <circle cx="73" cy="28" r="2.2" />
        </g>
      )}
      <polygon points="68,33 66,35.5 70,35.5" fill="#F2A0C4" />
      {/* whiskers */}
      <g stroke="#B9B9C4" strokeWidth="1.4" strokeLinecap="round">
        <line x1="52" y1="32" x2="44" y2="30" />
        <line x1="52" y1="36" x2="44" y2="38" />
        <line x1="84" y1="32" x2="90" y2="30" />
      </g>
    </svg>
  );
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  // One steady clock drives everything — counter, girl and cat all
  // move at the same constant speed and finish together at 100.
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const total = reduced ? 400 : DURATION_MS;
    let raf = 0;
    let timer = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const linear = Math.min((now - start) / total, 1);
      setProgress(Math.round(linear * 100));
      if (linear < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        timer = window.setTimeout(() => setLeaving(true), 250);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, []);

  const handleExitComplete = () => {
    if (leaving) onComplete();
  };

  const stars = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        left: (i * 53 + 11) % 100,
        top: (i * 29 + 7) % 55,
        size: 2 + ((i * 7) % 3),
        delay: (i % 5) * 0.5,
      })),
    []
  );

  // You + cat run side by side at a fixed gap — identical speed,
  // synced with the counter. Both in frame the whole way.
  const girlLeft = 6 + (56 - 6) * (progress / 100);
  const catLeft = girlLeft + 20;

  return (
    <motion.div
      aria-label="Loading portfolio"
      role="status"
      className="fixed inset-0 z-[100] bg-[#0c0c0c]"
      initial={{ y: 0 }}
      animate={leaving ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={handleExitComplete}
    >
      {/* stars */}
      {stars.map((s, i) => (
        <span
          key={i}
          className="loader-anim absolute rounded-full bg-white/50"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animation: `loader-twinkle 2.2s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      {/* moon */}
      <div
        aria-hidden="true"
        className="absolute right-[8%] top-[10%] h-10 w-10 rounded-full bg-[#E8E4F5]"
        style={{ boxShadow: '0 0 30px rgba(232,228,245,0.35)' }}
      />

      {/* Top-left label */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between px-5 sm:px-8 md:px-10 pt-5 sm:pt-6">
        <span
          className="uppercase text-white/50 font-medium"
          style={{ fontSize: '12px', letterSpacing: '0.35em', fontFamily: "'Kanit', sans-serif" }}
        >
          Portfolio
        </span>
      </div>

      {/* Chase scene — steady run left to right, fixed gap, no catch */}
      <div className="absolute inset-x-4 sm:inset-x-10 bottom-24 h-60">
        {/* ground */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/15" />

        {/* dust puffs behind the girl */}
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="loader-anim absolute rounded-full bg-white/25"
            style={{
              left: `calc(${girlLeft}% - 14px)`,
              bottom: 6,
              width: 10,
              height: 10,
              animation: `loader-dust 0.7s ease-out ${i * 0.22}s infinite`,
            }}
          />
        ))}

        {/* girl */}
        <div
          className="absolute bottom-1 w-20 sm:w-24"
          style={{ left: `${girlLeft}%`, transform: 'rotate(3deg)' }}
        >
          <div
            className="loader-anim"
            style={{ animation: 'loader-bob 0.45s ease-in-out infinite' }}
          >
            <Girl celebrating={false} />
          </div>
          {/* shadow */}
          <div className="mx-auto mt-1 h-[7px] w-3/5 rounded-[50%] bg-black/70 blur-[3px]" />
        </div>

        {/* cat — same speed, fixed gap ahead */}
        <div
          className="absolute bottom-2 w-12 sm:w-14"
          style={{ left: `${catLeft}%` }}
        >
          <div
            className="loader-anim"
            style={{ animation: 'loader-bob-cat 0.4s ease-in-out infinite' }}
          >
            <Cat celebrating={false} />
          </div>
          <div className="mx-auto mt-1 h-[5px] w-3/5 rounded-[50%] bg-black/70 blur-[3px]" />
        </div>
      </div>

      {/* Bottom-right counter */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-end px-5 sm:px-8 md:px-10 pb-8 sm:pb-10">
        <span
          className="tabular-nums select-none leading-none"
          style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 500, color: '#fff', fontSize: 'clamp(2.5rem, 8vw, 5rem)', letterSpacing: '0.03em' }}
        >
          {String(progress).padStart(3, '0')}
        </span>
      </div>

      {/* Bottom progress */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/10">
        <div
          className="h-full bg-white/90 transition-[width] duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
};

export default Loader;
