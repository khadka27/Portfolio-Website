"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ServerCrash } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background">
      <ServerCrash className="w-24 h-24 text-destructive mb-8" />
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Something Went Wrong</h1>
      <p className="text-lg text-muted-foreground mb-6 max-w-lg">
        We&apos;re sorry, but an unexpected error occurred. Our team has been notified.
      </p>
      <p className="text-sm text-muted-foreground mb-10">Error Digest: {error.digest || "N/A"}</p>
      <div className="flex gap-4">
        <Button
          onClick={() => reset()}
          size="lg"
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Try Again
        </Button>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    </div>
  )
}
