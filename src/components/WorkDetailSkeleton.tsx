"use client";

export default function WorkDetailSkeleton() {
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-4 space-y-6">
          <div className="border-t border-border pt-6">
            <div className="h-3 w-20 bg-muted mb-3" />
            <div className="h-5 w-32 bg-muted" />
          </div>
          <div className="border-t border-border pt-6">
            <div className="h-3 w-20 bg-muted mb-3" />
            <div className="h-5 w-36 bg-muted" />
          </div>
          <div className="border-t border-border pt-6">
            <div className="h-3 w-20 bg-muted mb-3" />
            <div className="h-5 w-40 bg-muted" />
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <div className="h-6 w-1/3 bg-muted" />
            <div className="h-4 w-full bg-muted" />
            <div className="h-4 w-full bg-muted" />
            <div className="h-4 w-5/6 bg-muted" />
          </div>
          <div className="space-y-4 pt-4">
            <div className="h-6 w-1/4 bg-muted" />
            <div className="h-4 w-full bg-muted" />
            <div className="h-4 w-full bg-muted" />
            <div className="h-4 w-2/3 bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
