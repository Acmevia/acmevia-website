import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import GlobalMap from "@/components/about/GlobalMap";
import FinalCta from "@/components/FinalCta";
import { capabilities, values } from "@/lib/data";

export const metadata: Metadata = {
  title: "About — A boutique engineering partner in Sri Lanka",
  description:
    "Acmevia builds custom software and SaaS products from Sri Lanka for clients across five regions. Partnership over projects, systems over heroics, automation-first operations.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      {/* Opener */}
      <section className="border-b border-white/10 pb-16 pt-40">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 className="mt-4 max-w-4xl font-display text-hero font-semibold text-paper">
              Small enough to care. Precise enough to trust.
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-paper/60">
              Acmevia is a boutique engineering house in Sri Lanka. We build a
              small number of systems very well, and we stay with them — most
              of our clients are on year two, three, or four with us.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="py-section">
        <div className="container-page grid gap-10 md:grid-cols-2">
          <Reveal className="border-t-2 border-azure pt-8">
            <h2 className="eyebrow">Vision</h2>
            <p className="mt-5 font-display text-title font-medium text-paper">
              To be a leading force in digital innovation — recognized for
              excellence, reliability, and solutions that genuinely change how
              our clients operate.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="border-t-2 border-white/15 pt-8">
            <h2 className="eyebrow text-paper/40">Mission</h2>
            <p className="mt-5 font-display text-title font-medium text-paper/80">
              Simplify processes and empower businesses through reliable,
              scalable, innovative technology — delivered with the discipline
              of a partner, not a vendor.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Capability, not org chart */}
      <section className="border-t border-white/10 bg-surface py-section">
        <div className="container-page">
          <SectionHead
            eyebrow="The team"
            title="Structured as capability, not hierarchy."
            lead="Four functions touch every engagement. You'll know who owns what from day one."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 0.08}
                className="border border-white/10 bg-ink p-7"
              >
                <p className="font-mono text-label text-azure">0{i + 1}</p>
                <h3 className="mt-4 font-display text-lead font-medium text-paper">
                  {c.title}
                </h3>
                <p className="mt-3 text-meta text-paper/55">{c.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-section">
        <div className="container-page">
          <SectionHead eyebrow="How we work" title="Three habits we won't trade." />
          <ul className="mt-14 border-t border-white/10">
            {values.map((v, i) => (
              <Reveal
                as="li"
                key={v.title}
                delay={i * 0.06}
                className="grid gap-3 border-b border-white/10 py-9 md:grid-cols-[1fr_1.4fr] md:gap-12"
              >
                <h3 className="font-display text-title font-medium text-paper">
                  <span aria-hidden="true" className="mr-4 font-mono text-label text-azure">
                    /{i + 1}
                  </span>
                  {v.title}
                </h3>
                <p className="text-body text-paper/60 md:pt-1.5">{v.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Global delivery */}
      <section className="border-t border-white/10 bg-surface py-section">
        <div className="container-page">
          <SectionHead
            eyebrow="Global delivery"
            title="Built in Colombo. Running everywhere."
            lead="One engineering base, five regions in production. Time zones are a scheduling detail, not a barrier."
          />
          <Reveal delay={0.15} className="mt-14">
            <GlobalMap />
          </Reveal>
        </div>
      </section>

      <FinalCta title="Meet the team behind the systems." />
    </>
  );
}
