"use client"

import { useState, useEffect } from "react"

const PREFERS_REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

export function useReducedMotion(): boolean {
  const [matches, setMatches] = useState(
    typeof window !== "undefined" ? window.matchMedia(PREFERS_REDUCED_MOTION_QUERY).matches : false,
  )

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQueryList = window.matchMedia(PREFERS_REDUCED_MOTION_QUERY)
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches)

    setMatches(mediaQueryList.matches) // Initial check
    mediaQueryList.addEventListener("change", listener)
    return () => mediaQueryList.removeEventListener("change", listener)
  }, [])

  return matches
}
