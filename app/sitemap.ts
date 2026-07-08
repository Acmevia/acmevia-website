import type { MetadataRoute } from "next";
import { site } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const posts = getAllPosts();
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/services/`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/products/`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/projects/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${site.url}/blog/`,
      lastModified: posts[0] ? new Date(posts[0].date) : lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}/`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    { url: `${site.url}/about/`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/contact/`, lastModified, changeFrequency: "yearly", priority: 0.8 },
  ];
}
