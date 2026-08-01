"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
   
    console.error("Next.js Pipeline Runtime Exception Caught:", error);
  }, [error]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-background">
      <Card className="max-w-md w-full text-center border-destructive/20 shadow-xl">
        <CardHeader className="pb-2">
          <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-2">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-black tracking-tight text-foreground">
            Something Went Wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-muted-foreground text-sm leading-relaxed">
            An unexpected error occurred while parsing transaction structures or marketplace datastores.
          </p>
          {error.digest && (
            <div className="bg-muted p-2 rounded text-[10px] font-mono text-muted-foreground select-all break-all">
              Fault Token ID: {error.digest}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <Button 
            variant="default" 
            onClick={() => reset()}
            className="w-full gap-2 cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </Button>
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full gap-2 cursor-pointer">
              <Home className="h-4 w-4" /> Go Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
