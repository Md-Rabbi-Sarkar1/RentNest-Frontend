"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Pipeline logging tracker for application monitoring
    console.error("RentNest Core Action Failure Error Logged:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="space-y-3 max-w-md">
        <div className="mx-auto h-12 w-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 flex items-center justify-center text-amber-500">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Application Pipeline Error</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          An unexpected error disrupted the rendering workflow. This could be due to a missing query property field block or a database connection timeout.
        </p>
        {error.digest && (
          <code className="block text-[10px] select-all font-mono py-1.5 px-3 bg-muted rounded border border-muted text-muted-foreground tracking-tight max-w-xs mx-auto truncate">
            Digest Code Hash: {error.digest}
          </code>
        )}
      </div>

      <Button onClick={() => reset()} className="gap-2 cursor-pointer shadow-sm h-10 px-5">
        <RotateCcw className="h-4 w-4" /> Re-trigger Request Pipeline
      </Button>
    </div>
  );
}
