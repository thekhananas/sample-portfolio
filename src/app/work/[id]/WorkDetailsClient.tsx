"use client";

import { useState, useEffect } from "react";
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

      {/* Interactive System Simulation Deck */}
      <section className="mt-24 border-t border-border pt-16 animate-[fadeIn_0.8s_ease-out]">
        <h2 className="text-xs font-mono tracking-[0.2em] text-accent uppercase font-bold mb-10">
          03 // SYSTEM PERFORMANCE &amp; SIMULATION DECK
        </h2>
        {id === "core-opt" ? <InferenceTelemetryDeck /> : <DistributedClusterMonitor />}
      </section>
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

// =========================================================
// NEURAL INFERENCE ENGINE SIMULATOR (CORE-OPT)
// =========================================================

function InferenceTelemetryDeck() {
  const [precision, setPrecision] = useState<"FP16" | "FP8" | "INT4" | "INT2">("INT4");
  const [compilerOpt, setCompilerOpt] = useState(true);
  const [fusingState, setFusingState] = useState<"idle" | "compiling" | "done">("done");
  const [shaderLang, setShaderLang] = useState<"wgsl" | "cuda">("wgsl");

  const handleCompilerToggle = () => {
    if (!compilerOpt) {
      setFusingState("compiling");
      setTimeout(() => {
        setCompilerOpt(true);
        setFusingState("done");
      }, 1500);
    } else {
      setCompilerOpt(false);
      setFusingState("idle");
    }
  };

  const precisionData = {
    FP16: {
      latency: compilerOpt ? 24.1 : 48.2,
      perplexity: 4.82,
      perplexityText: "100.0% (Baseline)",
      vram: 15.6,
      bandwidth: 95.4,
      coordX: 50,
      yLatency: compilerOpt ? 110 : 50,
      yPerp: 150
    },
    FP8: {
      latency: compilerOpt ? 12.2 : 24.5,
      perplexity: 4.84,
      perplexityText: "100.2% (+0.02)",
      vram: 7.8,
      bandwidth: 96.8,
      coordX: 150,
      yLatency: compilerOpt ? 140 : 90,
      yPerp: 148
    },
    INT4: {
      latency: compilerOpt ? 4.9 : 9.8,
      perplexity: 4.91,
      perplexityText: "101.1% (+0.09)",
      vram: 3.9,
      bandwidth: 98.1,
      coordX: 250,
      yLatency: compilerOpt ? 165 : 130,
      yPerp: 140
    },
    INT2: {
      latency: compilerOpt ? 2.1 : 4.1,
      perplexity: 6.64,
      perplexityText: "137.7% (+1.82 - CRITICAL)",
      vram: 2.0,
      bandwidth: 62.3,
      coordX: 350,
      yLatency: compilerOpt ? 180 : 160,
      yPerp: 40
    }
  };

  const current = precisionData[precision];

  const getShaderCode = (prec: string, fused: boolean, lang: "wgsl" | "cuda") => {
    const precisionTypes = {
      FP16: { wgsl: "f16", cuda: "half" },
      FP8: { wgsl: "f8_e4m3", cuda: "char" },
      INT4: { wgsl: "i4", cuda: "int4" },
      INT2: { wgsl: "i2", cuda: "int2" }
    };
    const t = precisionTypes[prec as keyof typeof precisionTypes] || { wgsl: "f16", cuda: "half" };

    if (lang === "wgsl") {
      if (fused) {
        return `@group(0) @binding(0) var<storage, read> weights: array<${t.wgsl}>;
@group(0) @binding(1) var<storage, read_write> tokens: array<f32>;

// Fused Attention + Scale + Bias + GELU Kernel
@compute @workgroup_size(256, 1, 1)
fn main(@builtin(global_invocation_id) id: vec3<u32>) {
    let idx = id.x;
    if (idx >= 4096) { return; }

    var sum: f32 = 0.0;
    for (var i: u32 = 0; i < 512; i = i + 1) {
        let w = f32(weights[idx * 512 + i]);
        sum = sum + (w * tokens[i] * 0.125);
    }
    
    // Fused elementwise operations (no DRAM write-back)
    let x = sum + 0.045;
    tokens[idx] = 0.5 * x * (1.0 + tanh(0.797884 * (x + 0.044715 * x * x * x)));
}`;
      } else {
        return `@group(0) @binding(0) var<storage, read> weights: array<${t.wgsl}>;
@group(0) @binding(1) var<storage, read_write> outputs: array<f32>;

// Standard Attention Kernel (Separated Execution)
@compute @workgroup_size(256, 1, 1)
fn attention_proj(@builtin(global_invocation_id) id: vec3<u32>) {
    let idx = id.x;
    if (idx >= 4096) { return; }

    var sum: f32 = 0.0;
    for (var i: u32 = 0; i < 512; i = i + 1) {
        sum = sum + (f32(weights[idx * 512 + i]) * outputs[i] * 0.125);
    }
    outputs[idx] = sum;
    // Note: Separated Bias & GELU kernels are dispatched in subsequent passes,
    // requiring costly global VRAM buffer read/write operations.
}`;
      }
    } else {
      if (fused) {
        return `// Optimized CUDA C++ Fused Attention Kernel
#include <cuda_fp16.h>

__global__ void fused_attn_gelu_kernel(
    const ${t.cuda}* __restrict__ weights,
    float* __restrict__ io_tokens,
    int head_dim
) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx >= 4096) return;

    // Fused Thread Block Shared Memory Accumulation
    float sum = 0.0f;
    #pragma unroll 4
    for (int i = 0; i < 512; ++i) {
        float w = (float)(weights[idx * 512 + i]);
        sum += w * io_tokens[i] * 0.125f;
    }

    // Fused Elementwise Bias and Fast Approximated GELU
    float x = sum + 0.045f;
    io_tokens[idx] = x * 0.5f * (1.0f + tanhf(0.797884f * (x + 0.044715f * x * x * x)));
}`;
      } else {
        return `// Standard CUDA Attention Matrix Multiply
#include <cuda_fp16.h>

__global__ void attention_proj_kernel(
    const ${t.cuda}* __restrict__ weights,
    const float* __restrict__ inputs,
    float* __restrict__ outputs
) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx >= 4096) return;

    float sum = 0.0f;
    for (int i = 0; i < 512; ++i) {
        sum += (float)weights[idx * 512 + i] * inputs[i];
    }
    outputs[idx] = sum * 0.125f;
    // DRAM Write-back: Output must be written to global VRAM buffer
    // to serve as input for subsequent bias_add and gelu_activation kernels.
}`;
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Tuner Controls */}
      <div className="lg:col-span-5 border border-border p-6 bg-muted/10 flex flex-col justify-between">
        <div>
          <span className="text-[9px] font-mono text-accent font-bold tracking-widest uppercase block mb-4">
            // TELEMETRY METRIC TUNER
          </span>
          <h3 className="text-lg font-light text-foreground mb-4">
            Quantization &amp; Compiler Sandbox
          </h3>
          <p className="text-xs text-muted-foreground font-light mb-6 leading-relaxed">
            Adjust the precision scale of the LLM weights and toggle the compiler-operator fusing kernels to benchmark real-time execution speeds.
          </p>

          <div className="mb-6">
            <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase block mb-3">
              1. Quantization Level
            </span>
            <div className="grid grid-cols-4 gap-2 font-mono text-xs">
              {(["FP16", "FP8", "INT4", "INT2"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setPrecision(level)}
                  className={`py-2 border text-center transition-all duration-300 cursor-pointer ${
                    precision === level
                      ? "border-accent bg-accent-muted text-accent font-bold"
                      : "border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase block mb-3">
              2. Operator Fusion (TVM/WebGPU)
            </span>
            <button
              onClick={handleCompilerToggle}
              className={`w-full py-3 border font-mono text-xs tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                compilerOpt
                  ? "border-accent bg-accent-muted/20 text-accent font-bold"
                  : "border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              <div className={`h-2 w-2 rounded-full ${
                fusingState === "compiling" 
                  ? "bg-amber-500 animate-ping" 
                  : compilerOpt 
                  ? "bg-green-500" 
                  : "bg-muted-foreground/30"
              }`} />
              {fusingState === "compiling" 
                ? "FUSING OPERATOR KERNELS..." 
                : compilerOpt 
                ? "COMPILER OPTIMIZATION ACTIVE" 
                : "COMPILER OPTIMIZATION INACTIVE"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
          <div>
            <span className="text-[8px] text-muted-foreground font-mono block tracking-wider uppercase mb-1">
              INFERENCE LATENCY
            </span>
            <span className="text-2xl font-mono font-bold text-foreground">
              {current.latency.toFixed(1)}<span className="text-xs text-accent"> ms/tok</span>
            </span>
          </div>
          <div>
            <span className="text-[8px] text-muted-foreground font-mono block tracking-wider uppercase mb-1">
              MODEL PERPLEXITY
            </span>
            <span className={`text-xs font-mono font-bold ${precision === "INT2" ? "text-red-500" : "text-foreground"}`}>
              {current.perplexity.toFixed(2)} <span className="text-[9px] text-muted-foreground font-normal">({precision === "FP16" ? "Baseline" : "Delta"})</span>
            </span>
          </div>
          <div>
            <span className="text-[8px] text-muted-foreground font-mono block tracking-wider uppercase mb-1">
              VRAM REQUIRED
            </span>
            <span className="text-lg font-mono font-bold text-foreground">
              {current.vram.toFixed(1)}<span className="text-xs text-muted-foreground"> GB</span>
            </span>
          </div>
          <div>
            <span className="text-[8px] text-muted-foreground font-mono block tracking-wider uppercase mb-1">
              BANDWIDTH SAVINGS
            </span>
            <span className="text-lg font-mono font-bold text-foreground">
              {current.bandwidth.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Charts Panel */}
      <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-border p-6 bg-muted/10 flex flex-col justify-between h-[320px]">
          <div>
            <span className="text-[9px] font-mono text-muted-foreground tracking-widest uppercase block mb-2">
              // TELEMETRY PROFILER CHART
            </span>
            <span className="text-xs text-foreground font-medium block">
              Perplexity &amp; Latency Trade-Off
            </span>
          </div>
          
          <div className="relative h-[180px] w-full flex items-center justify-center">
            <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible">
              <line x1="40" y1="20" x2="40" y2="180" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="40" y1="180" x2="380" y2="180" stroke="var(--border)" strokeWidth="1" />
              
              <text x="35" y="195" fill="var(--muted-foreground)" fontSize="8" fontFamily="monospace">FP16</text>
              <text x="140" y="195" fill="var(--muted-foreground)" fontSize="8" fontFamily="monospace">FP8</text>
              <text x="240" y="195" fill="var(--muted-foreground)" fontSize="8" fontFamily="monospace">INT4</text>
              <text x="340" y="195" fill="var(--muted-foreground)" fontSize="8" fontFamily="monospace">INT2</text>
              
              <path
                d={`M 50 ${precisionData.FP16.yLatency} Q 150 ${precisionData.FP8.yLatency} 250 ${precisionData.INT4.yLatency} T 350 ${precisionData.INT2.yLatency}`}
                fill="none"
                stroke="var(--foreground)"
                strokeWidth="1.5"
                opacity="0.3"
              />
              <path
                d="M 50 150 Q 150 148 250 140 T 350 40"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                opacity="0.5"
              />

              {([ "FP16", "FP8", "INT4", "INT2" ] as const).map((level) => {
                const data = precisionData[level];
                const active = level === precision;
                return (
                  <g key={level}>
                    <circle cx={data.coordX} cy={data.yPerp} r={active ? 5 : 3} fill="var(--accent)" />
                    <circle cx={data.coordX} cy={data.yLatency} r={active ? 5 : 3} fill="var(--foreground)" />
                  </g>
                );
              })}

              <line x1={current.coordX} y1="20" x2={current.coordX} y2="180" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
              
              <text x={current.coordX + 8} y={current.yLatency - 8} fill="var(--foreground)" fontSize="9" fontFamily="monospace" fontWeight="bold">
                {current.latency.toFixed(1)}ms
              </text>
              <text x={current.coordX + 8} y={current.yPerp + 12} fill="var(--accent)" fontSize="9" fontFamily="monospace" fontWeight="bold">
                P:{current.perplexity.toFixed(2)}
              </text>
            </svg>
          </div>

          <div className="flex justify-between text-[8px] font-mono text-muted-foreground uppercase pt-2">
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 bg-foreground rounded-full inline-block" /> LATENCY (ms)</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 bg-accent rounded-full inline-block" /> PERPLEXITY</span>
          </div>
        </div>

        <div className="border border-border p-6 bg-muted/10 flex flex-col justify-between h-[320px]">
          <div>
            <span className="text-[9px] font-mono text-muted-foreground tracking-widest uppercase block mb-2">
              // OPERATOR GRAPH COMPILER
            </span>
            <span className="text-xs text-foreground font-medium block">
              WebGPU Operator Fusion
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1.5 py-2">
            <div className="w-full max-w-[160px] border border-border bg-muted/20 p-2 text-center text-[9px] font-mono text-foreground">
              ATTENTION PROJECTION
            </div>

            <div className="h-3 w-[1px] bg-border relative">
              {compilerOpt && <div className="absolute inset-0 bg-accent animate-pulse" />}
            </div>

            <div className="w-full max-w-[160px] border border-border bg-muted/20 p-2 text-center text-[9px] font-mono text-foreground">
              SCALE BIAS ADD
            </div>

            <div className="h-3 w-[1px] bg-border relative">
              {compilerOpt && <div className="absolute inset-0 bg-accent animate-pulse" />}
            </div>

            <div className="w-full max-w-[160px] border border-border bg-muted/20 p-2 text-center text-[9px] font-mono text-foreground">
              ACTIVATION LAYER
            </div>

            {compilerOpt ? (
              <div className="mt-3 w-full max-w-[180px] border border-accent bg-accent-muted/10 p-2 text-center text-[9px] font-mono font-bold text-accent animate-[fadeIn_0.5s_ease-out]">
                FUSED SHADER RUNNER
                <span className="block text-[8px] font-normal text-muted-foreground mt-0.5">
                  1 Draw Call (Zero DRAM Buffers)
                </span>
              </div>
            ) : (
              <div className="mt-3 text-center text-[8px] font-mono text-muted-foreground">
                3 separate GPU Draw Calls
              </div>
            )}
          </div>

          <span className="text-[8px] font-mono text-muted-foreground text-center uppercase">
            {compilerOpt ? "GPU Dispatches: 1 // Bandwidth: Optimal" : "GPU Dispatches: 3 // Bandwidth: Memory Bottleneck"}
          </span>
        </div>
      </div>

      {/* Dynamic Shader Code Console */}
      <div className="col-span-12 border border-border bg-black text-[#00ff66] font-mono text-[10px] p-5 mt-6 h-[220px] flex flex-col justify-between relative overflow-hidden">
        <div className="flex justify-between items-center border-b border-[#00ff66]/20 pb-2 mb-3">
          <span className="text-[#00ff66]/60 tracking-widest uppercase">
            // LIVE COMPILER SHADER OUTPUT: {shaderLang.toUpperCase()}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setShaderLang("wgsl")}
              className={`px-2 py-0.5 border text-[9px] cursor-pointer transition-all ${
                shaderLang === "wgsl"
                  ? "border-[#00ff66] bg-[#00ff66]/10 text-[#00ff66]"
                  : "border-[#00ff66]/20 text-[#00ff66]/40 hover:text-[#00ff66] hover:border-[#00ff66]/60"
              }`}
            >
              WGSL
            </button>
            <button
              onClick={() => setShaderLang("cuda")}
              className={`px-2 py-0.5 border text-[9px] cursor-pointer transition-all ${
                shaderLang === "cuda"
                  ? "border-[#00ff66] bg-[#00ff66]/10 text-[#00ff66]"
                  : "border-[#00ff66]/20 text-[#00ff66]/40 hover:text-[#00ff66] hover:border-[#00ff66]/60"
              }`}
            >
              CUDA C++
            </button>
          </div>
        </div>
        <pre className="flex-1 overflow-auto custom-scrollbar text-[9px] leading-normal text-[#00ff66]/90 select-all pr-4">
          {getShaderCode(precision, compilerOpt, shaderLang)}
        </pre>
        <div className="flex justify-between text-[8px] text-[#00ff66]/40 border-t border-[#00ff66]/20 pt-2 mt-2">
          <span>TARGET DISPATCH: WEBGPU COMPILATION ENDPOINT</span>
          <span>MEM ACCESS: COALESCED SHARED BANK</span>
        </div>
      </div>
    </div>
  );
}

// =========================================================
// DISTRIBUTED PIPELINE MONITOR SIMULATOR (SLATE-GRID)
// =========================================================

function DistributedClusterMonitor() {
  const [nodes, setNodes] = useState<number[]>(() => {
    const arr = Array(64).fill(0);
    arr[4] = 1;
    arr[20] = 1;
    return arr;
  });
  
  const [logs, setLogs] = useState<string[]>([
    "[INIT] 15:45:00 - FSDP distributed ring clusters online.",
    "[INFO] 15:45:02 - All 4,096 nodes synced. Handshake established.",
    "[INFO] 15:45:05 - Overlapping gradient accumulation active."
  ]);
  
  const [step, setStep] = useState(0);
  const [efficiency, setEfficiency] = useState(94.2);
  const [preemptedCount, setPreemptedCount] = useState(0);
  const [lossPoints, setLossPoints] = useState<number[]>([2.1, 1.95, 1.82, 1.74, 1.61, 1.52, 1.44]);

  const handleNodeClick = (idx: number) => {
    if (nodes[idx] === 2) return; // Already preempted

    setNodes((prevNodes) => {
      const next = [...prevNodes];
      next[idx] = 2; // Preempted
      return next;
    });

    setPreemptedCount((c) => c + 1);
    setEfficiency(82.4);

    const timeStr = new Date().toLocaleTimeString();
    setLogs((prevLogs) => [
      ...prevLogs.slice(-3),
      `[WARN] ${timeStr} - Node GPU-${idx} manual preemption triggered.`,
      `[INFO] ${timeStr} - Recalculating FSDP ring & re-shunting weights...`
    ]);

    setTimeout(() => {
      setNodes((currentNodes) => {
        const updated = [...currentNodes];
        if (updated[idx] === 2) {
          updated[idx] = 3; // Rejoining
          const recoverTimeStr = new Date().toLocaleTimeString();
          setLogs((l) => [
            ...l.slice(-3),
            `[RECOV] ${recoverTimeStr} - GPU-${idx} manual recovery complete.`
          ]);
          setEfficiency(94.2);
        }
        return updated;
      });
    }, 2500);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 64);
      
      setNodes((prevNodes) => {
        const next = [...prevNodes];
        
        for (let i = 0; i < next.length; i++) {
          if (next[i] === 1) next[i] = 0;
          if (next[i] === 3) {
            if (Math.random() < 0.4) next[i] = 0;
          }
        }
        
        const activeSync1 = step;
        const activeSync2 = (step + 16) % 64;
        const activeSync3 = (step + 32) % 64;
        const activeSync4 = (step + 48) % 64;
        
        if (next[activeSync1] === 0) next[activeSync1] = 1;
        if (next[activeSync2] === 0) next[activeSync2] = 1;
        if (next[activeSync3] === 0) next[activeSync3] = 1;
        if (next[activeSync4] === 0) next[activeSync4] = 1;

        if (Math.random() < 0.04) {
          const targetNode = Math.floor(Math.random() * 64);
          if (next[targetNode] !== 2) {
            next[targetNode] = 2; // Preempted
            setPreemptedCount((c) => c + 1);
            setEfficiency(82.4);
            
            const timeStr = new Date().toLocaleTimeString();
            setLogs((prevLogs) => [
              ...prevLogs.slice(-3),
              `[WARN] ${timeStr} - Node GPU-${targetNode} preemption event.`,
              `[INFO] ${timeStr} - Re-shunting parameters from checkpoints...`
            ]);
            
            setTimeout(() => {
              setNodes((currentNodes) => {
                const updated = [...currentNodes];
                if (updated[targetNode] === 2) {
                  updated[targetNode] = 3;
                  const recoverTimeStr = new Date().toLocaleTimeString();
                  setLogs((l) => [
                    ...l.slice(-3),
                    `[RECOV] ${recoverTimeStr} - GPU-${targetNode} re-joined sharding ring.`
                  ]);
                  setEfficiency(94.2);
                }
                return updated;
              });
            }, 2500);
          }
        }
        
        return next;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [step]);

  useEffect(() => {
    const lossTimer = setInterval(() => {
      setLossPoints((points) => {
        const last = points[points.length - 1];
        const nextLoss = Math.max(0.15, last - 0.045 + Math.random() * 0.02);
        const nextPoints = [...points, nextLoss];
        if (nextPoints.length > 15) {
          nextPoints.shift();
        }
        return nextPoints;
      });
    }, 3000);
    
    return () => clearInterval(lossTimer);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      <div className="lg:col-span-5 border border-border p-6 bg-muted/10 flex flex-col justify-between">
        <div>
          <span className="text-[9px] font-mono text-accent font-bold tracking-widest uppercase block mb-4">
            // LIVE CLUSTER MAP (4,096 NODES)
          </span>
          <h3 className="text-lg font-light text-foreground mb-4">
            NCCL Shard Sync Monitor
          </h3>
          
          <div className="grid grid-cols-8 gap-1.5 my-6 max-w-[240px] mx-auto">
            {nodes.map((state, idx) => {
              let bgClass = "bg-green-500/10 border-green-500/30 text-green-500";
              let pulseClass = "";
              
              if (state === 1) {
                bgClass = "bg-accent border-accent text-accent";
                pulseClass = "node-pulse-fast";
              } else if (state === 2) {
                bgClass = "bg-red-500/30 border-red-500/60 text-red-500";
                pulseClass = "node-pulse-medium";
              } else if (state === 3) {
                bgClass = "bg-blue-500/20 border-blue-500/40 text-blue-400";
                pulseClass = "node-pulse-slow";
              }
              
              return (
                <button
                  key={idx}
                  onClick={() => handleNodeClick(idx)}
                  className={`w-6 h-6 border transition-all duration-300 cursor-pointer hover:scale-110 hover:border-accent/80 focus:outline-none ${bgClass} ${pulseClass}`}
                />
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3 text-[8px] font-mono text-muted-foreground uppercase justify-center mt-2">
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 bg-green-500/20 border border-green-500/40 inline-block" /> ACTIVE</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 bg-accent inline-block" /> SYNCING</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 bg-red-500/30 border border-red-500/60 inline-block" /> PREEMPTED</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 bg-blue-500/20 border border-blue-500/40 inline-block" /> REJOINING</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-border pt-6 mt-4">
          <div>
            <span className="text-[8px] text-muted-foreground font-mono block tracking-wider uppercase mb-1">
              CLUSTER EFFICIENCY
            </span>
            <span className="text-2xl font-mono font-bold text-foreground">
              {efficiency.toFixed(1)}%
            </span>
          </div>
          <div>
            <span className="text-[8px] text-muted-foreground font-mono block tracking-wider uppercase mb-1">
              NCCL RING LATENCY
            </span>
            <span className="text-2xl font-mono font-bold text-accent">
              {nodes.includes(2) ? "2.4ms" : "1.4ms"}
            </span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col justify-between gap-6">
        <div className="border border-border p-6 bg-muted/10 flex flex-col justify-between h-[180px]">
          <div className="flex justify-between items-baseline mb-2">
            <div>
              <span className="text-[9px] font-mono text-muted-foreground tracking-widest uppercase block">
                // GRADIENT ACCUMULATION LOSS
              </span>
              <span className="text-xs text-foreground font-medium block">
                Distributed Sharded Loss Curve
              </span>
            </div>
            <span className="text-[9px] font-mono text-accent font-bold">LOSS: {lossPoints[lossPoints.length - 1].toFixed(4)}</span>
          </div>

          <div className="relative h-[80px] w-full">
            <svg viewBox="0 0 500 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <line x1="0" y1="20" x2="500" y2="20" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="0" y1="60" x2="500" y2="60" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 2" />
              
              <path
                d={lossPoints.map((val, idx) => {
                  const stepX = 500 / 14;
                  const x = idx * stepX;
                  const y = 90 - ((val - 0.1) / 2.1) * 80;
                  return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                }).join(" ")}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
              />

              {lossPoints.map((val, idx) => {
                const stepX = 500 / 14;
                const x = idx * stepX;
                const y = 90 - ((val - 0.1) / 2.1) * 80;
                return (
                  <circle
                    key={idx}
                    cx={x}
                    cy={y}
                    r="2.5"
                    fill="var(--foreground)"
                    stroke="var(--accent)"
                    strokeWidth="1"
                  />
                );
              })}
            </svg>
          </div>
        </div>

        <div className="border border-border p-6 bg-black text-[#ff5e00] font-mono text-[10px] leading-relaxed flex flex-col justify-between h-[180px]">
          <div>
            <span className="text-[9px] text-[#ff5e00]/50 tracking-widest uppercase block mb-2 border-b border-[#ff5e00]/20 pb-2">
              // DISTRIBUTED SHARD CONSOLE DIAGNOSTICS
            </span>
            <div className="space-y-1 overflow-y-hidden max-h-[90px]">
              {logs.map((log, idx) => {
                let color = "text-[#ff5e00]/80";
                if (log.includes("[WARN]")) color = "text-red-500 font-bold";
                if (log.includes("[RECOV]")) color = "text-blue-400 font-bold";
                if (log.includes("[INIT]")) color = "text-green-400";
                return (
                  <div key={idx} className={color}>
                    {log}
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex justify-between text-[8px] text-[#ff5e00]/40 border-t border-[#ff5e00]/20 pt-2">
            <span>CLUSTER STATUS: DYNAMIC_SYNC</span>
            <span>SHARD REBOOTS REGISTERED: {preemptedCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
