import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import BookDemo from "@/components/contact/BookDemo";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact — Book a free demo",
  description:
    "Tell Acmevia what's slowing your business down. Book a free demo, send a message, or reach us on WhatsApp — we reply within 24 hours.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <section className="pb-section pt-40">
        <div className="container-page grid gap-16 lg:grid-cols-[1fr_1.15fr]">
          {/* Invitation */}
          <div>
            <Reveal>
              <p className="eyebrow">Contact</p>
              <h1 className="mt-4 font-display text-hero font-semibold text-paper">
                Bring us the mess.
              </h1>
              <p className="mt-6 max-w-md text-lead text-paper/60">
                The spreadsheet nobody trusts. The process only one person
                understands. The system everyone works around. That's where we
                start.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-12 space-y-5">
              <div>
                <p className="eyebrow text-paper/40">Sales</p>
                <a
                  href={`mailto:${site.emailSales}`}
                  className="mt-1 inline-block text-lead text-paper transition-colors hover:text-azure"
                >
                  {site.emailSales}
                </a>
              </div>
              <div>
                <p className="eyebrow text-paper/40">Support</p>
                <a
                  href={`mailto:${site.emailSupport}`}
                  className="mt-1 inline-block text-lead text-paper transition-colors hover:text-azure"
                >
                  {site.emailSupport}
                </a>
              </div>
              <div>
                <p className="eyebrow text-paper/40">WhatsApp</p>
                <a
                  href={site.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-lead text-paper transition-colors hover:text-azure"
                >
                  {site.whatsapp}
                </a>
              </div>
              <p className="border-l-2 border-azure pl-4 font-mono text-label uppercase tracking-[0.14em] text-paper/50">
                {site.responseCommitment} Every channel, every timezone.
              </p>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Demo booking */}
      <section id="book" className="border-t border-white/10 bg-ink pb-section pt-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Free demo</p>
            <h2 className="mt-4 font-display text-display font-semibold text-paper">
              See it working before you decide anything.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <BookDemo />
          </Reveal>
        </div>
      </section>
    </>
  );
}
