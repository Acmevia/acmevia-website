import localFont from "next/font/local";

/**
 * Self-hosted type system (no external font requests at runtime).
 * — Clash Display: wide, authoritative. Headlines only, weights 500/600.
 * — Switzer: Söhne-class grotesque. All body copy, weights 400/500/600.
 * — JetBrains Mono: utility voice. Eyebrows, metadata, labels.
 */
export const clashDisplay = localFont({
  src: [
    { path: "./fonts/ClashDisplay-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ClashDisplay-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
});

export const switzer = localFont({
  src: [
    { path: "./fonts/Switzer-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Switzer-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Switzer-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

export const jetbrainsMono = localFont({
  src: [
    {
      path: "./fonts/JetBrainsMono-Var.woff2",
      weight: "400 500",
      style: "normal",
    },
  ],
  variable: "--font-jbmono",
  display: "swap",
});
