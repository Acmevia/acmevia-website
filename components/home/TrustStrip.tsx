import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { stats, site } from "@/lib/data";

/** Regions served + proof numbers counting up on scroll. */
export default function TrustStrip() {
  return (
    <section
      aria-label="Track record"
      className="border-y border-white/10 bg-surface"
    >
      <div className="container-page py-14">
        <Reveal>
          <p className="eyebrow text-paper/40">
            Delivering across {site.regions.join(" · ")}
          </p>
        </Reveal>
        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <dd className="font-display text-display font-semibold text-paper">
                <CountUp
                  value={s.value}
                  prefix={"prefix" in s ? (s.prefix as string) : ""}
                  suffix={s.suffix}
                />
              </dd>
              <dt className="mt-2 font-mono text-label uppercase tracking-[0.14em] text-paper/50">
                {s.label}
              </dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
