import type { Metadata } from "next";

/** Canonical origin, no trailing slash. Set `NEXT_PUBLIC_SITE_URL` in production. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"
).replace(/\/$/, "");

export const siteConfig = {
  url: siteUrl,
  name: "Abishek Khadka",
  email: "abishekkhadka90@gmail.com",
  /** Default `<title>` and OG name */
  defaultTitle: "Abishek Khadka | Full-Stack Developer & Freelancer from Nepal",
  defaultDescription:
    "Full-stack developer in Pokhara, Nepal. Next.js, React, Node.js, real-time apps, payments (Stripe, Khalti, eSewa), and cloud deployment. Open to freelance and remote work worldwide.",
  locale: "en_US",
  language: "en",
  twitterHandle: "@khadka_27",
  sameAs: [
    "https://github.com/khadka27",
    "https://linkedin.com/in/khadka27",
    "https://twitter.com/khadka_27",
  ],
  keywords: [
    "Abishek Khadka",
    "Full Stack Developer Nepal",
    "Freelance Web Developer Nepal",
    "Next.js Developer",
    "Node.js Developer",
    "React Developer",
    "Pokhara",
    "khadka27",
    "MERN Stack",
    "Socket.io",
    "Stripe",
    "Khalti",
    "eSewa",
  ],
} as const;

const personId = `${siteUrl}#person`;
const websiteId = `${siteUrl}#website`;
const webpageId = `${siteUrl}#webpage`;

/** Single JSON-LD graph: Person, WebSite, WebPage (linked with @id). */
export function getSiteJsonLdGraph() {
  const person = {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    url: siteUrl,
    jobTitle: "Full-Stack Developer",
    description: siteConfig.defaultDescription,
    image: new URL("/og-image.png", siteUrl).toString(),
    worksFor: {
      "@type": "Organization",
      name: "Abishek Khadka (Freelance)",
    },
    sameAs: [...siteConfig.sameAs],
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pokhara",
      addressRegion: "Gandaki Province",
      addressCountry: "NP",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "WebSocket",
      "REST API",
      "Full-Stack Development",
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    inLanguage: siteConfig.locale.replace("_", "-"),
    publisher: { "@id": personId },
    author: { "@id": personId },
  };

  const webPage = {
    "@type": "WebPage",
    "@id": webpageId,
    url: siteUrl,
    name: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    inLanguage: siteConfig.locale.replace("_", "-"),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, webPage],
  };
}

/** Root layout metadata (merged with route segments). */
export function getRootMetadata(): Metadata {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteConfig.defaultTitle,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.defaultDescription,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.name, url: siteUrl }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteUrl,
      siteName: `${siteConfig.name} — Portfolio`,
      title: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — Full-stack developer portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
      images: ["/twitter-image.png"],
    },
    manifest: "/site.webmanifest",
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    category: "technology",
    ...(google
      ? {
          verification: {
            google,
          },
        }
      : {}),
  };
}
