# Handoff Notes

How to replace every placeholder with real data, and where the seams are.
All content edits happen in **one file**: [`lib/data.ts`](lib/data.ts).

---

## 1. Projects (the timeline)

`lib/data.ts → projects[]`. Each entry:

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

## 2. Testimonials & outcomes

`lib/data.ts → outcomes[]` (problem → outcome pairs on the white band) and
`testimonials[]` (quotes). Replace with real quotes and **named** people as
soon as you have sign-off — anonymous roles are the placeholder state.
Keep quotes under ~40 words; the layout rewards short.

## 3. Stats

`lib/data.ts → stats[]` — projects delivered, industries, regions, SLA.
Update the numbers; the count-up animation needs no changes.

## 4. Logo

The site uses a hand-traced SVG monogram
([`components/Logo.tsx`](components/Logo.tsx)) so the mark stays crisp and
inherits color. If you want the original raster logos instead:

1. Drop `1.png` (white bg) and `2.png` (black bg) into `public/`.
2. In `Logo.tsx`, swap the `<svg>` for
   `<Image src="/2.png" alt="" width={…} height={…} />`.
3. Also update `app/icon.svg` and the monogram in
   `app/opengraph-image.tsx` if you want them pixel-matched.

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

## 10. Design tokens

Everything visual is parameterized in [`app/tokens.css`](app/tokens.css) —
colors, the 12–96 type scale, the easing curve, section rhythm. Change a
token, the whole site follows. Brand rule encoded there: azure is never
small text on white.

---

### Self-critique log (what was cut and why)

- Hero originally had a fourth (white) circuit line + node — removed; it was
  the only monochrome decoration on the page and earned nothing.
- No stock imagery anywhere by design: service "previews" are line-art
  schematics, product shots are CSS-built dashboards. Replace only if real
  product screenshots become available — real beats sketched, sketched
  beats stock.
