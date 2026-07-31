"use client"
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SparklesIcon, Trash2Icon, EyeIcon } from "lucide-react";
import { IPost } from "@/lib/types";
import { PostFormDialog } from "./PostFormDialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { deletePostAction } from "../_actions/myPostsActions";
import { toast } from "sonner";

type MyPostCardProps = {
    post: IPost;
}

export function MyPostCard({ post }: MyPostCardProps) {
    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this listing permanently?")) {
            const res = await deletePostAction(post.id);
            if (res.success) {
                toast.success(res.message || "Post deleted successfully!");
            } else {
                toast.error(res.message || "Failed to delete post");
            }
        }
    };

    return (
        <Card className="flex flex-col justify-between">
            <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <div className="flex gap-1.5">
                        <Badge variant="outline">{post.isAvailable ? "Available" : "Rented"}</Badge>
                        {post.isPremium && (
                            <Badge variant="default" className="bg-amber-500">
                                <SparklesIcon className="mr-1 size-3" />
                                Premium
                            </Badge>
                        )}
                    </div>
                    {/* Action Area for Editing/Deleting */}
                    <div className="flex items-center gap-1">
                        <PostFormDialog mode="edit" post={post} />
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={handleDelete}>
                            <Trash2Icon className="size-4" />
                        </Button>
                    </div>
                </div>
                <CardTitle className="text-lg mt-2 line-clamp-1">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.description || "No description provided."}
                </p>
                <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <Link href={`/landlord-dashboard/my-posts/${post.id}`}>
                        <Button size="sm" variant="secondary" className="gap-1 text-xs">
                            <EyeIcon className="size-3" /> Details
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
