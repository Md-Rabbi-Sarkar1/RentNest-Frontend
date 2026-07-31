import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, SparklesIcon, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostFormDialog } from "@/app/(dashboardGroup)/_components/PostFormDialog";
import { cookies } from "next/headers"; // 👈 Import cookies

async function getSinglePost(postId: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/${postId}`, {
        cache: "no-store",
        headers: {
            // 👈 Forward token so landlord API doesn't fail
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) return null;
    return res.json();
}

interface PageProps {
    params: Promise<{ postId: string }>; // 👈 Matches folder [postId] perfectly
}

export default async function PostDetailPage({ params }: PageProps) {
    const { postId } = await params;
    const result = await getSinglePost(postId);

    if (!result || !result.success) {
        notFound();
    }

    const post = result.data;

    return (
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-6">
            <Link href="/landlord-dashboard/my-posts">
                <Button variant="ghost" size="sm" className="gap-2 mb-4">
                    <ArrowLeftIcon className="size-4" /> Back to My Posts
                </Button>
            </Link>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{post.isAvailable ? "Available" : "Rented"}</Badge>
                        {post.isPremium && (
                            <Badge className="bg-amber-500 text-white">
                                <SparklesIcon className="size-3 mr-1"/>Premium
                            </Badge>
                        )}
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                        <CalendarIcon className="size-3.5" /> Posted on {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                </div>
                
                <PostFormDialog mode="edit" post={post} />
            </div>

            <div className="prose max-w-none mt-6">
                <h3 className="text-xl font-semibold mb-2">Property Description</h3>
                <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {post.description || "No description text has been provided for this listing."}
                </p>
            </div>
        </div>
    );
}
