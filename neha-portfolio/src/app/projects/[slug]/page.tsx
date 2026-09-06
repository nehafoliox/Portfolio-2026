import { notFound } from "next/navigation";
import Link from "next/link";
import {
  projects,
  getProjectBySlug,
  getAdjacentProjects,
} from "@/data/projects";

// Generate static params for all projects
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.name} — Neha | UI/Product Designer`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <main className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 nav-fixed py-4">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-caption font-medium hover:text-accent transition-colors duration-300"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Projects
          </Link>
          <span className="text-meta font-bold tracking-widest">N.</span>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-8">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="text-meta text-foreground-muted">
                  {project.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-foreground/20" />
                <span className="text-meta text-foreground-muted">
                  {project.year}
                </span>
                <span className="w-1 h-1 rounded-full bg-foreground/20" />
                <span className="text-meta text-foreground-muted">
                  {project.discipline}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-display-sm md:text-display font-extrabold mb-6">
                {project.name}
              </h1>

              {/* Description */}
              <p className="text-body-lg text-foreground-muted max-w-2xl">
                {project.description}
              </p>
            </div>

            {/* Details sidebar */}
            <div className="md:col-span-3 md:col-start-10">
              <div className="space-y-6">
                <div>
                  <p className="text-meta text-foreground-muted mb-2">
                    SERVICES
                  </p>
                  <p className="text-caption">{project.services}</p>
                </div>
                <div>
                  <p className="text-meta text-foreground-muted mb-2">TOOLS</p>
                  <p className="text-caption">{project.tools}</p>
                </div>
                <div>
                  <p className="text-meta text-foreground-muted mb-2">
                    INDUSTRY
                  </p>
                  <p className="text-caption">{project.industry}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image Placeholder */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div
            className="w-full aspect-video rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)`,
            }}
          >
            <div className="text-center">
              <span className="text-heading font-bold text-white/90">
                {project.name}
              </span>
              <p className="text-meta text-white/50 mt-2">
                PROJECT HERO IMAGE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <h2 className="text-meta text-accent mb-4">THE CHALLENGE</h2>
              <p className="text-body-lg text-foreground-muted leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div>
              <h2 className="text-meta text-accent mb-4">THE SOLUTION</h2>
              <p className="text-body-lg text-foreground-muted leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-bg-alt">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <h2 className="text-heading font-bold mb-12">Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.process.map((step, i) => (
              <div
                key={i}
                className="flex gap-4 p-6 rounded-xl bg-background border border-foreground/5"
              >
                <span className="text-meta text-accent font-bold mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-caption text-foreground-muted">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Placeholders */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <h2 className="text-heading font-bold mb-12">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.gallery.map((_, i) => (
              <div
                key={i}
                className={`aspect-[4/3] rounded-2xl flex items-center justify-center ${
                  i === 0 ? "md:col-span-2 aspect-video" : ""
                }`}
                style={{
                  background: `linear-gradient(${135 + i * 45}deg, var(--color-accent-light) 0%, var(--color-accent) 100%)`,
                }}
              >
                <p className="text-meta text-white/60">
                  GALLERY IMAGE {i + 1}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 md:py-24 bg-surface-dark text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <h2 className="text-heading font-bold mb-12">Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.results.map((result, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
                <span className="text-display-sm font-extrabold text-accent block mb-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-body-lg text-white/70">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Navigation */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-stretch gap-6">
            {prev && (
              <Link
                href={`/projects/${prev.slug}`}
                className="flex-1 group p-8 rounded-2xl border border-foreground/5 hover:border-accent/30 hover:bg-accent/[0.03] transition-all duration-300"
              >
                <span className="text-meta text-foreground-muted mb-2 block">
                  ← PREVIOUS PROJECT
                </span>
                <span className="text-subheading font-bold group-hover:text-accent transition-colors duration-300">
                  {prev.name}
                </span>
              </Link>
            )}
            {next && (
              <Link
                href={`/projects/${next.slug}`}
                className="flex-1 group p-8 rounded-2xl border border-foreground/5 hover:border-accent/30 hover:bg-accent/[0.03] transition-all duration-300 text-right"
              >
                <span className="text-meta text-foreground-muted mb-2 block">
                  NEXT PROJECT →
                </span>
                <span className="text-subheading font-bold group-hover:text-accent transition-colors duration-300">
                  {next.name}
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
