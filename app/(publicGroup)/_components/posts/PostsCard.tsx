import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPost } from "@/lib/types";
// import { IPost } from "@/lib/types";
import { MessageSquareIcon, SparklesIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type PostsCardProps = {
    post: IPost
}

export function PostsCard({ post }: PostsCardProps) {
    

    return (
      <Card className="gap-4">
        {post. imageUrl && (
          // <img
          //     src={post.thumbnail}
          //     alt={post.title}
          //     className="h-48 w-full object-cover"
          // />
          <Image
            src={post.imageUrl}
            unoptimized
            alt={post.title}
            width={400}
            height={400}
            // fill
          />
        )}
        <CardHeader>
          <div className="flex flex-wrap items-center gap-1.5">
            {post.isPremium && (
              <Badge variant="default">
                <SparklesIcon data-icon="inline-start" />
                Premium
              </Badge>
            )}
            
          </div>
          <CardTitle className="text-lg">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="line-clamp-4 whitespace-pre-line text-muted-foreground">
            {post.title}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              By {post.landlord?.name ?? "Unknown"} ·{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span><Link href={`/posts/${post.id}`}> Details
            </Link>
             
            </span>
            {/* <span className="flex items-center gap-1">
              <MessageSquareIcon className="size-3.5" />
              {commentCount}
            </span> */}
          </div>
        </CardContent>
      </Card>
    );
}