"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/Magnetic";
import TypeLine from "@/components/TypeLine";
import type { Project } from "@/lib/data";

/**
 * THE SIGNATURE PIECE — a scroll-driven connected timeline.
 *
 * How it works:
 * 1. Cards and waypoint labels are laid out in a CSS grid. Every point the
 *    line must pass through carries [data-tl-anchor].
 * 2. After layout (and on every resize) we measure the anchors and generate
 *    a smooth Catmull-Rom → Bézier path through them at runtime, so the
 *    line PHYSICALLY connects the nodes at any viewport size.
 *    Desktop: nodes offset toward their card → the line meanders.
 *    Mobile:  nodes sit on a left rail → the line is a straight spine.
 * 3. GSAP ScrollTrigger scrubs stroke-dashoffset so the trace is wired in
 *    live as the user scrolls; a second trigger per row fires the node
 *    pulse + clip-path slash reveal (.tl-in).
 *
 * Performance: transform/opacity/dashoffset only, one path measure per
 * resize. prefers-reduced-motion: line fully drawn, cards visible, no scrub.
 */
export default function ProjectTimeline({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const ghostRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const ghost = ghostRef.current;
    if (!container || !svg || !path || !ghost) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    /** Catmull-Rom through the anchor points → cubic Bézier path string. */
    const buildPath = () => {
      const cRect = container.getBoundingClientRect();
      const anchors = Array.from(
        container.querySelectorAll<HTMLElement>("[data-tl-anchor]")
      );
      const pts = anchors.map((a) => {
        const r = a.getBoundingClientRect();
        return {
          x: r.left - cRect.left + r.width / 2,
          y: r.top - cRect.top + r.height / 2,
        };
      });
      if (pts.length < 2) return 0;

      // Lead-in from the very top of the section into the first node.
      pts.unshift({ x: pts[0].x, y: 0 });

      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] ?? pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2] ?? p2;
        const c1x = p1.x + (p2.x - p0.x) / 6;
        const c1y = p1.y + (p2.y - p0.y) / 6;
        const c2x = p2.x - (p3.x - p1.x) / 6;
        const c2y = p2.y - (p3.y - p1.y) / 6;
        d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
      }

      svg.setAttribute("viewBox", `0 0 ${cRect.width} ${cRect.height}`);
      svg.setAttribute("width", String(cRect.width));
      svg.setAttribute("height", String(cRect.height));
      path.setAttribute("d", d);
      ghost.setAttribute("d", d);
      return path.getTotalLength();
    };

    let length = buildPath();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = reduced ? "0" : `${length}`;

    const rows = Array.from(
      container.querySelectorAll<HTMLElement>("[data-tl-row]")
    );

    if (reduced) {
      rows.forEach((r) => r.classList.add("tl-in"));
      return;
    }

    const ctx = gsap.context(() => {
      // Line draw — scrubbed to scroll so the circuit is wired in live.
      ScrollTrigger.create({
        trigger: container,
        start: "top 62%",
        end: "bottom 58%",
        scrub: 0.6,
        onUpdate: (self) => {
          path.style.strokeDashoffset = `${length * (1 - self.progress)}`;
        },
      });

      // Node pulse + slash reveal as each row is reached.
      rows.forEach((row) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 72%",
          once: true,
          onEnter: () => row.classList.add("tl-in"),
        });
      });

      // Gentle parallax depth on desktop cards (±22px, transform-only).
      if (window.matchMedia("(min-width: 1024px)").matches) {
        container.querySelectorAll<HTMLElement>("[data-tl-card]").forEach((card) => {
          gsap.fromTo(
            card,
            { y: 22 },
            {
              y: -22,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      }
    }, container);

    // Re-measure the path when layout changes.
    let raf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const prevOffset = parseFloat(path.style.strokeDashoffset) / (length || 1);
        length = buildPath();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length * (isNaN(prevOffset) ? 1 : prevOffset)}`;
        ScrollTrigger.refresh();
      });
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [projects]);

  return (
    <div ref={containerRef} className="relative">
      {/* The luminous trace — ghost route + drawn line */}
      <svg
        ref={svgRef}
        aria-hidden="true"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0"
      >
        <path
          ref={ghostRef}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
        />
        <path
          ref={pathRef}
          fill="none"
          stroke="#00b2ff"
          strokeWidth="1.5"
          style={{ filter: "drop-shadow(0 0 6px rgba(0,178,255,0.65))" }}
        />
      </svg>

      <div className="relative">
        {projects.map((p, i) => {
          const left = i % 2 === 0;
          return (
            <div key={p.id} data-tl-row>
              {/* Waypoint between nodes: region / year of the leg ahead */}
              <div className="grid grid-cols-[44px_1fr] py-7 lg:grid-cols-[1fr_140px_1fr]">
                <div className="relative col-start-1 justify-self-center lg:col-start-2">
                  <span data-tl-anchor className="block size-px" />
                  <span className="tl-label absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.2em] text-paper/35">
                    {p.region} · {p.year}
                  </span>
                </div>
              </div>

              {/* Project row */}
              <div className="grid grid-cols-[44px_1fr] pb-10 lg:grid-cols-[1fr_140px_1fr] lg:pb-16">
                {/* Node */}
                <div
                  className={`relative col-start-1 row-start-1 self-center justify-self-center lg:col-start-2 ${
                    left ? "lg:justify-self-start" : "lg:justify-self-end"
                  }`}
                >
                  <span data-tl-anchor className="relative block size-3">
                    <span className="tl-node-dot absolute inset-0 rounded-full bg-azure" />
                    <span className="tl-pulse node-pulse absolute inset-0 rounded-full border border-azure" />
                  </span>
                </div>

                {/* Card */}
                <div
                  data-tl-card
                  className={`col-start-2 row-start-1 lg:max-w-xl ${
                    left
                      ? "lg:col-start-1 lg:justify-self-end"
                      : "lg:col-start-3 lg:justify-self-start"
                  }`}
                >
                  <article className="tl-card border border-white/12 bg-surface p-7 transition-colors hover:border-azure/40 md:p-9">
                    <TypeLine
                      text={p.meta}
                      className="text-[0.625rem] uppercase tracking-[0.18em] text-azure/80"
                    />
                    <h2 className="mt-4 font-display text-title font-semibold text-paper">
                      {p.title}
                    </h2>
                    <p className="mt-3 text-meta text-paper/60">{p.summary}</p>
                    <div className="mt-6 flex items-end justify-between gap-6 border-t border-white/10 pt-5">
                      <div>
                        <p className="font-display text-display font-semibold leading-none text-azure">
                          {p.metric.value}
                        </p>
                        <p className="mt-2 font-mono text-label uppercase tracking-[0.14em] text-paper/50">
                          {p.metric.label}
                        </p>
                      </div>
                      <span className="whitespace-nowrap border border-white/15 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-paper/60">
                        {p.solution}
                      </span>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          );
        })}

        {/* Terminus — the next node is yours */}
        <div data-tl-row className="grid grid-cols-[44px_1fr] pb-8 pt-6 lg:grid-cols-[1fr_140px_1fr]">
          <div className="relative col-start-1 self-start justify-self-center lg:col-start-2">
            <span data-tl-anchor className="relative block size-5">
              <span className="tl-node-dot absolute inset-0 rounded-full bg-azure shadow-[0_0_28px_rgba(0,178,255,0.9)]" />
              <span className="tl-pulse node-pulse absolute inset-0 rounded-full border border-azure" />
            </span>
          </div>
          <div className="tl-card col-start-2 lg:col-start-2 lg:col-span-1 lg:justify-self-center lg:text-center">
            <p className="eyebrow mt-1 whitespace-nowrap">Your project next</p>
          </div>
          <div className="col-start-2 mt-10 lg:col-span-3 lg:col-start-1 lg:text-center">
            <h2 className="font-display text-display font-semibold text-paper">
              The line ends where yours begins.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lead text-paper/60 lg:text-center">
              Tell us what's slowing your operation down. We'll tell you what
              we'd build — and what it would change.
            </p>
            <div className="mt-8 lg:flex lg:justify-center">
              <Magnetic>
                <Link href="/contact/#book" className="btn btn-primary">
                  Book a Free Demo
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
