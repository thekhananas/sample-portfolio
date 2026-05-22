"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BlogDetailSkeleton from "@/components/BlogDetailSkeleton";

interface WritingDetailsClientProps {
  slug: string;
}

interface BlogPost {
  title: string;
  pubDate: string;
  link: string;
  slug: string;
  description: string;
}

const simulatedArticleContent: Record<string, string[]> = {
  "quantized-inference-operating-models-on-the-edge": [
    "Running Large Language Models (LLMs) on edge consumer devices poses massive hardware constraints, primarily driven by memory bandwidth. When we profile inference runtimes, we see that fetching model weights from DRAM to SRAM on every generation step is the single greatest bottleneck. If your application requires real-time interactions, loading FP16 model weights on consumer devices is out of the question.",
    "The solution is low-bit quantization. By compressing the model parameters from 16-bit floating point to 4-bit integer values (INT4 weight-only quantization), we shrink the memory footprint by 75%. To achieve maximum performance, we calibrate the weights using adaptive quantization scales per layer, ensuring that critical layers with high outlier activations are retained in higher precision.",
    "Combined with compilation libraries like Apache TVM Unity and WebGPU kernels, the compiled engine loads directly into browser-side sandboxes. By fusing CUDA and WebGPU operator layers (combining attention scale-bias offsets directly inside query matrices), we reduce GPU memory transfers, achieving sustained sub-10ms token generation latency on commodity hardware."
  ],
  "asynchronous-ring-sync-sharding-distributed-grids": [
    "Distributed cluster training scales are only as fast as their communication links. In large multi-GPU pipelines, standard data-parallel synchronization bottlenecks at the gradient aggregation phase, where training workers wait for all-reduce communication commands across nodes.",
    "To overcome this network delay, we deployed a sharded parameter syncing framework using PyTorch FSDP (Fully Sharded Data Parallelism) coupled with an Asynchronous Ring Reduction protocol. Instead of copying global parameters, we divide model states, optimizer statistics, and gradients across the active compute nodes in circular rings. The gradient sync occurs concurrently, overlapping with backpropagation calculation threads.",
    "This asynchronous overlapping technique keeps cluster nodes at 94% hardware utilization. If a node drops out due to preemption or latency peaks, our distributed heartbeat layer shunts workloads to neighboring shards. The system resumes execution from memory-buffered state snapshots within 2 seconds, avoiding costly training restarts."
  ],
  "edge-parsing-rss-speeding-up-dynamic-feeds": [
    "Many modern architectures rely on heavy API calls or site rebuilds to fetch external articles. For a writing feed that updates in real-time, this introduces latency or build complexity. Rebuilding static sites for every new article is slow, while raw client-side feed parsing introduces network delays that trigger layout shifting.",
    "Our pipeline leverages Vercel Edge Middleware and custom API paths to parse Substack XML feeds globally in under 50ms. When an LLM agent or human reader requests the feed, the Vercel Edge function intercepts the call, pulls the XML from the origin, extracts target fields using performance-tuned regex engines, and formats the result into a clean, lightweight JSON payload.",
    "We apply Edge CDN caching headers: public, s-maxage=3600 (caching for 1 hour at edge nodes) paired with stale-while-revalidate=600. This guarantees that 99% of requests receive a cached feed instantly. In the event of a cache miss, the edge node revalidates the feed asynchronously in the background, keeping the user response times under 200ms."
  ]
};

