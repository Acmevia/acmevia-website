import Link from "next/link";
import { LogoLockup } from "./Logo";
import { site, services, products } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative bg-ink">
      {/* The final thin azure line along the footer's top edge */}
      <div className="rule-azure" aria-hidden="true" />

      <div className="container-page pb-10 pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="Acmevia — home" className="text-paper">
              <LogoLockup />
            </Link>
            <p className="mt-6 max-w-xs text-meta text-paper/60">
              A boutique engineering partner in Sri Lanka. Custom software and
              SaaS products, delivered worldwide.
            </p>
            <p className="eyebrow mt-8 text-paper/40">
              {site.regions.join(" · ")}
            </p>
          </div>

          <nav aria-label="Services">
            <h2 className="eyebrow mb-5 text-paper/40">Services</h2>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/#${s.id}`}
                    className="text-meta text-paper/70 transition-colors hover:text-azure"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Products and pages">
            <h2 className="eyebrow mb-5 text-paper/40">Products</h2>
            <ul className="space-y-2.5">
              {products.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/products/#${p.id}`}
                    className="text-meta text-paper/70 transition-colors hover:text-azure"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="eyebrow mb-5 mt-8 text-paper/40">Company</h2>
            <ul className="space-y-2.5">
              <li>
                <Link href="/projects/" className="text-meta text-paper/70 transition-colors hover:text-azure">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/about/" className="text-meta text-paper/70 transition-colors hover:text-azure">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="text-meta text-paper/70 transition-colors hover:text-azure">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-5 text-paper/40">Contact</h2>
            <ul className="space-y-2.5 text-meta">
              <li>
                <a href={`mailto:${site.emailSales}`} className="text-paper/70 transition-colors hover:text-azure">
                  {site.emailSales}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.emailSupport}`} className="text-paper/70 transition-colors hover:text-azure">
                  {site.emailSupport}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/70 transition-colors hover:text-azure"
                >
                  WhatsApp {site.whatsapp}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-label font-mono uppercase tracking-[0.14em] text-azure/80">
              {site.responseCommitment}
            </p>
            <div className="mt-8 flex gap-5">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper/50 transition-colors hover:text-azure"
                aria-label="Acmevia on LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-7.9c0-1.88-.03-4.3-2.62-4.3-2.63 0-3.03 2.05-3.03 4.17V23H8V8z" />
                </svg>
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper/50 transition-colors hover:text-azure"
                aria-label="Acmevia on Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                  <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.09 24 18.1 24 12.07z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-label font-mono uppercase tracking-[0.14em] text-paper/40">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="text-label font-mono uppercase tracking-[0.14em] text-paper/40">
            Est. Sri Lanka — delivering worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
