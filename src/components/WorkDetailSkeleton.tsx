"use client";

export default function WorkDetailSkeleton({ id }: { id?: string }) {
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-8 py-16 md:py-24 animate-pulse">
      {/* Back Button Skeleton */}
      <div className="h-4 w-24 bg-muted border border-border/50 mb-12" />

      {/* Hero Header Skeleton */}
      <div className="max-w-4xl mb-16">
        <div className="h-3 w-40 bg-muted mb-4" />
        <div className="h-12 md:h-16 w-3/4 bg-muted mb-6" />
        <div className="h-4 w-1/2 bg-muted" />
      </div>

      {/* Hero Image Skeleton */}
      <div className="w-full aspect-[21/9] bg-muted border border-border/50 mb-16" />

      {/* Content Columns Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Meta Specifications Skeleton */}
        <div className="lg:col-span-4 space-y-8 border-b border-border pb-8 lg:border-b-0 lg:pb-0">
          <div className="border-t border-border pt-6">
            <div className="h-3 w-20 bg-muted mb-3" />
            <div className="h-5 w-32 bg-muted" />
          </div>
          <div className="border-t border-border pt-6">
            <div className="h-3 w-20 bg-muted mb-3" />
            <div className="h-5 w-12 bg-muted" />
          </div>
          <div className="border-t border-border pt-6">
            <div className="h-3 w-20 bg-muted mb-3" />
            <div className="space-y-1.5">
              <div className="h-4 w-36 bg-muted" />
              <div className="h-4 w-44 bg-muted" />
              <div className="h-4 w-32 bg-muted" />
            </div>
          </div>
          <div className="border-t border-border pt-6">
            <div className="h-3 w-20 bg-muted mb-3" />
            <div className="space-y-1.5">
              <div className="h-4 w-40 bg-muted" />
              <div className="h-4 w-36 bg-muted" />
              <div className="h-4 w-44 bg-muted" />
              <div className="h-4 w-28 bg-muted" />
            </div>
          </div>
          {/* Custom Telemetry Metrics Skeleton */}
          <div className="border-t border-border pt-6">
            <div className="h-3 w-32 bg-muted mb-4" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="border border-border/50 p-3 bg-muted/5 space-y-2 h-[58px]">
                  <div className="h-2 w-12 bg-muted" />
                  <div className="h-4 w-16 bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Editorial Case Narrative Skeleton */}
        <div className="lg:col-span-8 space-y-12">
          <div className="space-y-4">
            <div className="h-4 w-1/3 bg-muted" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted" />
              <div className="h-4 w-full bg-muted" />
              <div className="h-4 w-full bg-muted" />
              <div className="h-4 w-5/6 bg-muted" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-4 w-1/4 bg-muted" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted" />
              <div className="h-4 w-full bg-muted" />
              <div className="h-4 w-full bg-muted" />
              <div className="h-4 w-2/3 bg-muted" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive System Simulation Deck Skeleton */}
      <section className="mt-24 border-t border-border pt-16">
        <div className="h-4 w-64 bg-muted mb-10" />
        
        {id === "core-opt" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Tuner Controls Skeleton */}
            <div className="lg:col-span-5 border border-border p-6 bg-muted/5 flex flex-col justify-between h-[410px] md:h-[396px] lg:h-[450px]">
              <div>
                <div className="h-3 w-32 bg-muted mb-4" />
                <div className="h-6 w-3/4 bg-muted mb-4" />
                <div className="space-y-2 mb-6">
                  <div className="h-3 w-full bg-muted" />
                  <div className="h-3 w-5/6 bg-muted" />
                </div>
                <div className="mb-6">
                  <div className="h-3 w-24 bg-muted mb-3" />
                  <div className="grid grid-cols-4 gap-2">
                    <div className="h-8 bg-muted" />
                    <div className="h-8 bg-muted" />
                    <div className="h-8 bg-muted" />
                    <div className="h-8 bg-muted" />
                  </div>
                </div>
                <div className="mb-8">
                  <div className="h-3 w-36 bg-muted mb-3" />
                  <div className="h-10 bg-muted" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
                <div className="space-y-2"><div className="h-2 w-16 bg-muted" /><div className="h-6 w-20 bg-muted" /></div>
                <div className="space-y-2"><div className="h-2 w-16 bg-muted" /><div className="h-6 w-24 bg-muted" /></div>
                <div className="space-y-2"><div className="h-2 w-16 bg-muted" /><div className="h-6 w-16 bg-muted" /></div>
                <div className="space-y-2"><div className="h-2 w-16 bg-muted" /><div className="h-6 w-12 bg-muted" /></div>
              </div>
            </div>
            {/* Charts Panel Skeleton */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-border p-6 bg-muted/5 flex flex-col justify-between h-[320px]">
                <div className="space-y-2">
                  <div className="h-2 w-28 bg-muted" />
                  <div className="h-4 w-36 bg-muted" />
                </div>
                <div className="h-[180px] bg-muted/5 border border-border/30" />
                <div className="h-2 w-full bg-muted" />
              </div>
              <div className="border border-border p-6 bg-muted/5 flex flex-col justify-between h-[320px]">
                <div className="space-y-2">
                  <div className="h-2 w-28 bg-muted" />
                  <div className="h-4 w-36 bg-muted" />
                </div>
                <div className="space-y-3 py-4 flex flex-col items-center">
                  <div className="h-7 w-32 bg-muted" />
                  <div className="h-3 w-1 bg-muted" />
                  <div className="h-7 w-32 bg-muted" />
                  <div className="h-3 w-1 bg-muted" />
                  <div className="h-7 w-32 bg-muted" />
                </div>
                <div className="h-2 w-24 bg-muted self-center" />
              </div>
            </div>
            {/* Dynamic Shader Code Console Skeleton */}
            <div className="col-span-12 border border-border bg-black/40 p-5 mt-6 h-[220px] flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-border/20 pb-2 mb-3">
                <div className="h-3 w-48 bg-muted/20" />
                <div className="flex gap-2">
                  <div className="h-4 w-10 bg-muted/20" />
                  <div className="h-4 w-14 bg-muted/20" />
                </div>
              </div>
              <div className="flex-1 space-y-2 py-2">
                <div className="h-3 w-3/4 bg-muted/10" />
                <div className="h-3 w-1/2 bg-muted/10" />
                <div className="h-3.5 w-5/6 bg-muted/10" />
                <div className="h-3 w-2/3 bg-muted/10" />
              </div>
              <div className="flex justify-between border-t border-border/20 pt-2 mt-2">
                <div className="h-2.5 w-36 bg-muted/15" />
                <div className="h-2.5 w-24 bg-muted/15" />
              </div>
            </div>
          </div>
        ) : id === "slate-grid" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Live Cluster Map Skeleton */}
            <div className="lg:col-span-5 border border-border p-6 bg-muted/5 flex flex-col justify-between h-[480px] md:h-[460px] lg:h-[450px]">
              <div>
                <div className="h-3 w-32 bg-muted mb-4" />
                <div className="h-6 w-3/4 bg-muted mb-6" />
                
                {/* 8x8 Grid Map Skeleton */}
                <div className="grid grid-cols-8 gap-1.5 my-6 max-w-[240px] mx-auto">
                  {Array.from({ length: 64 }).map((_, idx) => (
                    <div key={idx} className="w-6 h-6 border border-border/30 bg-muted/10" />
                  ))}
                </div>
                <div className="h-3 w-40 bg-muted mx-auto" />
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-border pt-6 mt-4">
                <div className="space-y-2"><div className="h-2 w-20 bg-muted" /><div className="h-6 w-16 bg-muted" /></div>
                <div className="space-y-2"><div className="h-2 w-20 bg-muted" /><div className="h-6 w-20 bg-muted" /></div>
              </div>
            </div>
            {/* Logs/Charts Panel Skeleton */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              <div className="border border-border p-6 bg-muted/5 flex flex-col justify-between h-[180px]">
                <div className="flex justify-between items-baseline mb-2">
                  <div className="space-y-2">
                    <div className="h-2 w-28 bg-muted" />
                    <div className="h-4 w-36 bg-muted" />
                  </div>
                  <div className="h-3 w-16 bg-muted" />
                </div>
                <div className="h-[80px] bg-muted/5 border border-border/30" />
              </div>
              <div className="border border-border p-6 bg-black flex flex-col justify-between h-[180px]">
                <div>
                  <div className="h-3 w-48 bg-muted/20 mb-3 border-b border-border/10 pb-2" />
                  <div className="space-y-2">
                    <div className="h-3 w-4/5 bg-muted/10" />
                    <div className="h-3 w-3/4 bg-muted/10" />
                    <div className="h-3 w-5/6 bg-muted/10" />
                  </div>
                </div>
                <div className="h-3 w-full bg-muted/10 border-t border-border/10 pt-2" />
              </div>
            </div>
          </div>
        ) : (
          /* Generic Fallback Simulation Skeleton */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 border border-border p-6 bg-muted/5 flex flex-col justify-between h-[450px]">
              <div>
                <div className="h-3 w-32 bg-muted mb-4" />
                <div className="h-6 w-3/4 bg-muted mb-4" />
                <div className="space-y-2 mb-6">
                  <div className="h-3 w-full bg-muted" />
                  <div className="h-3 w-5/6 bg-muted" />
                </div>
                <div className="h-10 bg-muted mb-8" />
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
                <div className="space-y-2"><div className="h-2 w-16 bg-muted" /><div className="h-6 w-20 bg-muted" /></div>
                <div className="space-y-2"><div className="h-2 w-16 bg-muted" /><div className="h-6 w-16 bg-muted" /></div>
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-border p-6 bg-muted/5 h-[320px]" />
              <div className="border border-border p-6 bg-muted/5 h-[320px]" />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
