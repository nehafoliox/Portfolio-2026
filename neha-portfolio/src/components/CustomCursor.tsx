"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const isOnDark = useRef(false);

  const updateCursor = useCallback(() => {
    ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
    ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

    if (dotRef.current) {
      dotRef.current.style.left = `${mouse.current.x}px`;
      dotRef.current.style.top = `${mouse.current.y}px`;
    }

    if (ringRef.current) {
      ringRef.current.style.left = `${ring.current.x}px`;
      ringRef.current.style.top = `${ring.current.y}px`;
    }

    if (labelRef.current) {
      labelRef.current.style.left = `${mouse.current.x}px`;
      labelRef.current.style.top = `${mouse.current.y}px`;
    }

    rafRef.current = requestAnimationFrame(updateCursor);
  }, []);

  useEffect(() => {
    const isTouch = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    ).matches;
    if (isTouch) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Detect if cursor is over a dark section
      const elementUnder = document.elementFromPoint(e.clientX, e.clientY);
      const onDark = !!elementUnder?.closest(".dark-section");

      if (onDark !== isOnDark.current) {
        isOnDark.current = onDark;
        if (dotRef.current && ringRef.current && labelRef.current) {
          if (onDark) {
            dotRef.current.classList.add("cursor-inverted");
            ringRef.current.classList.add("cursor-inverted");
            labelRef.current.classList.add("cursor-inverted");
          } else {
            dotRef.current.classList.remove("cursor-inverted");
            ringRef.current.classList.remove("cursor-inverted");
            labelRef.current.classList.remove("cursor-inverted");
          }
        }
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select"
      );
      const projectRow = target.closest(".project-row");

      if (projectRow) {
        document.body.classList.add("cursor-project");
        document.body.classList.remove("cursor-hover");
      } else if (interactive) {
        document.body.classList.add("cursor-hover");
        document.body.classList.remove("cursor-project");
      } else {
        document.body.classList.remove("cursor-hover", "cursor-project");
      }
    };

    const handleMouseLeave = () => {
      document.body.classList.remove("cursor-hover", "cursor-project");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    rafRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateCursor]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={labelRef} className="cursor-label">
        View
      </div>
    </>
  );
}
