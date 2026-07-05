"use client";

import Link from "next/link";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import ServiceGlyph from "@/components/ServiceGlyph";
import { services } from "@/lib/data";

/**
 * Interactive service index: hovering a row slides an azure slash across
 * it (the logo's cut, as an interaction) and swaps the schematic in the
 * preview panel. On touch, the rows are plain links — no hidden content.
 */
export default function ServicesPreview() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-section">
      <div className="container-page">
        <SectionHead
          eyebrow="Services"
          title="Eight ways we take work off your plate."
          lead="Every engagement starts with the problem, not the technology."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          {/* Row list */}
          <ul className="border-t border-paper/10">
            {services.map((s, i) => (
              <Reveal as="li" key={s.id} delay={Math.min(i * 0.05, 0.3)}>
                <Link
                  href={`/services/#${s.id}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="slash-host group flex items-baseline gap-5 border-b border-paper/10 py-5 pr-2 transition-colors duration-300 hover:border-azure/40 md:py-6"
                >
                  <span className="font-mono text-label text-azure-text/70">
                    {s.index}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-title font-medium text-paper transition-colors duration-300 group-hover:text-azure-text">
                      {s.name}
                    </span>
                    <span className="mt-1 hidden text-meta text-paper/50 sm:block">
                      {s.short}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-paper/30 transition-all duration-500 ease-out-expo group-hover:translate-x-1.5 group-hover:text-azure-text"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>

          {/* Preview panel — desktop only */}
          <Reveal className="hidden lg:block" delay={0.15}>
            <div className="sticky top-32 border border-paper/10 bg-surface p-10">
              <ServiceGlyph
                key={services[active].id}
                glyph={services[active].glyph}
                className="h-40 w-40 text-azure-text transition-opacity duration-500"
              />
              <p className="eyebrow mt-8 text-paper/40">
                {services[active].index} / 08
              </p>
              <p className="mt-3 text-meta text-paper/60">
                {services[active].short}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
