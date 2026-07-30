import { getPostById } from "../../-actions/getPostById";
 // Adjust this path based on where you save the component
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PropertyDetails from "../../_components/posts/PropertyDetails";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostsDetailsPage({ params }: DetailPageProps) {
  // 1. Safely await the URL parameters
  const { id } = await params;

  // 2. Fetch data from your server action
  const result = await getPostById(id);

  // 3. Handle Error/Not Found cases safely
  if (!result || !result.data) {
    return (
      <div className="container mx-auto max-w-xl p-6 mt-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Listing Not Found</AlertTitle>
          <AlertDescription>
            We couldn't find the property post with ID: <code className="bg-destructive/10 px-1 rounded">{id}</code>. It may have been deleted or moved.
          </AlertDescription>
        </Alert>
        <div className="mt-4 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/posts">Return to Listings</Link>
          </Button>
        </div>
      </div>
    );
  }

  // 4. Pass the validated data directly into your design layout
  return (
    <main className="min-h-screen bg-background py-6">
      <PropertyDetails data={result.data} />
    </main>
  );
}
