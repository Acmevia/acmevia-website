/**
 * Blog content layer — build-time only (server components).
 * Posts are CMS-managed Markdown files in /content/blog/*.md
 * (edited at /admin/ — see CMS_GUIDE.md). Do NOT import this from a
 * client component: it reads the filesystem.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  date: string; // ISO
  category: string;
  cover?: { src: string; alt: string };
  readingMinutes: number;
  html: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function parsePost(filename: string): BlogPost | null {
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  if (data.draft) return null;

  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug: filename.replace(/\.md$/, ""),
    title: String(data.title ?? ""),
    seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
    description: String(data.description ?? ""),
    date: new Date(data.date ?? Date.now()).toISOString(),
    category: String(data.category ?? "Insights"),
    cover: data.cover?.src ? { src: data.cover.src, alt: data.cover.alt ?? "" } : undefined,
    readingMinutes: Math.max(1, Math.round(words / 200)),
    html: marked.parse(content, { async: false }) as string,
  };
}

/** All published posts, newest first. */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parsePost)
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
