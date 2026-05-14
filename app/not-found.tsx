import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: `The page you requested is not part of ${siteConfig.name}'s portfolio.`,
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background">
      <AlertTriangle className="w-24 h-24 text-primary mb-8" />
      <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">Page Not Found</h2>
      <p className="text-lg text-muted-foreground mb-10 max-w-md">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
        <Link href="/">Go Back to Homepage</Link>
      </Button>
    </div>
  )
}
