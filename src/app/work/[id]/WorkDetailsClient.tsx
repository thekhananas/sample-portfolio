"use client";

import Link from "next/link";
import Image from "next/image";

interface WorkDetailsClientProps {
  id: string;
}

const projectData: Record<string, {
  title: string;
  category: string;
  image: string;
  client: string;
  year: string;
  services: string[];
  techStack: string[];
  overview: string;
  metrics: { label: string; value: string }[];
  sections: { title: string; content: string }[];
}> = {
  "core-opt": {
    title: "NEURAL INFERENCE ENGINE",
    category: "COMPILER OPTIMIZATION / EDGE LLM",
    image: "/images/project-1.png",
    client: "NVIDIA INCEPTION LABS",
    year: "2026",
    services: ["Quantization Calibration", "CUDA Kernel Fusion", "WebGPU Executable Compilation"],
    techStack: ["TVM Unity", "ONNX Runtime", "WebAssembly SIMD", "FP16 / INT4 Quantization"],
    overview: "An edge-compiled LLM inference runner optimized to achieve sub-10ms token generation latency on commodity consumer devices. Features custom operator fusion and INT4 weight-only quantization.",
    metrics: [
      { label: "TOKEN LATENCY", value: "< 9.8ms" },
      { label: "PARAMETER COUNT", value: "7.8 Billion" },
      { label: "QUANTIZATION", value: "INT4 Weight-Only" },
      { label: "TARGET RUNTIME", value: "WebGPU / WASM SIMD" }
    ],
    sections: [
      {
        title: "01 / SYSTEM TELEMETRY & COMPILE SPEED",
        content: "To bypass the memory bandwidth bottleneck typical of larger models, we compiled the neural network directly into WebGPU and WebAssembly bytecode using Apache TVM. By fusing consecutive tensor operations (such as multi-query attention projection with scale-bias offsets), we cut GPU roundtrips by 40%. The compiled model downloads as a lightweight 120MB chunk, serving the initial token in less than 50ms."
      },
      {
        title: "02 / QUANTIZATION GRID",
        content: "We designed a dynamic quantization scheme targeting INT4-precision weights while retaining critical layers in FP16. Using a validation set of 1,000 architectural query prompts, we profiled the activation scales per layer, applying a higher quantization threshold for early attention blocks. This hybrid strategy maintained perplexity degradation below 1.2% while achieving a 4x reduction in total memory bandwidth."
      }
    ]
  },
  "slate-grid": {
    title: "DISTRIBUTED COMPUTE PIPELINE",
    category: "SYSTEMS ARCHITECTURE / CLUSTER SYNC",
    image: "/images/project-2.png",
    client: "DEEP COMPUTE INFRA",
    year: "2026",
    services: ["Parameter Shard Sync", "Asynchronous Ring Reduction", "Fault-tolerant Checkpointing"],
    techStack: ["PyTorch FSDP", "NCCL Communication Link", "Vercel Edge Telemetry", "Redis Cluster State"],
    overview: "An asynchronous pipeline runner designed for low-bandwidth cluster synchronization and parallel model weight shards. Achieving high-density node synchronization across hybrid multi-cloud environments.",
    metrics: [
      { label: "RING SYNC LATENCY", value: "1.4ms" },
      { label: "GPU CLUSTER SIZE", value: "4,096 H100 Nodes" },
      { label: "NETWORK RING SLOTS", value: "128 Shards" },
      { label: "COMPUTE SCALE", value: "94.2% Efficiency" }
    ],
    sections: [
      {
        title: "01 / FAULT-TOLERANT ARCHITECTURE",
        content: "Distributed training workloads frequently suffer from node preemption and network drops. We built a decentralized grid manager that utilizes lightweight distributed heartbeat hooks. If a GPU node drops out of the ring, the coordinator shunts the active parameters to the nearest surviving node, restoring training progress from memory-cached checkpoints in under 2 seconds. Ring coordination is managed via a Vercel Serverless router, reducing network coordination overhead."
      },
      {
        title: "02 / SHARD PARALLELISM & BANDWIDTH",
        content: "By splitting model parameters, optimizer states, and gradients using Fully Sharded Data Parallelism (FSDP), we eliminated the redundant memory allocations associated with classic data parallelism. To optimize for low-bandwidth clusters, we implemented an asynchronous, non-blocking gradient accumulation ring that overlaps communication with backward pass calculations. This technique allows GPU-clusters in disparate data centers to coordinate workloads efficiently, maintaining 94% hardware utilization."
      }
    ]
  }
};

