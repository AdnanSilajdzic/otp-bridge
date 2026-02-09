"use client";

import { useState, useEffect } from "react";
import { Star, X } from "lucide-react";

const STORAGE_KEY = "github-banner-dismissed";

export function GitHubBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  return (
    <>
    <div className="w-full fixed top-0 bg-muted border-b text-sm text-muted-foreground ">
      <div className="max-w-3xl mx-auto flex items-center justify-center gap-3 px-4 py-2">
        <p className="flex items-center gap-2">
          <Star className="w-3.5 h-3.5 shrink-0 text-yellow-500" />
          <span>
            Find this useful?{" "}
            <a
              href="https://github.com/AdnanSilajdzic/otp-bridge"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 text-foreground hover:text-primary transition-colors"
            >
              Star it on GitHub,
            </a>
            {" "} it's free and helps others discover the project.
          </span>
        </p>
        <button
          onClick={dismiss}
          className="shrink-0 p-1 rounded-md hover:bg-accent transition-colors cursor-pointer"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
    <div className="sm:mb-6 mb-12"></div>
    </>
  );
}
