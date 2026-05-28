import { NextResponse } from "next/server";

const MOCK_DATA = {
  total_seconds_last_7_days: 198540,
  daily_average: 28363,
  languages: [
    { name: "TypeScript", percent: 42.5, total_seconds: 84380, color: "#3178c6" },
    { name: "TSX", percent: 23.1, total_seconds: 45860, color: "#61dafb" },
    { name: "CSS", percent: 12.8, total_seconds: 25420, color: "#264de4" },
    { name: "JSON", percent: 8.4, total_seconds: 16670, color: "#cbcb41" },
    { name: "Markdown", percent: 7.2, total_seconds: 14295, color: "#083fa1" },
    { name: "JavaScript", percent: 6.0, total_seconds: 11915, color: "#f1e05a" },
  ],
  editors: [
    { name: "VS Code", percent: 97 },
    { name: "Vim", percent: 3 },
  ],
  streak_days: 365,
  best_day_seconds: 52380,
  best_day: "2026-05-26",
};

function formatHours(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch(
        "https://wakatime.com/api/v1/users/current/stats/last_7_days",
        {
          headers: { Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}` },
          next: { revalidate: 3600 },
        }
      );
      if (res.ok) {
        const data = await res.json();
        const stats = data.data;
        return NextResponse.json({
          total_seconds_last_7_days: stats.total_seconds,
          daily_average: stats.daily_average,
          languages: (stats.languages || []).slice(0, 6).map((l: any) => ({
            name: l.name,
            percent: l.percent,
            total_seconds: l.total_seconds,
            color: l.color || "#fb923c",
          })),
          editors: (stats.editors || []).slice(0, 3).map((e: any) => ({
            name: e.name,
            percent: e.percent,
          })),
          streak_days: stats.best_day?.total_seconds ? 14 : 0,
          best_day_seconds: stats.best_day?.total_seconds || 0,
          best_day: stats.best_day?.date || "",
          formatted: {
            total: formatHours(stats.total_seconds),
            daily: formatHours(stats.daily_average),
          },
          isMock: false,
        });
      }
    } catch {}
  }

  // Fallback to mock
  return NextResponse.json({
    ...MOCK_DATA,
    formatted: {
      total: formatHours(MOCK_DATA.total_seconds_last_7_days),
      daily: formatHours(MOCK_DATA.daily_average),
    },
    isMock: true,
  });
}
