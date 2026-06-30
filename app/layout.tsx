import type React from "react";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import { Toaster } from "@/components/ui/toaster";
import JsonLd from "@/components/json-ld";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import SkipToContent from "@/components/skip-to-content";
import ScrollProgress from "@/components/scroll-progress";
import { getRootMetadata, getSiteJsonLdGraph } from "@/lib/site";
import dynamic from "next/dynamic";

// Dynamically import heavy UI overlays & widgets
const CommandMenu = dynamic(() => import("@/components/command-menu"));
const CustomCursor = dynamic(() => import("@/components/ui/custom-cursor"));
const TerminalConsole = dynamic(() => import("@/components/terminal-console"));
const AchievementsTracker = dynamic(() => import("@/components/achievements-tracker"));
const ThemeConfigurator = dynamic(() => import("@/components/theme-configurator"));
const RetroArcade = dynamic(() => import("@/components/retro-arcade"));
const KonamiEasterEgg = dynamic(() => import("@/components/konami-easter-egg"));
const SpotifyWidget = dynamic(() => import("@/components/spotify-widget"));

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

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
      <head>
        {/* Prevent browser from restoring scroll position or jumping to URL hash on reload */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              if (window.location.hash) {
                history.replaceState(null, '', window.location.pathname + window.location.search);
              }
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${inter.className}`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <JsonLd data={siteJsonLdGraph} />
          <SkipToContent />
          <ScrollProgress />
          <div className="relative flex min-h-screen flex-col overflow-x-hidden w-full">
            <Header />
            <div className="flex-1 pb-32 md:pb-0">{children}</div>
            <Footer />
          </div>
          <MobileBottomNav />
          <ScrollToTopButton />
          <CommandMenu />
          <Toaster />
          <CustomCursor />
          <TerminalConsole />
          <AchievementsTracker />
          <ThemeConfigurator />
          <RetroArcade />
          <KonamiEasterEgg />
          <SpotifyWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
