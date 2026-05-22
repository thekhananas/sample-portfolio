"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    try {
      setCurrentYear(new Date().getFullYear());
    } catch (_) {}
  }, []);

  return (
    <footer className="border-t border-border bg-background py-8 mt-auto transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
          &copy; {currentYear} ANAS KHAN. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono tracking-widest text-muted-foreground hover:text-accent transition-colors duration-300 uppercase"
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono tracking-widest text-muted-foreground hover:text-accent transition-colors duration-300 uppercase"
          >
            LINKEDIN
          </a>
          <a
            href="https://substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono tracking-widest text-muted-foreground hover:text-accent transition-colors duration-300 uppercase"
          >
            SUBSTACK
          </a>
        </div>
      </div>
    </footer>
  );
}
