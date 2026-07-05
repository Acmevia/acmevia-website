"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Monospace ticker: types `text` character-by-character once visible.
 * Reduced motion (or SSR fallback) renders the full line instantly.
 */
export default function TypeLine({
  text,
  className = "",
  speed = 18,
}: {
  text: string;
  className?: string;
  /** ms per character */
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      setDone(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();
        let i = 0;
        const id = window.setInterval(() => {
          i += 1;
          setCount(i);
          if (i >= text.length) {
            window.clearInterval(id);
            window.setTimeout(() => setDone(true), 1200);
          }
        }, speed);
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text, speed]);

  return (
    <span ref={ref} className={`font-mono ${className}`} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      {!done && <span className="caret" aria-hidden="true" />}
    </span>
  );
}
