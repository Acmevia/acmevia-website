# Acmevia — Marketing Website

Premium, conversion-focused marketing site for **Acmevia Pvt Ltd**.
Luxury-dark visual system: black canvas, electric azure (`#00B2FF`), white.
Built as a fully static export — no server required.

## Stack

- **Next.js 15** (App Router, `output: "export"`)
- **Tailwind CSS v4** — design tokens live in [`app/tokens.css`](app/tokens.css)
- **GSAP ScrollTrigger** — Projects timeline only; everything else is
  IntersectionObserver + CSS on one easing curve (`cubic-bezier(0.16,1,0.3,1)`)
- **Self-hosted fonts** — Clash Display (display), Switzer (body),
  JetBrains Mono (labels). No external font requests.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → ./out
```

Deploy `./out` anywhere static (Vercel detects Next automatically; also fine
on Netlify, S3/CloudFront, nginx).

## Structure

```
app/                  pages (App Router), tokens.css, globals.css, fonts
├─ page.tsx           Home
├─ services/          8 service blocks + sticky index rail
├─ products/          3 SaaS products + CSS-built dashboard mockups
├─ projects/          ★ scroll-driven connected timeline
├─ about/             vision/mission, capabilities, values, delivery map
├─ contact/           form + demo slot picker (#book)
├─ sitemap.ts · robots.ts · opengraph-image.tsx · icon.svg
components/           shared primitives + per-page components
lib/data.ts           ALL site copy and structured content
HANDOFF.md            how to replace placeholders, wire the form, swap logos
```

## Key implementation notes

- **Design tokens** — one file, [`app/tokens.css`](app/tokens.css): colors,
  the 12/14/16/20/28/40/64/96 type scale, easing, spacing rhythm. Every token
  becomes a Tailwind utility.
- **Projects timeline** — the azure line is generated at runtime through the
  actual node positions (Catmull-Rom → Bézier), so it physically connects
  cards at any viewport size; `stroke-dashoffset` is scrubbed by
  ScrollTrigger. Mobile collapses to a straight left rail. See
  [`components/projects/ProjectTimeline.tsx`](components/projects/ProjectTimeline.tsx).
- **Accessibility** — WCAG 2.1 AA: azure-on-black 8.7:1; azure is never used
  as small text on white (falls back to ink); visible azure focus rings;
  `prefers-reduced-motion` collapses every animation to its end state.
- **Performance** — no runtime image loading (all visuals are SVG/CSS),
  fonts preloaded, transform/opacity-only animation. Shared JS ≈ 103 kB;
  GSAP is loaded only on `/projects/`.
- **Analytics** — add GA4 / Meta Pixel via `@next/third-parties` or a script
  tag in `app/layout.tsx` (slots noted in HANDOFF.md).
