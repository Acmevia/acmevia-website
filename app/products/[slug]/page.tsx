import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import ProductMock from "@/components/products/ProductMock";
import FinalCta from "@/components/FinalCta";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { products, projects, site } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

const seo: Record<string, { title: string; description: string }> = {
  lms: {
    title: "Learning Management System Sri Lanka",
    description:
      "Cloud-based learning management system for schools, universities, and tuition classes in Sri Lanka — cuts admin work by up to 80%. Book a free demo.",
  },
  "hall-booking": {
    title: "Hall Booking System Sri Lanka",
    description:
      "Hall booking and space management system for universities, hotels, and corporations in Sri Lanka — double bookings drop to zero. Book a free demo.",
  },
  dms: {
    title: "Distribution Management System Sri Lanka",
    description:
      "Distribution management system with mobile POS for Sri Lankan FMCG distributors — real-time stock, sales, and agent tracking. Book a free demo.",
  },
};

/** The one real, matching engagement from /projects/ for each product — omitted where none exists. */
const caseStudyProjectId: Record<string, string> = {
  lms: "lms-training",
  "hall-booking": "hall-university",
  dms: "dms-fmcg",
};

/** Grounded in fields already on the product record — audience, pricing, features. Nothing invented. */
const faqs: Record<string, { question: string; answer: string }[]> = {
  lms: [
    {
      question: "Is Acmevia LMS white-label?",
      answer: "Yes — it ships fully white-label, under your own name, logo, and domain.",
    },
    {
      question: "Who is Acmevia LMS built for?",
      answer: "Schools, universities, tuition classes, and training centers.",
    },
    {
      question: "Does Acmevia LMS work on mobile?",
      answer:
        "Yes — it's fully responsive and built for phone use first, since that's how most students access it.",
    },
  ],
  "hall-booking": [
    {
      question: "What does the Hall Booking & Space Management system prevent?",
      answer:
        "Double bookings — a shared calendar across every venue drops them to zero from day one.",
    },
    {
      question: "Who uses this hall booking system?",
      answer:
        "Corporations, universities, hotels, and public institutions managing multiple venues, halls, and meeting rooms.",
    },
    {
      question: "How is it priced?",
      answer: "Priced per venue portfolio — request a custom quote.",
    },
  ],
  dms: [
    {
      question: "What does the DMS + Mobile POS system track?",
      answer: "Every unit, transaction, and agent across your distribution network, in real time.",
    },
    {
      question: "Does the mobile POS work offline?",
      answer: "Yes — field agents can capture orders, invoicing, and payments even offline.",
    },
    {
      question: "How is it licensed?",
      answer: "Licensed per agent and warehouse — request a custom quote.",
    },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  const meta = seo[slug];
  if (!product || !meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/products/${slug}/` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) notFound();

  const caseStudy = projects.find((pr) => pr.id === caseStudyProjectId[product.id]);
  const productFaqs = faqs[product.id] ?? [];

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description: product.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "0",
      description: product.pricingNote,
    },
    provider: { "@type": "Organization", name: site.legalName, url: site.url },
  };

  const faqSchema = productFaqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: productFaqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-paper/10 pb-16 pt-40">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">{product.audience}</p>
            <h1 className="mt-4 font-display text-hero font-semibold text-paper">
              {product.name}
            </h1>
            <p className="mt-4 font-display text-lead text-azure-text">{product.tagline}</p>
            <p className="mt-6 max-w-xl text-body text-paper/70">{product.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link href="/contact/#book" className="btn btn-primary">
                  Book a Free Demo
                </Link>
              </Magnetic>
              <Link href="/products/" className="btn btn-ghost">
                Compare all products
              </Link>
            </div>
            <p className="mt-6 text-meta text-paper/70">{product.pricingNote}</p>
            {product.whiteLabel && (
              <p className="mt-1 font-mono text-label uppercase tracking-[0.14em] text-paper/40">
                White-label & enterprise licensing available
              </p>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            {product.images?.[0] ? (
              // eslint-disable-next-line @next/next/no-img-element -- static export: no optimizer
              <img
                src={product.images[0].src}
                alt={product.images[0].alt}
                loading="lazy"
                className="w-full border border-paper/10 bg-surface"
              />
            ) : (
              <ProductMock variant={product.mock} />
            )}
          </Reveal>
        </div>
      </section>

      {/* Problem / outcome */}
      <section className="py-section">
        <div className="container-page grid gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="eyebrow text-paper/40">The problem</h2>
            <p className="mt-4 max-w-xl text-lead text-paper/80">{product.problem}</p>
          </Reveal>
          <Reveal delay={0.1} className="border-l-2 border-azure bg-surface p-6">
            <h2 className="eyebrow text-paper/40">The outcome</h2>
            <p className="mt-3 text-lead text-paper">{product.keyClaim}</p>
          </Reveal>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-paper/10 bg-surface py-section">
        <div className="container-page">
          <Reveal>
            <h2 className="eyebrow text-paper/40">Who it&apos;s for</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {product.audience.split("·").map((a) => (
                <span
                  key={a}
                  className="border border-paper/15 px-4 py-2 font-mono text-label uppercase tracking-[0.14em] text-paper/70"
                >
                  {a.trim()}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="py-section">
        <div className="container-page">
          <Reveal>
            <h2 className="eyebrow text-paper/40">What&apos;s included</h2>
          </Reveal>
          <div className="mt-10 border-t border-paper/10">
            {product.features.map((f, fi) => (
              <Reveal
                key={f.title}
                delay={Math.min(fi * 0.05, 0.25)}
                className="grid gap-2 border-b border-paper/10 py-6 md:grid-cols-[1fr_1.6fr] md:gap-10"
              >
                <h3 className="flex gap-3 font-display text-lead font-medium text-paper">
                  <span aria-hidden="true" className="font-mono text-azure-text">
                    /
                  </span>
                  {f.title}
                </h3>
                <p className="text-body text-paper/60 md:pt-0.5">{f.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case study */}
      {caseStudy && (
        <section className="border-t border-paper/10 bg-surface py-section">
          <div className="container-page">
            <Reveal>
              <h2 className="eyebrow text-paper/40">In production</h2>
              <Link
                href={`/projects/#${caseStudy.id}`}
                className="mt-4 inline-flex items-center gap-2 font-display text-title font-medium text-paper transition-colors hover:text-azure-text"
              >
                {caseStudy.title}
                <span aria-hidden="true">→</span>
              </Link>
              <p className="mt-2 max-w-xl text-body text-paper/60">{caseStudy.summary}</p>
            </Reveal>
          </div>
        </section>
      )}

      {/* FAQ */}
      {productFaqs.length > 0 && (
        <section className="py-section">
          <div className="container-page">
            <Reveal>
              <h2 className="eyebrow text-paper/40">Frequently asked</h2>
            </Reveal>
            <dl className="mt-8 max-w-3xl space-y-8">
              {productFaqs.map((f, fi) => (
                <Reveal key={f.question} delay={Math.min(fi * 0.05, 0.2)}>
                  <dt className="font-display text-lead font-medium text-paper">{f.question}</dt>
                  <dd className="mt-2 text-body text-paper/60">{f.answer}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>
      )}

      <FinalCta title={`See ${product.name} running on your data — free, in a week.`} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <BreadcrumbSchema
        items={[
          { name: "Products", path: "/products/" },
          { name: product.name, path: `/products/${product.id}/` },
        ]}
      />
    </>
  );
}
