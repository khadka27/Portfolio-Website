import { NextResponse } from "next/server";
import { getGithubUserProfile } from "@/lib/github";

export async function GET() {
  try {
    const profile = await getGithubUserProfile("khadka27");

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching GitHub profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";
export const revalidate = 3600; // Cache for 1 hour
