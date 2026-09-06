import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
};

const Char: React.FC<{
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}> = ({ char, index, total, progress }) => {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'pre' }}>
      <span style={{ opacity: 0, visibility: 'hidden' }}>{char}</span>
      <motion.span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity,
          whiteSpace: 'pre',
        }}
      >
        {char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className, style }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Split into words so line breaks only happen at spaces —
  // characters can no longer strand mid-word ("en" / "joy").
  const words = text.split(' ');
  const total = text.length;
  let charIndex = 0;

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wi) => {
        const start = charIndex;
        charIndex += word.length + 1; // +1 accounts for the space separator
        return (
          <span key={wi}>
            <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {word.split('').map((char, ci) => (
                <Char
                  key={ci}
                  char={char}
                  index={start + ci}
                  total={total}
                  progress={scrollYProgress}
                />
              ))}
            </span>
            {wi < words.length - 1 ? ' ' : null}
          </span>
        );
      })}
    </p>
  );
};

export default AnimatedText;
