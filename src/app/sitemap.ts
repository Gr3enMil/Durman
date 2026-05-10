import type { MetadataRoute } from "next";
import { getAllReferences } from "@/lib/references";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://durisasyn.cz";

export default function sitemap(): MetadataRoute.Sitemap {
  const basePages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/reference`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/pravni-informace`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  const referencePages: MetadataRoute.Sitemap = getAllReferences().map((reference) => ({
    url: `${siteUrl}/reference/${reference.slug}`,
    lastModified: new Date(reference.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...basePages, ...referencePages];
}
