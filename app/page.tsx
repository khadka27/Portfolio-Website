import { Suspense } from "react";
import HeroSection from "@/components/sections/hero-section";
import SkillsBarSection from "@/components/sections/skills-bar-section";
import IsometricDesk from "@/components/sections/isometric-desk";
import AboutSection from "../components/sections/about-section";
import ExperienceSection from "@/components/sections/experience-section";
import IDEPlayground from "@/components/sections/ide-playground";
import SkillsSection from "@/components/sections/skills-section";
import ProjectsSection from "@/components/sections/projects-section";
import WritingSection from "@/components/sections/writing-section";
import ContactSection from "@/components/sections/contact-section";
import ScrollingBanner from "@/components/sections/scrolling-banner";
import TestimonialsSection from "@/components/sections/testimonials-section";
import CertificationsSection from "@/components/sections/certifications-section";
import WakaTimeSection from "@/components/sections/wakatime-section";
import HireMeCalculator from "@/components/sections/hire-me-calculator";
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
