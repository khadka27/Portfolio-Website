"use client";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface MediumPostItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  categories: string[];
}

interface RssResponse {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: MediumPostItem[];
}

interface Post {
  id: string;
  title: string;
  date: string;
  snippet: string;
  imageUrl?: string;
  link: string;
  tags?: string[];
}

async function getMediumPosts(username: string): Promise<Post[]> {
  try {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) {
      console.error(
        `Failed to fetch Medium RSS feed for @${username}. Status: ${res.status}`,
      );
      return [];
    }
    const data: RssResponse = await res.json();
    if (data.status !== "ok" || !data.items) {
      console.error(
        `RSS to JSON API returned an error or no items for @${username}:`,
        data,
      );
      return [];
    }
    return data.items.slice(0, 6).map((item) => {
      let plainTextSnippet = "No snippet available.";
      if (item.description) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = item.description;
        const firstParagraph = tempDiv.querySelector("p");
        if (firstParagraph?.textContent)
          plainTextSnippet = firstParagraph.textContent;
        else plainTextSnippet = tempDiv.textContent || tempDiv.innerText || "";
        plainTextSnippet =
          plainTextSnippet.trim().substring(0, 150) +
          (plainTextSnippet.length > 150 ? "..." : "");
      }

      // Get actual image from Medium - filter out default Medium logo
      let imageUrl = item.thumbnail;
      if (
        imageUrl &&
        (imageUrl.includes("TGH72N1I0qf3g_5p-h2fXg") ||
          imageUrl.includes("max/1200/1*"))
      ) {
        // Use Medium's CDN image if available
        imageUrl = item.thumbnail;
      }

      return {
        id: item.guid,
        title: item.title,
        date: new Date(item.pubDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        snippet: plainTextSnippet,
        imageUrl: imageUrl || undefined,
        link: item.link,
        tags: item.categories || [],
      };
    });
  } catch (error) {
    console.error(
      `Error fetching or parsing Medium posts for @${username}:`,
      error,
    );
    return [];
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

const WritingSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (typeof globalThis.window !== "undefined") {
          const fetchedPosts = await getMediumPosts("khadka27");
          setPosts(fetchedPosts);
        }
      } catch (e) {
        console.error(e);
        setError("Failed to load articles.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section id="writing" className="section-shell">
      {/* Header with Medium Logo */}
      <div className="text-center mb-14 md:mb-18">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">
            My Writing
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-lead"
        >
          Sharing ideas, tutorials, and thoughts on development from my Medium
          blog.
        </motion.p>
      </div>

      {isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[1, 2, 3].map((cardId) => (
            <Card
              key={`skeleton-${cardId}`}
              className="h-full flex flex-col overflow-hidden glass-effect border-border/50"
            >
              <div className="w-full h-48 bg-muted/50 animate-pulse"></div>
              <CardHeader>
                <div className="h-6 w-3/4 bg-muted/50 animate-pulse rounded"></div>
                <div className="h-4 w-1/2 bg-muted/50 animate-pulse rounded mt-2"></div>
              </CardHeader>
              <CardContent className="grow">
                <div className="h-4 bg-muted/50 animate-pulse rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-muted/50 animate-pulse rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-muted/50 animate-pulse rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && error && (
        <p className="text-center text-destructive">{error}</p>
      )}

      {!isLoading && !error && posts.length === 0 && (
        <p className="text-center text-muted-foreground">
          No articles found or failed to load.
        </p>
      )}

      {!isLoading && !error && posts.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2, once: true }}
              className="h-full"
            >
              <Card className="h-full flex flex-col overflow-hidden glass-effect border-border/50 hover:border-primary/50 transition-all duration-300 group hover:shadow-xl hover:shadow-primary/10">
                {/* Only show image if it exists and is not the default Medium logo */}
                {post.imageUrl &&
                !post.imageUrl.includes("TGH72N1I0qf3g_5p-h2fXg") ? (
                  <div className="relative w-full h-48 overflow-hidden bg-muted">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                ) : null}

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg sm:text-xl line-clamp-2 group-hover:text-primary transition-colors">
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.title}
                    </a>
                  </CardTitle>
                  <div className="flex items-center text-xs text-muted-foreground pt-1">
                    <CalendarDays size={14} className="mr-1.5" />
                    {post.date}
                  </div>
                </CardHeader>

                <CardContent className="grow pb-4">
                  <CardDescription className="line-clamp-3 text-sm">
                    {post.snippet}
                  </CardDescription>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-primary/10 text-primary px-2.5 py-0.5 rounded-full border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                    asChild
                    variant="ghost"
                    className="text-primary hover:text-primary/90 hover:bg-primary/5 p-0 h-auto group/btn"
                  >
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      Read on Medium
                      <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {!isLoading && !error && posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium"
          >
            <a
              href="https://medium.com/@khadka27"
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Posts on Medium
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      )}
    </section>
  );
};

export default WritingSection;
