import Link from "next/link";
import Magnetic from "@/components/Magnetic";

/**
 * Full-viewport hero.
 *
 * Load timeline (CSS-orchestrated — see globals.css):
 *   0.00s  circuit traces draw in, staggered (--d per path)
 *   0.90s  nodes at trace endpoints fade in
 *   0.55s  headline line 1 rises out of its mask
 *   0.70s  headline line 2 rises
 *   1.15s  eyebrow fades up
 *   1.30s  standfirst fades up
 *   1.45s  CTAs fade up
 *   2.00s  scroll cue appears
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-ink">
      {/* Circuit traces — the grid drawing itself in */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M-40 640 H480 L600 520 H910"
          pathLength={1}
          fill="none"
          className="hero-line stroke-azure/30"
          strokeWidth="1"
          style={{ "--d": "0s" } as React.CSSProperties}
        />
        <path
          d="M1480 240 H1060 L980 320 H770"
          pathLength={1}
          fill="none"
          className="hero-line stroke-azure/25"
          strokeWidth="1"
          style={{ "--d": "0.15s" } as React.CSSProperties}
        />
        <path
          d="M1150 940 L1430 220"
          pathLength={1}
          fill="none"
          className="hero-line stroke-azure/15"
          strokeWidth="1"
          style={{ "--d": "0.3s" } as React.CSSProperties}
        />
        <circle
          cx="910"
          cy="520"
          r="3.5"
          className="hero-fade fill-azure"
          style={{ "--d": "0.9s" } as React.CSSProperties}
        />
        <circle
          cx="770"
          cy="320"
          r="3.5"
          className="hero-fade fill-azure"
          style={{ "--d": "1.05s" } as React.CSSProperties}
        />
      </svg>

      {/* Azure glow anchored low-left — depth without gradient soup */}
      <div
        className="pointer-events-none absolute -left-40 bottom-[-30%] h-[42rem] w-[42rem] rounded-full bg-azure/10 blur-[160px]"
        aria-hidden="true"
      />

      <div className="container-page relative pb-24 pt-40">
        <p
          className="eyebrow hero-fade mb-8"
          style={{ "--d": "1.15s" } as React.CSSProperties}
        >
          Est. Sri Lanka — serving Asia Pacific · Europe · Americas · Australia
        </p>

        <h1 className="font-display text-hero font-semibold text-paper">
          <span className="hero-mask">
            <span style={{ "--d": "0.55s" } as React.CSSProperties}>
              Software built for
            </span>
          </span>
          <span className="hero-mask">
            <span style={{ "--d": "0.68s" } as React.CSSProperties}>
              how your business
            </span>
          </span>
          <span className="hero-mask">
            <span style={{ "--d": "0.81s" } as React.CSSProperties}>
              <span className="text-azure">actually works.</span>
            </span>
          </span>
        </h1>

        <p
          className="hero-fade mt-8 max-w-xl text-lead text-paper/60"
          style={{ "--d": "1.3s" } as React.CSSProperties}
        >
          Custom systems and SaaS products, designed around your operation and
          delivered worldwide from Sri Lanka.
        </p>

        <div
          className="hero-fade mt-10 flex flex-wrap items-center gap-4"
          style={{ "--d": "1.45s" } as React.CSSProperties}
        >
          <Magnetic>
            <Link href="/contact/#book" className="btn btn-primary">
              Book a Free Demo
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/projects/" className="btn btn-ghost">
              See Our Work
            </Link>
          </Magnetic>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="hero-fade absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ "--d": "2s" } as React.CSSProperties}
        aria-hidden="true"
      >
        <span className="block font-mono text-[0.625rem] uppercase tracking-[0.2em] text-paper/40">
          Scroll
        </span>
        <span className="mx-auto mt-2 block h-10 w-px bg-gradient-to-b from-azure to-transparent" />
      </div>
    </section>
  );
}
