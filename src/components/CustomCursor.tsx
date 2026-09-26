import React, { useEffect, useRef, useState } from 'react';

function humanize(value: string): string | null {
  const clean = value.replace(/[-_]+/g, ' ').trim().toUpperCase();
  return clean === '' ? null : clean;
}

/**
 * Rachel-style custom cursor: a small orange dot that follows the mouse,
 * grows on links/buttons, and expands into a labeled pill over elements
 * marked with `data-cursor="some-label"`. Desktop (fine pointer) only —
 * renders nothing on touch devices.
 */
export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setEnabled(true);

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.35;
      pos.y += (target.y - pos.y) * 0.35;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const tagged = el?.closest?.('[data-cursor]');
      if (tagged) {
        setLabel(humanize(tagged.getAttribute('data-cursor') ?? ''));
        setHot(false);
        return;
      }
      setLabel(null);
      setHot(Boolean(el?.closest?.('a, button')));
    };
    const onLeave = () => setVisible(false);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  if (!enabled) return null;

  const className = [
    'custom-cursor',
    visible ? 'custom-cursor--on' : '',
    label ? 'custom-cursor--pill' : '',
    hot && !label ? 'custom-cursor--hot' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={dotRef} aria-hidden="true" className={className}>
      {label ? (
        <span className="custom-cursor__label rachel-mono">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          {label}
        </span>
      ) : null}
    </div>
  );
};

export default CustomCursor;
