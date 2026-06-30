import { FolderOpen, ExternalLink } from "lucide-react";
import ProjectsGrid from "./projects-grid";
import ProjectsHeader from "./projects-header";
import CommitVisualizer from "./commit-visualizer";
import GitBranchSimulator from "./git-branch-simulator";
import GitHubActivityFeed from "./github-activity-feed";
import GitHubSkyline from "./github-skyline";


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

async function getRepos(): Promise<Repo[]> {
  try {
    const token = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };
    if (token) headers["Authorization"] = `token ${token}`;

    const ctrl = new AbortController();
    const tid = setTimeout(() => ctrl.abort(), 5000);
    const res = await fetch(
      "https://api.github.com/users/khadka27/repos?sort=updated&direction=desc&per_page=6",
      { headers, next: { revalidate: 3600 }, signal: ctrl.signal },
    );
    clearTimeout(tid);
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((r: any) => ({ ...r, topics: r.topics || [] }));
  } catch {
    return [];
  }
}

export default async function ProjectsSection() {
  const repos = await getRepos();

  return (
    <section id="projects" className="section-shell" suppressHydrationWarning>
      {/* ── Header ──────────────────────────── */}
      <ProjectsHeader />

      {repos.length > 0 ? (
        <ProjectsGrid repos={repos} />
      ) : (
        <div className="text-center py-20">
          <FolderOpen className="h-14 w-14 text-muted-foreground/25 mx-auto mb-4" />
          <p className="text-muted-foreground">
            Couldn't load projects -try again later.
          </p>
        </div>
      )}

      {repos.length > 0 && (
        <div className="text-center mt-8">
          <a
            href="https://github.com/khadka27"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            View All on GitHub
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}

      {/* GitHub Live Activity Feed */}
      <GitHubActivityFeed />

      {repos.length > 0 && (
        <div className="mt-16 pt-12 border-t border-border/40 flex flex-col gap-6">
          <CommitVisualizer />
          <GitBranchSimulator />
        </div>
      )}

      {/* 3D GitHub Contribution Skyline */}
      <div className="mt-16 pt-12 border-t border-border/40">
        <div className="text-center mb-8">
          <span className="section-eyebrow mb-4 inline-flex">
            3D Contribution Skyline
          </span>
          <h3 className="text-xl font-extrabold text-foreground mt-3">
            GitHub Activity — Last 52 Weeks
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Hover any bar to inspect contributions. Tilt shows depth over time.
          </p>
        </div>
        <GitHubSkyline />
      </div>
    </section>
  );
}

