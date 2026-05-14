"use client";
import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Send,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    description: "Send me an email anytime",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Nepal",
    description: "Available for remote work worldwide",
  },
  {
    icon: Calendar,
    title: "Availability",
    value: "Open to new projects",
    description: "Currently accepting freelance work",
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/khadka27", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/abishekkhadka",
    label: "LinkedIn",
  },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS credentials are not set.");
      toast({
        title: "Configuration Error",
        description:
          "Contact form is not set up. Please inform the site owner.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    emailjs
      .send(serviceId, templateId, formData, publicKey)
      .then(() => {
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        toast({
          title: "Error Sending Message",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl md:h-96 md:w-96"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 flex flex-col items-center gap-4"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-sm shadow-primary/5 backdrop-blur-sm dark:border-primary/30 dark:bg-primary/10">
              <MessageCircle
                className="h-3.5 w-3.5 shrink-0 text-primary"
                aria-hidden
              />
              Get In Touch
            </span>
            <span
              className="h-px w-16 max-w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
              aria-hidden
            />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-balance font-bold tracking-tight text-foreground"
          >
            <span className="block text-2xl md:text-3xl lg:text-4xl">
              Let&apos;s Work{" "}
              <span className="gradient-text">Together</span>
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            Tell me about your idea or project. I reply within a day and am
            happy to discuss scope, timeline, and how we can ship something
            great.
          </motion.p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Contact Cards */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 sm:p-5 glass-effect border-border/50 hover:border-primary/50 transition-all duration-300 group">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                      <method.icon className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-foreground sm:text-base">
                        {method.title}
                      </h3>
                      {method.href ? (
                        <a
                          href={method.href}
                          className="mt-0.5 block text-sm font-medium text-primary hover:underline"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm font-medium text-foreground">
                          {method.value}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex gap-4"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border/50 bg-background/80 p-3 glass-effect transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 group"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-5 sm:p-6 glass-effect border-border/50">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-12 bg-background/50 border-border focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12 bg-background/50 border-border focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-background/50 border-border focus:border-primary focus:ring-primary resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full bg-primary text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
      </div>
    </section>
  );
};

export default ContactSection;
