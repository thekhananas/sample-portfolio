import { useState, useEffect } from "react";
import { remoteConfig } from "@/lib/firebase";
import { fetchAndActivate, getBoolean } from "firebase/remote-config";

export function useFeatureFlag(flagName: string, defaultValue: boolean = false) {
  const [enabled, setEnabled] = useState<boolean>(defaultValue);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const config = remoteConfig;
    
    // If running server-side or if Firebase config was omitted/uninitialized, skip fetching
    if (!config) {
      setEnabled(defaultValue);
      setLoading(false);
      return;
    }

    const fetchFlag = async () => {
      try {
        await fetchAndActivate(config);
        const val = getBoolean(config, flagName);
        setEnabled(val);
      } catch (err) {
        console.warn(
          `[Remote Config] Failed to fetch flag "${flagName}". Falling back to default (${defaultValue}).`,
          err
        );
        setError(err as Error);
        setEnabled(defaultValue);
      } finally {
        setLoading(false);
      }
    };

    fetchFlag();
  }, [flagName, defaultValue]);

  return { enabled, loading, error };
}
