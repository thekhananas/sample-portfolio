"use client";

import React from "react";
import { useFeatureFlag } from "@/hooks/useRemoteConfig";

interface FeatureFlagGateProps {
  flagName: string;
  skeleton: React.ReactNode;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  defaultValue?: boolean;
}

export default function FeatureFlagGate({
  flagName,
  skeleton,
  children,
  fallback = null,
  defaultValue = false,
}: FeatureFlagGateProps) {
  const { enabled, loading } = useFeatureFlag(flagName, defaultValue);

  if (loading) {
    return <>{skeleton}</>;
  }

  return enabled ? <>{children}</> : <>{fallback}</>;
}
