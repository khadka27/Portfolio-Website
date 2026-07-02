import type { Metadata } from "next";

/** Canonical origin, no trailing slash. Set `NEXT_PUBLIC_SITE_URL` in production. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.abishekkhadka27.com.np"
).replace(/\/$/, "");

export const siteConfig = {
  url: siteUrl,
  name: "Abishek Khadka",
  email: "abishekkhadka90@gmail.com",
  birthDate: "2002-05-09",
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
    "https://instagram.com/khadka_27",
    // facebook
    "https://facebook.com/khadka27",
    // youtube
    "https://youtube.com/khadka27",

  ],
  keywords: [
    "Abishek Khadka",
    "khadka27",
    "Abishek Khadka Portfolio",
    "khadka27 Portfolio",
    "Abishek Khadka Developer",
    "Abishek Khadka GitHub",
    "Abishek Khadka LinkedIn",
    "Abishek Khadka Twitter",
    "Abishek Khadka Facebook",
    "Abishek Khadka Instagram",
    "Abishek Khadka Youtube",
    "Abhishek Khadka",
    "Abhishek Khadka Developer",
    "Abhishek Khadka Portfolio",
    "Abhishek Khadka Age",
    "Abishek Khadka Age",
    "Full Stack Developer Nepal",
    "Freelance Web Developer Nepal",
    "Next.js Developer",
    "Node.js Developer",
    "React Developer",
    "Pokhara",
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
    birthDate: siteConfig.birthDate,
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
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

  const verification: Record<string, any> = {};
  if (google) verification.google = google;
  if (bing) verification.other = { "msvalidate.01": bing };

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
      canonical: siteUrl,
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
      type: "profile",
      firstName: "Abishek",
      lastName: "Khadka",
      username: "khadka27",
      emails: [siteConfig.email],
      locale: siteConfig.locale,
      url: siteUrl,
      siteName: `${siteConfig.name} - Portfolio`,
      title: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - Full-stack developer portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
      images: [
        {
          url: "/twitter-image.png",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - X/Twitter Card Preview`,
        },
      ],
    },
    manifest: "/site.webmanifest",
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    category: "technology",
    ...(Object.keys(verification).length > 0 ? { verification } : {}),
  };
}
