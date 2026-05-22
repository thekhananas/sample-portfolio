import { Suspense } from "react";
import type { Metadata } from "next";
import FeatureFlagGate from "@/components/FeatureFlagGate";
import BlogDetailSkeleton from "@/components/BlogDetailSkeleton";
import WritingDetailsClient, { WritingOfflineFallback } from "./WritingDetailsClient";

interface WritingParams {
  slug: string;
}

export const unstable_instant = {
  prefetch: 'runtime',
  samples: [
    { params: { slug: "quantized-inference-operating-models-on-the-edge" } },
    { params: { slug: "asynchronous-ring-sync-sharding-distributed-grids" } },
    { params: { slug: "edge-parsing-rss-speeding-up-dynamic-feeds" } },
  ],
};

export async function generateMetadata({ params }: { params: Promise<WritingParams> }): Promise<Metadata> {
  const { slug } = await params;
  
  // Format slug into title representation: hyphens to spaces, capitalize words
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${title} | Anas Khan Studio`,
    description: `Read "${title}" - editorial essays on design token systems, performance metrics, and digital architectures.`,
  };
}

export default async function WritingDetailsPage({ params }: { params: Promise<WritingParams> }) {
  return (
    <Suspense fallback={<BlogDetailSkeleton />}>
      {params.then(({ slug }) => (
        <FeatureFlagGate
          flagName="enable_blog_feed"
          defaultValue={true}
          skeleton={<BlogDetailSkeleton />}
          fallback={<WritingOfflineFallback />}
        >
          <WritingDetailsClient slug={slug} />
        </FeatureFlagGate>
      ))}
    </Suspense>
  );
}
