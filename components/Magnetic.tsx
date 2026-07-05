"use client";

import { useRef, type ReactNode } from "react";

/**
 * Magnetic hover: the wrapped element leans toward the pointer by a few
 * pixels and springs back on leave. Transform-only; disabled for touch
 * and reduced-motion users automatically (no hover, no effect).
 */
export default function Magnetic({
  children,
  strength = 0.25,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const max = 10;
    const x = Math.max(-max, Math.min(max, dx * strength));
    const y = Math.max(-max, Math.min(max, dy * strength));
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "translate(0, 0)";
    window.setTimeout(() => {
      if (el) el.style.transition = "";
    }, 600);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
