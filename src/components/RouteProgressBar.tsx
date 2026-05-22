"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function RouteProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);

  // Complete progress on route change
  useEffect(() => {
    if (active) {
      setProgress(100);
      const timer = setTimeout(() => {
        setActive(false);
        setProgress(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Intercept all internal Link clicks to start progress bar
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // Find closest anchor tag
      let target = e.target as HTMLElement | null;
      while (target && target.tagName !== "A") {
        target = target.parentElement;
      }

      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Only track internal routes
      if (
        href.startsWith("/") &&
        !href.startsWith("/#") &&
        !target.getAttribute("target") &&
        !e.defaultPrevented &&
        e.button === 0 && // Left click
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        // Only trigger if going to a different page path
        const currentPath = window.location.pathname;
        const targetPath = href.split(/[?#]/)[0];
        if (currentPath !== targetPath) {
          setActive(true);
          setProgress(20);
        }
      }
    };

    window.addEventListener("click", handleLinkClick);
    return () => window.removeEventListener("click", handleLinkClick);
  }, []);

  // Animate simulation of progress
  useEffect(() => {
    if (!active) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) {
          clearInterval(timer);
          return prev;
        }
        // Rapid growth initially, then slow down
        const step = prev < 50 ? 15 : 5;
        return prev + step;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [active]);

  if (!active && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      <div
        className="h-[2px] bg-accent transition-all duration-300 ease-out accent-glow"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
        }}
      />
    </div>
  );
}
