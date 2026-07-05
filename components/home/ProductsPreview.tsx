"use client";

import Link from "next/link";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { products } from "@/lib/data";

/** One flagship card with tilt-on-hover and a pointer-tracked edge glow. */
function TiltCard({
  index,
  href,
  children,
}: {
  index: number;
  href: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 5}deg) rotateY(${(px - 0.5) * 5}deg)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "perspective(900px)";
    window.setTimeout(() => {
      if (el) el.style.transition = "";
    }, 700);
  };

  return (
    <Reveal delay={index * 0.1}>
      <Link
        ref={ref}
        href={href}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="group relative block h-full border border-white/10 bg-surface p-8 will-change-transform transition-colors duration-500 hover:border-azure/50 md:p-10"
        style={
          {
            // Pointer-tracked azure sheen, revealed on hover
            backgroundImage:
              "radial-gradient(28rem circle at var(--mx, 50%) var(--my, 0%), rgba(0,178,255,0.08), transparent 45%)",
          } as React.CSSProperties
        }
      >
        {children}
      </Link>
    </Reveal>
  );
}

export default function ProductsPreview() {
  return (
    <section className="py-section">
      <div className="container-page">
        <SectionHead
          eyebrow="Products"
          title="Three systems, ready to wear your brand."
          lead="Built once, refined across dozens of deployments, white-labelled for yours."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {products.map((p, i) => (
            <TiltCard key={p.id} index={i} href={`/products/#${p.id}`}>
              <p className="eyebrow text-paper/40">0{i + 1}</p>
              <h3 className="mt-5 font-display text-title font-medium text-paper">
                {p.name}
              </h3>
              <p className="mt-3 text-meta text-paper/60">{p.tagline}</p>
              <p className="mt-6 border-l-2 border-azure pl-4 text-meta text-paper/80">
                {p.keyClaim}
              </p>
              <p className="mt-8 font-mono text-label uppercase tracking-[0.14em] text-azure">
                Explore
                <span className="ml-2 inline-block transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5">
                  →
                </span>
              </p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
