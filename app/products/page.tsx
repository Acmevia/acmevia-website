import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProductMock from "@/components/products/ProductMock";
import FinalCta from "@/components/FinalCta";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products — LMS, Hall Booking & DMS with Mobile POS",
  description:
    "Three white-label SaaS products: Acmevia LMS, Hall Booking & Space Management, and a Distribution Management System with mobile POS. Book a free demo.",
  alternates: { canonical: "/products/" },
};

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-paper/10 pb-16 pt-40">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Products</p>
            <h1 className="mt-4 max-w-4xl font-display text-hero font-semibold text-paper">
              Proven systems. Your name on the door.
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-paper/60">
              Three SaaS products refined across dozens of deployments. Every
              one is cloud-based, mobile-ready, and white-label — your brand,
              your domain, your rules.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-section">
        <div className="container-page grid gap-8 md:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <Link
                href={`/products/${p.id}/`}
                className="group flex h-full flex-col border border-paper/10 bg-surface p-8 transition-colors hover:border-azure/40"
              >
                <div className="mb-6">
                  {p.images?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element -- static export: no optimizer
                    <img
                      src={p.images[0].src}
                      alt={p.images[0].alt}
                      loading="lazy"
                      className="aspect-video w-full border border-paper/10 object-cover"
                    />
                  ) : (
                    <ProductMock variant={p.mock} />
                  )}
                </div>
                <p className="eyebrow text-paper/40">{p.audience}</p>
                <h2 className="mt-3 font-display text-title font-semibold text-paper">
                  {p.name}
                </h2>
                <p className="mt-2 text-meta text-paper/60">{p.tagline}</p>
                <p className="mt-6 border-l-2 border-azure pl-4 text-meta text-paper/80">
                  {p.keyClaim}
                </p>
                <p className="mt-auto flex items-center gap-2 pt-6 font-mono text-label uppercase tracking-[0.14em] text-azure-text">
                  Explore {p.name}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCta title="See your data in one of these — free, in a week." />

      <BreadcrumbSchema items={[{ name: "Products", path: "/products/" }]} />
    </>
  );
}
