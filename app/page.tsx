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
      <ExperienceSection />
      <IDEPlayground />
      <SkillsSection />
      <Suspense fallback={<ProjectsSectionSkeleton />}>
        <ProjectsSection />
      </Suspense>
      <WritingSection />
      <ContactSection />
      <ScrollingBanner />
    </main>
  );
}
