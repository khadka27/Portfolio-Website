import { Suspense } from "react";
import HeroSection from "@/components/sections/hero-section";
import SkillsBarSection from "@/components/sections/skills-bar-section";
import AboutSection from "@/components/sections/about-section";
import ExperienceSection from "@/components/sections/experience-section";
import SkillsSection from "@/components/sections/skills-section";
import ProjectsSection from "@/components/sections/projects-section";
import WritingSection from "@/components/sections/writing-section";
import ContactSection from "@/components/sections/contact-section";
import { ProjectsSectionSkeleton } from "@/components/project-card-skeleton";

import { getGithubUserProfile } from "@/lib/github";

export default async function Home() {
  const profile = await getGithubUserProfile("khadka27");

  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <HeroSection githubProfileImage={profile?.avatar_url} />
      <SkillsBarSection />
      <AboutSection />{" "}
      {/* AboutSection now handles its own loading/error states */}
      <ExperienceSection />
      <SkillsSection />
      <Suspense fallback={<ProjectsSectionSkeleton />}>
        <ProjectsSection />
      </Suspense>
      <WritingSection />
      <ContactSection />
    </main>
  );
}
