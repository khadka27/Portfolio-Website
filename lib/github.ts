export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string | null
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  bio: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
}

export async function getGithubUserProfile(username: string): Promise<GitHubUser | null> {
  try {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN
    if (!GITHUB_TOKEN) console.warn("GitHub API token (GITHUB_TOKEN) not found for user profile fetch.")

    const headers: HeadersInit = { Accept: "application/vnd.github.v3+json" }
    if (GITHUB_TOKEN) headers["Authorization"] = `token ${GITHUB_TOKEN}`

    const fetchProfile = async (token?: string) => {
      const requestHeaders = { ...headers }
      if (token) requestHeaders["Authorization"] = `token ${token}`
      
      return fetch(`https://api.github.com/users/${username}`, {
        headers: requestHeaders,
        cache: "force-cache",
        next: { revalidate: 3600 },
      })
    }

    let res = await fetchProfile(GITHUB_TOKEN)

    if (res.status === 401 && GITHUB_TOKEN) {
      console.warn("GitHub token appears invalid (401). Retrying without token...")
      res = await fetchProfile(undefined)
    }

    const contentType = res.headers.get("content-type")
    if (!res.ok) {
      const errorText = await res.text()
      console.error(
        `Failed to fetch GitHub profile for ${username}. Status: ${res.status} ${res.statusText}. Response: ${errorText}`,
      )
      return null
    }
    if (contentType && contentType.includes("application/json")) return res.json()
    else {
      const unexpectedResponseText = await res.text()
      console.error(
        `Unexpected response type from GitHub API for ${username}. Content-Type: ${contentType}. Response: ${unexpectedResponseText}`,
      )
      return null
    }
  } catch (error) {
    console.error(`Error fetching GitHub profile for ${username} (exception):`, error)
    return null
  }
}
