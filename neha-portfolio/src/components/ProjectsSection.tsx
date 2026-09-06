"use client";

import { projects } from "@/data/projects";
import ProjectRow from "./ProjectRow";

export default function ProjectsSection() {
  const filterCategories = [
    {
      label: "TIMEFRAME",
      values: ["2022–2024"],
    },
    {
      label: "DISCIPLINE",
      values: [
        "Branding",
        "UI/UX",
        "Product Design",
        "Motion",
        "E-commerce",
        "Dashboard",
      ],
    },
    {
      label: "TOOLS",
      values: ["Figma", "Framer", "After Effects", "Webflow", "Principle"],
    },
    {
      label: "INDUSTRY",
      values: ["FinTech", "Retail", "Healthcare", "Travel", "Entertainment"],
    },
  ];

  return (
    <section id="projects" className="py-24 md:py-32 lg:py-40 bg-background">
      {/* Header area — full width with padding */}
      <div className="px-6 md:px-10 lg:px-16 xl:px-20">
        {/* Heading */}
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="text-accent text-xl">↗</span>
          <h2 className="text-display-sm font-extrabold">Projects</h2>
        </div>

        {/* Meta/Filter Label Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10">
          {filterCategories.map((cat) => (
            <div key={cat.label}>
              <p className="text-meta text-foreground-muted/60 mb-3">
                {cat.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {cat.values.map((val) => (
                  <span
                    key={val}
                    className="text-[0.7rem] font-medium px-2.5 py-1 rounded-full border border-foreground/10 text-foreground/70"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-foreground/8" />
      </div>

      {/* Project Rows — full width, edge to edge */}
      <div className="w-full">
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
