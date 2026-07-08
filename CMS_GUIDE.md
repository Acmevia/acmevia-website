# CMS Guide

The site's services, projects, reviews, and logo are edited through a
browser admin at **`/admin/`** — no code, no redeploy by hand. The CMS is
[Decap CMS](https://decapcms.org) (Git-based): every save becomes a Git
commit to `content/*.json` in this repo, and the host rebuilds the site
from it. Nothing runs on a server; the site stays a static export.

**Why this CMS:** the site is statically exported (`output: "export"`),
so a database-backed CMS (Payload, Strapi) would need new hosting.
A Git-based CMS keeps content versioned alongside the code, works with
any static host, and costs nothing. Trade-off: a saved change appears on
the live site after the rebuild finishes (typically 1–2 minutes), not
instantly — and images are served exactly as uploaded, so size them
before uploading (see "Images" below).

---

## Editing locally (works today, no setup)

Two terminals in the project folder:

```bash
npm run dev    # the site on http://localhost:3000
npm run cms    # the local CMS backend (decap-server)
```

Open **http://localhost:3000/admin/index.html** — no login needed
locally. Edits write straight to `content/*.json`; commit and push them
like code.

> **Use the full `/admin/index.html` path in local dev.** The Next dev
> server doesn't auto-resolve a bare `/admin/` folder URL to its
> `index.html`, so `http://localhost:3000/admin/` returns a 404 there.
> On the **deployed** site (and any static host serving the exported
> `out/` folder), the clean `https://acmevia.com/admin/` works — static
> hosts resolve the directory index automatically.

## One-time production setup (needs doing before staff can log in)

The admin authenticates editors with GitHub via a small OAuth gateway.
Until this is done, `/admin/` on the live site won't log in (local
editing above still works).

1. Create a **GitHub OAuth App** (GitHub → Settings → Developer settings
   → OAuth Apps) owned by the `Acmevia` org.
   - Homepage URL: `https://acmevia.com`
   - Callback URL: depends on the gateway below.
2. Deploy an OAuth gateway and give it the app's Client ID/Secret:
   - **Netlify-hosted site:** enable Git Gateway instead and change
     `backend.name` to `git-gateway` in [public/admin/config.yml](public/admin/config.yml) — simplest.
   - **Any other host:** deploy a tiny gateway such as
     `sveltia-cms-auth` (one-click Cloudflare Worker) and set its URL as
     `backend.base_url` in [public/admin/config.yml](public/admin/config.yml).
3. Give each editor access to the GitHub repo (write permission).
4. Make sure the host rebuilds on push to `main` (Netlify/Vercel/
   Cloudflare Pages do this out of the box).

## How to…

### Add or edit a **service**
Admin → *Site content* → **Services** → add/edit an entry.
Fields mirror the page: title, one-line summary, glyph (line-art icon),
the client problem, what's delivered (list), business outcome, and an
optional image. **Drag entries to reorder** — the order in the admin is
the order on the site, and the big `01/08` numbers renumber themselves.

### Write a **blog post**
Admin → **Blog posts** → *New blog post*. Title (put the search phrase
in it), a ~160-character description (this is the Google snippet), a
publish date, category, optional cover image, and the body in the rich
Markdown editor — use `##` headings for sections and link to
`/services/`, `/products/`, and `/contact/#book` where it genuinely
helps the reader. Toggle **Draft** on to save without publishing. The
post appears at `/blog/<slug>/`, in the blog index, and in
`sitemap.xml` automatically. House style: plain language, problem →
outcome, no "cutting-edge"/"revolutionize"/"unlock".

### Add or edit a **product**
Admin → *Site content* → **Products** → add/edit an entry.
Fields mirror the /products/ page: name, audience line, tagline, an
optional client-problem paragraph, description, key features
(repeatable title + one-sentence detail), key claim, pricing note
("Plans from…" / "Request a custom quote"), a **white-label /
enterprise** switch (shows the licensing line), and a **featured**
switch (puts the card on the home page). **Drag entries to reorder** —
the order in the admin is the order on the page, sections alternate
dark/elevated automatically.

Mockups: each product ships with a built-in CSS-drawn dashboard sketch
(pick which style under "Built-in mockup style"). Upload a real
screenshot under "Images / mockups" and it replaces the sketch — real
beats sketched. Size it ~1600px wide and fill in the alt text.

### Add or edit a **project**
Admin → *Site content* → **Projects**. These feed the animated timeline
on /projects/. Keep 5–8 entries, oldest first. The `metric` is the
card's hero — one concrete number ("-60%", "12,000", "0"). Optional
gallery: the first image shows on the card.

### Add or edit a **review**
Admin → *Site content* → **Reviews**. Author, role, company, optional
avatar (a neat initials badge shows when empty), star rating, quote
(keep under ~40 words), **source platform** (Facebook / Google /
Instagram / LinkedIn — sets the badge icon), and a link to the original
review.

Placement rules:
- **Featured ON** → the card appears in the reviews section on the
  home page.
- **Featured OFF** → the first two non-featured reviews appear as pull
  quotes in the inverted "Problems in. Systems out." band.
- **All** reviews appear on the About page.

### Swap the **logo**
Admin → *Site settings* → **Logo**. Upload two variants: one for dark
backgrounds (dark theme) and one for light backgrounds (light theme) —
SVG or transparent PNG, at least 56px tall. Leave both empty to use the
built-in azure AV monogram. The favicon (`app/icon.svg`) and the social
share image (`app/opengraph-image.tsx`) are code-side — ask a developer
if those should match.

## Images

Uploads land in `public/uploads/` and are served exactly as uploaded
(static export — there is no server-side optimizer). Before uploading:

- Resize to what the slot needs: ≤1600px wide for service/project
  images, ~200px square for avatars.
- Export as WebP or a compressed JPEG/PNG (aim for under ~200 KB).
- Always fill in **alt text** — it's read by screen readers and search
  engines.

## Where things live (for developers)

| Thing | File |
|---|---|
| Admin UI + collection schema | `public/admin/index.html`, `public/admin/config.yml` |
| Content the CMS edits | `content/services.json`, `content/products.json`, `content/projects.json`, `content/reviews.json`, `content/settings.json`, `content/blog/*.md` |
| Blog rendering | `lib/blog.ts` (build-time Markdown → HTML), `app/blog/` |
| Types + re-exports the site reads | `lib/data.ts` |
| Non-CMS content (products, process, stats, contact details) | `lib/data.ts` — see HANDOFF.md |
