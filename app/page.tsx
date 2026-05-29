import { Suspense } from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/hero-section";
import SkillsBarSection from "@/components/sections/skills-bar-section";

// Dynamically imported components to reduce initial JS payload
const IsometricDesk = dynamic(() => import("@/components/sections/isometric-desk"));
const AboutSection = dynamic(() => import("../components/sections/about-section"));
const ExperienceSection = dynamic(() => import("@/components/sections/experience-section"));
const IDEPlayground = dynamic(() => import("@/components/sections/ide-playground"));
const SkillsSection = dynamic(() => import("@/components/sections/skills-section"));
const ProjectsSection = dynamic(() => import("@/components/sections/projects-section"));
const WritingSection = dynamic(() => import("@/components/sections/writing-section"));
const ContactSection = dynamic(() => import("@/components/sections/contact-section"));
const ScrollingBanner = dynamic(() => import("@/components/sections/scrolling-banner"));
const TestimonialsSection = dynamic(() => import("@/components/sections/testimonials-section"));
const CertificationsSection = dynamic(() => import("@/components/sections/certifications-section"));
const WakaTimeSection = dynamic(() => import("@/components/sections/wakatime-section"));
const HireMeCalculator = dynamic(() => import("@/components/sections/hire-me-calculator"));

import { ProjectsSectionSkeleton } from "@/components/project-card-skeleton";
import { getGithubUserProfile } from "@/lib/github";

export default async function Home() {
  const profile = await getGithubUserProfile("khadka27");

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="outline-none"
    >
      <HeroSection githubProfileImage={profile?.avatar_url} />
      <SkillsBarSection />
      <IsometricDesk />
      <AboutSection
        githubAvatarUrl={profile?.avatar_url}
        location={profile?.location}
      />{" "}
      <CertificationsSection />
      <ExperienceSection />
      <TestimonialsSection />
      <IDEPlayground />
      <SkillsSection />
      <WakaTimeSection />
      <Suspense fallback={<ProjectsSectionSkeleton />}>
        <ProjectsSection />
      </Suspense>
      <WritingSection />
      <HireMeCalculator />
      <ContactSection />
      <ScrollingBanner />
    </main>
  );
}
