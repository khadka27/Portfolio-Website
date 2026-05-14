import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Single-page portfolio: list only the canonical URL.
 * Hash fragment routes (/#about) are not valid sitemap URLs for crawlers.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
