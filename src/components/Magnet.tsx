import React, { useRef, useState, useCallback } from 'react';

type MagnetProps = {
  children: React.ReactNode;
  strength?: number;
  padding?: number;
  className?: string;
  style?: React.CSSProperties;
};

export const Magnet: React.FC<MagnetProps> = ({
  children,
  strength = 3,
  padding = 40,
  className,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const relX = e.clientX - centerX;
      const relY = e.clientY - centerY;

      const withinX = Math.abs(relX) < rect.width / 2 + padding;
      const withinY = Math.abs(relY) < rect.height / 2 + padding;

      if (withinX && withinY) {
        setIsActive(true);
        setPosition({ x: relX / strength, y: relY / strength });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    },
    [padding, strength]
  );

  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        display: 'inline-block',
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isActive
          ? 'transform 0.3s ease-out'
          : 'transform 0.6s ease-in-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export default Magnet;
