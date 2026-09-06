"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectRowProps {
  project: Project;
}

export default function ProjectRow({ project }: ProjectRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={rowRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative border-b border-foreground/[0.06]"
      style={{
        backgroundColor: isHovered || project.featured
          ? "var(--color-surface-dark)"
          : "transparent",
        color: isHovered || project.featured
          ? "var(--color-white)"
          : "var(--color-fg)",
        transition: "background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: "none",
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block px-6 md:px-10 lg:px-16 xl:px-20 py-5 md:py-7"
      >
        <div className="flex items-center gap-4 md:gap-6">
          {/* Icon */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[0.7rem]">▶</span>
            {project.featured && (
              <span
                className="w-6 h-6 rounded flex items-center justify-center shrink-0"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                <span className="text-[0.5rem] font-extrabold" style={{ color: "var(--color-surface-dark)" }}>
                  N
                </span>
              </span>
            )}
          </div>

          {/* Project name + services */}
          <div className="flex-1 flex items-center gap-3 min-w-0">
            <h3 className="text-[clamp(0.95rem,1.3vw,1.15rem)] font-bold whitespace-nowrap">
              {project.name}
            </h3>
            <span
              className="hidden sm:inline"
              style={{ opacity: 0.25 }}
            >
              —
            </span>
            <span
              className="text-caption truncate hidden sm:block"
              style={{ opacity: 0.5 }}
            >
              {project.services}
            </span>
          </div>

          {/* Year */}
          <span
            className="hidden lg:block text-meta shrink-0"
            style={{ opacity: 0.3 }}
          >
            {project.year}
          </span>

          {/* CTA button */}
          <div className="shrink-0 ml-auto pl-4">
            <span
              className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-wider px-4 py-2 rounded-full whitespace-nowrap"
              style={{
                backgroundColor: isHovered || project.featured
                  ? "var(--color-accent)"
                  : "transparent",
                color: isHovered || project.featured
                  ? "var(--color-surface-dark)"
                  : "inherit",
                border: isHovered || project.featured
                  ? "1px solid var(--color-accent)"
                  : "1px solid currentColor",
                borderOpacity: 0.15,
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              View Project
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        </div>
      </Link>

      {/* Hover Preview Image */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 3 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed pointer-events-none z-50 hidden md:block"
            style={{
              left:
                mousePos.x +
                (rowRef.current?.getBoundingClientRect().left ?? 0) -
                140,
              top:
                mousePos.y +
                (rowRef.current?.getBoundingClientRect().top ?? 0) -
                220,
            }}
          >
            <div
              className="w-[220px] h-[300px] rounded-xl overflow-hidden shadow-2xl"
              style={{
                border: "4px solid var(--color-accent)",
                boxShadow: "0 25px 50px -12px rgba(205, 255, 80, 0.25)",
                transform: "rotate(-2deg)",
              }}
            >
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-3 p-4"
                style={{
                  background: `linear-gradient(145deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)`,
                }}
              >
                <span
                  className="text-[1.5rem] font-extrabold"
                  style={{ color: "rgba(10,10,10,0.9)" }}
                >
                  {project.name}
                </span>
                <span
                  className="text-[0.6rem] font-semibold uppercase tracking-widest"
                  style={{ color: "rgba(10,10,10,0.5)" }}
                >
                  {project.category}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
