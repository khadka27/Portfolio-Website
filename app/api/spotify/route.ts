import { NextResponse } from "next/server";

const OFFLINE_RESPONSE = { isPlaying: false };

async function getAccessToken(clientId: string, clientSecret: string, refreshToken: string) {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken }),
    cache: "no-store",
  });
  const data = await res.json();
  return data.access_token as string;
}

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return NextResponse.json(OFFLINE_RESPONSE);
  }

  try {
    const accessToken = await getAccessToken(clientId, clientSecret, refreshToken);

    const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    if (res.status === 204 || res.status > 400) {
      return NextResponse.json(OFFLINE_RESPONSE);
    }

    const song = await res.json();

    if (!song || !song.item) {
      return NextResponse.json(OFFLINE_RESPONSE);
    }

    const { item, is_playing, progress_ms } = song;

    return NextResponse.json({
      isPlaying: is_playing,
      title: item.name,
      artist: item.artists.map((a: any) => a.name).join(", "),
      album: item.album.name,
      albumArt: item.album.images?.[0]?.url || null,
      songUrl: item.external_urls.spotify,
      duration: item.duration_ms,
      progress: progress_ms,
    });
  } catch {
    return NextResponse.json(OFFLINE_RESPONSE);
  }
}
