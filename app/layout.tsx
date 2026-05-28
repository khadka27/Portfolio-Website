import type React from "react";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import { Toaster } from "@/components/ui/toaster";
import Chatbot from "@/components/chatbot-client";
import CommandMenu from "@/components/command-menu";
import JsonLd from "@/components/json-ld";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import SkipToContent from "@/components/skip-to-content";
import ScrollProgress from "@/components/scroll-progress";
import { getRootMetadata, getSiteJsonLdGraph } from "@/lib/site";
import CustomCursor from "@/components/ui/custom-cursor";
import BiosBootLoader from "@/components/bios-boot-loader";
import TerminalConsole from "@/components/terminal-console";
import AchievementsTracker from "@/components/achievements-tracker";
import ThemeConfigurator from "@/components/theme-configurator";
import RetroArcade from "@/components/retro-arcade";



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
      <body className={`${inter.variable} ${outfit.variable} ${inter.className}`}>
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
          <CommandMenu />
          <Toaster />
          <CustomCursor />
          <BiosBootLoader />
          <TerminalConsole />
          <AchievementsTracker />
          <ThemeConfigurator />
          <RetroArcade />
        </ThemeProvider>
      </body>
    </html>
  );
}
