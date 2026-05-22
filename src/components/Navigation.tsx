"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setMounted(true);
    try {
      const root = document.documentElement;
      const initialTheme = root.classList.contains("dark") ? "dark" : "light";
      setTheme(initialTheme);
    } catch (_) {}
  }, []);

  const toggleTheme = () => {
    try {
      const root = document.documentElement;
      const currentTheme = root.classList.contains("dark") ? "dark" : "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      if (newTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }

      try {
        localStorage.setItem("theme", newTheme);
      } catch (storageErr) {
        console.warn("[Navigation] Failed to write theme to storage:", storageErr);
      }

      setTheme(newTheme);
    } catch (err) {
      console.error("[Navigation] Failed to toggle theme:", err);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl h-16 items-center justify-between px-6 md:px-8">
        <Link 
          href="/" 
          className="text-sm font-mono tracking-[0.2em] font-medium uppercase text-foreground hover:text-accent transition-colors duration-300"
        >
          ANAS <span className="text-accent font-bold">.</span> K
        </Link>
        
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <Link
              href="/#work"
              className="text-xs font-mono tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              WORK
            </Link>
            <Link
              href="/#writing"
              className="text-xs font-mono tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              WRITING
            </Link>
            <Link
              href="/#about"
              className="text-xs font-mono tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              ABOUT
            </Link>
            <Link
              href="/contact"
              className="text-xs font-mono tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              CONTACT
            </Link>
          </nav>

          {/* Theme Toggle Button (Renders empty layout placeholder during SSR to prevent CLS) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-8 h-8 rounded-full border border-border bg-muted/30 text-muted-foreground hover:text-accent hover:border-accent transition-all duration-300 cursor-pointer"
          >
            {mounted ? (
              theme === "dark" ? (
                // Sun icon for dark mode (click to switch to light)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 transition-transform duration-500 rotate-0 hover:rotate-90"
                >
                  <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM4 10a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 4 10ZM15 10a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 15 10ZM5.22 5.22a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 0 1-1.06 1.06L5.22 6.28a.75.75 0 0 1 0-1.06ZM12.66 12.66a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 1 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06ZM7.34 12.66a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 0 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0ZM14.78 5.22a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0ZM10 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" />
                </svg>
              ) : (
                // Moon icon for light mode (click to switch to dark)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 transition-transform duration-500 -rotate-12 hover:rotate-0"
                >
                  <path d="M17.721 1.599a.75.75 0 0 1 .445.894 8.25 8.25 0 0 1-15.562 2.25 8.25 8.25 0 0 1 10-10 .75.75 0 0 1 .8.636 10.158 10.158 0 0 0-4.015 1.517 7.25 7.25 0 0 0 6.643 6.643c1.07-.04 2.116-.293 3.07-.74a.75.75 0 0 1 .927.424Z" />
                </svg>
              )
            ) : (
              <div className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
