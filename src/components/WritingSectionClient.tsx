"use client";

import { useState, useEffect } from "react";
import FeatureFlagGate from "@/components/FeatureFlagGate";
import BlogFeedSkeleton from "./BlogFeedSkeleton";
import BlogFeed from "./BlogFeed";

export default function WritingSectionClient() {
  const [simulationMode, setSimulationMode] = useState<"remote" | "mock_skeleton" | "mock_offline" | "mock_live">("remote");
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);

  useEffect(() => {
    try {
      setIsFirebaseConnected(!!process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
    } catch (_) {}
  }, []);

  return (
    <>
      {/* Feature Flag Content Area */}
      <div className="relative min-h-[200px] border border-border p-8 bg-muted/10 transition-colors duration-300 hover:bg-muted/20">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className={`h-1.5 w-1.5 rounded-full ${
            simulationMode === "mock_live" || (simulationMode === "remote" && isFirebaseConnected) 
              ? "bg-green-500 animate-pulse" 
              : simulationMode === "mock_skeleton" 
              ? "bg-amber-500 animate-pulse" 
              : "bg-red-500"
          }`} />
          <span className="text-[9px] font-mono text-muted-foreground tracking-widest uppercase">
            {simulationMode === "remote" 
              ? `REMOTECONFIG: ${isFirebaseConnected ? "ACTIVE" : "LOCAL_FALLBACK"}`
              : `FORCED: ${simulationMode.replace("mock_", "").toUpperCase()}`}
          </span>
        </div>

        <div className="mt-4">
          {/* Render actual gated hook when in remote config mode */}
          {simulationMode === "remote" && (
            <FeatureFlagGate
              flagName="enable_blog_feed"
              skeleton={<BlogFeedSkeleton />}
              fallback={
                <div className="py-4">
                  <p className="text-sm text-muted-foreground font-light italic mb-2">
                    Blog feed is currently offline. (No remote config flag resolved to true).
                  </p>
                  {!isFirebaseConnected && (
                    <p className="text-[10px] font-mono text-amber-500/80 leading-relaxed">
                      * Firebase environment variables are not detected. Add NEXT_PUBLIC_FIREBASE_API_KEY to connect Remote Config.
                    </p>
                  )}
                </div>
              }
            >
              <BlogFeed />
            </FeatureFlagGate>
          )}

          {/* Forced Visual States for UI Walkthroughs and CLS verification */}
          {simulationMode === "mock_skeleton" && <BlogFeedSkeleton />}
          {simulationMode === "mock_offline" && (
            <p className="text-sm text-muted-foreground font-light italic">
              Writing feed is currently offline. Check back later.
            </p>
          )}
          {simulationMode === "mock_live" && <BlogFeed />}
        </div>
      </div>

      {/* Stylized Floating Control Console (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <div className="bg-background/95 backdrop-blur border border-border px-3 py-2 text-[10px] font-mono shadow-2xl flex items-center gap-3 animate-[fadeIn_1.2s_ease-out]">
          <span className="text-muted-foreground tracking-widest uppercase">FLAG SIMULATOR:</span>
          <select
            value={simulationMode}
            onChange={(e) => setSimulationMode(e.target.value as any)}
            className="px-2 py-1 text-[9px] font-mono tracking-widest rounded border border-border bg-muted hover:border-accent hover:text-accent text-foreground transition-all duration-300 uppercase cursor-pointer outline-none font-bold"
          >
            <option value="remote">Remote Config (Auto)</option>
            <option value="mock_skeleton">Force Skeleton</option>
            <option value="mock_offline">Force Offline</option>
            <option value="mock_live">Force Live Feed</option>
          </select>
        </div>
      </div>
    </>
  );
}
