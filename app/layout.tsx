import type React from "react";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import { Toaster } from "@/components/ui/toaster";
import CommandMenu from "@/components/command-menu";
import JsonLd from "@/components/json-ld";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import SkipToContent from "@/components/skip-to-content";
import ScrollProgress from "@/components/scroll-progress";
import { getRootMetadata, getSiteJsonLdGraph } from "@/lib/site";
import CustomCursor from "@/components/ui/custom-cursor";
import TerminalConsole from "@/components/terminal-console";
import AchievementsTracker from "@/components/achievements-tracker";
import ThemeConfigurator from "@/components/theme-configurator";
import RetroArcade from "@/components/retro-arcade";
import KonamiEasterEgg from "@/components/konami-easter-egg";
import SpotifyWidget from "@/components/spotify-widget";



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
      <head></head>
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
