import Image from "next/image";
import Link from "next/link";
import WritingSectionClient from "@/components/WritingSectionClient";

export const unstable_instant = false;

const projects = [
  {
    id: "core-opt",
    title: "NEURAL INFERENCE ENGINE",
    category: "COMPILER OPTIMIZATION / EDGE LLM",
    image: "/images/project-1.png",
    description: "An edge-compiled LLM inference runner optimized to achieve sub-10ms token generation latency via custom operator fusion and INT4 quantization."
  },
  {
    id: "slate-grid",
    title: "DISTRIBUTED COMPUTE PIPELINE",
    category: "SYSTEMS ARCHITECTURE / CLUSTER SYNC",
    image: "/images/project-2.png",
    description: "An asynchronous pipeline runner designed for low-bandwidth cluster synchronization and parallel model weight shards."
  }
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-8 py-12 md:py-20 relative">
      {/* Editorial Hero Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-32 md:mb-48">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-bold mb-6 block animate-[fadeIn_0.6s_ease-out]">
            HIGH-PERFORMANCE SYSTEMS &amp; AI INFRASTRUCTURE
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extralight tracking-tight text-foreground leading-[1.1] mb-8 animate-[fadeIn_0.8s_ease-out]">
            Architecting robust <br className="hidden sm:inline" />
            AI systems with <br />
            <span className="font-normal italic text-foreground relative hover:text-accent transition-colors duration-300">
              sub-200ms latency
            </span>.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-light max-w-xl leading-relaxed mb-8 animate-[fadeIn_1s_ease-out]">
            Engineering high-performance model compilation, distributed systems architectures, and edge network infrastructures. Blending low-latency inference with clean layout architectures to guarantee ultra-fast response times.
          </p>
          <div className="flex gap-4 animate-[fadeIn_1.2s_ease-out]">
            <Link 
              href="/#work" 
              className="text-xs font-mono tracking-widest border border-foreground px-6 py-3 rounded-none text-foreground hover:bg-foreground hover:text-background transition-all duration-300 uppercase font-semibold"
            >
              Explore Work
            </Link>
            <Link 
              href="/contact" 
              className="text-xs font-mono tracking-widest border border-border px-6 py-3 rounded-none text-muted-foreground hover:border-accent hover:text-accent transition-all duration-300 uppercase"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Portrait Placeholder with offsets */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center animate-[fadeIn_1s_ease-out]">
          <div className="relative group w-full max-w-[360px] aspect-[4/5] bg-muted border border-border transition-all duration-500 hover:border-accent">
            {/* Design Offset Borders */}
            <div className="absolute inset-0 border border-muted-foreground/10 translate-x-2 translate-y-2 pointer-events-none transition-all duration-500 group-hover:translate-x-3 group-hover:translate-y-3 group-hover:border-accent/40" />
            <div className="absolute inset-0 border border-muted-foreground/5 -translate-x-2 -translate-y-2 pointer-events-none transition-all duration-500 group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:border-accent/20" />
            
            <Image
              src="/images/editorial_portrait.png"
              alt="Anas Khan - Portrait"
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-cover grayscale contrast-115 transition-transform duration-700 ease-out group-hover:scale-102 group-hover:grayscale-0"
              priority
            />
          </div>
          <div className="w-full max-w-[360px] mt-4 flex justify-between text-[9px] font-mono text-muted-foreground tracking-widest">
            <span>ANAS KHAN // AI ENG</span>
            <span>[SYS-2026 // L:&lt;200ms]</span>
          </div>
        </div>
      </section>

      {/* Selected Work (Asymmetrical Editorial Grid) */}
      <section id="work" className="mb-40 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-border pb-4 mb-16">
          <h2 className="text-xs font-mono tracking-[0.2em] text-muted-foreground uppercase">
            SELECTED PROJECTS
          </h2>
          <span className="text-[10px] font-mono text-muted-foreground">01 &mdash; 02 // PERFORMANCE SYSTEMS</span>
        </div>

        {/* Grid Staggered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Project 1: Wide, Staggered Down */}
          <div className="md:col-span-7 md:mt-12">
            <Link href={`/work/${projects[0].id}`} className="group flex flex-col gap-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted border border-border transition-all duration-500 hover:border-accent">
                <Image
                  src={projects[0].image}
                  alt={projects[0].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  priority
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
                  {projects[0].category}
                </span>
                <h3 className="text-2xl font-light tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                  {projects[0].title}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-xl">
                  {projects[0].description}
                </p>
                <span className="text-xs font-mono tracking-widest text-foreground/80 mt-2 flex items-center gap-1 group-hover:text-accent transition-colors duration-300">
                  VIEW SYSTEM ARCHITECTURE &rarr;
                </span>
              </div>
            </Link>
          </div>

          {/* Project 2: Narrower, Staggered Up */}
          <div className="md:col-span-5">
            <Link href={`/work/${projects[1].id}`} className="group flex flex-col gap-6">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted border border-border transition-all duration-500 hover:border-accent">
                <Image
                  src={projects[1].image}
                  alt={projects[1].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 35vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
                  {projects[1].category}
                </span>
                <h3 className="text-2xl font-light tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                  {projects[1].title}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {projects[1].description}
                </p>
                <span className="text-xs font-mono tracking-widest text-foreground/80 mt-2 flex items-center gap-1 group-hover:text-accent transition-colors duration-300">
                  VIEW SYSTEM ARCHITECTURE &rarr;
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Writing Section */}
      <section id="writing" className="mb-40 scroll-mt-24 max-w-3xl">
        <div className="flex items-baseline justify-between border-b border-border pb-4 mb-12">
          <h2 className="text-xs font-mono tracking-[0.2em] text-muted-foreground uppercase">
            DYNAMIC WRITING FEED
          </h2>
          <span className="text-[10px] font-mono text-muted-foreground">SUBSTACK FEED VIA EDGE</span>
        </div>

        <WritingSectionClient />
      </section>

      {/* About Section */}
      <section id="about" className="mb-20 scroll-mt-24 max-w-3xl border-t border-border pt-16">
        <h2 className="text-xs font-mono tracking-[0.2em] text-muted-foreground uppercase mb-8">
          ABOUT &amp; CAPABILITIES
        </h2>
        <div className="space-y-6 text-base font-light text-muted-foreground leading-relaxed">
          <p>
            I specialize in high-performance AI systems engineering, compiler optimization, and edge inference infrastructure. 
            By merging advanced model pruning with optimized web runtime architectures, I deliver sub-200ms layout systems and edge-compiled model endpoints that scale to millions of requests with zero friction.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 text-xs font-mono">
            <div>
              <span className="text-accent block mb-3 font-bold tracking-wider">&mdash; MODEL OPTIMIZATION</span>
              <ul className="space-y-2 text-foreground/80">
                <li>Quantization (INT4/FP8)</li>
                <li>Operator Fusion &amp; CUDA</li>
                <li>KV Caching Kernels</li>
              </ul>
            </div>
            <div>
              <span className="text-accent block mb-3 font-bold tracking-wider">&mdash; DISTRIBUTED PIPELINES</span>
              <ul className="space-y-2 text-foreground/80">
                <li>Model Parallelism Shards</li>
                <li>Asynchronous Ring Sync</li>
                <li>Edge CDN Caching</li>
              </ul>
            </div>
            <div>
              <span className="text-accent block mb-3 font-bold tracking-wider">&mdash; INFRASTRUCTURE CORE</span>
              <ul className="space-y-2 text-foreground/80">
                <li>Next.js App Router (16)</li>
                <li>Firebase Feature Flags</li>
                <li>Vercel Edge Serverless</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