export default function WorkDetailsClient({ id }: WorkDetailsClientProps) {
  const project = projectData[id];

  if (!project) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <span className="text-xs font-mono text-accent uppercase font-bold tracking-widest block mb-4">
          [404 NOT FOUND]
        </span>
        <h1 className="text-3xl font-extralight tracking-tight text-foreground mb-4">
          System Not Found
        </h1>
        <p className="text-sm text-muted-foreground font-light mb-8">
          The project identifier <code className="font-mono text-xs font-bold text-accent">{id}</code> does not map to a registered AI systems engineering case study.
        </p>
        <Link
          href="/"
          className="text-xs font-mono tracking-widest border border-border px-6 py-3 text-muted-foreground hover:border-accent hover:text-accent transition-all duration-300 uppercase"
        >
          &larr; Return to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-8 py-16 md:py-24 animate-[fadeIn_0.6s_ease-out]">
      {/* Back Button */}
      <Link
        href="/"
        className="group text-xs font-mono text-muted-foreground hover:text-accent transition-colors duration-300 inline-flex items-center gap-2 mb-12"
      >
        <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">&larr;</span> 
        BACK TO PORTFOLIO
      </Link>

      {/* Hero Header */}
      <header className="max-w-4xl mb-16">
        <span className="text-xs font-mono text-accent uppercase font-bold tracking-widest mb-4 block">
          {project.category}
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extralight tracking-tight text-foreground leading-[1.1] mb-6">
          {project.title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light max-w-2xl leading-relaxed">
          {project.overview}
        </p>
      </header>

      {/* Hero Image */}
      <div className="relative w-full aspect-[21/9] overflow-hidden bg-muted border border-border mb-16">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Grid Layout Detail Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Meta Specifications */}
        <aside className="lg:col-span-4 space-y-8 font-mono text-xs border-b border-border pb-8 lg:border-b-0 lg:pb-0">
          <div className="border-t border-border pt-6">
            <span className="text-muted-foreground block mb-2 font-bold tracking-wider">&mdash; CLIENT</span>
            <span className="text-foreground font-medium">{project.client}</span>
          </div>
          <div className="border-t border-border pt-6">
            <span className="text-muted-foreground block mb-2 font-bold tracking-wider">&mdash; TIMELINE</span>
            <span className="text-foreground font-medium">{project.year}</span>
          </div>
          <div className="border-t border-border pt-6">
            <span className="text-muted-foreground block mb-2 font-bold tracking-wider">&mdash; SERVICES</span>
            <ul className="space-y-1 text-foreground font-medium">
              {project.services.map((service, idx) => (
                <li key={idx}>{service}</li>
              ))}
            </ul>
          </div>
          <div className="border-t border-border pt-6">
            <span className="text-muted-foreground block mb-2 font-bold tracking-wider">&mdash; TECH SYSTEM</span>
            <ul className="space-y-1 text-foreground font-medium">
              {project.techStack.map((tech, idx) => (
                <li key={idx}>{tech}</li>
              ))}
            </ul>
          </div>
          {/* Custom Telemetry Metrics */}
          <div className="border-t border-border pt-6">
            <span className="text-muted-foreground block mb-4 font-bold tracking-wider">&mdash; SYSTEM TELEMETRY</span>
            <div className="grid grid-cols-2 gap-4">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="border border-border p-3 bg-muted/10">
                  <span className="text-[8px] text-muted-foreground block tracking-wider uppercase mb-1">{metric.label}</span>
                  <span className="text-xs font-bold text-accent tracking-tight">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Editorial Case Narrative */}
        <article className="lg:col-span-8 space-y-12">
          {project.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-sm font-mono text-foreground font-bold tracking-widest uppercase">
                {section.title}
              </h2>
              <p className="text-base text-muted-foreground font-light leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </article>
      </div>
    </div>
  );
}

// Named static fallback component
export function WorkCaseStudiesFallback() {
  return (
    <div className="mx-auto max-w-xl px-6 py-32 text-center animate-[fadeIn_0.5s_ease-out]">
      <span className="text-xs font-mono text-accent uppercase font-bold tracking-widest block mb-4">
        [ACCESS RESTRICTED]
      </span>
      <h1 className="text-3xl font-extralight tracking-tight text-foreground mb-4">
        Case Studies Archived
      </h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
        The remote config flag <code className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground font-bold">work_case_studies</code> is currently deactivated. 
        We archive case studies during system syncs. Please try again later.
      </p>
      <Link
        href="/"
        className="text-xs font-mono tracking-widest border border-foreground px-6 py-3 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 uppercase font-semibold"
      >
        &larr; Back to Studio Home
      </Link>
    </div>
  );
}
