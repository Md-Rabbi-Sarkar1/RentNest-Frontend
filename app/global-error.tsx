"use client";

import React, { useEffect } from "react";
import { ShieldAlert, RefreshCw } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("CRITICAL ROOT SYSTEM ERROR CAPTURED:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="font-sans antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 flex min-h-screen w-full items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl text-center space-y-6">
          
          <div className="space-y-3">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center justify-center text-rose-500 shadow-sm animate-pulse">
              <ShieldAlert className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Critical Architecture Fault
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              RentNest encountered a fatal root-level layout crash. The system provider or global theme instance failed to bootstrap cleanly.
            </p>
          </div>

          <button
            onClick={() => reset()}
            className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all text-white text-sm font-semibold shadow-md cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" /> Hard Reset Global Layout State
          </button>
          
        </div>
      </body>
    </html>
  );
}
