

import { IPost } from "@/lib/types";
import { getPublicPosts } from "../../-actions/getPublicPosts";
import { PostsCard } from "./PostsCard";



export async function PublicPostsList({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const result = await getPublicPosts({query})

  if (!result.success || !result.data?.length) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No property found.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {result.data.map((post : IPost | any) => (
          <PostsCard key={post.id} post={post} />
        ))}
      </div>
      
    </div>
  );
}