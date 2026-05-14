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
import { ExternalLink, Eye, Star, GitFork } from "lucide-react";

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

interface ProjectCardProps {
  repo: Repo;
  index: number;
  languageColor: { [key: string]: string };
}

export default function ProjectCard({
  repo,
  index,
  languageColor,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2, once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="group flex flex-col bg-card border-border h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/50">
        <CardHeader className="pb-3 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg sm:text-xl font-bold  line-clamp-1">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {repo.name}
              </a>
            </CardTitle>
            {repo.stargazers_count > 0 && (
              <div className="flex items-center gap-1 text-muted-foreground text-sm shrink-0">
                <Star className="w-4 h-4" />
                <span>{repo.stargazers_count}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {repo.language && (
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                  languageColor[repo.language] ||
                  "text-muted-foreground border-border"
                }`}
              >
                {repo.language}
              </span>
            )}
            {repo.topics.slice(0, 2).map((topic) => (
              <span
                key={topic}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {topic}
              </span>
            ))}
          </div>
        </CardHeader>

        <CardContent className="flex-grow pb-4">
          <CardDescription className="text-sm leading-relaxed line-clamp-3">
            {repo.description || "No description available."}
          </CardDescription>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 pt-0">
          <Button
            asChild
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-md group/btn"
          >
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <span>View on GitHub</span>
              <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </Button>
          {repo.homepage && (
            <Button
              asChild
              variant="outline"
              className="w-full border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground font-medium group/btn"
            >
              <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                <span>Live Demo</span>
                <Eye className="w-4 h-4 ml-2 group-hover/btn:scale-110 transition-transform" />
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
