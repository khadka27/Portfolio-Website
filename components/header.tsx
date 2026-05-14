"use client";
import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Experience", id: "experience" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Testimonials", id: "testimonials" },
  { name: "Writing", id: "writing" },
  { name: "Contact", id: "contact" },
];

const Header = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg bg-white/10 dark:bg-black/30 border-b border-border/20",
        isScrolled ? "shadow-lg" : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 h-16 md:h-20">
        {/* Logo */}
        <Link
          href="/"
          className="relative text-xl sm:text-2xl font-bold group"
          aria-label={`${siteConfig.name} — home`}
        >
          <span className="bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-105">
            {siteConfig.name}
          </span>
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-amber-500"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center space-x-1 lg:space-x-2"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleLinkClick(e, item.id)}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md",
                "hover:bg-primary/10 hover:text-primary",
                activeSection === item.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.name}
              {activeSection === item.id && (
                <motion.span
                  layoutId="underline-desktop"
                  className="absolute left-0 -bottom-1 block h-0.5 w-full bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-primary/10 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "md:hidden glass-effect border-t border-border/50 backdrop-blur-lg bg-white/10 dark:bg-black/30"
            )}
          >
            <nav
              className="container mx-auto px-4 py-4 flex flex-col space-y-1"
              aria-label="Primary"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`#${item.id}`}
                    onClick={(e) => handleLinkClick(e, item.id)}
                    className={cn(
                      "block px-4 py-3 rounded-md text-base font-medium transition-colors duration-200",
                      "hover:bg-primary/10 hover:text-primary",
                      activeSection === item.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
export default Header;
