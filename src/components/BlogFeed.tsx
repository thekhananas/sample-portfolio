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
  category?: string;
}

export default function BlogFeed() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

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

  const categories = ["ALL", "COMPILERS", "DISTRIBUTED", "EDGE"];

  const filteredPosts = activeCategory === "ALL"
    ? posts
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-border/50">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 font-mono text-[9px] tracking-widest uppercase border transition-all duration-300 cursor-pointer ${
              activeCategory === cat
                ? "border-accent bg-accent-muted/15 text-accent font-bold"
                : "border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div key={activeCategory} className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
        {filteredPosts.length === 0 ? (
          <p className="text-sm text-muted-foreground font-light italic">
            No articles found in this category.
          </p>
        ) : (
          filteredPosts.map((post, i) => (
            <article key={i} className="group border-b border-border pb-8 last:border-0">
              <div className="flex items-center gap-3 mb-2">
                <time className="text-xs text-muted-foreground font-mono tracking-widest uppercase">
                  {post.pubDate}
                </time>
                {post.category && (
                  <>
                    <span className="text-[10px] text-border font-light">|</span>
                    <span className="text-[9px] text-accent font-mono tracking-widest uppercase bg-accent-muted/10 border border-accent/20 px-1.5 py-0.5">
                      {post.category}
                    </span>
                  </>
                )}
              </div>
              <h3 className="text-xl md:text-2xl font-light text-foreground mt-2 mb-2 group-hover:text-accent transition-colors duration-300">
                <Link href={`/writing/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {post.description}
              </p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
