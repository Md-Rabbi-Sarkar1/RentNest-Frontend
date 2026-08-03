import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, SparklesIcon, CalendarIcon, MapPinIcon, DollarSignIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostFormDialog } from "@/app/(dashboardGroup)/_components/PostFormDialog";
import { cookies } from "next/headers"; 

async function getSinglePost(postId: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/${postId}`, {
        cache: "no-store",
        headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) return null;
    return res.json();
}

interface PageProps {
    params: Promise<{ postId: string }>; 
}

export default async function PostDetailPage({ params }: PageProps) {
    const { postId } = await params;
    const result = await getSinglePost(postId);

    if (!result || !result.success) {
        notFound();
    }

    const post = result.data;

    return (
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
            {/* Top Navigation */}
            <div className="flex items-center justify-between">
                <Link href="/landlord-dashboard/my-posts">
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                        <ArrowLeftIcon className="size-4" /> Back to My Posts
                    </Button>
                </Link>
                <PostFormDialog mode="edit" post={post} />
            </div>

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Side: Property Details */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Media Hero Showcase */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border bg-muted shadow-sm">
                        {post.imageUrl ? (
                            <img 
                                src={post.imageUrl} 
                                alt={post.title} 
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-secondary/20 gap-2">
                                <HomeIcon className="size-8 stroke-[1.5]" />
                                <span className="text-sm">No Property Image Uploaded</span>
                            </div>
                        )}
                    </div>

                    {/* Property Title Header */}
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge className={post.isAvailable ? "bg-emerald-600 hover:bg-emerald-600 text-white" : "bg-destructive text-destructive-foreground"}>
                                {post.isAvailable ? "Available" : "Rented"}
                            </Badge>
                            {post.isPremium && (
                                <Badge className="bg-amber-500 hover:bg-amber-500 text-white shadow-sm">
                                    <SparklesIcon className="size-3 mr-1 fill-white"/>Premium Listing
                                </Badge>
                            )}
                        </div>
                        
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{post.title}</h1>
                        
                        {post.address && (
                            <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                                <MapPinIcon className="size-4 text-primary shrink-0" /> {post.address}
                            </p>
                        )}
                    </div>

                    <hr className="border-muted" />

                    {/* Property Description */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-foreground">Property Description</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed bg-secondary/10 p-4 rounded-lg border border-dashed">
                            {post.description || "No description text has been provided for this listing."}
                        </p>
                    </div>
                </div>

                {/* Right Side: Sticky Analytics & Information Panel */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6 border rounded-xl p-6 bg-card shadow-sm space-y-5">
                        <div>
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Financial Overview</span>
                            <div className="flex items-baseline gap-1 mt-2 text-3xl font-extrabold text-primary">
                                <DollarSignIcon className="size-6 stroke-[2.5] self-center -mr-1 text-primary/80" />
                                {post.price?.toLocaleString() || "0"}
                                <span className="text-sm font-medium text-muted-foreground ml-1">/ month</span>
                            </div>
                        </div>

                        <hr className="border-muted" />

                        {/* Metadata Information List */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs py-1">
                                <span className="text-muted-foreground flex items-center gap-1.5">
                                    <CalendarIcon className="size-3.5" /> Date Created
                                </span>
                                <span className="font-medium text-foreground">
                                    {new Date(post.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-xs py-1">
                                <span className="text-muted-foreground flex items-center gap-1.5">
                                    <CalendarIcon className="size-3.5" /> Last Updated
                                </span>
                                <span className="font-medium text-foreground">
                                    {new Date(post.updatedAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-xs py-1">
                                <span className="text-muted-foreground flex items-center gap-1.5">
                                    <HomeIcon className="size-3.5" /> Internal Listing ID
                                </span>
                                <span className="font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground max-w-[120px] truncate">
                                    {post.id}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
