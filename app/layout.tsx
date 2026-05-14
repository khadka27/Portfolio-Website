import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import { Toaster } from "@/components/ui/toaster";
import Chatbot from "@/components/chatbot";
import JsonLd from "@/components/json-ld";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import SkipToContent from "@/components/skip-to-content";
import ScrollProgress from "@/components/scroll-progress";
import { getRootMetadata, getSiteJsonLdGraph } from "@/lib/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = getRootMetadata();

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#1A202C" },
  ],
};

const siteJsonLdGraph = getSiteJsonLdGraph();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <JsonLd data={siteJsonLdGraph} />
          <SkipToContent />
          <ScrollProgress />
          <Header />
          <div className="pb-20 md:pb-0">{children}</div>
          <Footer />
          <MobileBottomNav />
          <ScrollToTopButton />
          <Chatbot />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
