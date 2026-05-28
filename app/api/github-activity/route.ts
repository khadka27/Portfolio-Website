import { NextResponse } from "next/server";

const MOCK_EVENTS = [
  { type: "PushEvent", repo: "khadka27/Portfolio-Website", message: "fix: mobile view improvements", time: "2 min ago", branch: "main" },
  { type: "CreateEvent", repo: "khadka27/nextjs-saas-starter", message: "Created branch feature/auth", time: "1 hr ago", branch: "feature/auth" },
  { type: "PullRequestEvent", repo: "khadka27/ecom-platform", message: "Opened PR: Add Khalti payment integration", time: "3 hrs ago", branch: "feature/khalti" },
  { type: "PushEvent", repo: "khadka27/real-time-chat", message: "feat: implement socket.io rooms", time: "5 hrs ago", branch: "main" },
  { type: "WatchEvent", repo: "vercel/next.js", message: "Starred vercel/next.js", time: "8 hrs ago", branch: "" },
  { type: "PushEvent", repo: "khadka27/admin-dashboard", message: "refactor: clean up prisma schema", time: "1 day ago", branch: "dev" },
  { type: "PullRequestEvent", repo: "khadka27/ecom-platform", message: "Merged PR: Stripe webhook handler", time: "1 day ago", branch: "main" },
  { type: "CreateEvent", repo: "khadka27/api-boilerplate", message: "Created repository api-boilerplate", time: "2 days ago", branch: "main" },
];

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    try {
      const res = await fetch(
        "https://api.github.com/users/khadka27/events/public?per_page=15",
        {
          headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
          next: { revalidate: 300 },
        }
      );

      if (res.ok) {
        const events = await res.json();

        const mapped = events
          .filter((e: any) => ["PushEvent", "CreateEvent", "PullRequestEvent", "WatchEvent", "ForkEvent"].includes(e.type))
          .slice(0, 10)
          .map((e: any) => {
            let message = "";
            let branch = "";

            if (e.type === "PushEvent") {
              const commits = e.payload?.commits || [];
              message = commits[0]?.message?.split("\n")[0] || "Pushed commits";
              branch = e.payload?.ref?.replace("refs/heads/", "") || "main";
            } else if (e.type === "CreateEvent") {
              message = `Created ${e.payload?.ref_type || "branch"} ${e.payload?.ref || ""}`;
              branch = e.payload?.ref || "";
            } else if (e.type === "PullRequestEvent") {
              const pr = e.payload?.pull_request;
              message = `${e.payload?.action === "closed" && pr?.merged ? "Merged" : e.payload?.action === "opened" ? "Opened" : "Updated"} PR: ${pr?.title || ""}`;
              branch = pr?.head?.ref || "";
            } else if (e.type === "WatchEvent") {
              message = `Starred ${e.repo?.name}`;
            } else if (e.type === "ForkEvent") {
              message = `Forked ${e.repo?.name}`;
            }

            const created = new Date(e.created_at);
            const diff = Date.now() - created.getTime();
            const mins = Math.floor(diff / 60000);
            const hrs = Math.floor(mins / 60);
            const days = Math.floor(hrs / 24);
            const time =
              days > 0 ? `${days}d ago` :
              hrs > 0 ? `${hrs}h ago` :
              mins > 0 ? `${mins}m ago` : "just now";

            return {
              type: e.type,
              repo: e.repo?.name || "",
              message,
              time,
              branch,
            };
          });

        return NextResponse.json({ events: mapped, isMock: false });
      }
    } catch {}
  }

  return NextResponse.json({ events: MOCK_EVENTS, isMock: true });
}
