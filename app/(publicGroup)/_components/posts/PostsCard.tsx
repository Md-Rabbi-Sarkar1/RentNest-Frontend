import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPost } from "@/lib/types";
import { SparklesIcon, MapPinIcon, ArrowRightIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type PostsCardProps = {
    post: IPost
}

export function PostsCard({ post }: PostsCardProps) {
    const hasValidImage = post.imageUrl && post.imageUrl !== "imageUrl";

    return (
      <Card className="overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-200 border-muted/70 bg-card">
        
       
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          {hasValidImage ? (
            <Image
              src={post.imageUrl}
              unoptimized
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground/60 bg-secondary/30 gap-1">
              <span className="text-xs">No Image Available</span>
            </div>
          )}

          
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <Badge className={post.isAvailable ? "bg-emerald-600 hover:bg-emerald-600 text-white shadow-sm" : "bg-destructive text-white shadow-sm"}>
              {post.isAvailable ? "Available" : "Rented"}
            </Badge>
            
            {post.isPremium && (
              <Badge variant="default" className="bg-amber-500 hover:bg-amber-500 text-white shadow-sm">
                <SparklesIcon className="size-3 mr-1 fill-white" />
                Premium
              </Badge>
            )}
          </div>

          
          <div className="absolute bottom-3 right-3 bg-background/95 backdrop-blur-sm px-2.5 py-1 rounded-md border shadow-sm text-xs font-bold text-primary">
            ${post.price?.toLocaleString() || "0"}/mo
          </div>
        </div>

        
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-base font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
          
          {post.address && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <MapPinIcon className="size-3 shrink-0 text-muted-foreground/70" />
              <span className="line-clamp-1">{post.address}</span>
            </div>
          )}
        </CardHeader>

        
        <CardContent className="p-4 pt-2.5 space-y-4 flex-1 flex flex-col justify-between">
          <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
            {post.description || "No property description provided."}
          </p>

          <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-muted/60">
           
            <span className="flex items-center gap-1 max-w-[65%] truncate">
              <UserIcon className="size-3 shrink-0" />
              <span className="truncate">
                By <strong className="font-medium text-foreground capitalize">{post.landlord?.name ?? "Unknown"}</strong>
              </span>
            </span>

            
            <Link 
              href={`/posts/${post.id}`} 
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5 group/link shrink-0"
            >
              Details
              <ArrowRightIcon className="size-3 transition-transform group-hover/link:translate-x-0.5" />
            </Link>
          </div>
        </CardContent>
      </Card>
    );
}
