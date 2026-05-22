"use client";

export default function ContactSkeleton() {
  return (
    <div className="mx-auto max-w-xl px-6 md:px-8 py-16 md:py-24 animate-pulse">
      {/* Back Button Skeleton */}
      <div className="h-4 w-24 bg-muted border border-border/50 mb-12" />

      {/* Header Skeleton */}
      <div className="mb-12">
        <div className="h-3 w-32 bg-muted mb-4" />
        <div className="h-10 md:h-12 w-2/3 bg-muted" />
      </div>

      {/* Form Fields Skeleton */}
      <div className="space-y-6">
        <div>
          <div className="h-3 w-16 bg-muted mb-2.5" />
          <div className="h-12 w-full bg-muted border border-border/50" />
        </div>
        <div>
          <div className="h-3 w-16 bg-muted mb-2.5" />
          <div className="h-12 w-full bg-muted border border-border/50" />
        </div>
        <div>
          <div className="h-3 w-28 bg-muted mb-2.5" />
          <div className="h-12 w-full bg-muted border border-border/50" />
        </div>
        <div>
          <div className="h-3 w-24 bg-muted mb-2.5" />
          <div className="h-32 w-full bg-muted border border-border/50" />
        </div>
        
        {/* Button Skeleton */}
        <div className="h-12 w-full bg-muted" />
      </div>
    </div>
  );
}
