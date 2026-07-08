import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FinalCta from "@/components/FinalCta";
import { getAllPosts, formatPostDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Plain answers about software for real operations",
  description:
    "Guides and plain-language insights from Acmevia: ERP costs, CRM adoption, LMS buying advice, and what actually works when businesses replace spreadsheets with systems.",
  alternates: { canonical: "/blog/" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="border-b border-paper/10 pb-16 pt-40">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Blog</p>
            <h1 className="mt-4 max-w-4xl font-display text-hero font-semibold text-paper">
              Plain answers. No brochure talk.
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-paper/60">
              What we've learned building systems for real operations —
              written for the people who run them, not for other developers.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <ul className="border-t border-paper/10">
            {posts.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={Math.min(i * 0.06, 0.3)}>
                <Link
                  href={`/blog/${post.slug}/`}
                  className="slash-host group grid gap-3 border-b border-paper/10 py-10 transition-colors duration-300 hover:border-azure/40 md:grid-cols-[200px_1fr] md:gap-12"
                >
                  <p className="font-mono text-label uppercase tracking-[0.14em] text-paper/40">
                    {formatPostDate(post.date)}
                    <span className="mt-1.5 block text-azure-text">
                      {post.category} · {post.readingMinutes} min read
                    </span>
                  </p>
                  <div>
                    <h2 className="max-w-3xl font-display text-title font-semibold text-paper transition-colors duration-300 group-hover:text-azure-text">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-3xl text-body text-paper/60">
                      {post.description}
                    </p>
                    <p className="mt-5 font-mono text-label uppercase tracking-[0.14em] text-azure-text">
                      Read
                      <span
                        aria-hidden="true"
                        className="ml-2 inline-block transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5"
                      >
                        →
                      </span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta title="Rather talk it through than read about it?" />
    </>
  );
}
