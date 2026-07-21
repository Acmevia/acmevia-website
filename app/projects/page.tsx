import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ProjectTimeline from "@/components/projects/ProjectTimeline";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects — Systems shipped across five regions",
  description:
    "A connected timeline of Acmevia engagements — ERP, e-commerce, LMS, DMS, and mobile — delivered from Sri Lanka to Australia, Europe, and North America.",
  alternates: { canonical: "/projects/" },
};

export default function ProjectsPage() {
  return (
    <>
      <section className="pb-10 pt-40">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Projects</p>
            <h1 className="mt-4 max-w-4xl font-display text-hero font-semibold text-paper">
              Every system we ship extends the same line.
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-paper/60">
              Six engagements, five regions, one connected trace. Scroll — the
              circuit wires itself as you go.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Project timeline" className="pb-section">
        <div className="container-page">
          <ProjectTimeline projects={projects} />
        </div>
      </section>

      <BreadcrumbSchema items={[{ name: "Projects", path: "/projects/" }]} />
    </>
  );
}
