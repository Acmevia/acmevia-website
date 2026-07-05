import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import ServiceGlyph from "@/components/ServiceGlyph";
import ServicesIndex from "@/components/services/ServicesIndex";
import FinalCta from "@/components/FinalCta";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — Custom software, delivered end to end",
  description:
    "Custom web and mobile development, WordPress, e-commerce, ERP, CRM, business automation, and UI/UX design. Each service starts with your problem and ends with a measurable outcome.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <>
      {/* Page opener */}
      <section className="border-b border-white/10 pb-16 pt-40">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Services</p>
            <h1 className="mt-4 max-w-4xl font-display text-hero font-semibold text-paper">
              We don't sell technology. We remove problems.
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-paper/60">
              Eight services, one shape: understand the problem, build the
              system, stay until it pays for itself. Pick where it hurts.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container-page grid gap-16 py-20 lg:grid-cols-[280px_1fr]">
        {/* Sticky index (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-32">
            <ServicesIndex
              items={services.map(({ id, index, name }) => ({ id, index, name }))}
            />
          </div>
        </aside>

        {/* Service blocks */}
        <div id="services-list">
          {services.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className={`py-16 ${i > 0 ? "border-t border-white/10" : "pt-0"}`}
            >
              <Reveal>
                <div className="flex items-start justify-between gap-8">
                  <div>
                    <p className="font-mono text-label text-azure">
                      {s.index} / 08
                    </p>
                    <h2 className="mt-3 font-display text-heading font-semibold text-paper">
                      {s.name}
                    </h2>
                  </div>
                  <ServiceGlyph
                    glyph={s.glyph}
                    className="hidden h-20 w-20 shrink-0 text-azure/70 sm:block"
                  />
                </div>
              </Reveal>

              <div className="mt-10 grid gap-10 md:grid-cols-2">
                <Reveal delay={0.05}>
                  <h3 className="eyebrow text-paper/40">The problem</h3>
                  <p className="mt-4 text-body text-paper/70">{s.problem}</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <h3 className="eyebrow text-paper/40">What you get</h3>
                  <ul className="mt-4 space-y-2.5">
                    {s.delivered.map((d) => (
                      <li key={d} className="flex gap-3 text-body text-paper/70">
                        <span aria-hidden="true" className="mt-px font-mono text-azure">
                          /
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <Reveal delay={0.12} className="mt-10 border-l-2 border-azure bg-surface p-6">
                <h3 className="eyebrow text-paper/40">The outcome</h3>
                <p className="mt-3 text-lead text-paper">{s.outcome}</p>
              </Reveal>

              <Reveal delay={0.15} className="mt-8">
                <Magnetic>
                  <Link href="/contact/#book" className="btn btn-ghost">
                    Book a discovery call
                  </Link>
                </Magnetic>
              </Reveal>
            </article>
          ))}

          {/* Ongoing engagement */}
          <Reveal className="border-t border-white/10 py-16">
            <p className="eyebrow">After launch</p>
            <h2 className="mt-3 font-display text-heading font-semibold text-paper">
              Then we stick around.
            </h2>
            <p className="mt-5 max-w-2xl text-body text-paper/70">
              Most clients keep us on a maintenance retainer or a monthly
              support contract after go-live: monitoring, updates, small
              improvements, and a guaranteed response inside 24 hours. Your
              system keeps earning; someone accountable keeps it sharp.
            </p>
          </Reveal>
        </div>
      </div>

      <FinalCta title="Not sure which service fits? Describe the problem." />
    </>
  );
}