export default function WritingDetailsClient({ slug }: WritingDetailsClientProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    try {
      if (typeof window !== "undefined") {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (_) {}
  };

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch("/api/blog");
        if (!res.ok) throw new Error("Failed to fetch feed");
        const data: BlogPost[] = await res.json();
        const found = data.find((p) => p.slug === slug);
        if (found) {
          setPost(found);
        }
      } catch (err) {
        console.error("[Writing Detail Fetch Error]:", err);
        setError(true);
      } finally {
        setLoadingFeed(false);
      }
    };
    fetchFeed();
  }, [slug]);

  if (loadingFeed) {
    return <BlogDetailSkeleton />;
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center animate-[fadeIn_0.5s_ease-out]">
        <span className="text-xs font-mono text-accent uppercase font-bold tracking-widest block mb-4">
          [404 NOT FOUND]
        </span>
        <h1 className="text-3xl font-extralight tracking-tight text-foreground mb-4">
          Article Not Found
        </h1>
        <p className="text-sm text-muted-foreground font-light mb-8">
          We couldn&apos;t locate an article with the slug <code className="font-mono text-xs font-bold text-accent">{slug}</code>.
        </p>
        <Link
          href="/"
          className="text-xs font-mono tracking-widest border border-border px-6 py-3 text-muted-foreground hover:border-accent hover:text-accent transition-all duration-300 uppercase"
        >
          &larr; Back to Studio
        </Link>
      </div>
    );
  }

  const articleParagraphs = simulatedArticleContent[slug] || [
    post.description || "",
    "This article is fetched dynamically from our external publication channel. Our editorial system parses updates in real-time, matching details across both systems.",
    "To read the complete, long-form publication, view the original entry linked below. It contains all figures, code examples, and community commentary."
  ];

  const wordCount = articleParagraphs.join(" ").split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="mx-auto max-w-3xl px-6 md:px-8 py-16 md:py-24 animate-[fadeIn_0.6s_ease-out]">
      {/* Back Button */}
      <Link
        href="/"
        className="group text-xs font-mono text-muted-foreground hover:text-accent transition-colors duration-300 inline-flex items-center gap-2 mb-12"
      >
        <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">&larr;</span> 
        BACK TO PORTFOLIO
      </Link>

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <time className="text-[10px] font-mono text-accent uppercase font-bold tracking-widest">
            {post.pubDate} // {wordCount} WORDS // {readTime} MIN READ
          </time>
          <button
            onClick={handleCopyLink}
            className="text-[9px] font-mono tracking-widest text-muted-foreground hover:text-accent border border-border px-2 py-1 transition-all duration-300 cursor-pointer uppercase font-bold"
          >
            {copied ? "LINK COPIED ✓" : "SHARE ARTICLE"}
          </button>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight text-foreground leading-[1.15]">
          {post.title}
        </h1>
      </header>

      <hr className="border-border mb-12" />

      {/* Article Body */}
      <article className="prose dark:prose-invert max-w-none space-y-8 text-muted-foreground font-light text-base md:text-lg leading-relaxed">
        {articleParagraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </article>

      {/* CTA Link to Substack */}
      <div className="mt-16 p-8 border border-border bg-muted/10 text-center">
        <h3 className="text-xs font-mono text-foreground font-bold tracking-widest uppercase mb-3">
          SUBSCRIBE TO THE NEWSLETTER
        </h3>
        <p className="text-sm text-muted-foreground font-light mb-6 max-w-md mx-auto leading-relaxed">
          Read the full discussion and receive weekly updates on system layouts, brand direction, and edge infrastructure.
        </p>
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono tracking-widest border border-foreground px-6 py-3 text-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground transition-all duration-300 uppercase font-semibold inline-block"
        >
          READ LIVE ON SUBSTACK &nearr;
        </a>
      </div>
    </div>
  );
}

// Named fallback component
export function WritingOfflineFallback() {
  return (
    <div className="mx-auto max-w-xl px-6 py-32 text-center animate-[fadeIn_0.5s_ease-out]">
      <span className="text-xs font-mono text-accent uppercase font-bold tracking-widest block mb-4">
        [ACCESS RESTRICTED]
      </span>
      <h1 className="text-3xl font-extralight tracking-tight text-foreground mb-4">
        Writing Feed Offline
      </h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
        The remote config flag <code className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground font-bold">enable_blog_feed</code> is currently disabled. 
        Blog access has been locked via Remote Config.
      </p>
      <Link
        href="/"
        className="text-xs font-mono tracking-widest border border-foreground px-6 py-3 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 uppercase font-semibold"
      >
        &larr; Return to Studio
      </Link>
    </div>
  );
}
