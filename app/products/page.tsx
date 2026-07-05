import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import ProductMock from "@/components/products/ProductMock";
import FinalCta from "@/components/FinalCta";
import { products, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products — LMS, Hall Booking & DMS with Mobile POS",
  description:
    "Three white-label SaaS products: Acmevia LMS for institutes, a Hall Booking & Space Management system, and a Distribution Management System with mobile POS. Book a free demo.",
  alternates: { canonical: "/products/" },
};

const productSchema = products.map((p) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: p.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  description: p.description,
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "0",
    description: p.pricingNote,
  },
  provider: { "@type": "Organization", name: site.legalName, url: site.url },
}));

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-white/10 pb-16 pt-40">
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

      {products.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          className={`py-section ${i % 2 === 1 ? "bg-surface" : ""}`}
        >
          <div className="container-page">
            <div
              className={`grid items-center gap-12 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal delay={0.1}>
                <ProductMock variant={p.mock} />
              </Reveal>

              <Reveal>
                <p className="eyebrow">{p.audience}</p>
                <h2 className="mt-4 font-display text-display font-semibold text-paper">
                  {p.name}
                </h2>
                <p className="mt-3 font-display text-lead text-azure">
                  {p.tagline}
                </p>
                <p className="mt-5 max-w-xl text-body text-paper/70">
                  {p.description}
                </p>
                <p className="mt-6 border-l-2 border-azure pl-4 text-lead font-medium text-paper">
                  {p.keyClaim}
                </p>
              </Reveal>
            </div>

            {/* Feature rows */}
            <div className="mt-16 border-t border-white/10">
              {p.features.map((f, fi) => (
                <Reveal
                  key={f.title}
                  delay={Math.min(fi * 0.05, 0.25)}
                  className="grid gap-2 border-b border-white/10 py-6 md:grid-cols-[1fr_1.6fr] md:gap-10"
                >
                  <h3 className="flex gap-3 font-display text-lead font-medium text-paper">
                    <span aria-hidden="true" className="font-mono text-azure">/</span>
                    {f.title}
                  </h3>
                  <p className="text-body text-paper/60 md:pt-0.5">{f.detail}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Magnetic>
                <Link href="/contact/#book" className="btn btn-primary">
                  Book a Free Demo
                </Link>
              </Magnetic>
              <div>
                <p className="text-meta text-paper/70">{p.pricingNote}</p>
                <p className="mt-1 font-mono text-label uppercase tracking-[0.14em] text-paper/40">
                  White-label & enterprise licensing available
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <FinalCta title="See your data in one of these — free, in a week." />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}
