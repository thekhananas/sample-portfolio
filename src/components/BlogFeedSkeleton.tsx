import React from "react";

export default function BlogFeedSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div 
          key={i} 
          className="border-b border-border pb-8 last:border-0"
        >
          {/* Skeleton Timestamp */}
          <div className="h-4 w-24 bg-muted rounded mb-3" />
          
          {/* Skeleton Title (Dynamic width) */}
          <div className="h-7 md:h-8 w-3/4 bg-muted rounded mb-3" />
          
          {/* Skeleton Description (Multi-line representation) */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
