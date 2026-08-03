"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SparklesIcon, Trash2Icon, EyeIcon, MapPinIcon } from "lucide-react";
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
    <Card className="overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-200 border-muted/60">
      {/* Property Image Section */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {post.imageUrl ? (
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-xs text-muted-foreground bg-secondary/30">
            No Image Available
          </div>
        )}
        
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 z-10">
          <Badge className={post.isAvailable ? "bg-emerald-600 hover:bg-emerald-600 text-white" : "bg-destructive text-destructive-foreground"}>
            {post.isAvailable ? "Available" : "Rented"}
          </Badge>
          {post.isPremium && (
            <Badge variant="default" className="bg-amber-500 hover:bg-amber-500 text-white shadow-sm">
              <SparklesIcon className="mr-1 size-3" /> Premium
            </Badge>
          )}
        </div>
      </div>

      {/* Card Header with Title and Quick Actions */}
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold line-clamp-1 flex-1 text-card-foreground">
            {post.title}
          </CardTitle>
          <div className="flex items-center gap-0.5 -mt-1.5">
            <PostFormDialog mode="edit" post={post} />
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-destructive size-8" 
              onClick={handleDelete}
            >
              <Trash2Icon className="size-4" />
            </Button>
          </div>
        </div>
        
        {/* Address Row */}
        {post.address && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <MapPinIcon className="size-3 shrink-0 text-muted-foreground/70" />
            <span className="line-clamp-1">{post.address}</span>
          </div>
        )}
      </CardHeader>

      {/* Card Content with Description, Price, and Footer */}
      <CardContent className="p-4 pt-3 space-y-4 flex-1 flex flex-col justify-between">
        <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
          {post.description || "No description provided."}
        </p>

        <div className="space-y-3">
          {/* Price Breakdown */}
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-xs font-medium text-muted-foreground">Monthly Rent</span>
            <span className="text-lg font-bold text-primary">
              ${post.price?.toLocaleString() || "0"}
            </span>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-muted/60 text-[11px] text-muted-foreground">
            <span>Listed {new Date(post.createdAt).toLocaleDateString()}</span>
            <Link href={`/landlord-dashboard/my-posts/${post.id}`}>
              <Button size="sm" variant="secondary" className="gap-1 h-7 text-xs font-medium px-2.5">
                <EyeIcon className="size-3" /> Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
