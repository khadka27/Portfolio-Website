"use client"
import { motion } from "framer-motion"
import { Instagram, Linkedin, Github, Twitter, Mail } from "lucide-react"
import VisitorCounter from "./visitor-counter"
import { siteConfig } from "@/lib/site"

const Footer = () => {
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/khadka27", icon: Github },
    { name: "LinkedIn", url: "https://linkedin.com/in/khadka27", icon: Linkedin },
    { name: "Twitter", url: "https://twitter.com/khadka_27", icon: Twitter },
    { name: "Instagram", url: "https://instagram.com/khadka_27", icon: Instagram },
    { name: "Email", url: `mailto:${siteConfig.email}`, icon: Mail },
  ]

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-background border-t border-border/20 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-primary/20 to-transparent"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Let&apos;s Build Something Amazing</h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Have a project in mind or just want to connect? Feel free to reach out.
          </p>
          <div className="mt-8 mb-10 flex justify-center gap-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="p-3 bg-card border border-border/50 rounded-full text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
              >
                <link.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="border-t border-border/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Abishek Khadka. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <VisitorCounter />
            <button
              onClick={handleScrollToTop}
              className="hover:text-primary transition-colors"
              aria-label="Scroll to top"
            >
              Back to Top &uarr;
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
