import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { processSteps } from "@/lib/data";

/**
 * The 8-step workflow as a connected azure line. The connector draws
 * itself (scaleX) when the grid enters the viewport; steps reveal in
 * reading order. On mobile it becomes a left spine.
 */
export default function ProcessSection() {
  return (
    <section className="border-t border-white/10 bg-surface py-section">
      <div className="container-page">
        <SectionHead
          eyebrow="Process"
          title="The same eight steps, every time."
          lead="Predictable delivery is a system, not a promise. This is ours."
        />

        {/* Desktop: two rows of four, each row threaded by a drawn line */}
        <div className="mt-16 hidden md:block">
          {[processSteps.slice(0, 4), processSteps.slice(4)].map((row, r) => (
            <Reveal key={r} className="relative mt-0 pb-14">
              {/* Connector line for this row */}
              <div
                aria-hidden="true"
                className="grow-x absolute left-0 right-0 top-[5px] h-px bg-azure/50"
                style={{ transitionDelay: `${0.2 + r * 0.5}s` }}
              />
              <ol className="grid grid-cols-4 gap-8">
                {row.map((s, i) => (
                  <li key={s.step} className="relative pt-8">
                    {/* Node on the line */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 block size-[11px] rounded-full border border-azure bg-ink"
                    />
                    <p className="font-mono text-label text-azure">{s.step}</p>
                    <h3 className="mt-2 font-display text-lead font-medium text-paper">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-meta text-paper/55">{s.detail}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </div>

        {/* Mobile: vertical spine */}
        <ol className="relative mt-12 border-l border-azure/40 md:hidden">
          {processSteps.map((s, i) => (
            <Reveal as="li" key={s.step} delay={Math.min(i * 0.05, 0.25)} className="relative pb-10 pl-8">
              <span
                aria-hidden="true"
                className="absolute -left-[6px] top-1 block size-[11px] rounded-full border border-azure bg-ink"
              />
              <p className="font-mono text-label text-azure">{s.step}</p>
              <h3 className="mt-1.5 font-display text-lead font-medium text-paper">
                {s.title}
              </h3>
              <p className="mt-1.5 text-meta text-paper/55">{s.detail}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
