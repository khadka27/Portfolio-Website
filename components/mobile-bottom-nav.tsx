"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Home, UserCircle, Layers, MessageSquare, Edit3 } from "lucide-react"

interface NavItem {
  name: string
  id: string
  icon: React.ElementType
}

const allNavItems: NavItem[] = [
  { name: "Home", id: "home", icon: Home },
  { name: "About", id: "about", icon: UserCircle },
  { name: "Projects", id: "projects", icon: Layers },
  { name: "Writing", id: "writing", icon: Edit3 },
  { name: "Contact", id: "contact", icon: MessageSquare },
]

const mobileNavItems = allNavItems.slice(0, 5)

const MobileBottomNav = () => {
  const [activeSection, setActiveSection] = useState("home")
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)

      const sections = mobileNavItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + window.innerHeight / 1.5

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(mobileNavItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(id)
      // Clear hash so reload doesn't re-scroll to this section
      history.replaceState(null, "", window.location.pathname)
    }
  }

  return (
    <motion.nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 h-16 border-t border-border/30 bg-background/80 backdrop-blur-md md:hidden",
        "transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="container mx-auto h-full">
        <ul className="flex h-full items-center justify-around">
          {mobileNavItems.map((item) => (
            <li key={item.id} className="flex-1">
              <Link
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={cn(
                  "flex flex-col items-center justify-center h-full w-full rounded-md p-1 transition-colors duration-200",
                  activeSection === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground/80",
                )}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                <div className="relative">
                  <item.icon
                    className={cn("h-5 w-5 transition-all", activeSection === item.id ? "text-primary" : "")}
                  />
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="active-mobile-nav-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-5 rounded-full bg-primary"
                    />
                  )}
                </div>
                <span className="text-[10px] mt-0.5">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  )
}

export default MobileBottomNav
