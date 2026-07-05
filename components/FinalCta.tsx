import Link from "next/link";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { site } from "@/lib/data";

/** The sitewide closing move: one statement, one primary action. */
export default function FinalCta({
  title = "Tell us the problem. We'll build the system.",
}: {
  title?: string;
}) {
  return (
    <section className="relative overflow-hidden py-section">
      {/* Faint monogram slash geometry in the background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-[-10%] w-1/2 opacity-[0.06]"
        style={{
          background:
            "repeating-linear-gradient(115deg, transparent 0 90px, #00b2ff 90px 92px)",
        }}
      />
      <div className="container-page relative">
        <Reveal>
          <p className="eyebrow">Start here</p>
          <h2 className="mt-5 max-w-4xl font-display text-hero font-semibold text-paper">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <Link href="/contact/#book" className="btn btn-primary">
              Book a Free Demo
            </Link>
          </Magnetic>
          <Magnetic>
            <a
              href={site.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Message us on WhatsApp
            </a>
          </Magnetic>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-8 font-mono text-label uppercase tracking-[0.14em] text-paper/40">
            {site.responseCommitment}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
