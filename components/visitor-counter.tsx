"use client"

import { useEffect, useState } from "react"
import { Eye } from "lucide-react"

const VisitorCounter = () => {
  const [visits, setVisits] = useState<number | null>(null)
  const storageKey = "portfolioPageVisits"

  useEffect(() => {
    if (typeof window !== "undefined") {
      let currentVisits = Number.parseInt(localStorage.getItem(storageKey) || "0", 10)
      currentVisits += 1
      localStorage.setItem(storageKey, currentVisits.toString())
      setVisits(currentVisits)
    }
  }, [])

  if (visits === null) {
    return (
      <div className="flex items-center text-sm text-muted-foreground">
        <Eye size={16} className="mr-1.5" />
        <span>Loading views...</span>
      </div>
    )
  }

  return (
    <div className="flex items-center text-sm text-muted-foreground" title="Page views (this browser)">
      <Eye size={16} className="mr-1.5" />
      <span>{visits.toLocaleString()} views</span>
    </div>
  )
}

export default VisitorCounter
