# Handoff Notes

How to replace every placeholder with real data, and where the seams are.

> **CMS note:** services, products, projects, reviews/testimonials, and
> the logo are now edited in the browser at **`/admin/`** — see
> [`CMS_GUIDE.md`](CMS_GUIDE.md). They live in `content/*.json`, not in
> `lib/data.ts`. Everything else below still lives in
> [`lib/data.ts`](lib/data.ts).

---

## 1. Projects (the timeline)

**CMS-managed** — Admin → Site content → Projects (`content/projects.json`).
Each entry:

| Field | What to put there |
|---|---|
| `title` | Plain-language engagement name |
| `client` | Industry descriptor (or the client name once you have permission) |
| `region` / `year` | Shown as the waypoint label on the line |
| `summary` | 2–3 sentences: the problem, then what shipped |
| `metric` | **One** number + label. This is the card's hero — keep it concrete ("-60%", "12,000", "0") |
| `meta` | The typed ticker line, format `INDUSTRY // REGION // SOLUTION // YEAR` |

Add or remove entries freely — the line, waypoints, and alternation adapt
automatically. Keep 5–8 for the best pacing. Order = order on the line
(chronological reads best).

## 2. Testimonials, reviews & outcomes

Reviews are **CMS-managed** — Admin → Site content → Reviews
(`content/reviews.json`). Featured reviews fill the home-page reviews
section; the first two non-featured ones become the pull quotes on the
inverted band; all of them show on About. Replace with real quotes and
**named** people as soon as you have sign-off — anonymous roles are the
placeholder state. Keep quotes under ~40 words.

`lib/data.ts → outcomes[]` (problem → outcome pairs on the band) is
still code-side.

## 3. Stats

`lib/data.ts → stats[]` — projects delivered, industries, regions, SLA.
Update the numbers; the count-up animation needs no changes.

## 4. Logo

**CMS-managed** — Admin → Site settings → Logo. Upload a dark-bg and a
light-bg variant; they swap automatically with the theme toggle. When no
file is uploaded, the hand-traced SVG monogram in
[`components/Logo.tsx`](components/Logo.tsx) is used. `app/icon.svg` and
the monogram in `app/opengraph-image.tsx` stay code-side — update them
too if you want them pixel-matched.

## 5. Contact form

[`components/contact/ContactForm.tsx`](components/contact/ContactForm.tsx)
posts JSON to `NEXT_PUBLIC_FORM_ENDPOINT`:

```bash
# .env.local
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/XXXXXXXX
```

Works with Formspree, Basin, Getform, or your own API. **Without the env var
the form falls back to a pre-filled `mailto:` draft** — functional, but set
the endpoint before launch. The hidden `website` field is the honeypot; keep it.

## 6. Demo slot picker

[`components/contact/BookDemo.tsx`](components/contact/BookDemo.tsx) is a
**placeholder** for a real scheduler. Today it deep-links the picked slot
into WhatsApp. To go real: replace the component body with a Calendly or
Cal.com inline embed and keep the `id="book"` section wrapper — every
"Book a Free Demo" button on the site targets `/contact/#book`.

## 7. Contact details & socials

`lib/data.ts → site` — emails, WhatsApp number/link, LinkedIn, Facebook,
regions, response commitment. One edit updates footer, contact page, nav,
JSON-LD, and the floating WhatsApp button.

## 8. Analytics

Add to `app/layout.tsx` inside `<body>`:

```tsx
import { GoogleAnalytics } from "@next/third-parties/google";
// …
<GoogleAnalytics gaId="G-XXXXXXX" />
```

Meta Pixel: standard snippet via `next/script` in the same place.

## 9. SEO

- Per-page titles/descriptions: `export const metadata` at the top of each
  `app/*/page.tsx`.
- OG image is generated at build (`app/opengraph-image.tsx`).
- `sitemap.xml` and `robots.txt` are generated from `app/sitemap.ts` /
  `app/robots.ts`; the canonical domain is `site.url` in `lib/data.ts`.

## 10. Design tokens & themes

Everything visual is parameterized in [`app/tokens.css`](app/tokens.css) —
colors, the 12–96 type scale, the easing curve, section rhythm. Change a
token, the whole site follows. Brand rule encoded there: azure is never
small text on white (`--color-azure-text` darkens automatically in light
mode).

**Dark ↔ light:** dark is the default and is the original design,
untouched. The nav toggle sets `data-theme` on `<html>`; light mode only
swaps token values (`ink`↔`paper`, surfaces, azure-as-text), so no
component contains theme logic. The choice persists in `localStorage`;
first-time visitors follow their OS preference, defaulting to dark.

---

### Self-critique log (what was cut and why)

- Hero originally had a fourth (white) circuit line + node — removed; it was
  the only monochrome decoration on the page and earned nothing.
- No stock imagery anywhere by design: service "previews" are line-art
  schematics, product shots are CSS-built dashboards. Replace only if real
  product screenshots become available — real beats sketched, sketched
  beats stock.
