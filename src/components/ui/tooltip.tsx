"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Tooltip({
  children,
  content,
  side = "top",
  className,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}) {
  const [visible, setVisible] = React.useState(false);

  const sideClasses = {
    top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
    bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
    left: "right-full top-1/2 mr-2 -translate-y-1/2",
    right: "left-full top-1/2 ml-2 -translate-y-1/2",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-50 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-xs text-background shadow-md animate-in fade-in",
            sideClasses[side],
            className,
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export { Tooltip };
