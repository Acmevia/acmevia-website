"use client";

import { useEffect, useState } from "react";

type Item = { id: string; index: string; name: string };

/**
 * Sticky side navigation for the services page.
 * — Azure rail fills with scroll progress through the services region.
 * — Active section tracked with an IntersectionObserver band at the
 *   middle of the viewport.
 */
export default function ServicesIndex({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));

    const container = document.getElementById("services-list");
    const onScroll = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const viewportMid = window.innerHeight * 0.5;
      const p = (viewportMid - rect.top) / rect.height;
      setProgress(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <nav aria-label="Services on this page" className="flex gap-5">
      {/* Progress rail */}
      <div aria-hidden="true" className="relative w-px bg-white/10">
        <div
          className="absolute left-0 top-0 w-px bg-azure transition-[height] duration-200"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
      <ol className="space-y-3.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={`group flex items-baseline gap-3 text-meta transition-colors duration-300 ${
                active === item.id
                  ? "text-paper"
                  : "text-paper/40 hover:text-paper/75"
              }`}
            >
              <span
                className={`font-mono text-label ${
                  active === item.id ? "text-azure" : "text-paper/30"
                }`}
              >
                {item.index}
              </span>
              {item.name}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
