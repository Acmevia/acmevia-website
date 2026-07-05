import Reveal from "@/components/Reveal";
import { outcomes, testimonials } from "@/lib/data";

/**
 * The inverted band: white paper, slashed top and bottom edges.
 * Problem → outcome statements, no adjectives doing the work.
 */
export default function OutcomeBand() {
  return (
    <section className="band-light py-[calc(var(--spacing-section)+3.5vw)]">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Outcomes</p>
          <h2 className="mt-4 max-w-3xl font-display text-display font-semibold text-ink">
            Problems in. Systems out.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-16 lg:grid-cols-[1.5fr_1fr]">
          <ul>
            {outcomes.map((o, i) => (
              <Reveal as="li" key={i} delay={i * 0.08} className="border-t border-ink/10 py-7">
                <p className="text-lead text-ink/45">{o.problem}</p>
                <p className="mt-2.5 flex gap-3 text-lead font-medium text-ink">
                  <span aria-hidden="true" className="font-mono text-azure">
                    →
                  </span>
                  {o.outcome}
                </p>
              </Reveal>
            ))}
          </ul>

          <div className="space-y-10">
            {testimonials.map((t, i) => (
              <Reveal as="blockquote" key={i} delay={0.1 + i * 0.08} className="border-l-2 border-azure pl-6">
                <p className="text-body text-ink/80">“{t.quote}”</p>
                <footer className="mt-4 font-mono text-label uppercase tracking-[0.14em] text-ink/50">
                  {t.name} — {t.company}
                </footer>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
