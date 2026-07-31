import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileQuestion, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GlobalNotFoundPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-background">
      <Card className="max-w-md w-full text-center border-muted shadow-xl">
        <CardHeader className="pb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
            <FileQuestion className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-black tracking-tight text-foreground">
            Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The listing, invoice parameter, or dynamic route layer you are seeking does not exist or has migrated permanently.
          </p>
        </CardContent>
        <CardFooter className="pt-2">
          <Link href="/" className="w-full">
            <Button className="w-full gap-2 cursor-pointer">
              <ArrowLeft className="h-4 w-4" /> Return to Marketplace
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
