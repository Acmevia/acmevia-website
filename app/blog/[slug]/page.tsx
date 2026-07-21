import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import FinalCta from "@/components/FinalCta";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { getAllPosts, getPost, formatPostDate } from "@/lib/blog";
import { site } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.seoTitle ?? post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.legalName, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}/`,
  };

  return (
    <>
      <article>
        <header className="border-b border-paper/10 pb-14 pt-40">
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">
                {post.category} · {formatPostDate(post.date)} ·{" "}
                {post.readingMinutes} min read
              </p>
              <h1 className="mt-5 max-w-4xl font-display text-display font-semibold text-paper">
                {post.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lead text-paper/60">
                {post.description}
              </p>
            </Reveal>
          </div>
        </header>

        <div className="container-page py-16">
          {post.cover && (
            <Reveal className="mb-14">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export: no optimizer */}
              <img
                src={post.cover.src}
                alt={post.cover.alt}
                className="w-full max-w-3xl border border-paper/10 object-cover"
              />
            </Reveal>
          )}

          <Reveal delay={0.08}>
            <div
              className="prose-av max-w-3xl"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-16 max-w-3xl border-t border-paper/10 pt-8">
            <p className="font-mono text-label uppercase tracking-[0.14em] text-paper/40">
              Written by the Acmevia team
            </p>
            <Link
              href="/blog/"
              className="mt-4 inline-flex min-h-11 items-center font-mono text-label uppercase tracking-[0.14em] text-azure-text"
            >
              <span aria-hidden="true" className="mr-2">
                ←
              </span>
              All posts
            </Link>
          </Reveal>
        </div>
      </article>

      <FinalCta title="Tell us the problem. We'll build the system." />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Blog", path: "/blog/" },
          { name: post.title, path: `/blog/${post.slug}/` },
        ]}
      />
    </>
  );
}
