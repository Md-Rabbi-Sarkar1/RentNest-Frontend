import React from "react";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-4 px-4">
      
      <div className="relative h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
      <div className="space-y-1.5 text-center">
        <h3 className="text-base font-semibold tracking-tight">Syncing RentNest Matrix</h3>
        <p className="text-xs text-muted-foreground animate-pulse">Assembling verified layout configurations...</p>
      </div>
    </div>
  );
}
