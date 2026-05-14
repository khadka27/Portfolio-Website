import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import ProjectCard from "./project-card";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  homepage: string | null;
  topics: string[];
}

async function getGithubRepos(): Promise<Repo[]> {
  try {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const headers: HeadersInit = { Accept: "application/vnd.github.v3+json" };

    const fetchRepos = async (token?: string) => {
      const requestHeaders = { ...headers };
      if (token) requestHeaders["Authorization"] = `token ${token}`;

      // Add 5s timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const response = await fetch(
          "https://api.github.com/users/khadka27/repos?sort=updated&direction=desc&per_page=6",
          {
            headers: requestHeaders,
            next: { revalidate: 3600 }, // Cache for 1 hour
            signal: controller.signal,
          },
        );
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    };

    let res: Response;
    try {
      res = await fetchRepos(GITHUB_TOKEN);
    } catch (error) {
      console.warn("Initial fetch failed, returning empty list", error);
      return [];
    }

    // Handle 429/403 specifically
    if (res.status === 429 || res.status === 403) {
      console.warn(
        `GitHub API limit (${res.status}). Using cached or empty data.`,
      );
      return [];
    }

    const contentType = res.headers.get("content-type");
    if (!res.ok) {
      console.warn(`GitHub repos fetch failed: ${res.status}`);
      return [];
    }
    if (contentType?.includes("application/json")) {
      const repos = await res.json();
      return repos.map((repo: any) => ({ ...repo, topics: repo.topics || [] }));
    }
    return [];
  } catch (error) {
    console.warn("Error fetching GitHub repos, returning empty list", error);
    return [];
  }
}

const languageColor: { [key: string]: string } = {
  JavaScript: "text-yellow-400 border-yellow-400",
  TypeScript: "text-blue-400 border-blue-400",
  HTML: "text-orange-500 border-orange-500",
  CSS: "text-blue-500 border-blue-500",
  Python: "text-green-500 border-green-500",
  Java: "text-red-500 border-red-500",
  Shell: "text-gray-400 border-gray-400",
  Vue: "text-green-400 border-green-400",
  PHP: "text-purple-400 border-purple-400",
};

const ProjectsSection = async () => {
  const repos = await getGithubRepos();

  return (
    <section id="projects" className="section-shell">
      {/* Enhanced Header */}
      <div className="text-center mb-14 md:mb-18">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">
            My Projects
          </h2>
          <svg
            className="h-8 w-8 md:h-10 md:w-10 text-foreground"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </div>
        <p className="section-lead">
          Explore my latest work from GitHub. Each project showcases different
          technologies and problem-solving approaches.
        </p>
      </div>

      {repos.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {repos.map((repo, index) => (
            <ProjectCard
              key={repo.id}
              repo={repo}
              index={index}
              languageColor={languageColor}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Could not load projects. Please try again later.
          </p>
        </div>
      )}

      {/* View More on GitHub Button */}
      {repos.length > 0 && (
        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium"
          >
            <a
              href="https://github.com/khadka27"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <svg
                className="mr-2 h-5 w-5"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              View More on GitHub
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
