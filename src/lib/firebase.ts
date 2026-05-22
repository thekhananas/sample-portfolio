import { initializeApp, getApps, getApp } from "firebase/app";
import { getRemoteConfig, RemoteConfig } from "firebase/remote-config";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// const analytics = getAnalytics(app);

let remoteConfig: RemoteConfig | null = null;

if (typeof window !== "undefined") {
  try {
    if (firebaseConfig.apiKey) {
      remoteConfig = getRemoteConfig(app);
      
      // Guardrail: Enable instant config refreshes in dev mode; 12-hour CDN caching in production
      remoteConfig.settings.minimumFetchIntervalMillis =
        process.env.NODE_ENV === "development" ? 0 : 43200000;

      remoteConfig.defaultConfig = {
        enable_blog_feed: false,
      };
    }
  } catch (err) {
    console.warn("[Firebase Remote Config] Initialization failed:", err);
  }
}

export { app, remoteConfig };
