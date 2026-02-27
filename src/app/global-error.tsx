"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-red-50">
            <AlertTriangle className="size-7 text-red-500" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Something went wrong
          </h1>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            An unexpected error occurred. Please try again.
          </p>
          {error.digest && (
            <p className="mt-1 text-xs text-muted-foreground">
              Error ID: {error.digest}
            </p>
          )}
          <Button className="mt-6" onClick={() => reset()}>
            Try Again
          </Button>
        </div>
      </body>
    </html>
  );
}
