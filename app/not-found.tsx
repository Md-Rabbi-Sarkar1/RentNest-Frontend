import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
export const dynamic = "force-dynamic";
export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] w-full flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="space-y-2">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive text-2xl font-black border border-destructive/20 select-none">
          404
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Property Listing Defunct</h1>
        <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base leading-relaxed">
          The dashboard parameters or specific rental lease request ID you are attempting to review has been unmounted, moved, or deleted.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Button variant="outline" onClick={() => window.history.back()} className="gap-2 cursor-pointer h-11">
          <ArrowLeft className="h-4 w-4" /> Go Back
        </Button>
        <Link href="/">
          <Button className="gap-2 cursor-pointer h-11 w-full sm:w-auto shadow-sm">
            <Home className="h-4 w-4" /> RentNest Dashboard Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
