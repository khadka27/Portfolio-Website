"use client"

import type React from "react"

const SkipToContent: React.FC = () => {
  const handleSkip = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const mainContent = document.getElementById("main-content")
    if (mainContent) {
      mainContent.setAttribute("tabindex", "-1")
      mainContent.focus({ preventScroll: true })
    }
  }

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
    >
      Skip to main content
    </a>
  )
}

export default SkipToContent
