import { Suspense } from "react";
import type { Metadata } from "next";
import FeatureFlagGate from "@/components/FeatureFlagGate";
import WorkDetailSkeleton from "@/components/WorkDetailSkeleton";
import WorkDetailsClient, { WorkCaseStudiesFallback } from "./WorkDetailsClient";

interface WorkParams {
  id: string;
}

export const unstable_instant = {
  prefetch: 'runtime',
  samples: [
    { params: { id: "core-opt" } },
    { params: { id: "slate-grid" } },
  ],
};

export async function generateMetadata({ params }: { params: Promise<WorkParams> }): Promise<Metadata> {
  const { id } = await params;
  const projectTitles: Record<string, string> = {
    "core-opt": "NEURAL INFERENCE ENGINE",
    "slate-grid": "DISTRIBUTED COMPUTE PIPELINE",
  };
  const title = projectTitles[id] || "Case Study";
  return {
    title: `${title} // Case Study | Anas Khan Studio`,
    description: `Detailed review and technical execution metrics for the ${title} AI system.`,
  };
}

export default async function WorkDetailsPage({ params }: { params: Promise<WorkParams> }) {
  return (
    <Suspense fallback={<WorkDetailSkeleton />}>
      {params.then(({ id }) => (
        <FeatureFlagGate
          flagName="work_case_studies"
          defaultValue={true} // Default to true for client testing
          skeleton={<WorkDetailSkeleton id={id} />}
          fallback={<WorkCaseStudiesFallback />}
        >
          <WorkDetailsClient id={id} />
        </FeatureFlagGate>
      ))}
    </Suspense>
  );
}
