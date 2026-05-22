"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BlogFeedSkeleton from "./BlogFeedSkeleton";

interface BlogPost {
  title: string;
  pubDate: string;
  link: string;
  slug: string;
  description: string;
}

export default function BlogFeed() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("[BlogFeed Client Fetch Error]:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <BlogFeedSkeleton />;
  }

  if (error || posts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground font-light italic">
        Writing feed is currently offline. Check back later.
      </p>
    );
  }

  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
      {posts.map((post, i) => (
        <article key={i} className="group border-b border-border pb-8 last:border-0">
          <time className="text-xs text-muted-foreground font-mono tracking-widest uppercase">
            {post.pubDate}
          </time>
          <h3 className="text-xl md:text-2xl font-light text-foreground mt-2 mb-2 group-hover:text-accent transition-colors duration-300">
            <Link href={`/writing/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground font-light leading-relaxed">
            {post.description}
          </p>
        </article>
      ))}
    </div>
  );
}
