"use client";

export default function BlogDetailSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-6 md:px-8 py-16 md:py-24 animate-pulse">
      {/* Back Button Skeleton */}
      <div className="h-4 w-24 bg-muted border border-border/50 mb-12" />

      {/* Article Meta Skeleton */}
      <div className="h-3.5 w-32 bg-muted mb-4" />

      {/* Article Title Skeleton */}
      <div className="h-10 md:h-14 w-11/12 bg-muted mb-8" />
      
      {/* Divider */}
      <div className="w-full h-[1px] bg-border mb-12" />

      {/* Article Content Skeleton */}
      <div className="space-y-6">
        <div className="h-4 w-full bg-muted" />
        <div className="h-4 w-full bg-muted" />
        <div className="h-4 w-5/6 bg-muted" />
        <div className="h-4 w-full bg-muted mt-8" />
        <div className="h-4 w-11/12 bg-muted" />
        <div className="h-4 w-3/4 bg-muted" />
      </div>
    </div>
  );
}
