import { IPost } from "@/lib/types";
import { getPublicPosts } from "../../-actions/getPublicPosts";
import { PostsCard } from "./PostsCard";

export async function PublicPostsList({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = searchParams ? await searchParams : {};
  const result = await getPublicPosts({ query });


  const postsArray = result?.data?.data;

  
  if (!result?.success || !Array.isArray(postsArray) || postsArray.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground text-sm font-medium">
        No property listings found in the marketplace.
      </p>
    );
  }

  return (
    <div className="space-y-8">
   
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {postsArray.map((post: IPost | any) => (
         
          <PostsCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
