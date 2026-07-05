"use client";

import { useEffect, useState } from "react";

/**
 * Dark ↔ light slider switch. The visual state (thumb position, icon)
 * is driven entirely by [data-theme] in CSS, so the server markup is
 * identical in both themes and there is no hydration mismatch. React
 * state exists only for the accessible name/checked state.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.getAttribute("data-theme") === "light");
  }, []);

  const toggle = () => {
    const next = light ? "dark" : "light";
    setLight(!light);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — the choice just won't persist */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "light" ? "#ffffff" : "#000000");
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={light}
      aria-label="Light mode"
      onClick={toggle}
      className={`theme-switch ${className}`}
    >
      <span className="theme-switch-thumb" aria-hidden="true">
        {/* moon — shown in dark mode */}
        <svg viewBox="0 0 24 24" fill="currentColor" className="icon-moon size-3">
          <path d="M21 14.5A9 9 0 0 1 9.5 3a9 9 0 1 0 11.5 11.5z" />
        </svg>
        {/* sun — shown in light mode */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          className="icon-sun size-3"
        >
          <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
        </svg>
      </span>
    </button>
  );
}
