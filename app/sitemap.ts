import type { MetadataRoute } from "next";
import { siteUrl, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = [
    "",
    "#about",
    "#experience",
    "#skills",
    "#projects",
    "#writing",
    "#contact",
  ];

  const sectionLinks = sections.map((section) => ({
    url: `${siteUrl}${section}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: section === "" ? 1 : 0.8,
  }));

  const socialLinks = siteConfig.sameAs.map((url) => ({
    url,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...sectionLinks, ...socialLinks];
}
