"use client";

import React from "react";

export const HeroSlideshowSkeleton: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 animate-pulse border border-zinc-300/50 dark:border-zinc-700/50">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-300 via-zinc-200 to-zinc-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 animate-shimmer" />
      <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 space-y-4 max-w-2xl">
        <div className="h-6 w-32 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <div className="h-10 w-4/5 rounded-xl bg-zinc-300 dark:bg-zinc-700" />
        <div className="h-4 w-3/5 rounded bg-zinc-300 dark:bg-zinc-700" />
        <div className="flex gap-4 pt-2">
          <div className="h-10 w-36 rounded-xl bg-zinc-300 dark:bg-zinc-700" />
          <div className="h-10 w-28 rounded-xl bg-zinc-300 dark:bg-zinc-700" />
        </div>
      </div>
    </div>
  );
};
